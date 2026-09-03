import { useOutletContext, useLocation } from "react-router-dom";
import {
  Users,
  CreditCard,
  Clock,
  TrendingUp,
  Shield,
  UserCheck,
  GraduationCap,
  BookOpen,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const DashboardOverview = () => {
  const context = useOutletContext() || {};
  const role = context.role || "admin";
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
              Welcome back to your PaymentTrack {role} console. Monitor fee metrics, system updates, and live ledger activity in real time.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-2xl border border-white/20 backdrop-blur-md">
            {role === "admin" && <Shield className="h-8 w-8 text-white" />}
            {role === "guardian" && <UserCheck className="h-8 w-8 text-white" />}
            {role === "teacher" && <GraduationCap className="h-8 w-8 text-white" />}
          </div>
        </div>
      </div>

      {/* Role-Specific Metric Cards */}
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
              <span className="text-[11px] text-primary font-bold mt-1 inline-block">Grade 8 & Grade 10</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-bold uppercase text-base-content/60">Tuition Dues</span>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <CreditCard className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">৳ 0.00</p>
              <span className="text-[11px] text-emerald-500 font-bold mt-1 inline-block">All Clear for March</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-bold uppercase text-base-content/60">Next Due Date</span>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                  <Clock className="h-4 w-4" />
                </div>
              </div>
              <p className="text-xl font-bold text-base-content mt-2">April 10, 2026</p>
              <span className="text-[11px] text-base-content/60 mt-1 inline-block">Term 2 Fee Entry</span>
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
                <span className="text-xs font-mono font-bold uppercase text-base-content/60">Assigned Subjects</span>
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">3 Classes</p>
              <span className="text-[11px] text-primary font-bold mt-1 inline-block">Math & Science</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-bold uppercase text-base-content/60">Last Salary</span>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <DollarSign className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">৳ 35,000</p>
              <span className="text-[11px] text-emerald-500 font-bold mt-1 inline-block">Paid on Feb 28</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-bold uppercase text-base-content/60">Pending Results</span>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                  <AlertCircle className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">1 Class</p>
              <span className="text-[11px] text-amber-500 font-bold mt-1 inline-block">Term 1 Assessment</span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono font-bold uppercase text-base-content/60">Attendance Log</span>
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-base-content mt-2">98%</p>
              <span className="text-[11px] text-emerald-500 font-bold mt-1 inline-block">Active Record</span>
            </div>
          </>
        )}
      </div>

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
                <p className="font-bold text-base-content">Monthly Fee Collection Sync</p>
                <p className="text-[10px] text-base-content/50 font-mono">bKash Merchant Vault • TRX-88412</p>
              </div>
            </div>
            <span className="font-mono font-bold text-primary">৳ 4,500.00</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center font-bold">
                ℹ
              </div>
              <div>
                <p className="font-bold text-base-content">Semester Fee Structure Updated</p>
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
