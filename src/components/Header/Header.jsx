import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../utils/logout";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-4 lg:px-8">
        <Link
          to="/catalogue"
          className="shrink-0 text-xl font-extrabold tracking-tight text-slate-900"
        >
          EasyCart
        </Link>

        <div className="hidden flex-1 md:block">
          <div className="mx-auto max-w-xl">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>
        </div>

        <nav className="ml-auto flex items-center gap-2">
          <NavLink
            to="/catalogue"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 md:block"
          >
            Shop
          </NavLink>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-slate-600 transition hover:bg-slate-100"
          >
            ♡
          </Link>

          <Link
            to="/cart"
            aria-label="Shopping cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-xl text-slate-600 transition hover:bg-slate-100"
          >
            🛒
            <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
              2
            </span>
          </Link>

          <Link
            to="/profile"
            aria-label="Profile"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
          >
            ♙
          </Link>

          {user && (
            <button
              type="button"
              onClick={() => logout(navigate)}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </nav>
      </div>

      <div className="border-t border-slate-100 px-5 py-3 md:hidden">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
        />
      </div>
    </header>
  );
};

export default Header;