import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

function Modal({
  title,
  description,
  onClose,
  children,
  footer,
  wide = false,
  disableClose = false,
}) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const disableCloseRef = useRef(disableClose);
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    onCloseRef.current = onClose;
    disableCloseRef.current = disableClose;
  }, [onClose, disableClose]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    document.body.style.overflow = "hidden";
    const focusableElements = () => {
      const dialog = dialogRef.current;
      if (!dialog) return [];

      return Array.from(
        dialog.querySelectorAll(
          'a[href], button:not(:disabled), input:not(:disabled):not([type="hidden"]), select:not(:disabled), textarea:not(:disabled), [contenteditable="true"], [tabindex]'
        )
      ).filter(
        (element) =>
          element.tabIndex >= 0 &&
          !element.hidden &&
          element.getAttribute("aria-hidden") !== "true" &&
          element.getClientRects().length > 0
      );
    };
    const focusFirst = () => {
      const first = focusableElements()[0] || dialogRef.current;
      first?.focus();
      lastFocusedRef.current = first;
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape" && !disableCloseRef.current) {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key === "Tab") {
        const elements = focusableElements();
        if (elements.length === 0) {
          event.preventDefault();
          dialogRef.current?.focus();
          return;
        }

        const first = elements[0];
        const last = elements[elements.length - 1];
        const activeElement = document.activeElement;
        if (!dialogRef.current?.contains(activeElement)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        } else if (event.shiftKey && activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && activeElement === last) {
          event.preventDefault();
          first.focus();
        } else if (!elements.includes(activeElement)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        }
      }
    };

    const onFocusIn = (event) => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (!dialog.contains(event.target)) {
        const lastFocused = lastFocusedRef.current;
        const target =
          lastFocused?.isConnected && dialog.contains(lastFocused)
            ? lastFocused
            : focusableElements()[0] || dialog;
        target.focus();
      } else {
        lastFocusedRef.current = event.target;
      }
    };

    focusFirst();
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
      if (
        previouslyFocused instanceof HTMLElement &&
        previouslyFocused.isConnected
      ) {
        previouslyFocused.focus();
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40" aria-hidden="true" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={`relative z-10 w-full ${wide ? "max-w-2xl" : "max-w-md"} max-h-[90vh] overflow-y-auto rounded-2xl border border-line bg-surface shadow-float`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 md:px-6">
          <div>
            <h2 id={titleId} className="text-lg font-semibold text-ink">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="mt-1 text-sm text-muted">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={disableClose}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-canvas hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-5 md:px-6">{children}</div>

        {footer && (
          <div className="flex flex-col-reverse gap-3 border-t border-line px-5 py-4 sm:flex-row sm:justify-end md:px-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
