import { useState, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar";
import useAuth from "../Hooks/useAuth";
import {
  Bell,
  Sun,
  Moon,
  Search,
  ChevronRight,
  Shield,
  UserCheck,
  GraduationCap,
} from "lucide-react";

const DashboardLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Role state: defaults to user.role or 'admin', switchable via role bar
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

  // Generate breadcrumb titles from pathname
  const pathParts = location.pathname.split("/").filter(Boolean);
  const currentTitle = pathParts[pathParts.length - 1]
    ? pathParts[pathParts.length - 1]
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
    : "Dashboard Overview";

  const roleIcons = {
    admin: Shield,
    guardian: UserCheck,
    teacher: GraduationCap,
  };
  const ActiveRoleIcon = roleIcons[role] || Shield;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-base-content flex overflow-hidden transition-colors duration-300 font-sans">
      {/* Unified Dynamic Role-Based Sidebar */}
      <Sidebar currentRole={role} onRoleChange={(newRole) => setRole(newRole)} />

      {/* Main Dashboard Canvas Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* Sticky Top Header Bar */}
        <header className="sticky top-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Breadcrumbs & Route Title */}
          <div className="flex items-center gap-2 overflow-hidden">
            <Link
              to="/dashboard"
              className="text-xs font-mono font-bold text-base-content/50 hover:text-primary transition"
            >
              Dashboard
            </Link>
            {pathParts.length > 1 && (
              <>
                <ChevronRight className="h-3 w-3 text-base-content/40" />
                <span className="text-xs font-mono font-bold text-primary truncate capitalize">
                  {currentTitle}
                </span>
              </>
            )}
          </div>

          {/* Right Header Action Items */}
          <div className="flex items-center gap-3">
            
            {/* Active Role Indicator Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold uppercase">
              <ActiveRoleIcon className="h-3.5 w-3.5" />
              <span>{role} MODE</span>
            </div>

            {/* Notification Bell Icon */}
            <button
              className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-base-100 hover:bg-base-200 text-base-content/70 hover:text-primary transition"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary animate-ping" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-base-100 hover:bg-base-200 text-base-content/70 hover:text-primary transition"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            {/* User Avatar Circle */}
            <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-3">
              <img
                src={
                  user?.photoURL ||
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                }
                alt="User"
                className="h-8 w-8 rounded-lg object-cover ring-2 ring-primary/20"
              />
            </div>
          </div>
        </header>

        {/* Inner Page View Container */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet context={{ role, setRole }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
