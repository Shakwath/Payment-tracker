import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaMoneyCheckAlt,
  FaBars,
  FaSignInAlt,
  FaUserPlus,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const linkClass = ({ isActive }) =>
    `px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${
      isActive
        ? "bg-primary text-primary-content shadow-md shadow-primary/15 font-semibold"
        : "text-base-content/75 hover:bg-base-200 hover:text-base-content"
    }`;

  const navItems = (
    <>
      <NavLink to="/" className={linkClass}>
        <span>Home</span>
      </NavLink>

      <NavLink to="/payment" className={linkClass}>
        <span>Payment</span>
      </NavLink>

      <NavLink to="/payment-history" className={linkClass}>
        <span>History</span>
      </NavLink>

      <NavLink to="/about" className={linkClass}>
        <span>About</span>
      </NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-200/50 bg-base-100/75 backdrop-blur-md transition-all duration-300">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[4.5rem]">
        {/* Logo */}
        <div className="navbar-start">
          <Link
            to="/"
            className="group flex items-center gap-3 text-xl font-bold tracking-tight text-base-content"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary text-white shadow-md shadow-primary/20 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
              <FaMoneyCheckAlt className="text-xl" />
            </div>
            <span className="bg-gradient-to-r from-base-content to-base-content/80 bg-clip-text text-transparent transition-all duration-300 group-hover:from-primary group-hover:to-secondary">
              Payment<span className="text-primary font-extrabold">Track</span>
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <nav className="flex items-center gap-2">
            {navItems}
          </nav>
        </div>

        {/* Right Side */}
        <div className="navbar-end gap-2.5">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle text-base-content/80 hover:text-primary transition-all duration-200"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <FaMoon className="text-lg" />
            ) : (
              <FaSun className="text-lg" />
            )}
          </button>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-base-content/85 hover:bg-base-200 hover:text-base-content transition-all duration-200"
            >
              <FaSignInAlt />
              <span>Login</span>
            </Link>

            <Link
              to="/signup"
              className="btn btn-primary rounded-xl px-5 py-2.5 hover:scale-[1.03] active:scale-[0.97] transition-all shadow-md shadow-primary/20 font-semibold"
            >
              <FaUserPlus />
              <span>Get Started</span>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end lg:hidden">
            <button
              tabIndex={0}
              aria-label="Toggle navigation menu"
              className="btn btn-ghost btn-circle hover:bg-base-200 transition-colors"
            >
              <FaBars className="text-xl text-base-content/85" />
            </button>

            <div
              tabIndex={0}
              className="dropdown-content mt-3 w-64 origin-top-right rounded-2xl bg-base-100 p-4 shadow-xl border border-base-200/60 focus:outline-none z-[100]"
            >
              <nav className="flex flex-col gap-1.5">
                {navItems}
                <div className="my-2 border-t border-base-200/60"></div>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-base-content/75 hover:bg-base-200 hover:text-base-content transition-all"
                >
                  <FaSignInAlt className="text-base text-base-content/60" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-primary text-primary-content hover:bg-primary/95 transition-all shadow-md shadow-primary/10"
                >
                  <FaUserPlus className="text-base" />
                  <span>Get Started</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;