import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function Signup() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {

        if (loading) return;

        if (!name || !email || !password) {
            toast.warning("Please fill all fields");
            return;
        }

        try {

            setLoading(true);

            await api.post("/auth/signup", {
                name,
                email,
                password
            });

            toast.success("Account created successfully");

            navigate("/");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Signup Failed"
            );

        }
        finally {

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

                        Create your account

                    </p>

                </div>

                <div className="space-y-5">

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-xl px-4 py-3"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-xl px-4 py-3"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-xl px-4 py-3"
                    />

                   <button
    onClick={handleSignup}
    disabled={loading}
    className={`w-full py-3 rounded-xl font-semibold transition ${
        loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
    }`}
>
    {loading ? "Creating Account..." : "Sign Up"}
</button>

                </div>

                <p className="text-center mt-6">

                    Already have an account?{" "}

                    <span
                        className="text-blue-600 cursor-pointer font-semibold"
                        onClick={() => navigate("/")}
                    >

                        Login

                    </span>

                </p>

            </div>

        </div>

    );

}

export default Signup;