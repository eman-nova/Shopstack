import React from 'react'
import ProductCard from './ProductCard.jsx'
import './product-grid.css'

export default function ProductGrid({ products, emptyMessage = 'No products match your search.' }) {
  if (!products.length) {
    return (
      <div className="empty-state">
        <h3>Nothing here yet</h3>
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
