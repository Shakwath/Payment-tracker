import { useState } from "react";
import { CreditCard, Search, CheckCircle2, FileText, X, Filter, Clock, Check, Eye, ShieldAlert } from "lucide-react";
import { INITIAL_PAYMENTS } from "../../../data/mockData";
import { ReceiptActions } from "../../../Components/Receipt/DownloadReceiptButton";
import DownloadReceiptButton, { PreviewReceiptButton } from "../../../Components/Receipt/DownloadReceiptButton";
import ConfirmModal from "../../../Components/UI/ConfirmModal";
import toast from "react-hot-toast";

const STATUS_STYLES = {
  Successful: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  Pending:    "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  Rejected:   "bg-rose-500/15 text-rose-500",
};

const PaymentsPage = () => {
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [methodFilter, setMethodFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [proofModal, setProofModal] = useState(null);

  // Confirm modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false, type: null, paymentId: null,
  });

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.trxId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.guardianName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = methodFilter === "All" || p.method === methodFilter;
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesMethod && matchesStatus;
  });

  const pendingCount = payments.filter((p) => p.status === "Pending").length;

  const openConfirm = (type, paymentId) =>
    setConfirmModal({ isOpen: true, type, paymentId });

  const closeConfirm = () =>
    setConfirmModal({ isOpen: false, type: null, paymentId: null });

  const handleConfirm = () => {
    const { type, paymentId } = confirmModal;
    setPayments((prev) =>
      prev.map((p) =>
        p.id === paymentId
          ? { ...p, status: type === "approve" ? "Successful" : "Rejected" }
          : p
      )
    );
    if (type === "approve") {
      toast.success(`Payment ${paymentId} approved & ledger updated.`);
    } else {
      toast.error(`Payment ${paymentId} rejected. Student notified.`);
    }
    closeConfirm();
  };

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
        {pendingCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold">
            <Clock className="h-4 w-4" />
            {pendingCount} payment{pendingCount > 1 ? "s" : ""} awaiting verification
          </div>
        )}
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

        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="h-3.5 w-3.5 text-base-content/60 shrink-0" />

          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-base-content/60">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
            >
              <option value="All">All Status</option>
              <option value="Successful">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Method Filter */}
          <div className="flex items-center gap-1.5">
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
              <option value="Bank Wire">Bank Wire</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
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
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 text-xs">
              {filteredPayments.map((p) => (
                <tr
                  key={p.id}
                  className={`hover:bg-slate-50/50 dark:hover:bg-slate-950/50 transition ${
                    p.status === "Pending" ? "bg-amber-50/30 dark:bg-amber-900/5" : ""
                  }`}
                >
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
                    <span className={`font-mono font-black text-sm ${
                      p.status === "Successful"
                        ? "text-emerald-500"
                        : p.status === "Pending"
                        ? "text-amber-500"
                        : "text-rose-500 line-through opacity-80"
                    }`}>
                      ৳ {p.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${STATUS_STYLES[p.status] || STATUS_STYLES.Pending}`}>
                      {p.status === "Pending" && <Clock className="h-3 w-3" />}
                      {p.status === "Successful" && <CheckCircle2 className="h-3 w-3" />}
                      {p.status === "Rejected" && <ShieldAlert className="h-3 w-3" />}
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-1.5">
                      {p.status === "Pending" ? (
                        <>
                          {p.proofImage && (
                            <button
                              onClick={() => setProofModal(p)}
                              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-primary hover:bg-primary/10 transition"
                              title="View Proof"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => openConfirm("reject", p.id)}
                            className="px-2.5 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition text-[11px] font-bold flex items-center gap-1"
                          >
                            <X className="h-3.5 w-3.5" /> Reject
                          </button>
                          <button
                            onClick={() => openConfirm("approve", p.id)}
                            className="px-2.5 py-1.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition text-[11px] font-bold flex items-center gap-1 shadow-sm"
                          >
                            <Check className="h-3.5 w-3.5" /> Approve
                          </button>
                        </>
                      ) : (
                        <>
                          {p.status === "Successful" && <ReceiptActions payment={p} showLabel={false} />}
                          <button
                            onClick={() => setSelectedReceipt(p)}
                            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-base-content/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                            title="View Details"
                          >
                            <FileText className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPayments.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-base-content/40 text-sm font-mono">No matching transactions found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Approve Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen && confirmModal.type === "approve"}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
        variant="success"
        title="Approve Payment?"
        message={`This will mark the payment as verified and update the ledger. This action cannot be undone.`}
        confirmLabel="Yes, Approve"
        cancelLabel="Cancel"
      />

      {/* Reject Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen && confirmModal.type === "reject"}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
        variant="danger"
        title="Reject Payment?"
        message={`This will mark the payment as rejected and notify the student. Are you sure?`}
        confirmLabel="Yes, Reject"
        cancelLabel="Cancel"
      />

      {/* Proof Image Modal */}
      {proofModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setProofModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-base-content/70 hover:text-primary transition"
            >
              <X className="h-4 w-4" />
            </button>
            <div>
              <p className="text-[10px] font-mono uppercase text-slate-400 mb-0.5">Payment Proof</p>
              <h3 className="text-base font-extrabold text-base-content">{proofModal.studentName}</h3>
              <p className="text-xs font-mono text-primary font-bold">{proofModal.trxId} · {proofModal.method}</p>
              {proofModal.notes && (
                <p className="text-xs text-base-content/60 mt-1 italic">"{proofModal.notes}"</p>
              )}
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-80">
              <img src={proofModal.proofImage} alt="Payment Proof" className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setProofModal(null); openConfirm("reject", proofModal.id); }}
                className="flex-1 py-2 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 font-bold hover:bg-rose-500 hover:text-white transition text-xs"
              >
                Reject
              </button>
              <button
                onClick={() => { setProofModal(null); openConfirm("approve", proofModal.id); }}
                className="flex-1 py-2 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition text-xs"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Details Modal */}
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
            <div className="grid grid-cols-2 gap-2">
              <PreviewReceiptButton payment={selectedReceipt} />
              <DownloadReceiptButton payment={selectedReceipt} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
