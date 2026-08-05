import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../product/ProductCard.jsx'
import './product-rail.css'

export default function ProductRail({ eyebrow, title, products, viewAllTo }) {
  return (
    <section className="section product-rail">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="section-heading">{title}</h2>
          </div>
          {viewAllTo && (
            <Link to={viewAllTo} className="link-underline">View All</Link>
          )}
        </div>
        <div className="product-rail-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
