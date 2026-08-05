import React from 'react'
import { Link } from 'react-router-dom'
import { formatNaira, discountedPrice } from '../../utils/format'
import { useCart } from '../../context/CartContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import { IconBag } from '../ui/Icons.jsx'
import './product-card.css'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { showToast } = useToast()
  const finalPrice = discountedPrice(product)

  function handleAdd(e) {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    showToast(`${product.name} added to cart`, 'success')
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-media">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="product-card-badges">
          {product.isNew && <span className="badge badge-new">New</span>}
          {product.discount > 0 && <span className="badge badge-sale">-{product.discount}%</span>}
          {!product.inStock && <span className="badge badge-out">Sold Out</span>}
        </div>
        <button
          className="product-card-add"
          onClick={handleAdd}
          disabled={!product.inStock}
          aria-label={`Add ${product.name} to cart`}
        >
          <IconBag /> Add to Cart
        </button>
      </div>
      <div className="product-card-body">
        <span className="product-card-type">{product.category} {product.type.replace(/s$/, '')}</span>
        <h3 className="product-card-name">{product.name}</h3>
        <div className="product-card-price">
          <span>{formatNaira(finalPrice)}</span>
          {product.discount > 0 && <s>{formatNaira(product.price)}</s>}
        </div>
      </div>
    </Link>
  )
}
