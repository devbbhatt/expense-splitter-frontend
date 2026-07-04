import { useNavigate } from "react-router-dom";

function GroupCard({ group }) {

    const navigate = useNavigate();

    return (

        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

            <div className="flex items-center gap-3">

                <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl text-3xl">
                    📁
                </div>

                <div>

                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 break-words">
                        {group.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                        Expense Group
                    </p>

                </div>

            </div>

            <div className="mt-5 space-y-2">

                <p className="text-gray-700 flex items-center gap-2">

                    <span className="font-semibold">
                        👤 Created By:
                    </span>{" "}

                    {group.createdBy.name}

                </p>

               <p className="text-gray-500 flex items-center gap-2">

                    <span className="font-semibold">
                       📅 Created:
                    </span>{" "}

                    {new Date(group.createdAt).toLocaleDateString()}

                </p>

            </div>

            <button
                onClick={() => navigate(`/groups/${group.id}`)}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition-all duration-300"
            >
                Open Group →
            </button>

        </div>

    );

}

export default GroupCard;