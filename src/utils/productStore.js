import baseProducts from '../data/products.js'

const OVERRIDES_KEY = 'geeluxx_product_overrides_v1'
const REMOVED_KEY = 'geeluxx_removed_products_v1'
const CUSTOM_KEY = 'geeluxx_custom_products_v1'

function readJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

export function getAllProducts() {
  const overrides = readJSON(OVERRIDES_KEY, {})
  const removed = readJSON(REMOVED_KEY, [])
  const custom = readJSON(CUSTOM_KEY, [])

  const base = baseProducts
    .filter((p) => !removed.includes(p.id))
    .map((p) => ({ ...p, ...(overrides[p.id] || {}) }))

  return [...custom, ...base]
}

export function updateProduct(id, updates) {
  const custom = readJSON(CUSTOM_KEY, [])
  const isCustom = custom.some((p) => p.id === id)

  if (isCustom) {
    const next = custom.map((p) => (p.id === id ? { ...p, ...updates } : p))
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(next))
  } else {
    const overrides = readJSON(OVERRIDES_KEY, {})
    overrides[id] = { ...(overrides[id] || {}), ...updates }
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides))
  }
}

export function addProduct(product) {
  const custom = readJSON(CUSTOM_KEY, [])
  const id = product.id || `custom-${Date.now()}`
  const next = [{ ...product, id }, ...custom]
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(next))
  return id
}

export function removeProduct(id) {
  const custom = readJSON(CUSTOM_KEY, [])
  if (custom.some((p) => p.id === id)) {
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(custom.filter((p) => p.id !== id)))
    return
  }
  const removed = readJSON(REMOVED_KEY, [])
  if (!removed.includes(id)) {
    localStorage.setItem(REMOVED_KEY, JSON.stringify([...removed, id]))
  }
}
