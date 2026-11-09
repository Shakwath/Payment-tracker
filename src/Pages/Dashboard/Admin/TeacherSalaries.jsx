import { useState } from "react";
import { DollarSign, CheckCircle2, Clock, Send, X } from "lucide-react";
import { toast } from "react-toastify";
import { useMadrasa, MONTH_LABELS_BN } from "../../../Context/MadrasaContext";

const TeacherSalaries = () => {
  const {
    teachers,
    salaryPayments,
    MONTHS,
    selectedMonth,
    setSelectedMonth,
    payTeacherSalary,
  } = useMadrasa();

  const [payModalTeacher, setPayModalTeacher] = useState(null);
  const [formData, setFormData] = useState({
    method: "Bank",
    reference: "",
    note: "",
  });

  const activeTeachers = teachers.filter((t) => t.status === "Active");
  const monthRecords = salaryPayments.filter((s) => s.month === selectedMonth);

  const totalPayroll = activeTeachers.reduce((s, t) => s + Number(t.fixedSalary || 0), 0);
  const totalPaid = monthRecords.reduce((s, r) => s + Number(r.amount || 0), 0);
  const totalDue = Math.max(0, totalPayroll - totalPaid);

  const openPayModal = (teacher) => {
    setPayModalTeacher(teacher);
    setFormData({
      method: "Bank",
      reference: `SAL-${Date.now().toString().slice(-5)}`,
      note: `${MONTH_LABELS_BN[selectedMonth] || selectedMonth} মাসের নির্ধারিত সম্মানী`,
    });
  };

  const handleDisburse = async (e) => {
    e.preventDefault();
    try {
      await payTeacherSalary({
        teacherId: payModalTeacher._id,
        month: selectedMonth,
        amount: payModalTeacher.fixedSalary,
        method: formData.method,
        reference: formData.reference,
        note: formData.note,
      });
      toast.success(
        `${payModalTeacher.name}-কে ${MONTH_LABELS_BN[selectedMonth] || selectedMonth} মাসের বেতন প্রদান সম্পন্ন হয়েছে!`
      );
      setPayModalTeacher(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
              উস্তাদ ও শিক্ষকদের মাসিক বেতন-ভাতা ব্যবস্থাপনা
            </h1>
            <p className="text-xs text-base-content/60">
              মাসভিত্তিক পরিশোধিত/বকেয়া বেতন ট্র্যাক করুন এবং ডুপ্লিকেট পরিশোধ রোধ করে সম্মানী প্রদান করুন
            </p>
          </div>
        </div>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
        >
          {MONTHS.map((m) => (
            <option key={m} value={m}>
              {MONTH_LABELS_BN[m] || m}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-base-content/60">
            মোট নির্ধারিত মাসিক বেতন ({MONTH_LABELS_BN[selectedMonth] || selectedMonth})
          </span>
          <p className="text-2xl font-black text-base-content mt-1">
            ৳ {totalPayroll.toLocaleString()}
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-emerald-500">
            মোট পরিশোধিত বেতন ({MONTH_LABELS_BN[selectedMonth] || selectedMonth})
          </span>
          <p className="text-2xl font-black text-emerald-500 mt-1">
            ৳ {totalPaid.toLocaleString()}
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-xs font-bold text-amber-500">
            বকেয়া বেতন ({MONTH_LABELS_BN[selectedMonth] || selectedMonth})
          </span>
          <p className="text-2xl font-black text-amber-500 mt-1">
            ৳ {totalDue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Monthly Roster Status Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-base-content">
            উস্তাদদের বেতন বিবরণী — {MONTH_LABELS_BN[selectedMonth] || selectedMonth}
          </h3>
        </div>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-base-content/60 bg-slate-50/50 dark:bg-slate-950/50">
              <th className="py-3.5 px-4">উস্তাদের নাম ও আইডি</th>
              <th className="py-3.5 px-4">নির্ধারিত কিতাব/বিষয়</th>
              <th className="py-3.5 px-4">মাসিক বেতন</th>
              <th className="py-3.5 px-4">{MONTH_LABELS_BN[selectedMonth] || selectedMonth} স্ট্যাটাস</th>
              <th className="py-3.5 px-4 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
            {activeTeachers.map((t) => {
              const paidRec = monthRecords.find((r) => r.teacherId === t._id);
              return (
                <tr key={t._id}>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-base-content">{t.name}</p>
                    <p className="text-[10px] font-mono text-primary">{t.teacherId}</p>
                  </td>
                  <td className="py-3.5 px-4 text-base-content/70">
                    {(t.subjects || []).join(", ")}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-extrabold text-sm">
                    ৳ {Number(t.fixedSalary).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    {paidRec ? (
                      <div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 text-[10px] font-bold">
                          <CheckCircle2 className="h-3 w-3" /> পরিশোধিত ({paidRec.paidDate})
                        </span>
                        <p className="text-[10px] font-mono text-base-content/50 mt-0.5">
                          {paidRec.method} • রেফারেন্স: {paidRec.reference}
                        </p>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 text-[10px] font-bold">
                        <Clock className="h-3 w-3" /> অপরিশোধিত / বকেয়া
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {paidRec ? (
                      <span className="text-[11px] text-emerald-500 font-bold">
                        ✓ বেতন প্রদান সম্পন্ন
                      </span>
                    ) : (
                      <button
                        onClick={() => openPayModal(t)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-white font-bold hover:opacity-95 transition cursor-pointer"
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>বেতন পরিশোধ করুন</span>
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Record Salary Payment Modal */}
      {payModalTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-base-content">
                  উস্তাদের মাসিক বেতন প্রদান রেকর্ড
                </h3>
                <p className="text-xs text-primary font-bold">
                  {payModalTeacher.name} • {MONTH_LABELS_BN[selectedMonth] || selectedMonth}
                </p>
              </div>
              <button onClick={() => setPayModalTeacher(null)} className="cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleDisburse} className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <span className="text-base-content/60 font-bold">নির্ধারিত মাসিক বেতন:</span>
                <span className="font-mono font-black text-base text-emerald-500">
                  ৳ {Number(payModalTeacher.fixedSalary).toLocaleString()}
                </span>
              </div>
              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  প্রদানের মাধ্যম
                </label>
                <select
                  value={formData.method}
                  onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                >
                  <option value="Bank">ব্যাংক ট্রান্সফার (Bank Transfer)</option>
                  <option value="bKash">বিকাশ (bKash)</option>
                  <option value="Nagad">নগদ (Nagad)</option>
                  <option value="Cash">অফিস ক্যাশ (Cash)</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  ভাউচার / ট্রানজেকশন রেফারেন্স নম্বর
                </label>
                <input
                  type="text"
                  value={formData.reference}
                  onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  মন্তব্য / নোট
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
                  onClick={() => setPayModalTeacher(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold shadow-md cursor-pointer"
                >
                  বেতন প্রদান নিশ্চিত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherSalaries;
