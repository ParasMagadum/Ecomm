import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Common/Button";
import { getProfile, getMyOrders } from "../api/customer";

const money = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;
const dateText = (value) => value ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setLoading(false);
      setError("Please log in to view your profile and order history.");
      return;
    }
    Promise.all([getProfile(), getMyOrders()])
      .then(([profile, orderList]) => {
        setUser(profile);
        setOrders(orderList);
      })
      .catch((err) => setError(err.response?.data?.message || "Unable to load profile."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <section className="p-12 text-center text-slate-500">Loading profile...</section>;
  if (error && !user) return <section className="mx-auto max-w-3xl p-10 text-center"><p className="text-slate-600">{error}</p><Link to="/login" className="mt-5 inline-block"><Button>Login</Button></Link></section>;

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="mb-8"><p className="text-sm font-semibold text-slate-500">YOUR ACCOUNT</p><h1 className="mt-2 text-3xl font-extrabold text-slate-900">My Profile</h1></div>
      {error && <p className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="grid gap-7 lg:grid-cols-[320px_1fr]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl font-bold">{(user?.name || "U").charAt(0).toUpperCase()}</div>
          <h2 className="mt-5 text-xl font-bold">{user?.name}</h2>
          <p className="mt-1 break-words text-sm text-slate-500">{user?.email}</p>
          <div className="mt-6 border-t border-slate-100 pt-5 text-sm"><div className="flex justify-between"><span className="text-slate-500">Total orders</span><strong>{orders.length}</strong></div><div className="mt-3 flex justify-between"><span className="text-slate-500">Phone</span><strong>{user?.phone || "Not provided"}</strong></div></div>
        </aside>
        <div>
          <h2 className="mb-5 text-2xl font-bold">Order History</h2>
          {!orders.length ? <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center"><p className="text-slate-500">You have not placed any orders yet.</p><Link to="/catalogue" className="mt-5 inline-block"><Button>Start Shopping</Button></Link></div> : (
            <div className="space-y-4">{orders.map((order) => <article key={order._id} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex flex-wrap justify-between gap-3"><div><p className="font-semibold">Order #{order._id.slice(-8).toUpperCase()}</p><p className="mt-1 text-sm text-slate-500">{dateText(order.order_date)}</p></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">{order.status}</span></div>
              <div className="mt-4 flex justify-between border-t pt-4"><span className="text-sm text-slate-500">Cash on Delivery</span><strong>{money(order.total)}</strong></div>
              <p className="mt-2 text-sm text-slate-500">{order.shipping_address}</p>
            </article>)}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
