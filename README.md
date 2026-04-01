# StockFlow MVP

A minimal multi-tenant SaaS inventory management system built with **NestJS**, **MySQL**, and **React**.

## Project Structure

```
stockflow/
├── backend/           # NestJS API (port 3000)
├── frontend/          # React + Vite app (port 5173)
└── docker-compose.yml # MySQL via Docker
```

---

## Quick Start

### 1. Start MySQL

```bash
docker-compose up -d
```
Starts MySQL on port 3306 (db: `stockflow`, user: `root`, pass: `password`)

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env     # edit if your MySQL differs
npm run start:dev
```
API: http://localhost:3000/api

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```
App: http://localhost:5173

---

## API Reference

### Auth
- `POST /api/auth/signup`  — `{ email, password, orgName }`
- `POST /api/auth/login`   — `{ email, password }` → returns JWT

### Products (Bearer JWT required)
- `GET    /api/products`              — list all (optional `?search=`)
- `GET    /api/products/:id`          — get one
- `POST   /api/products`              — create
- `PUT    /api/products/:id`          — update
- `PATCH  /api/products/:id/adjust-stock` — `{ delta: number, note?: string }`
- `DELETE /api/products/:id`          — soft delete

### Dashboard (Bearer JWT required)
- `GET /api/dashboard` — total products, total units, low stock list

### Settings (Bearer JWT required)
- `GET /api/settings`  — get org settings
- `PUT /api/settings`  — `{ lowStockDefault: number }`

---

## Features
- Multi-tenant: each org's data is fully isolated
- JWT auth (7-day expiry) + bcrypt password hashing
- Product CRUD with SKU uniqueness per org
- Soft deletes
- Stock adjustment (+/-) with optional note
- Dashboard summary with low stock alerts
- Global low stock threshold per org (with per-product override)

## Tech Stack
- **Backend**: NestJS 10 + TypeORM + MySQL 8
- **Auth**: JWT + Passport + bcrypt
- **Frontend**: React 18 + TypeScript + Vite + Axios

## Environment Variables (Backend .env)
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=password
DB_NAME=stockflow
JWT_SECRET=change-me-in-production
```

## Production Notes
- Set `synchronize: false` in TypeORM and use migrations
- Change `JWT_SECRET` to a long random string
- Restrict CORS to your actual frontend domain
