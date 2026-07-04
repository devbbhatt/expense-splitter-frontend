import { useEffect, useState } from "react";
import api from "../services/api";

import Layout from "../components/Layout";
import Loading from "../components/Loading";

import { toast } from "react-toastify";

function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadProfile = async () => {

        try {

            const response = await api.get("/users/me");

            setUser(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Failed to load profile");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadProfile();

    }, []);

    return (

    <Layout>

        <div className="bg-gray-100 min-h-screen">

                    {

                        loading ?

                            <Loading />

                            :

                          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-200 p-6 md:p-10">
                            
                                <div className="text-center">

                                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-4xl font-bold">

    {user.name.charAt(0).toUpperCase()}

</div>

                                  <h1 className="text-3xl md:text-4xl font-bold mt-5">
    My Profile
</h1>

<p className="text-gray-500 mt-2">
    Manage your account information.
</p>

                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

                                    <div className="bg-gray-50 rounded-2xl p-5">

    <p className="text-gray-500">
        Name
    </p>

    <p className="text-xl font-semibold mt-1">
        {user.name}
    </p>

</div>

                                    <div className="bg-gray-50 rounded-2xl p-5">

    <p className="text-gray-500">
        Email
    </p>

    <p className="text-xl font-semibold mt-1">
        {user.email}
    </p>

</div>

                                    {
                                        user.createdAt && (

                                           

                                            <div className="bg-gray-50 rounded-2xl p-5">

    <p className="text-gray-500">
        Member Since
    </p>

    <p className="text-xl font-semibold mt-1">
        {new Date(user.createdAt).toLocaleDateString()}
    </p>

</div>

                                        )
                                    }

                                </div>

                                <button
                                    disabled
                                    className="mt-10 w-full bg-gray-300 text-gray-700 py-3 rounded-2xl cursor-not-allowed font-semibold"
                                >
                                    Edit Profile (Coming Soon)
                                </button>

                            </div>

                    }

                        </div>

    </Layout>

    );

}

export default Profile;