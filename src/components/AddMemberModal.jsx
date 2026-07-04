import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function AddMemberModal({ groupId, members, onClose, onMemberAdded }) {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            
            const response = await api.get("/users?page=0&size=100");

            const allUsers = response.data.content;

            const memberIds = members.map(member => member.userId);

            const availableUsers = allUsers.filter(
                user => !memberIds.includes(user.id)
            );

            setUsers(availableUsers);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load users");

        }

    };

    const addMember = async () => {
        if (loading) return;

        if (!selectedUser) {

            toast.warning("Select a user");

            return;

        }

        try {
                  setLoading(true);

            await api.post(
                `/groups/${groupId}/members/${selectedUser}`
            );

            toast.success("Member Added");

            onMemberAdded();

            onClose();

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message || "Failed to add member"
            );

        }
        finally {
    setLoading(false);
}

    };

    return (

        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 md:p-8">

               <div className="flex justify-between items-center mb-6">

    <div>

        <h2 className="text-2xl font-bold">
            👥 Add Member
        </h2>

        <p className="text-gray-500 text-sm mt-1">
            Select a user to add to this group.
        </p>

    </div>

   <button
    onClick={onClose}
    disabled={loading}
    className={`text-2xl transition ${
        loading
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-500 hover:text-red-500"
    }`}
>
    ✕
</button>

</div>

                <select
                      disabled={loading}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

                    value={selectedUser}

                    onChange={(e) => setSelectedUser(e.target.value)}

                >

                    <option value="">
                        Select User
                    </option>

                    {

                        users.map(user => (

                            <option
                                key={user.id}
                                value={user.id}
                            >

                                {user.name} ({user.email})

                            </option>

                        ))

                    }

                </select>

                <div className="flex flex-col-reverse md:flex-row justify-end gap-3 mt-8">

                    <button
                        disabled={loading}
                        onClick={onClose}

                       className="w-full md:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-3 rounded-xl transition"

                    >

                        Cancel

                    </button>

                    <button
    onClick={addMember}
    disabled={loading}
    className={`px-4 py-2 rounded text-white transition ${
        loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
    }`}
>
    {loading ? "Adding..." : "Add Member"}
</button>

                </div>

            </div>

        </div>

    );

}

export default AddMemberModal;