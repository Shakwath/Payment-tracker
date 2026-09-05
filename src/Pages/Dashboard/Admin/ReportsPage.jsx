import { useState } from "react";
import { BarChart3, Download, TrendingUp, PieChart as PieIcon } from "lucide-react";
import toast from "react-hot-toast";
import {
  ResponsiveContainer,
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

const MONTHLY_REVENUE_COMPARISON = [
  { month: "Jan", tuition: 350000, lab: 25000, exam: 15000 },
  { month: "Feb", tuition: 380000, lab: 28000, exam: 12000 },
  { month: "Mar", tuition: 310000, lab: 20000, exam: 12800 },
  { month: "Apr", tuition: 390000, lab: 30000, exam: 18000 },
  { month: "May", tuition: 410000, lab: 32000, exam: 20000 },
  { month: "Jun", tuition: 430000, lab: 35000, exam: 22000 },
];

const EXPENSE_CATEGORY_BREAKDOWN = [
  { name: "Teacher Salaries", value: 55, color: "#8b5cf6" },
  { name: "Utilities & Bills", value: 20, color: "#f59e0b" },
  { name: "Lab & IT Supplies", value: 15, color: "#3b82f6" },
  { name: "Maintenance", value: 10, color: "#ec4899" },
];

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase mb-1">
            <BarChart3 className="h-4 w-4" />
            <span>Reports & Monitoring</span>
          </div>
          <h1 className="text-2xl font-black text-base-content tracking-tight">Executive Analytics & Reports</h1>
          <p className="text-xs text-base-content/60 mt-0.5">
            Institutional revenue trends, category expense splits, and downloadable financial reports.
          </p>
        </div>

        <button
          onClick={() => toast.success("Annual report exported successfully!")}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition"
        >
          <Download className="h-4 w-4" />
          <span>Export Annual Report</span>
        </button>
      </div>

      {/* Summary Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <span className="text-xs font-mono uppercase text-base-content/60 font-bold">Total Collection Target</span>
          <p className="text-3xl font-black text-base-content font-mono">৳ 5,616,000</p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[87%]" />
          </div>
          <p className="text-[11px] text-emerald-500 font-bold font-mono">87% Realized (৳ 4,890,000)</p>
        </div>

        <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <span className="text-xs font-mono uppercase text-base-content/60 font-bold">Outstanding Dues</span>
          <p className="text-3xl font-black text-rose-500 font-mono">৳ 726,000</p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div className="bg-rose-500 h-full w-[13%]" />
          </div>
          <p className="text-[11px] text-rose-500 font-bold font-mono">13% Pending Collection</p>
        </div>

        <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <span className="text-xs font-mono uppercase text-base-content/60 font-bold">Net Operational Surplus</span>
          <p className="text-3xl font-black text-primary font-mono">৳ 4,830,600</p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[92%]" />
          </div>
          <p className="text-[11px] text-primary font-bold font-mono">After Teacher Salaries & Expenses</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Stream Breakdown Bar Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-base-content flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" /> Monthly Revenue Breakdown by Stream (৳)
              </h3>
              <p className="text-xs text-base-content/60">Tuition vs Lab Fee vs Exam Fee collections</p>
            </div>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_REVENUE_COMPARISON} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="tuitionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9603F8" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#7805F5" stopOpacity={0.7} />
                  </linearGradient>
                  <linearGradient id="labGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#0891B2" stopOpacity={0.7} />
                  </linearGradient>
                  <linearGradient id="examGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#059669" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" opacity={0.15} vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `৳${v / 1000}k`} />
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
                <Bar dataKey="tuition" name="Tuition Fee" fill="url(#tuitionGrad)" radius={[6, 6, 0, 0]} stackId="a" />
                <Bar dataKey="lab" name="Lab Fee" fill="url(#labGrad)" radius={[6, 6, 0, 0]} stackId="a" />
                <Bar dataKey="exam" name="Exam Fee" fill="url(#examGrad)" radius={[6, 6, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Category Pie Chart */}
        <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-extrabold text-base-content flex items-center gap-2">
                <PieIcon className="h-4 w-4 text-purple-500" /> Expense Allocation
              </h3>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-500">
                BY CATEGORY
              </span>
            </div>
            <p className="text-xs text-base-content/60">Distribution of expenditures</p>
          </div>

          <div className="h-56 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={EXPENSE_CATEGORY_BREAKDOWN}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {EXPENSE_CATEGORY_BREAKDOWN.map((entry, index) => (
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

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-200 dark:border-slate-800">
            {EXPENSE_CATEGORY_BREAKDOWN.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-base-content/70 truncate text-[11px]">{item.name}: <strong className="text-base-content">{item.value}%</strong></span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Visual Revenue Breakdown Progress Bars */}
      <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
        <h3 className="text-lg font-extrabold text-base-content">Fee Collection Progress by Grade</h3>
        
        <div className="space-y-4 text-xs">
          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Grade 10 (350 Students)</span>
              <span className="font-mono text-emerald-500">92% Paid</span>
            </div>
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[92%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Grade 9 (320 Students)</span>
              <span className="font-mono text-emerald-500">85% Paid</span>
            </div>
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[85%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Grade 8 (300 Students)</span>
              <span className="font-mono text-emerald-500">88% Paid</span>
            </div>
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[88%]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Grade 7 (278 Students)</span>
              <span className="font-mono text-amber-500">79% Paid</span>
            </div>
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 w-[79%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
