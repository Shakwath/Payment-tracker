import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaSignInAlt,
  FaUserPlus,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaUserCog,
  FaTachometerAlt,
  FaChevronDown,
  FaGlobe,
} from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import { useLanguage } from "../../Context/LanguageContext";

const Navbar = () => {
  const { user, role, logOut } = useAuth();
  const { lang, toggleLang, t } = useLanguage();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const ROLE_LABELS = {
    admin: t("অ্যাডমিন", "Admin"),
    guardian: t("অভিভাবক", "Guardian"),
    teacher: t("শিক্ষক", "Teacher"),
  };

  const handleLogoutClick = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("userPassword");
        toast.success(t("সফলভাবে লগআউট হয়েছে!", "Logged out successfully!"));
        setDropdownOpen(false);
        navigate("/signin");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

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
    `px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
      isActive
        ? "bg-primary text-white shadow-md shadow-primary/25 border border-primary/40"
        : "text-base-content/80 hover:bg-base-200 hover:text-base-content"
    }`;

  const navItems = (
    <>
      <NavLink to="/" className={linkClass}>
        <span>{t("হোম", "Home")}</span>
      </NavLink>
      <NavLink to="/dashboard" className={linkClass}>
        <span>{t("ড্যাশবোর্ড", "Dashboard")}</span>
      </NavLink>
      <NavLink to="/payment" className={linkClass}>
        <span>{t("ফি পরিশোধ", "Pay Fee")}</span>
      </NavLink>
      <NavLink to="/payment-history" className={linkClass}>
        <span>{t("পেমেন্ট হিস্ট্রি", "Payment History")}</span>
      </NavLink>
      <NavLink to="/about" className={linkClass}>
        <span>{t("মাদ্রাসা পরিচিতি", "About Madrasa")}</span>
      </NavLink>
    </>
  );

  const initials = user?.displayName ? user.displayName.slice(0, 2) : "M";

  return (
    <header className="sticky top-3 z-50 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300 print:hidden">
      <div className="rounded-2xl border border-slate-200/90 dark:border-purple-900/40 bg-white/95 dark:bg-slate-900/95 shadow-md backdrop-blur-md overflow-visible">
        <div className="flex items-center justify-between min-h-[4.25rem]">
          {/* Segment 1: Madrasa Logo & Name */}
          <div className="flex items-center px-4 sm:px-5 py-2.5 sm:border-r border-slate-200 dark:border-slate-800">
            <Link to="/" className="group flex items-center gap-3 text-base-content">
              <img
                src="/logo.png"
                alt="মারকাযুল ইলমি ওয়াল হুদা"
                className="h-11 w-11 rounded-xl object-contain bg-white p-0.5 border border-primary/20 shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-primary leading-tight">
                  مركز العلم والهدى
                </span>
                <span className="text-sm sm:text-base font-extrabold tracking-tight text-base-content leading-tight">
                  {t("মারকাযুল ইলমি ওয়াল হুদা", "Markajul Ilm Wal Huda")}
                </span>
              </div>
            </Link>
          </div>

          {/* Segment 2: Desktop Menu */}
          <div className="hidden lg:flex items-center justify-center px-4 py-2 flex-1">
            <nav className="flex items-center gap-1.5 p-1 bg-base-200/60 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800 rounded-xl">
              {navItems}
            </nav>
          </div>

          {/* Segment 3: Language, Theme & User */}
          <div className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:border-l border-slate-200 dark:border-slate-800">
            {/* Bilingual Toggle Button */}
            <button
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary/30 bg-primary/10 text-primary text-xs font-bold hover:bg-primary hover:text-white transition cursor-pointer"
              title="Change Language / ভাষা পরিবর্তন করুন"
            >
              <FaGlobe className="text-xs" />
              <span>{lang === "bn" ? "EN" : "বাংলা"}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle btn-sm text-base-content/80 hover:text-primary transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <FaMoon className="text-base" /> : <FaSun className="text-base" />}
            </button>

            {user ? (
              <div className="relative hidden sm:block" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-base-100 dark:bg-slate-950 hover:border-primary/40 hover:shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden ring-2 ring-primary/30 flex-shrink-0 bg-white">
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
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                  </div>

                  <div className="text-left">
                    <span className="block text-xs font-bold text-base-content max-w-[110px] truncate leading-none">
                      {user.displayName || t("হিসাব", "Account")}
                    </span>
                    <span className="text-[10px] font-bold text-primary">
                      {ROLE_LABELS[role] || ROLE_LABELS.guardian}
                    </span>
                  </div>
                  <FaChevronDown
                    className={`text-[10px] text-base-content/50 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-[calc(100%+8px)] w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-black/10 z-[999] overflow-hidden">
                    <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-br from-primary/5 via-transparent to-transparent">
                      <img
                        src={user.photoURL || "/logo.png"}
                        alt={user.displayName}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary/25 bg-white"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-base-content truncate">
                          {user.displayName}
                        </p>
                        <p className="text-[10px] font-mono text-base-content/60 truncate">
                          {user.email}
                        </p>
                        <p className="text-[10px] text-primary font-bold mt-0.5">
                          {t("রোল:", "Role:")} {ROLE_LABELS[role] || role}
                        </p>
                      </div>
                    </div>

                    <div className="p-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-bold text-base-content hover:bg-primary hover:text-white transition-all duration-150 group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary group-hover:bg-white/20 group-hover:text-white flex items-center justify-center text-xs">
                          <FaTachometerAlt />
                        </div>
                        <span>{t("ড্যাশবোর্ড", "Dashboard")}</span>
                      </Link>

                      {role === "admin" && (
                        <Link
                          to="/dashboard/user-roles"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-bold text-base-content hover:bg-base-200 dark:hover:bg-slate-800 transition-all duration-150"
                        >
                          <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs">
                            <FaUserCog />
                          </div>
                          <span>{t("ইমেইল রোল নির্ধারণ", "Manage User Roles")}</span>
                        </Link>
                      )}

                      <Link
                        to="/update-profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-bold text-base-content hover:bg-base-200 dark:hover:bg-slate-800 transition-all duration-150"
                      >
                        <div className="w-7 h-7 rounded-lg bg-base-200 dark:bg-slate-800 text-base-content/70 flex items-center justify-center text-xs">
                          <FaUserCog />
                        </div>
                        <span>{t("প্রোফাইল আপডেট", "Update Profile")}</span>
                      </Link>

                      <div className="my-1.5 border-t border-slate-100 dark:border-slate-800" />

                      <button
                        onClick={handleLogoutClick}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all duration-150 cursor-pointer"
                      >
                        <div className="w-7 h-7 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-500 flex items-center justify-center text-xs">
                          <FaSignOutAlt />
                        </div>
                        <span>{t("লগআউট", "Sign Out")}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/signin"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-base-content/85 hover:bg-base-200 transition-all duration-200"
                >
                  <FaSignInAlt />
                  <span>{t("লগইন", "Sign In")}</span>
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary text-white rounded-xl px-4 py-2 btn-sm shadow-md shadow-primary/20 text-xs font-bold"
                >
                  <FaUserPlus />
                  <span>{t("রেজিস্ট্রেশন", "Register")}</span>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
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
                    <button
                      onClick={handleLogoutClick}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10"
                    >
                      <FaSignOutAlt />
                      <span>{t("লগআউট", "Sign Out")}</span>
                    </button>
                  ) : (
                    <Link
                      to="/signin"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold hover:bg-base-200"
                    >
                      <FaSignInAlt />
                      <span>{t("লগইন / অ্যাকাউন্ট", "Sign In / Account")}</span>
                    </Link>
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
