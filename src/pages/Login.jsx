import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Common/Button";
import Input from "../components/Common/Input";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
            Welcome back. Login to continue shopping.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-lg">
          <h1 className="text-2xl font-bold text-slate-900">Login</h1>

          <p className="mt-2 text-sm text-slate-500">
            Enter your account details below.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </button>
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="mt-6 border-t border-slate-100 pt-6 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <button className="font-semibold text-blue-600 hover:text-blue-700">
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;