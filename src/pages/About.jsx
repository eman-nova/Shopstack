import React from 'react'
import { Link } from 'react-router-dom'
import { IconGem, IconShield, IconTruck } from '../components/ui/Icons.jsx'
import './about.css'

export default function About() {
  return (
    <>
      <div className="page-banner">
        <div className="container">
          <span className="eyebrow">Our Story</span>
          <h1>About GEELUXX</h1>
          <p>Fine jewelry as unique as you are.</p>
        </div>
      </div>

      <section className="section about-intro">
        <div className="container about-intro-grid">
          <div className="about-intro-media">
            <img src="/images/products/necklaces/necklace-pear-set.jpg" alt="A model wearing a fine diamond necklace and earrings" />
          </div>
          <div className="about-intro-copy">
            <span className="eyebrow">Who We Are</span>
            <h2 className="section-heading">Crafted For Moments <strong>That Matter</strong></h2>
            <p>
              GEELUXX is a jewelry house specialising in diamond, gold and silver pieces,
              from engagement rings and wedding bands to necklaces, bracelets and fine
              watches. What began as a small, personal collection has grown into a trusted
              name for customers who want jewelry that feels considered rather than
              mass produced.
            </p>
            <p>
              Every piece in our catalog is chosen for its craftsmanship, its finish and the
              way it catches light. We believe jewelry should mark a moment, not just fill a
              jewelry box, and that belief guides every product we carry.
            </p>
            <Link to="/shop" className="btn btn-primary" style={{ marginTop: 8 }}>Explore The Collection</Link>
          </div>
        </div>
      </section>

      <section className="section-tight about-values">
        <div className="container about-values-grid">
          <div className="about-value">
            <IconGem />
            <h4>Considered Craftsmanship</h4>
            <p>Each piece is reviewed for finish, proportion and quality before it reaches our catalog.</p>
          </div>
          <div className="about-value">
            <IconShield />
            <h4>Trust and Transparency</h4>
            <p>Clear pricing, honest descriptions and secure checkout, every single time.</p>
          </div>
          <div className="about-value">
            <IconTruck />
            <h4>Care From Order To Doorstep</h4>
            <p>Thoughtful packaging and reliable delivery across Nigeria, handled with care.</p>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container about-cta-inner">
          <div>
            <span className="eyebrow">Visit Or Reach Out</span>
            <h2>Have A Question Before You Order?</h2>
            <p>Our team is happy to help you find the right piece for the occasion.</p>
          </div>
          <Link to="/contact" className="btn btn-gold">Contact Us</Link>
        </div>
      </section>
    </>
  )
}
