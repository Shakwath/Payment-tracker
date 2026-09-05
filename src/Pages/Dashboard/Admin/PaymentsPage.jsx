import { useState } from "react";
import { CreditCard, Search, Download, CheckCircle2, FileText, X, Filter } from "lucide-react";
import { INITIAL_PAYMENTS } from "../../../data/mockData";

const PaymentsPage = () => {
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [methodFilter, setMethodFilter] = useState("All");
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.trxId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.guardianName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMethod = methodFilter === "All" || p.method === methodFilter;

    return matchesSearch && matchesMethod;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase mb-1">
            <CreditCard className="h-4 w-4" />
            <span>Finance & Billing</span>
          </div>
          <h1 className="text-2xl font-black text-base-content tracking-tight">Payment Transactions Ledger</h1>
          <p className="text-xs text-base-content/60 mt-0.5">
            Real-time transaction history across bKash, Nagad, Cards, and Cash deposits.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40" />
          <input
            type="text"
            placeholder="Search by TRX ID, student or guardian..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-base-content/60" />
          <span className="text-xs font-mono text-base-content/60">Method:</span>
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
          >
            <option value="All">All Methods</option>
            <option value="bKash">bKash</option>
            <option value="Nagad">Nagad</option>
            <option value="Visa Card">Visa Card</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase font-bold text-base-content/60">
                <th className="py-4 px-6">TRX Reference</th>
                <th className="py-4 px-6">Student & Class</th>
                <th className="py-4 px-6">Guardian</th>
                <th className="py-4 px-6">Fee Type</th>
                <th className="py-4 px-6">Gateway</th>
                <th className="py-4 px-6">Amount Paid</th>
                <th className="py-4 px-6 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 text-xs">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/50 transition">
                  <td className="py-4 px-6">
                    <span className="font-mono font-bold text-primary text-sm">{p.trxId}</span>
                    <p className="text-[10px] text-base-content/50 font-mono mt-0.5">{p.date}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-base-content">{p.studentName}</p>
                    <p className="text-[11px] text-base-content/60 font-mono">{p.class}</p>
                  </td>
                  <td className="py-4 px-6 font-medium text-base-content">{p.guardianName}</td>
                  <td className="py-4 px-6 text-base-content/70">{p.feeType}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-base-content">
                      {p.method}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-mono font-black text-emerald-500 text-sm">
                      ৳ {p.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedReceipt(p)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-primary/10 text-primary transition"
                      title="View Receipt"
                    >
                      <FileText className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-base-content/70 hover:text-primary transition"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 mb-2">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-extrabold text-base-content">Payment Receipt</h3>
              <p className="text-xs font-mono text-primary font-bold">{selectedReceipt.trxId}</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-base-content/60">Student:</span>
                <span className="font-bold text-base-content">{selectedReceipt.studentName} ({selectedReceipt.class})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/60">Guardian:</span>
                <span className="font-bold text-base-content">{selectedReceipt.guardianName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/60">Fee Type:</span>
                <span className="font-medium text-base-content">{selectedReceipt.feeType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/60">Date & Time:</span>
                <span className="font-mono text-base-content">{selectedReceipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/60">Payment Method:</span>
                <span className="font-bold text-base-content">{selectedReceipt.method}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-200 dark:border-slate-800 text-sm">
                <span className="font-bold text-base-content">Amount Paid:</span>
                <span className="font-mono font-black text-emerald-500">৳ {selectedReceipt.amount.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => alert("Simulated Receipt Print / PDF Downloaded!")}
              className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" /> Download PDF Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
