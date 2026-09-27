import { useEffect, useState } from "react";
import {
  addProduct,
  updateProduct,
  getCategories
} from "../../api/admin";

const ProductForm = ({
  product,
  onClose,
  onSuccess
}) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
    category: ""
  });

  useEffect(() => {
    loadCategories();

    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        image: product.image || "",
        stock: product.stock || "",
        category: product.category?._id || product.category || ""
      });
    }
  }, [product]);

  const loadCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load categories"
      );
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        image: formData.image,
        stock: Number(formData.stock),
        category: formData.category
      };

      if (product) {
        await updateProduct(
          product._id,
          productData
        );
      } else {
        await addProduct(productData);
      }

      onSuccess();

      onClose();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to save product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {product ? "Edit Product" : "Add Product"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {product
                ? "Update product information."
                : "Add a new product to your store."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-slate-400 hover:text-slate-900"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Wireless Headphones"
              required
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="4"
              required
              className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="1999"
                min="0"
                required
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="50"
                min="0"
                required
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
              />
            </div>

          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
            >
              <option value="">
                Select Category
              </option>

              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Product Image URL
            </label>

            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/product.jpg"
              required
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
            />
          </div>

          {formData.image && (
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">
                Image Preview
              </p>

              <img
                src={formData.image}
                alt="Product preview"
                className="h-32 w-32 rounded-lg border border-slate-200 object-cover"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : product
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;