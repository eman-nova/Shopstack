import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { getOrdersForCustomer, ORDER_STATUSES } from '../../utils/orders'
import { formatNaira } from '../../utils/format'
import { IconChevronDown } from '../../components/ui/Icons.jsx'

export default function AccountOrders() {
  const { user } = useAuth()
  const orders = getOrdersForCustomer(user.email)
  const [openId, setOpenId] = useState(null)

  return (
    <div>
      <h2 className="account-content-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="muted">You have not placed any orders yet.</p>
      ) : (
        <div className="account-orders-list">
          {orders.map((o) => {
            const statusIndex = ORDER_STATUSES.indexOf(o.status)
            const isOpen = openId === o.id
            return (
              <div className="account-order-card" key={o.id}>
                <button className="account-order-summary" onClick={() => setOpenId(isOpen ? null : o.id)}>
                  <div>
                    <span className="account-order-id">{o.id}</span>
                    <span className="muted account-order-date">{new Date(o.createdAt).toLocaleDateString()}</span>
                  </div>
                  <span className="account-order-status">{o.status}</span>
                  <span className="account-order-total">{formatNaira(o.total)}</span>
                  <IconChevronDown style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }} />
                </button>

                {isOpen && (
                  <div className="account-order-detail">
                    <div className="account-order-tracker">
                      {ORDER_STATUSES.filter((s) => s !== 'Cancelled').map((s, i) => (
                        <div key={s} className={`tracker-step ${i <= statusIndex ? 'is-done' : ''}`}>
                          <span className="tracker-dot" />
                          <span className="tracker-label">{s}</span>
                        </div>
                      ))}
                    </div>
                    <div className="account-order-items">
                      {o.items.map((item) => (
                        <div className="account-order-item" key={item.lineId}>
                          <img src={item.image} alt={item.name} />
                          <div>
                            <span>{item.name}</span>
                            <span className="muted">Qty {item.quantity}</span>
                          </div>
                          <span>{formatNaira(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <p className="muted account-order-address">
                      Delivering to {o.delivery.address}, {o.delivery.city}, {o.delivery.state}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
