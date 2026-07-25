# Develop Ghana Lab

A production-grade SaaS platform combining a tech blog and digital software marketplace for Ghana.

**Stack:** Next.js 15 · TypeScript · Tailwind CSS · Framer Motion

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` – development server
- `npm run build` – production build
- `npm run start` – start production server
- `npm run lint` – ESLint
- `npm run type-check` – TypeScript check

## Project Structure

```
src/
├── app/                 # App Router pages
├── components/
│   ├── layout/          # Navbar, Footer
│   └── ui/              # Button, Card, Spinner
├── lib/                 # Utilities
├── styles/              # Global CSS
├── constants/           # App constants
└── types/               # TypeScript types
```

## Brand

- Black: `#111111`
- Red: `#E63946`
- Gold: `#FFD700`
- Green: `#006400`

Fonts: Poppins (display) · Open Sans (body)

## Next Phases

1. Authentication (Supabase / NextAuth)
2. User & Admin dashboards
3. Blog CMS
4. Software marketplace + payments (Paystack / Flutterwave)

Built for the Ghana tech community 🇬🇭
