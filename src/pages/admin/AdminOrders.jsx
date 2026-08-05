import React, { useState } from 'react'
import { getOrders, updateOrderStatus, ORDER_STATUSES } from '../../utils/orders'
import { formatNaira } from '../../utils/format'

export default function AdminOrders() {
  const [orders, setOrders] = useState(getOrders())
  const [statusFilter, setStatusFilter] = useState('All')

  function handleStatusChange(id, status) {
    updateOrderStatus(id, status)
    setOrders(getOrders())
  }

  const visible = statusFilter === 'All' ? orders : orders.filter((o) => o.status === statusFilter)

  return (
    <div>
      <div className="admin-page-head admin-page-head-row">
        <div>
          <h1>Orders</h1>
          <p className="muted">View and update customer orders.</p>
        </div>
        <select className="admin-filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="admin-panel">
        {visible.length === 0 ? (
          <p className="muted">No orders found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>
                    <div className="admin-customer-cell">
                      <span>{o.customer?.name}</span>
                      <span className="muted">{o.customer?.email}</span>
                    </div>
                  </td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td>{o.items?.length || 0}</td>
                  <td>{formatNaira(o.total)}</td>
                  <td>
                    <select
                      className="admin-inline-select"
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    >
                      {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
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
