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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Mock Chart Datasets for Admin Analytics
const ADMIN_ANALYTICS_BARS = [
  { day: "S", value: 35 },
  { day: "M", value: 78 },
  { day: "T", value: 64 },
  { day: "W", value: 92 },
  { day: "T", value: 45 },
  { day: "F", value: 50 },
  { day: "S", value: 30 },
];

const ADMIN_RADIAL_DATA = [
  { name: "Completed", value: 88, color: "#6366f1" },
  { name: "In Progress", value: 8, color: "#10b981" },
  { name: "Pending", value: 4, color: "#f43f5e" },
];

// Guardian Datasets
const GUARDIAN_ANALYTICS_BARS = [
  { day: "Jan", value: 100 },
  { day: "Feb", value: 100 },
  { day: "Mar", value: 50 },
  { day: "Apr", value: 0 },
  { day: "May", value: 0 },
  { day: "Jun", value: 0 },
];

const GUARDIAN_RADIAL_DATA = [
  { name: "Paid Fees", value: 85, color: "#10b981" },
  { name: "Next Term", value: 10, color: "#6366f1" },
  { name: "Pending March", value: 5, color: "#f43f5e" },
];

// Teacher Datasets
const TEACHER_ANALYTICS_BARS = [
  { day: "Mon", value: 95 },
  { day: "Tue", value: 92 },
  { day: "Wed", value: 98 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 94 },
];

const TEACHER_RADIAL_DATA = [
  { name: "Evaluated", value: 82, color: "#10b981" },
  { name: "In Review", value: 12, color: "#6366f1" },
  { name: "Pending", value: 6, color: "#f59e0b" },
];

