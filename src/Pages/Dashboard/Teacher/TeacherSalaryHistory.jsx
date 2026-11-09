import { DollarSign, CheckCircle2, Printer } from "lucide-react";
import { useMadrasa, MONTH_LABELS_BN } from "../../../Context/MadrasaContext";

const TeacherSalaryHistory = () => {
  const { teachers, salaryPayments } = useMadrasa();
  const teacher = teachers[0];
  const mySalaries = salaryPayments.filter((s) => s.teacherId === teacher?._id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
              আমার মাসিক বেতন ও সম্মানী ইতিহাস
            </h1>
            <p className="text-xs text-base-content/60">
              নির্ধারিত মাসিক বেতন: ৳{Number(teacher?.fixedSalary || 0).toLocaleString()} • মাসভিত্তিক পরিশোধিত বেতন স্লিপ দেখুন
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-base-content/60 bg-slate-50/50 dark:bg-slate-950/50">
              <th className="py-3.5 px-4">বেতনের মাস</th>
              <th className="py-3.5 px-4">মাধ্যম ও রেফারেন্স</th>
              <th className="py-3.5 px-4">প্রদানের তারিখ</th>
              <th className="py-3.5 px-4">টাকার পরিমাণ</th>
              <th className="py-3.5 px-4">স্ট্যাটাস</th>
              <th className="py-3.5 px-4 text-right">বেতন স্লিপ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
            {mySalaries.map((sal) => (
              <tr key={sal._id}>
                <td className="py-3.5 px-4 font-bold text-base-content">
                  {MONTH_LABELS_BN[sal.month] || sal.month}
                </td>
                <td className="py-3.5 px-4 font-mono">
                  <span className="font-bold text-primary">{sal.method}</span> • {sal.reference}
                </td>
                <td className="py-3.5 px-4 font-mono">{sal.paidDate}</td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-sm text-emerald-500">
                  ৳ {Number(sal.amount).toLocaleString()}
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 text-[10px] font-bold">
                    <CheckCircle2 className="h-3 w-3" /> পরিশোধিত
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary/10 text-primary font-bold text-[11px] cursor-pointer"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>স্লিপ প্রিন্ট</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherSalaryHistory;
