# peerproducts

> A type-safe product recommendation social network built with Next.js 16, React 19, Prisma, and Neon PostgreSQL.

PeerProducts is a social platform where users can discover, share, and get product recommendations from people with similar tastes, using Next.js 16 Server Components to keep pages fast and easy to browse while staying friendly to accessibility tools and search engines.

The backend is designed with Prisma ORM and Neon PostgreSQL to model users, products, and their social connections. Google OAuth login through NextAuth allows people to sign in securely and start getting personalized recommendations right away, with automated deployments keeping the app reliably up to date on Render.

**Live Platform:** [https://peer.idea-rader.com](https://peer.idea-rader.com)

---

### How to Run Locally

To run this application on your local computer:

1. **Install dependencies:**
   ```bash
   npm i
   ```
   *(Downloads and installs all library packages needed to run the website).*

2. **Generate Database Client & Sync Schema:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```
   *(Builds the database connection tools and sets up the required tables inside PostgreSQL).*

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   *(Starts a local server at http://localhost:3000 where you can see code updates in real-time).*