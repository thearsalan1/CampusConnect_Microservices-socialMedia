# 🎓 CampusConnect

**A college-verified social platform — marketplace, social feed, announcements, and real-time chat, built entirely on a microservices architecture.**

[![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4%20%26%205-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white)](https://neon.tech/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Redis](https://img.shields.io/badge/Redis-Upstash-DC382D?logo=redis&logoColor=white)](https://upstash.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-real--time-010101?logo=socket.io&logoColor=white)](https://socket.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

---

## 📖 What This Is

CampusConnect is a platform built **exclusively for verified students of a single college at a time** — no student sees data from another college, ever. Students sign up using their official college roll number (verified against a roster the college provides), not a self-typed email, which is what makes the "verified" part actually trustworthy rather than just a claim.

Once verified, students get:

| Feature | What It Does |
|---|---|
| 🛒 **Marketplace** | Buy and sell items (books, electronics, cycles) within the college |
| 📰 **Social Feed** | Post updates, like, and comment — college-only |
| 📢 **Announcements** | Admin-posted notices/events, with pinning, attachments, and student Q&A comments |
| 💬 **Real-Time Chat** | DM classmates directly, or start a chat from a marketplace listing — request-based for cold DMs, instant for marketplace inquiries |
| 🔔 **Notifications** | In-app bell for everyday activity; email reserved only for things students shouldn't miss (announcements, moderation alerts) |

---

## 🏗️ Architecture

The backend is **six independently deployable services**, each with its own database, fronted by a single API Gateway:

```
                              ┌─────────────────┐
                              │  React Frontend │   (not built yet)
                              └────────┬────────┘
                                       │
                              ┌────────▼────────┐
                              │   API Gateway    │  :5000
                              │  (routing + WS)  │
                              └────────┬────────┘
        ┌──────────────┬───────────────┼───────────────┬──────────────┐
        ▼              ▼               ▼               ▼              ▼
  ┌──────────┐  ┌─────────────┐  ┌────────────┐  ┌──────────┐  ┌─────────────┐
  │   Auth   │  │   Listing   │  │Announcement│  │   Chat   │  │Notification │
  │  :5001   │  │   :5002     │  │   :5003    │  │  :5004   │  │   :5005     │
  └────┬─────┘  └──────┬──────┘  └─────┬──────┘  └────┬─────┘  └──────┬──────┘
       │               │               │              │               │
  PostgreSQL       MongoDB         PostgreSQL      MongoDB         MongoDB
   (Neon)          (Atlas)          (Neon)         (Atlas)         (Atlas)

                    ▲──────── shared Redis (Upstash) ────────▲
              BullMQ job queues · rate limiting · online presence
```

**Why microservices, not a monolith?** Each domain has genuinely different scaling and data-shape needs — Chat needs persistent WebSocket connections and high-volume message writes; Auth needs strict relational integrity for identity; Listing needs flexible, category-dependent schemas for marketplace items. Splitting them let each one use the database and patterns that actually fit, instead of forcing one shape onto everything.

---

## 🧩 The Services

<table>
<tr><th>Service</th><th>Owns</th><th>Notable Design Choices</th></tr>

<tr>
<td><b>🔐 Auth</b></td>
<td>Identity, sessions, roster, profile</td>
<td>Roster-verified signup (no self-typed email) · JWT access+refresh with rotation · account lockout · OTP hashed at rest</td>
</tr>

<tr>
<td><b>🛒 Listing</b></td>
<td>Marketplace + social posts</td>
<td>One service, two MongoDB collections · shared comment/like/report system across both · 5-report auto-moderation</td>
</tr>

<tr>
<td><b>📢 Announcement</b></td>
<td>Admin notices & events</td>
<td>Any admin can edit/manage any announcement (collaborative model) · dual-side commenting (students <i>and</i> admins) · PDF/image attachments</td>
</tr>

<tr>
<td><b>💬 Chat</b></td>
<td>Conversations & messages</td>
<td>Socket.io real-time layer · one thread per user-pair regardless of origin · request-gated DMs, instant marketplace chats · debounced offline-message notifications</td>
</tr>

<tr>
<td><b>🔔 Notification</b></td>
<td>Cross-service alerts</td>
<td>Consumes one shared BullMQ queue from all producer services · in-app by default, email only for high-stakes events · bridges to Chat's Socket.io server via Redis Pub/Sub for live push</td>
</tr>

<tr>
<td><b>🚪 API Gateway</b></td>
<td>Single entry point</td>
<td>Routes by path prefix · proxies WebSocket upgrades for Chat · general-purpose rate limiting · the only surface the frontend ever talks to</td>
</tr>

</table>

---

## ⚙️ Tech Stack

| Layer | Choices |
|---|---|
| **Language** | TypeScript across every service |
| **HTTP framework** | Express — v5 in Listing, Chat, Notification, and the Gateway; v4 in Auth and Announcement |
| **Relational DB** | PostgreSQL (Neon) via Prisma ORM (Auth, Announcement) |
| **Document DB** | MongoDB (Atlas) via Mongoose (Listing, Chat, Notification) |
| **Cache / Queues** | Redis (Upstash) + BullMQ for job queues, rate limiting, and presence |
| **Real-time** | Socket.io (Chat Service only; others reach it via Redis Pub/Sub) |
| **Auth** | JWT (access + rotating refresh tokens), bcrypt, OTP over email |
| **File storage** | Cloudinary (attachments/images across Listing, Announcement, Chat) |
| **Email** | Brevo transactional email API |
| **Containerization** | Docker + Docker Compose (one container per service, cloud-hosted databases) |

---

## 🔑 Key Engineering Decisions Worth Knowing

**College isolation runs on `collegeName`, not `collegeId`.**
Early in the build, `collegeId` was assumed to double as a college-scoping key — it doesn't, because it's a *student's own unique roll number*, unique per row. Every college-scoped query across every service filters on `collegeName` instead, which is the actual shared identifier.

**Nothing trusts the client for identity or scope.**
`collegeName`, `role`, and `userId` all come from the verified JWT payload — never from a request body or query parameter. This was deliberately re-audited across every service after catching a case where a filter had (incorrectly) accepted `collegeId` from a query string.

**Cross-service talk is event-based, with one narrow exception.**
Services don't call each other synchronously for business logic. A shared `notification-events` BullMQ queue carries "this happened" events; Notification Service resolves who needs to know and how. The one deliberate exception is an internal, secret-protected REST call: Notification Service asking Auth Service for a college's student/admin list (`POST /auth/internal/students`), guarded by a shared `X-Internal-Secret` header instead of a user JWT.

**Real-time bridging goes through Redis, not a shared socket server.**
Chat Service owns the only Socket.io server. Notification Service publishes to a Redis Pub/Sub channel (`user-notifications`); Chat Service subscribes and re-emits to the recipient's personal room. If Chat Service is down, notifications still land in-app on next fetch — they just aren't instant.

**Auto-moderation, not just reporting.**
Content (marketplace items, posts, comments) that gets 5 reports from distinct users is automatically hidden and flags admins — rather than sitting live until someone manually reviews it, or being deleted outright on a single report.

---

## 🚀 Running Locally

### 1. Environment variables
Each service needs its own `.env` — shared secrets (`JWT_SECRET`, `INTERNAL_SERVICE_SECRET`) must match across the services that use them. At minimum you'll need a Neon Postgres URL (Auth, Announcement), a MongoDB Atlas URI (Listing, Chat, Notification), an Upstash Redis URL (all services), and a Cloudinary + Brevo key (wherever uploads/emails happen).

### 2. Database migrations (Prisma services only)
```bash
cd Backend/auth-service && npx prisma migrate deploy
cd ../announcement-service && npx prisma migrate deploy
```

### 3. Run everything
```bash
cd Backend
docker compose up --build
```

Brings up all 6 containers (5 services + gateway) against your cloud databases (Neon/Atlas/Upstash — nothing runs "in Docker" except the app code itself).

### 4. Seed a college roster
Before any student can sign up, an admin needs student data loaded via `POST /auth/admin/upload-roster` (CSV: `collegeId, collegeName, officialEmail, studentName, branch`). For the very first admin, temporarily disable the role check, sign up normally, flip that user's `role` to `ADMIN` directly in the database, then re-enable the check.

Full setup detail (per-service env var lists, API surface via the gateway, and known gaps) lives in [`Backend/Readme.md`](./Backend/Readme.md).

---

## 🗺️ Project Status

- [x] Auth Service
- [x] Listing Service
- [x] Announcement Service
- [x] Chat Service (Socket.io real-time)
- [x] Notification Service
- [x] API Gateway
- [x] Docker Compose (local, multi-service)
- [ ] Automated test suite (testing so far is manual — Postman + Docker log inspection)
- [ ] Production deployment
- [ ] Frontend (React) — not started yet, backend is stable enough to build against

---

## 🧭 Known Gaps

- **No automated tests yet** — Jest/Supertest coverage is planned but not written.
- **`user.nameChanged` sync** — if a student edits their display name, older posts/listings/messages keep showing the name as it was when that content was created, until a designed-but-not-built Pub/Sub sync ships.
- **No brigading defense** — the 5-report auto-hide threshold has no protection against a coordinated false-report attack beyond admin visibility into who reported.
- **Some `npm audit` warnings** across services — noted, non-blocking, not yet addressed.
- **Not deployed anywhere** — current setup targets local Docker development against dev databases.

---

## 👤 Author

Built by **Arsalan** — [GitHub](https://github.com/thearsalan1) · [LinkedIn](https://linkedin.com/in/thearsalan1) · [X](https://x.com/thearsalan_1)

---

<div align="center">

Built as a hands-on, from-scratch microservices project — design, debugging, and all the real-world detours included.

</div>
