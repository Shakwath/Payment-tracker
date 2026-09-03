import { useState, useEffect, useRef } from "react";
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
  FaTachometerAlt,
  FaChevronDown,
} from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogoutClick = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("userPassword");
        toast.success("Logged out successfully!");
        setDropdownOpen(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      <NavLink to="/dashboard" className={linkClass}>
        <span>Dashboard</span>
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

  // Derived avatar initials fallback
  const initials = user?.displayName
    ? user.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <header className="sticky top-3 z-50 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300">
      {/* Box Shaped Navbar Wrapper */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-purple-900/40 bg-white/90 dark:bg-slate-900/90 shadow-md backdrop-blur-md overflow-visible">
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

          {/* Box Segment 3: Actions / User */}
          <div className="flex items-center gap-2.5 px-4 sm:px-5 py-3 sm:border-l border-slate-200 dark:border-slate-800">

            {/* Theme Toggle */}
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

            {/* ── LOGGED IN: User Dropdown ── */}
            {user ? (
              <div className="relative hidden sm:block" ref={dropdownRef}>
                {/* Avatar Trigger Button */}
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-base-100 dark:bg-slate-950 hover:border-primary/40 hover:shadow-sm transition-all duration-200"
                >
                  {/* Avatar */}
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden ring-2 ring-primary/30 flex-shrink-0">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                        {initials}
                      </div>
                    )}
                    {/* Online dot */}
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                  </div>

                  {/* Name + chevron */}
                  <span className="text-xs font-semibold text-base-content max-w-[90px] truncate">
                    {user.displayName || "Account"}
                  </span>
                  <FaChevronDown
                    className={`text-[10px] text-base-content/50 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Panel */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-black/10 z-[999] overflow-hidden animate-[fadeInDown_0.15s_ease-out]">

                    {/* Header — User Identity */}
                    <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-br from-primary/5 via-transparent to-transparent">
                      <div className="w-11 h-11 rounded-xl overflow-hidden ring-2 ring-primary/25 flex-shrink-0">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.displayName || "User"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                            {initials}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-base-content truncate">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-[11px] text-base-content/55 font-mono truncate mt-0.5">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-base-content hover:bg-primary hover:text-white transition-all duration-150 group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary group-hover:bg-white/20 group-hover:text-white flex items-center justify-center text-xs transition-colors">
                          <FaTachometerAlt />
                        </div>
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        to="/update-profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-base-content hover:bg-base-200 dark:hover:bg-slate-800 transition-all duration-150 group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-base-200 dark:bg-slate-800 text-base-content/70 flex items-center justify-center text-xs transition-colors">
                          <FaUserCog />
                        </div>
                        <span>Profile</span>
                      </Link>

                      {/* Divider */}
                      <div className="my-2 border-t border-slate-100 dark:border-slate-800" />

                      <button
                        onClick={handleLogoutClick}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all duration-150 group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center text-xs">
                          <FaSignOutAlt />
                        </div>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ── LOGGED OUT: Auth Buttons ── */
              <div className="hidden sm:flex items-center gap-2.5">
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
              </div>
            )}

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
                    <div className="flex flex-col gap-2">
                      {/* Mobile User Identity */}
                      <div className="flex items-center gap-3 bg-gradient-to-br from-primary/5 to-transparent border border-slate-200 dark:border-slate-800 p-3 rounded-xl">
                        <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-primary/25 flex-shrink-0">
                          {user.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt={user.displayName || "User"}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                              {initials}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-base-content truncate">{user.displayName || "User"}</p>
                          <p className="text-[10px] text-base-content/55 font-mono truncate mt-0.5">{user.email}</p>
                        </div>
                      </div>

                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-primary text-white transition"
                      >
                        <FaTachometerAlt />
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        to="/update-profile"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-base-200 dark:bg-slate-800 text-base-content transition"
                      >
                        <FaUserCog />
                        <span>Profile</span>
                      </Link>

                      <button
                        onClick={handleLogoutClick}
                        className="flex w-full items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-rose-50 dark:bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition"
                      >
                        <FaSignOutAlt />
                        <span>Sign Out</span>
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