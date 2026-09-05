import { FileText, Download } from "lucide-react";
import { INITIAL_PAYMENTS } from "../../../data/mockData";

const ReceiptsPage = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase mb-1">
          <FileText className="h-4 w-4" />
          <span>Guardian Portal</span>
        </div>
        <h1 className="text-2xl font-black text-base-content tracking-tight">Verified Fee Receipts</h1>
        <p className="text-xs text-base-content/60 mt-0.5">
          Official digital receipts for tuition payments. Download PDF for your records.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INITIAL_PAYMENTS.map((p) => (
          <div key={p.id} className="p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-mono font-bold text-primary">{p.trxId}</span>
              <span className="text-[10px] font-mono text-base-content/50">{p.date}</span>
            </div>
            <div className="text-xs space-y-1">
              <p className="font-bold text-base-content">{p.studentName} ({p.class})</p>
              <p className="text-base-content/70">{p.feeType}</p>
              <p className="font-mono text-emerald-500 font-extrabold text-sm">৳ {p.amount}</p>
            </div>
            <button
              onClick={() => alert(`Downloading official PDF receipt for ${p.trxId}`)}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-primary hover:bg-primary hover:text-white transition flex items-center justify-center gap-2"
            >
              <Download className="h-3.5 w-3.5" /> Download PDF Receipt
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReceiptsPage;
