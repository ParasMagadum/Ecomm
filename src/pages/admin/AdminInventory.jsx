import { useEffect, useState } from "react";
import {
  getInventory,
  updateStock
} from "../../api/admin";

const AdminInventory = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadInventory = async () => {
    try {
      setLoading(true);

      const data = await getInventory();

      setProducts(data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load inventory"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const handleStockChange = (id, value) => {
    setProducts(
      products.map((product) =>
        product._id === id
          ? {
              ...product,
              stock: value
            }
          : product
      )
    );
  };

  const handleUpdateStock = async (id, stock) => {
    try {
      await updateStock(id, Number(stock));

      await loadInventory();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update stock"
      );
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Inventory
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage product stock levels.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {loading ? (
          <div className="p-6 text-sm text-slate-500">
            Loading inventory...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold">
                    Product
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Category
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Stock
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b last:border-0"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />

                        <span className="text-sm font-medium">
                          {product.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {product.category?.name || "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="0"
                        value={product.stock}
                        onChange={(e) =>
                          handleStockChange(
                            product._id,
                            e.target.value
                          )
                        }
                        className="w-24 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-900"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          handleUpdateStock(
                            product._id,
                            product.stock
                          )
                        }
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInventory;