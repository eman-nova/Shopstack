import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { formatNaira } from '../utils/format'
import { IconMinus, IconPlus, IconTrash } from '../components/ui/Icons.jsx'
import './cart.css'

const DELIVERY_FEE = 5000
const FREE_DELIVERY_THRESHOLD = 150000

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart()

  const deliveryFee = items.length === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const total = subtotal + deliveryFee

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <span className="eyebrow">Your Selection</span>
          <h1>Shopping Cart</h1>
        </div>
      </div>

      <div className="container cart-layout">
        {items.length === 0 ? (
          <div className="empty-state cart-empty">
            <h3>Your cart is empty</h3>
            <p>Browse the shop to find a piece you love.</p>
            <Link to="/shop" className="btn btn-primary" style={{ marginTop: 22 }}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              <div className="cart-items-head">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
              {items.map((item) => (
                <div className="cart-row" key={item.lineId}>
                  <div className="cart-row-product">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <Link to={`/product/${item.id}`} className="cart-row-name">{item.name}</Link>
                      <span className="cart-row-meta">
                        {item.type}
                        {item.size ? ` / Size ${item.size}` : ''}
                      </span>
                      <button className="cart-row-remove" onClick={() => removeItem(item.lineId)}>
                        <IconTrash /> Remove
                      </button>
                    </div>
                  </div>
                  <span className="cart-row-price" data-label="Price">{formatNaira(item.price)}</span>
                  <div className="cart-qty" data-label="Quantity">
                    <button onClick={() => updateQuantity(item.lineId, item.quantity - 1)} aria-label="Decrease quantity">
                      <IconMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.lineId, item.quantity + 1)} aria-label="Increase quantity">
                      <IconPlus />
                    </button>
                  </div>
                  <span className="cart-row-total" data-label="Total">{formatNaira(item.price * item.quantity)}</span>
                </div>
              ))}
              <Link to="/shop" className="link-underline cart-continue">Continue Shopping</Link>
            </div>

            <aside className="cart-summary">
              <h3>Order Summary</h3>
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>{formatNaira(subtotal)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? 'Free' : formatNaira(deliveryFee)}</span>
              </div>
              {subtotal < FREE_DELIVERY_THRESHOLD && (
                <p className="cart-summary-note">
                  Add {formatNaira(FREE_DELIVERY_THRESHOLD - subtotal)} more to qualify for free delivery.
                </p>
              )}
              <div className="divider" style={{ margin: '16px 0' }} />
              <div className="cart-summary-row cart-summary-total">
                <span>Total</span>
                <span>{formatNaira(total)}</span>
              </div>
              <Link to="/checkout" className="btn btn-primary btn-block" style={{ marginTop: 22 }}>
                Proceed to Checkout
              </Link>
            </aside>
          </>
        )}
      </div>
    </>
  )
}
