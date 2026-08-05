import React, { useMemo } from 'react'
import { getOrders } from '../../utils/orders'
import { formatNaira } from '../../utils/format'

const USERS_KEY = 'geeluxx_users_v1'

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

export default function AdminCustomers() {
  const users = readUsers()
  const orders = getOrders()

  const customers = useMemo(() => {
    const map = new Map()
    users.forEach((u) => {
      map.set(u.email.toLowerCase(), { name: u.name, email: u.email, phone: u.phone, orderCount: 0, spent: 0 })
    })
    orders.forEach((o) => {
      const email = o.customer?.email?.toLowerCase()
      if (!email) return
      if (!map.has(email)) {
        map.set(email, { name: o.customer.name, email: o.customer.email, phone: o.customer.phone, orderCount: 0, spent: 0 })
      }
      const entry = map.get(email)
      entry.orderCount += 1
      entry.spent += o.total || 0
    })
    return Array.from(map.values())
  }, [users, orders])

  return (
    <div>
      <div className="admin-page-head">
        <h1>Customers</h1>
        <p className="muted">Registered customers and their order activity.</p>
      </div>

      <div className="admin-panel">
        {customers.length === 0 ? (
          <p className="muted">No customer accounts yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Phone</th><th>Orders</th><th>Total Spent</th></tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.email}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone || 'N/A'}</td>
                  <td>{c.orderCount}</td>
                  <td>{formatNaira(c.spent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
