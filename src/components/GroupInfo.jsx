function GroupInfo({
    group,
    isCreator,
    onDeleteGroup
}) {

    return (

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-8">

            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">

                <div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 break-words">
                        📁 {group.name}
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage members, expenses and balances for this group.
                    </p>

                </div>

                {
                    isCreator && (

                        <button
                            onClick={onDeleteGroup}
                            className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition"
                        >
                            🗑 Delete Group
                        </button>

                    )
                }

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">

                <div className="bg-gray-50 rounded-xl p-5">

                    <p className="text-sm text-gray-500">
                        Created By
                    </p>

                    <h2 className="font-semibold text-lg mt-1">
                        👤 {group.createdBy.name}
                    </h2>

                </div>

                <div className="bg-gray-50 rounded-xl p-5">

                    <p className="text-sm text-gray-500">
                        Email
                    </p>

                    <h2 className="font-semibold text-lg mt-1 break-all">
                        ✉ {group.createdBy.email}
                    </h2>

                </div>

                <div className="bg-gray-50 rounded-xl p-5">

                    <p className="text-sm text-gray-500">
                        Created On
                    </p>

                    <h2 className="font-semibold text-lg mt-1">
                        📅 {new Date(group.createdAt).toLocaleDateString()}
                    </h2>

                </div>

            </div>

        </div>

    );

}

export default GroupInfo;