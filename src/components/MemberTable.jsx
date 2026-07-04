function MemberTable({
    members,
    onAddMember,
    onRemoveMember,
    isCreator,
    creatorId
}) {

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

                <h2 className="text-2xl font-bold">
                    👥 Members ({members.length})
                </h2>

                {
                    isCreator && (

                        <button
                            onClick={onAddMember}
                            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
                        >
                            + Add Member
                        </button>

                    )
                }

            </div>

            {/* Desktop Table */}

            <div className="hidden md:block overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="text-left py-3">
                                Name
                            </th>

                            <th className="text-left py-3">
                                Email
                            </th>

                            {
                                isCreator && (

                                    <th className="text-left py-3">
                                        Action
                                    </th>

                                )
                            }

                        </tr>

                    </thead>

                    <tbody>

                        {
                            members.map((member) => (

                                <tr
                                    key={member.id}
                                    className="border-b"
                                >

                                    <td className="py-4">
                                        {member.userName}
                                    </td>

                                    <td className="py-4">
                                        {member.userEmail}
                                    </td>

                                    {
                                        isCreator && (

                                            <td className="py-4">

                                                {
                                                    member.userId === creatorId ?

                                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                            Creator
                                                        </span>

                                                        :

                                                        <button
                                                            onClick={() => onRemoveMember(member.userId)}
                                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                                                        >
                                                            Remove
                                                        </button>

                                                }

                                            </td>

                                        )
                                    }

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

            {/* Mobile Cards */}

            <div className="md:hidden space-y-4">

                {
                    members.map((member) => (

                        <div
                            key={member.id}
                            className="border rounded-xl p-4 shadow-sm"
                        >

                            <h3 className="font-semibold text-lg">
                                👤 {member.userName}
                            </h3>

                            <p className="text-gray-500 break-all mt-1">
                                {member.userEmail}
                            </p>

                            {
                                isCreator && (

                                    <div className="mt-4">

                                        {
                                            member.userId === creatorId ?

                                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                    Creator
                                                </span>

                                                :

                                                <button
                                                    onClick={() => onRemoveMember(member.userId)}
                                                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                                                >
                                                    Remove Member
                                                </button>

                                        }

                                    </div>

                                )
                            }

                        </div>

                    ))
                }

            </div>

        </div>

    );

}

export default MemberTable;