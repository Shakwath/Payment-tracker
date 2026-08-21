import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaMoneyCheckAlt,
  FaBars,
  FaSignInAlt,
  FaUserPlus,
  FaSun,
  FaMoon,
  FaSignOutAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const storedPassword = localStorage.getItem("userPassword") || "OAuth Login";

  const handleLogoutClick = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("userPassword");
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

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

          {/* Desktop Buttons / User Info */}
          <div className="hidden lg:flex items-center gap-2.5">
            {user ? (
              <div className="flex items-center gap-3">
                {/* User Credentials Box */}
                <div className="flex flex-col text-right text-xs bg-base-200 border border-base-300 px-3 py-1.5 rounded-xl">
                  <p className="font-semibold text-base-content/90 max-w-[150px] truncate">
                    ID: <span className="font-mono text-primary font-bold">{user.email || user.uid}</span>
                  </p>
                  <p className="text-[10px] text-base-content/65 mt-0.5 truncate max-w-[150px]">
                    Pass: <span className="font-mono font-medium text-secondary">{storedPassword}</span>
                  </p>
                </div>

                {/* Avatar with Dropdown */}
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
                    <div className="w-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={user.photoURL || "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix"}
                        alt="User Profile"
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-3 shadow-2xl bg-base-100 border border-base-200/80 rounded-2xl w-60 mt-3 z-[100]"
                  >
                    <li className="menu-title px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-base-content/40">
                      User Profile
                    </li>
                    <li className="px-4 py-2 border-b border-base-200/60 mb-2">
                      <p className="font-bold text-base-content text-sm p-0 m-0 truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-base-content/60 p-0 m-0 truncate mt-0.5">
                        {user.email}
                      </p>
                    </li>
                    <li>
                      <button
                        onClick={handleLogoutClick}
                        className="flex items-center gap-2 px-4 py-2.5 text-error hover:bg-error/10 hover:text-error rounded-xl transition"
                      >
                        <FaSignOutAlt />
                        <span>Log Out</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/signin"
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
              </>
            )}
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
                {user ? (
                  <div className="flex flex-col gap-2 p-2">
                    <div className="flex items-center gap-3 bg-base-200 border border-base-300 p-3 rounded-xl">
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img
                            src={user.photoURL || "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix"}
                            alt="User Profile"
                          />
                        </div>
                      </div>
                      <div className="truncate max-w-[140px]">
                        <p className="font-bold text-sm truncate">{user.displayName || "User"}</p>
                        <p className="text-[10px] text-base-content/60 truncate mt-0.5">ID: {user.email}</p>
                        <p className="text-[10px] text-base-content/60 truncate mt-0.5">Pass: {storedPassword}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogoutClick}
                      className="flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-error/10 text-error hover:bg-error hover:text-error-content transition"
                    >
                      <FaSignOutAlt />
                      <span>Log Out</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/signin"
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
                  </>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;