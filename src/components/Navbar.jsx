import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "../services/api";

function Navbar({ sidebarOpen, setSidebarOpen }) {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    toast.success("Logged out successfully");

    setTimeout(() => {
        navigate("/");
    }, 800);

};

    useEffect(() => {

    const loadCurrentUser = async () => {

        try {

            const response = await api.get("/users/me");

            setUser(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    loadCurrentUser();

}, []);

    return (

        <nav className="bg-blue-600 text-white flex justify-between items-center px-4 md:px-8 py-4 shadow-md">

            <button
    className="md:hidden mr-4"
    onClick={() => setSidebarOpen(!sidebarOpen)}
>
    {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
</button>

            <div className="flex-1">

                <h1 className="text-lg md:text-2xl font-bold">
                    Expense Splitter
                </h1>

                <p className="hidden md:block text-blue-100 text-sm">
                    Split expenses with your friends
                </p>

            </div>

            <div className="flex items-center gap-2 md:gap-4">

    <div className="hidden sm:block text-right">

        <p className="font-semibold">
            👤 {user?.name}
        </p>

        <p className="text-sm text-blue-100">
            {user?.email}
        </p>

    </div>

    <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 px-3 md:px-4 py-2 rounded-lg font-semibold text-sm md:text-base"
    >
        Logout
    </button>

</div>

        </nav>

    );

}

export default Navbar;