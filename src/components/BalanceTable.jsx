function BalanceTable({ balances = [] }) {

    const balanceList = Array.isArray(balances) ? balances : [];

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-bold mb-6">
                💰 Balances ({balanceList.length})
            </h2>

            {
                balanceList.length === 0 ? (

                    <p className="text-gray-500">
                        No Balances Found
                    </p>

                ) : (

                    <>

                        {/* Desktop */}

                        <div className="hidden md:block overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="border-b">

                                        <th className="text-left py-3">
                                            User
                                        </th>

                                        <th className="text-left py-3">
                                            Balance
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        balanceList.map((balance) => (

                                            <tr
                                                key={balance.userId}
                                                className="border-b"
                                            >

                                                <td className="py-4">
                                                    👤 {balance.userName}
                                                </td>

                                                <td
                                                    className={`py-4 font-bold ${
                                                        balance.balance >= 0
                                                            ? "text-green-600"
                                                            : "text-red-600"
                                                    }`}
                                                >
                                                    ₹ {balance.balance}
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
                                balanceList.map((balance) => (

                                    <div
                                        key={balance.userId}
                                        className="border rounded-xl p-4 shadow-sm"
                                    >

                                        <h3 className="font-semibold text-lg">
                                            👤 {balance.userName}
                                        </h3>

                                        <p
                                            className={`mt-3 text-lg font-bold ${
                                                balance.balance >= 0
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            ₹ {balance.balance}
                                        </p>

                                        <p className="text-gray-500 text-sm mt-1">
                                            {balance.balance >= 0
                                                ? "Will receive money"
                                                : "Needs to pay"}
                                        </p>

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

export default BalanceTable;