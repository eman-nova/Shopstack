import React from 'react'
import { NavLink, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import AccountOverview from './AccountOverview.jsx'
import AccountOrders from './AccountOrders.jsx'
import AccountAddresses from './AccountAddresses.jsx'
import AccountSettings from './AccountSettings.jsx'
import './account.css'

export default function Account() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) return <Navigate to="/login" state={{ from: '/account' }} replace />
  if (user.role === 'admin') return <Navigate to="/admin" replace />

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="account-page">
      <div className="page-banner">
        <div className="container">
          <span className="eyebrow">My Account</span>
          <h1>Welcome, {user.name.split(' ')[0]}</h1>
        </div>
      </div>

      <div className="container account-layout">
        <aside className="account-nav">
          <NavLink to="/account" end className={({ isActive }) => `account-nav-link ${isActive ? 'is-active' : ''}`}>
            My Profile
          </NavLink>
          <NavLink to="/account/orders" className={({ isActive }) => `account-nav-link ${isActive ? 'is-active' : ''}`}>
            My Orders
          </NavLink>
          <NavLink to="/account/addresses" className={({ isActive }) => `account-nav-link ${isActive ? 'is-active' : ''}`}>
            Saved Addresses
          </NavLink>
          <NavLink to="/account/settings" className={({ isActive }) => `account-nav-link ${isActive ? 'is-active' : ''}`}>
            Account Settings
          </NavLink>
          <button className="account-nav-link account-logout" onClick={handleLogout}>
            Logout
          </button>
        </aside>

        <div className="account-content">
          <Routes>
            <Route index element={<AccountOverview />} />
            <Route path="orders" element={<AccountOrders />} />
            <Route path="addresses" element={<AccountAddresses />} />
            <Route path="settings" element={<AccountSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
