import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CalendarDays,
  Receipt,
  CreditCard,
  Clock,
  TrendingDown,
  GraduationCap,
  DollarSign,
  BarChart3,
  Bell,
  ShieldCheck,
  Settings,
  FileText,
  User,
  BookOpen,
  FileSpreadsheet,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import useAuth from "../../Hooks/useAuth";

const ROLE_NAV_GROUPS = {
  admin: [
    {
      category: "MENU",
      items: [
        { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { label: "Students", path: "/dashboard/students", icon: Users, badge: "124" },
        { label: "Guardians", path: "/dashboard/guardians", icon: UserCheck },
        { label: "Teachers", path: "/dashboard/teachers", icon: GraduationCap },
        { label: "Semesters", path: "/dashboard/semesters", icon: CalendarDays },
      ],
    },
    {
      category: "FINANCE",
      items: [
        { label: "Fee Structure", path: "/dashboard/fee-management", icon: Receipt },
        { label: "Payments Ledger", path: "/dashboard/payments", icon: CreditCard },
        { label: "Pending Verification", path: "/dashboard/pending-verification", icon: Clock, badge: "2" },
        { label: "Expenses Log", path: "/dashboard/expenses", icon: TrendingDown },
        { label: "Teacher Payroll", path: "/dashboard/teacher-salaries", icon: DollarSign },
      ],
    },
    {
      category: "GENERAL",
      items: [
        { label: "Reports", path: "/dashboard/reports", icon: BarChart3 },
        { label: "Audit Logs", path: "/dashboard/audit-logs", icon: ShieldCheck },
        { label: "Notifications", path: "/dashboard/notifications", icon: Bell },
        { label: "Settings", path: "/dashboard/settings", icon: Settings },
      ],
    },
  ],

  guardian: [
    {
      category: "MENU",
      items: [
        { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { label: "My Students", path: "/dashboard/my-students", icon: Users, badge: "2" },
        { label: "Pay Fees", path: "/dashboard/pay-fees", icon: CreditCard },
        { label: "Payment History", path: "/dashboard/payment-history", icon: Clock },
        { label: "Receipts", path: "/dashboard/receipts", icon: FileText },
      ],
    },
    {
      category: "GENERAL",
      items: [
        { label: "Notifications", path: "/dashboard/notifications", icon: Bell },
        { label: "My Profile", path: "/dashboard/profile", icon: User },
      ],
    },
  ],

  teacher: [
    {
      category: "MENU",
      items: [
        { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { label: "My Profile", path: "/dashboard/my-profile", icon: User },
        { label: "Assigned Subjects", path: "/dashboard/my-subjects", icon: BookOpen },
        { label: "Salary History", path: "/dashboard/salary-history", icon: DollarSign },
        { label: "Input Results", path: "/dashboard/input-student-result", icon: FileSpreadsheet },
      ],
    },
    {
      category: "GENERAL",
      items: [{ label: "Notifications", path: "/dashboard/notifications", icon: Bell }],
    },
  ],
};

const Sidebar = ({ currentRole = "admin", onRoleChange }) => {
  const { user, logOut } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const roleKey = (currentRole || "admin").toLowerCase();
  const navGroups = ROLE_NAV_GROUPS[roleKey] || ROLE_NAV_GROUPS.admin;

  const roleLabels = {
    admin: "Admin Console",
    guardian: "Guardian Portal",
    teacher: "Teacher Hub",
  };

  return (
    <aside
      className={`relative flex flex-col h-[calc(100vh-2rem)] rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 z-30 select-none ${
        collapsed ? "w-20" : "w-64 sm:w-72"
      }`}
    >
      {/* Brand Header (Matching Donezo Logo Aesthetic) */}
      <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
        <Link to="/" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/25">
            <Sparkles className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white leading-none">
                Payment<span className="text-primary font-black">Track</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-primary tracking-wider uppercase mt-1">
                {roleLabels[roleKey] || "Portal"}
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden sm:flex h-7 w-7 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-base-content/70 hover:text-primary transition"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Role Switcher Bar */}
      {!collapsed && (
        <div className="px-5 py-3 bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Select Mode:
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1 bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
            {["admin", "guardian", "teacher"].map((role) => (
              <button
                key={role}
                onClick={() => onRoleChange && onRoleChange(role)}
                className={`py-1 rounded-xl text-[10px] font-mono font-bold capitalize transition-all ${
                  roleKey === role
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Categorized Navigation with Left Vertical Pill Indicator (Exact Donezo Style) */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 custom-scrollbar">
        {navGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            {!collapsed && (
              <div className="px-2 mb-2 flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase font-bold tracking-widest text-slate-400">
                  {group.category}
                </span>
              </div>
            )}

            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/dashboard" && location.pathname.startsWith(item.path));

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={collapsed ? `${group.category}: ${item.label}` : undefined}
                  className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm transition-all duration-200 ${
                    isActive
                      ? "text-slate-900 dark:text-white font-extrabold bg-slate-100/60 dark:bg-slate-800/50"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  } ${collapsed ? "justify-center px-0" : ""}`}
                >
                  {/* Vertical Accent Indicator Bar on Left Edge (Donezo Reference Style) */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full bg-primary shadow-sm shadow-primary/50" />
                  )}

                  <div className="flex items-center gap-3 min-w-0 pl-1">
                    <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-primary" : "text-slate-400"}`} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!collapsed && item.badge && (
                    <span
                      className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md ${
                        isActive
                          ? "bg-primary text-white shadow-sm"
                          : "bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>



      {/* Profile Footer */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800">
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} gap-2`}>
          {!collapsed && (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={
                  user?.photoURL ||
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                }
                alt={user?.displayName || "User"}
                className="h-8 w-8 rounded-xl object-cover ring-2 ring-primary/20 shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {user?.displayName || "Zabed (User)"}
                </span>
                <span className="text-[10px] font-mono text-slate-400 truncate">
                  {roleKey.toUpperCase()}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={() => logOut()}
            title="Log Out"
            className="h-8 w-8 rounded-xl flex items-center justify-center text-rose-500 hover:bg-rose-500/10 transition"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
