import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { INITIAL_PAYMENTS } from "../../../data/mockData";
import DownloadReceiptButton, {
  PreviewReceiptButton,
} from "../../../Components/Receipt/DownloadReceiptButton";

function StatusBadge({ status }) {
  const s = status?.toLowerCase();
  if (s === "successful" || s === "paid" || s === "verified") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
        <CheckCircle className="h-3 w-3" /> {status}
      </span>
    );
  }
  if (s === "pending") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
        <Clock className="h-3 w-3" /> {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
      <AlertCircle className="h-3 w-3" /> {status}
    </span>
  );
}

const ReceiptsPage = () => {
  return (
    <div className="space-y-6">
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 text-[#9603F8] font-mono text-xs font-bold uppercase mb-1">
          <FileText className="h-4 w-4" />
          <span>Guardian Portal</span>
        </div>
        <h1 className="text-2xl font-black text-base-content tracking-tight">
          Verified Fee Receipts
        </h1>
        <p className="text-xs text-base-content/60 mt-0.5">
          Official digital receipts for tuition payments. Download or preview
          PDF for your records.
        </p>
      </div>

      {/* ── Receipt Cards ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {INITIAL_PAYMENTS.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 hover:shadow-md hover:border-purple-200 dark:hover:border-purple-800/50 transition-all duration-200"
          >
            {/* Card Header */}
            <div className="flex justify-between items-start pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-xs font-mono font-bold text-[#9603F8]">
                  {p.trxId}
                </p>
                <p className="text-[10px] text-base-content/50 mt-0.5 font-mono">
                  {p.id}
                </p>
              </div>
              <StatusBadge status={p.status} />
            </div>

            {/* Student Info */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-bold text-sm text-base-content">
                  {p.studentName}
                </p>
                <span className="text-xs text-base-content/60 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg font-mono">
                  {p.class}
                </span>
              </div>
              <p className="text-xs text-base-content/60">{p.feeType}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-base-content/50">{p.date}</span>
                <span className="font-mono text-emerald-500 dark:text-emerald-400 font-extrabold text-base">
                  ৳ {Number(p.amount).toLocaleString("en-BD")}
                </span>
              </div>
            </div>

            {/* Method tag */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-base-content/50">via</span>
              <span className="px-2 py-0.5 rounded-lg bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 text-[10px] font-bold border border-purple-100 dark:border-purple-900/50">
                {p.method}
              </span>
              <span className="text-[10px] text-base-content/50">
                by {p.guardianName}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <PreviewReceiptButton payment={p} />
              <DownloadReceiptButton payment={p} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceiptsPage;
