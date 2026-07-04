import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function AddExpenseModal({

    groupId,
    members,
    onClose,
    onExpenseCreated

}) {

    const [description, setDescription] = useState("");

    const [amount, setAmount] = useState("");

    const [splitType, setSplitType] = useState("EQUAL");

    const [loading, setLoading] = useState(false);

    const [splits, setSplits] = useState([]);

    const handleSplitChange = (userId, value) => {

        setSplits((prev) => {

            const filtered = prev.filter(
                split => split.userId !== userId
            );

            return [

                ...filtered,

                {

                    userId,

                    amount: Number(value)

                }

            ];

        });

    };

    const handleCreateExpense = async () => {

        if (!description.trim()) {

            toast.warning("Please enter description");

            return;

        }

        if (!amount || Number(amount) <= 0) {

            toast.warning("Please enter valid amount");

            return;

        }

        if (
            splitType === "EXACT" &&
            splits.length !== members.length
        ) {

            toast.warning("Please enter split amount for every member");

            return;

        }

        try {

            setLoading(true);

            await api.post(

                `/expenses/groups/${groupId}/expenses`,

                {

                    description,

                    amount: Number(amount),

                    splitType,

                    splits

                }

            );

            toast.success("Expense Created Successfully");

            onExpenseCreated();

            onClose();

        } catch (error) {

            console.log(error);

           toast.error(
                error.response?.data?.message ||
                "Failed to create expense"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8">

               <div className="flex justify-between items-center mb-6">

    <div>

        <h2 className="text-2xl font-bold">
            💸 Add Expense
        </h2>

        <p className="text-gray-500 text-sm mt-1">
            Record a new expense for this group.
        </p>

    </div>

    <button
        onClick={onClose}
        className="text-2xl text-gray-500 hover:text-red-500 transition"
    >
        ✕
    </button>

</div>

                <input

                    type="text"

                    placeholder="Description"

                    value={description}

                    onChange={(e) => setDescription(e.target.value)}

                    className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"

                />

                <input

                    type="number"

                    placeholder="Amount"

                    value={amount}

                    onChange={(e) => setAmount(e.target.value)}

                    className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"

                />

                <select

                    value={splitType}

                    onChange={(e) => setSplitType(e.target.value)}

                    className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"

                >

                    <option value="EQUAL">

                        Equal

                    </option>

                    <option value="EXACT">

                        Exact

                    </option>

                </select>

                {

                    splitType === "EXACT" && (

                        <div className="mb-5">

                            <h3 className="font-semibold mb-3">

                                Split Amounts

                            </h3>

                            {

                                members.map((member) => (

                                    <div
    key={member.userId}
    className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4"
>

                                        <span>

                                            {member.userName}

                                        </span>

                                        <input

                                            type="number"

                                            placeholder="Amount"

                                            className="w-full md:w-44 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                                            onChange={(e) =>

                                                handleSplitChange(

                                                    member.userId,

                                                    e.target.value

                                                )

                                            }

                                        />

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

                <div className="flex flex-col-reverse md:flex-row justify-end gap-3 mt-8">

                    <button

                        onClick={onClose}

                        className="w-full md:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-3 rounded-xl transition"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={handleCreateExpense}

                        disabled={loading}

                       className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition disabled:opacity-50"

                    >

                        {

                            loading

                                ?

                                "Creating..."

                                :

                                "Create Expense"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AddExpenseModal;