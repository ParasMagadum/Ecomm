import { useEffect, useState } from "react";
import { getAdminCategories, getAdminOrders, getAdminProducts, getAdminReturns, getAdminUsers } from "../../api/admin";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ products: 0, categories: 0, users: 0, orders: 0, returns: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getAdminProducts(), getAdminCategories(), getAdminUsers(), getAdminOrders(), getAdminReturns()])
      .then(([products, categories, users, orders, returns]) => {
        setStats({ products: products.length, categories: categories.length, users: users.length, orders: orders.length, returns: returns.length });
      })
      .catch((err) => setError(err.response?.data?.message || "Unable to load dashboard statistics"));
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-slate-500">Monitor your store from one place.</p>
      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {Object.entries(stats).map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm capitalize text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-extrabold text-slate-900">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminDashboard;
