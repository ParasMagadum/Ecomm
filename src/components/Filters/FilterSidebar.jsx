const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder,
}) => {
  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Shoes",
    "Accessories",
  ];

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5">
      <div>
        <h3 className="text-base font-bold text-slate-900">Category</h3>

        <div className="mt-4 space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="h-4 w-4 accent-blue-600"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="my-6 border-t border-slate-100" />

      <div>
        <h3 className="text-base font-bold text-slate-900">Price</h3>

        <div className="mt-4 flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />

          <span className="text-slate-400">-</span>

          <input
            type="number"
            placeholder="Max"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="my-6 border-t border-slate-100" />

      <div>
        <h3 className="text-base font-bold text-slate-900">Sort By Price</h3>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="mt-4 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
        >
          <option value="default">Default</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;