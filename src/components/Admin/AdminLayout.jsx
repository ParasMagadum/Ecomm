import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminHeader from "../components/Admin/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;