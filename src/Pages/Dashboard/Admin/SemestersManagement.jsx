import { useState } from "react";
import { CalendarDays, Plus, Users, Award, X } from "lucide-react";
import { toast } from "react-toastify";
import { useMadrasa, MONTH_LABELS_BN } from "../../../Context/MadrasaContext";

const SemestersManagement = () => {
  const { semesters, students, studentResults, addSemester } = useMadrasa();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    academicYear: "2026",
    startDate: "2026-07-01",
    endDate: "2026-12-31",
    defaultMonthlyFee: 2700,
    status: "Active",
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code) {
      toast.error("সেমিস্টারের নাম ও কোড আবশ্যক");
      return;
    }
    await addSemester(formData);
    toast.success(`সেমিস্টার ${formData.name} সফলভাবে তৈরি হয়েছে!`);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <CalendarDays className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
              সেমিস্টার ও শিক্ষাবর্ষ ব্যবস্থাপনা
            </h1>
            <p className="text-xs text-base-content/60">
              নতুন সেমিস্টার তৈরি করুন, সময়সীমা নির্ধারণ করুন এবং সেমিস্টার ফলাফল পর্যালোচনা করুন
            </p>
          </div>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>নতুন সেমিস্টার তৈরি করুন</span>
        </button>
      </div>

      {/* Semester Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {semesters.map((sem) => {
          const enrolledCount = students.filter((s) => s.semesterId === sem._id).length;
          return (
            <div
              key={sem._id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold">
                  {sem.code}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    sem.status === "Active"
                      ? "bg-emerald-500/15 text-emerald-500"
                      : "bg-slate-500/15 text-slate-500"
                  }`}
                >
                  {sem.status === "Active" ? "চলমান" : "সম্পন্ন"}
                </span>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-base-content">{sem.name}</h3>
                <p className="text-xs font-mono text-base-content/60 mt-1">
                  {sem.startDate} → {sem.endDate}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 text-base-content/70 font-semibold">
                  <Users className="h-3.5 w-3.5 text-primary" />
                  {enrolledCount || sem.studentCount} জন ছাত্র
                </span>
                <span className="font-mono font-bold text-primary">
                  মাসিক ফি: ৳{Number(sem.defaultMonthlyFee).toLocaleString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Student Result Overview in Semesters */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
          <div className="flex items-center gap-2.5">
            <Award className="h-5 w-5 text-primary" />
            <div>
              <h3 className="text-base font-bold text-base-content">
                সেমিস্টার ভিত্তিক একাডেমিক ফলাফল ও মাসিক অগ্রগতি রেকর্ড
              </h3>
              <p className="text-xs text-base-content/60">
                বিভিন্ন জামাত ও বিভাগের ছাত্রদের সেমিস্টার মূল্যায়ন ও অগ্রগতি প্রতিবেদন
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-base-content/60">
                <th className="py-3 px-3">ছাত্রের নাম</th>
                <th className="py-3 px-3">সেমিস্টার / মাস</th>
                <th className="py-3 px-3">বিষয়</th>
                <th className="py-3 px-3">প্রাপ্ত নম্বর ও গ্রেড</th>
                <th className="py-3 px-3">মাসিক অগ্রগতি মন্তব্য</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
              {studentResults.map((r) => (
                <tr key={r._id}>
                  <td className="py-3 px-3 font-bold">
                    {r.studentName}{" "}
                    <span className="font-mono text-[10px] text-primary">({r.admissionId})</span>
                  </td>
                  <td className="py-3 px-3">
                    {r.semesterName} • <span className="font-mono">{MONTH_LABELS_BN[r.month] || r.month}</span>
                  </td>
                  <td className="py-3 px-3 font-semibold">{r.subject}</td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-500">
                    {r.marksObtained}/{r.totalMarks} ({r.grade})
                  </td>
                  <td className="py-3 px-3 text-base-content/70 max-w-xs truncate">
                    {r.monthlyProgressReport}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Semester Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-base-content">নতুন সেমিস্টার তৈরি করুন</h3>
              <button onClick={() => setModalOpen(false)} className="cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  সেমিস্টারের নাম
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="যেমন: প্রথম সাময়িক ২০২৭"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    সেমিস্টার কোড
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="SPR-2027"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    নির্ধারিত মাসিক ফি (৳)
                  </label>
                  <input
                    type="number"
                    value={formData.defaultMonthlyFee}
                    onChange={(e) => setFormData({ ...formData, defaultMonthlyFee: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono font-bold"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    শুরুর তারিখ
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  />
                </div>
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    শেষের তারিখ
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
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
                  সেমিস্টার সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SemestersManagement;
