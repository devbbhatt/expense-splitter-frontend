import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import api from "../services/api";
import { toast } from "react-toastify";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (loading) return;

    if (!email || !password) {
      setErrors({
        email: !email ? "Enter your email address." : "",
        password: !password ? "Enter your password." : "",
      });
      toast.warning("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.data);

      const me = await api.get("/users/me");

      localStorage.setItem("userId", me.data.id);

      toast.success("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue managing your shared expenses."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="font-medium text-brand hover:text-brand-hover"
          >
            Sign up
          </button>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleLogin}>
        <Input
          label="Email"
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="Enter email"
          error={errors.email}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((current) => ({ ...current, email: "" }));
          }}
        />

        <div className="relative">
          <Input
            label="Password"
            id="login-password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter password"
            error={errors.password}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((current) => ({ ...current, password: "" }));
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute right-3 top-9 rounded-md p-1 text-muted hover:text-ink"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <Button type="submit" disabled={loading} className="w-full" size="lg">
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Login;
