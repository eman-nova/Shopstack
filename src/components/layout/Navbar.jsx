import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { IconMenu, IconClose, IconBag, IconUser, IconSearch } from '../ui/Icons.jsx'
import './navbar.css'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/collections', label: 'Collections' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { itemCount } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const lastScrollY = useRef(0)
  const navRef = useRef(null)

  // Hide the navbar while scrolling down the page, and reveal it again
  // once the cursor comes back up to the navbar area (or the page is
  // scrolled back up near the top).
  useEffect(() => {
    function onScroll() {
      const currentY = window.scrollY
      setScrolled(currentY > 12)

      if (currentY < 100) {
        setHidden(false)
      } else if (currentY > lastScrollY.current + 4) {
        setHidden(true)
      } else if (currentY < lastScrollY.current - 4) {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onMouseMove(e) {
      const revealZone = navRef.current?.offsetHeight || 88
      if (e.clientY <= revealZone) {
        setHidden(false)
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  // Never stay hidden while the mobile menu or search panel is in use.
  useEffect(() => {
    if (menuOpen || searchOpen) setHidden(false)
  }, [menuOpen, searchOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [])

  function handleSearchSubmit(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
      setQuery('')
    }
  }

  return (
    <header
      ref={navRef}
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''} ${hidden ? 'navbar-hidden' : ''}`}
      onMouseEnter={() => setHidden(false)}
    >
      <div className="container navbar-inner">
        <button
          className="navbar-burger"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <IconMenu />
        </button>

        <Link to="/" className="navbar-logo" aria-label="GEELUXX Home">
          <img src="/images/brand/geeluxx-logo.png" alt="GEELUXX Jewelry" />
          <span className="navbar-logo-text">
            Geeluxx
            <em>Fine jewelry as unique as you are</em>
          </span>
        </Link>

        <nav className="navbar-links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `navbar-link ${isActive ? 'is-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <button
            className="navbar-icon-btn"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <IconSearch />
          </button>
          <Link
            to={user ? '/account' : '/login'}
            className="navbar-icon-btn navbar-account-btn"
            aria-label="Account"
          >
            <IconUser />
          </Link>
          <Link to="/cart" className="navbar-icon-btn navbar-cart-btn" aria-label="Cart">
            <IconBag />
            {itemCount > 0 && <span className="navbar-cart-count">{itemCount}</span>}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="navbar-search-panel">
          <form className="container navbar-search-form" onSubmit={handleSearchSubmit}>
            <IconSearch />
            <input
              autoFocus
              type="text"
              placeholder="Search rings, necklaces, bracelets, watches"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="button" className="navbar-search-close" onClick={() => setSearchOpen(false)}>
              <IconClose />
            </button>
          </form>
        </div>
      )}

      <div className={`navbar-mobile ${menuOpen ? 'is-open' : ''}`}>
        <div className="navbar-mobile-head">
          <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
            <img src="/images/brand/geeluxx-logo.png" alt="GEELUXX Jewelry" />
          </Link>
          <button aria-label="Close menu" onClick={() => setMenuOpen(false)} className="navbar-icon-btn">
            <IconClose />
          </button>
        </div>
        <nav className="navbar-mobile-links">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `navbar-mobile-link ${isActive ? 'is-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/cart" onClick={() => setMenuOpen(false)} className="navbar-mobile-link">
            Cart {itemCount > 0 ? `(${itemCount})` : ''}
          </NavLink>
          <NavLink to={user ? '/account' : '/login'} onClick={() => setMenuOpen(false)} className="navbar-mobile-link">
            {user ? 'My Account' : 'Login / Register'}
          </NavLink>
        </nav>
      </div>
      {menuOpen && <div className="navbar-mobile-overlay" onClick={() => setMenuOpen(false)} />}
    </header>
  )
}
