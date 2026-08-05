import React from 'react'
import { Link } from 'react-router-dom'
import collections from '../data/collections.js'
import './collections.css'

export default function Collections() {
  return (
    <>
      <div className="page-banner">
        <div className="container">
          <span className="eyebrow">Curated Edits</span>
          <h1>Collections</h1>
          <p>Discover GEELUXX jewelry organised into edits built for every occasion.</p>
        </div>
      </div>

      <div className="container collections-grid">
        {collections.map((c) => (
          <Link to={`/collections/${c.slug}`} key={c.slug} className="collection-card">
            <div className="collection-card-media">
              <img src={c.image} alt={c.name} loading="lazy" />
            </div>
            <div className="collection-card-body">
              <h3>{c.name}</h3>
              <p>{c.description}</p>
              <span className="link-underline">Explore</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
