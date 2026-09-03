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

/**
 * Role-Based Categorized Navigation Configuration
 */
const ROLE_NAV_GROUPS = {
  admin: [
    {
      category: "Overview",
      items: [{ label: "Dashboard", path: "/dashboard", icon: LayoutDashboard }],
    },
    {
      category: "People Management",
      items: [
        { label: "Students", path: "/dashboard/students", icon: Users },
        { label: "Guardians", path: "/dashboard/guardians", icon: UserCheck },
        { label: "Teachers", path: "/dashboard/teachers", icon: GraduationCap },
      ],
    },
    {
      category: "Academic Management",
      items: [{ label: "Semesters", path: "/dashboard/semesters", icon: CalendarDays }],
    },
    {
      category: "Finance",
      items: [
        { label: "Fee Management", path: "/dashboard/fee-management", icon: Receipt },
        { label: "Payments", path: "/dashboard/payments", icon: CreditCard },
        { label: "Pending Verification", path: "/dashboard/pending-verification", icon: Clock },
        { label: "Expenses", path: "/dashboard/expenses", icon: TrendingDown },
        { label: "Teacher Salaries", path: "/dashboard/teacher-salaries", icon: DollarSign },
      ],
    },
    {
      category: "Reports & Monitoring",
      items: [
        { label: "Reports", path: "/dashboard/reports", icon: BarChart3 },
        { label: "Audit Logs", path: "/dashboard/audit-logs", icon: ShieldCheck },
      ],
    },
    {
      category: "Communication",
      items: [{ label: "Notifications", path: "/dashboard/notifications", icon: Bell }],
    },
    {
      category: "System",
      items: [{ label: "Settings", path: "/dashboard/settings", icon: Settings }],
    },
  ],

  guardian: [
    {
      category: "Overview",
      items: [{ label: "Dashboard", path: "/dashboard", icon: LayoutDashboard }],
    },
    {
      category: "Family & Dues",
      items: [
        { label: "My Students", path: "/dashboard/my-students", icon: Users },
        { label: "Pay Fees", path: "/dashboard/pay-fees", icon: CreditCard },
        { label: "Payment History", path: "/dashboard/payment-history", icon: Clock },
        { label: "Receipts", path: "/dashboard/receipts", icon: FileText },
      ],
    },
    {
      category: "System",
      items: [
        { label: "Notifications", path: "/dashboard/notifications", icon: Bell },
        { label: "Profile", path: "/dashboard/profile", icon: User },
      ],
    },
  ],

  teacher: [
    {
      category: "Overview",
      items: [{ label: "Dashboard", path: "/dashboard", icon: LayoutDashboard }],
    },
    {
      category: "Academic & Payroll",
      items: [
        { label: "My Profile", path: "/dashboard/my-profile", icon: User },
        { label: "My Subjects", path: "/dashboard/my-subjects", icon: BookOpen },
        { label: "Salary History", path: "/dashboard/salary-history", icon: DollarSign },
        { label: "Input Student Result", path: "/dashboard/input-student-result", icon: FileSpreadsheet },
      ],
    },
    {
      category: "System",
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
      className={`relative flex flex-col h-screen border-r border-slate-200/80 dark:border-purple-900/40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl transition-all duration-300 z-30 select-none ${
        collapsed ? "w-20" : "w-64 sm:w-72"
      }`}
    >
      {/* Sidebar Header & Brand */}
      <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-800">
        <Link to="/" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary text-white shadow-md shadow-primary/25">
            <Sparkles className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-base tracking-tight text-base-content leading-none">
                Payment<span className="text-primary font-black">Track</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-primary tracking-wide uppercase mt-1">
                {roleLabels[roleKey] || "Portal"}
              </span>
            </div>
          )}
        </Link>

        {/* Collapse Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden sm:flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-base-100 hover:bg-base-200 text-base-content/70 hover:text-primary transition"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Role Switcher Pill Bar */}
      {!collapsed && (
        <div className="px-4 py-3 bg-base-200/60 dark:bg-slate-950/60 border-b border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-base-content/50">
              Select User Role:
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1 bg-base-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/80 dark:border-slate-800">
            {["admin", "guardian", "teacher"].map((role) => (
              <button
                key={role}
                onClick={() => onRoleChange && onRoleChange(role)}
                className={`py-1 rounded-lg text-[10px] font-mono font-bold capitalize transition-all ${
                  roleKey === role
                    ? "bg-primary text-white shadow-sm"
                    : "text-base-content/60 hover:text-base-content hover:bg-base-200 dark:hover:bg-slate-800"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Categorized Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 custom-scrollbar">
        {navGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            {!collapsed && (
              <div className="px-3 mb-1.5 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-base-content/45">
                  {group.category}
                </span>
                <span className="h-[1px] flex-1 bg-slate-200/60 dark:bg-slate-800/80 ml-2" />
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
                  className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white font-bold shadow-md shadow-primary/25 border border-primary/40"
                      : "text-base-content/75 hover:bg-base-200/80 dark:hover:bg-slate-800/80 hover:text-base-content"
                  } ${collapsed ? "justify-center px-0" : ""}`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-primary"}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
        <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} gap-2`}>
          {!collapsed && (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={
                  user?.photoURL ||
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                }
                alt={user?.displayName || "User"}
                className="h-8 w-8 rounded-lg object-cover border border-primary/30 shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-base-content truncate">
                  {user?.displayName || "Zabed (User)"}
                </span>
                <span className="text-[10px] font-mono text-base-content/50 truncate">
                  {roleKey.toUpperCase()}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={() => logOut()}
            title="Log Out"
            className="h-8 w-8 rounded-lg flex items-center justify-center text-rose-500 hover:bg-rose-500/10 transition"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
