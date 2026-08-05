import React from 'react'
import { Link } from 'react-router-dom'
import { IconPin, IconPhone, IconMail, IconInstagram, IconWhatsapp } from '../ui/Icons.jsx'
import './footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="/images/brand/geeluxx-logo.png" alt="GEELUXX Jewelry" />
            <span>GEELUXX</span>
          </Link>
          <p className="footer-tagline">Fine jewelry as unique as you are.</p>
          <div className="footer-social">
            <a href="https://instagram.com/geeluxx" target="_blank" rel="noreferrer" aria-label="Instagram">
              <IconInstagram />
            </a>
            <a href="https://wa.me/2348138222542" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <IconWhatsapp />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/collections">Collections</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul>
            <li><Link to="/contact">Shipping Information</Link></li>
            <li><Link to="/contact">Returns Policy</Link></li>
            <li><Link to="/contact">Privacy Policy</Link></li>
            <li><Link to="/contact">Terms and Conditions</Link></li>
            <li><Link to="/account">Track My Order</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Get In Touch</h4>
          <ul className="footer-contact">
            <li>
              <IconPin /> <span>Lagos, Nigeria</span>
            </li>
            <li>
              <IconPhone /> <a href="tel:+2348138222542">0813 822 2542</a>
            </li>
            <li>
              <IconMail /> <a href="mailto:hello@geeluxx.com">hello@geeluxx.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>Copyright {year} GEELUXX Jewelry. All rights reserved.</p>
          <p className="footer-admin-link">
            <Link to="/admin/login">Staff Login</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
