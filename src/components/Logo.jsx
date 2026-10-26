import { Wallet } from "lucide-react";

function Logo({ compact = false, inverted = false }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
          inverted ? "bg-white/10 text-white" : "bg-brand text-white"
        }`}
      >
        <Wallet size={18} />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className={`text-sm font-semibold ${inverted ? "text-white" : "text-ink"}`}>
            Expense Splitter
          </p>
          <p className={`text-xs ${inverted ? "text-gray-400" : "text-muted"}`}>
            Shared finances
          </p>
        </div>
      )}
    </div>
  );
}

export default Logo;
