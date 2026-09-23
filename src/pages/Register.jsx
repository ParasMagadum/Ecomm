import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import Input from "../components/Common/Input";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ fullName: formData.fullName, email: formData.email })
    );

    navigate("/catalogue");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            to="/catalogue"
            className="text-2xl font-extrabold tracking-tight text-slate-900"
          >
            EasyCart
          </Link>

          <p className="mt-3 text-sm text-slate-500">
            Create your account and start shopping with ease.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-lg">
          <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>

          <p className="mt-2 text-sm text-slate-500">
            Fill in your details to get started.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <Input
              label="Full Name"
              name="fullName"
              placeholder="Your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-6 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;