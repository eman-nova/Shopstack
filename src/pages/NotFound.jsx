import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
      <span className="eyebrow">404</span>
      <h1 className="section-heading">This Page Could Not Be Found</h1>
      <p className="muted" style={{ marginTop: 14, marginBottom: 30 }}>
        The page you are looking for may have been moved or no longer exists.
      </p>
      <Link to="/" className="btn btn-primary">Return Home</Link>
    </div>
  )
}
