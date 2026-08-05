import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'

export default function AccountSettings() {
  const { user, updateProfile } = useAuth()
  const { showToast } = useToast()
  const [form, setForm] = useState({ name: user.name, phone: user.phone || '' })
  const [password, setPassword] = useState({ next: '', confirm: '' })

  function handleProfileSubmit(e) {
    e.preventDefault()
    updateProfile({ name: form.name, phone: form.phone })
    showToast('Profile updated', 'success')
  }

  function handlePasswordSubmit(e) {
    e.preventDefault()
    if (password.next.length < 6) {
      showToast('Password must be at least 6 characters', 'error')
      return
    }
    if (password.next !== password.confirm) {
      showToast('Passwords do not match', 'error')
      return
    }
    updateProfile({ password: password.next })
    setPassword({ next: '', confirm: '' })
    showToast('Password updated', 'success')
  }

  return (
    <div>
      <h2 className="account-content-title">Account Settings</h2>

      <form onSubmit={handleProfileSubmit} className="settings-form">
        <h3>Profile Details</h3>
        <div className="field">
          <label>Full Name</label>
          <input type="text" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
        </div>
        <div className="field">
          <label>Phone Number</label>
          <input type="tel" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
        </div>
        <button type="submit" className="btn btn-outline">Save Changes</button>
      </form>

      <form onSubmit={handlePasswordSubmit} className="settings-form">
        <h3>Change Password</h3>
        <div className="field">
          <label>New Password</label>
          <input type="password" value={password.next} onChange={(e) => setPassword((p) => ({ ...p, next: e.target.value }))} />
        </div>
        <div className="field">
          <label>Confirm New Password</label>
          <input type="password" value={password.confirm} onChange={(e) => setPassword((p) => ({ ...p, confirm: e.target.value }))} />
        </div>
        <button type="submit" className="btn btn-outline">Update Password</button>
      </form>
    </div>
  )
}
