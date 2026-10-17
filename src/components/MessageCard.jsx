import { useState } from "react";
import { Pencil, Trash2, Quote, Check, X, Loader2 } from "lucide-react";

const MAX_MESSAGE = 500;

const MOOD_COLORS = {
  Grateful: "#7a5c3e",
  Happy: "#355E45",
  Inspired: "#3d5a80",
  Nostalgic: "#8a5a72",
};

function initials(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function MessageCard({ message, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ name: message.name, message: message.message, mood: message.mood || "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const startEdit = () => {
    setDraft({ name: message.name, message: message.message, mood: message.mood || "" });
    setError("");
    setEditing(true);
  };

  const saveEdit = async () => {
    if (!draft.name.trim() || !draft.message.trim()) {
      setError("Name and message can't be empty.");
      return;
    }
    if (draft.message.trim().length > MAX_MESSAGE) {
      setError(`Message must be ${MAX_MESSAGE} characters or fewer.`);
      return;
    }
    setSaving(true);
    try {
      await onEdit(message.id, {
        name: draft.name,
        message: draft.message,
        mood: draft.mood || undefined,
      });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="message-card">
      <span className="message-card__quote" aria-hidden="true">
        <Quote size={22} strokeWidth={1.5} />
      </span>

      {editing ? (
        <div className="message-card__editor">
          <label className="visually-hidden" htmlFor={`edit-name-${message.id}`}>Name</label>
          <input
            id={`edit-name-${message.id}`}
            value={draft.name}
            maxLength={60}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
          />
          <label className="visually-hidden" htmlFor={`edit-message-${message.id}`}>Message</label>
          <textarea
            id={`edit-message-${message.id}`}
            rows={4}
            value={draft.message}
            maxLength={MAX_MESSAGE}
            onChange={(e) => setDraft((d) => ({ ...d, message: e.target.value }))}
          />
          <span className="field__hint">{draft.message.length}/{MAX_MESSAGE}</span>
          {error && (
            <span className="field__error" role="alert">{error}</span>
          )}
          <div className="message-card__editor-actions">
            <button type="button" className="btn btn--primary btn--sm" onClick={saveEdit} disabled={saving}>
              {saving ? <Loader2 size={14} className="spin" aria-hidden="true" /> : <Check size={14} aria-hidden="true" />}
              Save
            </button>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => setEditing(false)} disabled={saving}>
              <X size={14} aria-hidden="true" /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="message-card__text">{message.message}</p>
          <footer className="message-card__footer">
            <span className="avatar" aria-hidden="true">{initials(message.name)}</span>
            <div className="message-card__meta">
              <span className="message-card__name">{message.name}</span>
              <time className="message-card__date" dateTime={message.createdAt}>
                {formatDate(message.createdAt)}
              </time>
            </div>
            {message.mood && (
              <span
                className="message-card__mood"
                style={{ color: MOOD_COLORS[message.mood] || "#355E45" }}
              >
                {message.mood}
              </span>
            )}
            <div className="message-card__actions">
              <button
                type="button"
                className="icon-btn"
                aria-label={`Edit message from ${message.name}`}
                title="Edit (demo)"
                onClick={startEdit}
              >
                <Pencil size={15} />
              </button>
              <button
                type="button"
                className="icon-btn icon-btn--danger"
                aria-label={`Delete message from ${message.name}`}
                title="Delete (demo)"
                onClick={() => onDelete(message)}
              >
                <Trash2 size={15} />
              </button>
            </div>
          </footer>
        </>
      )}
    </article>
  );
}
