import { Link } from "react-router-dom";
import Button from "../components/Common/Button";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatPrice = (price) => `₹${price.toLocaleString("en-IN")}`;

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  return (
    <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">YOUR ACCOUNT</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">My Profile</h1>
        <p className="mt-2 text-sm text-slate-500">
          View your account details and order history.
        </p>
      </div>

      <div className="grid gap-7 lg:grid-cols-[320px_1fr]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl font-bold text-blue-600">
            {(user?.fullName || "Guest User").charAt(0).toUpperCase()}
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            {user?.fullName || "Guest User"}
          </h2>
          <p className="mt-1 break-words text-sm text-slate-500">
            {user?.email || "Sign in to view your account details"}
          </p>

          <div className="mt-6 space-y-4 border-t border-slate-100 pt-6 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Total orders</span>
              <span className="font-semibold text-slate-900">{orders.length}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Account status</span>
              <span className="font-semibold text-green-600">Active</span>
            </div>
          </div>

          {!user && (
            <Link to="/login" className="mt-6 block">
              <Button className="w-full">Login to Account</Button>
            </Link>
          )}
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Past Orders</h2>
              <p className="mt-1 text-sm text-slate-500">
                A record of your completed purchases.
              </p>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-2xl">
                📦
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                No past orders yet
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Your completed orders will appear here.
              </p>
              <Link to="/catalogue" className="mt-6 inline-block">
                <Button>Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                      <p className="text-sm font-bold text-slate-900">Order {order.id}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Placed on {formatDate(order.date)}
                      </p>
                    </div>
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      Delivered
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-slate-800">
                            {item.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-slate-800">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex justify-between border-t border-slate-100 pt-5 text-sm">
                    <span className="font-semibold text-slate-500">Order total</span>
                    <span className="text-lg font-extrabold text-slate-900">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;