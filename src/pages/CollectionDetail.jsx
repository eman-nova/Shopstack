import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import collections from '../data/collections.js'
import products from '../data/products.js'
import ProductGrid from '../components/product/ProductGrid.jsx'

export default function CollectionDetail() {
  const { slug } = useParams()
  const collection = collections.find((c) => c.slug === slug)

  if (!collection) return <Navigate to="/collections" replace />

  const items = products.filter(collection.filter)

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/collections">Collections</Link> / {collection.name}
          </div>
          <span className="eyebrow">Collection</span>
          <h1>{collection.name}</h1>
          <p>{collection.description}</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 56, paddingBottom: 96 }}>
        <ProductGrid products={items} emptyMessage="No products in this collection just yet, check back soon." />
      </div>
    </>
  )
}
