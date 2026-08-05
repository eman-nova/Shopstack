import React from 'react'
import Hero from '../components/home/Hero.jsx'
import FeaturedCategories from '../components/home/FeaturedCategories.jsx'
import ProductRail from '../components/home/ProductRail.jsx'
import BrandValues from '../components/home/BrandValues.jsx'
import PromoBanner from '../components/home/PromoBanner.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import Newsletter from '../components/home/Newsletter.jsx'
import products from '../data/products.js'

export default function Home() {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4)
  const featured = products.filter((p) => p.isBestSeller).slice(0, 4)

  return (
    <>
      <Hero />
      <FeaturedCategories />
      <ProductRail
        eyebrow="Just In"
        title={<>New <strong>Arrivals</strong></>}
        products={newArrivals}
        viewAllTo="/collections/new-arrivals"
      />
      <BrandValues />
      <ProductRail
        eyebrow="Handpicked"
        title={<>Featured <strong>Products</strong></>}
        products={featured}
        viewAllTo="/shop"
      />
      <PromoBanner />
      <Testimonials />
      <Newsletter />
    </>
  )
}
