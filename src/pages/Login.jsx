import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(
        formData.email,
        formData.password
      );

      if (!data?.token || !data?.user) {
        setError("Login response is missing user information.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/catalogue", { replace: true });
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl md:min-h-[calc(100vh-4rem)]">
        <div className="hidden w-1/2 flex-col justify-between bg-slate-900 p-10 text-white md:flex lg:p-14">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              EasyCart
            </h1>

            <div className="mt-24 max-w-md">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                Welcome to your store
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight lg:text-5xl">
                Everything you need,
                <span className="block text-slate-400">
                  all in one place.
                </span>
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-6 text-slate-400">
                Discover electronics, clothing, shoes and
                accessories designed for everyday shopping.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="h-2 w-10 rounded-full bg-white" />
            <div className="h-2 w-2 rounded-full bg-slate-600" />
            <div className="h-2 w-2 rounded-full bg-slate-600" />
          </div>
        </div>

        <div className="flex w-full items-center justify-center px-6 py-10 sm:px-10 md:w-1/2 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-8 md:hidden">
              <h1 className="text-2xl font-bold text-slate-900">
                EasyCart
              </h1>
            </div>

            <div className="mb-8">
              <p className="text-sm font-medium text-slate-500">
                Welcome back
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Login to your account
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Enter your details to continue shopping.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>
                </div>

                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "LOGIN"}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">OR</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-500">
                Don't have an account?
              </p>

              <Link
                to="/register"
                className="mt-2 inline-block text-sm font-semibold text-slate-900 hover:underline"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;