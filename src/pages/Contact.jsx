import React, { useState } from 'react'
import { useToast } from '../context/ToastContext.jsx'
import { IconPin, IconPhone, IconMail, IconInstagram, IconWhatsapp } from '../components/ui/Icons.jsx'
import './contact.css'

export default function Contact() {
  const { showToast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      showToast('Message sent, we will get back to you shortly', 'success')
      setForm({ name: '', email: '', message: '' })
    }, 700)
  }

  return (
    <>
      <div className="page-banner">
        <div className="container">
          <span className="eyebrow">We Are Here To Help</span>
          <h1>Contact GEELUXX</h1>
          <p>Questions about a product, an order or a custom request? Reach out any time.</p>
        </div>
      </div>

      <div className="container contact-layout">
        <div className="contact-details">
          <h3>Contact Information</h3>
          <ul className="contact-list">
            <li>
              <IconPin />
              <div>
                <span>Showroom</span>
                <p>Lagos, Nigeria</p>
              </div>
            </li>
            <li>
              <IconPhone />
              <div>
                <span>Phone &amp; WhatsApp</span>
                <p><a href="tel:+2348138222542">0813 822 2542</a></p>
              </div>
            </li>
            <li>
              <IconMail />
              <div>
                <span>Email</span>
                <p><a href="mailto:hello@geeluxx.com">hello@geeluxx.com</a></p>
              </div>
            </li>
          </ul>
          <div className="contact-social">
            <a href="https://instagram.com/geeluxx" target="_blank" rel="noreferrer"><IconInstagram /> geeluxx</a>
            <a href="https://wa.me/2348138222542" target="_blank" rel="noreferrer"><IconWhatsapp /> Chat on WhatsApp</a>
          </div>
          <div className="contact-hours">
            <h4>Business Hours</h4>
            <p>Monday to Saturday, 9am to 7pm</p>
            <p>Sunday, by appointment</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send Us A Message</h3>
          <div className="field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            />
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={5}
              required
              value={form.message}
              onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </>
  )
}
