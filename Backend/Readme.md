# CampusConnect — Backend

A college-verified microservices platform: marketplace, social feed, announcements, real-time chat, and notifications — scoped to verified students of a single college at a time.

## Architecture

```
                          Frontend (React)
                                │
                        API Gateway (:5000)
                                │
      ┌──────────┬─────────────┼─────────────┬──────────────┐
      ▼          ▼             ▼             ▼              ▼
  Auth (:5001) Listing (:5002) Announcement  Chat (:5004)  Notification
                                (:5003)                     (:5005)
      │          │             │             │              │
  PostgreSQL   MongoDB      PostgreSQL     MongoDB        MongoDB
   (Neon)      (Atlas)       (Neon)        (Atlas)        (Atlas)

              All services share Redis (Upstash) for
              BullMQ queues, rate limiting, and presence
```

Everything is fronted by a single **API Gateway** — the frontend never talks to an individual service directly. The Gateway also proxies WebSocket upgrades for Chat Service.

---

## Services

| Service | Port | Database | Responsibility |
|---|---|---|---|
| **auth-service** | 5001 | PostgreSQL (Prisma) | Signup/OTP/login, JWT issuance, profile, college roster, branch lookup, internal user-lookup for other services |
| **listing-service** | 5002 | MongoDB (Mongoose) | Marketplace items, social posts, comments, likes, reporting/moderation |
| **announcement-service** | 5003 | PostgreSQL (Prisma) | Admin announcements, pinning, attachments, dual-side comments |
| **chat-service** | 5004 | MongoDB (Mongoose) | DM + marketplace-initiated conversations, real-time messaging (Socket.io), blocking |
| **notification-service** | 5005 | MongoDB (Mongoose) | Consumes cross-service events, in-app notifications, selective email, real-time push bridge to Chat Service |
| **api-gateway** | 5000 | — | Single entry point, request routing, WebSocket proxying, general rate limiting |

---

## Core Design Decisions

**College isolation uses `collegeName`, not `collegeId`.** `collegeId` is a student's own unique roll number (e.g. a roster ID) — it cannot be used to group students from the same college, since it's unique per row. `collegeName` is the shared, actual college identifier and is what every college-scoped query filters on across all services.

**JWT payload** (issued by Auth Service, verified independently by every other service):
```json
{ "userId", "role", "collegeId", "collegeName", "branch", "name" }
```
Access tokens live in an `httpOnly` cookie (`accessToken`, 15 min); refresh tokens rotate on use (`refreshToken`, 7 days, tracked in Redis by `jti` for revocation).

**Roster-driven signup.** Students never type their own email. Signup takes `name + collegeId + password`; the college email is looked up from a pre-loaded `StudentRoster` table (uploaded by an admin as CSV) and OTP-verified there. This is what makes college membership trustworthy.

**Cross-service communication is event-based, not synchronous**, except for two deliberate internal REST calls:
- `POST /auth/internal/students` — Notification Service asks Auth Service for a college/branch's user list (bulk announcement fan-out) or a college's admins (moderation alerts). Protected by a shared `X-Internal-Secret` header, not a user JWT.
- Everything else (new comment, new message, new announcement) flows through a single shared BullMQ queue: **`notification-events`**. Producing services describe *what happened*; Notification Service resolves *who to tell* and *how* (in-app vs. email).

**Notification channel policy:** in-app (bell icon) is the default for everything. Only `NEW_ANNOUNCEMENT` and `CONTENT_AUTO_HIDDEN` (moderation alerts) also send email — chat messages, comments, and likes are deliberately in-app only, since email would be too frequent/costly at that volume.

**Real-time bridging.** Chat Service owns the only Socket.io server. Notification Service has no direct socket access, so it publishes to a Redis Pub/Sub channel (`user-notifications`); Chat Service subscribes and re-emits to the recipient's personal room (`user:{userId}`). This is why Chat Service must be running for live notification pushes to reach a connected client — if it's down, notifications still land in-app on next fetch, they just aren't instant.

**Auto-moderation.** Any Marketplace item, Social Post, or Comment that accumulates 5 reports from distinct users is automatically hidden (`isHidden`) and flags the college's admins. Admins can restore (`unban`) or permanently delete.

