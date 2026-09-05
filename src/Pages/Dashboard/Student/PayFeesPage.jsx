import { useState } from "react";
import { CreditCard, CheckCircle2, Send } from "lucide-react";

const PayFeesPage = () => {
  const [selectedStudent, setSelectedStudent] = useState("STU-1002");
  const [amount, setAmount] = useState("4500");
  const [paymentMethod, setPaymentMethod] = useState("bKash");
  const [trxId, setTrxId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm text-center">
        <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
          <CreditCard className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-black text-base-content tracking-tight">Pay Student Tuition & Fees</h1>
        <p className="text-xs text-base-content/60 mt-1">
          Direct payment portal via bKash, Nagad, or Bank Wire Transfer.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
          <h2 className="text-xl font-bold text-base-content">Payment Submitted for Verification!</h2>
          <p className="text-xs text-base-content/70 max-w-md mx-auto">
            Your transaction reference <span className="font-mono font-bold text-primary">{trxId || "BK-889104"}</span> of ৳ {amount} has been logged. Admin will verify and issue your digital receipt shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold"
          >
            Make Another Payment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmitPayment} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4 text-xs">
          <div>
            <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Select Student</label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-base-content focus:ring-2 focus:ring-primary/40 focus:outline-none"
            >
              <option value="STU-1001">Arif Rahman (Grade 10 - Dues: ৳ 0)</option>
              <option value="STU-1002">Nusrat Jahan (Grade 10 - Dues: ৳ 4,500)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-base-content focus:ring-2 focus:ring-primary/40 focus:outline-none"
              >
                <option value="bKash">bKash Merchant</option>
                <option value="Nagad">Nagad Direct</option>
                <option value="Bank Wire">Bank Wire Deposit</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Amount (BDT)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-base-content focus:ring-2 focus:ring-primary/40 focus:outline-none font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Transaction Ref / TRX ID</label>
            <input
              type="text"
              placeholder="e.g. BK-9912048 or Bank Ref No."
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-base-content focus:ring-2 focus:ring-primary/40 focus:outline-none font-mono"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-primary text-white font-bold text-xs shadow-md shadow-primary/20 hover:bg-primary/90 transition flex items-center justify-center gap-2 mt-2"
          >
            <Send className="h-4 w-4" />
            <span>Submit Payment Verification</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default PayFeesPage;
