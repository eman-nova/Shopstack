import React from 'react'
import { IconGem, IconTruck, IconReturn, IconShield } from '../ui/Icons.jsx'
import './brand-values.css'

const VALUES = [
  { icon: IconGem, title: 'Certified Quality', desc: 'Every piece is checked for craftsmanship, finish and authenticity before it reaches you.' },
  { icon: IconTruck, title: 'Reliable Delivery', desc: 'Careful packaging and tracked delivery across Nigeria, on time and intact.' },
  { icon: IconReturn, title: 'Easy Returns', desc: 'A straightforward returns process on eligible items, because trust matters.' },
  { icon: IconShield, title: 'Secure Payment', desc: 'Encrypted checkout and trusted payment providers protect every transaction.' },
]

export default function BrandValues() {
  return (
    <section className="section-tight brand-values">
      <div className="container brand-values-grid">
        {VALUES.map((v) => (
          <div className="brand-value" key={v.title}>
            <v.icon />
            <h4>{v.title}</h4>
            <p>{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
