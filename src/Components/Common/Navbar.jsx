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
  FaUserCog,
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
    `px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 ${
      isActive
        ? "bg-primary text-white shadow-md shadow-primary/25 border border-primary/40"
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
    <header className="sticky top-3 z-50 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300">
      {/* Box Shaped Navbar Wrapper */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-purple-900/40 bg-white/90 dark:bg-slate-900/90 shadow-md backdrop-blur-md overflow-hidden">
        <div className="flex items-center justify-between min-h-[4rem]">
          
          {/* Box Segment 1: Logo */}
          <div className="flex items-center px-5 py-3 sm:border-r border-slate-200 dark:border-slate-800">
            <Link
              to="/"
              className="group flex items-center gap-3 text-xl font-bold tracking-tight text-base-content"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary text-white shadow-md shadow-primary/20 transition-all duration-300 group-hover:rotate-6 group-hover:scale-105">
                <FaMoneyCheckAlt className="text-lg" />
              </div>
              <span className="bg-gradient-to-r from-base-content to-base-content/85 bg-clip-text text-transparent">
                Payment<span className="text-primary font-black">Track</span>
              </span>
            </Link>
          </div>

          {/* Box Segment 2: Desktop Menu Items */}
          <div className="hidden lg:flex items-center justify-center px-4 py-2 flex-1">
            <nav className="flex items-center gap-1.5 p-1 bg-base-200/60 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 rounded-xl">
              {navItems}
            </nav>
          </div>

          {/* Box Segment 3: Actions / User Info */}
          <div className="flex items-center gap-2.5 px-4 sm:px-5 py-3 sm:border-l border-slate-200 dark:border-slate-800">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle btn-sm text-base-content/80 hover:text-primary transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <FaMoon className="text-base" />
              ) : (
                <FaSun className="text-base" />
              )}
            </button>

            {/* User Info / Auth Controls */}
            <div className="hidden sm:flex items-center gap-2.5">
              {user ? (
                <div className="flex items-center gap-3">
                  {/* User Credentials Box */}
                  <div className="flex flex-col text-right text-xs bg-base-200/70 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl font-mono">
                    <p className="font-semibold text-base-content/90 max-w-[140px] truncate">
                      ID: <span className="text-primary font-bold">{user.email || user.uid}</span>
                    </p>
                    <p className="text-[10px] text-base-content/65 mt-0.5 truncate max-w-[140px]">
                      Pass: <span className="font-medium text-secondary">{storedPassword}</span>
                    </p>
                  </div>

                  {/* Avatar Dropdown */}
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar online btn-sm">
                      <div className="w-9 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={user.photoURL || "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix"}
                          alt="User Profile"
                        />
                      </div>
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-3 shadow-2xl bg-base-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-60 mt-3 z-[100]"
                    >
                      <li className="menu-title px-4 py-2 text-xs font-mono font-extrabold uppercase tracking-wider text-base-content/40">
                        User Profile
                      </li>
                      <li className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 mb-2">
                        <p className="font-bold text-base-content text-sm p-0 m-0 truncate">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs text-base-content/60 p-0 m-0 truncate mt-0.5 font-mono">
                          {user.email}
                        </p>
                      </li>
                      <li>
                        <Link
                          to="/update-profile"
                          className="flex items-center gap-2 px-4 py-2.5 text-base-content hover:bg-base-200 rounded-xl transition text-xs font-mono"
                        >
                          <FaUserCog />
                          <span>Update Profile</span>
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogoutClick}
                          className="flex items-center gap-2 px-4 py-2.5 text-error hover:bg-error/10 hover:text-error rounded-xl transition text-xs font-mono"
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
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-base-content/85 hover:bg-base-200 transition-all duration-200"
                  >
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>

                  <Link
                    to="/signup"
                    className="btn btn-primary text-white rounded-xl px-4 py-2 btn-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-primary/20 text-xs font-mono font-bold uppercase tracking-wider"
                  >
                    <FaUserPlus />
                    <span>Get Started</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Navigation Dropdown */}
            <div className="dropdown dropdown-end lg:hidden">
              <button
                tabIndex={0}
                aria-label="Toggle navigation menu"
                className="btn btn-ghost btn-circle btn-sm hover:bg-base-200 transition-colors"
              >
                <FaBars className="text-lg text-base-content/85" />
              </button>

              <div
                tabIndex={0}
                className="dropdown-content mt-3 w-64 origin-top-right rounded-2xl bg-base-100 dark:bg-slate-900 p-4 shadow-xl border border-slate-200 dark:border-slate-800 focus:outline-none z-[100]"
              >
                <nav className="flex flex-col gap-1.5">
                  {navItems}
                  <div className="my-2 border-t border-slate-200 dark:border-slate-800"></div>
                  {user ? (
                    <div className="flex flex-col gap-2 p-2">
                      <div className="flex items-center gap-3 bg-base-200 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-xl">
                        <div className="avatar">
                          <div className="w-9 rounded-full">
                            <img
                              src={user.photoURL || "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix"}
                              alt="User Profile"
                            />
                          </div>
                        </div>
                        <div className="truncate max-w-[140px] font-mono">
                          <p className="font-bold text-xs truncate">{user.displayName || "User"}</p>
                          <p className="text-[10px] text-base-content/60 truncate mt-0.5">ID: {user.email}</p>
                          <p className="text-[10px] text-base-content/60 truncate mt-0.5">Pass: {storedPassword}</p>
                        </div>
                      </div>
                      <Link
                        to="/update-profile"
                        className="flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-base-200 dark:bg-slate-800 transition text-base-content"
                      >
                        <FaUserCog />
                        <span>Update Profile</span>
                      </Link>
                      <button
                        onClick={handleLogoutClick}
                        className="flex w-full items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold bg-error/10 text-error hover:bg-error hover:text-error-content transition"
                      >
                        <FaSignOutAlt />
                        <span>Log Out</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link
                        to="/signin"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-base-content/75 hover:bg-base-200 transition-all"
                      >
                        <FaSignInAlt className="text-sm text-base-content/60" />
                        <span>Login</span>
                      </Link>
                      <Link
                        to="/signup"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-primary text-white hover:bg-primary/95 transition-all shadow-md shadow-primary/10"
                      >
                        <FaUserPlus className="text-sm" />
                        <span>Get Started</span>
                      </Link>
                    </>
                  )}
                </nav>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;