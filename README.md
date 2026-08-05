# GEELUXX Jewelry E-Commerce Website

A responsive, multi page React application for GEELUXX, a Nigerian fine jewelry
brand. Built from the GEELUXX PRD and brand color palette, using the brand's
own product photography and logo.

## Getting Started

Requirements: Node.js 18 or later.

```bash
npm install
npm run dev
```

The site runs at http://localhost:5173

To build for production:

```bash
npm run build
npm run preview
```

The production build is written to `dist/`. Deploy `dist/` to any static host
(Vercel, Netlify, Render static site, etc).

## Demo Accounts

Customer account: register a new account from `/register`.

Admin panel: visit `/admin/login`.

```
Email:    admin@geeluxx.com
Password: admin123
```

## Architecture

This is a client rendered React application (Vite + React Router). It is
structured so a real backend (Node/Express, as recommended in the PRD) can be
dropped in behind the existing service layer with minimal changes to the UI.

```
public/
  fonts/                Lato font files (self hosted, no external font request)
  images/
    brand/               GEELUXX logo and favicon
    products/             Product photography, grouped by type
      rings/
      necklaces/
      bracelets/
      watches/

src/
  main.jsx               App entry, wires up providers and router
  App.jsx                Route definitions, storefront layout vs admin layout

  context/
    CartContext.jsx       Cart state, persisted to localStorage
    AuthContext.jsx        Customer and admin session, demo persistence
    ToastContext.jsx        Lightweight notification system

  data/
    products.js            Product catalog (id, name, type, category, price,
                             image, description, stock, flags)
    collections.js          Curated collections, each with a filter function
                             over the product catalog

  utils/
    format.js               Currency formatting, price and slug helpers
    orders.js                Order persistence (localStorage backed)
    productStore.js           Admin side product overrides layer

  components/
    layout/                 Navbar, Footer, AnnouncementBar
    home/                    Hero, FeaturedCategories, ProductRail,
                              BrandValues, PromoBanner, Testimonials,
                              Newsletter
    product/                 ProductCard, ProductGrid
    shop/                    ShopFilters
    ui/                      Icons (inline SVG, no icon library dependency)
    admin/                   RequireAdmin route guard

  pages/
    Home.jsx, Shop.jsx, Collections.jsx, CollectionDetail.jsx,
    ProductDetail.jsx, About.jsx, Contact.jsx, Cart.jsx, Checkout.jsx,
    OrderConfirmation.jsx, Login.jsx, Register.jsx, NotFound.jsx

    account/                Customer dashboard (profile, orders, addresses,
                              settings), nested under /account
    admin/                   Admin dashboard (overview, products, orders,
                              customers, discounts), nested under /admin
```

### Why this structure

- **Feature folders over one giant components folder.** `home/`, `shop/`,
  `product/`, `admin/` each hold the pieces relevant to that part of the
  site, so a change to the shop filters never requires touching the home
  page.
- **Data and service layers are isolated from UI.** `data/products.js` and
  `data/collections.js` describe the catalog; `utils/orders.js` and
  `utils/productStore.js` are the only places that touch storage. Swapping
  localStorage for real API calls means editing these files only, not the
  page components that consume them.
- **Context for cross cutting state.** Cart, authentication and toast
  notifications are needed across many unrelated pages, so they are lifted
  into React Context rather than passed down as props or duplicated.
- **Two layouts, one router.** `App.jsx` checks the current path and renders
  either the public storefront layout (announcement bar, navbar, footer) or
  the admin layout (sidebar), keeping the admin panel visually and
  structurally separate from the storefront.

### Current data persistence

There is no backend yet, in line with the PRD's phased roadmap. Cart
contents, customer accounts, orders, discount codes and admin catalog edits
are stored in the browser's `localStorage` so the app is fully interactive
and demoable end to end (browse, add to cart, checkout, view order in the
admin dashboard). Every read or write to this data goes through a small
function in `utils/`, so connecting a real Node/Express and database backend
later (as recommended in the PRD) means replacing the internals of those
functions, not rewriting the pages.

Payment is simulated: the checkout flow validates the delivery form, then
marks the order paid and stored. Swapping in a real Paystack or Flutterwave
integration means replacing the `saveOrder` call in `Checkout.jsx` with a
real payment initialization and webhook confirmed status update.

### Design system

All colors, spacing and radii are defined once as CSS variables in
`src/styles/global.css`, taken directly from the GEELUXX color palette
document (deep plum, soft ivory, muted gold, warm taupe, charcoal, stone
gray). Components reference the variables rather than hard coded colors, so
the palette can be retuned from a single file.

Typography uses the brand's Lato font files, self hosted from
`public/fonts` and loaded with `@font-face`, so the site does not depend on
an external font request.

### Responsiveness

Every page uses CSS grid and flexbox with breakpoints for tablet
(around 980px) and mobile (around 640px). The navigation collapses into a
slide in drawer on smaller screens, product grids reflow from four columns
to two, and the admin sidebar becomes a horizontal scroll bar on small
screens.

## Pages implemented

Home, Shop (search, filter by type and material, price range, sort, stock),
Collections and Collection detail, Product detail (gallery, size selection
for rings, quantity, add to cart, buy now, delivery and returns tabs,
related products), Cart, Checkout (delivery form validation, order summary,
mock payment), Order confirmation, Login, Register, Customer account
(profile, order history with a status tracker, saved addresses, settings),
About, Contact, and a full Admin dashboard (overview metrics, product
management with stock and price editing, order management with status
updates, customer list, discount code creation).

## Notes on content

Product names, descriptions and prices were written for this catalog based
on the supplied photography. Recognizable third party watch brand names
present in a couple of the original image filenames were intentionally not
used as product names, since GEELUXX does not hold rights to sell branded
merchandise; those items were renamed to generic descriptive names instead.
