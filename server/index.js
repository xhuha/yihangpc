import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import rateLimit from 'express-rate-limit'
import argon2 from 'argon2'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.resolve(__dirname, '../db/db.json')

const app = express()
app.use(helmet())
app.use(cors({ origin: [/^http:\/\/localhost:\d+$/, /^https:\/\/localhost:\d+$/], credentials: true }))
app.use(express.json())
app.use(cookieParser())

const limiter = rateLimit({ windowMs: 60 * 1000, max: 30 })
app.use('/api/', limiter)

function readDB() { return JSON.parse(fs.readFileSync(dbPath, 'utf-8') || '{}') }
function writeDB(data) { fs.writeFileSync(dbPath, JSON.stringify(data, null, 2)) }

function cfg() {
  const db = readDB()
  const SECRET_ACCESS = process.env.JWT_ACCESS_SECRET || 'dev_access_secret_please_change'
  const SECRET_REFRESH = process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret_please_change'
  const timeCost = Number(process.env.ARGON2_TIME_COST || 3)
  const memoryCost = Number(process.env.ARGON2_MEMORY_COST || 65536)
  const parallelism = Number(process.env.ARGON2_PARALLELISM || 1)
  return { db, SECRET_ACCESS, SECRET_REFRESH, timeCost, memoryCost, parallelism, token: db.config?.token }
}

const sign = (payload, secret, ttl) => jwt.sign(payload, secret, { expiresIn: ttl })

// 登录（明文密码 HTTPS 传输）
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body || {}
  const { db, token, SECRET_ACCESS, SECRET_REFRESH } = cfg()
  const user = (db.users || []).find(u => u.username === username)
  if (!user) return res.status(401).json({ message: '用户不存在' })
  try {
    let ok = false
    if (user.password_hash) {
      ok = await argon2.verify(user.password_hash, password)
    } else if (user.password_b64) {
      const b64 = Buffer.from(password, 'utf-8').toString('base64')
      ok = user.password_b64 === b64
    }
    if (!ok) return res.status(401).json({ message: '账号或密码错误' })
    const jti = nanoid()
    const accessToken = sign({ sub: String(user.id), jti, type: 'access' }, SECRET_ACCESS, token.access.ttl_sec)
    const refreshToken = sign({ sub: String(user.id), jti, type: 'refresh' }, SECRET_REFRESH, token.refresh.ttl_sec)

    db.sessions = db.sessions || []
    db.sessions.push({ id: `sess_${Date.now()}`, userId: user.id, refreshToken, accessToken, issuedAt: Date.now() })
    writeDB(db)

    // 设置可选的 HttpOnly Refresh Cookie（前端仍可从body使用；提升安全可只用Cookie）
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict', path: '/' })
    res.json({ user: { id: user.id, username: user.username, displayName: user.displayName, role: user.role }, accessToken, tokenType: token.access.prefix })
  } catch (e) {
    res.status(500).json({ message: '验证失败' })
  }
})

// 刷新
app.post('/api/refresh', (req, res) => {
  const bodyToken = req.body?.refreshToken
  const cookieToken = req.cookies?.refreshToken
  const refreshToken = bodyToken || cookieToken
  const { db, token, SECRET_ACCESS, SECRET_REFRESH } = cfg()
  try {
    const decoded = jwt.verify(refreshToken, SECRET_REFRESH)
    const sess = (db.sessions || []).find(s => s.refreshToken === refreshToken)
    if (!sess) return res.status(401).json({ message: '无效的刷新令牌' })

    const jti = nanoid()
    const accessToken = sign({ sub: decoded.sub, jti, type: 'access' }, SECRET_ACCESS, token.access.ttl_sec)
    const newRefresh = sign({ sub: decoded.sub, jti, type: 'refresh' }, SECRET_REFRESH, token.refresh.ttl_sec)
    sess.accessToken = accessToken
    sess.refreshToken = newRefresh
    writeDB(db)

    res.cookie('refreshToken', newRefresh, { httpOnly: true, secure: true, sameSite: 'strict', path: '/' })
    res.json({ accessToken, tokenType: token.access.prefix })
  } catch {
    res.status(401).json({ message: '刷新失败或过期' })
  }
})

// 鉴权中间件
function auth(req, res, next) {
  const { SECRET_ACCESS } = cfg()
  const authz = req.headers.authorization || ''
  const token = authz.replace(/^Bearer\s+/i, '')
  try {
    req.user = jwt.verify(token, SECRET_ACCESS)
    next()
  } catch {
    res.status(401).json({ message: '未授权' })
  }
}

app.get('/api/profile', auth, (req, res) => {
  const { db } = cfg()
  const user = (db.users || []).find(u => String(u.id) === req.user.sub)
  if (!user) return res.status(404).json({ message: '用户不存在' })
  res.json({ id: user.id, username: user.username, role: user.role, displayName: user.displayName })
})

app.post('/api/logout', (req, res) => {
  const bodyToken = req.body?.refreshToken
  const cookieToken = req.cookies?.refreshToken
  const refreshToken = bodyToken || cookieToken
  const { db } = cfg()
  db.sessions = (db.sessions || []).filter(s => s.refreshToken !== refreshToken)
  res.clearCookie('refreshToken', { path: '/' })
  writeDB(db)
  res.json({ ok: true })
})

import https from 'https'
import http from 'http'

const HTTP_PORT = Number(process.env.PORT || 5174)
const HTTPS_PORT = Number(process.env.HTTPS_PORT || 5443)
const SSL_KEY_PATH = process.env.SSL_KEY_PATH
const SSL_CERT_PATH = process.env.SSL_CERT_PATH

if (SSL_KEY_PATH && SSL_CERT_PATH && fs.existsSync(SSL_KEY_PATH) && fs.existsSync(SSL_CERT_PATH)) {
  const key = fs.readFileSync(SSL_KEY_PATH)
  const cert = fs.readFileSync(SSL_CERT_PATH)
  https.createServer({ key, cert }, app).listen(HTTPS_PORT, () => {
    console.log(`Auth server HTTPS at https://localhost:${HTTPS_PORT}`)
  })
  http.createServer((req, res) => {
    const host = (req.headers.host || 'localhost').split(':')[0]
    res.writeHead(301, { Location: `https://${host}:${HTTPS_PORT}${req.url}` })
    res.end()
  }).listen(HTTP_PORT, () => {
    console.log(`Redirecting HTTP http://localhost:${HTTP_PORT} -> https://localhost:${HTTPS_PORT}`)
  })
} else {
  app.listen(HTTP_PORT, () => console.log(`Auth server HTTP at http://localhost:${HTTP_PORT}`))
} 