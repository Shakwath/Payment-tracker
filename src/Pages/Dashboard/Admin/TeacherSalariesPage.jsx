import { useState } from "react";
import { DollarSign, CheckCircle2, Clock, Send, FileText, X } from "lucide-react";
import { INITIAL_TEACHER_SALARIES } from "../../../data/mockData";

const TeacherSalariesPage = () => {
  const [salaries, setSalaries] = useState(INITIAL_TEACHER_SALARIES);
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  const handlePaySalary = (id) => {
    setSalaries(
      salaries.map((s) =>
        s.id === id
          ? { ...s, status: "Paid", disbursementDate: new Date().toISOString().split("T")[0] }
          : s
      )
    );
    alert(`Salary disbursement successfully processed!`);
  };

  const totalPayroll = salaries.reduce((acc, curr) => acc + curr.netPayable, 0);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-purple-500 font-mono text-xs font-bold uppercase mb-1">
            <DollarSign className="h-4 w-4" />
            <span>Finance & Payroll</span>
          </div>
          <h1 className="text-2xl font-black text-base-content tracking-tight">Teacher Salaries & Payroll</h1>
          <p className="text-xs text-base-content/60 mt-0.5">
            Faculty remuneration ledger, monthly allowances, deductions, and payment status.
          </p>
        </div>

        <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20 text-right">
          <p className="text-[10px] font-mono uppercase text-purple-500 font-bold">Monthly Payroll Budget</p>
          <p className="text-xl font-black text-purple-600 dark:text-purple-400 font-mono">
            ৳ {totalPayroll.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase font-bold text-base-content/60">
                <th className="py-4 px-6">Faculty Member</th>
                <th className="py-4 px-6">Department</th>
                <th className="py-4 px-6">Payroll Period</th>
                <th className="py-4 px-6">Base Salary</th>
                <th className="py-4 px-6">Bonus / Allowance</th>
                <th className="py-4 px-6">Net Payable</th>
                <th className="py-4 px-6">Disbursement Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 text-xs">
              {salaries.map((sal) => (
                <tr key={sal.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/50 transition">
                  <td className="py-4 px-6">
                    <p className="font-bold text-base-content text-sm">{sal.teacherName}</p>
                    <span className="text-[10px] font-mono text-primary">{sal.teacherId}</span>
                  </td>
                  <td className="py-4 px-6 font-medium text-base-content">{sal.department}</td>
                  <td className="py-4 px-6 font-mono text-base-content/70">{sal.month}</td>
                  <td className="py-4 px-6 font-mono font-semibold text-base-content">
                    ৳ {sal.baseSalary.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 font-mono text-emerald-500 font-semibold">
                    +৳ {sal.bonus.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 font-mono font-black text-purple-600 dark:text-purple-400 text-sm">
                    ৳ {sal.netPayable.toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        sal.status === "Paid"
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {sal.status}
                    </span>
                    <p className="text-[10px] text-base-content/50 font-mono mt-0.5">{sal.disbursementDate}</p>
                  </td>
                  <td className="py-4 px-6 text-right space-x-1">
                    {sal.status === "Pending" ? (
                      <button
                        onClick={() => handlePaySalary(sal.id)}
                        className="px-3 py-1 rounded-xl bg-primary text-white text-[11px] font-bold hover:bg-primary/90 transition shadow-sm"
                      >
                        Disburse Salary
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedPayslip(sal)}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-primary hover:bg-primary/10 transition"
                        title="View Salary Slip"
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Salary Slip Modal */}
      {selectedPayslip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedPayslip(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-base-content/70 hover:text-primary transition"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="text-center pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-extrabold text-base-content">Official Salary Slip</h3>
              <p className="text-xs font-mono text-primary font-bold">{selectedPayslip.month}</p>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-base-content/60">Faculty Member:</span>
                <span className="font-bold text-base-content">{selectedPayslip.teacherName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/60">Department:</span>
                <span className="font-medium text-base-content">{selectedPayslip.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/60">Base Remuneration:</span>
                <span className="font-mono text-base-content">৳ {selectedPayslip.baseSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/60">Bonus / Allowance:</span>
                <span className="font-mono text-emerald-500">+৳ {selectedPayslip.bonus.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-200 dark:border-slate-800 text-sm">
                <span className="font-bold text-base-content">Net Disbursement:</span>
                <span className="font-mono font-black text-purple-600 dark:text-purple-400">
                  ৳ {selectedPayslip.netPayable.toLocaleString()}
                </span>
              </div>
            </div>
            <button
              onClick={() => alert("Simulated Payslip Download!")}
              className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold"
            >
              Download PDF Payslip
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherSalariesPage;
