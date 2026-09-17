const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="grid items-center gap-5 border-b border-slate-100 py-5 md:grid-cols-[2fr_1fr_1fr_1fr]">
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="h-20 w-20 rounded-xl object-cover"
        />

        <div>
          <h3 className="font-semibold text-slate-900">{item.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{item.category}</p>

          <button
            onClick={() => onRemove(item.id)}
            className="mt-2 text-xs font-medium text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="text-sm font-semibold text-slate-700">
        ₹{item.price.toLocaleString("en-IN")}
      </div>

      <div className="flex items-center">
        <div className="flex items-center rounded-lg border border-slate-200">
          <button
            onClick={() => onDecrease(item.id)}
            className="h-9 w-9 text-slate-600 hover:bg-slate-50"
          >
            −
          </button>

          <span className="w-9 text-center text-sm font-semibold">
            {item.quantity}
          </span>

          <button
            onClick={() => onIncrease(item.id)}
            className="h-9 w-9 text-slate-600 hover:bg-slate-50"
          >
            +
          </button>
        </div>
      </div>

      <div className="text-sm font-bold text-slate-900">
        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
      </div>
    </div>
  );
};

export default CartItem;