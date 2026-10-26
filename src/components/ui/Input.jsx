function Input({
  label,
  id,
  error,
  hint,
  className = "",
  ...props
}) {
  const inputId = id || props.name;
  const errorId = error && inputId ? `${inputId}-error` : undefined;
  const hintId = hint && inputId ? `${inputId}-hint` : undefined;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={errorId || hintId}
        className={`min-h-11 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/80 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:bg-canvas ${
          error ? "border-danger" : "border-line"
        } ${className}`}
        {...props}
      />
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-muted">{hint}</p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
