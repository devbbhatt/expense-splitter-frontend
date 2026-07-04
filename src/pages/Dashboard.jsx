import { useEffect, useState } from "react";

import api from "../services/api";

import Layout from "../components/Layout";
import Loading from "../components/Loading";
import GroupCard from "../components/GroupCard";
import CreateGroupModal from "../components/CreateGroupModal";
import { toast } from "react-toastify";

function Dashboard() {

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const loadGroups = async () => {

        try {

            setLoading(true);

            const response = await api.get("/groups?page=0&size=10");

            setGroups(response.data.content);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load groups");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadGroups();

    }, []);

    return (

       <Layout>

    <div className="bg-gray-100 min-h-screen">

    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

                        <div>

                            <h1 className="text-3xl md:text-4xl font-bold">
                                    Welcome 👋
                            </h1>

                        <p className="text-gray-600 mt-2">
                                Manage your expense groups.
                        </p>

                        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 w-full md:w-64">

                        <h2 className="text-lg text-gray-500">
                                Total Groups
                        </h2>

                        <p className="text-4xl font-bold text-blue-600 mt-2">
                            {groups.length}
                            </p>

                        </div>


                        </div>

                        <button
                            onClick={() => setShowModal(true)}
                            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
                        >
                            + Create Group
                        </button>

                    </div>

                    <div className="mt-10">

                        {
                            loading
                                ?
                                <Loading />
                                :
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

    {
        groups.length === 0 ? (

            <div className="col-span-full bg-white rounded-2xl shadow-lg p-12 text-center">

                <h2 className="text-2xl font-bold">
                    No Groups Yet 📁
                </h2>

                <p className="text-gray-500 mt-2">
                    Create your first expense group.
                </p>

            </div>

        ) : (

            groups.map((group) => (

                <GroupCard
                    key={group.id}
                    group={group}
                />

            ))

        )
    }

</div>

                        }

                    </div>
    </div>

    {
        showModal && (

                    <CreateGroupModal

                        onClose={() => setShowModal(false)}

                        onGroupCreated={loadGroups}

                    />

                )
            }

        </Layout>

    );

}

export default Dashboard;