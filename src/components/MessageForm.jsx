import { useState } from "react";
import { Loader2, Send, ShieldCheck } from "lucide-react";

const MOODS = ["Grateful", "Happy", "Inspired", "Nostalgic"];
const MAX_NAME = 60;
const MAX_MESSAGE = 500;

export default function MessageForm({ onSubmit, submitting }) {
  const [form, setForm] = useState({ name: "", email: "", message: "", mood: "" });
  const [errors, setErrors] = useState({});
  const charsLeft = MAX_MESSAGE - form.message.length;

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    else if (form.name.trim().length > MAX_NAME) next.name = `Name must be ${MAX_NAME} characters or fewer.`;

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "That doesn't look like a valid email address.";

    if (!form.message.trim()) next.message = "Please write a short message.";
    else if (form.message.trim().length > MAX_MESSAGE)
      next.message = `Messages are limited to ${MAX_MESSAGE} characters.`;

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || submitting) return;
    await onSubmit({
      name: form.name,
      email: form.email || undefined,
      message: form.message,
      mood: form.mood || undefined,
    });
    setForm({ name: "", email: "", message: "", mood: "" });
    setErrors({});
  };

  return (
    <section className="form-section container" id="leave-a-message">
      <div className="form-section__header">
        <h2>Leave a Little Something Behind</h2>
        <p>Your words don&rsquo;t have to be perfect. We&rsquo;d simply love to hear from you.</p>
      </div>

      <form className="message-form" onSubmit={handleSubmit} noValidate>
        <div className="field-row">
          <div className={`field ${errors.name ? "field--error" : ""}`}>
            <label htmlFor="guest-name">Name *</label>
            <input
              id="guest-name"
              name="name"
              type="text"
              value={form.name}
              maxLength={MAX_NAME}
              placeholder="e.g. Jane Appleseed"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "guest-name-error" : "guest-name-hint"}
              onChange={(e) => setField("name", e.target.value)}
            />
            <span className="field__hint" id="guest-name-hint">
              {form.name.length}/{MAX_NAME}
            </span>
            {errors.name && (
              <span className="field__error" id="guest-name-error" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          <div className={`field ${errors.email ? "field--error" : ""}`}>
            <label htmlFor="guest-email">Email <span className="field__optional">(optional)</span></label>
            <input
              id="guest-email"
              name="email"
              type="email"
              value={form.email}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "guest-email-error" : undefined}
              onChange={(e) => setField("email", e.target.value)}
            />
            {errors.email && (
              <span className="field__error" id="guest-email-error" role="alert">
                {errors.email}
              </span>
            )}
          </div>
        </div>

        <div className={`field ${errors.message ? "field--error" : ""}`}>
          <label htmlFor="guest-message">Message *</label>
          <textarea
            id="guest-message"
            name="message"
            rows={5}
            value={form.message}
            maxLength={MAX_MESSAGE}
            placeholder="Write something kind, funny, or true…"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "guest-message-error" : "guest-message-count"}
            onChange={(e) => setField("message", e.target.value)}
          />
          <span
            className={`field__hint ${charsLeft < 60 ? "field__hint--warning" : ""}`}
            id="guest-message-count"
          >
            {form.message.length}/{MAX_MESSAGE}
          </span>
          {errors.message && (
            <span className="field__error" id="guest-message-error" role="alert">
              {errors.message}
            </span>
          )}
        </div>

        <fieldset className="field mood-field">
          <legend>How are you feeling? <span className="field__optional">(optional)</span></legend>
          <div className="mood-field__options">
            {MOODS.map((mood) => (
              <label key={mood} className={`mood-chip ${form.mood === mood ? "mood-chip--active" : ""}`}>
                <input
                  type="radio"
                  name="mood"
                  value={mood}
                  checked={form.mood === mood}
                  onChange={() => setField("mood", mood)}
                />
                {mood}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="message-form__footer">
          <p className="privacy-note">
            <ShieldCheck size={15} aria-hidden="true" />
            Your email address is never displayed publicly. It&rsquo;s only used if we need to
            reach you about your message.
          </p>
          <button type="submit" className="btn btn--primary" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 size={17} className="spin" aria-hidden="true" /> Sending&hellip;
              </>
            ) : (
              <>
                <Send size={16} aria-hidden="true" /> Submit Message
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
