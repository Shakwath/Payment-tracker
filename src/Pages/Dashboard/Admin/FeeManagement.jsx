import { useState } from "react";
import { Receipt, Plus, ShieldCheck, X } from "lucide-react";
import { toast } from "react-toastify";
import { useMadrasa } from "../../../Context/MadrasaContext";

const FeeManagement = () => {
  const { feeConfigs, semesters, students, addFeeConfig, settings } = useMadrasa();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    scope: "Semester",
    targetId: semesters[0]?._id || "",
    classProgram: "হিফযুল কুরআন বিভাগ",
    monthlyAmount: 2800,
    effectiveDate: new Date().toISOString().slice(0, 10),
    dueDateDay: settings.dueDateDay || 10,
    lateFee: settings.lateFeeAmount || 150,
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    const targetName =
      formData.scope === "Semester"
        ? semesters.find((s) => s._id === formData.targetId)?.name || "সেমিস্টার"
        : students.find((s) => s._id === formData.targetId)?.name || "ছাত্র";

    await addFeeConfig({ ...formData, targetName });
    toast.success("নতুন মাসিক ফি কাঠামো সফলভাবে যুক্ত হয়েছে!");
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Receipt className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
              মাসিক ফি নির্ধারণ ও পরিশোধের শেষ তারিখ কনফিগারেশন
            </h1>
            <p className="text-xs text-base-content/60">
              সেমিস্টার ভিত্তিক ও ছাত্র ভিত্তিক মাসিক ফি নির্ধারণ করুন। পূর্ববর্তী পরিশোধিত ফি অপরিবর্তিত থাকবে।
            </p>
          </div>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>নতুন ফি রুল যোগ করুন</span>
        </button>
      </div>

      {/* Snapshot Business Rule Notice */}
      <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-center gap-3 text-xs text-primary font-medium">
        <ShieldCheck className="h-5 w-5 shrink-0" />
        <span>
          <strong>ফি স্ন্যাপশট নিয়ম সক্রিয়:</strong> যেকোনো সেমিস্টার বা ছাত্রের ফি পরিবর্তন করলে তা কার্যকর তারিখ থেকে প্রযোজ্য হবে এবং পূর্ববর্তী যাচাইকৃত পেমেন্ট রেকর্ডে কোনো পরিবর্তন ঘটাবে না।
        </span>
      </div>

      {/* Fee Config Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-base-content/60 bg-slate-50/50 dark:bg-slate-950/50">
              <th className="py-3.5 px-4">ফি-এর ধরন</th>
              <th className="py-3.5 px-4">নির্ধারিত সেমিস্টার / ছাত্র</th>
              <th className="py-3.5 px-4">জামাত / বিভাগ</th>
              <th className="py-3.5 px-4">মাসিক ফি</th>
              <th className="py-3.5 px-4">শেষ তারিখ ও বিলম্ব ফি</th>
              <th className="py-3.5 px-4">কার্যকর তারিখ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
            {feeConfigs.map((fc) => (
              <tr key={fc._id}>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold uppercase ${
                      fc.scope === "Semester"
                        ? "bg-primary/15 text-primary"
                        : "bg-amber-500/15 text-amber-500"
                    }`}
                  >
                    {fc.scope === "Semester" ? "সেমিস্টার ভিত্তিক" : "ছাত্র ভিত্তিক"}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-bold text-base-content">{fc.targetName}</td>
                <td className="py-3.5 px-4">{fc.classProgram}</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-sm text-emerald-500">
                  ৳ {Number(fc.monthlyAmount).toLocaleString()}
                </td>
                <td className="py-3.5 px-4 font-mono">
                  প্রতি মাসের {fc.dueDateDay} তারিখ • জরিমানা: ৳{fc.lateFee}
                </td>
                <td className="py-3.5 px-4 font-mono text-base-content/60">{fc.effectiveDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Fee Rule Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-base-content">নতুন ফি রুল নির্ধারণ করুন</h3>
              <button onClick={() => setModalOpen(false)} className="cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  ফি রুল স্কোপ
                </label>
                <select
                  value={formData.scope}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      scope: e.target.value,
                      targetId:
                        e.target.value === "Semester" ? semesters[0]?._id : students[0]?._id,
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                >
                  <option value="Semester">সেমিস্টার ভিত্তিক মাসিক ফি</option>
                  <option value="Student">ছাত্র ভিত্তিক বিশেষ ফি ছাড় / নির্ধারণ</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  {formData.scope === "Semester" ? "সেমিস্টার নির্বাচন করুন" : "ছাত্র নির্বাচন করুন"}
                </label>
                <select
                  value={formData.targetId}
                  onChange={(e) => setFormData({ ...formData, targetId: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                >
                  {formData.scope === "Semester"
                    ? semesters.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name}
                        </option>
                      ))
                    : students.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.name} ({s.admissionId})
                        </option>
                      ))}
                </select>
              </div>
              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  জামাত / বিভাগের নাম
                </label>
                <input
                  type="text"
                  value={formData.classProgram}
                  onChange={(e) => setFormData({ ...formData, classProgram: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    মাসিক ফি পরিমাণ (৳)
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyAmount}
                    onChange={(e) => setFormData({ ...formData, monthlyAmount: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    কার্যকর তারিখ
                  </label>
                  <input
                    type="date"
                    value={formData.effectiveDate}
                    onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold cursor-pointer"
                >
                  বাতিল
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-primary text-white font-bold cursor-pointer">
                  ফি রুল সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeManagement;
