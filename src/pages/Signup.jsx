import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import api from "../services/api";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSignup = async (event) => {
    event.preventDefault();

    if (loading) return;

    if (!name || !email || !password) {
      setErrors({
        name: !name ? "Enter your full name." : "",
        email: !email ? "Enter your email address." : "",
        password: !password ? "Enter a password." : "",
      });
      toast.warning("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/signup", {
        name,
        email,
        password,
      });

      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start splitting expenses with friends and groups."
      footer={
        <>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="font-medium text-brand hover:text-brand-hover"
          >
            Login
          </button>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSignup}>
        <Input
          label="Full name"
          id="signup-name"
          type="text"
          autoComplete="name"
          placeholder="Full name"
          error={errors.name}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((current) => ({ ...current, name: "" }));
          }}
        />
        <Input
          label="Email"
          id="signup-email"
          type="email"
          autoComplete="email"
          placeholder="Email"
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
            id="signup-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Password"
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
          {loading ? "Creating account..." : "Sign up"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Signup;
