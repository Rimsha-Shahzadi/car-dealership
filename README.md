# DriveHub — Car Rental Landing Page + Auth + Dashboard

Next.js 14 (App Router) + TypeScript + Prisma + NextAuth.js + Tailwind CSS.

## Tech stack

- **Next.js 14** (App Router, Server Components + Route Handlers)
- **TypeScript**
- **Prisma ORM** — PostgreSQL in production, SQLite for local dev
- **NextAuth.js** (Credentials provider — email/password, JWT sessions)
- **Tailwind CSS** — responsive, dark mode (`class` strategy)
- **Jest + React Testing Library** — sample unit/integration tests

## File tree

```
car-dealership/
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.js
├── jest.config.js
├── .env.example
├── prisma/
│   ├── schema.prisma        # User, Car, Booking models
│   └── seed.ts               # demo users, cars, bookings
├── src/
│   ├── app/
│   │   ├── layout.tsx         # root layout, SEO metadata, SessionProvider
│   │   ├── page.tsx           # "/" landing page
│   │   ├── globals.css
│   │   ├── signup/page.tsx    # "/signup"
│   │   ├── login/page.tsx     # "/login"
│   │   ├── dashboard/page.tsx # "/dashboard" (protected)
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── users/route.ts     # POST signup, GET list
│   │       ├── cars/route.ts      # GET list, POST create
│   │       └── bookings/route.ts  # GET my bookings, POST create
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── CarCard.tsx
│   │   ├── Features.tsx
│   │   ├── SignupForm.tsx
│   │   ├── LoginForm.tsx
│   │   ├── DashboardLayout.tsx
│   │   ├── StatsCard.tsx
│   │   └── Providers.tsx      # client-side SessionProvider wrapper
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client singleton
│   │   └── auth.ts            # NextAuthOptions (Credentials provider)
│   └── types/
│       └── next-auth.d.ts     # extends Session/User with id, role
└── __tests__/
    ├── CarCard.test.tsx
    └── api.bookings.test.ts
```

## Data model (1‑to‑many relationships)

- **User 1—* Booking**: a user can have many bookings.
- **Car 1—* Booking**: a car can have many bookings.
- `Booking` holds foreign keys `userId` and `carId`.

```prisma
model User { id String @id @default(cuid()); bookings Booking[] }
model Car  { id String @id @default(cuid()); bookings Booking[] }
model Booking {
  id String @id @default(cuid())
  userId String
  user User @relation(fields: [userId], references: [id])
  carId String
  car Car @relation(fields: [carId], references: [id])
}
```

## Setup

```bash
npm install

cp .env.example .env
# edit .env: set DATABASE_URL and NEXTAUTH_SECRET
# generate a secret: openssl rand -base64 32
```

### Local dev with SQLite (fastest)

In `prisma/schema.prisma` change:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

`.env`:
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."
```

### Production with PostgreSQL

Keep `provider = "postgresql"` and set:
```
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

### Migrate + seed

```bash
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Seeded accounts (password for both: `Password123!`):
- `admin@example.com` (role: ADMIN)
- `demo@example.com` (role: USER, has 2 sample bookings)

### Run tests

```bash
npm test
```

## Notes / next steps for a production build

- Add authorization checks (e.g. admin-only) to `POST /api/cars`.
- Add server-side validation (e.g. Zod) on all API routes instead of trusting `req.json()`.
- Add rate limiting on `/api/users` (signup) and the credentials login.
- Add a proper booking form UI wired to `POST /api/bookings` (the `CarCard` "Book now" button is currently a UI stub).
- Swap Tailwind's `class` dark mode toggle for a `next-themes` provider if you want a user-facing light/dark switch.
