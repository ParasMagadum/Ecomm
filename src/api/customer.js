import axios from "axios";

const customerAPI = axios.create({
  baseURL: "http://localhost:5000/api",
});

customerAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getCatalogue = async (params = {}) =>
  (await customerAPI.get("/products", { params })).data;

export const getProductDetails = async (id) =>
  (await customerAPI.get(`/products/${id}`)).data;

export const getCart = async () =>
  (await customerAPI.get("/cart")).data;

export const addCartItem = async (productId, quantity = 1) =>
  (await customerAPI.post("/cart", { productId, quantity })).data;

export const updateCartItem = async (id, quantity) =>
  (await customerAPI.put(`/cart/${id}`, { quantity })).data;

export const removeCartItem = async (id) =>
  (await customerAPI.delete(`/cart/${id}`)).data;

export const clearCart = async () =>
  (await customerAPI.delete("/cart")).data;

export const placeOrder = async (shipping_address) =>
  (await customerAPI.post("/orders", { shipping_address })).data;

export const getMyOrders = async () =>
  (await customerAPI.get("/orders/my")).data;

export const getProfile = async () =>
  (await customerAPI.get("/profile")).data;

export const updateProfile = async (data) =>
  (await customerAPI.put("/profile", data)).data;

export const getWishlist = async () =>
  (await customerAPI.get("/wishlist")).data;

export const addWishlistItem = async (productId) =>
  (await customerAPI.post("/wishlist", { productId })).data;

export const removeWishlistItem = async (productId) =>
  (await customerAPI.delete(`/wishlist/${productId}`)).data;