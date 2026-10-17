import { useEffect, useRef } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

export default function ConfirmDeleteModal({ message, deleting, onCancel, onConfirm }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (message) {
      dialogRef.current?.focus();
      const onKey = (e) => e.key === "Escape" && !deleting && onCancel();
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
  }, [message, deleting, onCancel]);

  if (!message) return null;

  return (
    <div className="modal-backdrop" onClick={() => !deleting && onCancel()}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        ref={dialogRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="modal__icon" aria-hidden="true">
          <AlertTriangle size={24} strokeWidth={1.6} />
        </span>
        <h3 id="delete-dialog-title">Delete this message?</h3>
        <p className="modal__quote">&ldquo;{message.message}&rdquo;</p>
        <p className="modal__hint">
          This action cannot be undone. <em>(Demo control — no real message is harmed.)</em>
        </p>
        <div className="modal__actions">
          <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={deleting}>
            Keep it
          </button>
          <button type="button" className="btn btn--danger" onClick={onConfirm} disabled={deleting}>
            {deleting ? (
              <>
                <Loader2 size={15} className="spin" aria-hidden="true" /> Deleting&hellip;
              </>
            ) : (
              "Yes, delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
