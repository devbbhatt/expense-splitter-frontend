import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    

   const handleLogin = async () => {

    if (loading) return;

    if (!email || !password) {
        toast.warning("Please enter email and password");
        return;
    }

    try {

        setLoading(true);

        const response = await api.post("/auth/login", {
            email,
            password
        });

        localStorage.setItem("token", response.data.data);

        const me = await api.get("/users/me");

        localStorage.setItem("userId", me.data.id);

        toast.success("Login Successful");

        navigate("/dashboard");

    } catch (error) {

        console.error(error);

        toast.error(
            error.response?.data?.message || "Login Failed"
        );

    } finally {

        setLoading(false);

    }

};

    return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex justify-center items-center">

        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">

            <div className="text-center mb-8">

                <h1 className="text-4xl font-bold text-blue-600">
                    💰 Expense Splitter
                </h1>

                <p className="text-gray-500 mt-2">
                    Welcome Back! Login to continue.
                </p>

            </div>

            <div className="space-y-5">

                <div>

                    <label className="block text-gray-700 mb-2 font-semibold">
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                <div>

                    <label className="block text-gray-700 mb-2 font-semibold">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                <button
    onClick={handleLogin}
    disabled={loading}
    className={`w-full py-3 rounded-xl font-semibold transition ${
        loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
    }`}
>
    {loading ? "Logging in..." : "Login"}
</button>

            </div>

            <p className="text-center text-gray-600 mt-6">

                Don't have an account?{" "}

                <span
                    onClick={() => navigate("/signup")}
                    className="text-blue-600 font-semibold cursor-pointer hover:underline"
                >
                    Sign Up
                </span>

            </p>

        </div>

    </div>

);

}

export default Login;