import { useState, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar";
import useAuth from "../Hooks/useAuth";
import {
  Bell,
  Sun,
  Moon,
  Search,
  Shield,
  GraduationCap,
  Command,
} from "lucide-react";

const DashboardLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Role state: defaults to user.role or 'admin'
  const [role, setRole] = useState(user?.role || "admin");

  // Theme Toggle state
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

  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentTitle = pathParts[pathParts.length - 1]
    ? pathParts[pathParts.length - 1]
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
    : "Dashboard Overview";

  const roleIcons = {
    admin: Shield,
    student: GraduationCap,
    teacher: GraduationCap,
  };
  const ActiveRoleIcon = roleIcons[role] || Shield;

  return (
    <div className="min-h-screen bg-slate-100/80 dark:bg-slate-950 text-base-content flex p-3 sm:p-4 gap-4 overflow-hidden font-sans">
      {/* Sidebar Component */}
      <Sidebar currentRole={role} onRoleChange={(newRole) => setRole(newRole)} />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col min-w-0 h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar space-y-5">
        
        {/* Donezo Style Header Bar */}
        <header className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl px-6 py-3 flex items-center justify-between gap-4 shadow-sm shrink-0">
          
          {/* Search Input with Shortcut Chip */}
          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40" />
            <input
              type="text"
              placeholder="Search student, invoice, TRX ID..."
              className="w-full pl-11 pr-14 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-2 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-base-content/50 shadow-sm">
              <Command className="h-3 w-3" /> F
            </div>
          </div>

          {/* Right Action Widgets */}
          <div className="flex items-center gap-3 ml-auto">
            
            {/* Role Mode Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold uppercase">
              <ActiveRoleIcon className="h-3.5 w-3.5" />
              <span>{role} MODE</span>
            </div>

            {/* Notification Bell */}
            <button
              className="relative h-10 w-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-base-content/70 hover:text-primary transition flex items-center justify-center"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="h-10 w-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-base-content/70 hover:text-primary transition flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            {/* User Profile Badge (Matching Reference Screenshot) */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
              <img
                src={
                  user?.photoURL ||
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                }
                alt="User Avatar"
                className="h-9 w-9 rounded-2xl object-cover ring-2 ring-primary/20 shrink-0"
              />
              <div className="hidden lg:flex flex-col min-w-0">
                <span className="text-xs font-extrabold text-base-content truncate leading-tight">
                  {user?.displayName || "Totok Michael"}
                </span>
                <span className="text-[10px] font-mono text-base-content/50 truncate">
                  {user?.email || "tmichael20@gmail.com"}
                </span>
              </div>
            </div>

          </div>
        </header>

        {/* Dynamic Outlet Page View Container */}
        <main className="flex-1 min-w-0">
          <Outlet context={{ role, setRole }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
