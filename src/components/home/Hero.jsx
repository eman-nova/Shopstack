import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './hero.css'

const SLIDES = [
  {
    src: '/images/products/rings/ring-editorial-gold.jpg',
    alt: 'A diamond halo ring on a dark velvet surface',
  },
  {
    src: '/images/products/necklaces/necklace-tennis-chain.jpg',
    alt: 'Layered diamond tennis necklaces on a mannequin bust',
  },
  {
    src: '/images/products/bracelets/bracelet-tennis-classic.jpg',
    alt: 'A sapphire and diamond tennis bracelet',
  },
  {
    src: '/images/products/necklaces/necklace-cuban-moissanite.jpg',
    alt: 'A moissanite cuban link necklace on a dark bust',
  },
  {
    src: '/images/products/rings/ring-editorial-silver.jpg',
    alt: 'A gold ring resting on deep blue velvet',
  },
  {
    src: '/images/products/bracelets/bracelet-editorial-one.jpg',
    alt: 'A crystal bracelet with its reflection on a dark surface',
  },
  {
    src: '/images/products/necklaces/necklace-pear-set.jpg',
    alt: 'A woman wearing a diamond necklace and matching earring',
  },
  {
    src: '/images/products/bracelets/bracelet-multishape-tennis.jpg',
    alt: 'A diamond tennis bracelet worn on the wrist outdoors',
  },
  {
    src: '/images/products/necklaces/necklace-trio-cuban.jpg',
    alt: 'Layered chain necklaces with a cross pendant',
  },
]

export default function Hero() {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, 5500)
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <section className="hero">
      <div className="hero-media">
        <img
          key={SLIDES[index].src}
          src={SLIDES[index].src}
          alt={SLIDES[index].alt}
          className="hero-media-img"
        />
        <div className="hero-scrim" />
      </div>
      <div className="container hero-content">
        <span className="eyebrow">GEELUXX Jewelry</span>
        <h1>Jewelry as Unique as You Are</h1>
        <p>
          Discover timeless diamond, gold and silver jewelry designed to elevate every
          special moment.
        </p>
        <div className="hero-actions">
          <Link to="/shop" className="btn btn-gold">Shop Now</Link>
          <Link to="/collections" className="btn btn-outline-light">Explore Collections</Link>
        </div>
      </div>
    </section>
  )
}
