import { useState } from "react";
import { Clock, Check, X, Eye, FileCheck, AlertCircle } from "lucide-react";
import { INITIAL_PENDING_VERIFICATIONS } from "../../../data/mockData";

const PendingVerificationPage = () => {
  const [verifications, setVerifications] = useState(INITIAL_PENDING_VERIFICATIONS);
  const [selectedProof, setSelectedProof] = useState(null);

  const handleApprove = (id) => {
    setVerifications(verifications.filter((item) => item.id !== id));
    alert(`Payment verification #${id} approved! Ledger updated.`);
  };

  const handleReject = (id) => {
    setVerifications(verifications.filter((item) => item.id !== id));
    alert(`Payment verification #${id} rejected. Parent notified.`);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-mono text-xs font-bold uppercase mb-1">
            <Clock className="h-4 w-4" />
            <span>Finance & Billing</span>
          </div>
          <h1 className="text-2xl font-black text-base-content tracking-tight">Pending Payment Verification</h1>
          <p className="text-xs text-base-content/60 mt-0.5">
            Manual payment receipts and bank deposit slips submitted by guardians awaiting admin approval.
          </p>
        </div>
      </div>

      {/* Grid of Pending Approvals */}
      {verifications.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <FileCheck className="h-12 w-12 text-emerald-500 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-base-content">All Clear!</h3>
          <p className="text-xs text-base-content/60">There are currently no pending payment receipts awaiting verification.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {verifications.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4"
            >
              <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono font-bold text-primary px-2.5 py-1 rounded-full bg-primary/10">
                  {item.id} • TRX: {item.trxId}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  {item.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-[10px] text-base-content/50 uppercase font-mono">Student & Class</p>
                  <p className="font-bold text-base-content">{item.studentName}</p>
                  <p className="text-[10px] text-base-content/60">{item.class}</p>
                </div>
                <div>
                  <p className="text-[10px] text-base-content/50 uppercase font-mono">Guardian</p>
                  <p className="font-bold text-base-content">{item.guardianName}</p>
                </div>
                <div>
                  <p className="text-[10px] text-base-content/50 uppercase font-mono">Payment Channel</p>
                  <p className="font-medium text-base-content">{item.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-[10px] text-base-content/50 uppercase font-mono">Claimed Amount</p>
                  <p className="font-mono font-extrabold text-emerald-500 text-base">৳ {item.amount.toLocaleString()}</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="truncate mr-2">
                  <p className="text-[10px] text-base-content/50 uppercase font-mono">Auditor Notes</p>
                  <p className="text-xs text-base-content/80 truncate">{item.notes}</p>
                </div>
                <button
                  onClick={() => setSelectedProof(item.proofImage)}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold text-primary hover:bg-primary hover:text-white transition shrink-0 flex items-center gap-1"
                >
                  <Eye className="h-3.5 w-3.5" /> Proof
                </button>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => handleReject(item.id)}
                  className="flex-1 py-2 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 font-bold hover:bg-rose-500 hover:text-white transition flex items-center justify-center gap-1 text-xs"
                >
                  <X className="h-4 w-4" /> Reject Proof
                </button>
                <button
                  onClick={() => handleApprove(item.id)}
                  className="flex-1 py-2 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition flex items-center justify-center gap-1 text-xs shadow-md shadow-emerald-500/20"
                >
                  <Check className="h-4 w-4" /> Approve Payment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Proof Image Preview Modal */}
      {selectedProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedProof(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-base-content/70 hover:text-primary transition"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-lg font-extrabold text-base-content">Submitted Proof Screenshot</h3>
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-96">
              <img src={selectedProof} alt="Deposit Proof" className="w-full h-full object-cover" />
            </div>
            <button
              onClick={() => setSelectedProof(null)}
              className="w-full py-2 rounded-xl bg-primary text-white text-xs font-bold"
            >
              Close Document
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingVerificationPage;
