import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Admin Panel
        </h2>

        <p className="text-xs text-slate-500">
          Manage your store
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-900">
            {user.name || "Admin"}
          </p>

          <p className="text-xs text-slate-500">
            {user.email || ""}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;