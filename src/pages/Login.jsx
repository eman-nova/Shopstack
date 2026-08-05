import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import './auth.css'

export default function Login() {
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    const result = login(form)
    setSubmitting(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    showToast('Welcome back to GEELUXX', 'success')
    const redirectTo = location.state?.from || '/account'
    navigate(redirectTo)
  }

  return (
    <div className="auth-page">
      <div className="container auth-layout">
        <div className="auth-card">
          <span className="eyebrow">Welcome Back</span>
          <h1>Log In To Your Account</h1>
          <p className="muted auth-sub">Access your order history, addresses and account settings.</p>

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
            <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
              {submitting ? 'Signing In...' : 'Log In'}
            </button>
          </form>

          <p className="auth-switch">
            Do not have an account yet? <Link to="/register">Create one</Link>
          </p>
        </div>
        <div className="auth-media">
          <img src="/images/products/necklaces/necklace-pear-set.jpg" alt="A model wearing a diamond necklace and earrings" />
        </div>
      </div>
    </div>
  )
}