const DashboardOverview = () => {
  const context = useOutletContext() || {};
  const role = (context.role || "admin").toLowerCase();
  const location = useLocation();

  // Timer State for Bottom-Right Live Tracker Widget
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
            {role === "guardian" && "Guardian Console"}
            {role === "teacher" && "Faculty Portal"}
          </h1>
          <p className="text-xs text-base-content/60 mt-1">
            {role === "admin" && "Plan, monitor, and accomplish school fee management with ease."}
            {role === "guardian" && "Track children fee status, make instant payments, and download receipts."}
            {role === "teacher" && "Manage assigned classes, student evaluation, and payroll statements."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Action triggered!")}
            className="px-5 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>
              {role === "admin" && "Add Record"}
              {role === "guardian" && "Pay Fees Now"}
              {role === "teacher" && "Input Marks"}
            </span>
          </button>
          <button
            onClick={() => alert("Report Exported!")}
            className="px-5 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-base-content text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-2 shadow-sm"
          >
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Row 1: 4 Metric Cards (Matching Screenshot Card 1 Primary Solid + 3 White Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Solid Vibrant Theme Primary Accent Card */}
        <div className="p-6 rounded-[28px] bg-gradient-to-br from-primary via-purple-600 to-purple-800 text-white shadow-xl shadow-primary/20 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/80">
              {role === "admin" && "Total Students"}
              {role === "guardian" && "My Children"}
              {role === "teacher" && "Assigned Classes"}
            </span>
            <div className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition cursor-pointer">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div className="my-4">
            <p className="text-4xl font-black tracking-tight">
              {role === "admin" && "1,248"}
              {role === "guardian" && "2"}
              {role === "teacher" && "3"}
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/20 text-white text-[11px] font-mono font-bold self-start backdrop-blur-md">
            <TrendingUp className="h-3 w-3" />
            <span>
              {role === "admin" && "Increased from last month"}
              {role === "guardian" && "Grade 10 & Grade 8"}
              {role === "teacher" && "Higher Math & Science"}
            </span>
          </div>
        </div>

        {/* Card 2: White Card */}
        <div className="p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-base-content/60">
              {role === "admin" && "Fee Collections"}
              {role === "guardian" && "Tuition Dues"}
              {role === "teacher" && "Last Salary"}
            </span>
            <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 text-base-content/70 hover:text-primary transition flex items-center justify-center cursor-pointer">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div className="my-4">
            <p className="text-4xl font-black text-base-content tracking-tight">
              {role === "admin" && "342K"}
              {role === "guardian" && "৳ 0.00"}
              {role === "teacher" && "৳ 45K"}
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-emerald-500 text-[11px] font-mono font-bold self-start">
            <CheckCircle2 className="h-3 w-3" />
            <span>
              {role === "admin" && "88% Target Reached"}
              {role === "guardian" && "All Clear for March"}
              {role === "teacher" && "Paid on Feb 28"}
            </span>
          </div>
        </div>

        {/* Card 3: White Card */}
        <div className="p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-base-content/60">
              {role === "admin" && "Pending Approvals"}
              {role === "guardian" && "Next Due Date"}
              {role === "teacher" && "Pending Results"}
            </span>
            <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 text-base-content/70 hover:text-primary transition flex items-center justify-center cursor-pointer">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div className="my-4">
            <p className="text-4xl font-black text-base-content tracking-tight">
              {role === "admin" && "12"}
              {role === "guardian" && "10 Apr"}
              {role === "teacher" && "1 Class"}
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-amber-500 text-[11px] font-mono font-bold self-start">
            <Clock className="h-3 w-3" />
            <span>
              {role === "admin" && "Verification Needed"}
              {role === "guardian" && "Term 2 Fee Entry"}
              {role === "teacher" && "Grade 9 Assessment"}
            </span>
          </div>
        </div>

        {/* Card 4: White Card */}
        <div className="p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-base-content/60">
              {role === "admin" && "Teacher Salaries"}
              {role === "guardian" && "Receipts Log"}
              {role === "teacher" && "Avg Attendance"}
            </span>
            <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 text-base-content/70 hover:text-primary transition flex items-center justify-center cursor-pointer">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          <div className="my-4">
            <p className="text-4xl font-black text-base-content tracking-tight">
              {role === "admin" && "৳ 85K"}
              {role === "guardian" && "12 Logs"}
              {role === "teacher" && "96%"}
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-primary text-[11px] font-mono font-bold self-start">
            <Sparkles className="h-3 w-3" />
            <span>
              {role === "admin" && "Scheduled for 5th"}
              {role === "guardian" && "Verified SSL Logs"}
              {role === "teacher" && "High Student Ratio"}
            </span>
          </div>
        </div>

      </div>

      {/* Row 2: Analytics Chart (3 cols) + Recent Fee Projects/Payments (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Fee Analytics Bar Chart (3 Cols) */}
        <div className="lg:col-span-3 p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-base-content">
              {role === "admin" && "Collection Analytics"}
              {role === "guardian" && "Payment Completion Progress"}
              {role === "teacher" && "Class Attendance Overview"}
            </h3>
            <span className="text-[10px] font-mono font-bold text-primary px-2.5 py-1 rounded-xl bg-primary/10">
              WEEKLY FEED
            </span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={
                  role === "admin"
                    ? ADMIN_ANALYTICS_BARS
                    : role === "guardian"
                    ? GUARDIAN_ANALYTICS_BARS
                    : TEACHER_ANALYTICS_BARS
                }
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "14px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  formatter={(val) => [`${val}%`, "Metric"]}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[12, 12, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Items / Transaction List (1 Col) */}
        <div className="p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-base-content">
              {role === "admin" && "Fee Projects"}
              {role === "guardian" && "Recent Payments"}
              {role === "teacher" && "Assigned Exams"}
            </h3>
            <button
              onClick={() => alert("New item modal!")}
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
              {role === "guardian" && "Children Activity Log"}
              {role === "teacher" && "Student Assessment Status"}
            </h3>
            <button
              onClick={() => alert("Add Member modal!")}
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
                  <p className="text-[10px] text-base-content/50 font-mono">Tuition Due Notice Sent to Parent</p>
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
              {role === "guardian" && "Tuition Status"}
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
                      : role === "guardian"
                      ? GUARDIAN_RADIAL_DATA
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
                    : role === "guardian"
                    ? GUARDIAN_RADIAL_DATA
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
                {role === "guardian" && "85%"}
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

        {/* Role-Tailored Payment Gateway / Quick Status Card (Matching Donezo SaaS Style - 1 Col) */}
        <div className="p-6 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-base-content/50">
                {role === "admin" && "Gateway Status"}
                {role === "guardian" && "Payment Summary"}
                {role === "teacher" && "Payroll Summary"}
              </span>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h3 className="text-base font-extrabold text-base-content mt-1">
              {role === "admin" && "Payment Channels"}
              {role === "guardian" && "Upcoming Tuition"}
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

            {role === "guardian" && (
              <>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <p className="font-bold text-base-content">Arif Rahman (Grade 10)</p>
                  <p className="text-[10px] text-emerald-500 font-bold font-mono">March Tuition: Paid</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800">
                  <p className="font-bold text-base-content">Nusrat Jahan (Grade 10)</p>
                  <p className="text-[10px] text-rose-500 font-bold font-mono">Due: ৳ 4,500 (Mar 10)</p>
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
            onClick={() => alert("Action triggered!")}
            className="w-full py-2.5 rounded-2xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition shadow-md shadow-primary/20 flex items-center justify-center gap-1.5"
          >
            <span>
              {role === "admin" && "Manage Payment Settings"}
              {role === "guardian" && "Pay Nusrat's Fee Now"}
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
