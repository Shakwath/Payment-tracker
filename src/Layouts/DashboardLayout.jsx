import { useState, useEffect } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar";
import useAuth from "../Hooks/useAuth";
import { useMadrasa } from "../Context/MadrasaContext";
import { useLanguage } from "../Context/LanguageContext";
import {
  Bell,
  Sun,
  Moon,
  ChevronRight,
  Shield,
  UserCheck,
  GraduationCap,
  Globe,
} from "lucide-react";

const ROUTE_TITLES = {
  dashboard: { bn: "ড্যাশবোর্ড ওভারভিউ", en: "Dashboard Overview" },
  "user-roles": { bn: "ফায়ারবেস ইমেইল ও রোল নির্ধারণ", en: "Email Role Control" },
  students: { bn: "শিক্ষার্থী ব্যবস্থাপনা", en: "Students Management" },
  guardians: { bn: "অভিভাবক তালিকা", en: "Guardians Directory" },
  semesters: { bn: "সেমিস্টার ও ফলাফল", en: "Semesters & Results" },
  "fee-management": { bn: "ফি নির্ধারণ", en: "Fee Configuration" },
  payments: { bn: "সকল পেমেন্ট ও ম্যানুয়াল আপডেট", en: "Payments & Manual Edit" },
  "pending-verification": { bn: "পেন্ডিং পেমেন্ট যাচাই", en: "Pending Verification" },
  expenses: { bn: "মাসিক ব্যয় ব্যবস্থাপনা", en: "Expense Management" },
  teachers: { bn: "শিক্ষক মণ্ডলী", en: "Teachers Directory" },
  "teacher-salaries": { bn: "শিক্ষক বেতন ও হাদিয়া", en: "Teacher Salaries" },
  reports: { bn: "আর্থিক প্রতিবেদন ও PDF", en: "Financial Reports & PDF" },
  "audit-logs": { bn: "অডিট লগ", en: "Audit Logs" },
  settings: { bn: "মাদ্রাসা সেটিংস", en: "System Settings" },
  "my-students": { bn: "আমার সন্তান ও ফলাফল", en: "My Students & Results" },
  "pay-fees": { bn: "মাসিক ফি পরিশোধ", en: "Pay Monthly Fee" },
  "payment-history": { bn: "পেমেন্ট হিস্ট্রি", en: "Payment History" },
  receipts: { bn: "ডাউনলোড রশিদ", en: "Official Receipts" },
  profile: { bn: "প্রোফাইল", en: "Profile" },
  "my-profile": { bn: "আমার শিক্ষক প্রোফাইল", en: "My Teacher Profile" },
  "my-subjects": { bn: "নির্ধারিত বিষয় ও জামাত", en: "Assigned Subjects" },
  "salary-history": { bn: "মাসিক বেতন বিবরণী", en: "Salary History" },
  "input-student-result": { bn: "ফলাফল ও অগ্রগতি ইনপুট", en: "Input Student Result" },
  notifications: { bn: "নোটিশ ও নোটিফিকেশন", en: "Notifications" },
};

const DashboardLayout = () => {
  const { user, role, setRole } = useAuth();
  const { notifications } = useMadrasa();
  const { lang, toggleLang, t } = useLanguage();
  const location = useLocation();

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

  const pathParts = location.pathname.split("/").filter(Boolean);
  const lastSegment = pathParts[pathParts.length - 1] || "dashboard";
  const currentTitleObj = ROUTE_TITLES[lastSegment];
  const currentTitle = currentTitleObj
    ? t(currentTitleObj.bn, currentTitleObj.en)
    : lastSegment;

  const roleIcons = {
    admin: Shield,
    guardian: UserCheck,
    teacher: GraduationCap,
  };
  const ActiveRoleIcon = roleIcons[role] || Shield;

  const ROLE_BADGE = {
    admin: t("অ্যাডমিন পোর্টাল", "Admin Portal"),
    guardian: t("অভিভাবক পোর্টাল", "Guardian Portal"),
    teacher: t("শিক্ষক পোর্টাল", "Teacher Portal"),
  };

  const unreadCount = notifications.filter(
    (n) => !n.read && (role === "admin" || n.recipientRole === "all" || n.recipientRole === role)
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-base-content flex overflow-hidden transition-colors duration-300 font-sans">
      {/* Unified Dynamic Role-Based Sidebar */}
      <Sidebar currentRole={role} />

      {/* Main Dashboard Canvas Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Sticky Top Header Bar */}
        <header className="sticky top-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between gap-4 print:hidden">
          {/* Breadcrumbs & Route Title */}
          <div className="flex items-center gap-2 overflow-hidden">
            <Link
              to="/dashboard"
              className="text-xs font-bold text-base-content/60 hover:text-primary transition"
            >
              {t("ড্যাশবোর্ড", "Dashboard")}
            </Link>
            {pathParts.length > 1 && (
              <>
                <ChevronRight className="h-3.5 w-3.5 text-base-content/40" />
                <span className="text-xs font-bold text-primary truncate">
                  {currentTitle}
                </span>
              </>
            )}
          </div>

          {/* Right Header Action Items */}
          <div className="flex items-center gap-2.5">
            {/* Bilingual Toggle Button (বাংলা / EN) */}
            <button
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary/30 bg-primary/10 text-primary text-xs font-bold hover:bg-primary hover:text-white transition cursor-pointer"
              title="Change Language / ভাষা পরিবর্তন করুন"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{lang === "bn" ? "EN" : "বাংলা"}</span>
            </button>

            {/* Active Role Indicator Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
              <ActiveRoleIcon className="h-3.5 w-3.5" />
              <span>{ROLE_BADGE[role] || ROLE_BADGE.guardian}</span>
            </div>

            {/* Notification Bell Icon */}
            <Link
              to="/dashboard/notifications"
              className="relative p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-base-100 hover:bg-base-200 text-base-content/70 hover:text-primary transition"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <>
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary animate-ping" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
                </>
              )}
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-base-100 hover:bg-base-200 text-base-content/70 hover:text-primary transition cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            {/* User Avatar Circle */}
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-3"
            >
              <img
                src={user?.photoURL || "/logo.png"}
                alt="User"
                className="h-8 w-8 rounded-lg object-cover ring-2 ring-primary/20 bg-white"
              />
            </Link>
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
