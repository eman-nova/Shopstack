import React, { useState } from 'react'
import { useToast } from '../../context/ToastContext.jsx'
import './newsletter.css'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const { showToast } = useToast()

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim()) return
    showToast('Thank you for subscribing to GEELUXX updates', 'success')
    setEmail('')
  }

  return (
    <section className="newsletter">
      <div className="container newsletter-inner">
        <div>
          <span className="eyebrow">Stay Connected</span>
          <h2>Join The GEELUXX Circle</h2>
          <p>Be the first to know about new arrivals, exclusive collections and private offers.</p>
        </div>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            required
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn-gold">Subscribe</button>
        </form>
      </div>
    </section>
  )
}
