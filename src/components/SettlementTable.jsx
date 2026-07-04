function SettlementTable({ settlements = [] }) {

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-bold mb-6">
                🤝 Suggested Settlements ({settlements.length})
            </h2>

            {
                settlements.length === 0 ? (

                    <p className="text-gray-500">
                        No Settlements Required 🎉
                    </p>

                ) : (

                    <>

                        {/* Desktop */}

                        <div className="hidden md:block overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="border-b">

                                        <th className="text-left py-3">
                                            From
                                        </th>

                                        <th className="text-left py-3">
                                            To
                                        </th>

                                        <th className="text-left py-3">
                                            Amount
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        settlements.map((settlement, index) => (

                                            <tr
                                                key={index}
                                                className="border-b"
                                            >

                                                <td className="py-4">
                                                    👤 {settlement.fromUserName}
                                                </td>

                                                <td className="py-4">
                                                    👤 {settlement.toUserName}
                                                </td>

                                                <td className="py-4 font-bold text-blue-600">
                                                    ₹ {settlement.amount}
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
                                settlements.map((settlement, index) => (

                                    <div
                                        key={index}
                                        className="border rounded-xl p-4 shadow-sm"
                                    >

                                        <p className="font-semibold">
                                            👤 {settlement.fromUserName}
                                        </p>

                                        <p className="text-center text-gray-500 my-2">
                                            ⬇ pays ⬇
                                        </p>

                                        <p className="font-semibold">
                                            👤 {settlement.toUserName}
                                        </p>

                                        <p className="mt-4 text-xl font-bold text-blue-600">
                                            ₹ {settlement.amount}
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

export default SettlementTable;