import { useState } from "react";
import {
  CreditCard,
  Plus,
  Search,
  FileText,
  Edit3,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import { useMadrasa } from "../../../Context/MadrasaContext";
import { useLanguage } from "../../../Context/LanguageContext";
import MadrasaReceiptSlip from "../../../Components/Common/MadrasaReceiptSlip";

const PaymentsManagement = () => {
  const {
    payments,
    students,
    MONTHS,
    MONTH_LABELS_BN,
    selectedMonth,
    submitPayment,
    updatePaymentManually,
    settings,
  } = useMadrasa();
  const { lang, t } = useLanguage();

  const [search, setSearch] = useState("");
  const [monthFilter, setMonthFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Offline / Manual Payment Entry Modal
  const [offlineModalOpen, setOfflineModalOpen] = useState(false);
  // Edit Existing Payment Modal (Manual Update)
  const [editingPayment, setEditingPayment] = useState(null);
  const [receiptModal, setReceiptModal] = useState(null);

  const [formData, setFormData] = useState({
    studentId: students[0]?._id || "",
    month: selectedMonth,
    feeType: "মাসিক টিউশন ও আবাসিক ফি",
    amount: students[0]?.monthlyFee || 2800,
    method: "Offline",
    transactionId: `CASH-${Date.now().toString().slice(-4)}`,
    receivedBy: "অ্যাডমিন (মাওলানা জাবেদ)",
    payerInfo: "অফিস কাউন্টার",
    note: "অফিসে সরাসরি নগদ গ্রহণ",
    isAdjustment: true,
  });

  const handleStudentSelect = (stuId) => {
    const stu = students.find((s) => s._id === stuId);
    setFormData({
      ...formData,
      studentId: stuId,
      amount: stu ? stu.monthlyFee : 2500,
    });
  };

  const handleOfflineSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await submitPayment({
        ...formData,
        autoVerify: true,
      });
      toast.success(
        t(
          `ম্যানুয়াল পেমেন্ট সংরক্ষিত হয়েছে! রশিদ নং: ${created.receiptNumber}`,
          `Manual payment recorded! Receipt: ${created.receiptNumber}`
        )
      );
      setOfflineModalOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpdateExistingPayment = async (e) => {
    e.preventDefault();
    if (!editingPayment) return;
    await updatePaymentManually(editingPayment._id, {
      amount: Number(editingPayment.amount),
      month: editingPayment.month,
      method: editingPayment.method,
      transactionId: editingPayment.transactionId,
      status: editingPayment.status,
      note: editingPayment.note,
    });
    toast.success(
      t(
        `${editingPayment.studentName}-এর মাসিক পেমেন্ট সফলভাবে আপডেট করা হয়েছে!`,
        `Updated monthly payment for ${editingPayment.studentName}!`
      )
    );
    setEditingPayment(null);
  };

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      p.studentName.toLowerCase().includes(q) ||
      p.admissionId.toLowerCase().includes(q) ||
      (p.transactionId || "").toLowerCase().includes(q) ||
      (p.payerInfo || "").toLowerCase().includes(q);
    const matchesMonth = monthFilter === "All" || p.month === monthFilter;
    const matchesMethod = methodFilter === "All" || p.method === methodFilter;
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesMonth && matchesMethod && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
              {t(
                "সকল পেমেন্ট লেজার ও ম্যানুয়াল ফি আপডেট",
                "All Payments Ledger & Manual Fee Update"
              )}
            </h1>
            <p className="text-xs text-base-content/60">
              {t(
                "বিকাশ, নগদ, ব্যাংক ও ক্যাশ পেমেন্ট দেখুন এবং যেকোনো শিক্ষার্থীর মাসিক টাকা ম্যানুয়ালি এন্ট্রি বা এডিট করুন",
                "View bKash, Nagad, Bank, and Cash payments and manually record or edit any student's monthly fee"
              )}
            </p>
          </div>
        </div>
        <button
          onClick={() => setOfflineModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>
            {t("ম্যানুয়াল / অফলাইন পেমেন্ট যুক্ত করুন", "Add Manual / Offline Payment")}
          </span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800">
        <div className="sm:col-span-5 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          <Search className="h-4 w-4 text-base-content/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t(
              "শিক্ষার্থীর নাম, আইডি, মোবাইল বা TrxID দিয়ে খুঁজুন...",
              "Search by student name, ID, phone, or TrxID..."
            )}
            className="w-full bg-transparent text-xs outline-none"
          />
        </div>
        <div className="sm:col-span-3">
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold outline-none"
          >
            <option value="All">{t("সকল মাস", "All Months")}</option>
            {MONTHS.map((m) => (
              <option key={m} value={m}>
                {lang === "bn" ? MONTH_LABELS_BN[m] || m : m}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold outline-none"
          >
            <option value="All">{t("সকল মাধ্যম", "All Methods")}</option>
            <option value="bKash">{t("বিকাশ (bKash)", "bKash")}</option>
            <option value="Nagad">{t("নগদ (Nagad)", "Nagad")}</option>
            <option value="Bank">{t("ব্যাংক (Bank)", "Bank")}</option>
            <option value="Offline">{t("অফলাইন (Cash)", "Offline (Cash)")}</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold outline-none"
          >
            <option value="All">{t("সকল স্ট্যাটাস", "All Statuses")}</option>
            <option value="Verified">{t("পরিশোধিত (Verified)", "Verified")}</option>
            <option value="Pending">{t("পেন্ডিং (Pending)", "Pending")}</option>
            <option value="Rejected">{t("বাতিল (Rejected)", "Rejected")}</option>
            <option value="Refunded/Adjusted">{t("সমন্বয়কৃত (Adjusted)", "Adjusted")}</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-base-content/60 bg-slate-50/50 dark:bg-slate-950/50">
                <th className="py-3.5 px-4">{t("শিক্ষার্থী ও অভিভাবক", "Student & Guardian")}</th>
                <th className="py-3.5 px-4">{t("মাস ও বিবরণ", "Month & Fee Type")}</th>
                <th className="py-3.5 px-4">{t("মাধ্যম ও ট্রানজেকশন আইডি", "Method & TrxID")}</th>
                <th className="py-3.5 px-4">{t("টাকার পরিমাণ", "Amount")}</th>
                <th className="py-3.5 px-4">{t("স্ট্যাটাস", "Status")}</th>
                <th className="py-3.5 px-4 text-right">
                  {t("রশিদ ও ম্যানুয়াল এডিট", "Receipt & Manual Edit")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
              {filtered.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-base-content">{p.studentName}</p>
                    <p className="text-[10px] font-mono text-base-content/60">
                      {p.admissionId} • {t("অভিভাবক:", "Guardian:")} {p.guardianName}
                    </p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-base-content">
                      {lang === "bn" ? MONTH_LABELS_BN[p.month] || p.month : p.month}
                    </p>
                    <p className="text-[10px] text-base-content/60">{p.feeType}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-primary">{p.method}</span>
                    <p className="font-mono text-[11px] text-base-content/70">
                      Ref: {p.transactionId}
                    </p>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-extrabold text-sm">
                    ৳ {Number(p.amount).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${p.status === "Verified"
                          ? "bg-emerald-500/15 text-emerald-500"
                          : p.status === "Pending"
                            ? "bg-amber-500/15 text-amber-500"
                            : "bg-rose-500/15 text-rose-500"
                        }`}
                    >
                      {p.status === "Verified"
                        ? t("পরিশোধিত (Verified)", "Verified")
                        : p.status === "Pending"
                        ? t("পেন্ডিং (Pending)", "Pending")
                        : p.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => setEditingPayment({ ...p })}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold text-[11px] hover:bg-amber-500 hover:text-white transition cursor-pointer"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>{t("টাকা/স্ট্যাটাস আপডেট", "Edit Fee/Status")}</span>
                      </button>

                      {p.status === "Verified" && (
                        <button
                          onClick={() => setReceiptModal(p)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-primary/10 text-primary font-bold text-[11px] hover:bg-primary hover:text-white transition cursor-pointer"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>{t("রশিদ", "Receipt")}</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Existing Payment Modal (Admin Manual Update) */}
      {editingPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-base-content">
                  {t(
                    "ম্যানুয়ালি পেমেন্ট ও টাকার পরিমাণ আপডেট করুন",
                    "Manually Update Payment & Amount"
                  )}
                </h3>
                <p className="text-xs text-primary font-bold">
                  {editingPayment.studentName} ({editingPayment.admissionId})
                </p>
              </div>
              <button onClick={() => setEditingPayment(null)} className="cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateExistingPayment} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("পেমেন্টের মাস", "Payment Month")}
                  </label>
                  <select
                    value={editingPayment.month}
                    onChange={(e) =>
                      setEditingPayment({ ...editingPayment, month: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold"
                  >
                    {MONTHS.map((m) => (
                      <option key={m} value={m}>
                        {lang === "bn" ? MONTH_LABELS_BN[m] || m : m}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("টাকার পরিমাণ (৳)", "Amount (৳)")}
                  </label>
                  <input
                    type="number"
                    value={editingPayment.amount}
                    onChange={(e) =>
                      setEditingPayment({ ...editingPayment, amount: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono font-extrabold text-sm text-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("পেমেন্ট মাধ্যম", "Payment Method")}
                  </label>
                  <select
                    value={editingPayment.method}
                    onChange={(e) =>
                      setEditingPayment({ ...editingPayment, method: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold"
                  >
                    <option value="Offline">{t("অফিস ক্যাশ (Offline)", "Offline Cash")}</option>
                    <option value="bKash">{t("বিকাশ (bKash)", "bKash")}</option>
                    <option value="Nagad">{t("নগদ (Nagad)", "Nagad")}</option>
                    <option value="Bank">{t("ব্যাংক (Bank)", "Bank")}</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("স্ট্যাটাস", "Status")}
                  </label>
                  <select
                    value={editingPayment.status}
                    onChange={(e) =>
                      setEditingPayment({ ...editingPayment, status: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold"
                  >
                    <option value="Verified">{t("পরিশোধিত (Verified)", "Verified")}</option>
                    <option value="Pending">{t("পেন্ডিং (Pending)", "Pending")}</option>
                    <option value="Rejected">{t("বাতিল (Rejected)", "Rejected")}</option>
                    <option value="Refunded/Adjusted">
                      {t("সমন্বয়কৃত (Adjusted)", "Refunded/Adjusted")}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  {t("ট্রানজেকশন আইডি / রশিদ রেফারেন্স", "Transaction ID / Reference")}
                </label>
                <input
                  type="text"
                  value={editingPayment.transactionId}
                  onChange={(e) =>
                    setEditingPayment({ ...editingPayment, transactionId: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  {t("নোট / মন্তব্য", "Note / Remark")}
                </label>
                <input
                  type="text"
                  value={editingPayment.note || ""}
                  onChange={(e) =>
                    setEditingPayment({ ...editingPayment, note: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingPayment(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold cursor-pointer"
                >
                  {t("বাতিল", "Cancel")}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white font-bold shadow-md cursor-pointer"
                >
                  {t("আপডেট সংরক্ষণ করুন", "Save Update")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Offline / Manual Payment Modal */}
      {offlineModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-base-content">
                {t("ম্যানুয়াল / অফলাইন পেমেন্ট এন্ট্রি", "Manual / Offline Payment Entry")}
              </h3>
              <button onClick={() => setOfflineModalOpen(false)} className="cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleOfflineSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("শিক্ষার্থী নির্বাচন করুন", "Select Student")}
                  </label>
                  <select
                    value={formData.studentId}
                    onChange={(e) => handleStudentSelect(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold"
                  >
                    {students.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name} ({s.admissionId})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("পেমেন্টের মাস", "Payment Month")}
                  </label>
                  <select
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold"
                  >
                    {MONTHS.map((m) => (
                      <option key={m} value={m}>
                        {lang === "bn" ? MONTH_LABELS_BN[m] || m : m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("পেমেন্ট মাধ্যম", "Payment Method")}
                  </label>
                  <select
                    value={formData.method}
                    onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold"
                  >
                    <option value="Offline">{t("অফিস ক্যাশ (Offline)", "Offline Cash")}</option>
                    <option value="bKash">{t("বিকাশ (bKash)", "bKash")}</option>
                    <option value="Nagad">{t("নগদ (Nagad)", "Nagad")}</option>
                    <option value="Bank">{t("ব্যাংক ডিপোজিট (Bank)", "Bank Deposit")}</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("প্রদত্ত টাকার পরিমাণ (৳)", "Amount Paid (৳)")}
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono font-bold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("রশিদ / ট্রানজেকশন রেফারেন্স", "Receipt / Transaction Reference")}
                  </label>
                  <input
                    type="text"
                    value={formData.transactionId}
                    onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("গ্রহণকারী (উসূলকারক)", "Received By (Collector)")}
                  </label>
                  <input
                    type="text"
                    value={formData.receivedBy}
                    onChange={(e) => setFormData({ ...formData, receivedBy: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  {t("মন্তব্য / নোট", "Remark / Note")}
                </label>
                <input
                  type="text"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setOfflineModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold cursor-pointer"
                >
                  {t("বাতিল", "Cancel")}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow-md cursor-pointer"
                >
                  {t("ভেরিফাই ও রশিদ তৈরি করুন", "Verify & Generate Receipt")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Traditional 2-Part Madrasa Receipt Modal */}
      {receiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-5xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 print:hidden">
              <div>
                <h3 className="text-base font-extrabold text-base-content">
                  {t(
                    "অফিশিয়াল মানি রিসিট — মারকাযুল ইলমি ওয়াল হুদা",
                    "Official Money Receipt — Markajul Ilm Wal Huda"
                  )}
                </h3>
                <p className="text-xs text-base-content/60">
                  {t(
                    "বাম অংশ: অফিস কপি • ডান অংশ: অভিভাবক / ছাত্র কপি",
                    "Left: Office Counterfoil • Right: Guardian / Student Copy"
                  )}
                </p>
              </div>
              <button
                onClick={() => setReceiptModal(null)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <MadrasaReceiptSlip
              receipt={receiptModal}
              student={students.find((s) => s._id === receiptModal.studentId)}
              settings={settings}
              showPrintButton={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsManagement;
