import React, { useState } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import products from '../data/products.js'
import { formatNaira, discountedPrice } from '../utils/format'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { IconMinus, IconPlus, IconTruck, IconReturn, IconShield } from '../components/ui/Icons.jsx'
import ProductGrid from '../components/product/ProductGrid.jsx'
import './product-detail.css'

const RING_SIZES = ['5', '6', '7', '8', '9', '10']

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((p) => p.id === id)
  const { addItem } = useCart()
  const { showToast } = useToast()

  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState(product?.type === 'Rings' ? '7' : null)
  const [activeTab, setActiveTab] = useState('delivery')

  if (!product) return <Navigate to="/shop" replace />

  const finalPrice = discountedPrice(product)
  const related = products
    .filter((p) => p.id !== product.id && (p.type === product.type || p.category === product.category))
    .slice(0, 4)

  function handleAddToCart() {
    addItem(product, quantity, { size })
    showToast(`${product.name} added to cart`, 'success')
  }

  function handleBuyNow() {
    addItem(product, quantity, { size })
    navigate('/cart')
  }

  return (
    <div className="product-detail">
      <div className="container">
        <div className="breadcrumb pd-breadcrumb">
          <Link to="/shop">Shop</Link> / <Link to={`/shop?category=${product.category}`}>{product.category}</Link> / {product.name}
        </div>

        <div className="pd-layout">
          <div className="pd-gallery">
            <div className="pd-gallery-main">
              <img src={product.image} alt={product.name} />
              {product.discount > 0 && <span className="badge badge-sale pd-badge">-{product.discount}%</span>}
              {product.isNew && <span className="badge badge-new pd-badge pd-badge-new">New</span>}
            </div>
          </div>

          <div className="pd-info">
            <span className="pd-type">{product.category} {product.type.replace(/s$/, '')}</span>
            <h1>{product.name}</h1>

            <div className="pd-price">
              <span>{formatNaira(finalPrice)}</span>
              {product.discount > 0 && <s>{formatNaira(product.price)}</s>}
            </div>

            <p className="pd-availability">
              {product.inStock ? (
                <span className="pd-in-stock">In Stock, ready to ship</span>
              ) : (
                <span className="pd-out-stock">Currently Sold Out</span>
              )}
            </p>

            <p className="pd-description">{product.description}</p>

            <dl className="pd-specs">
              <div>
                <dt>Material</dt>
                <dd>{product.category}</dd>
              </div>
              <div>
                <dt>Type</dt>
                <dd>{product.type}</dd>
              </div>
              <div>
                <dt>Authenticity</dt>
                <dd>GEELUXX Certified</dd>
              </div>
            </dl>

            {product.type === 'Rings' && (
              <div className="pd-size">
                <span className="pd-size-label">Select Size</span>
                <div className="pd-size-options">
                  {RING_SIZES.map((s) => (
                    <button
                      key={s}
                      className={`pd-size-btn ${size === s ? 'is-active' : ''}`}
                      onClick={() => setSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pd-actions">
              <div className="pd-quantity">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  <IconMinus />
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
                  <IconPlus />
                </button>
              </div>
              <button className="btn btn-outline pd-add-btn" onClick={handleAddToCart} disabled={!product.inStock}>
                Add to Cart
              </button>
              <button className="btn btn-primary pd-buy-btn" onClick={handleBuyNow} disabled={!product.inStock}>
                Buy Now
              </button>
            </div>

            <div className="pd-trust">
              <div><IconTruck /><span>Delivery within 3 to 7 business days</span></div>
              <div><IconReturn /><span>7 day return window on eligible items</span></div>
              <div><IconShield /><span>Secure checkout and payment protection</span></div>
            </div>

            <div className="pd-tabs">
              <div className="pd-tabs-head">
                {['delivery', 'returns', 'care'].map((tab) => (
                  <button
                    key={tab}
                    className={`pd-tab-btn ${activeTab === tab ? 'is-active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'delivery' ? 'Delivery Information' : tab === 'returns' ? 'Return Information' : 'Jewelry Care'}
                  </button>
                ))}
              </div>
              <div className="pd-tabs-body">
                {activeTab === 'delivery' && (
                  <p>Orders are processed within one to two business days and delivered within three to seven business days depending on your location within Nigeria. A tracking update is sent once your order ships.</p>
                )}
                {activeTab === 'returns' && (
                  <p>Eligible items may be returned within seven days of delivery provided they are unworn and in original packaging. Custom and personalised pieces are final sale.</p>
                )}
                {activeTab === 'care' && (
                  <p>Store your jewelry in a dry, soft lined box away from direct sunlight. Avoid contact with perfume, lotion and water. Clean gently with a soft cloth to maintain shine.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="pd-related">
            <div className="section-head">
              <div>
                <span className="eyebrow">You May Also Like</span>
                <h2 className="section-heading">Related <strong>Products</strong></h2>
              </div>
            </div>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </div>
  )
}
