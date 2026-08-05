import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import { IconTrash } from '../../components/ui/Icons.jsx'

export default function AccountAddresses() {
  const { user, updateProfile } = useAuth()
  const { showToast } = useToast()
  const [form, setForm] = useState({ label: '', address: '', city: '', state: '' })
  const addresses = user.addresses || []

  function handleAdd(e) {
    e.preventDefault()
    if (!form.address.trim() || !form.city.trim()) return
    const next = [...addresses, { ...form, id: `addr-${Date.now()}` }]
    updateProfile({ addresses: next })
    setForm({ label: '', address: '', city: '', state: '' })
    showToast('Address saved', 'success')
  }

  function handleRemove(id) {
    updateProfile({ addresses: addresses.filter((a) => a.id !== id) })
  }

  return (
    <div>
      <h2 className="account-content-title">Saved Addresses</h2>

      {addresses.length === 0 ? (
        <p className="muted" style={{ marginBottom: 28 }}>You have no saved addresses yet.</p>
      ) : (
        <div className="address-grid">
          {addresses.map((a) => (
            <div className="address-card" key={a.id}>
              <span className="address-label">{a.label || 'Address'}</span>
              <p>{a.address}</p>
              <p className="muted">{a.city}, {a.state}</p>
              <button onClick={() => handleRemove(a.id)} className="address-remove"><IconTrash /></button>
            </div>
          ))}
        </div>
      )}

      <div className="account-section-header" style={{ marginTop: 8 }}>
        <h3>Add A New Address</h3>
      </div>
      <form onSubmit={handleAdd} className="address-form">
        <div className="field-row">
          <div className="field">
            <label>Label</label>
            <input type="text" placeholder="Home, Office..." value={form.label} onChange={(e) => setForm((p) => ({ ...p, label: e.target.value }))} />
          </div>
          <div className="field">
            <label>City</label>
            <input type="text" value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} />
          </div>
        </div>
        <div className="field">
          <label>Street Address</label>
          <input type="text" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} />
        </div>
        <div className="field">
          <label>State</label>
          <input type="text" value={form.state} onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))} />
        </div>
        <button type="submit" className="btn btn-outline">Save Address</button>
      </form>
    </div>
  )
}
