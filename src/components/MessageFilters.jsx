import { Search, ArrowUpDown, Heart } from "lucide-react";

const MOODS = ["all", "Grateful", "Happy", "Inspired", "Nostalgic"];

export default function MessageFilters({ filters, onChange }) {
  const update = (patch) => onChange({ ...filters, ...patch });

  return (
    <div className="filters" role="search">
      <div className="filters__search">
        <Search size={17} aria-hidden="true" />
        <input
          type="search"
          placeholder="Search by name or message…"
          aria-label="Search messages"
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
        />
      </div>

      <div className="filters__group">
        <label className="filters__select">
          <ArrowUpDown size={16} aria-hidden="true" />
          <span className="visually-hidden">Sort messages</span>
          <select
            aria-label="Sort messages"
            value={filters.sort}
            onChange={(e) => update({ sort: e.target.value })}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </label>

        <label className="filters__select">
          <Heart size={16} aria-hidden="true" />
          <span className="visually-hidden">Filter by mood</span>
          <select
            aria-label="Filter by mood"
            value={filters.mood}
            onChange={(e) => update({ mood: e.target.value })}
          >
            {MOODS.map((m) => (
              <option key={m} value={m}>
                {m === "all" ? "All Moods" : m}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
