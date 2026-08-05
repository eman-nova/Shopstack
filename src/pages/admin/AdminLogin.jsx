import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import '../auth.css'

export default function AdminLogin() {
  const { login, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  if (isAdmin) return <Navigate to="/admin" replace />

  function handleSubmit(e) {
    e.preventDefault()
    const result = login(form)
    if (!result.ok || result.role !== 'admin') {
      setError('Incorrect administrator credentials.')
      return
    }
    navigate('/admin')
  }

  return (
    <div className="auth-page" style={{ background: 'var(--geeluxx-plum)' }}>
      <div className="container auth-layout" style={{ gridTemplateColumns: '1fr', maxWidth: 440 }}>
        <div className="auth-card">
          <span className="eyebrow">GEELUXX Admin</span>
          <h1>Staff Login</h1>
          <p className="muted auth-sub">Sign in to manage products, orders and customers.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              />
            </div>
            {error && <p className="field-error-msg" style={{ marginBottom: 16 }}>{error}</p>}
            <button type="submit" className="btn btn-primary btn-block">Log In</button>
          </form>
          <p className="auth-admin-note">Demo credentials: admin@geeluxx.com / admin123</p>
          <p className="auth-switch"><Link to="/">Back to GEELUXX</Link></p>
        </div>
      </div>
    </div>
  )
}
