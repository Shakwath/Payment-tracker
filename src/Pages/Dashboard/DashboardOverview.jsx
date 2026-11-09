import { Link, useOutletContext } from "react-router-dom";
import {
  Users,
  CreditCard,
  Clock,
  TrendingDown,
  Wallet,
  GraduationCap,
  BookOpen,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  FileText,
  Calendar,
  Award,
  Bell,
  ShieldCheck,
} from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import { useMadrasa } from "../../Context/MadrasaContext";
import { useLanguage } from "../../Context/LanguageContext";

const DashboardOverview = () => {
  const context = useOutletContext() || {};
  const { user, role: authRole } = useAuth();
  const { lang, t } = useLanguage();
  const role = context.role || authRole || "admin";

  const {
    selectedMonth,
    setSelectedMonth,
    MONTHS,
    MONTH_LABELS_BN,
    settings,
    students,
    payments,
    teachers,
    salaryPayments,
    studentResults,
    notifications,
    getDashboardMetrics,
  } = useMadrasa();

  const metrics = getDashboardMetrics(selectedMonth);
  const monthLabel =
    lang === "bn" ? MONTH_LABELS_BN[selectedMonth] || selectedMonth : selectedMonth;

  const ROLE_NAMES = {
    admin: t("অ্যাডমিন প্যানেল", "Admin Panel"),
    guardian: t("অভিভাবক পোর্টাল", "Guardian Portal"),
    teacher: t("শিক্ষক পোর্টাল", "Teacher Portal"),
  };

  // Match guardian students by logged-in guardian email or default sample
  const guardianStudents = students.filter(
    (s) =>
      s.guardianEmail?.toLowerCase() === user?.email?.toLowerCase() ||
      s.guardianId === "grd-01"
  );
  const guardianPayments = payments.filter((p) =>
    guardianStudents.some((s) => s._id === p.studentId)
  );
  const guardianResults = studentResults.filter((r) =>
    guardianStudents.some((s) => s._id === r.studentId)
  );

  // Match teacher by logged-in teacher email or default sample
  const currentTeacher =
    teachers.find((tchr) => tchr.email?.toLowerCase() === user?.email?.toLowerCase()) ||
    teachers[0];
  const teacherSalaries = salaryPayments.filter(
    (s) => s.teacherId === currentTeacher?._id
  );

  return (
    <div className="space-y-6">
      {/* Top Banner Overview Box with Official Logo & Name */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary via-purple-700 to-secondary text-white shadow-xl shadow-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt={settings.madrasaName}
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-contain bg-white p-1.5 shadow-lg shrink-0"
            />
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold mb-1.5 backdrop-blur-md">
                <span>مركز العلم والهدى • {ROLE_NAMES[role]}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {t(settings.madrasaName, "Markajul Ilm Wal Huda")}
              </h1>
              <p className="text-xs sm:text-sm text-white/90 mt-0.5">
                {t(
                  "দারুল আনোয়ার, পশ্চিম ফটিকা, হাটহাজারী পৌরসভা, চট্টগ্রাম • মোবাইলঃ ০১৭৪১৫১২০১৮",
                  "Darul Anwar, Paschim Fotika, Hathazari Municipality, Chattogram • Mobile: 01741512018"
                )}
              </p>
            </div>
          </div>

          {/* Month Filter Selector */}
          <div className="flex items-center gap-3 bg-white/15 p-3 rounded-2xl border border-white/25 backdrop-blur-md">
            <Calendar className="h-5 w-5 text-white shrink-0" />
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-white/80 font-bold">
                {t("হিসাবের মাস নির্বাচন করুন", "Select Accounting Month")}
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent text-white font-bold text-sm outline-none cursor-pointer"
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m} className="text-slate-900">
                    {lang === "bn" ? MONTH_LABELS_BN[m] || m : m}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          ADMIN DASHBOARD VIEW (SRS 4.6)
         ===================================================================== */}
      {role === "admin" && (
        <>
          {/* Quick Bar for Firebase Email Role Assignment & Manual Payment */}
          <div className="p-4 rounded-2xl border border-primary/25 bg-primary/5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold text-base-content">
                  {t(
                    "ফায়ারবেস ইমেইল রোল নিয়ন্ত্রণ (Guardian / Teacher / Admin)",
                    "Firebase Email Role Control (Guardian / Teacher / Admin)"
                  )}
                </h3>
                <p className="text-[11px] text-base-content/60">
                  {t(
                    "কোন ইমেইল দিয়ে লগইন করলে অভিভাবক বা শিক্ষক পোর্টাল ওপেন হবে তা অ্যাডমিন এখান থেকে নির্ধারণ করতে পারবেন।",
                    "Assign which Firebase email address logs in as Guardian, Teacher, or Admin."
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard/user-roles"
                className="px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:opacity-95 transition"
              >
                {t("ইমেইল ও রোল নির্ধারণ করুন →", "Manage Email Roles →")}
              </Link>
              <Link
                to="/dashboard/students"
                className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm hover:bg-emerald-500 transition"
              >
                {t("+ ম্যানুয়াল মাসিক বেতন আপডেট", "+ Manual Fee Update")}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-base-content/60">
                  {t("মোট সক্রিয় শিক্ষার্থী", "Total Active Students")}
                </span>
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">
                {metrics.totalActiveStudents} {t("জন", "Students")}
              </p>
              <span className="text-[11px] text-base-content/60 font-medium mt-1 inline-block">
                {t(
                  `সর্বমোট ভর্তি: ${students.length} জন শিক্ষার্থী`,
                  `Total Enrolled: ${students.length} Students`
                )}
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-base-content/60">
                  {t(`পরিশোধিত বনাম বকেয়া (${monthLabel})`, `Paid vs Pending (${monthLabel})`)}
                </span>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">
                <span className="text-emerald-500">
                  {metrics.paidStudentsCount} {t("পরিশোধিত", "Paid")}
                </span>
                <span className="text-base-content/30 mx-1.5">/</span>
                <span className="text-amber-500">
                  {metrics.pendingStudentsCount} {t("বকেয়া", "Due")}
                </span>
              </p>
              <span className="text-[11px] text-amber-500 font-bold mt-1 inline-block">
                {t(
                  `${metrics.pendingVerificationQueue.length} টি পেমেন্ট যাচাইয়ের অপেক্ষায়`,
                  `${metrics.pendingVerificationQueue.length} payments awaiting verification`
                )}
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-base-content/60">
                  {t("মোট সম্ভাব্য আদায় (Expected)", "Expected Monthly Collection")}
                </span>
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                  <CreditCard className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">
                ৳ {metrics.expectedCollection.toLocaleString()}
              </p>
              <span className="text-[11px] text-base-content/60 font-medium mt-1 inline-block">
                {t(
                  "সক্রিয় শিক্ষার্থীদের নির্ধারিত মাসিক ফি",
                  "Sum of active students' monthly fees"
                )}
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-base-content/60">
                  {t("মোট ভেরিফাইড আদায় (Verified)", "Total Verified Collection")}
                </span>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <DollarSign className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-2">
                ৳ {metrics.verifiedCollection.toLocaleString()}
              </p>
              <span className="text-[11px] text-emerald-500 font-bold mt-1 inline-block">
                {metrics.expectedCollection > 0
                  ? Math.round((metrics.verifiedCollection / metrics.expectedCollection) * 100)
                  : 0}
                % {t("লক্ষ্যমাত্রা অর্জিত", "of target achieved")}
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-base-content/60">
                  {t("মোট বকেয়া ফি (Pending Dues)", "Total Pending Dues")}
                </span>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-amber-500 mt-2">
                ৳ {metrics.pendingAmount.toLocaleString()}
              </p>
              <span className="text-[11px] text-amber-500 font-bold mt-1 inline-block">
                {t("সম্ভাব্য আদায় বিয়োগ ভেরিফাইড আদায়", "Expected minus verified collection")}
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-base-content/60">
                  {t("মাসিক মোট ব্যয় (Expenses)", "Total Monthly Expenses")}
                </span>
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500">
                  <TrendingDown className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-rose-500 mt-2">
                ৳ {metrics.totalMonthlyExpenses.toLocaleString()}
              </p>
              <span className="text-[11px] text-base-content/60 font-medium mt-1 inline-block">
                {metrics.monthExpenses.length}{" "}
                {t("টি ব্যয়ের ভাউচার এন্ট্রি", "expense vouchers recorded")}
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-base-content/60">
                  {t("বর্তমান নিট ব্যালেন্স (Net Balance)", "Current Net Balance")}
                </span>
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Wallet className="h-4 w-4" />
                </div>
              </div>
              <p
                className={`text-2xl font-black mt-2 ${
                  metrics.netBalance >= 0 ? "text-primary" : "text-rose-500"
                }`}
              >
                ৳ {metrics.netBalance.toLocaleString()}
              </p>
              <span className="text-[11px] text-base-content/60 mt-1 inline-block">
                {t("ভেরিফাইড আদায় - মাসিক ব্যয়", "Verified Collection - Monthly Expenses")}
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-base-content/60">
                  {t(`শিক্ষক বেতন (${monthLabel})`, `Teacher Salaries (${monthLabel})`)}
                </span>
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
                  <GraduationCap className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">
                ৳ {metrics.totalSalaryDue.toLocaleString()}{" "}
                <span className="text-xs text-amber-500">{t("বকেয়া", "Due")}</span>
              </p>
              <span className="text-[11px] text-emerald-500 font-bold mt-1 inline-block">
                {t("পরিশোধিত", "Paid")}: ৳{metrics.totalSalaryPaid.toLocaleString()} (
                {metrics.paidTeachersCount}/{metrics.activeTeachersCount}{" "}
                {t("জন শিক্ষক", "Teachers")})
              </span>
            </div>
          </div>

          {/* Middle Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
                  <div>
                    <h3 className="text-base font-bold text-base-content">
                      {t("পেমেন্ট মাধ্যম অনুযায়ী আদায়", "Collection by Payment Method")}
                    </h3>
                    <p className="text-xs text-base-content/60">
                      {t(
                        `${monthLabel} মাসের ভেরিফাইড কালেকশন`,
                        `Verified collection for ${monthLabel}`
                      )}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-primary/10 text-primary">
                    {t("৪ টি মাধ্যম", "4 Channels")}
                  </span>
                </div>

                <div className="space-y-4">
                  {metrics.methodBreakdown.map((item) => {
                    const pct =
                      metrics.verifiedCollection > 0
                        ? Math.round((item.total / metrics.verifiedCollection) * 100)
                        : 0;
                    const colors = {
                      bKash: "bg-pink-500",
                      Nagad: "bg-orange-500",
                      Bank: "bg-blue-600",
                      Offline: "bg-emerald-600",
                    };
                    const methodLabel = {
                      bKash: t("বিকাশ (bKash)", "bKash"),
                      Nagad: t("নগদ (Nagad)", "Nagad"),
                      Bank: t("ব্যাংক (Bank)", "Bank Deposit"),
                      Offline: t("অফিস ক্যাশ (Offline)", "Office Cash (Offline)"),
                    };
                    return (
                      <div key={item.method} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="flex items-center gap-2">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${
                                colors[item.method] || "bg-primary"
                              }`}
                            />
                            {methodLabel[item.method] || item.method} ({item.count})
                          </span>
                          <span className="font-mono">
                            ৳ {item.total.toLocaleString()} ({pct}%)
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              colors[item.method] || "bg-primary"
                            }`}
                            style={{ width: `${Math.max(pct, 4)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <Link
                  to="/dashboard/reports"
                  className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>{t("মাসিক PDF রিপোর্ট ডাউনলোড", "Download Monthly PDF Report")}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/dashboard/payments"
                  className="text-xs font-bold px-3 py-1.5 rounded-xl bg-primary text-white hover:opacity-90 transition"
                >
                  {t("+ ম্যানুয়াল পেমেন্ট ও রশিদ", "+ Manual Payment & Receipt")}
                </Link>
              </div>
            </div>

            {/* Pending Verification Queue */}
            <div className="lg:col-span-7 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
                <div>
                  <h3 className="text-base font-bold text-base-content">
                    {t(
                      `পেন্ডিং পেমেন্ট ভেরিফিকেশন কিউ (${metrics.pendingVerificationQueue.length})`,
                      `Pending Payment Verification Queue (${metrics.pendingVerificationQueue.length})`
                    )}
                  </h3>
                  <p className="text-xs text-base-content/60">
                    {t(
                      "অভিভাবকদের পাঠানো অনলাইন ও অফলাইন পেমেন্ট যাচাই ও অনুমোদন করুন",
                      "Verify and approve guardian-submitted online and offline fee payments"
                    )}
                  </p>
                </div>
                <Link
                  to="/dashboard/pending-verification"
                  className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-white transition"
                >
                  {t("সকল পেন্ডিং যাচাই →", "Verify All →")}
                </Link>
              </div>

              {metrics.pendingVerificationQueue.length === 0 ? (
                <div className="py-10 text-center text-sm text-base-content/50">
                  {t(
                    "আলহামদুলিল্লাহ! সকল পেন্ডিং পেমেন্ট যাচাই সম্পন্ন হয়েছে।",
                    "All pending payments have been verified!"
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {metrics.pendingVerificationQueue.slice(0, 4).map((p) => (
                    <div
                      key={p._id}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-lg font-mono font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                          {p.method}
                        </span>
                        <div>
                          <p className="font-bold text-base-content">
                            {p.studentName}{" "}
                            <span className="font-mono text-[10px] text-base-content/50">
                              ({p.admissionId})
                            </span>
                          </p>
                          <p className="text-[11px] text-base-content/60">
                            {lang === "bn" ? MONTH_LABELS_BN[p.month] || p.month : p.month} •
                            TrxID: {p.transactionId} • {t("অভিভাবক", "Guardian")}:{" "}
                            {p.guardianName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-extrabold text-sm text-base-content">
                          ৳ {p.amount.toLocaleString()}
                        </span>
                        <Link
                          to="/dashboard/pending-verification"
                          className="px-3 py-1.5 rounded-xl bg-primary text-white font-bold hover:opacity-90"
                        >
                          {t("যাচাই করুন", "Verify")}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* =====================================================================
          GUARDIAN DASHBOARD VIEW
         ===================================================================== */}
      {role === "guardian" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-base-content/60">
                  {t("আমার সন্তান সংখ্যা", "My Children")}
                </span>
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">
                {guardianStudents.length} {t("জন শিক্ষার্থী", "Students")}
              </p>
              <span className="text-[11px] text-primary font-bold mt-1 inline-block">
                {guardianStudents.map((s) => s.name).join(" • ")}
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-base-content/60">
                  {t("মাসিক নির্ধারিত মোট ফি", "Total Monthly Fee")}
                </span>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <CreditCard className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">
                ৳{" "}
                {guardianStudents
                  .reduce((sum, s) => sum + Number(s.monthlyFee || 0), 0)
                  .toLocaleString()}
              </p>
              <span className="text-[11px] text-base-content/60 mt-1 inline-block">
                {t(
                  `প্রতি মাসের ${settings.dueDateDay} তারিখের মধ্যে পরিশোধযোগ্য`,
                  `Payable by day ${settings.dueDateDay} of each month`
                )}
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-base-content/60">
                  {t("ভেরিফাইড রশিদসমূহ", "Verified Receipts")}
                </span>
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
                  <FileText className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">
                {guardianPayments.filter((p) => p.status === "Verified").length}{" "}
                {t("টি রশিদ", "Receipts")}
              </p>
              <Link
                to="/dashboard/receipts"
                className="text-[11px] text-primary font-bold mt-1 inline-block hover:underline"
              >
                {t("ছাপানো রশিদ দেখুন ও ডাউনলোড করুন →", "View & Print Madrasa Receipts →")}
              </Link>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-base-content/60">
                  {t("ফলাফল ও অগ্রগতি", "Results & Progress")}
                </span>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                  <Award className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">
                {guardianResults.length} {t("টি প্রতিবেদন", "Reports")}
              </p>
              <Link
                to="/dashboard/my-students"
                className="text-[11px] text-emerald-500 font-bold mt-1 inline-block hover:underline"
              >
                {t("মাসিক ফলাফল দেখুন →", "View Monthly Results →")}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
                <div>
                  <h3 className="text-base font-bold text-base-content">
                    {t(
                      `আমার সন্তানদের ফি স্ট্যাটাস (${monthLabel})`,
                      `My Children's Fee Status (${monthLabel})`
                    )}
                  </h3>
                  <p className="text-xs text-base-content/60">
                    {t(
                      "মাসিক বেতন পরিশোধ ও রিয়েল-টাইম স্ট্যাটাস",
                      "Monthly tuition payment and real-time verification status"
                    )}
                  </p>
                </div>
                <Link
                  to="/dashboard/pay-fees"
                  className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold"
                >
                  {t("ফি পরিশোধ করুন", "Pay Fees")}
                </Link>
              </div>
              <div className="space-y-3">
                {guardianStudents.map((stu) => {
                  const monthPay = guardianPayments.find(
                    (p) => p.studentId === stu._id && p.month === selectedMonth
                  );
                  return (
                    <div
                      key={stu._id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={stu.photoURL}
                          alt={stu.name}
                          className="h-11 w-11 rounded-xl bg-primary/10 object-cover"
                        />
                        <div>
                          <p className="font-bold text-sm text-base-content">{stu.name}</p>
                          <p className="text-xs text-base-content/60">
                            {stu.admissionId} • {stu.classProgram}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-bold text-sm">
                          ৳ {stu.monthlyFee.toLocaleString()}/{t("মাস", "mo")}
                        </p>
                        <span
                          className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            monthPay?.status === "Verified"
                              ? "bg-emerald-500/15 text-emerald-500"
                              : monthPay?.status === "Pending"
                              ? "bg-amber-500/15 text-amber-500"
                              : "bg-rose-500/15 text-rose-500"
                          }`}
                        >
                          {monthPay?.status === "Verified"
                            ? t("পরিশোধিত (Verified)", "Verified")
                            : monthPay?.status === "Pending"
                            ? t("যাচাইয়ের অপেক্ষায় (Pending)", "Pending Verification")
                            : t("অপরিশোধিত (Unpaid)", "Unpaid")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
                <div>
                  <h3 className="text-base font-bold text-base-content">
                    {t(
                      "সন্তানের ফলাফল ও মাসিক অগ্রগতির প্রতিবেদন",
                      "Academic Results & Monthly Progress Reports"
                    )}
                  </h3>
                  <p className="text-xs text-base-content/60">
                    {t("উস্তাযগণের মূল্যায়ন ও মন্তব্য", "Teacher evaluations and remarks")}
                  </p>
                </div>
                <Link
                  to="/dashboard/my-students"
                  className="text-xs font-bold text-primary hover:underline"
                >
                  {t("বিস্তারিত →", "Details →")}
                </Link>
              </div>
              <div className="space-y-3">
                {guardianResults.map((res) => (
                  <div
                    key={res._id}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 space-y-1.5"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm text-base-content">
                        {res.studentName} — {res.subject}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-500 font-mono text-xs font-bold">
                        {res.marksObtained}/{res.totalMarks} ({res.grade})
                      </span>
                    </div>
                    <p className="text-xs text-base-content/80 italic">
                      &ldquo;{res.monthlyProgressReport}&rdquo;
                    </p>
                    <p className="text-[10px] text-base-content/50">
                      {t("উপস্থিতি", "Attendance")}: {res.attendancePercent}% •{" "}
                      {t("উস্তায", "Teacher")}: {res.teacherName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* =====================================================================
          TEACHER DASHBOARD VIEW
         ===================================================================== */}
      {role === "teacher" && currentTeacher && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-base-content/60">
                  {t("নির্ধারিত বিষয়সমূহ", "Assigned Subjects")}
                </span>
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">
                {currentTeacher.subjects.length} {t("টি কিতাব/বিষয়", "Subjects")}
              </p>
              <span className="text-[11px] text-primary font-bold mt-1 inline-block truncate max-w-full">
                {currentTeacher.subjects.join(", ")}
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-base-content/60">
                  {t("নির্ধারিত মাসিক বেতন/হাদিয়া", "Fixed Monthly Salary")}
                </span>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <DollarSign className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">
                ৳ {currentTeacher.fixedSalary.toLocaleString()}
              </p>
              <span className="text-[11px] text-emerald-500 font-bold mt-1 inline-block">
                {t("আইডি", "ID")}: {currentTeacher.teacherId}
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-base-content/60">
                  {t(`${monthLabel} মাসের বেতন স্ট্যাটাস`, `${monthLabel} Salary Status`)}
                </span>
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">
                {teacherSalaries.some((s) => s.month === selectedMonth)
                  ? t("পরিশোধিত (Paid)", "Paid")
                  : t("বকেয়া (Pending)", "Pending")}
              </p>
              <Link
                to="/dashboard/salary-history"
                className="text-[11px] text-primary font-bold mt-1 inline-block hover:underline"
              >
                {t("বেতন বিবরণী দেখুন →", "View Salary History →")}
              </Link>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-base-content/60">
                  {t("শিক্ষার্থী মূল্যায়ন", "Student Evaluations")}
                </span>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                  <AlertCircle className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">
                {studentResults.length} {t("টি ফলাফল", "Reports")}
              </p>
              <Link
                to="/dashboard/input-student-result"
                className="text-[11px] text-amber-500 font-bold mt-1 inline-block hover:underline"
              >
                {t("+ নতুন ফলাফল ইনপুট দিন →", "+ Input Student Result →")}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <h3 className="text-base font-bold text-base-content pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
                {t("আমার মাসিক বেতন/হাদিয়া গ্রহণের বিবরণী", "My Monthly Salary History")}
              </h3>
              <div className="space-y-3">
                {teacherSalaries.map((sal) => (
                  <div
                    key={sal._id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-bold text-base-content">
                        {lang === "bn" ? MONTH_LABELS_BN[sal.month] || sal.month : sal.month}
                      </p>
                      <p className="text-[11px] text-base-content/60">
                        {t("মাধ্যম", "Method")}: {sal.method} • {t("রেফারেন্স", "Ref")}:{" "}
                        {sal.reference} • {t("তারিখ", "Date")}: {sal.paidDate}
                      </p>
                    </div>
                    <span className="font-mono font-bold text-emerald-500">
                      ৳ {sal.amount.toLocaleString()} ({t("পরিশোধিত", "Paid")})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
                <h3 className="text-base font-bold text-base-content">
                  {t("মাদ্রাসার অফিশিয়াল নোটিশ", "Official Madrasa Notices")}
                </h3>
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-3">
                {notifications
                  .filter((n) => n.recipientRole === "all" || n.recipientRole === "teacher")
                  .map((n) => (
                    <div
                      key={n._id}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 space-y-1"
                    >
                      <p className="text-xs font-bold text-base-content">{n.title}</p>
                      <p className="text-xs text-base-content/70">{n.message}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardOverview;
