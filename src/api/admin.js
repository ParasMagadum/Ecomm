import axios from "axios";

const adminAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

adminAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const getProducts = async () =>
  (await adminAPI.get("/admin/products")).data;

export const getProductById = async (id) =>
  (await adminAPI.get(`/admin/products/${id}`)).data;

export const addProduct = async (data) =>
  (await adminAPI.post("/admin/products", data)).data;

export const updateProduct = async (id, data) =>
  (await adminAPI.put(`/admin/products/${id}`, data)).data;

export const deleteProduct = async (id) =>
  (await adminAPI.delete(`/admin/products/${id}`)).data;

export const getCategories = async () =>
  (await adminAPI.get("/admin/categories")).data;

export const getCategoryById = async (id) =>
  (await adminAPI.get(`/admin/categories/${id}`)).data;

export const addCategory = async (data) =>
  (await adminAPI.post("/admin/categories", data)).data;

export const updateCategory = async (id, data) =>
  (await adminAPI.put(`/admin/categories/${id}`, data)).data;

export const deleteCategory = async (id) =>
  (await adminAPI.delete(`/admin/categories/${id}`)).data;

export const getInventory = async () =>
  (await adminAPI.get("/admin/inventory")).data;

export const updateInventory = async (id, stock) =>
  (await adminAPI.put(`/admin/inventory/${id}`, { stock })).data;

export const updateStock = updateInventory;

export const getUsers = async () =>
  (await adminAPI.get("/admin/users")).data;

export const getUserById = async (id) =>
  (await adminAPI.get(`/admin/users/${id}`)).data;

export const updateUser = async (id, data) =>
  (await adminAPI.put(`/admin/users/${id}`, data)).data;

export const deleteUser = async (id) =>
  (await adminAPI.delete(`/admin/users/${id}`)).data;

export const getAdminOrders = async () =>
  (await adminAPI.get("/admin/orders")).data;

export const getOrders = getAdminOrders;

export const getAdminOrderById = async (id) =>
  (await adminAPI.get(`/admin/orders/${id}`)).data;

export const updateOrderStatus = async (id, status) =>
  (await adminAPI.put(`/admin/orders/${id}/status`, { status })).data;

export const getReturns = async () =>
  (await adminAPI.get("/admin/returns")).data;

export const approveReturn = async (id) =>
  (await adminAPI.put(`/admin/returns/${id}/approve`)).data;

export const rejectReturn = async (id) =>
  (await adminAPI.put(`/admin/returns/${id}/reject`)).data;

export const updateReturnStatus = async (id, status) => {
  if (status === "Approved") return approveReturn(id);
  if (status === "Rejected") return rejectReturn(id);

  throw new Error("Unsupported return status");
};

export const getAdminProducts = getProducts;
export const getAdminCategories = getCategories;
export const getAdminUsers = getUsers;
export const getAdminReturns = getReturns;