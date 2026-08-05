import React from 'react'
import { Link } from 'react-router-dom'
import './promo-banner.css'

export default function PromoBanner() {
  return (
    <section className="promo-banner">
      <div className="promo-media">
        <img src="/images/products/bracelets/bracelet-multishape-tennis.jpg" alt="A diamond tennis bracelet laid on a jewelry box" />
      </div>
      <div className="promo-content">
        <span className="eyebrow">Limited Time</span>
        <h2>The Wedding Edit</h2>
        <p>
          Bridal rings, bands and sets curated for engagements, anniversaries and every
          promise made along the way.
        </p>
        <Link to="/collections/wedding-collection" className="btn btn-primary">
          Shop The Edit
        </Link>
      </div>
    </section>
  )
}
