import { formatCurrency, hasUnsafeCurrencyPrecision } from "../../utils/format";

function MoneyAmount({ value, className = "" }) {
  const formatted = formatCurrency(value);
  const precisionWarning = hasUnsafeCurrencyPrecision(value);

  return (
    <span
      className={`financial-value block min-w-0 ${className}`}
      title={formatted}
      aria-label={
        precisionWarning
          ? `${formatted}. The numeric value exceeds JavaScript safe precision; the original exact amount may already have been lost.`
          : formatted === "—"
            ? "Amount unavailable"
            : formatted
      }
    >
      {formatted}
    </span>
  );
}

export default MoneyAmount;
