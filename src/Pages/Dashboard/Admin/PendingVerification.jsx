import { useState } from "react";
import { Clock, CheckCircle2, XCircle, Eye, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import { useMadrasa } from "../../../Context/MadrasaContext";
import { useLanguage } from "../../../Context/LanguageContext";

const PendingVerification = () => {
  const { payments, MONTH_LABELS_BN, verifyOrUpdatePayment } = useMadrasa();
  const { lang, t } = useLanguage();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [adminNote, setAdminNote] = useState("");
  const [adjustedAmount, setAdjustedAmount] = useState("");

  const pendingList = payments.filter((p) => p.status === "Pending");

  const handleAction = async (payment, status) => {
    await verifyOrUpdatePayment(payment._id, {
      status,
      note:
        adminNote.trim() ||
        (status === "Verified"
          ? t(
              "অ্যাডমিন কর্তৃক ট্রানজেকশন যাচাই করে অনুমোদিত",
              "Verified and approved by Admin"
            )
          : t(
              "ট্রানজেকশন আইডি সঠিক না হওয়ায় বাতিল করা হয়েছে",
              "Rejected due to invalid Transaction ID"
            )),
      adjustedAmount: adjustedAmount ? Number(adjustedAmount) : payment.amount,
    });
    toast.success(
      t(
        `পেমেন্ট ${status === "Verified" ? "ভেরিফাইড" : "বাতিল"} হয়েছে এবং অভিভাবককে নোটিফিকেশন পাঠানো হয়েছে!`,
        `Payment ${status === "Verified" ? "Verified" : "Rejected"} and guardian notified!`
      )
    );
    setSelectedPayment(null);
    setAdminNote("");
    setAdjustedAmount("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
              {t(
                "পেন্ডিং পেমেন্ট যাচাই ও অনুমোদন কিউ",
                "Pending Payment Verification & Approval Queue"
              )}
            </h1>
            <p className="text-xs text-base-content/60">
              {t(
                "অভিভাবকদের পাঠানো বিকাশ, নগদ, ব্যাংক ও অফলাইন পেমেন্ট যাচাই করে অনুমোদন বা সংশোধন করুন",
                "Verify, approve, or adjust guardian-submitted bKash, Nagad, Bank, and Offline payments"
              )}
            </p>
          </div>
        </div>
        <span className="px-3.5 py-1.5 rounded-2xl bg-amber-500/15 text-amber-500 font-bold text-xs">
          {pendingList.length} {t("টি যাচাইয়ের অপেক্ষায়", "Awaiting Verification")}
        </span>
      </div>

      {pendingList.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
          <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
          <h3 className="text-base font-bold text-base-content">
            {t("সকল পেমেন্ট যাচাই সম্পন্ন!", "All Payments Verified!")}
          </h3>
          <p className="text-xs text-base-content/60">
            {t(
              "বর্তমানে কোনো পেন্ডিং পেমেন্ট রিকোয়েস্ট অবশিষ্ট নেই।",
              "There are currently no pending payment requests."
            )}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {pendingList.map((p) => (
            <div
              key={p._id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-500 font-bold text-xs">
                    {p.method} • {lang === "bn" ? MONTH_LABELS_BN[p.month] || p.month : p.month}
                  </span>
                  <h3 className="text-base font-extrabold text-base-content mt-2">
                    {p.studentName}{" "}
                    <span className="font-mono text-xs text-primary">({p.admissionId})</span>
                  </h3>
                  <p className="text-xs text-base-content/60">
                    {t("প্রেরণকারী অভিভাবক:", "Submitted by Guardian:")}{" "}
                    <strong>{p.guardianName}</strong>
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xl font-black text-base-content">
                    ৳ {Number(p.amount).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 text-xs space-y-1">
                <p>
                  <span className="text-base-content/50">
                    {t("ট্রানজেকশন / স্লিপ নং:", "Transaction / Slip No:")}
                  </span>{" "}
                  <strong className="font-mono text-primary">{p.transactionId}</strong>
                </p>
                <p>
                  <span className="text-base-content/50">
                    {t("প্রেরকের নম্বর/তথ্য:", "Sender Info:")}
                  </span>{" "}
                  {p.payerInfo}
                </p>
                {p.note && (
                  <p>
                    <span className="text-base-content/50">
                      {t("অভিভাবকের নোট:", "Guardian Note:")}
                    </span>{" "}
                    {p.note}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <button
                  onClick={() => {
                    setSelectedPayment(p);
                    setAdjustedAmount(p.amount);
                    setAdminNote(p.note || "");
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-base-200 transition cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>{t("প্রুফ দেখুন / টাকা সংশোধন", "View Proof / Adjust Amount")}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAction(p, "Rejected")}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/15 text-rose-500 hover:bg-rose-500 hover:text-white text-xs font-bold transition cursor-pointer"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>{t("বাতিল (Reject)", "Reject")}</span>
                  </button>
                  <button
                    onClick={() => handleAction(p, "Verified")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 text-xs font-bold shadow-md transition cursor-pointer"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{t("অনুমোদন ও ভেরিফাই", "Approve & Verify")}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h3 className="text-base font-extrabold text-base-content">
                  {t(
                    "পেমেন্ট যাচাই ও টাকার পরিমাণ সংশোধন",
                    "Verify Payment & Adjust Amount"
                  )}
                </h3>
              </div>
              <button onClick={() => setSelectedPayment(null)} className="font-bold cursor-pointer">
                ✕
              </button>
            </div>

            {selectedPayment.proofUrl && (
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-44">
                <img
                  src={selectedPayment.proofUrl}
                  alt="Payment Proof"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <label className="font-bold text-base-content/70 block mb-1">
                {t("ভেরিফাইড / সংশোধিত টাকার পরিমাণ (৳)", "Verified / Adjusted Amount (৳)")}
              </label>
              <input
                type="number"
                value={adjustedAmount}
                onChange={(e) => setAdjustedAmount(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-base-content/70 block mb-1">
                {t("অ্যাডমিন নোট (অডিট লগে সংরক্ষিত হবে)", "Admin Note (Saved to Audit Log)")}
              </label>
              <textarea
                rows={2}
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder={t(
                  "যাচাই নোট বা বাতিলের কারণ লিখুন...",
                  "Enter verification note or rejection reason..."
                )}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => handleAction(selectedPayment, "Rejected")}
                className="px-4 py-2 rounded-xl bg-rose-500 text-white font-bold cursor-pointer"
              >
                {t("বাতিল নিশ্চিত করুন", "Confirm Reject")}
              </button>
              <button
                onClick={() => handleAction(selectedPayment, "Verified")}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold cursor-pointer"
              >
                {t("ভেরিফাই ও রশিদ তৈরি করুন", "Verify & Generate Receipt")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingVerification;
