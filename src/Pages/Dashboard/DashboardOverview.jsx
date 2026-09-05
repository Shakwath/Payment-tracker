import { useState, useEffect } from "react";
import { useOutletContext, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Video,
  Play,
  Pause,
  Square,
  Users,
  CreditCard,
  BookOpen,
  DollarSign,
  UserCheck,
  GraduationCap,
  Sparkles,
  Download,
  Calendar,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import toast from "react-hot-toast";

// Mock Chart Datasets for Admin Analytics (Revenue, Expenses & Profit)
const ADMIN_ANALYTICS_DATA = [
  { day: "Sun", collections: 35000, expenses: 14000, profit: 21000 },
  { day: "Mon", collections: 78000, expenses: 22000, profit: 56000 },
  { day: "Tue", collections: 64000, expenses: 19000, profit: 45000 },
  { day: "Wed", collections: 92000, expenses: 28000, profit: 64000 },
  { day: "Thu", collections: 45000, expenses: 16000, profit: 29000 },
  { day: "Fri", collections: 50000, expenses: 18000, profit: 32000 },
  { day: "Sat", collections: 30000, expenses: 11000, profit: 19000 },
];

const ADMIN_RADIAL_DATA = [
  { name: "Completed", value: 88, color: "#9603F8" },
  { name: "In Progress", value: 8, color: "#10b981" },
  { name: "Pending", value: 4, color: "#f43f5e" },
];

// Student Datasets (Monthly Paid vs Due Breakdown)
const STUDENT_ANALYTICS_DATA = [
  { day: "Jan", paid: 4500, due: 0 },
  { day: "Feb", paid: 4500, due: 0 },
  { day: "Mar", paid: 4500, due: 0 },
  { day: "Apr", paid: 0, due: 4500 },
  { day: "May", paid: 0, due: 4500 },
  { day: "Jun", paid: 0, due: 4500 },
];

const STUDENT_RADIAL_DATA = [
  { name: "Paid Fees", value: 85, color: "#10b981" },
  { name: "Next Term", value: 10, color: "#9603F8" },
  { name: "Pending March", value: 5, color: "#f43f5e" },
];

// Teacher Datasets (Attendance % vs Papers Evaluated)
const TEACHER_ANALYTICS_DATA = [
  { day: "Mon", attendance: 96, evaluated: 45 },
  { day: "Tue", attendance: 92, evaluated: 40 },
  { day: "Wed", attendance: 98, evaluated: 48 },
  { day: "Thu", attendance: 90, evaluated: 38 },
  { day: "Fri", attendance: 94, evaluated: 42 },
];

const TEACHER_RADIAL_DATA = [
  { name: "Evaluated", value: 82, color: "#10b981" },
  { name: "In Review", value: 12, color: "#9603F8" },
  { name: "Pending", value: 6, color: "#f59e0b" },
];

// Custom Glassmorphic Tooltip Component
const CustomChartTooltip = ({ active, payload, label, role }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="p-3 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-xl text-white text-xs space-y-2 min-w-[150px]">
      <p className="font-bold text-slate-300 font-mono border-b border-slate-800 pb-1.5 flex items-center justify-between">
        <span>{label}</span>
        <span className="text-[10px] text-purple-400 uppercase font-bold">Analytics</span>
      </p>
      <div className="space-y-1.5 pt-0.5 font-mono">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full inline-block"
                style={{ backgroundColor: entry.color || entry.fill }}
              />
              <span className="text-slate-400 capitalize">{entry.name}:</span>
            </div>
            <span className="font-bold text-white">
              {role === "admin" || (role === "student" && (entry.name === "paid" || entry.name === "due"))
                ? `৳ ${Number(entry.value).toLocaleString()}`
                : `${entry.value}${role === "teacher" && entry.name === "attendance" ? "%" : ""}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Timeframe Metrics Mapping for Day / Week / Month / Year
const TIMEFRAME_METRICS = {
  day: {
    card1: { adminVal: "1,248", studentVal: "Grade 10", teacherVal: "3", badge: "Daily Active Students" },
    card2: { adminVal: "৳ 12.5K", studentVal: "৳ 0.00", teacherVal: "৳ 45K", badge: "Today Collections" },
    card3: { adminVal: "2", studentVal: "10 Apr", teacherVal: "0 Pending", badge: "Daily Approvals" },
    card4: { adminVal: "৳ 85K", studentVal: "12 Logs", teacherVal: "98%", badge: "Daily Attendance" },
    spark1: [{ v: 12 }, { v: 18 }, { v: 14 }, { v: 22 }, { v: 25 }, { v: 30 }],
    spark2: [{ v: 4 }, { v: 8 }, { v: 12 }, { v: 9 }, { v: 18 }, { v: 22 }],
    spark3: [{ v: 8 }, { v: 5 }, { v: 4 }, { v: 3 }, { v: 2 }, { v: 2 }],
    spark4: [{ v: 85 }, { v: 88 }, { v: 92 }, { v: 90 }, { v: 95 }, { v: 98 }],
  },
  week: {
    card1: { adminVal: "1,248", studentVal: "Grade 10", teacherVal: "3", badge: "+14 Enrolled This Week" },
    card2: { adminVal: "৳ 88K", studentVal: "৳ 0.00", teacherVal: "৳ 45K", badge: "Weekly Target Progress" },
    card3: { adminVal: "5", studentVal: "10 Apr", teacherVal: "1 Class", badge: "Weekly Review" },
    card4: { adminVal: "৳ 85K", studentVal: "12 Logs", teacherVal: "96%", badge: "Weekly Avg Attendance" },
    spark1: [{ v: 100 }, { v: 120 }, { v: 140 }, { v: 130 }, { v: 170 }, { v: 200 }],
    spark2: [{ v: 20 }, { v: 35 }, { v: 45 }, { v: 60 }, { v: 75 }, { v: 88 }],
    spark3: [{ v: 12 }, { v: 10 }, { v: 8 }, { v: 7 }, { v: 6 }, { v: 5 }],
    spark4: [{ v: 80 }, { v: 84 }, { v: 87 }, { v: 90 }, { v: 93 }, { v: 96 }],
  },
  month: {
    card1: { adminVal: "1,248", studentVal: "Grade 10", teacherVal: "3", badge: "Increased from last month" },
    card2: { adminVal: "৳ 342K", studentVal: "৳ 0.00", teacherVal: "৳ 45K", badge: "88% Target Reached" },
    card3: { adminVal: "12", studentVal: "10 Apr", teacherVal: "1 Class", badge: "Verification Needed" },
    card4: { adminVal: "৳ 85K", studentVal: "12 Logs", teacherVal: "96%", badge: "Scheduled for 5th" },
    spark1: [{ v: 900 }, { v: 950 }, { v: 1050 }, { v: 1100 }, { v: 1200 }, { v: 1248 }],
    spark2: [{ v: 100 }, { v: 180 }, { v: 220 }, { v: 280 }, { v: 310 }, { v: 342 }],
    spark3: [{ v: 25 }, { v: 20 }, { v: 18 }, { v: 15 }, { v: 14 }, { v: 12 }],
    spark4: [{ v: 60 }, { v: 65 }, { v: 72 }, { v: 78 }, { v: 82 }, { v: 85 }],
  },
  year: {
    card1: { adminVal: "1,248", studentVal: "Grade 10", teacherVal: "3", badge: "+240 Annual Growth" },
    card2: { adminVal: "৳ 4.8M", studentVal: "৳ 0.00", teacherVal: "৳ 540K", badge: "Annual Target Met" },
    card3: { adminVal: "45", studentVal: "10 Apr", teacherVal: "12 Exams", badge: "Annual Audits" },
    card4: { adminVal: "৳ 1.02M", studentVal: "48 Logs", teacherVal: "95%", badge: "Annual Payroll" },
    spark1: [{ v: 500 }, { v: 650 }, { v: 800 }, { v: 950 }, { v: 1100 }, { v: 1248 }],
    spark2: [{ v: 800 }, { v: 1500 }, { v: 2300 }, { v: 3200 }, { v: 4100 }, { v: 4800 }],
    spark3: [{ v: 80 }, { v: 65 }, { v: 50 }, { v: 40 }, { v: 55 }, { v: 45 }],
    spark4: [{ v: 400 }, { v: 550 }, { v: 700 }, { v: 850 }, { v: 950 }, { v: 1020 }],
  },
};

const DashboardOverview = () => {
  const context = useOutletContext() || {};
  const role = (context.role || "admin").toLowerCase();
  const location = useLocation();

  const [chartType, setChartType] = useState("area"); // "area" | "bar"
  const [timeframe, setTimeframe] = useState("month"); // "day" | "week" | "month" | "year"
  const tfData = TIMEFRAME_METRICS[timeframe] || TIMEFRAME_METRICS.month;
  const [seconds, setSeconds] = useState(5048); // 01:24:08
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTimer = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="space-y-6 pb-6 font-sans">
      
      {/* Donezo Style Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-base-content tracking-tight">
            {role === "admin" && "Dashboard"}
            {role === "student" && "Student Portal"}
            {role === "teacher" && "Faculty Portal"}
          </h1>
          <p className="text-xs text-base-content/60 mt-1">
            {role === "admin" && "Plan, monitor, and accomplish school fee management with ease."}
            {role === "student" && "Track tuition fees, make instant payments, view academic status, and download receipts."}
            {role === "teacher" && "Manage assigned classes, student evaluation, and payroll statements."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toast("Opening action...", { icon: "✨" })}
            className="px-5 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>
              {role === "admin" && "Add Record"}
              {role === "student" && "Pay Fees Now"}
              {role === "teacher" && "Input Marks"}
            </span>
          </button>
          <button
            onClick={() => toast.success("Report exported successfully!")}
            className="px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-base-content text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-2 shadow-sm"
          >
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Timeframe Filter Switcher Bar (Day / Week / Month / Year) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase text-base-content/60 pl-2">Timeframe Filter:</span>
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl gap-1">
            {["day", "week", "month", "year"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-200 ${
                  timeframe === tf
                    ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                    : "text-base-content/60 hover:text-base-content hover:bg-slate-200/60 dark:hover:bg-slate-700/50"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-500/10 text-primary text-xs font-mono font-bold self-end sm:self-center mr-2">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>Active View: {timeframe.toUpperCase()} metrics</span>
        </div>
      </div>

      {/* Row 1: 4 Metric Cards with Mini Sparkline Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Solid Vibrant Theme Primary Accent Card */}
        <div className="p-6 rounded-[28px] bg-gradient-to-br from-primary via-purple-600 to-purple-800 text-white shadow-xl shadow-primary/20 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/80">
              {role === "admin" && "Total Students"}
              {role === "student" && "Academic Profile"}
              {role === "teacher" && "Assigned Classes"}
            </span>
            <div className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition cursor-pointer">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div className="my-4 flex items-end justify-between gap-2">
            <div>
              <p className="text-4xl font-black tracking-tight">
                {role === "admin" && tfData.card1.adminVal}
                {role === "student" && tfData.card1.studentVal}
                {role === "teacher" && tfData.card1.teacherVal}
              </p>
            </div>
            {/* Sparkline with smooth horizontal vanishing fade mask */}
            <div
              className="h-10 w-24 shrink-0"
              style={{
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tfData.spark1}>
                  <defs>
                    <linearGradient id="card1Grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#ffffff" strokeWidth={2} fill="url(#card1Grad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/20 text-white text-[11px] font-mono font-bold self-start backdrop-blur-md">
            <TrendingUp className="h-3 w-3" />
            <span>
              {role === "admin" && tfData.card1.badge}
              {role === "student" && "Section A · Roll #101"}
              {role === "teacher" && "Higher Math & Science"}
            </span>
          </div>
        </div>

        {/* Card 2: Fee Collections */}
        <div className="p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-base-content/60">
              {role === "admin" && "Fee Collections"}
              {role === "student" && "Tuition Dues"}
              {role === "teacher" && "Last Salary"}
            </span>
            <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 text-base-content/70 hover:text-primary transition flex items-center justify-center cursor-pointer">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div className="my-4 flex items-end justify-between gap-2">
            <div>
              <p className="text-4xl font-black text-base-content tracking-tight">
                {role === "admin" && tfData.card2.adminVal}
                {role === "student" && tfData.card2.studentVal}
                {role === "teacher" && tfData.card2.teacherVal}
              </p>
            </div>
            {/* Emerald Sparkline */}
            <div
              className="h-10 w-24 shrink-0"
              style={{
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tfData.spark2}>
                  <defs>
                    <linearGradient id="card2Grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#10B981" strokeWidth={2} fill="url(#card2Grad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-500 text-[11px] font-mono font-bold self-start">
            <CheckCircle2 className="h-3 w-3" />
            <span>
              {role === "admin" && tfData.card2.badge}
              {role === "student" && "All Clear for March"}
              {role === "teacher" && "Paid on Feb 28"}
            </span>
          </div>
        </div>

        {/* Card 3: Pending Approvals */}
        <div className="p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-base-content/60">
              {role === "admin" && "Pending Approvals"}
              {role === "student" && "Next Due Date"}
              {role === "teacher" && "Pending Results"}
            </span>
            <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 text-base-content/70 hover:text-primary transition flex items-center justify-center cursor-pointer">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div className="my-4 flex items-end justify-between gap-2">
            <div>
              <p className="text-4xl font-black text-base-content tracking-tight">
                {role === "admin" && tfData.card3.adminVal}
                {role === "student" && tfData.card3.studentVal}
                {role === "teacher" && tfData.card3.teacherVal}
              </p>
            </div>
            {/* Amber Sparkline */}
            <div
              className="h-10 w-24 shrink-0"
              style={{
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tfData.spark3}>
                  <defs>
                    <linearGradient id="card3Grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#F59E0B" strokeWidth={2} fill="url(#card3Grad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-amber-500 text-[11px] font-mono font-bold self-start">
            <Clock className="h-3 w-3" />
            <span>
              {role === "admin" && tfData.card3.badge}
              {role === "student" && "Term 2 Fee Entry"}
              {role === "teacher" && "Grade 9 Assessment"}
            </span>
          </div>
        </div>

        {/* Card 4: Teacher Salaries */}
        <div className="p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-base-content/60">
              {role === "admin" && "Teacher Salaries"}
              {role === "student" && "Receipts Log"}
              {role === "teacher" && "Avg Attendance"}
            </span>
            <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 text-base-content/70 hover:text-primary transition flex items-center justify-center cursor-pointer">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div className="my-4 flex items-end justify-between gap-2">
            <div>
              <p className="text-4xl font-black text-base-content tracking-tight">
                {role === "admin" && tfData.card4.adminVal}
                {role === "student" && tfData.card4.studentVal}
                {role === "teacher" && tfData.card4.teacherVal}
              </p>
            </div>
            {/* Purple Sparkline */}
            <div
              className="h-10 w-24 shrink-0"
              style={{
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                maskImage: "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tfData.spark4}>
                  <defs>
                    <linearGradient id="card4Grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9603F8" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#9603F8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#9603F8" strokeWidth={2} fill="url(#card4Grad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-primary text-[11px] font-mono font-bold self-start">
            <Sparkles className="h-3 w-3" />
            <span>
              {role === "admin" && tfData.card4.badge}
              {role === "student" && "Verified SSL Logs"}
              {role === "teacher" && "High Student Ratio"}
            </span>
          </div>
        </div>

      </div>

      {/* Row 2: Analytics Chart (3 cols) + Recent Fee Projects/Payments (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Fee Analytics Chart with Brush Layout (3 Cols) */}
        <div className="lg:col-span-3 p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-extrabold text-base-content">
                {role === "admin" && "Collection & Revenue Financial Analytics"}
                {role === "student" && "Tuition Payment & Fee Clearance Track"}
                {role === "teacher" && "Class Attendance & Evaluation Activity"}
              </h3>
              <p className="text-xs text-base-content/50 mt-0.5 font-mono">
                {role === "admin" && "Time-range zoomable revenue, expense & profit trend"}
                {role === "student" && "Monthly fee payment clearing timeline"}
                {role === "teacher" && "Student attendance percentage & paper evaluation"}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Interactive Legend Badges */}
              <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono font-bold">
                {role === "admin" && (
                  <>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                      <span className="h-2 w-2 rounded-full bg-purple-600" /> Collections
                    </span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <span className="h-2 w-2 rounded-full bg-amber-500" /> Expenses
                    </span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" /> Profit
                    </span>
                  </>
                )}
                {role === "student" && (
                  <>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" /> Paid
                    </span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                      <span className="h-2 w-2 rounded-full bg-rose-500" /> Dues
                    </span>
                  </>
                )}
                {role === "teacher" && (
                  <>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                      <span className="h-2 w-2 rounded-full bg-indigo-500" /> Attendance
                    </span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <span className="h-2 w-2 rounded-full bg-amber-500" /> Papers
                    </span>
                  </>
                )}
              </div>

              {/* Chart Mode Toggle */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl">
                <button
                  onClick={() => setChartType("area")}
                  className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold transition ${
                    chartType === "area"
                      ? "bg-primary text-white shadow-sm"
                      : "text-base-content/60 hover:text-base-content"
                  }`}
                >
                  Area Brush
                </button>
                <button
                  onClick={() => setChartType("bar")}
                  className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold transition ${
                    chartType === "bar"
                      ? "bg-primary text-white shadow-sm"
                      : "text-base-content/60 hover:text-base-content"
                  }`}
                >
                  Bar View
                </button>
              </div>
            </div>
          </div>

          <div className="h-72 w-full pt-3">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "area" ? (
                <AreaChart
                  data={
                    role === "admin"
                      ? ADMIN_ANALYTICS_DATA
                      : role === "student"
                      ? STUDENT_ANALYTICS_DATA
                      : TEACHER_ANALYTICS_DATA
                  }
                  margin={{ top: 10, right: 10, left: role === "admin" ? -10 : -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="areaGradPurple" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9603F8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#9603F8" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="areaGradAmber" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="areaGradEmerald" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="areaGradRose" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="areaGradIndigo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366F1" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#6366F1" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="4 4" opacity={0.15} vertical={false} />
                  <XAxis
                    dataKey="day"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    dy={4}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => {
                      if (role === "admin") return `৳${v / 1000}k`;
                      if (role === "student") return `৳${v}`;
                      return `${v}%`;
                    }}
                  />
                  <Tooltip content={<CustomChartTooltip role={role} />} />

                  {role === "admin" && (
                    <>
                      <Area type="monotone" dataKey="collections" name="collections" stroke="#9603F8" strokeWidth={2.5} fill="url(#areaGradPurple)" />
                      <Area type="monotone" dataKey="expenses" name="expenses" stroke="#F59E0B" strokeWidth={2} fill="url(#areaGradAmber)" />
                      <Area type="monotone" dataKey="profit" name="profit" stroke="#10B981" strokeWidth={2} fill="url(#areaGradEmerald)" />
                    </>
                  )}

                  {role === "student" && (
                    <>
                      <Area type="monotone" dataKey="paid" name="paid" stroke="#10B981" strokeWidth={2.5} fill="url(#areaGradEmerald)" />
                      <Area type="monotone" dataKey="due" name="due" stroke="#F43F5E" strokeWidth={2} fill="url(#areaGradRose)" />
                    </>
                  )}

                  {role === "teacher" && (
                    <>
                      <Area type="monotone" dataKey="attendance" name="attendance" stroke="#6366F1" strokeWidth={2.5} fill="url(#areaGradIndigo)" />
                      <Area type="monotone" dataKey="evaluated" name="evaluated" stroke="#F59E0B" strokeWidth={2} fill="url(#areaGradAmber)" />
                    </>
                  )}

                  {/* Time-Range Draggable Brush Slider Strip */}
                  <Brush
                    dataKey="day"
                    height={26}
                    stroke="#9603F8"
                    fill="#0f172a"
                    tickFormatter={(v) => v}
                    className="text-[10px] font-mono"
                  />
                </AreaChart>
              ) : (
                <BarChart
                  data={
                    role === "admin"
                      ? ADMIN_ANALYTICS_DATA
                      : role === "student"
                      ? STUDENT_ANALYTICS_DATA
                      : TEACHER_ANALYTICS_DATA
                  }
                  margin={{ top: 10, right: 10, left: role === "admin" ? -10 : -25, bottom: 0 }}
                  barGap={6}
                >
                  <defs>
                    <linearGradient id="barGradPurple" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9603F8" stopOpacity={1} />
                      <stop offset="100%" stopColor="#7805F5" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="barGradAmber" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity={1} />
                      <stop offset="100%" stopColor="#D97706" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="barGradEmerald" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={1} />
                      <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="barGradRose" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F43F5E" stopOpacity={1} />
                      <stop offset="100%" stopColor="#E11D48" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="barGradIndigo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity={1} />
                      <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="4 4" opacity={0.15} vertical={false} />
                  <XAxis
                    dataKey="day"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    dy={6}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => {
                      if (role === "admin") return `৳${v / 1000}k`;
                      if (role === "student") return `৳${v}`;
                      return `${v}%`;
                    }}
                  />
                  <Tooltip content={<CustomChartTooltip role={role} />} />

                  {role === "admin" && (
                    <>
                      <Bar dataKey="collections" name="collections" fill="url(#barGradPurple)" radius={[6, 6, 0, 0]} maxBarSize={28} />
                      <Bar dataKey="expenses" name="expenses" fill="url(#barGradAmber)" radius={[6, 6, 0, 0]} maxBarSize={28} />
                      <Bar dataKey="profit" name="profit" fill="url(#barGradEmerald)" radius={[6, 6, 0, 0]} maxBarSize={28} />
                    </>
                  )}

                  {role === "student" && (
                    <>
                      <Bar dataKey="paid" name="paid" fill="url(#barGradEmerald)" radius={[6, 6, 0, 0]} maxBarSize={32} />
                      <Bar dataKey="due" name="due" fill="url(#barGradRose)" radius={[6, 6, 0, 0]} maxBarSize={32} />
                    </>
                  )}

                  {role === "teacher" && (
                    <>
                      <Bar dataKey="attendance" name="attendance" fill="url(#barGradIndigo)" radius={[6, 6, 0, 0]} maxBarSize={28} />
                      <Bar dataKey="evaluated" name="evaluated" fill="url(#barGradAmber)" radius={[6, 6, 0, 0]} maxBarSize={28} />
                    </>
                  )}
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Items / Transaction List (1 Col) */}
        <div className="p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-base-content">
              {role === "admin" && "Fee Projects"}
              {role === "student" && "Recent Payments"}
              {role === "teacher" && "Assigned Exams"}
            </h3>
            <button
              onClick={() => toast("Feature coming soon!", { icon: "✨" })}
              className="text-[11px] font-mono font-bold text-primary border border-primary/30 px-2 py-0.5 rounded-lg hover:bg-primary/10"
            >
              + New
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-base-content">Grade 10 Tuition Fee</p>
                <p className="text-[10px] text-base-content/50 font-mono">Due: Mar 10, 2026</p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-base-content">Science Lab Surcharge</p>
                <p className="text-[10px] text-base-content/50 font-mono">Due: Mar 15, 2026</p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500">
                Pending
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-base-content">Annual Exam Entry</p>
                <p className="text-[10px] text-base-content/50 font-mono">Due: Apr 05, 2026</p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                Scheduled
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Row 3: Team Activity (2 cols) + Radial Target Progress (1 col) + Time Tracker (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* People / Activity Stream (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-base-content">
              {role === "admin" && "Team & Student Activity"}
              {role === "student" && "Student Activity Log"}
              {role === "teacher" && "Student Assessment Status"}
            </h3>
            <button
              onClick={() => toast("Record added!", { icon: "📋" })}
              className="text-[11px] font-mono font-bold text-primary border border-primary/30 px-3 py-1 rounded-xl hover:bg-primary/10"
            >
              + Add Record
            </button>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-950 transition">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&q=80"
                  alt="Arif"
                  className="h-9 w-9 rounded-xl object-cover"
                />
                <div>
                  <p className="font-bold text-base-content">Arif Rahman (Grade 10)</p>
                  <p className="text-[10px] text-base-content/50 font-mono">March Tuition Fee Paid via bKash</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-500">
                Completed
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-950 transition">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80"
                  alt="Nusrat"
                  className="h-9 w-9 rounded-xl object-cover"
                />
                <div>
                  <p className="font-bold text-base-content">Nusrat Jahan (Grade 10)</p>
                  <p className="text-[10px] text-base-content/50 font-mono">Bank Deposit Slip Awaiting Admin Approval</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-500">
                In Progress
              </span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-950 transition">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                  alt="Tanvir"
                  className="h-9 w-9 rounded-xl object-cover"
                />
                <div>
                  <p className="font-bold text-base-content">Tanvir Ahmed (Grade 9)</p>
                  <p className="text-[10px] text-base-content/50 font-mono">Tuition Due Notice Sent to Student</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-500">
                Pending
              </span>
            </div>
          </div>
        </div>

        {/* Collection Target Gauge / Radial Donut Chart (1 Col) */}
        <div className="p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-base-content">
              {role === "admin" && "Collection Target"}
              {role === "student" && "Tuition Status"}
              {role === "teacher" && "Grading Progress"}
            </h3>
            <p className="text-[10px] font-mono text-base-content/50">Semester Goal</p>
          </div>

          <div className="h-44 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={
                    role === "admin"
                      ? ADMIN_RADIAL_DATA
                      : role === "student"
                      ? STUDENT_RADIAL_DATA
                      : TEACHER_RADIAL_DATA
                  }
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={68}
                  startAngle={180}
                  endAngle={0}
                  dataKey="value"
                >
                  {(role === "admin"
                    ? ADMIN_RADIAL_DATA
                    : role === "student"
                    ? STUDENT_RADIAL_DATA
                    : TEACHER_RADIAL_DATA
                  ).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1 text-center">
              <span className="text-2xl font-black text-base-content font-mono">
                {role === "admin" && "88%"}
                {role === "student" && "85%"}
                {role === "teacher" && "82%"}
              </span>
              <p className="text-[9px] font-mono text-base-content/50 uppercase">Goal Reached</p>
            </div>
          </div>

          <div className="flex items-center justify-around text-[10px] font-mono text-base-content/70 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-indigo-500 inline-block" /> Paid</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" /> Verified</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-500 inline-block" /> Pending</span>
          </div>
        </div>

        {/* Role-Tailored Payment Gateway / Quick Status Card (1 Col) */}
        <div className="p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-base-content/50">
                {role === "admin" && "Gateway Status"}
                {role === "student" && "Payment Summary"}
                {role === "teacher" && "Payroll Summary"}
              </span>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h3 className="text-base font-extrabold text-base-content mt-1">
              {role === "admin" && "Payment Channels"}
              {role === "student" && "Upcoming Tuition"}
              {role === "teacher" && "Salary Payout"}
            </h3>
          </div>

          <div className="space-y-2.5 text-xs">
            {role === "admin" && (
              <>
                <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <span className="font-bold text-base-content font-mono">bKash Direct</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-500">Active</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <span className="font-bold text-base-content font-mono">Nagad Merchant</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-500">Connected</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <span className="font-bold text-base-content font-mono">Bank Wire</span>
                  <span className="text-[10px] font-mono font-bold text-primary">Daily Settlement</span>
                </div>
              </>
            )}

            {role === "student" && (
              <>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <p className="font-bold text-base-content">March Tuition Fee</p>
                  <p className="text-[10px] text-emerald-500 font-bold font-mono">Status: Paid & Verified</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <p className="font-bold text-base-content">April Tuition Fee</p>
                  <p className="text-[10px] text-amber-500 font-bold font-mono">Due: ৳ 4,500 (Apr 10)</p>
                </div>
              </>
            )}

            {role === "teacher" && (
              <>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <p className="text-[10px] text-base-content/50 uppercase font-mono">February Salary</p>
                  <p className="font-mono font-black text-emerald-500 text-sm">৳ 45,000.00</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <p className="text-[10px] text-base-content/50 uppercase font-mono">Performance Bonus</p>
                  <p className="font-mono font-bold text-primary text-xs">+ ৳ 3,000.00</p>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => toast("Navigating to action...", { icon: "🚀" })}
            className="w-full py-2.5 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition shadow-md shadow-primary/20 flex items-center justify-center gap-1.5"
          >
            <span>
              {role === "admin" && "Manage Payment Settings"}
              {role === "student" && "Pay April Fee Now"}
              {role === "teacher" && "View Official Payslip"}
            </span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};

export default DashboardOverview;
