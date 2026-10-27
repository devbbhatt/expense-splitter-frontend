import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ArrowDownRight, ArrowUpRight, FolderKanban, Scale } from "lucide-react";
import api from "../services/api";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import PageHeader from "../components/ui/PageHeader";
import EmptyState from "../components/ui/EmptyState";
import MoneyAmount from "../components/ui/MoneyAmount";

function Balances() {
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBalances = async () => {
    try {
      const response = await api.get("/balances/me");
      setBalances(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load balances");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBalances();
  }, []);

  const totalBalance = balances.reduce((sum, item) => sum + item.balance, 0);
  const youOwe = balances
    .filter((item) => item.balance < 0)
    .reduce((sum, item) => sum + Math.abs(item.balance), 0);
  const youAreOwed = balances
    .filter((item) => item.balance > 0)
    .reduce((sum, item) => sum + item.balance, 0);

  return (
    <Layout>
      <PageHeader
        title="My balances"
        description="Balance summary across all your groups."
      />

      {loading ? (
        <Loading label="Loading balances" />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="section-card p-5">
              <p className="flex items-center gap-2 text-sm text-muted">
                <Scale size={16} />
                Net balance
              </p>
              <MoneyAmount
                value={totalBalance}
                className={`mt-3 text-2xl font-semibold ${
                  totalBalance >= 0 ? "text-success" : "text-danger"
                }`}
              />
              <p className="mt-1 text-xs text-muted">
                {totalBalance >= 0 ? "Overall receivable" : "Overall owed"}
              </p>
            </div>
            <div className="section-card p-5">
              <p className="flex items-center gap-2 text-sm text-muted">
                <ArrowDownRight size={16} />
                You owe
              </p>
              <MoneyAmount
                value={youOwe}
                className="mt-3 text-2xl font-semibold text-danger"
              />
              <p className="mt-1 text-xs text-muted">Negative group balances</p>
            </div>
            <div className="section-card p-5">
              <p className="flex items-center gap-2 text-sm text-muted">
                <ArrowUpRight size={16} />
                You are owed
              </p>
              <MoneyAmount
                value={youAreOwed}
                className="mt-3 text-2xl font-semibold text-success"
              />
              <p className="mt-1 text-xs text-muted">Positive group balances</p>
            </div>
          </div>

          <section className="section-card mt-6 overflow-hidden">
            <div className="border-b border-line px-5 py-4 md:px-6">
              <h2 className="text-base font-semibold text-ink">Group-wise balances</h2>
              <p className="mt-0.5 text-sm text-muted">
                Positive amounts are receivable. Negative amounts are owed.
              </p>
            </div>

            {balances.length === 0 ? (
              <EmptyState
                icon={FolderKanban}
                title="No balance found"
                description="Join or create a group and add expenses to see balances."
              />
            ) : (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <table className="min-w-full">
                    <thead className="table-head">
                      <tr>
                        <th className="table-cell">Group</th>
                        <th className="table-cell">Balance</th>
                        <th className="table-cell">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {balances.map((item, index) => (
                        <tr key={index} className="border-t border-line">
                          <td className="table-cell break-words font-medium">{item.groupName}</td>
                          <td
                            className={`table-cell font-semibold ${
                              item.balance >= 0 ? "text-success" : "text-danger"
                            }`}
                          >
                            <MoneyAmount value={item.balance} className="font-semibold" />
                          </td>
                          <td className="table-cell text-muted">
                            {item.balance >= 0 ? "You are owed" : "You owe"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-3 p-4 md:hidden">
                  {balances.map((item, index) => (
                    <div key={index} className="rounded-xl border border-line p-4">
                      <p className="break-words font-medium text-ink">{item.groupName}</p>
                      <MoneyAmount
                        value={item.balance}
                        className={`mt-2 text-lg font-semibold ${
                          item.balance >= 0 ? "text-success" : "text-danger"
                        }`}
                      />
                      <p className="mt-1 text-sm text-muted">
                        {item.balance >= 0 ? "You are owed" : "You owe"}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        </>
      )}
    </Layout>
  );
}

export default Balances;
