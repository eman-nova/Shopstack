import React, { useState } from 'react'
import { IconTrash, IconPlus } from '../../components/ui/Icons.jsx'

const DISCOUNTS_KEY = 'geeluxx_discounts_v1'

function readDiscounts() {
  try {
    return JSON.parse(localStorage.getItem(DISCOUNTS_KEY)) || []
  } catch {
    return []
  }
}

function writeDiscounts(list) {
  localStorage.setItem(DISCOUNTS_KEY, JSON.stringify(list))
}

export default function AdminDiscounts() {
  const [discounts, setDiscounts] = useState(readDiscounts())
  const [form, setForm] = useState({ code: '', percentage: '', startDate: '', endDate: '' })

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.code.trim() || !form.percentage) return
    const next = [
      { id: `disc-${Date.now()}`, ...form, code: form.code.toUpperCase(), percentage: Number(form.percentage) },
      ...discounts,
    ]
    setDiscounts(next)
    writeDiscounts(next)
    setForm({ code: '', percentage: '', startDate: '', endDate: '' })
  }

  function handleRemove(id) {
    const next = discounts.filter((d) => d.id !== id)
    setDiscounts(next)
    writeDiscounts(next)
  }

  return (
    <div>
      <div className="admin-page-head">
        <h1>Discounts</h1>
        <p className="muted">Create promotional codes and campaign pricing.</p>
      </div>

      <form className="admin-form-card" onSubmit={handleSubmit}>
        <div className="field-row">
          <div className="field">
            <label>Discount Code</label>
            <input
              placeholder="GEELUXX10"
              value={form.code}
              onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))}
              required
            />
          </div>
          <div className="field">
            <label>Percentage Off</label>
            <input
              type="number"
              min="1"
              max="90"
              value={form.percentage}
              onChange={(e) => setForm((p) => ({ ...p, percentage: e.target.value }))}
              required
            />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Start Date</label>
            <input type="date" value={form.startDate} onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))} />
          </div>
          <div className="field">
            <label>End Date</label>
            <input type="date" value={form.endDate} onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-sm"><IconPlus /> Create Discount</button>
      </form>

      <div className="admin-panel">
        {discounts.length === 0 ? (
          <p className="muted">No discount codes created yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>Code</th><th>Percentage</th><th>Start</th><th>End</th><th></th></tr>
            </thead>
            <tbody>
              {discounts.map((d) => (
                <tr key={d.id}>
                  <td><span className="admin-code-pill">{d.code}</span></td>
                  <td>{d.percentage}%</td>
                  <td>{d.startDate || 'N/A'}</td>
                  <td>{d.endDate || 'N/A'}</td>
                  <td>
                    <button className="admin-row-delete" onClick={() => handleRemove(d.id)}>
                      <IconTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
