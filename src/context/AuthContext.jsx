import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)
const USERS_KEY = 'geeluxx_users_v1'
const SESSION_KEY = 'geeluxx_session_v1'

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY)) || null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    else localStorage.removeItem(SESSION_KEY)
  }, [user])

  function register({ name, email, password, phone }) {
    const users = readUsers()
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'An account with this email already exists.' }
    }
    const newUser = {
      id: `cust-${Date.now()}`,
      name,
      email,
      password,
      phone: phone || '',
      role: 'customer',
      addresses: [],
      createdAt: new Date().toISOString(),
    }
    writeUsers([...users, newUser])
    const { password: _pw, ...safeUser } = newUser
    setUser(safeUser)
    return { ok: true }
  }

  function login({ email, password }) {
    if (email.toLowerCase() === 'admin@geeluxx.com' && password === 'admin123') {
      const adminUser = { id: 'admin-1', name: 'GEELUXX Admin', email, role: 'admin' }
      setUser(adminUser)
      return { ok: true, role: 'admin' }
    }
    const users = readUsers()
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!found) return { ok: false, error: 'Incorrect email or password.' }
    const { password: _pw, ...safeUser } = found
    setUser(safeUser)
    return { ok: true, role: 'customer' }
  }

  function logout() {
    setUser(null)
  }

  function updateProfile(updates) {
    if (!user) return
    const updated = { ...user, ...updates }
    setUser(updated)
    if (user.role !== 'admin') {
      const users = readUsers().map((u) => (u.id === user.id ? { ...u, ...updates } : u))
      writeUsers(users)
    }
  }

  const value = { user, register, login, logout, updateProfile, isAdmin: user?.role === 'admin' }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
