import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { getOrdersForCustomer } from '../../utils/orders'
import { formatNaira } from '../../utils/format'

export default function AccountOverview() {
  const { user } = useAuth()
  const orders = getOrdersForCustomer(user.email)
  const recent = orders.slice(0, 3)

  return (
    <div>
      <h2 className="account-content-title">My Profile</h2>
      <div className="account-profile-card">
        <div>
          <span className="account-label">Full Name</span>
          <p>{user.name}</p>
        </div>
        <div>
          <span className="account-label">Email Address</span>
          <p>{user.email}</p>
        </div>
        <div>
          <span className="account-label">Phone Number</span>
          <p>{user.phone || 'Not provided'}</p>
        </div>
      </div>

      <div className="account-section-header">
        <h3>Recent Orders</h3>
        <Link to="/account/orders" className="link-underline">View All</Link>
      </div>

      {recent.length === 0 ? (
        <p className="muted">You have not placed any orders yet.</p>
      ) : (
        <div className="account-orders-list">
          {recent.map((o) => (
            <div className="account-order-row" key={o.id}>
              <div>
                <span className="account-order-id">{o.id}</span>
                <span className="muted account-order-date">{new Date(o.createdAt).toLocaleDateString()}</span>
              </div>
              <span className="account-order-status">{o.status}</span>
              <span className="account-order-total">{formatNaira(o.total)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
