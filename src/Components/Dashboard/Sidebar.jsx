import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
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
  KeyRound,
} from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import { useLanguage } from "../../Context/LanguageContext";

export const ROLE_NAV_GROUPS = {
  admin: [
    {
      categoryBn: "সারসংক্ষেপ",
      categoryEn: "Overview",
      items: [
        {
          labelBn: "ড্যাশবোর্ড",
          labelEn: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      categoryBn: "শিক্ষার্থী, জনবল ও রোল",
      categoryEn: "Users & Role Control",
      items: [
        {
          labelBn: "ইমেইল ও রোল নির্ধারণ",
          labelEn: "Email Role Control",
          path: "/dashboard/user-roles",
          icon: KeyRound,
        },
        {
          labelBn: "শিক্ষার্থী ব্যবস্থাপনা",
          labelEn: "Students Management",
          path: "/dashboard/students",
          icon: Users,
        },
        {
          labelBn: "অভিভাবক তালিকা",
          labelEn: "Guardians Directory",
          path: "/dashboard/guardians",
          icon: UserCheck,
        },
        {
          labelBn: "শিক্ষক মণ্ডলী",
          labelEn: "Teachers Directory",
          path: "/dashboard/teachers",
          icon: GraduationCap,
        },
      ],
    },
    {
      categoryBn: "শিক্ষাবর্ষ ও একাডেমিক",
      categoryEn: "Academic & Semesters",
      items: [
        {
          labelBn: "সেমিস্টার ও ফলাফল",
          labelEn: "Semesters & Results",
          path: "/dashboard/semesters",
          icon: CalendarDays,
        },
      ],
    },
    {
      categoryBn: "হিসাব ও অর্থ বিভাগ",
      categoryEn: "Finance & Accounts",
      items: [
        {
          labelBn: "ফি নির্ধারণ (Fee Setup)",
          labelEn: "Fee Configuration",
          path: "/dashboard/fee-management",
          icon: Receipt,
        },
        {
          labelBn: "সকল পেমেন্ট ও ম্যানুয়াল আপডেট",
          labelEn: "Payments & Manual Edit",
          path: "/dashboard/payments",
          icon: CreditCard,
        },
        {
          labelBn: "পেন্ডিং যাচাই (Verification)",
          labelEn: "Pending Verification",
          path: "/dashboard/pending-verification",
          icon: Clock,
        },
        {
          labelBn: "মাসিক ব্যয় ও ভাউচার",
          labelEn: "Expenses & Vouchers",
          path: "/dashboard/expenses",
          icon: TrendingDown,
        },
        {
          labelBn: "শিক্ষক বেতন (Payroll)",
          labelEn: "Teacher Salaries",
          path: "/dashboard/teacher-salaries",
          icon: DollarSign,
        },
      ],
    },
    {
      categoryBn: "প্রতিবেদন ও মনিটরিং",
      categoryEn: "Reports & Audit",
      items: [
        {
          labelBn: "রিপোর্ট ও PDF এক্সপোর্ট",
          labelEn: "Reports & PDF Export",
          path: "/dashboard/reports",
          icon: BarChart3,
        },
        {
          labelBn: "অডিট লগ (Audit Logs)",
          labelEn: "Audit Logs",
          path: "/dashboard/audit-logs",
          icon: ShieldCheck,
        },
      ],
    },
    {
      categoryBn: "যোগাযোগ ও সিস্টেম",
      categoryEn: "System & Notices",
      items: [
        {
          labelBn: "নোটিশ ও নোটিফিকেশন",
          labelEn: "Notifications",
          path: "/dashboard/notifications",
          icon: Bell,
        },
        {
          labelBn: "মাদ্রাসা সেটিংস",
          labelEn: "System Settings",
          path: "/dashboard/settings",
          icon: Settings,
        },
      ],
    },
  ],

  guardian: [
    {
      categoryBn: "সারসংক্ষেপ",
      categoryEn: "Overview",
      items: [
        {
          labelBn: "অভিভাবক ড্যাশবোর্ড",
          labelEn: "Guardian Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      categoryBn: "সন্তান ও মাসিক ফি",
      categoryEn: "Children & Monthly Fees",
      items: [
        {
          labelBn: "আমার সন্তান ও ফলাফল",
          labelEn: "My Students & Results",
          path: "/dashboard/my-students",
          icon: Users,
        },
        {
          labelBn: "মাসিক ফি পরিশোধ করুন",
          labelEn: "Pay Monthly Fee",
          path: "/dashboard/pay-fees",
          icon: CreditCard,
        },
        {
          labelBn: "পেমেন্ট হিস্ট্রি ও স্ট্যাটাস",
          labelEn: "Payment History",
          path: "/dashboard/payment-history",
          icon: Clock,
        },
        {
          labelBn: "ডাউনলোড রশিদ (Receipts)",
          labelEn: "Official Receipts",
          path: "/dashboard/receipts",
          icon: FileText,
        },
      ],
    },
    {
      categoryBn: "সিস্টেম",
      categoryEn: "Account",
      items: [
        {
          labelBn: "নোটিশ ও বার্তা",
          labelEn: "Announcements",
          path: "/dashboard/notifications",
          icon: Bell,
        },
        {
          labelBn: "প্রোফাইল",
          labelEn: "My Profile",
          path: "/dashboard/profile",
          icon: User,
        },
      ],
    },
  ],

  teacher: [
    {
      categoryBn: "সারসংক্ষেপ",
      categoryEn: "Overview",
      items: [
        {
          labelBn: "শিক্ষক ড্যাশবোর্ড",
          labelEn: "Teacher Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      categoryBn: "একাডেমিক ও বেতন",
      categoryEn: "Academic & Payroll",
      items: [
        {
          labelBn: "আমার প্রোফাইল",
          labelEn: "My Profile",
          path: "/dashboard/my-profile",
          icon: User,
        },
        {
          labelBn: "নির্ধারিত বিষয় ও জামাত",
          labelEn: "Assigned Subjects",
          path: "/dashboard/my-subjects",
          icon: BookOpen,
        },
        {
          labelBn: "মাসিক বেতন বিবরণী",
          labelEn: "Salary History",
          path: "/dashboard/salary-history",
          icon: DollarSign,
        },
        {
          labelBn: "ফলাফল ও অগ্রগতি ইনপুট",
          labelEn: "Input Student Result",
          path: "/dashboard/input-student-result",
          icon: FileSpreadsheet,
        },
      ],
    },
    {
      categoryBn: "সিস্টেম",
      categoryEn: "System",
      items: [
        {
          labelBn: "নোটিশ বোর্ড",
          labelEn: "Notice Board",
          path: "/dashboard/notifications",
          icon: Bell,
        },
        {
          labelBn: "প্রোফাইল আপডেট",
          labelEn: "Update Profile",
          path: "/dashboard/profile",
          icon: Settings,
        },
      ],
    },
  ],
};

const Sidebar = ({ currentRole = "guardian" }) => {
  const { user, logOut, assignEmailRole } = useAuth();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const roleKey = (currentRole || "guardian").toLowerCase();
  const navGroups = ROLE_NAV_GROUPS[roleKey] || ROLE_NAV_GROUPS.guardian;

  const ROLE_LABELS = {
    admin: t("মুহতামিম / অ্যাডমিন প্যানেল", "Muhtamim / Admin Panel"),
    guardian: t("অভিভাবক পোর্টাল", "Guardian Portal"),
    teacher: t("উস্তাদ / শিক্ষক পোর্টাল", "Teacher Portal"),
  };

  const handleLogout = async () => {
    await logOut();
    navigate("/signin");
  };

  return (
    <aside
      className={`relative flex flex-col h-screen border-r border-slate-200/80 dark:border-purple-900/40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl transition-all duration-300 z-30 select-none print:hidden ${
        collapsed ? "w-20" : "w-64 sm:w-72"
      }`}
    >
      {/* Sidebar Header with Official Logo & Name */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200/80 dark:border-slate-800">
        <Link to="/" className="flex items-center gap-2.5 overflow-hidden">
          <img
            src="/logo.png"
            alt="মারকাযুল ইলমি ওয়াল হুদা"
            className="h-10 w-10 shrink-0 rounded-xl object-contain bg-white p-0.5 border border-primary/25 shadow-sm"
          />
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-xs sm:text-sm tracking-tight text-base-content truncate">
                {t("মারকাযুল ইলমি ওয়াল হুদা", "Markajul Ilm Wal Huda")}
              </span>
              <span className="text-[10px] font-bold text-primary tracking-wide mt-0.5">
                {ROLE_LABELS[roleKey]}
              </span>
            </div>
          )}
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden sm:flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-base-100 hover:bg-base-200 text-base-content/70 hover:text-primary transition cursor-pointer"
          title={collapsed ? t("বড় করুন", "Expand") : t("ছোট করুন", "Collapse")}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Verified Firebase Email & Role Status Box */}
      {!collapsed && user?.email && (
        <div className="px-4 py-3 bg-base-200/60 dark:bg-slate-950/60 border-b border-slate-200/70 dark:border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-base-content/60">
              {t("ফায়ারবেস ইমেইল ও রোল:", "Firebase Email & Role:")}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-primary/15 text-primary font-mono text-[10px] font-bold uppercase">
              {roleKey}
            </span>
          </div>
          <p className="text-[11px] font-mono font-semibold text-base-content/80 truncate">
            {user.email}
          </p>
          {roleKey !== "admin" && (
            <button
              onClick={() =>
                assignEmailRole({
                  email: user.email,
                  role: "admin",
                  name: user.displayName || "Admin",
                  linkedId: "adm-01",
                })
              }
              className="w-full mt-1 py-1 px-2 rounded-lg bg-primary/10 hover:bg-primary hover:text-white text-primary text-[10px] font-bold transition cursor-pointer"
              title={t(
                "ডেভেলপার/মালিক হিসেবে এই ইমেইলকে অ্যাডমিন করুন",
                "Set my current Firebase email as Admin"
              )}
            >
              {t("এই ইমেইলকে অ্যাডমিন (Admin) করুন", "Set My Email as Admin")}
            </button>
          )}
        </div>
      )}

      {/* Categorized Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 custom-scrollbar">
        {navGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            {!collapsed && (
              <div className="px-3 mb-1.5 flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider text-base-content/50">
                  {t(group.categoryBn, group.categoryEn)}
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
                  title={
                    collapsed
                      ? `${t(group.categoryBn, group.categoryEn)}: ${t(item.labelBn, item.labelEn)}`
                      : undefined
                  }
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/25 border border-primary/40"
                      : "text-base-content/75 hover:bg-base-200/80 dark:hover:bg-slate-800/80 hover:text-base-content"
                  } ${collapsed ? "justify-center px-0" : ""}`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-primary"}`} />
                  {!collapsed && <span className="truncate">{t(item.labelBn, item.labelEn)}</span>}
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
                src={user?.photoURL || "/logo.png"}
                alt={user?.displayName || "User"}
                className="h-8 w-8 rounded-lg object-cover border border-primary/30 shrink-0 bg-white"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-base-content truncate">
                  {user?.displayName || t("ব্যবহারকারী", "User")}
                </span>
                <span className="text-[10px] font-bold text-primary truncate">
                  {ROLE_LABELS[roleKey]}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            title={t("লগআউট", "Logout")}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-rose-500 hover:bg-rose-500/10 transition cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
