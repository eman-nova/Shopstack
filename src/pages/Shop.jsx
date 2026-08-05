import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/product/ProductGrid.jsx'
import ShopFilters from '../components/shop/ShopFilters.jsx'
import { discountedPrice } from '../utils/format'
import products from '../data/products.js'
import './shop.css'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'bestselling', label: 'Best Selling' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    types: [],
    categories: searchParams.get('category') ? [searchParams.get('category')] : [],
    inStockOnly: false,
    maxPrice: 800000,
  })
  const [sort, setSort] = useState('newest')
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat && !filters.categories.includes(cat)) {
      setFilters((prev) => ({ ...prev, categories: [cat] }))
    }
    const q = searchParams.get('q')
    if (q) setQuery(q)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const results = useMemo(() => {
    let list = products.filter((p) => {
      if (filters.types.length && !filters.types.includes(p.type)) return false
      if (filters.categories.length && !filters.categories.includes(p.category)) return false
      if (filters.inStockOnly && !p.inStock) return false
      if (discountedPrice(p) > filters.maxPrice) return false
      if (query.trim()) {
        const q = query.trim().toLowerCase()
        const haystack = `${p.name} ${p.type} ${p.category} ${p.description}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })

    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => discountedPrice(a) - discountedPrice(b))
        break
      case 'price-desc':
        list = [...list].sort((a, b) => discountedPrice(b) - discountedPrice(a))
        break
      case 'bestselling':
        list = [...list].sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller))
        break
      case 'popular':
        list = [...list].sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller) || discountedPrice(b) - discountedPrice(a))
        break
      default:
        list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew))
    }
    return list
  }, [filters, sort, query])

  function handleSearch(e) {
    e.preventDefault()
    setSearchParams(query ? { q: query } : {})
  }

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <span className="eyebrow">The Full Catalog</span>
          <h1>Shop GEELUXX</h1>
          <p>Browse our complete collection of diamond, gold and silver jewelry.</p>
        </div>
      </div>

      <div className="container shop-layout">
        <ShopFilters
          filters={filters}
          setFilters={setFilters}
          resultCount={results.length}
          mobileOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
        />

        <div className="shop-main">
          <div className="shop-toolbar">
            <form className="shop-search" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search products"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>

            <div className="shop-toolbar-right">
              <button className="btn btn-outline btn-sm shop-filter-toggle" onClick={() => setMobileFiltersOpen(true)}>
                Filters
              </button>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="shop-sort-select">
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <ProductGrid products={results} emptyMessage="Try adjusting your filters or search terms." />
        </div>
      </div>

      {mobileFiltersOpen && <div className="shop-filters-overlay" onClick={() => setMobileFiltersOpen(false)} />}
    </>
  )
}
