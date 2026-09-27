import { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  deleteCategory
} from "../../api/admin";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

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

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const data = await addCategory({
        name,
        description
      });

      setCategories([
        ...categories,
        data.category
      ]);

      setName("");
      setDescription("");
    } catch (error) {
  console.log("Category error:", error.response?.data);

  setError(
    error.response?.data?.message ||
      error.response?.data?.error ||
      "Failed to add category"
  );
}
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);

      setCategories(
        categories.filter(
          (category) => category._id !== id
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete category"
      );
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Categories
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage product categories.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6"
        >
          <h2 className="text-lg font-semibold text-slate-900">
            Add Category
          </h2>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">
              Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
              placeholder="Electronics"
            />
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows="4"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-900"
              placeholder="Electronic products"
            />
          </div>

          <button
            type="submit"
            className="mt-5 w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800"
          >
            Add Category
          </button>
        </form>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white lg:col-span-2">
          <div className="border-b px-6 py-4">
            <h2 className="font-semibold text-slate-900">
              Categories
            </h2>
          </div>

          {categories.map((category) => (
            <div
              key={category._id}
              className="flex items-center justify-between border-b px-6 py-4 last:border-0"
            >
              <div>
                <p className="text-sm font-medium">
                  {category.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {category.description || "No description"}
                </p>
              </div>

              <button
                onClick={() =>
                  handleDelete(category._id)
                }
                className="text-sm font-medium text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;