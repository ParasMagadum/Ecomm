import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const links = [
    {
      name: "Dashboard",
      path: "/admin"
    },
    {
      name: "Products",
      path: "/admin/products"
    },
    {
      name: "Categories",
      path: "/admin/categories"
    },
    {
      name: "Inventory",
      path: "/admin/inventory"
    },
    {
      name: "Users",
      path: "/admin/users"
    },
    {
      name: "Orders",
      path: "/admin/orders"
    },
    {
      name: "Returns",
      path: "/admin/returns"
    }
  ];

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 bg-slate-900 text-white lg:block">
      <div className="border-b border-slate-800 px-6 py-6">
        <h1 className="text-xl font-bold">
          EasyCart
        </h1>

        <p className="mt-1 text-xs text-slate-400">
          Admin Panel
        </p>
      </div>

      <nav className="p-4">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/admin"}
            className={({ isActive }) =>
              `mb-1 block rounded-lg px-4 py-3 text-sm transition ${
                isActive
                  ? "bg-white text-slate-900"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;