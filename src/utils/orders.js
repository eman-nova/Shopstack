const ORDERS_KEY = 'geeluxx_orders_v1'

export const ORDER_STATUSES = [
  'Order Received',
  'Payment Confirmed',
  'Processing',
  'Packaged',
  'Shipped',
  'Delivered',
  'Cancelled',
]

export function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []
  } catch {
    return []
  }
}

export function saveOrder(order) {
  const orders = getOrders()
  const newOrder = {
    id: `GLX-${Date.now().toString().slice(-8)}`,
    createdAt: new Date().toISOString(),
    status: 'Order Received',
    ...order,
  }
  localStorage.setItem(ORDERS_KEY, JSON.stringify([newOrder, ...orders]))
  return newOrder
}

export function updateOrderStatus(id, status) {
  const orders = getOrders().map((o) => (o.id === id ? { ...o, status } : o))
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export function getOrdersForCustomer(email) {
  return getOrders().filter((o) => o.customer?.email?.toLowerCase() === email.toLowerCase())
}
