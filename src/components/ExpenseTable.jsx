import api from "../services/api";

function ExpenseTable({ expenses, onExpenseDeleted }) {

    const handleDelete = async (expenseId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/expenses/${expenseId}`);

            alert("Expense Deleted Successfully");

            onExpenseDeleted();

        } catch (error) {

            console.log(error);

            alert("Failed to delete expense");

        }

    };

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-bold mb-6">
                💸 Expenses ({expenses.length})
            </h2>

            {
                expenses.length === 0 ? (

                    <p className="text-gray-500">
                        No Expenses Found
                    </p>

                ) : (

                    <>

                        {/* Desktop */}

                        <div className="hidden md:block overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="border-b">

                                        <th className="text-left py-3">Description</th>
                                        <th className="text-left py-3">Amount</th>
                                        <th className="text-left py-3">Paid By</th>
                                        <th className="text-left py-3">Split</th>
                                        <th className="text-left py-3">Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        expenses.map((expense) => (

                                            <tr
                                                key={expense.id}
                                                className="border-b"
                                            >

                                                <td className="py-4">
                                                    {expense.description}
                                                </td>

                                                <td className="py-4 font-semibold text-green-600">
                                                    ₹ {expense.amount}
                                                </td>

                                                <td className="py-4">
                                                    {expense.paidBy.name}
                                                </td>

                                                <td className="py-4">
                                                    {expense.splitType}
                                                </td>

                                                <td className="py-4">

                                                    <button
                                                        onClick={() => handleDelete(expense.id)}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                                                    >
                                                        Delete
                                                    </button>

                                                </td>

                                            </tr>

                                        ))
                                    }

                                </tbody>

                            </table>

                        </div>

                        {/* Mobile */}

                        <div className="md:hidden space-y-4">

                            {
                                expenses.map((expense) => (

                                    <div
                                        key={expense.id}
                                        className="border rounded-xl p-4 shadow-sm"
                                    >

                                        <h3 className="font-semibold text-lg">
                                            🍽 {expense.description}
                                        </h3>

                                        <p className="mt-2">
                                            <span className="font-medium">
                                                Amount:
                                            </span>{" "}
                                            <span className="text-green-600 font-bold">
                                                ₹ {expense.amount}
                                            </span>
                                        </p>

                                        <p className="mt-1">
                                            <span className="font-medium">
                                                Paid By:
                                            </span>{" "}
                                            {expense.paidBy.name}
                                        </p>

                                        <p className="mt-1">
                                            <span className="font-medium">
                                                Split:
                                            </span>{" "}
                                            {expense.splitType}
                                        </p>

                                        <button
                                            onClick={() => handleDelete(expense.id)}
                                            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
                                        >
                                            Delete Expense
                                        </button>

                                    </div>

                                ))
                            }

                        </div>

                    </>

                )
            }

        </div>

    );

}

export default ExpenseTable;