import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { formatNaira } from '../utils/format'
import { saveOrder } from '../utils/orders'
import { IconCheck } from '../components/ui/Icons.jsx'
import './checkout.css'

const DELIVERY_FEE = 5000
const FREE_DELIVERY_THRESHOLD = 150000
const NIGERIAN_STATES = [
  'Lagos', 'Abuja (FCT)', 'Rivers', 'Oyo', 'Kano', 'Ogun', 'Delta', 'Enugu', 'Kaduna', 'Edo', 'Anambra', 'Other',
]

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    state: 'Lagos',
    city: '',
    instructions: '',
    paymentMethod: 'card',
  })
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)

  if (items.length === 0) return <Navigate to="/shop" replace />

  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const total = subtotal + deliveryFee

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  function validate() {
    const next = {}
    if (!form.fullName.trim()) next.fullName = 'Full name is required.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (!/^[0-9+\s-]{7,}$/.test(form.phone)) next.phone = 'Enter a valid phone number.'
    if (!form.address.trim()) next.address = 'Delivery address is required.'
    if (!form.city.trim()) next.city = 'City is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setPlacing(true)

    const order = saveOrder({
      customer: {
        name: form.fullName,
        email: form.email,
        phone: form.phone,
      },
      delivery: {
        address: form.address,
        state: form.state,
        city: form.city,
        instructions: form.instructions,
      },
      paymentMethod: form.paymentMethod,
      items,
      subtotal,
      deliveryFee,
      total,
      status: 'Payment Confirmed',
    })

    setTimeout(() => {
      clearCart()
      navigate(`/order-confirmation/${order.id}`)
    }, 900)
  }

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <span className="eyebrow">Almost There</span>
          <h1>Checkout</h1>
        </div>
      </div>

      <div className="container checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <h3 className="checkout-section-title">Delivery Details</h3>

          <div className="field-row">
            <div className={`field ${errors.fullName ? 'field-error' : ''}`}>
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={form.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
              />
              {errors.fullName && <span className="field-error-msg">{errors.fullName}</span>}
            </div>
            <div className={`field ${errors.phone ? 'field-error' : ''}`}>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="080..."
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
              {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
            </div>
          </div>

          <div className={`field ${errors.email ? 'field-error' : ''}`}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && <span className="field-error-msg">{errors.email}</span>}
          </div>

          <div className={`field ${errors.address ? 'field-error' : ''}`}>
            <label htmlFor="address">Delivery Address</label>
            <input
              id="address"
              type="text"
              placeholder="Street address"
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
            {errors.address && <span className="field-error-msg">{errors.address}</span>}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="state">State</label>
              <select id="state" value={form.state} onChange={(e) => handleChange('state', e.target.value)}>
                {NIGERIAN_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className={`field ${errors.city ? 'field-error' : ''}`}>
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                value={form.city}
                onChange={(e) => handleChange('city', e.target.value)}
              />
              {errors.city && <span className="field-error-msg">{errors.city}</span>}
            </div>
          </div>

          <div className="field">
            <label htmlFor="instructions">Additional Delivery Instructions (optional)</label>
            <textarea
              id="instructions"
              rows={3}
              value={form.instructions}
              onChange={(e) => handleChange('instructions', e.target.value)}
            />
          </div>

          <h3 className="checkout-section-title">Payment Method</h3>
          <div className="checkout-payment-options">
            {[
              { id: 'card', label: 'Debit or Credit Card' },
              { id: 'transfer', label: 'Bank Transfer' },
              { id: 'gateway', label: 'Paystack / Flutterwave' },
            ].map((opt) => (
              <label key={opt.id} className={`checkout-payment-option ${form.paymentMethod === opt.id ? 'is-active' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={opt.id}
                  checked={form.paymentMethod === opt.id}
                  onChange={() => handleChange('paymentMethod', opt.id)}
                />
                <span className="checkout-payment-radio">
                  {form.paymentMethod === opt.id && <IconCheck />}
                </span>
                {opt.label}
              </label>
            ))}
          </div>
          <p className="checkout-payment-note">
            GEELUXX does not store card details directly. Payments are processed through a secure, trusted provider.
          </p>

          <button type="submit" className="btn btn-primary btn-block checkout-submit" disabled={placing}>
            {placing ? 'Processing Payment...' : `Pay ${formatNaira(total)}`}
          </button>
        </form>

        <aside className="checkout-summary">
          <h3>Order Summary</h3>
          <div className="checkout-summary-items">
            {items.map((item) => (
              <div className="checkout-summary-item" key={item.lineId}>
                <img src={item.image} alt={item.name} />
                <div className="checkout-summary-item-body">
                  <span className="checkout-summary-item-name">{item.name}</span>
                  <span className="checkout-summary-item-meta">Qty {item.quantity}{item.size ? ` / Size ${item.size}` : ''}</span>
                </div>
                <span className="checkout-summary-item-price">{formatNaira(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="divider" style={{ margin: '18px 0' }} />
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>{formatNaira(subtotal)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Delivery</span>
            <span>{deliveryFee === 0 ? 'Free' : formatNaira(deliveryFee)}</span>
          </div>
          <div className="divider" style={{ margin: '16px 0' }} />
          <div className="cart-summary-row cart-summary-total">
            <span>Total</span>
            <span>{formatNaira(total)}</span>
          </div>
        </aside>
      </div>
    </>
  )
}
