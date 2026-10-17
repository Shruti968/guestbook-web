import { CheckCircle2, Info, X } from "lucide-react";

const ICONS = { success: CheckCircle2, info: Info };

export default function Toast({ toasts, onDismiss }) {
  return (
    <div className="toast-region" aria-live="polite" aria-label="Notifications">
      {toasts.map((toast) => {
        const Icon = ICONS[toast.type] || CheckCircle2;
        return (
          <div key={toast.id} className={`toast toast--${toast.type}`} role="status">
            <Icon size={18} aria-hidden="true" />
            <p>{toast.message}</p>
            <button type="button" aria-label="Dismiss notification" onClick={() => onDismiss(toast.id)}>
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
