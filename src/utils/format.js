export function formatCurrency(value) {
  if (
    (typeof value !== "string" && typeof value !== "number" && typeof value !== "bigint") ||
    (typeof value === "number" && !Number.isFinite(value))
  ) {
    return "—";
  }

  const rawValue = String(value).trim();
  const match = rawValue.match(
    /^([+-]?)(?:(\d+)(?:\.(\d*))?|\.(\d+))(?:e([+-]?\d+))?$/i
  );

  if (!match) {
    return "—";
  }

  const [, sign, wholePart = "", fractionalPart = "", leadingFraction = "", exponentText = "0"] =
    match;
  const exponent = Number(exponentText);

  if (!Number.isSafeInteger(exponent) || Math.abs(exponent) > 10_000) {
    return "—";
  }

  let integer = wholePart || "0";
  let fraction = wholePart ? fractionalPart : leadingFraction;
  const decimalPosition = integer.length + exponent;
  const digits = `${integer}${fraction}`;

  if (decimalPosition <= 0) {
    integer = "0";
    fraction = `${"0".repeat(-decimalPosition)}${digits}`;
  } else if (decimalPosition >= digits.length) {
    integer = `${digits}${"0".repeat(decimalPosition - digits.length)}`;
    fraction = "";
  } else {
    integer = digits.slice(0, decimalPosition);
    fraction = digits.slice(decimalPosition);
  }

  integer = integer.replace(/^0+(?=\d)/, "");
  fraction = fraction.replace(/0+$/, "");

  if (fraction.length === 1) {
    fraction = `${fraction}0`;
  }

  const groupedInteger =
    integer.length > 3
      ? `${integer.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",")},${integer.slice(-3)}`
      : integer;
  const isZero = /^0+$/.test(integer) && !fraction;
  const formatted = `${groupedInteger}${fraction ? `.${fraction}` : ""}`;

  return `₹${sign === "-" && !isZero ? "-" : ""}${formatted}`;
}

export function hasUnsafeCurrencyPrecision(value) {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    Math.abs(value) > Number.MAX_SAFE_INTEGER
  );
}

export function formatDate(value) {
  if (!value) {
    return "—";
  }

  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "U";
}
