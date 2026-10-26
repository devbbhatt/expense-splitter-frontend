import { ArrowDown, ArrowRight, Handshake } from "lucide-react";
import EmptyState from "./ui/EmptyState";
import { formatCurrency } from "../utils/format";

function SettlementTable({ settlements = [] }) {
  return (
    <section className="section-card mt-6 overflow-hidden">
      <div className="border-b border-line px-5 py-4 md:px-6">
        <h2 className="text-base font-semibold text-ink">
          Suggested settlements ({settlements.length})
        </h2>
        <p className="mt-0.5 text-sm text-muted">
          Suggested payments to settle group balances.
        </p>
      </div>

      {settlements.length === 0 ? (
        <EmptyState
          icon={Handshake}
          title="No settlements required"
          description="Everyone in this group is currently settled."
        />
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full">
              <thead className="table-head">
                <tr>
                  <th className="table-cell">From</th>
                  <th className="table-cell">To</th>
                  <th className="table-cell">Amount</th>
                </tr>
              </thead>
              <tbody>
                {settlements.map((settlement, index) => (
                  <tr key={index} className="border-t border-line">
                    <td className="table-cell font-medium">{settlement.fromUserName}</td>
                    <td className="table-cell">
                      <span className="inline-flex items-center gap-2">
                        <ArrowRight size={14} className="text-muted" />
                        {settlement.toUserName}
                      </span>
                    </td>
                    <td className="table-cell font-semibold text-brand">
                      {formatCurrency(settlement.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 p-4 md:hidden">
            {settlements.map((settlement, index) => (
              <div key={index} className="rounded-xl border border-line p-4">
                <p className="font-medium text-ink">{settlement.fromUserName}</p>
                <p className="my-2 flex items-center gap-2 text-sm text-muted">
                  <ArrowDown size={14} />
                  pays
                </p>
                <p className="font-medium text-ink">{settlement.toUserName}</p>
                <p className="mt-3 text-lg font-semibold text-brand">
                  {formatCurrency(settlement.amount)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default SettlementTable;
