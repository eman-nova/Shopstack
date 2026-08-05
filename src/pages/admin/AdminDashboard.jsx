import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getOrders } from '../../utils/orders'
import { getAllProducts } from '../../utils/productStore'
import { formatNaira } from '../../utils/format'

export default function AdminDashboard() {
  const orders = getOrders()
  const products = getAllProducts()

  const stats = useMemo(() => {
    const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0)
    const customers = new Set(orders.map((o) => o.customer?.email)).size
    const lowStock = products.filter((p) => p.inStock === false)
    return {
      totalSales,
      totalOrders: orders.length,
      totalCustomers: customers,
      totalProducts: products.length,
      lowStock,
    }
  }, [orders, products])

  const recentOrders = orders.slice(0, 6)

  return (
    <div>
      <div className="admin-page-head">
        <h1>Dashboard</h1>
        <p className="muted">An overview of GEELUXX store performance.</p>
      </div>

      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <span>Total Sales</span>
          <strong>{formatNaira(stats.totalSales)}</strong>
        </div>
        <div className="admin-stat-card">
          <span>Total Orders</span>
          <strong>{stats.totalOrders}</strong>
        </div>
        <div className="admin-stat-card">
          <span>Total Customers</span>
          <strong>{stats.totalCustomers}</strong>
        </div>
        <div className="admin-stat-card">
          <span>Total Products</span>
          <strong>{stats.totalProducts}</strong>
        </div>
      </div>

      <div className="admin-panel-grid">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <h3>Recent Orders</h3>
            <Link to="/admin/orders" className="link-underline">View All</Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="muted">No orders have been placed yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr><th>Order</th><th>Customer</th><th>Status</th><th>Total</th></tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.customer?.name}</td>
                    <td><span className="admin-status-pill">{o.status}</span></td>
                    <td>{formatNaira(o.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <h3>Low Stock Products</h3>
            <Link to="/admin/products" className="link-underline">Manage</Link>
          </div>
          {stats.lowStock.length === 0 ? (
            <p className="muted">All products are currently in stock.</p>
          ) : (
            <ul className="admin-low-stock-list">
              {stats.lowStock.slice(0, 6).map((p) => (
                <li key={p.id}>
                  <img src={p.image} alt={p.name} />
                  <span>{p.name}</span>
                  <span className="admin-status-pill admin-status-out">Out of Stock</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
