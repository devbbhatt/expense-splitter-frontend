import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../services/api";

import Layout from "../components/Layout";
import Loading from "../components/Loading";
import GroupCard from "../components/GroupCard";

function Groups() {

    const [groups, setGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const loadGroups = async () => {

        try {

            const response = await api.get("/groups?page=0&size=20");

            setGroups(response.data.content);
            setFilteredGroups(response.data.content);

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

    useEffect(() => {

        const filtered = groups.filter(group =>
            group.name.toLowerCase().includes(search.toLowerCase())
        );

        setFilteredGroups(filtered);

    }, [search, groups]);

    return (

    <Layout>

        <div className="bg-gray-100 min-h-screen">

                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                        <div>

                            <h1 className="text-3xl md:text-4xl font-bold">
                                📁 Groups
                            </h1>

                            <p className="text-gray-500 mt-2">
                                Browse all your groups
                            </p>

                        </div>

                        <div className="bg-white shadow rounded-2xl px-6 py-4 w-full md:w-auto">

                            <p className="text-gray-500">
                                Total Groups
                            </p>

                            <p className="text-3xl font-bold text-blue-600">
                                {groups.length}
                            </p>

                        </div>

                    </div>

                    <input
                        type="text"
                        placeholder="🔍 Search Group..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                       className="mt-8 w-full border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="mt-8">

                        {

                            loading ?

                                <Loading />

                                :

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                                    {

                                        filteredGroups.length === 0 ?

                                            <div className="col-span-full bg-white rounded-2xl shadow-lg p-12 text-center">

                                                <h2 className="text-2xl font-bold">
                                                    No Groups Found 📂
                                                </h2>
                                                <p className="text-gray-500 mt-2">
                                                        Try another search keyword.
                                                </p>

                                            </div>

                                            :

                                            filteredGroups.map(group => (

                                                <GroupCard
                                                    key={group.id}
                                                    group={group}
                                                />

                                            ))

                                    }

                                </div>

                        }

                    </div>

                       </div>

    </Layout>

);

}

export default Groups;