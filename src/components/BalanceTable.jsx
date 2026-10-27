import { Scale } from "lucide-react";
import EmptyState from "./ui/EmptyState";
import MoneyAmount from "./ui/MoneyAmount";

function BalanceTable({ balances = [] }) {
  const balanceList = Array.isArray(balances) ? balances : [];

  return (
    <section className="section-card mt-6 overflow-hidden">
      <div className="border-b border-line px-5 py-4 md:px-6">
        <h2 className="text-base font-semibold text-ink">
          Balances ({balanceList.length})
        </h2>
        <p className="mt-0.5 text-sm text-muted">
          Positive amounts are receivable. Negative amounts are owed.
        </p>
      </div>

      {balanceList.length === 0 ? (
        <EmptyState
          icon={Scale}
          title="No balances found"
          description="Balances will appear after expenses are added."
        />
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full">
              <thead className="table-head">
                <tr>
                  <th className="table-cell">User</th>
                  <th className="table-cell">Balance</th>
                  <th className="table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {balanceList.map((balance) => (
                  <tr key={balance.userId} className="border-t border-line">
                    <td className="table-cell break-words font-medium">{balance.userName}</td>
                    <td
                      className={`table-cell font-semibold ${
                        balance.balance >= 0 ? "text-success" : "text-danger"
                      }`}
                    >
                      <MoneyAmount value={balance.balance} className="font-semibold" />
                    </td>
                    <td className="table-cell text-muted">
                      {balance.balance >= 0 ? "Will receive money" : "Needs to pay"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 p-4 md:hidden">
            {balanceList.map((balance) => (
              <div key={balance.userId} className="rounded-xl border border-line p-4">
                <h3 className="break-words font-semibold text-ink">{balance.userName}</h3>
                <MoneyAmount
                  value={balance.balance}
                  className={`mt-2 text-lg font-semibold ${
                    balance.balance >= 0 ? "text-success" : "text-danger"
                  }`}
                />
                <p className="mt-1 text-sm text-muted">
                  {balance.balance >= 0 ? "Will receive money" : "Needs to pay"}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default BalanceTable;
