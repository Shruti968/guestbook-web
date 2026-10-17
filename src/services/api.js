// ---------------------------------------------------------------------------
// API SERVICE LAYER
// This is the ONLY file that talks to the backend. Components never call
// fetch() directly — they go through these functions.
//
// HOW TO SWITCH FROM MOCK DATA TO THE REAL FLASK API:
//   1. Set VITE_API_BASE_URL in your .env file (copy .env.example).
//   2. Set USE_MOCK_API = false below.
//   3. The Flask backend must implement the endpoints documented in README.md.
// ---------------------------------------------------------------------------

import { MOCK_MESSAGES } from "../data/mockMessages.js";

export const USE_MOCK_API = true; // <-- flip to false when the Flask backend is ready

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Simulated network latency so loading states are visible during demo
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// ---------------------------------------------------------------------------
// Mock adapter (frontend-only demo, persisted in localStorage)
// ---------------------------------------------------------------------------

const STORAGE_KEY = "guestbook.mock.messages";

function readMockStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* fall through to seed */
  }
  const seeded = MOCK_MESSAGES.map((m) => ({ ...m }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  return seeded;
}

function writeMockStore(messages) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

const mockApi = {
  async listMessages({ page = 1, pageSize = 6, search = "", sort = "newest", mood = "all" } = {}) {
    await delay(450);
    let items = readMockStore();

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter(
        (m) => m.name.toLowerCase().includes(q) || m.message.toLowerCase().includes(q)
      );
    }
    if (mood && mood !== "all") {
      items = items.filter((m) => m.mood === mood);
    }
    items.sort((a, b) =>
      sort === "oldest"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

    const total = items.length;
    const start = (page - 1) * pageSize;
    return { messages: items.slice(start, start + pageSize), total, page, pageSize };
  },

  async createMessage({ name, email, message, mood }) {
    await delay(600);
    const items = readMockStore();
    const newMessage = {
      id: `m-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      mood: mood || null,
      createdAt: new Date().toISOString(),
    };
    writeMockStore([newMessage, ...items]);
    return newMessage;
  },

  async updateMessage(id, { name, message, mood }) {
    await delay(500);
    const items = readMockStore();
    const index = items.findIndex((m) => m.id === id);
    if (index === -1) throw new Error("Message not found");
    items[index] = { ...items[index], name: name.trim(), message: message.trim(), mood: mood || null };
    writeMockStore(items);
    return items[index];
  },

  async deleteMessage(id) {
    await delay(500);
    writeMockStore(readMockStore().filter((m) => m.id !== id));
    return { ok: true };
  },

  async getStats() {
    await delay(300);
    const items = readMockStore();
    const now = new Date();
    return {
      totalMessages: items.length,
      messagesThisMonth: items.filter((m) => {
        const d = new Date(m.createdAt);
        return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
      }).length,
      members: new Set(items.map((m) => m.name.toLowerCase())).size,
    };
  },
};

// ---------------------------------------------------------------------------
// Real API adapter (Flask backend) — used when USE_MOCK_API = false
// ---------------------------------------------------------------------------

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }
  return res.json();
}

const realApi = {
  listMessages: ({ page = 1, pageSize = 6, search = "", sort = "newest", mood = "all" } = {}) =>
    request(`/api/messages?page=${page}&page_size=${pageSize}&search=${encodeURIComponent(search)}&sort=${sort}&mood=${mood}`),
  createMessage: (payload) => request("/api/messages", { method: "POST", body: JSON.stringify(payload) }),
  updateMessage: (id, payload) => request(`/api/messages/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteMessage: (id) => request(`/api/messages/${id}`, { method: "DELETE" }),
  getStats: () => request("/api/stats"),
};

export const api = USE_MOCK_API ? mockApi : realApi;
