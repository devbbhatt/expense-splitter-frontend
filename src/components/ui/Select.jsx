function Select({
  label,
  id,
  error,
  children,
  className = "",
  ...props
}) {
  const selectId = id || props.name;
  const errorId = error && selectId ? `${selectId}-error` : undefined;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <select
        id={selectId}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={errorId}
        className={`min-h-11 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:bg-canvas ${
          error ? "border-danger" : "border-line"
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default Select;
