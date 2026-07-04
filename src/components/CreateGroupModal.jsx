import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function CreateGroupModal({ onClose, onGroupCreated }) {

    const [name, setName] = useState("");
const [loading, setLoading] = useState(false);

    const handleCreateGroup = async () => {

        if (loading) return;

        if (!name.trim()) {
            toast.warning("Please enter group name");
            return;
        }

        try {

            setLoading(true);

            await api.post("/groups", {
                name
            });

            toast.success("Group Created Successfully");

            onGroupCreated();

            onClose();

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to create group"
            );

        }
        finally {

    setLoading(false);

}

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 md:p-8">

                <div className="flex justify-between items-center mb-6">

                    <div>

                        <h2 className="text-2xl font-bold">
                            📁 Create Group
                        </h2>

                        <p className="text-gray-500 text-sm mt-1">
                            Create a new expense group.
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

                <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Group Name
                    </label>

                    <input
                        type="text"
                        placeholder="e.g. Goa Trip"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                <div className="flex flex-col-reverse md:flex-row justify-end gap-3 mt-8">

                    <button
    onClick={onClose}
    disabled={loading}
    className={`w-full md:w-auto px-5 py-3 rounded-xl transition ${
        loading
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
    }`}
>
    Cancel
</button>

                  <button
    onClick={handleCreateGroup}
    disabled={loading}
    className={`px-4 py-2 rounded text-white transition ${
        loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
    }`}
>
    {loading ? "Creating..." : "Create"}
</button>

                </div>

            </div>

        </div>

    );

}

export default CreateGroupModal;