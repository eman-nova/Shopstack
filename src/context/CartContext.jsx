import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { discountedPrice } from '../utils/format'

const CartContext = createContext(null)
const STORAGE_KEY = 'geeluxx_cart_v1'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage unavailable, ignore */
    }
  }, [items])

  function addItem(product, quantity = 1, options = {}) {
    const lineId = `${product.id}${options.size ? `-${options.size}` : ''}`
    setItems((prev) => {
      const existing = prev.find((i) => i.lineId === lineId)
      if (existing) {
        return prev.map((i) =>
          i.lineId === lineId ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [
        ...prev,
        {
          lineId,
          id: product.id,
          name: product.name,
          image: product.image,
          price: discountedPrice(product),
          type: product.type,
          size: options.size || null,
          quantity,
        },
      ]
    })
  }

  function removeItem(lineId) {
    setItems((prev) => prev.filter((i) => i.lineId !== lineId))
  }

  function updateQuantity(lineId, quantity) {
    if (quantity < 1) return removeItem(lineId)
    setItems((prev) => prev.map((i) => (i.lineId === lineId ? { ...i, quantity } : i)))
  }

  function clearCart() {
    setItems([])
  }

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  )

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  )

  const value = { items, addItem, removeItem, updateQuantity, clearCart, subtotal, itemCount }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
