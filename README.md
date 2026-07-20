# peerproducts

> A type-safe product recommendation social network built with Next.js 16, React 19, Prisma, and Neon PostgreSQL.

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