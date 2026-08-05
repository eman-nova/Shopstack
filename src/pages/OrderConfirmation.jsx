import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOrders } from '../utils/orders'
import { formatNaira } from '../utils/format'
import { IconCheck } from '../components/ui/Icons.jsx'
import './order-confirmation.css'

export default function OrderConfirmation() {
  const { id } = useParams()
  const [order, setOrder] = useState(undefined)

  useEffect(() => {
    const found = getOrders().find((o) => o.id === id)
    setOrder(found || null)
  }, [id])

  if (order === undefined) return null

  if (!order) {
    return (
      <div className="container" style={{ padding: '100px 24px', textAlign: 'center' }}>
        <h1 className="section-heading">Order not found</h1>
        <p className="muted" style={{ marginTop: 12 }}>We could not locate that order.</p>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: 24 }}>Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className="order-confirmation">
      <div className="container">
        <div className="oc-icon"><IconCheck /></div>
        <span className="eyebrow text-center" style={{ display: 'block' }}>Thank You</span>
        <h1 className="section-heading text-center">Your Order Is Confirmed</h1>
        <p className="muted text-center oc-sub">
          A confirmation has been recorded for order <strong>{order.id}</strong>. We will begin
          preparing your jewelry for delivery.
        </p>

        <div className="oc-card">
          <div className="oc-card-row">
            <span>Order Number</span>
            <span>{order.id}</span>
          </div>
          <div className="oc-card-row">
            <span>Status</span>
            <span>{order.status}</span>
          </div>
          <div className="oc-card-row">
            <span>Delivery Address</span>
            <span>{order.delivery.address}, {order.delivery.city}, {order.delivery.state}</span>
          </div>
          <div className="divider" style={{ margin: '18px 0' }} />
          {order.items.map((item) => (
            <div className="oc-item" key={item.lineId}>
              <img src={item.image} alt={item.name} />
              <div className="oc-item-body">
                <span>{item.name}</span>
                <span className="muted">Qty {item.quantity}</span>
              </div>
              <span>{formatNaira(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="divider" style={{ margin: '18px 0' }} />
          <div className="oc-card-row oc-total">
            <span>Total Paid</span>
            <span>{formatNaira(order.total)}</span>
          </div>
        </div>

        <div className="oc-actions">
          <Link to="/account" className="btn btn-outline">View My Orders</Link>
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}
