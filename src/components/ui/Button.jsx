function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) {
  const variants = {
    primary:
      "bg-brand text-white hover:bg-brand-hover disabled:bg-indigo-300",
    secondary:
      "bg-white text-ink border border-line hover:bg-canvas disabled:text-muted",
    outline:
      "bg-transparent text-ink border border-line hover:bg-canvas disabled:text-muted",
    destructive:
      "bg-danger text-white hover:bg-red-700 disabled:bg-red-300",
    ghost:
      "bg-transparent text-muted hover:bg-canvas hover:text-ink",
  };

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-sm",
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
