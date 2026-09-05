import { useOutletContext, useLocation } from "react-router-dom";
import {
  Users,
  CreditCard,
  Clock,
  Shield,
  UserCheck,
  GraduationCap,
  BookOpen,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  TrendingUp,
  PieChart as PieIcon,
  BarChart3,
  Award,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// ================= ADMIN ROLE DATASETS =================
const ADMIN_REVENUE_TREND_DATA = [
  { month: "Oct", collected: 280000, target: 320000, expenses: 65000 },
  { month: "Nov", collected: 310000, target: 330000, expenses: 70000 },
  { month: "Dec", collected: 345000, target: 350000, expenses: 82000 },
  { month: "Jan", collected: 390000, target: 400000, expenses: 75000 },
  { month: "Feb", collected: 420000, target: 450000, expenses: 88000 },
  { month: "Mar", collected: 342800, target: 450000, expenses: 59400 },
];

const ADMIN_CLASS_DUES_DATA = [
  { class: "Grade 10", collected: 145000, dues: 12000 },
  { class: "Grade 9", collected: 120000, dues: 24000 },
  { class: "Grade 8", collected: 98000, dues: 8000 },
  { class: "Grade 7", collected: 85000, dues: 15000 },
];

const ADMIN_PAYMENT_METHODS_DATA = [
  { name: "bKash Direct", value: 58, color: "#e2136e" },
  { name: "Nagad Mobile", value: 24, color: "#f7931e" },
  { name: "Card Payment", value: 12, color: "#6366f1" },
  { name: "Cash Deposit", value: 6, color: "#10b981" },
];

// ================= GUARDIAN ROLE DATASETS =================
const GUARDIAN_PAYMENTS_TREND = [
  { month: "Oct", arif: 4500, nusrat: 4500 },
  { month: "Nov", arif: 4500, nusrat: 4500 },
  { month: "Dec", arif: 4500, nusrat: 4500 },
  { month: "Jan", arif: 4500, nusrat: 4500 },
  { month: "Feb", arif: 4500, nusrat: 4500 },
  { month: "Mar", arif: 4500, nusrat: 0 },
];

const GUARDIAN_FEE_SPLIT = [
  { name: "Tuition Fees Paid", value: 85, color: "#10b981" },
  { name: "Exam & Lab Fees", value: 10, color: "#6366f1" },
  { name: "Pending March Due", value: 5, color: "#f43f5e" },
];

const GUARDIAN_TERM_PROGRESS = [
  { term: "Spring 2025", arifPaid: 27000, nusratPaid: 27000 },
  { term: "Fall 2025", arifPaid: 27000, nusratPaid: 27000 },
  { term: "Spring 2026", arifPaid: 13500, nusratPaid: 9000 },
];

// ================= TEACHER ROLE DATASETS =================
const TEACHER_PERFORMANCE_DATA = [
  { class: "Grade 10 Math", avgScore: 88, attendance: 96 },
  { class: "Grade 9 Math", avgScore: 82, attendance: 94 },
  { class: "Grade 8 Science", avgScore: 79, attendance: 98 },
];

const TEACHER_SALARY_TREND = [
  { month: "Oct", baseSalary: 45000, bonus: 1500 },
  { month: "Nov", baseSalary: 45000, bonus: 2000 },
  { month: "Dec", baseSalary: 45000, bonus: 2500 },
  { month: "Jan", baseSalary: 45000, bonus: 1800 },
  { month: "Feb", baseSalary: 45000, bonus: 2000 },
  { month: "Mar", baseSalary: 45000, bonus: 3000 },
];

const TEACHER_GRADING_STATUS = [
  { name: "Evaluated Papers", value: 82, color: "#10b981" },
  { name: "Pending Evaluation", value: 18, color: "#f59e0b" },
];

const DashboardOverview = () => {
  const context = useOutletContext() || {};
  const role = (context.role || "admin").toLowerCase();
  const location = useLocation();

  // Format path title
  const pathParts = location.pathname.split("/").filter(Boolean);
  const pageTitle =
    pathParts.length > 1
      ? pathParts[pathParts.length - 1]
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase())
      : "Dashboard Overview";

  return (
    <div className="space-y-6">
      
      {/* Top Banner Overview Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary via-purple-600 to-secondary text-white shadow-xl shadow-primary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-mono font-bold uppercase mb-3 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Active Portal: {role.toUpperCase()}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {pageTitle}
            </h1>
            <p className="text-sm text-white/80 mt-1 max-w-xl">
              Welcome back to your PaymentTrack {role} console. Monitor metrics, dynamic role-tailored analytics charts, and live ledger feeds.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-2xl border border-white/20 backdrop-blur-md">
            {role === "admin" && <Shield className="h-8 w-8 text-white" />}
            {role === "guardian" && <UserCheck className="h-8 w-8 text-white" />}
            {role === "teacher" && <GraduationCap className="h-8 w-8 text-white" />}
          </div>
        </div>
      </div>

      {/* Metric Cards - Dynamically rendered based on Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {role === "admin" && (
          <>
            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-bold uppercase text-base-content/60">Total Students</span>
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">1,248</p>
              <span className="text-[11px] text-emerald-500 font-bold mt-1 inline-block">+12% this term</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-bold uppercase text-base-content/60">Fee Collections</span>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <CreditCard className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">৳ 342,800</p>
              <span className="text-[11px] text-emerald-500 font-bold mt-1 inline-block">88% Target Reached</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-bold uppercase text-base-content/60">Pending Dues</span>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">44</p>
              <span className="text-[11px] text-amber-500 font-bold mt-1 inline-block">Verification needed</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-bold uppercase text-base-content/60">Teachers Dues</span>
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
                  <DollarSign className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">৳ 85,000</p>
              <span className="text-[11px] text-emerald-500 font-bold mt-1 inline-block">Scheduled for 5th</span>
            </div>
          </>
        )}

        {role === "guardian" && (
          <>
            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-bold uppercase text-base-content/60">My Children</span>
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">2 Students</p>
              <span className="text-[11px] text-primary font-bold mt-1 inline-block">Arif & Nusrat</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-bold uppercase text-base-content/60">Outstanding Dues</span>
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500">
                  <CreditCard className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-rose-500 mt-2">৳ 4,500</p>
              <span className="text-[11px] text-amber-500 font-bold mt-1 inline-block">Nusrat (Grade 10)</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-bold uppercase text-base-content/60">Next Due Date</span>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xl font-bold text-base-content mt-2">March 10, 2026</p>
              <span className="text-[11px] text-base-content/60 mt-1 inline-block">Tuition Fee Entry</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-bold uppercase text-base-content/60">Receipts Available</span>
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">12 Receipts</p>
              <span className="text-[11px] text-emerald-500 font-bold mt-1 inline-block">Verified SSL Logs</span>
            </div>
          </>
        )}

        {role === "teacher" && (
          <>
            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-bold uppercase text-base-content/60">Assigned Classes</span>
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">3 Classes</p>
              <span className="text-[11px] text-primary font-bold mt-1 inline-block">Grade 10, 9 & 8</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-bold uppercase text-base-content/60">Monthly Salary</span>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <DollarSign className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">৳ 45,000</p>
              <span className="text-[11px] text-emerald-500 font-bold mt-1 inline-block">+৳ 3,000 March Bonus</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-bold uppercase text-base-content/60">Pending Evaluation</span>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                  <AlertCircle className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">1 Class</p>
              <span className="text-[11px] text-amber-500 font-bold mt-1 inline-block">Grade 9 Mid-Term</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-bold uppercase text-base-content/60">Avg Attendance</span>
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">96%</p>
              <span className="text-[11px] text-emerald-500 font-bold mt-1 inline-block">High Student Engagement</span>
            </div>
          </>
        )}
      </div>

      {/* DYNAMIC ROLE-BASED CHARTS & GRAPHS SECTION */}
      
      {/* 1. ADMIN ROLE CHARTS */}
      {role === "admin" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Trend Area Chart */}
            <div className="lg:col-span-2 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-base-content flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" /> Institution Fee Revenue & Expense Trend (৳)
                  </h3>
                  <p className="text-xs text-base-content/60">Monthly ledger breakdown comparing collections vs expenses</p>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  ADMIN CONSOLE
                </span>
              </div>

              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ADMIN_REVENUE_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `৳${v / 1000}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#334155",
                        borderRadius: "16px",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                      formatter={(value) => [`৳ ${Number(value).toLocaleString()}`, ""]}
                    />
                    <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                    <Area type="monotone" dataKey="collected" name="Fee Collection" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCollected)" />
                    <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Payment Gateways Pie Chart */}
            <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-extrabold text-base-content flex items-center gap-2">
                    <PieIcon className="h-4 w-4 text-secondary" /> Gateway Share
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                    CHANNELS
                  </span>
                </div>
                <p className="text-xs text-base-content/60">Share of fee deposits per channel</p>
              </div>

              <div className="h-56 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ADMIN_PAYMENT_METHODS_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {ADMIN_PAYMENT_METHODS_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#334155",
                        borderRadius: "12px",
                        color: "#fff",
                        fontSize: "11px",
                      }}
                      formatter={(val) => [`${val}%`, "Share"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-black text-base-content font-mono">100%</span>
                  <span className="text-[10px] font-mono text-base-content/50 uppercase">Verified</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200 dark:border-slate-800">
                {ADMIN_PAYMENT_METHODS_DATA.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-base-content/70 truncate text-[11px]">{item.name}: <strong className="text-base-content">{item.value}%</strong></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Class-wise Bar Chart */}
          <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-base-content flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-emerald-500" /> Class-wise Fee Collection vs Outstanding Dues (৳)
                </h3>
                <p className="text-xs text-base-content/60">Breakdown of collected fees compared against pending dues per grade</p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">
                GRADE ANALYSIS
              </span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ADMIN_CLASS_DUES_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="class" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `৳${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "16px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                    formatter={(val) => [`৳ ${Number(val).toLocaleString()}`, ""]}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                  <Bar dataKey="collected" name="Collected Fee" fill="#10b981" radius={[8, 8, 0, 0]} barSize={32} />
                  <Bar dataKey="dues" name="Pending Dues" fill="#f43f5e" radius={[8, 8, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* 2. GUARDIAN ROLE CHARTS */}
      {role === "guardian" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Child Payment History Bar Chart */}
            <div className="lg:col-span-2 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-base-content flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-primary" /> Tuition Payment History per Child (৳)
                  </h3>
                  <p className="text-xs text-base-content/60">Monthly tuition fees paid for Arif Rahman & Nusrat Jahan</p>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">
                  FAMILY LEDGER
                </span>
              </div>

              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={GUARDIAN_PAYMENTS_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `৳${v}`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#334155",
                        borderRadius: "16px",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                      formatter={(val) => [`৳ ${Number(val).toLocaleString()}`, ""]}
                    />
                    <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                    <Bar dataKey="arif" name="Arif Rahman (Grade 10)" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={24} />
                    <Bar dataKey="nusrat" name="Nusrat Jahan (Grade 10)" fill="#ec4899" radius={[6, 6, 0, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Fee Breakdown Pie Chart */}
            <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-extrabold text-base-content flex items-center gap-2">
                    <PieIcon className="h-4 w-4 text-emerald-500" /> Fee Allocation
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                    STATUS
                  </span>
                </div>
                <p className="text-xs text-base-content/60">Family tuition status split</p>
              </div>

              <div className="h-56 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={GUARDIAN_FEE_SPLIT}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {GUARDIAN_FEE_SPLIT.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#334155",
                        borderRadius: "12px",
                        color: "#fff",
                        fontSize: "11px",
                      }}
                      formatter={(val) => [`${val}%`, "Share"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 gap-1.5 text-xs pt-2 border-t border-slate-200 dark:border-slate-800">
                {GUARDIAN_FEE_SPLIT.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-base-content/80 text-[11px] font-medium">{item.name}</span>
                    </div>
                    <span className="font-mono font-bold text-base-content text-[11px]">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Semester Term Payment Area Chart */}
          <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-base-content flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-500" /> Term-by-Term Tuition Paid (৳)
                </h3>
                <p className="text-xs text-base-content/60">Historical semester fee payments</p>
              </div>
            </div>

            <div className="h-60 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={GUARDIAN_TERM_PROGRESS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorArif" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="term" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `৳${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "16px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                    formatter={(val) => [`৳ ${Number(val).toLocaleString()}`, ""]}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                  <Area type="monotone" dataKey="arifPaid" name="Arif Rahman" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorArif)" />
                  <Area type="monotone" dataKey="nusratPaid" name="Nusrat Jahan" stroke="#ec4899" strokeWidth={2} fillOpacity={0.2} fill="#ec4899" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* 3. TEACHER ROLE CHARTS */}
      {role === "teacher" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Class Performance & Attendance Bar Chart */}
            <div className="lg:col-span-2 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-base-content flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" /> Class Performance & Student Attendance (%)
                  </h3>
                  <p className="text-xs text-base-content/60">Average test scores vs student attendance across your assigned classes</p>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">
                  TEACHER HUB
                </span>
              </div>

              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={TEACHER_PERFORMANCE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="class" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#334155",
                        borderRadius: "16px",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                      formatter={(val) => [`${val}%`, ""]}
                    />
                    <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                    <Bar dataKey="avgScore" name="Avg Test Score" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={28} />
                    <Bar dataKey="attendance" name="Attendance Rate" fill="#10b981" radius={[6, 6, 0, 0]} barSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Result Evaluation Status Pie Chart */}
            <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-extrabold text-base-content flex items-center gap-2">
                    <PieIcon className="h-4 w-4 text-emerald-500" /> Exam Grading Progress
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                    EVALUATION
                  </span>
                </div>
                <p className="text-xs text-base-content/60">Answer sheet evaluation status</p>
              </div>

              <div className="h-56 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={TEACHER_GRADING_STATUS}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {TEACHER_GRADING_STATUS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#334155",
                        borderRadius: "12px",
                        color: "#fff",
                        fontSize: "11px",
                      }}
                      formatter={(val) => [`${val}%`, "Status"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-black text-base-content font-mono">82%</span>
                  <span className="text-[10px] font-mono text-base-content/50 uppercase">Graded</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-1.5 text-xs pt-2 border-t border-slate-200 dark:border-slate-800">
                {TEACHER_GRADING_STATUS.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-base-content/80 text-[11px] font-medium">{item.name}</span>
                    </div>
                    <span className="font-mono font-bold text-base-content text-[11px]">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Faculty Remuneration Area Chart */}
          <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-base-content flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-500" /> Monthly Salary & Performance Bonus Trend (৳)
                </h3>
                <p className="text-xs text-base-content/60">Faculty payout ledger over recent months</p>
              </div>
            </div>

            <div className="h-60 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TEACHER_SALARY_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSalary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `৳${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "16px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                    formatter={(val) => [`৳ ${Number(val).toLocaleString()}`, ""]}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                  <Area type="monotone" dataKey="baseSalary" name="Base Salary" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSalary)" />
                  <Area type="monotone" dataKey="bonus" name="Performance Bonus" stroke="#f59e0b" strokeWidth={2} fillOpacity={0.2} fill="#f59e0b" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* Structured Box Table Log Section */}
      <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
          <div>
            <h3 className="text-base font-bold text-base-content">Recent Activity Stream</h3>
            <p className="text-xs text-base-content/60">Live updates filtered for {role} level access</p>
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/20">
            SYSTEM FEED
          </span>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <p className="font-bold text-base-content">
                  {role === "admin" && "Monthly Fee Collection Sync"}
                  {role === "guardian" && "March Tuition Receipt Issued"}
                  {role === "teacher" && "February Salary Direct Deposited"}
                </p>
                <p className="text-[10px] text-base-content/50 font-mono">
                  {role === "admin" && "bKash Merchant Vault • TRX-88412"}
                  {role === "guardian" && "bKash Direct • Arif Rahman (Grade 10)"}
                  {role === "teacher" && "City Bank • Ref #SAL-601"}
                </p>
              </div>
            </div>
            <span className="font-mono font-bold text-primary">
              {role === "admin" && "৳ 4,500.00"}
              {role === "guardian" && "৳ 4,500.00"}
              {role === "teacher" && "৳ 47,000.00"}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center font-bold">
                ℹ
              </div>
              <div>
                <p className="font-bold text-base-content">
                  {role === "admin" && "Semester Fee Structure Updated"}
                  {role === "guardian" && "Term 2 Exam Schedule Published"}
                  {role === "teacher" && "Grade 10 Higher Math Result Portal Open"}
                </p>
                <p className="text-[10px] text-base-content/50 font-mono">Academic Term 2026-B</p>
              </div>
            </div>
            <span className="font-mono font-bold text-emerald-500">Verified</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardOverview;
