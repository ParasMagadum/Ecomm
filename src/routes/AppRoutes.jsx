import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Catalogue from "../pages/Catalogue";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import AdminDashboard from "../pages/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminInventory from "../pages/admin/AdminInventory";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminReturns from "../pages/admin/AdminReturns";
import Wishlist from "../pages/Wishlist";

const AppRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<MainLayout />}>
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route
          path="/profile"
          element={
            user?.role === "admin" ? (
              <Navigate to="/admin" replace />
            ) : (
              <Profile />
            )
          }
        />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/inventory" element={<AdminInventory />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/returns" element={<AdminReturns />} />
      </Route>

      <Route path="*" element={<Navigate to="/catalogue" replace />} />
    </Routes>
  );
};

export default AppRoutes;