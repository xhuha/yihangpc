import axios from 'axios'

const API_BASE = import.meta.env.VITE_AUTH_BASE || 'http://localhost:5174'

// 内存态
const authState = { user: null, accessToken: null }

const api = axios.create({ baseURL: API_BASE, timeout: 10000, withCredentials: true })

api.interceptors.request.use(cfg => {
  if (authState.accessToken) cfg.headers.Authorization = `Bearer ${authState.accessToken}`
  return cfg
})

let refreshing = false
let queue = []

api.interceptors.response.use(
  r => r,
  async err => {
    const { response, config } = err || {}
    const isAuth = config && typeof config.url === 'string' && (config.url.includes('/api/login') || config.url.includes('/api/refresh'))
    if (response && response.status === 401 && !config.__retried && !isAuth) {
      if (refreshing) {
        return new Promise(resolve => queue.push(resolve)).then(() => {
          config.__retried = true
          return api(config)
        })
      }
      refreshing = true
      try {
        const r = await axios.post(`${API_BASE}/api/refresh`, {}, { withCredentials: true })
        authState.accessToken = r.data.accessToken
        queue.forEach(fn => fn())
        queue = []
        config.__retried = true
        return api(config)
      } catch (e) {
        clearAuth()
        window.location.href = '/login'
        return Promise.reject(err)
      } finally {
        refreshing = false
      }
    }
    return Promise.reject(err)
  }
)

function setAuth({ user, accessToken }) {
  authState.user = user || null
  authState.accessToken = accessToken || null
}

function clearAuth() {
  authState.user = null
  authState.accessToken = null
}

async function bootstrapAuth() {
  try {
    const r = await axios.post(`${API_BASE}/api/refresh`, {}, { withCredentials: true })
    authState.accessToken = r.data.accessToken
    return true
  } catch {
    clearAuth()
    return false
  }
}

export { api, authState, setAuth, clearAuth, bootstrapAuth } 