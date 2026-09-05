import { useState } from "react";
import { FileSpreadsheet, CheckCircle2, Save } from "lucide-react";
import { INITIAL_STUDENTS } from "../../../data/mockData";

const InputStudentResultPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase mb-1">
          <FileSpreadsheet className="h-4 w-4" />
          <span>Teacher Hub</span>
        </div>
        <h1 className="text-2xl font-black text-base-content tracking-tight">Input Student Examination Marks</h1>
        <p className="text-xs text-base-content/60 mt-0.5">
          Grade entry portal for mid-term & annual academic assessments.
        </p>
      </div>

      {submitted && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Academic marks recorded successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <div>
            <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Select Class</label>
            <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
              <option>Grade 10 - Higher Math</option>
              <option>Grade 9 - Math</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Exam Term</label>
            <select className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
              <option>Mid-Term 2026</option>
              <option>Final Term 2026</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase font-bold text-base-content/60">
                <th className="py-3 px-4">Roll</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Obtained Marks (out of 100)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70">
              {INITIAL_STUDENTS.slice(0, 3).map((s) => (
                <tr key={s.id}>
                  <td className="py-3 px-4 font-mono font-bold">{s.roll}</td>
                  <td className="py-3 px-4 font-bold">{s.name}</td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      defaultValue="85"
                      className="w-24 px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md shadow-primary/20 hover:bg-primary/90 transition flex items-center gap-2"
        >
          <Save className="h-4 w-4" /> Save Academic Results
        </button>
      </form>
    </div>
  );
};

export default InputStudentResultPage;
