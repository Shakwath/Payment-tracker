import { useState } from "react";
import { FileSpreadsheet, Send, Award } from "lucide-react";
import { toast } from "react-toastify";
import { useMadrasa, MONTH_LABELS_BN } from "../../../Context/MadrasaContext";

const InputStudentResult = () => {
  const {
    students,
    teachers,
    MONTHS,
    selectedMonth,
    studentResults,
    saveStudentResult,
  } = useMadrasa();

  const currentTeacher = teachers[0];
  const [formData, setFormData] = useState({
    studentId: students[0]?._id || "",
    month: selectedMonth,
    subject: currentTeacher?.subjects?.[0] || "হিফযুল কুরআন ও তাজবীদ",
    marksObtained: 92,
    totalMarks: 100,
    grade: "মুমতায (A+)",
    attendancePercent: 97,
    monthlyProgressReport: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.monthlyProgressReport.trim()) {
      toast.error("অনুগ্রহ করে অভিভাবকের জন্য ছাত্রের মাসিক অগ্রগতির মন্তব্য লিখুন।");
      return;
    }
    await saveStudentResult({
      ...formData,
      teacherName: currentTeacher?.name || "মাদ্রাসা উস্তাদ",
    });
    toast.success("ছাত্রের ফলাফল ও মাসিক অগ্রগতি প্রতিবেদন অভিভাবক পোর্টালে প্রকাশিত হয়েছে!");
    setFormData({ ...formData, monthlyProgressReport: "" });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
          <FileSpreadsheet className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
            ছাত্রের ফলাফল ও মাসিক অগ্রগতি প্রতিবেদন ইনপুট
          </h1>
          <p className="text-xs text-base-content/60">
            অভিভাবকদের জন্য মাসিক পরীক্ষার নম্বর, গ্রেড, উপস্থিতির হার এবং সবক/পড়াশোনার অগ্রগতির মন্তব্য প্রকাশ করুন
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4 text-xs"
        >
          <h3 className="text-sm font-extrabold text-base-content border-b border-slate-200 dark:border-slate-800 pb-3">
            নতুন মূল্যায়ন ও ফলাফল যুক্ত করুন
          </h3>

          <div>
            <label className="font-bold text-base-content/70 block mb-1">
              ছাত্র নির্বাচন করুন
            </label>
            <select
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold"
            >
              {students.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} ({s.admissionId})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-base-content/70 block mb-1">
                মূল্যায়নের মাস
              </label>
              <select
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m}>
                    {MONTH_LABELS_BN[m] || m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold text-base-content/70 block mb-1">
                কিতাব / বিষয়
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-base-content/70 block mb-1">
                প্রাপ্ত নম্বর
              </label>
              <input
                type="number"
                value={formData.marksObtained}
                onChange={(e) => setFormData({ ...formData, marksObtained: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono font-bold"
                required
              />
            </div>
            <div>
              <label className="font-bold text-base-content/70 block mb-1">
                গ্রেড / বিভাগ
              </label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold"
                required
              />
            </div>
            <div>
              <label className="font-bold text-base-content/70 block mb-1">
                উপস্থিতি (%)
              </label>
              <input
                type="number"
                value={formData.attendancePercent}
                onChange={(e) => setFormData({ ...formData, attendancePercent: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-base-content/70 block mb-1">
              মাসিক অগ্রগতির মন্তব্য (অভিভাবক পোর্টালে প্রদর্শিত হবে)
            </label>
            <textarea
              rows={3}
              value={formData.monthlyProgressReport}
              onChange={(e) =>
                setFormData({ ...formData, monthlyProgressReport: e.target.value })
              }
              placeholder="হিফয সবক, তাজবীদ, আখলাক ও ক্লাসের মনোযোগ সম্পর্কে বিস্তারিত মন্তব্য লিখুন..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary text-white font-bold shadow-md shadow-primary/20 cursor-pointer"
          >
            <Send className="h-4 w-4" />
            <span>ফলাফল ও অগ্রগতি প্রতিবেদন প্রকাশ করুন</span>
          </button>
        </form>

        {/* Published Results List */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-extrabold text-base-content">
              প্রকাশিত ছাত্র ফলাফল তালিকা ({studentResults.length})
            </h3>
          </div>
          <div className="space-y-3">
            {studentResults.map((res) => (
              <div
                key={res._id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-base-content">
                    {res.studentName} ({res.admissionId}) — {res.subject}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-500 font-mono font-bold">
                    {res.marksObtained}/{res.totalMarks} ({res.grade})
                  </span>
                </div>
                <p className="text-base-content/75 italic">"{res.monthlyProgressReport}"</p>
                <div className="flex justify-between text-[10px] font-mono text-base-content/50">
                  <span>
                    {MONTH_LABELS_BN[res.month] || res.month} • উপস্থিতি: {res.attendancePercent}%
                  </span>
                  <span>উস্তাদ: {res.teacherName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputStudentResult;
