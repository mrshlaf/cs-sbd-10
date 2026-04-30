# Marshal Store — Premium Digital Marketplace

A premium dark-themed e-commerce frontend built with **Next.js 16** + **Tailwind CSS 4**, connecting to an Express.js backend from SBD Modul 8.

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero landing page with features showcase |
| Login | `/login` | Authentication with JWT |
| Register | `/register` | New account creation |
| Collection | `/items` | Product catalog with search & filtering |
| Profile | `/profile` | User dashboard with wallet balance |

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4, TypeScript
- **Backend**: Express.js (Modul 8)
- **Database**: PostgreSQL
- **Cache**: Redis
- **Auth**: JWT (JSON Web Tokens)

## Getting Started

### 1. Start the Backend

```bash
cd backend
npm install
node server.js
```

> Backend runs on **port 5000**. Ensure PostgreSQL and Redis are active.

### 2. Start the Frontend

```bash
npm install
npm run dev
```

> Frontend runs on **port 3000**. Open [http://localhost:3000](http://localhost:3000).

### Demo Account

- **Email**: `alice@example.com`
- **Password**: `password123`

## Author

- **Name**: Marshal Aufa
- **NPM**: 2406346913

---
*Database Systems (SBD) — Modul 10*
