import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import argon2 from 'argon2'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.resolve(__dirname, '../db/db.json')

function readDB() { return JSON.parse(fs.readFileSync(dbPath, 'utf-8') || '{}') }
function writeDB(data) { fs.writeFileSync(dbPath, JSON.stringify(data, null, 2)) }

async function run() {
  const db = readDB()
  let changed = false
  for (const u of db.users || []) {
    if (u.password_b64 && !u.password_hash) {
      const plain = Buffer.from(u.password_b64, 'base64').toString('utf-8')
      u.password_hash = await argon2.hash(plain, { type: argon2.argon2id })
      delete u.password_b64
      changed = true
      console.log(`migrated user ${u.username}`)
    }
  }
  if (changed) writeDB(db)
  console.log('done')
}

run().catch(e => { console.error(e); process.exit(1) }) 