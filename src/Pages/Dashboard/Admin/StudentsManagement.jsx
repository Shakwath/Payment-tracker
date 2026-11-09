import { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Edit3,
  History,
  UserX,
  CheckCircle2,
  CreditCard,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import { useMadrasa } from "../../../Context/MadrasaContext";
import { useLanguage } from "../../../Context/LanguageContext";

const StudentsManagement = () => {
  const {
    students,
    semesters,
    guardians,
    payments,
    MONTHS,
    MONTH_LABELS_BN,
    selectedMonth,
    addStudent,
    updateStudent,
    upsertStudentMonthlyPayment,
  } = useMadrasa();

  const { lang, t } = useLanguage();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [semesterFilter, setSemesterFilter] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Modals
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [feeHistoryStudent, setFeeHistoryStudent] = useState(null);

  // Manual Monthly Payment Update Modal State
  const [paymentModalStudent, setPaymentModalStudent] = useState(null);
  const [manualPayForm, setManualPayForm] = useState({
    month: selectedMonth,
    amount: 2500,
    method: "Offline",
    status: "Verified",
    transactionId: "",
    note: "অ্যাডমিন কর্তৃক ম্যানুয়ালি আপডেটকৃত",
  });

  const [formData, setFormData] = useState({
    admissionId: "",
    name: "",
    classProgram: "হিফজুল কুরআন বিভাগ (২য় বর্ষ)",
    semesterId: semesters[0]?._id || "",
    guardianId: guardians[0]?._id || "",
    monthlyFee: 2500,
    admissionDate: new Date().toISOString().slice(0, 10),
    status: "Active",
  });

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(q) ||
      s.admissionId.toLowerCase().includes(q) ||
      (s.guardianPhone || "").toLowerCase().includes(q) ||
      (s.guardianName || "").toLowerCase().includes(q);
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    const matchesSemester = semesterFilter === "All" || s.semesterId === semesterFilter;
    return matchesSearch && matchesStatus && matchesSemester;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openAddModal = () => {
    setEditingStudent(null);
    setFormData({
      admissionId: `ADM-2026-${100 + students.length + 1}`,
      name: "",
      classProgram: "হিফজুল কুরআন বিভাগ (২য় বর্ষ)",
      semesterId: semesters[0]?._id || "",
      guardianId: guardians[0]?._id || "",
      monthlyFee: 2500,
      admissionDate: new Date().toISOString().slice(0, 10),
      status: "Active",
    });
    setModalOpen(true);
  };

  const openEditModal = (stu) => {
    setEditingStudent(stu);
    setFormData({
      admissionId: stu.admissionId,
      name: stu.name,
      classProgram: stu.classProgram,
      semesterId: stu.semesterId,
      guardianId: stu.guardianId,
      monthlyFee: stu.monthlyFee,
      admissionDate: stu.admissionDate,
      status: stu.status,
    });
    setModalOpen(true);
  };

  // Open Manual Monthly Payment Update Modal for a Student
  const openManualPaymentModal = (stu, targetMonth = selectedMonth) => {
    setPaymentModalStudent(stu);
    const existingPay = payments.find(
      (p) => p.studentId === stu._id && p.month === targetMonth
    );
    setManualPayForm({
      month: targetMonth,
      amount: existingPay ? existingPay.amount : stu.monthlyFee,
      method: existingPay ? existingPay.method : "Offline",
      status: existingPay ? existingPay.status : "Verified",
      transactionId:
        existingPay?.transactionId || `MANUAL-${Date.now().toString().slice(-4)}`,
      note: existingPay?.note || "অ্যাডমিন কর্তৃক ম্যানুয়ালি বেতন আপডেট",
    });
  };

  const handleManualMonthSelect = (stu, m) => {
    const existingPay = payments.find((p) => p.studentId === stu._id && p.month === m);
    setManualPayForm({
      month: m,
      amount: existingPay ? existingPay.amount : stu.monthlyFee,
      method: existingPay ? existingPay.method : "Offline",
      status: existingPay ? existingPay.status : "Verified",
      transactionId:
        existingPay?.transactionId || `MANUAL-${Date.now().toString().slice(-4)}`,
      note: existingPay?.note || "অ্যাডমিন কর্তৃক ম্যানুয়ালি বেতন আপডেট",
    });
  };

  const handleSaveManualPayment = async (e) => {
    e.preventDefault();
    if (!paymentModalStudent) return;
    try {
      await upsertStudentMonthlyPayment({
        studentId: paymentModalStudent._id,
        ...manualPayForm,
      });
      toast.success(
        t(
          `${paymentModalStudent.name}-এর ${
            MONTH_LABELS_BN[manualPayForm.month] || manualPayForm.month
          } মাসের পেমেন্ট (৳${manualPayForm.amount}) সফলভাবে আপডেট হয়েছে!`,
          `Updated ${manualPayForm.month} payment (৳${manualPayForm.amount}) for ${paymentModalStudent.name}!`
        )
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error(t("শিক্ষার্থীর নাম আবশ্যক", "Student name is required"));
      return;
    }
    if (editingStudent) {
      await updateStudent(editingStudent._id, formData);
      toast.success(
        t(
          `শিক্ষার্থীর তথ্য আপডেট হয়েছে: ${formData.name}`,
          `Student updated: ${formData.name}`
        )
      );
    } else {
      await addStudent(formData);
      toast.success(
        t(
          `নতুন শিক্ষার্থী ভর্তি সম্পন্ন: ${formData.name}`,
          `New student enrolled: ${formData.name}`
        )
      );
    }
    setModalOpen(false);
  };

  const toggleDeactivate = async (stu) => {
    const nextStatus = stu.status === "Active" ? "Inactive" : "Active";
    await updateStudent(stu._id, { status: nextStatus });
    toast.info(
      t(
        `${stu.name}-এর স্ট্যাটাস ${nextStatus} করা হয়েছে`,
        `${stu.name} status changed to ${nextStatus}`
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
              {t(
                "শিক্ষার্থী ব্যবস্থাপনা ও ম্যানুয়াল মাসিক পেমেন্ট আপডেট",
                "Students Management & Manual Monthly Fee Update"
              )}
            </h1>
            <p className="text-xs text-base-content/60">
              {t(
                "শিক্ষার্থীদের ভর্তি, মাসিক ফি নির্ধারণ এবং যেকোনো মাসের বেতন/টাকা ম্যানুয়ালি আপডেট করুন",
                "Enroll students, set individual monthly fees, and manually update any month's fee payment"
              )}
            </p>
          </div>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:opacity-95 transition"
        >
          <Plus className="h-4 w-4" />
          <span>{t("নতুন শিক্ষার্থী যুক্ত করুন", "Add New Student")}</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800">
        <div className="sm:col-span-6 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          <Search className="h-4 w-4 text-base-content/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder={t(
              "শিক্ষার্থীর নাম, ভর্তি আইডি অথবা অভিভাবকের মোবাইল নম্বর দিয়ে খুঁজুন...",
              "Search by student name, admission ID, or guardian phone..."
            )}
            className="w-full bg-transparent text-xs outline-none"
          />
        </div>
        <div className="sm:col-span-3">
          <select
            value={semesterFilter}
            onChange={(e) => {
              setSemesterFilter(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold outline-none"
          >
            <option value="All">{t("সকল সেমিস্টার", "All Semesters")}</option>
            {semesters.map((sem) => (
              <option key={sem._id} value={sem._id}>
                {sem.name}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold outline-none"
          >
            <option value="All">{t("সকল স্ট্যাটাস", "All Statuses")}</option>
            <option value="Active">{t("সক্রিয় (Active)", "Active")}</option>
            <option value="Inactive">{t("নিষ্ক্রিয় (Inactive)", "Inactive")}</option>
            <option value="Graduated">{t("সমাপনী (Graduated)", "Graduated")}</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-base-content/60 bg-slate-50/50 dark:bg-slate-950/50">
                <th className="py-3.5 px-4">{t("শিক্ষার্থী ও আইডি", "Student & ID")}</th>
                <th className="py-3.5 px-4">{t("বিভাগ / জামাত", "Class / Department")}</th>
                <th className="py-3.5 px-4">{t("অভিভাবক ও মোবাইল", "Guardian & Phone")}</th>
                <th className="py-3.5 px-4">{t("নির্ধারিত মাসিক ফি", "Monthly Fee")}</th>
                <th className="py-3.5 px-4">
                  {t(
                    `চলতি মাস (${MONTH_LABELS_BN[selectedMonth]})`,
                    `Current Month (${selectedMonth})`
                  )}
                </th>
                <th className="py-3.5 px-4 text-right">
                  {t("ম্যানুয়াল পেমেন্ট ও অ্যাকশন", "Manual Payment & Actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800 text-xs">
              {paginated.map((stu) => {
                const monthPay = payments.find(
                  (p) => p.studentId === stu._id && p.month === selectedMonth
                );
                return (
                  <tr
                    key={stu._id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={stu.photoURL}
                          alt={stu.name}
                          className="h-9 w-9 rounded-xl object-cover bg-primary/10"
                        />
                        <div>
                          <p className="font-bold text-base-content">{stu.name}</p>
                          <p className="font-mono text-[10px] text-primary font-bold">
                            {stu.admissionId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-base-content">{stu.classProgram}</p>
                      <p className="text-[11px] text-base-content/60">{stu.semesterName}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-base-content">{stu.guardianName}</p>
                      <p className="font-mono text-[11px] text-base-content/60">
                        {stu.guardianPhone}
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-extrabold text-sm text-base-content">
                        ৳ {Number(stu.monthlyFee).toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {monthPay ? (
                        <div>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              monthPay.status === "Verified"
                                ? "bg-emerald-500/15 text-emerald-500"
                                : monthPay.status === "Pending"
                                ? "bg-amber-500/15 text-amber-500"
                                : "bg-rose-500/15 text-rose-500"
                            }`}
                          >
                            {monthPay.status === "Verified"
                              ? t(`পরিশোধিত (৳${monthPay.amount})`, `Paid (৳${monthPay.amount})`)
                              : monthPay.status === "Pending"
                              ? t(`পেন্ডিং (৳${monthPay.amount})`, `Pending (৳${monthPay.amount})`)
                              : monthPay.status}
                          </span>
                        </div>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-500">
                          {t("বকেয়া (Unpaid)", "Unpaid")}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => openManualPaymentModal(stu, selectedMonth)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-500 transition shadow-sm"
                        >
                          <CreditCard className="h-3.5 w-3.5" />
                          <span>{t("মাসিক পেমেন্ট আপডেট", "Update Monthly Fee")}</span>
                        </button>
                        <button
                          onClick={() => setFeeHistoryStudent(stu)}
                          title={t("ফি পরিবর্তনের ইতিহাস", "Fee History")}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white transition"
                        >
                          <History className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => openEditModal(stu)}
                          title={t("শিক্ষার্থীর তথ্য ও মাসিক ফি এডিট", "Edit Student")}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white transition"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => toggleDeactivate(stu)}
                          title={t("স্ট্যাটাস পরিবর্তন", "Toggle Status")}
                          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white transition"
                        >
                          {stu.status === "Active" ? (
                            <UserX className="h-3.5 w-3.5" />
                          ) : (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-base-content/60">
            {t(
              `মোট ${filtered.length} জন শিক্ষার্থীর মধ্যে ${paginated.length} জন দেখানো হচ্ছে`,
              `Showing ${paginated.length} of ${filtered.length} students`
            )}
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40 font-bold"
            >
              {t("পূর্ববর্তী", "Prev")}
            </button>
            <span className="font-mono font-bold px-2">
              {t(`পৃষ্ঠা ${page} / ${totalPages}`, `Page ${page} / ${totalPages}`)}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40 font-bold"
            >
              {t("পরবর্তী", "Next")}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          MANUAL STUDENT MONTHLY PAYMENT UPDATE MODAL (Admin Feature)
         ===================================================================== */}
      {paymentModalStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-500 uppercase">
                  {t(
                    "অ্যাডমিন ম্যানুয়াল বেতন/ফি আপডেট",
                    "Admin Manual Monthly Fee Update"
                  )}
                </span>
                <h3 className="text-lg font-extrabold text-base-content">
                  {paymentModalStudent.name} ({paymentModalStudent.admissionId})
                </h3>
                <p className="text-xs text-base-content/60">
                  {paymentModalStudent.classProgram} •{" "}
                  {t("নির্ধারিত মাসিক ফি", "Monthly Fee")}: ৳
                  {paymentModalStudent.monthlyFee}
                </p>
              </div>
              <button
                onClick={() => setPaymentModalStudent(null)}
                className="p-1.5 rounded-lg hover:bg-base-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* 12-Month Interactive Status Matrix for this Student */}
            <div>
              <label className="text-xs font-bold text-base-content/70 block mb-2">
                {t(
                  "১২ মাসের পেমেন্ট স্ট্যাটাস (যেকোনো মাসে ক্লিক করে টাকা ও স্ট্যাটাস আপডেট করুন):",
                  "12-Month Payment Matrix (Click any month to update amount & status):"
                )}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {MONTHS.map((m) => {
                  const p = payments.find(
                    (pay) => pay.studentId === paymentModalStudent._id && pay.month === m
                  );
                  const isSelected = manualPayForm.month === m;
                  return (
                    <button
                      type="button"
                      key={m}
                      onClick={() => handleManualMonthSelect(paymentModalStudent, m)}
                      className={`p-2.5 rounded-xl border text-left transition ${
                        isSelected
                          ? "border-primary ring-2 ring-primary/30 bg-primary/10"
                          : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                      }`}
                    >
                      <p className="text-[11px] font-bold text-base-content truncate">
                        {lang === "bn" ? MONTH_LABELS_BN[m] || m : m}
                      </p>
                      <p
                        className={`text-[10px] font-mono font-bold mt-0.5 ${
                          p?.status === "Verified"
                            ? "text-emerald-500"
                            : p?.status === "Pending"
                            ? "text-amber-500"
                            : "text-rose-500"
                        }`}
                      >
                        {p
                          ? `৳${p.amount} (${
                              p.status === "Verified" ? t("পরিশোধিত", "Paid") : p.status
                            })`
                          : t("বকেয়া", "Unpaid")}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Manual Payment Update Form */}
            <form
              onSubmit={handleSaveManualPayment}
              className="space-y-3.5 text-xs pt-2 border-t border-slate-200 dark:border-slate-800"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("নির্বাচিত মাস", "Selected Month")}
                  </label>
                  <select
                    value={manualPayForm.month}
                    onChange={(e) =>
                      handleManualMonthSelect(paymentModalStudent, e.target.value)
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
                    {t("প্রদত্ত টাকার পরিমাণ (৳)", "Amount Paid (৳)")}
                  </label>
                  <input
                    type="number"
                    value={manualPayForm.amount}
                    onChange={(e) =>
                      setManualPayForm({ ...manualPayForm, amount: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono font-extrabold text-sm text-emerald-600"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("পেমেন্ট স্ট্যাটাস", "Payment Status")}
                  </label>
                  <select
                    value={manualPayForm.status}
                    onChange={(e) =>
                      setManualPayForm({ ...manualPayForm, status: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold"
                  >
                    <option value="Verified">{t("পরিশোধিত (Verified)", "Verified")}</option>
                    <option value="Pending">{t("পেন্ডিং (Pending)", "Pending")}</option>
                    <option value="Rejected">{t("বাতিল (Rejected)", "Rejected")}</option>
                    <option value="Refunded/Adjusted">
                      {t("সমন্বয়কৃত (Adjusted)", "Adjusted")}
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("পেমেন্ট মাধ্যম", "Payment Method")}
                  </label>
                  <select
                    value={manualPayForm.method}
                    onChange={(e) =>
                      setManualPayForm({ ...manualPayForm, method: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold"
                  >
                    <option value="Offline">
                      {t("অফিস ক্যাশ (Offline)", "Office Cash (Offline)")}
                    </option>
                    <option value="bKash">{t("বিকাশ (bKash)", "bKash")}</option>
                    <option value="Nagad">{t("নগদ (Nagad)", "Nagad")}</option>
                    <option value="Bank">{t("ব্যাংক ডিপোজিট (Bank)", "Bank Deposit")}</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("ট্রানজেকশন আইডি / রশিদ রেফারেন্স", "Transaction ID / Receipt Ref")}
                  </label>
                  <input
                    type="text"
                    value={manualPayForm.transactionId}
                    onChange={(e) =>
                      setManualPayForm({ ...manualPayForm, transactionId: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  {t("মন্তব্য / নোট", "Remarks / Note")}
                </label>
                <input
                  type="text"
                  value={manualPayForm.note}
                  onChange={(e) =>
                    setManualPayForm({ ...manualPayForm, note: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPaymentModalStudent(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                >
                  {t("বন্ধ করুন", "Close")}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold shadow-md hover:bg-emerald-500 transition"
                >
                  {t("মাসিক পেমেন্ট সংরক্ষণ / আপডেট করুন", "Save / Update Monthly Payment")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit Student Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-base-content">
                {editingStudent
                  ? t("শিক্ষার্থীর তথ্য ও মাসিক ফি আপডেট", "Update Student & Monthly Fee")
                  : t("নতুন শিক্ষার্থী ভর্তি", "Enroll New Student")}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-base-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("ভর্তি আইডি (Admission ID)", "Admission ID")}
                  </label>
                  <input
                    type="text"
                    value={formData.admissionId}
                    onChange={(e) =>
                      setFormData({ ...formData, admissionId: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("ভর্তির তারিখ", "Admission Date")}
                  </label>
                  <input
                    type="date"
                    value={formData.admissionDate}
                    onChange={(e) =>
                      setFormData({ ...formData, admissionDate: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  {t("শিক্ষার্থীর পূর্ণ নাম", "Student Full Name")}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t("যেমন: আব্দুল্লাহ আল মামুন", "e.g., Abdullah Al Mamun")}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("বিভাগ / জামাত", "Class / Department")}
                  </label>
                  <input
                    type="text"
                    value={formData.classProgram}
                    onChange={(e) =>
                      setFormData({ ...formData, classProgram: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  />
                </div>
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("সেশন / সেমিস্টার", "Semester")}
                  </label>
                  <select
                    value={formData.semesterId}
                    onChange={(e) =>
                      setFormData({ ...formData, semesterId: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  >
                    {semesters.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("অভিভাবক নির্বাচন", "Select Guardian")}
                  </label>
                  <select
                    value={formData.guardianId}
                    onChange={(e) =>
                      setFormData({ ...formData, guardianId: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  >
                    {guardians.map((g) => (
                      <option key={g._id} value={g._id}>
                        {g.name} ({g.phone})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("নির্ধারিত মাসিক ফি (৳)", "Monthly Fee (৳)")}
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyFee}
                    onChange={(e) =>
                      setFormData({ ...formData, monthlyFee: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono font-bold"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  {t("ভর্তি স্ট্যাটাস", "Status")}
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                >
                  <option value="Active">{t("সক্রিয় (Active)", "Active")}</option>
                  <option value="Inactive">{t("নিষ্ক্রিয় (Inactive)", "Inactive")}</option>
                  <option value="Graduated">{t("সমাপনী (Graduated)", "Graduated")}</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                >
                  {t("বাতিল", "Cancel")}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20"
                >
                  {editingStudent
                    ? t("তথ্য আপডেট করুন", "Update Student")
                    : t("ভর্তি সম্পন্ন করুন", "Enroll Student")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fee History Modal */}
      {feeHistoryStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-base-content">
                  {t("মাসিক ফি পরিবর্তনের ইতিহাস", "Monthly Fee Revision History")} —{" "}
                  {feeHistoryStudent.name}
                </h3>
                <p className="text-xs font-mono text-primary">
                  {feeHistoryStudent.admissionId}
                </p>
              </div>
              <button
                onClick={() => setFeeHistoryStudent(null)}
                className="p-1.5 rounded-lg hover:bg-base-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2.5 text-xs">
              {(feeHistoryStudent.feeHistory || []).map((fh, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-base-content">{fh.note}</p>
                    <p className="text-[10px] font-mono text-base-content/50">
                      {t("কার্যকর তারিখ", "Effective Date")}: {fh.effectiveDate}
                    </p>
                  </div>
                  <span className="font-mono font-extrabold text-primary">
                    ৳ {Number(fh.amount).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsManagement;
