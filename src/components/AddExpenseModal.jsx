import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Button from "./ui/Button";

function AddExpenseModal({
  groupId,
  members,
  onClose,
  onExpenseCreated,
}) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [splitType, setSplitType] = useState("EQUAL");
  const [loading, setLoading] = useState(false);
  const [splits, setSplits] = useState([]);
  const [errors, setErrors] = useState({});

  const handleSplitChange = (userId, value) => {
    setSplits((prev) => {
      const filtered = prev.filter((split) => split.userId !== userId);

      return [
        ...filtered,
        {
          userId,
          amount: Number(value),
        },
      ];
    });
  };

  const handleCreateExpense = async () => {
    if (loading) return;

    if (!description.trim()) {
      setErrors((current) => ({
        ...current,
        description: "Enter an expense description.",
      }));
      toast.warning("Please enter description");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setErrors((current) => ({
        ...current,
        amount: "Enter an amount greater than zero.",
      }));
      toast.warning("Please enter valid amount");
      return;
    }

    if (splitType === "EXACT" && splits.length !== members.length) {
      const enteredUserIds = new Set(splits.map((split) => split.userId));
      setErrors((current) => ({
        ...current,
        splits: Object.fromEntries(
          members
            .filter((member) => !enteredUserIds.has(member.userId))
            .map((member) => [
              member.userId,
              "Enter a split amount for this member.",
            ])
        ),
      }));
      toast.warning("Please enter split amount for every member");
      return;
    }

    try {
      setLoading(true);

      await api.post(`/expenses/groups/${groupId}/expenses`, {
        description,
        amount: Number(amount),
        splitType,
        splits,
      });

      toast.success("Expense Created Successfully");
      onExpenseCreated();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to create expense"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add expense"
      description="Record a new expense and split it equally or by exact amounts."
      onClose={onClose}
      disableClose={loading}
      wide
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={handleCreateExpense} disabled={loading} className="w-full sm:w-auto">
            {loading ? "Creating..." : "Create expense"}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label="Description"
          id="expense-description"
          type="text"
          placeholder="Dinner, groceries, taxi..."
          error={errors.description}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors((current) => ({ ...current, description: "" }));
          }}
          disabled={loading}
        />

        <Input
          label="Amount"
          id="expense-amount"
          type="number"
          placeholder="0.00"
          error={errors.amount}
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setErrors((current) => ({ ...current, amount: "" }));
          }}
          disabled={loading}
        />

        <Select
          label="Split type"
          id="split-type"
          value={splitType}
          onChange={(e) => setSplitType(e.target.value)}
          disabled={loading}
        >
          <option value="EQUAL">Equal</option>
          <option value="EXACT">Exact</option>
        </Select>

        {splitType === "EXACT" && (
          <div>
            <h3 className="mb-3 text-sm font-medium text-ink">Split amounts</h3>
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.userId}
                  className="flex flex-col gap-2 rounded-xl border border-line p-3 md:flex-row md:items-center md:justify-between"
                >
                  <span className="min-w-0 break-words text-sm font-medium text-ink">
                    {member.userName}
                  </span>
                  <Input
                    type="number"
                    placeholder="Amount"
                    error={errors.splits?.[member.userId]}
                    disabled={loading}
                    className="md:w-44"
                    onChange={(e) => {
                      handleSplitChange(member.userId, e.target.value);
                      setErrors((current) => ({
                        ...current,
                        splits: {
                          ...current.splits,
                          [member.userId]: "",
                        },
                      }));
                    }}
                    aria-label={`Split amount for ${member.userName}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default AddExpenseModal;
