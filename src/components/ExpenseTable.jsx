import { useState } from "react";
import { toast } from "react-toastify";
import { Receipt } from "lucide-react";
import api from "../services/api";
import Button from "./ui/Button";
import EmptyState from "./ui/EmptyState";
import { formatCurrency } from "../utils/format";

function ExpenseTable({ expenses, onExpenseDeleted }) {
  const [loadingExpenseId, setLoadingExpenseId] = useState(null);

  const handleDelete = async (expenseId) => {
    if (loadingExpenseId) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      setLoadingExpenseId(expenseId);
      await api.delete(`/expenses/${expenseId}`);
      toast.success("Expense Deleted Successfully");
      onExpenseDeleted();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete expense");
    } finally {
      setLoadingExpenseId(null);
    }
  };

  return (
    <section className="section-card mt-6 overflow-hidden">
      <div className="border-b border-line px-5 py-4 md:px-6">
        <h2 className="text-base font-semibold text-ink">
          Expenses ({expenses.length})
        </h2>
        <p className="mt-0.5 text-sm text-muted">
          Recorded costs and how they were split.
        </p>
      </div>

      {expenses.length === 0 ? (
        <EmptyState
          icon={Receipt}
          title="No expenses found"
          description="Add the first expense to start tracking this group."
        />
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full">
              <thead className="table-head">
                <tr>
                  <th className="table-cell">Description</th>
                  <th className="table-cell">Amount</th>
                  <th className="table-cell">Paid by</th>
                  <th className="table-cell">Split</th>
                  <th className="table-cell">Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id} className="border-t border-line">
                    <td className="table-cell font-medium">{expense.description}</td>
                    <td className="table-cell font-semibold">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="table-cell">{expense.paidBy.name}</td>
                    <td className="table-cell">
                      <span className="rounded-lg bg-brand-soft px-2 py-1 text-xs font-medium text-brand">
                        {expense.splitType}
                      </span>
                    </td>
                    <td className="table-cell">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(expense.id)}
                        disabled={loadingExpenseId === expense.id}
                      >
                        {loadingExpenseId === expense.id ? "Deleting..." : "Delete"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 p-4 md:hidden">
            {expenses.map((expense) => (
              <div key={expense.id} className="rounded-xl border border-line p-4">
                <h3 className="font-semibold text-ink">{expense.description}</h3>
                <p className="mt-2 text-sm">
                  <span className="text-muted">Amount:</span>{" "}
                  <span className="font-semibold">{formatCurrency(expense.amount)}</span>
                </p>
                <p className="mt-1 text-sm">
                  <span className="text-muted">Paid by:</span> {expense.paidBy.name}
                </p>
                <p className="mt-1 text-sm">
                  <span className="text-muted">Split:</span> {expense.splitType}
                </p>
                <Button
                  variant="destructive"
                  className="mt-4 w-full"
                  onClick={() => handleDelete(expense.id)}
                  disabled={loadingExpenseId === expense.id}
                >
                  {loadingExpenseId === expense.id ? "Deleting..." : "Delete expense"}
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default ExpenseTable;
