import { useState } from "react";
import { ShieldCheck, Search } from "lucide-react";
import { useMadrasa } from "../../../Context/MadrasaContext";

const AuditLogs = () => {
  const { auditLogs } = useMadrasa();
  const [search, setSearch] = useState("");
  const [entityFilter, setEntityFilter] = useState("All");

  const filtered = auditLogs.filter((log) => {
    const q = search.toLowerCase();
    const matchesSearch =
      log.action.toLowerCase().includes(q) ||
      log.actor.toLowerCase().includes(q) ||
      (log.afterSummary || "").toLowerCase().includes(q);
    const matchesEntity = entityFilter === "All" || log.entity === entityFilter;
    return matchesSearch && matchesEntity;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
              অপরিবর্তনীয় প্রশাসনিক অডিট লগ (Audit Logs)
            </h1>
            <p className="text-xs text-base-content/60">
              পেমেন্ট যাচাই, ম্যানুয়াল ফি আপডেট, খরচের ভাউচার পরিবর্তন ও বেতন প্রদানের সম্পূর্ণ ইতিহাস
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800">
        <div className="sm:col-span-8 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          <Search className="h-4 w-4 text-base-content/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="অ্যাকশন, অ্যাডমিন বা বিবরণ দিয়ে খুঁজুন..."
            className="w-full bg-transparent text-xs outline-none"
          />
        </div>
        <div className="sm:col-span-4">
          <select
            value={entityFilter}
            onChange={(e) => setEntityFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold"
          >
            <option value="All">সকল মডিউল</option>
            <option value="payments">পেমেন্ট (payments)</option>
            <option value="expenses">ব্যয় (expenses)</option>
            <option value="students">ছাত্র (students)</option>
            <option value="fee_configs">ফি কনফিগ (fee_configs)</option>
            <option value="teacher_salary_payments">বেতন (teacher_salary_payments)</option>
          </select>
        </div>
      </div>

      {/* Audit List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-base-content/60 bg-slate-50/50 dark:bg-slate-950/50">
              <th className="py-3.5 px-4">সময়কাল</th>
              <th className="py-3.5 px-4">সম্পাদনকারী</th>
              <th className="py-3.5 px-4">কার্যক্রম ও মডিউল</th>
              <th className="py-3.5 px-4">পূর্ববর্তী অবস্থা</th>
              <th className="py-3.5 px-4">পরবর্তী অবস্থা</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
            {filtered.map((log) => (
              <tr key={log._id}>
                <td className="py-3.5 px-4 font-mono text-[11px] text-base-content/60">
                  {new Date(log.timestamp).toLocaleString("bn-BD")}
                </td>
                <td className="py-3.5 px-4 font-bold">{log.actor}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-mono text-[10px] font-bold">
                    {log.action}
                  </span>
                  <span className="ml-2 font-mono text-[10px] text-base-content/50">
                    [{log.entity}]
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-base-content/60">
                  {log.beforeSummary}
                </td>
                <td className="py-3.5 px-4 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  {log.afterSummary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;
