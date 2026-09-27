import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const cards = [
    {
      title: "Products",
      description: "Add, edit and remove products.",
      path: "/admin/products"
    },
    {
      title: "Categories",
      description: "Manage product categories.",
      path: "/admin/categories"
    },
    {
      title: "Inventory",
      description: "Manage product stock.",
      path: "/admin/inventory"
    },
    {
      title: "Users",
      description: "View and manage customers.",
      path: "/admin/users"
    },
    {
      title: "Orders",
      description: "View and update customer orders.",
      path: "/admin/orders"
    },
    {
      title: "Returns",
      description: "Review return requests.",
      path: "/admin/returns"
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-medium text-slate-500">
          Overview
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your e-commerce store from one place.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.path}
            to={card.path}
            className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {card.title}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {card.description}
            </p>

            <p className="mt-5 text-sm font-semibold text-slate-900">
              Manage →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;