# Gather & Remember — Guestbook Web Application (Frontend)

A warm, editorial-style digital guestbook built with **React + Vite**. Visitors can sign the
guestbook, read messages from others, search/filter, edit, and delete messages.

This frontend is designed to integrate later with a **Python Flask** backend and a
**PostgreSQL** database running in separate **Docker** containers. Until then, it runs fully
standalone on realistic **mock data** (persisted in `localStorage` for demo purposes only).

---

## 1. Quick Start

Requirements: **Node.js 18+** and npm.

```bash
# 1. Unzip / copy the project folder, then enter it
cd guestbook-frontend

# 2. Install dependencies
npm install

# 3. (Optional, for later API integration) create your env file
cp .env.example .env

# 4. Start the dev server
npm run dev
```

Open **http://localhost:5173** — the guestbook works immediately with mock data.

Production build:

```bash
npm run build     # outputs static files to dist/
npm run preview   # serve the production build locally
```

## 2. Project Structure

```
guestbook-frontend/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── README.md
├── public/
└── src/
    ├── main.jsx                  # React entry point
    ├── App.jsx                   # Top-level composition + toast/modal state
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Hero.jsx
    │   ├── GuestbookStats.jsx
    │   ├── MessageForm.jsx       # submission form w/ validation
    │   ├── MessageList.jsx       # list + load more + empty state
    │   ├── MessageCard.jsx       # card w/ inline edit
    │   ├── MessageFilters.jsx    # search / sort / mood filter
    │   ├── AboutSection.jsx
    │   ├── Footer.jsx
    │   ├── ConfirmDeleteModal.jsx
    │   └── Toast.jsx
    ├── hooks/
    │   └── useMessages.js        # state + data flow hook
    ├── services/
    │   └── api.js                # THE ONLY file that talks to a backend
    ├── data/
    │   └── mockMessages.js       # seed mock data (temporary)
    └── styles/
        └── index.css             # full design system / theme
```

## 3. How Mock Mode Works (current state)

- `src/services/api.js` exports `USE_MOCK_API = true`.
- A **mock adapter** implements the same function signatures as the real API
  (`listMessages`, `createMessage`, `updateMessage`, `deleteMessage`, `getStats`).
- Data is seeded from `src/data/mockMessages.js` and stored in `localStorage`
  under the key `guestbook.mock.messages` so edits survive reloads.
- ⚠️ `localStorage` is **not** the database — it exists purely so the frontend demo feels real.
  All real persistence will live in PostgreSQL behind the Flask API.

## 4. Switching to the Real Flask API (next steps)

1. **Backend team implements the endpoints** listed in section 5.
2. Copy `.env.example` → `.env` and set:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```
3. In `src/services/api.js`, set:
   ```js
   export const USE_MOCK_API = false;
   ```
4. Restart the Vite dev server (`npm run dev`).

That's it — the `useMessages` hook and all components already call `api.*` functions, so
nothing else in the frontend changes.

## 5. Expected Backend Endpoints (for the Flask team)

Base URL: configured via `VITE_API_BASE_URL`.

| Method | Endpoint           | Description                          |
|--------|--------------------|--------------------------------------|
| GET    | `/api/messages`    | Retrieve (paginated/filtered) messages |
| POST   | `/api/messages`    | Create a message                     |
| PUT    | `/api/messages/:id`| Update a message                     |
| DELETE | `/api/messages/:id`| Delete a message                     |
| GET    | `/api/stats`       | Guestbook statistics                 |

### GET `/api/messages`
Query params: `page` (default 1), `page_size` (default 6), `search`, `sort` (`newest`|`oldest`), `mood`.

Response `200 OK`:
```json
{
  "messages": [
    {
      "id": "m01",
      "name": "Elena Marsh",
      "message": "Such a lovely space...",
      "mood": "Happy",
      "createdAt": "2026-10-10T14:22:00Z"
    }
  ],
  "total": 12,
  "page": 1,
  "page_size": 6
}
```

### POST `/api/messages`
Request body:
```json
{ "name": "Jane Appleseed", "email": "jane@example.com", "message": "Hello!", "mood": "Happy" }
```
Validation rules (must match frontend): `name` required ≤ 60 chars; `email` optional but must
be valid format; `message` required ≤ 500 chars; `mood` optional ∈ {Grateful, Happy, Inspired, Nostalgic}.

Response `201 Created`: the created message object (same shape as above; `email` is **never**
returned publicly).

### PUT `/api/messages/:id`
Request body: `{ "name": "...", "message": "...", "mood": "..." }` (same validation as POST).
Response `200 OK`: the updated message object.

### DELETE `/api/messages/:id`
Response `204 No Content` (or `200` with `{"ok": true}`).

### GET `/api/stats`
Response `200 OK`:
```json
{ "totalMessages": 12, "messagesThisMonth": 3, "members": 10 }
```

### Error format
Any `4xx/5xx` should return JSON: `{ "error": "Human readable message" }` — the frontend
surfaces this in its toast notifications.

## 6. Docker Notes (whole stack, later)

The frontend builds to static files and can be served by any web server (e.g. Nginx) in its
own container:

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

Environment variable for the built frontend (e.g. injected at container runtime or baked at
build time via `VITE_API_BASE_URL`). **Never** put database credentials in the frontend —
the React app talks only to the Flask API; Flask alone talks to PostgreSQL.

## 7. Features Checklist

- [x] Responsive navbar with mobile menu
- [x] Hero section with imagery and CTAs
- [x] Mock statistics row (clearly labelled as demo data)
- [x] Submission form: validation, character counters, mood selector, loading/success states
- [x] Message grid with avatars, dates, mood labels, quote decoration
- [x] Search by name/message, sort newest/oldest, filter by mood
- [x] Load-more pagination, loading skeleton state, attractive empty state with reset
- [x] Inline editing of messages
- [x] Delete with accessible confirmation modal
- [x] Toast notifications (no `alert()`)
- [x] Semantic HTML, labels, focus states, ARIA, keyboard-friendly modal (Esc to close)
