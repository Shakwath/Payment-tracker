import { Clock, CheckCircle2 } from "lucide-react";
import { INITIAL_PAYMENTS } from "../../../data/mockData";
import { ReceiptActions } from "../../../Components/Receipt/DownloadReceiptButton";

const GuardianPaymentHistoryPage = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase mb-1">
          <Clock className="h-4 w-4" />
          <span>Guardian Portal</span>
        </div>
        <h1 className="text-2xl font-black text-base-content tracking-tight">Payment History & Ledger</h1>
        <p className="text-xs text-base-content/60 mt-0.5">
          History of all tuition payments and fee clearings submitted for your children.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase font-bold text-base-content/60">
              <th className="py-4 px-6">TRX ID</th>
              <th className="py-4 px-6">Student</th>
              <th className="py-4 px-6">Fee Type</th>
              <th className="py-4 px-6">Method</th>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Amount</th>
              <th className="py-4 px-6 text-right">Status</th>
              <th className="py-4 px-6 text-right">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70">
            {INITIAL_PAYMENTS.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/50">
                <td className="py-4 px-6 font-mono font-bold text-primary">{p.trxId}</td>
                <td className="py-4 px-6 font-bold text-base-content">{p.studentName}</td>
                <td className="py-4 px-6 text-base-content/70">{p.feeType}</td>
                <td className="py-4 px-6 font-mono">{p.method}</td>
                <td className="py-4 px-6 text-base-content/60">{p.date}</td>
                <td className="py-4 px-6 font-mono font-black text-emerald-500">৳ {p.amount}</td>
                <td className="py-4 px-6 text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 font-mono font-bold text-[10px]">
                    <CheckCircle2 className="h-3 w-3" /> {p.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end">
                    <ReceiptActions payment={p} showLabel={false} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuardianPaymentHistoryPage;
