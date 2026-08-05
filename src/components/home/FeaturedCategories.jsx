import React from 'react'
import { Link } from 'react-router-dom'
import './featured-categories.css'

const CATEGORIES = [
  {
    name: 'Diamond Jewelry',
    desc: 'Brilliant cut stones for radiant moments',
    image: '/images/products/necklaces/necklace-solitaire-diamond.jpg',
    to: '/shop?category=Diamond',
  },
  {
    name: 'Gold Jewelry',
    desc: 'Warm, polished pieces for everyday wear',
    image: '/images/products/bracelets/bracelet-cuban-gold.jpg',
    to: '/shop?category=Gold',
  },
  {
    name: 'Silver Jewelry',
    desc: 'Cool toned sterling silver with modern edge',
    image: '/images/products/necklaces/necklace-cuban-moissanite.jpg',
    to: '/shop?category=Silver',
  },
]

export default function FeaturedCategories() {
  return (
    <section className="section featured-categories">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Shop By Material</span>
            <h2 className="section-heading">Featured <strong>Categories</strong></h2>
          </div>
        </div>
        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <Link to={cat.to} key={cat.name} className="category-card">
              <div className="category-card-media">
                <img src={cat.image} alt={cat.name} loading="lazy" />
              </div>
              <div className="category-card-caption">
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
                <span className="link-underline light">Shop Now</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
