import { useState } from "react";
import { ShieldCheck, Search, Filter, ShieldAlert, Info } from "lucide-react";
import { INITIAL_AUDIT_LOGS } from "../../../data/mockData";

const AuditLogsPage = () => {
  const [logs, setLogs] = useState(INITIAL_AUDIT_LOGS);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = logs.filter(
    (l) =>
      l.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>Reports & Monitoring</span>
          </div>
          <h1 className="text-2xl font-black text-base-content tracking-tight">System Audit Logs</h1>
          <p className="text-xs text-base-content/60 mt-0.5">
            Immutable security event timeline recording administrative actions, fee modifications, and user logons.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40" />
          <input
            type="text"
            placeholder="Search audit logs by user, action, or details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase font-bold text-base-content/60">
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6">Actor & Role</th>
                <th className="py-4 px-6">Action Performed</th>
                <th className="py-4 px-6">Audit Activity Details</th>
                <th className="py-4 px-6">IP Address</th>
                <th className="py-4 px-6 text-right">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 text-xs">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/50 transition">
                  <td className="py-4 px-6 font-mono text-base-content/70">{log.timestamp}</td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-base-content">{log.user}</p>
                    <span className="text-[10px] font-mono text-primary">{log.role}</span>
                  </td>
                  <td className="py-4 px-6 font-bold text-base-content">{log.action}</td>
                  <td className="py-4 px-6 text-base-content/80 max-w-xs">{log.details}</td>
                  <td className="py-4 px-6 font-mono text-base-content/60">{log.ip}</td>
                  <td className="py-4 px-6 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        log.severity === "Info"
                          ? "bg-primary/15 text-primary"
                          : log.severity === "Warning"
                          ? "bg-amber-500/15 text-amber-500"
                          : "bg-rose-500/15 text-rose-500"
                      }`}
                    >
                      {log.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogsPage;
