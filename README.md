# PeerProducts

<p align="center">
  <img src="public/home/img2.jpg" alt="PeerProducts Preview" width="600" style="border-radius: 12px; max-width: 100%; height: auto;" />
</p>

<p align="center">
  <strong>A modern, type-safe product recommendation social platform where users discover, share, and discuss genuine product recommendations from peers.</strong>
</p>

<p align="center">
  <a href="https://peerproducts.in"><strong>🌐 Live Platform: peerproducts.in</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_16-black?style=flat&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React_19-black?style=flat&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma_ORM-2D3748?style=flat&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-00E599?style=flat&logo=postgresql&logoColor=white" alt="PostgreSQL Neon" />
  <img src="https://img.shields.io/badge/NextAuth.js_v5-purple?style=flat&logo=auth0" alt="NextAuth.js" />
</p>

---

## 🌟 Overview

**PeerProducts** solves the problem of unreliable product reviews and sponsored noise across the web. It connects people with authentic taste by empowering users to publish, discover, and curate genuine product recommendations ("reccs").

Built with **Next.js 16 Server Components**, **React 19**, and a **clean layered OOP architecture**, the application delivers near-instant page transitions, strict security headers, and top-tier SEO and Lighthouse scores.

---

## ✨ Features

- **🔥 Multi-Tier Recommendation Feeds:**
  - **Hot Feed:** Curated, trending product recommendations ranked by community likes and engagement.
  - **Latest Feed:** Chronological, real-time feed showcasing newly shared recommendations.
  - **Following Feed:** Personalized feed streaming recommendations exclusively from creators and friends you follow.
- **📝 Rich Recommendations ("Reccs"):**
  - Share products with title, detailed notes, direct product link, category tag, and image uploads.
  - Image hosting and transformations powered by **Cloudinary**.
  - Interactive like counter and recommendation stats.
- **👤 Social Profiles & Graph:**
  - Custom user profiles (`/profile/[username]`) with editable bios and display names.
  - Follow/Unfollow system with follower and following counters.
  - Dedicated personal recommendations manager (`/reccs`).
- **🔐 Secure Authentication:**
  - Google OAuth sign-in powered by **NextAuth.js / Auth.js v5 (beta)** with Prisma Adapter.
  - Secure session handling across server actions and route handlers.
- **⚡ Layered Architecture & Performance:**
  - Decoupled **Service** and **Repository** design patterns for clean business logic and maintainability.
  - Next.js dynamic caching strategies with fine-grained cache lifecycle invalidation (`cacheLife`, `cacheTag`, `updateTag`).
  - Strict security headers (CSP, HSTS, X-Frame-Options, Permissions-Policy) and dynamic SEO metadata (`sitemap.xml`, `robots.ts`, OpenGraph, Twitter Cards).

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Server Actions) |
| **Frontend Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Database** | [Neon Serverless PostgreSQL](https://neon.tech/) |
| **ORM** | [Prisma ORM v7](https://www.prisma.io/) with `@prisma/adapter-pg` |
| **Authentication** | [NextAuth.js v5](https://authjs.dev/) (Google OAuth Provider) |
| **Media Storage** | [Cloudinary](https://cloudinary.com/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** `>= 20.0.0`
- **npm** (or `pnpm` / `yarn`)
- A **PostgreSQL** database (e.g. [Neon](https://neon.tech/))
- A **Google Cloud Console** project for OAuth credentials
- A **Cloudinary** account for image uploads

### 1. Clone the Repository

```bash
git clone https://github.com/gouravsahax/PeerProducts.git
cd PeerProducts
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```bash
cp .env.example .env
```

Populate the variables with your credentials:

```env
# Database (PostgreSQL / Neon)
DATABASE_URL="postgresql://<user>:<password>@<host>/<database>?sslmode=require"

# Auth.js / NextAuth
AUTH_SECRET="your-generated-secret-value"
AUTH_TRUST_HOST=true
AUTH_URL="http://localhost:3000"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

> **Tip:** You can generate a secure `AUTH_SECRET` by running:
> ```bash
> npx auth secret
> ```
> or `openssl rand -base64 32`.

### 4. Setup Prisma Database

Generate the Prisma Client and push the schema to your database:

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the application.

---

## 📁 Project Structure

```text
peerproducts/
├── actions/              # Next.js Server Actions (Auth, Reccs, User)
├── app/                  # Next.js App Router pages and route handlers
│   ├── api/auth/         # NextAuth route handlers
│   ├── auth/             # Authentication page
│   ├── create/           # Create recommendation page
│   ├── profile/          # User profile view and management
│   ├── reccs/            # User recommendations overview and edit flows
│   ├── settings/         # User settings
│   ├── layout.tsx        # Root application layout & metadata
│   ├── page.tsx          # Homepage feed (Hot, Latest, Following)
│   ├── robots.ts         # Dynamic robots.txt
│   └── sitemap.ts        # Dynamic sitemap.xml
├── components/           # Reusable UI & domain components
│   ├── layout/           # Navbar, footer, shell elements
│   ├── profile/          # Profile headers, follow actions
│   ├── recc/             # Feed cards, media viewer, action buttons
│   └── ui/               # Base UI primitives
├── lib/
│   ├── errors/           # Custom error domain classes
│   ├── repositories/     # Data access layer (Prisma queries)
│   ├── services/         # Domain business logic layer
│   ├── storage/          # Storage abstractions & Cloudinary adapter
│   ├── cloudinary.ts     # Cloudinary configuration
│   └── prisma.ts         # Prisma client initialization
├── prisma/
│   └── schema.prisma     # Prisma database schema
├── public/               # Static assets & sample images
├── auth.ts               # NextAuth v5 configuration
├── next.config.ts        # Next.js configuration & security headers
└── package.json          # Project dependencies & scripts
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs the Next.js development server with hot reload |
| `npm run build` | Generates Prisma client, applies migrations, and compiles production bundle |
| `npm start` | Starts the production server |
| `npm run lint` | Runs ESLint to verify code quality |

---

## 🚢 Deployment

The project is configured for seamless deployment on platforms such as **Render** or **Vercel**:

- **Build Command:** `npm run build` (runs `prisma generate && prisma migrate deploy && next build`)
- **Start Command:** `npm run start`
- Remember to configure all environment variables from `.env.example` in your hosting dashboard.

---

## 📄 License

This project is licensed under the MIT License.