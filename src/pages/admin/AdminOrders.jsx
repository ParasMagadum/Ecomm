import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../api/admin";

const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");
      setOrders(await getOrders());
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadOrders(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      setError("");
      await updateOrderStatus(id, status);
      setOrders((current) => current.map((order) => order._id === id ? { ...order, status } : order));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update order status");
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
      <p className="mt-1 text-sm text-slate-500">Manage customer orders and order status.</p>
      {error && <div className="my-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {loading ? <p className="p-6 text-sm text-slate-500">Loading orders...</p> : orders.length === 0 ? <p className="p-6 text-sm text-slate-500">No orders found.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b bg-slate-50"><tr>
                <th className="px-6 py-4 text-sm font-semibold">Customer</th>
                <th className="px-6 py-4 text-sm font-semibold">Total</th>
                <th className="px-6 py-4 text-sm font-semibold">Items</th>
                <th className="px-6 py-4 text-sm font-semibold">Status</th>
              </tr></thead>
              <tbody>{orders.map((order) => <tr key={order._id} className="border-b last:border-0">
                <td className="px-6 py-4"><p className="text-sm font-medium">{order.user?.name || "Unknown"}</p><p className="text-xs text-slate-500">{order.user?.email || ""}</p></td>
                <td className="px-6 py-4 text-sm">₹{Number(order.total).toLocaleString("en-IN")}</td>
                <td className="px-6 py-4 text-sm">{order.items?.length || 0}</td>
                <td className="px-6 py-4"><select value={order.status} onChange={(e) => handleStatusChange(order._id, e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-sm">
                  {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                </select></td>
              </tr>)}</tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminOrders;