---

## Local Setup (Docker)

### 1. Per-service `.env` files
Each service directory needs its own `.env`. Minimum required across services:

```
# Shared across all services
REDIS_URL=<Upstash Redis URL>
JWT_SECRET=<same value in every service>
FRONTEND_URL=http://localhost:5173

# auth-service / announcement-service (PostgreSQL)
DATABASE_URL=<Neon pooled connection string>
DIRECT_URL=<Neon direct connection string>

# listing-service / chat-service / notification-service (MongoDB)
MONGODB_URI=<MongoDB Atlas connection string>

# auth-service only
REFRESH_TOKEN_SECRET=<separate secret from JWT_SECRET>
BREVO_API_KEY=<Brevo transactional email key>
BREVO_SENDER_EMAIL=
BREVO_SENDER_NAME=
BCRYPT_SALT_ROUNDS=10
OTP_EXPIRY_MINUTES=10
INTERNAL_SERVICE_SECRET=<shared with notification-service>

# listing-service / announcement-service / chat-service (image/file uploads)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# notification-service only
BREVO_API_KEY= (same as auth-service, or a dedicated key)
AUTH_SERVICE_URL=http://auth-service:5001   # note: service name, not localhost, under Docker
INTERNAL_SERVICE_SECRET=<same value as in auth-service>

# api-gateway only
AUTH_SERVICE_URL=http://auth-service:5001
LISTING_SERVICE_URL=http://listing-service:5002
ANNOUNCEMENT_SERVICE_URL=http://announcement-service:5003
CHAT_SERVICE_URL=http://chat-service:5004
NOTIFICATION_SERVICE_URL=http://notification-service:5005
```

> Inside Docker, services reach each other by **service name** (`http://auth-service:5001`), never `localhost` — each container is its own network namespace. When running a service standalone outside Docker for quick iteration, switch these back to `localhost`.

### 2. Database migrations (Prisma services only)
```bash
cd auth-service && npx prisma migrate deploy
cd ../announcement-service && npx prisma migrate deploy
```

### 3. Run everything
```bash
cd Backend
docker compose up --build
```

This builds and starts all 6 containers. Watch all logs together with `docker compose logs -f`, or scope to one service with `docker compose logs -f notification-service`.

### 4. Seed a college roster
Before any student can sign up, an admin needs student data loaded:
```
POST http://localhost:5000/auth/admin/upload-roster
(multipart/form-data, field name "file", CSV columns: collegeId, collegeName, officialEmail, studentName, branch)
```
This route is `ADMIN`-only — for the very first admin, temporarily disable the role check, sign up normally, manually flip that user's `role` to `ADMIN` in the database, then re-enable the check.

---

## API Surface (via Gateway, `http://localhost:5000`)

| Prefix | Routed to |
|---|---|
| `/auth/*` | auth-service |
| `/listings/*` | listing-service |
| `/announcements/*` | announcement-service |
| `/chat/*` (incl. Socket.io) | chat-service |
| `/notifications/*` | notification-service |

Full route-by-route documentation, request/response shapes, and the reasoning behind each design decision live in the per-service spec docs (`AUTH_SERVICE_SPEC.md`, `LISTING_SERVICE_SPEC.md`, `ANNOUNCEMENT_SERVICE_SPEC.md`, `CHAT_SERVICE_SPEC.md`, `NOTIFICATION_SERVICE_SPEC.md`) and `FRONTEND_SPEC.md` for the planned client structure.

---

## Known Gaps / Deferred to Later

- Automated tests (Jest/Supertest) — testing so far has been manual, via Postman and Docker log inspection.
- `user.nameChanged` sync — if a user edits their display name, older posts/listings/messages keep showing the name as it was when that content was created, until a Pub/Sub sync (designed, not built) ships.
- Brigading defense on the report/auto-hide system — the 5-report threshold currently has no protection against a coordinated false-report attack beyond admin visibility into who reported.
- `npm audit` warnings across a few services — not yet addressed, non-blocking.
- Production deployment (Render) and a production-grade roster — current setup targets local/Docker development against a dev database.
