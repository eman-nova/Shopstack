// GEELUXX curated collections

const collections = [
  {
    slug: 'new-arrivals',
    name: 'New Arrivals',
    description: 'The latest additions to the GEELUXX catalog, fresh in the showroom this season.',
    image: '/images/products/necklaces/necklace-statement-piece.jpg',
    filter: (p) => p.isNew,
  },
  {
    slug: 'best-sellers',
    name: 'Best Sellers',
    description: 'Customer favourites, worn and loved across Lagos and beyond.',
    image: '/images/products/rings/ring-editorial-gold.jpg',
    filter: (p) => p.isBestSeller,
  },
  {
    slug: 'diamond-collection',
    name: 'Diamond Collection',
    description: 'Brilliant cut diamonds set in fine gold and platinum, for moments that call for radiance.',
    image: '/images/products/rings/ring-editorial-silver.jpg',
    filter: (p) => p.category === 'Diamond',
  },
  {
    slug: 'gold-collection',
    name: 'Gold Collection',
    description: 'Warm, polished gold pieces designed for everyday luxury.',
    image: '/images/products/bracelets/bracelet-cuban-gold.jpg',
    filter: (p) => p.category === 'Gold',
  },
  {
    slug: 'silver-collection',
    name: 'Silver Collection',
    description: 'Cool toned sterling silver jewelry with a modern, understated edge.',
    image: '/images/products/necklaces/necklace-cross-pendant.jpg',
    filter: (p) => p.category === 'Silver',
  },
  {
    slug: 'wedding-collection',
    name: 'Wedding Collection',
    description: 'Bridal rings, bands and sets crafted for engagements and forever.',
    image: '/images/products/rings/ring-bridal-set.jpg',
    filter: (p) => p.type === 'Rings' && /bridal|wedding|eternity|solitaire|halo/i.test(p.name),
  },
  {
    slug: 'luxury-watches',
    name: 'Luxury Watches',
    description: 'Timepieces that pair effortlessly with fine jewelry, for every wrist.',
    image: '/images/products/watches/watch-classic-steel-automatic.jpg',
    filter: (p) => p.type === 'Watches',
  },
  {
    slug: 'gift-collection',
    name: 'Gift Collection',
    description: 'Thoughtfully chosen pieces for birthdays, anniversaries and every special occasion.',
    image: '/images/products/necklaces/necklace-earring-set.jpg',
    filter: (p) => p.price < 150000,
  },
]

export default collections
