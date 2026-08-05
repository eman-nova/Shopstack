import React from 'react'
import './shop-filters.css'

const TYPES = ['Rings', 'Necklaces', 'Bracelets', 'Watches']
const CATEGORIES = ['Diamond', 'Gold', 'Silver']

export default function ShopFilters({ filters, setFilters, resultCount, mobileOpen, onClose }) {
  function toggleArrayValue(key, value) {
    setFilters((prev) => {
      const list = prev[key]
      const exists = list.includes(value)
      return {
        ...prev,
        [key]: exists ? list.filter((v) => v !== value) : [...list, value],
      }
    })
  }

  function reset() {
    setFilters({ types: [], categories: [], inStockOnly: false, maxPrice: 800000 })
  }

  return (
    <aside className={`shop-filters ${mobileOpen ? 'is-open' : ''}`}>
      <div className="shop-filters-head">
        <h3>Filters</h3>
        <button className="shop-filters-close" onClick={onClose}>Close</button>
      </div>

      <div className="shop-filter-group">
        <h4>Jewelry Type</h4>
        {TYPES.map((t) => (
          <label key={t} className="shop-filter-check">
            <input
              type="checkbox"
              checked={filters.types.includes(t)}
              onChange={() => toggleArrayValue('types', t)}
            />
            {t}
          </label>
        ))}
      </div>

      <div className="shop-filter-group">
        <h4>Material</h4>
        {CATEGORIES.map((c) => (
          <label key={c} className="shop-filter-check">
            <input
              type="checkbox"
              checked={filters.categories.includes(c)}
              onChange={() => toggleArrayValue('categories', c)}
            />
            {c}
          </label>
        ))}
      </div>

      <div className="shop-filter-group">
        <h4>Price Up To</h4>
        <input
          type="range"
          min="50000"
          max="800000"
          step="10000"
          value={filters.maxPrice}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
        />
        <div className="shop-filter-price-label">
          Up to {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(filters.maxPrice)}
        </div>
      </div>

      <div className="shop-filter-group">
        <label className="shop-filter-check">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() => setFilters((prev) => ({ ...prev, inStockOnly: !prev.inStockOnly }))}
          />
          In Stock Only
        </label>
      </div>

      <button className="btn btn-outline btn-block" onClick={reset}>Clear Filters</button>
      <p className="shop-filters-count">{resultCount} products found</p>
    </aside>
  )
}
