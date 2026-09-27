import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct
} from "../../api/admin";
import ProductForm from "../../components/Admin/ProductForm";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();

      setProducts(data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAdd = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteProduct(id);

      setProducts(
        products.filter(
          (product) => product._id !== id
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  const handleFormSuccess = () => {
    loadProducts();
  };

  return (
    <div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Products
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage products in your store.
          </p>
        </div>

        <button
          onClick={handleAdd}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Add Product
        </button>
      </div>

      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

        {loading ? (
          <div className="p-6 text-sm text-slate-500">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-500">
            No products found.
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Product
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Price
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Stock
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Category
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b last:border-0 hover:bg-slate-50"
                  >

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">

                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 rounded-lg border border-slate-200 object-cover"
                        />

                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {product.name}
                          </p>

                          <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                            {product.description}
                          </p>
                        </div>

                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      ₹{product.price}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          product.stock === 0
                            ? "bg-red-100 text-red-700"
                            : product.stock <= 10
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {product.category?.name || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-3">

                        <button
                          onClick={() =>
                            handleEdit(product)
                          }
                          className="text-sm font-medium text-slate-900 hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(product._id)
                          }
                          className="text-sm font-medium text-red-600 hover:underline"
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

      {showForm && (
        <ProductForm
          product={selectedProduct}
          onClose={() => {
            setShowForm(false);
            setSelectedProduct(null);
          }}
          onSuccess={handleFormSuccess}
        />
      )}

    </div>
  );
};

export default AdminProducts;