import { useState } from "react";
import { Receipt, Plus, Edit, Check, X } from "lucide-react";
import { INITIAL_FEE_STRUCTURES } from "../../../data/mockData";

const FeeManagementPage = () => {
  const [feeStructures, setFeeStructures] = useState(INITIAL_FEE_STRUCTURES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newFee, setNewFee] = useState({
    className: "Grade 6",
    tuitionFee: 3000,
    admissionFee: 4000,
    labFee: 300,
    examFee: 300,
  });

  const handleAddFeeStructure = (e) => {
    e.preventDefault();
    const tFee = Number(newFee.tuitionFee) || 0;
    const lFee = Number(newFee.labFee) || 0;
    const eFee = Number(newFee.examFee) || 0;
    const total = tFee + lFee + eFee;

    const created = {
      id: `FEE-${newFee.className.replace(/\s+/g, "")}`,
      className: newFee.className,
      tuitionFee: tFee,
      admissionFee: Number(newFee.admissionFee) || 0,
      labFee: lFee,
      examFee: eFee,
      totalMonthly: total,
    };

    setFeeStructures([created, ...feeStructures]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase mb-1">
            <Receipt className="h-4 w-4" />
            <span>Finance & Billing</span>
          </div>
          <h1 className="text-2xl font-black text-base-content tracking-tight">Fee Management</h1>
          <p className="text-xs text-base-content/60 mt-0.5">
            Class-wise tuition fee rates, admission fees, and lab/exam surcharges breakdown.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Add Fee Structure</span>
        </button>
      </div>

      {/* Fee Structure Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {feeStructures.map((fee) => (
          <div
            key={fee.id}
            className="p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4"
          >
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-black text-base-content">{fee.className}</h3>
              <span className="text-[10px] font-mono text-primary font-bold px-2 py-0.5 rounded bg-primary/10">
                {fee.id}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-base-content/70">
                <span>Tuition Fee:</span>
                <span className="font-bold font-mono text-base-content">৳ {fee.tuitionFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base-content/70">
                <span>Admission Fee:</span>
                <span className="font-bold font-mono text-base-content">৳ {fee.admissionFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base-content/70">
                <span>Lab Fee:</span>
                <span className="font-bold font-mono text-base-content">৳ {fee.labFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base-content/70">
                <span>Exam Fee:</span>
                <span className="font-bold font-mono text-base-content">৳ {fee.examFee.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-base-content/50 uppercase font-mono">Monthly Total</p>
                <p className="text-xl font-extrabold text-primary font-mono">
                  ৳ {fee.totalMonthly.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add Fee Structure */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-base-content/70 hover:text-primary transition"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-xl font-extrabold text-base-content">Add Fee Structure</h3>
            <form onSubmit={handleAddFeeStructure} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Class / Grade</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grade 6"
                  value={newFee.className}
                  onChange={(e) => setNewFee({ ...newFee, className: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Tuition Fee (৳)</label>
                  <input
                    type="number"
                    required
                    value={newFee.tuitionFee}
                    onChange={(e) => setNewFee({ ...newFee, tuitionFee: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Admission Fee (৳)</label>
                  <input
                    type="number"
                    required
                    value={newFee.admissionFee}
                    onChange={(e) => setNewFee({ ...newFee, admissionFee: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Lab Fee (৳)</label>
                  <input
                    type="number"
                    required
                    value={newFee.labFee}
                    onChange={(e) => setNewFee({ ...newFee, labFee: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Exam Fee (৳)</label>
                  <input
                    type="number"
                    required
                    value={newFee.examFee}
                    onChange={(e) => setNewFee({ ...newFee, examFee: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                  />
                </div>
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
                  Save Fee Structure
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeManagementPage;
