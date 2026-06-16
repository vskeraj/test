# Welcome to our project

A full-stack online bookstore built with **Next.js (Pages Router)**, **MongoDB/Mongoose**,
**NextAuth**, and **Tailwind CSS**. Users can browse a curated catalog of books, search and
filter by genre, manage a cart and favorites, place orders, and view their dashboard.
Administrators get a dedicated panel to manage inventory.

> 🔗 **Live demo:** _Not deployed yet — add your Vercel URL here after deploying (see [Deployment](#️-deployment-vercel))._

## ✨ Features

- **10+ interconnected pages**: Home, About, Contact, Login, Register, Dashboard, Admin,
  Products, Product Details, Profile, Cart, Favorites — plus bonus Search, FAQ, Terms and a
  custom 404.
- **Authentication & roles** with NextAuth: email/password (Credentials) + Google &
  Facebook OAuth, with `user`/`admin` roles enforced by server-side **middleware**.
- **Full CRUD** for **Products** (admin panel) and **Orders** (checkout + dashboard), plus
  create/delete **Favorites** and stored **Contact messages**.
- **MongoDB** via Mongoose with 5 models: `User`, `Product`, `Favorite`, `Order`, `Message`.
- **All Next.js data-fetching strategies**:
  - SSG + ISR — products list (`getStaticProps` + `revalidate`)
  - SSG + ISR — product details (`getStaticPaths` + `getStaticProps` + `revalidate`)
  - SSR — dashboard (`getServerSideProps`, per-user orders)
- **Forms with validation** using `react-hook-form` + `zod` (Contact, Login, Register,
  Profile) with inline error and success messages. The Contact form persists submissions to
  MongoDB (`POST /api/contact`) for admins to review.
- **State management** with React Context (`CartContext`, `AuthContext`), `useState`/
  `useEffect`, and custom hooks (`useBooks`, `useBook`, `useIsMobile`).
- **Responsive UI** with Tailwind CSS (mobile / tablet / desktop) and shadcn/ui components.
- **Tests** with Vitest + React Testing Library (component + API route tests).

## 🧱 Tech Stack

| Area | Technology |
|------|------------|
| Framework | Next.js 16 (Pages Router), React 18, TypeScript |
| Database | MongoDB + Mongoose |
| Auth | NextAuth (Credentials, Google, Facebook) |
| Styling | Tailwind CSS, shadcn/ui, framer-motion |
| Data/state | TanStack Query, React Context |
| Forms | react-hook-form + zod |
| Testing | Vitest, @testing-library/react |
| Hosting | Vercel |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- A MongoDB database (local `mongod` or a free MongoDB Atlas cluster)

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env.local
# then edit .env.local with your values (see table below)

# 3. Start the dev server
npm run dev
```

Open <http://localhost:3000>. On first load the products API seeds the database from the
built-in catalog (`src/data/books.ts`) if the collection is empty.

### Available scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run lint` | Lint the project |
| `npm test` | Run the Vitest test suite |
| `npm run test:watch` | Run tests in watch mode |

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | ✅ | MongoDB connection string |
| `NEXTAUTH_SECRET` | ✅ | Session signing secret (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | ✅ | App base URL (`http://localhost:3000` in dev, Vercel URL in prod) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | optional | Google OAuth login |
| `FACEBOOK_CLIENT_ID` / `FACEBOOK_CLIENT_SECRET` | optional | Facebook OAuth login |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` / `EMAIL_FROM` | optional | SMTP for password-reset emails. If unset, reset links are logged to the server console. |

To make a user an admin, set their `role` field to `"admin"` in the `users` collection.

### Setting up Google / Facebook OAuth

OAuth sign-in buttons appear on the Login/Register pages. The providers are only
activated when their credentials are present in the environment (otherwise the buttons
return a configuration error instead of crashing the app). To enable them:

- **Google** — create an OAuth client at
  [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials).
  Add an Authorized redirect URI of `${NEXTAUTH_URL}/api/auth/callback/google`
  (e.g. `http://localhost:3000/api/auth/callback/google`). Put the client ID/secret in
  `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`.
- **Facebook** — create an app at
  [Meta for Developers](https://developers.facebook.com/) → Facebook Login. Add a valid
  OAuth redirect URI of `${NEXTAUTH_URL}/api/auth/callback/facebook`. Put the app ID/secret
  in `FACEBOOK_CLIENT_ID` / `FACEBOOK_CLIENT_SECRET`.

On first OAuth sign-in a matching user is auto-created in MongoDB (keyed by email) so
favorites and orders work the same as for email/password accounts.

### Password reset (email)

"Forgot your password?" on the Login page sends a reset link. The token is random,
SHA-256-hashed in the DB, single-use, and expires after 1 hour. To send real email via
Gmail:

1. Enable 2-Step Verification on your Google account, then create an **App Password**
   (Google Account → Security → App passwords).
2. Set `SMTP_USER` to your Gmail address and `SMTP_PASS` to the 16-character App Password
   (defaults: `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`).

If `SMTP_USER`/`SMTP_PASS` are empty, the reset link is logged to the server console
instead — so the flow is fully testable locally without an email provider.

## 🗂️ Project Structure

```
src/
├── components/        # Reusable UI (Header, Footer, BookCard, shadcn/ui, ...)
├── context/           # CartContext, AuthContext
├── hooks/             # useBooks, useBook, useIsMobile
├── lib/               # mongodb connection helper
├── models/            # Mongoose models: User, Product, Favorite, Order, Message
├── pages/             # Routes + API routes
│   └── api/           # products, orders, favorites, contact, auth (NextAuth + signup)
├── data/              # Seed catalog
└── test/              # Test setup
middleware.ts          # Role-based route protection
```

## 🧪 Testing

```bash
npm test
```

Includes 3 component tests (`Button`, `Footer`, `BookCard`) and 2 API route tests
(`GET /api/products`, `POST /api/orders`).

## ☁️ Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Add all environment variables from the table above in **Project → Settings →
   Environment Variables** (set `NEXTAUTH_URL` to your Vercel domain).
4. Deploy. Vercel runs `npm run build` automatically.

## 📸 Screenshots

Drop image files into `docs/screenshots/` with the names below and they will render here.

| Home | Products |
|------|----------|
| ![Home](docs/screenshots/home.png) | ![Products](docs/screenshots/products.png) |

| Product Details | Dashboard |
|-----------------|-----------|
| ![Product Details](docs/screenshots/product-details.png) | ![Dashboard](docs/screenshots/dashboard.png) |

## 👥 Team

| Name | Role |
|------|------|
| _Name_ | _e.g. Frontend / Pages & UI_ |
| _Name_ | _e.g. Backend / API & Auth_ |
| _Name_ | _e.g. Database & Testing_ |
