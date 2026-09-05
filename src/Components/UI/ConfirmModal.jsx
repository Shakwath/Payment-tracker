import { useEffect } from "react";
import { X, AlertTriangle, CheckCircle2, Info, ShieldAlert } from "lucide-react";

const VARIANTS = {
  info: {
    icon: Info,
    iconClass: "text-primary bg-primary/10",
    confirmClass: "bg-primary hover:bg-primary/90 shadow-primary/20",
    title: "Notice",
  },
  success: {
    icon: CheckCircle2,
    iconClass: "text-emerald-500 bg-emerald-500/10",
    confirmClass: "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20",
    title: "Success",
  },
  warning: {
    icon: AlertTriangle,
    iconClass: "text-amber-500 bg-amber-500/10",
    confirmClass: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20",
    title: "Warning",
  },
  danger: {
    icon: ShieldAlert,
    iconClass: "text-rose-500 bg-rose-500/10",
    confirmClass: "bg-rose-500 hover:bg-rose-600 shadow-rose-500/20",
    title: "Confirm Action",
  },
};

/**
 * ConfirmModal – replaces browser alert() / confirm().
 *
 * Props:
 *  isOpen, onClose, onConfirm, title, message,
 *  confirmLabel, cancelLabel, variant ("info"|"success"|"warning"|"danger")
 */
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "info",
}) => {
  const v = VARIANTS[variant] || VARIANTS.info;
  const Icon = v.icon;

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      {/* Panel */}
      <div
        className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5"
        style={{ animation: "modalIn 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) both" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary transition"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${v.iconClass}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-0.5">
              {variant.toUpperCase()}
            </p>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
              {title || v.title}
            </h2>
          </div>
        </div>

        <div className="h-px bg-slate-100 dark:bg-slate-800" />

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{message}</p>

        <div className={`flex gap-3 ${onConfirm ? "justify-end" : "justify-center"}`}>
          {onConfirm && (
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              {cancelLabel}
            </button>
          )}
          <button
            onClick={() => { if (onConfirm) onConfirm(); else onClose(); }}
            className={`px-5 py-2 rounded-2xl text-sm font-bold text-white shadow-md transition hover:opacity-90 ${v.confirmClass}`}
          >
            {onConfirm ? confirmLabel : "Got it"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.88) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
      `}</style>
    </div>
  );
};

export default ConfirmModal;
