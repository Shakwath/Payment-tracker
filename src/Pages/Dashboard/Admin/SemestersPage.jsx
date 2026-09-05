import { useState } from "react";
import { CalendarDays, Plus, CheckCircle2, Clock, Users, DollarSign, X } from "lucide-react";
import { INITIAL_SEMESTERS } from "../../../data/mockData";

const SemestersPage = () => {
  const [semesters, setSemesters] = useState(INITIAL_SEMESTERS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newSemester, setNewSemester] = useState({
    title: "",
    academicYear: "2026",
    startDate: "",
    endDate: "",
    targetCollection: 5000000,
  });

  const handleAddSemester = (e) => {
    e.preventDefault();
    const created = {
      id: `SEM-${newSemester.academicYear}-${semesters.length + 1}`,
      title: newSemester.title,
      academicYear: newSemester.academicYear,
      startDate: newSemester.startDate,
      endDate: newSemester.endDate,
      status: "Upcoming",
      enrolledStudents: 1250,
      totalTargetCollection: Number(newSemester.targetCollection) || 5000000,
      collectedAmount: 0,
    };
    setSemesters([created, ...semesters]);
    setIsAddModalOpen(false);
    setNewSemester({ title: "", academicYear: "2026", startDate: "", endDate: "", targetCollection: 5000000 });
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase mb-1">
            <CalendarDays className="h-4 w-4" />
            <span>Academic Management</span>
          </div>
          <h1 className="text-2xl font-black text-base-content tracking-tight">Semesters & Academic Terms</h1>
          <p className="text-xs text-base-content/60 mt-0.5">
            Configure active terms, billing schedules, and target fee collection metrics.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Create New Semester</span>
        </button>
      </div>

      {/* Semesters Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {semesters.map((sem) => {
          const progressPercent = sem.totalTargetCollection > 0
            ? Math.round((sem.collectedAmount / sem.totalTargetCollection) * 100)
            : 0;

          return (
            <div
              key={sem.id}
              className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-primary px-2.5 py-1 rounded-full bg-primary/10">
                  {sem.id}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                    sem.status === "Active"
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                      : sem.status === "Upcoming"
                      ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                      : "bg-slate-100 dark:bg-slate-800 text-base-content/60"
                  }`}
                >
                  {sem.status}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-base-content">{sem.title}</h3>
                <p className="text-xs text-base-content/60 font-mono mt-1">
                  {sem.startDate} to {sem.endDate}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-slate-800 text-xs">
                <div className="flex justify-between items-center text-base-content/70">
                  <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-primary" /> Enrolled:</span>
                  <span className="font-bold text-base-content">{sem.enrolledStudents} Students</span>
                </div>
                <div className="flex justify-between items-center text-base-content/70">
                  <span className="flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5 text-emerald-500" /> Collection Target:</span>
                  <span className="font-bold text-base-content font-mono">৳ {sem.totalTargetCollection.toLocaleString()}</span>
                </div>
              </div>

              {/* Collection Progress Bar */}
              <div className="space-y-1 pt-2">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-base-content/60">Collected: ৳ {sem.collectedAmount.toLocaleString()}</span>
                  <span className="font-bold text-primary">{progressPercent}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Create Semester */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-base-content/70 hover:text-primary transition"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-xl font-extrabold text-base-content">Create Academic Term</h3>
            <form onSubmit={handleAddSemester} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Term Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Spring Term 2027"
                  value={newSemester.title}
                  onChange={(e) => setNewSemester({ ...newSemester, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={newSemester.startDate}
                    onChange={(e) => setNewSemester({ ...newSemester, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={newSemester.endDate}
                    onChange={(e) => setNewSemester({ ...newSemester, endDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Target Revenue (৳)</label>
                <input
                  type="number"
                  required
                  value={newSemester.targetCollection}
                  onChange={(e) => setNewSemester({ ...newSemester, targetCollection: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-base-content/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition"
                >
                  Create Term
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SemestersPage;
