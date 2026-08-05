import React, { useState } from 'react'
import { getAllProducts, updateProduct, removeProduct, addProduct } from '../../utils/productStore'
import { formatNaira } from '../../utils/format'
import { IconTrash, IconPlus } from '../../components/ui/Icons.jsx'

const TYPES = ['Rings', 'Necklaces', 'Bracelets', 'Watches']
const CATEGORIES = ['Diamond', 'Gold', 'Silver']

export default function AdminProducts() {
  const [products, setProducts] = useState(getAllProducts())
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    name: '', type: 'Rings', category: 'Gold', price: '', image: '', description: '',
  })

  function refresh() {
    setProducts(getAllProducts())
  }

  function toggleStock(p) {
    updateProduct(p.id, { inStock: !p.inStock })
    refresh()
  }

  function handlePriceChange(p, value) {
    const price = Number(value)
    if (Number.isNaN(price)) return
    updateProduct(p.id, { price })
  }

  function handleDiscountChange(p, value) {
    const discount = Number(value)
    if (Number.isNaN(discount)) return
    updateProduct(p.id, { discount })
  }

  function handleRemove(id) {
    if (!confirm('Remove this product from the catalog?')) return
    removeProduct(id)
    refresh()
  }

  function handleAddSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.price) return
    addProduct({
      name: form.name,
      type: form.type,
      category: form.category,
      price: Number(form.price),
      image: form.image || '/images/products/rings/ring-classic-band.jpg',
      description: form.description,
      inStock: true,
      isNew: true,
      isBestSeller: false,
      discount: 0,
    })
    setForm({ name: '', type: 'Rings', category: 'Gold', price: '', image: '', description: '' })
    setShowForm(false)
    refresh()
  }

  return (
    <div>
      <div className="admin-page-head admin-page-head-row">
        <div>
          <h1>Products</h1>
          <p className="muted">Manage the GEELUXX catalog, pricing and stock.</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm((v) => !v)}>
          <IconPlus /> Add Product
        </button>
      </div>

      {showForm && (
        <form className="admin-form-card" onSubmit={handleAddSubmit}>
          <div className="field-row">
            <div className="field">
              <label>Product Name</label>
              <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
            </div>
            <div className="field">
              <label>Price (NGN)</label>
              <input type="number" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} required />
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label>Type</label>
              <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}>
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Material</label>
              <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="field">
            <label>Image Path</label>
            <input
              placeholder="/images/products/rings/ring-classic-band.jpg"
              value={form.image}
              onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))}
            />
          </div>
          <div className="field">
            <label>Description</label>
            <textarea rows={2} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">Save Product</button>
        </form>
      )}

      <div className="admin-panel">
        <table className="admin-table admin-products-table">
          <thead>
            <tr>
              <th>Product</th><th>Type</th><th>Material</th><th>Price</th><th>Discount %</th><th>Stock</th><th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="admin-product-cell">
                  <img src={p.image} alt={p.name} />
                  <span>{p.name}</span>
                </td>
                <td>{p.type}</td>
                <td>{p.category}</td>
                <td>
                  <input
                    type="number"
                    className="admin-inline-input"
                    defaultValue={p.price}
                    onBlur={(e) => handlePriceChange(p, e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="admin-inline-input admin-inline-input-sm"
                    defaultValue={p.discount || 0}
                    onBlur={(e) => handleDiscountChange(p, e.target.value)}
                  />
                </td>
                <td>
                  <button
                    className={`admin-stock-toggle ${p.inStock ? 'is-in' : 'is-out'}`}
                    onClick={() => toggleStock(p)}
                  >
                    {p.inStock ? 'In Stock' : 'Out of Stock'}
                  </button>
                </td>
                <td>
                  <button className="admin-row-delete" onClick={() => handleRemove(p.id)} aria-label="Delete product">
                    <IconTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="admin-note">
          Price and discount changes save automatically when you click away from the field. This panel
          demonstrates catalog management and stores edits locally, ready to be connected to a live backend.
        </p>
      </div>
    </div>
  )
}
