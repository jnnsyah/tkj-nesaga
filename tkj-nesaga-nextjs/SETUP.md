## Quick Start

Follow these steps to get AlurKas running locally:

### 1. Install Dependencies

```bash
npm install
```
### 2. Set Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update the values in `.env`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Database Configuration (PostgreSQL via Supabase)
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Important:**

- Use the **pooled connection string** (with `pgbouncer=true`) for `DATABASE_URL`
- Use the **direct connection string** for `DIRECT_URL` (required for migrations)
- Get both connection strings from Supabase Dashboard > Settings > Database

### 5. Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Apply database migrations
npx prisma migrate deploy

# Optional: Open Prisma Studio to view/edit data
npx prisma studio
```

### 6. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000
