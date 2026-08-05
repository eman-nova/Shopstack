import React from 'react'
import { IconStar } from '../ui/Icons.jsx'
import './testimonials.css'

const TESTIMONIALS = [
  {
    name: 'Adaeze O.',
    location: 'Lagos',
    text: 'My engagement ring from GEELUXX is even more beautiful in person. The finish is flawless and it arrived so well packaged.',
  },
  {
    name: 'Chidinma E.',
    location: 'Abuja',
    text: 'I ordered a gold bracelet as a gift for my mother and she has not taken it off since. The quality is genuinely premium.',
  },
  {
    name: 'Tobenna K.',
    location: 'Port Harcourt',
    text: 'Ordering was simple and delivery was fast. The necklace looks exactly like the photos, which does not always happen online.',
  },
]

export default function Testimonials() {
  return (
    <section className="section testimonials">
      <div className="container">
        <div className="section-head text-center-head">
          <div>
            <span className="eyebrow">What Customers Say</span>
            <h2 className="section-heading">Loved By Our <strong>Customers</strong></h2>
          </div>
        </div>
        <div className="testimonial-grid">
          {TESTIMONIALS.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <div className="testimonial-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} />
                ))}
              </div>
              <p>&ldquo;{t.text}&rdquo;</p>
              <span className="testimonial-name">{t.name}</span>
              <span className="testimonial-location">{t.location}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
