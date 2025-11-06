function delay(ms = 300) {
  return new Promise(res => setTimeout(res, ms))
}

/**
 * PUBLIC_INTERFACE
 * Mock authentication service with minimal validation and local-only behavior.
 */
export const mockAuthService = {
  async login(email, password) {
    await delay()
    if (!email || !password) {
      const err = new Error('Email and password are required.')
      err.code = 'VALIDATION'
      throw err
    }
    // Accept any credentials for demo; hash not required
    return {
      id: 'u_' + Math.random().toString(36).slice(2, 8),
      name: email.split('@')[0],
      email
    }
  },
  async register(payload) {
    await delay()
    const { name, email, password } = payload || {}
    if (!name || name.length < 2) throw new Error('Name must be at least 2 characters.')
    if (!email || !/.+@.+\..+/.test(email)) throw new Error('Valid email required.')
    if (!password || password.length < 6) throw new Error('Password must be at least 6 characters.')
    return {
      id: 'u_' + Math.random().toString(36).slice(2, 8),
      name,
      email
    }
  }
}
