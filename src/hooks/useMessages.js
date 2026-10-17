import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../services/api.js";

const PAGE_SIZE = 6;

export function useMessages() {
  const [messages, setMessages] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [filters, setFilters] = useState({ search: "", sort: "newest", mood: "all" });
  const requestId = useRef(0);

  const fetchMessages = useCallback(
    async ({ page: p, append = false, currentFilters = filters }) => {
      const id = ++requestId.current;
      setLoading(true);
      try {
        const data = await api.listMessages({ page: p, pageSize: PAGE_SIZE, ...currentFilters });
        if (id !== requestId.current) return; // stale response
        setMessages((prev) => (append ? [...prev, ...data.messages] : data.messages));
        setTotal(data.total);
        setPage(p);
      } catch (err) {
        console.error("Failed to load messages:", err);
      } finally {
        if (id === requestId.current) setLoading(false);
      }
    },
    [filters]
  );

  // Reload from page 1 whenever filters change
  useEffect(() => {
    fetchMessages({ page: 1, currentFilters: filters });
  }, [fetchMessages, filters]);

  const [stats, setStats] = useState({ totalMessages: 0, messagesThisMonth: 0, members: 0 });

  const refreshStats = useCallback(async () => {
    try {
      setStats(await api.getStats());
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  const addMessage = async (payload) => {
    setSubmitting(true);
    try {
      await api.createMessage(payload);
      await fetchMessages({ page: 1, currentFilters: filters });
      await refreshStats();
    } finally {
      setSubmitting(false);
    }
  };

  const updateMessage = async (id, payload) => {
    await api.updateMessage(id, payload);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...payload, name: payload.name.trim(), message: payload.message.trim() } : m))
    );
    await refreshStats();
  };

  const deleteMessage = async (id) => {
    await api.deleteMessage(id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setTotal((t) => t - 1);
    await refreshStats();
  };

  return {
    messages,
    stats,
    loading,
    submitting,
    filters,
    setFilters,
    hasMore: messages.length < total,
    loadMore: () => fetchMessages({ page: page + 1, append: true }),
    addMessage,
    updateMessage,
    deleteMessage,
  };
}
