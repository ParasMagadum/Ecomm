import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import Input from "../components/Common/Input";
import { registerUser } from "../api/auth";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData((current) => ({ ...current, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await registerUser(formData.name, formData.email, formData.password);
      navigate("/login", { state: { message: "Account created. Please log in." } });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-lg">
        <Link to="/catalogue" className="text-2xl font-extrabold text-slate-900">EasyCart</Link>
        <h1 className="mt-6 text-2xl font-bold text-slate-900">Create Account</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} required placeholder="Your full name" />
          <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
          <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Create a password" />
          <Input label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Re-enter password" />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full">{loading ? "Creating account..." : "Create Account"}</Button>
        </form>
        <p className="mt-6 text-sm text-slate-500">Already registered? <Link to="/login" className="font-semibold text-slate-900">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
