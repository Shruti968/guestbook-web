import { useState } from "react";
import { Loader2, MessageSquareOff, RotateCcw } from "lucide-react";
import MessageCard from "./MessageCard.jsx";
import MessageFilters from "./MessageFilters.jsx";

export default function MessageList({ messages, loading, hasMore, onLoadMore, onEdit, onDelete }) {
  const [filters, setFilters] = useState({ search: "", sort: "newest", mood: "all" });

  const filtered = messages
    .filter((m) => {
      const q = filters.search.trim().toLowerCase();
      const matchesSearch = !q || m.name.toLowerCase().includes(q) || m.message.toLowerCase().includes(q);
      const matchesMood = filters.mood === "all" || m.mood === filters.mood;
      return matchesSearch && matchesMood;
    })
    .sort((a, b) =>
      filters.sort === "oldest"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

  const resetFilters = () => setFilters({ search: "", sort: "newest", mood: "all" });
  const isFiltering = filters.search || filters.mood !== "all" || filters.sort !== "newest";

  return (
    <section className="messages-section container" id="guestbook">
      <div className="messages-section__header">
        <h2>Words from Our Visitors</h2>
        <p>Little notes that make this space special.</p>
      </div>

      <MessageFilters filters={filters} onChange={setFilters} />

      {loading ? (
        <div className="messages-section__loading" role="status">
          <Loader2 size={22} className="spin" aria-hidden="true" />
          <p>Reading the guestbook&hellip;</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <MessageSquareOff size={34} strokeWidth={1.4} aria-hidden="true" />
          <h3>No messages found</h3>
          <p>
            {isFiltering
              ? "Nothing matches your search or filters right now."
              : "Be the first to leave a note in the guestbook."}
          </p>
          {isFiltering && (
            <button type="button" className="btn btn--ghost btn--sm" onClick={resetFilters}>
              <RotateCcw size={15} aria-hidden="true" /> Reset filters
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="messages-grid">
            {filtered.map((m) => (
              <MessageCard key={m.id} message={m} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
          {hasMore && (
            <div className="messages-section__more">
              <button type="button" className="btn btn--ghost" onClick={onLoadMore} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 size={16} className="spin" aria-hidden="true" /> Loading&hellip;
                  </>
                ) : (
                  "Load More Messages"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
