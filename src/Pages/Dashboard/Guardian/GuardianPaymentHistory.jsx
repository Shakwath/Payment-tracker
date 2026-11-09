import { useState } from "react";
import { Clock, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useMadrasa, MONTH_LABELS_BN } from "../../../Context/MadrasaContext";

const GuardianPaymentHistory = () => {
  const { payments, students } = useMadrasa();
  const [studentFilter, setStudentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = payments.filter((p) => {
    const matchesStu = studentFilter === "All" || p.studentId === studentFilter;
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesStu && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
              পেমেন্ট ইতিহাস ও যাচাই স্ট্যাটাস ট্র্যাকার
            </h1>
            <p className="text-xs text-base-content/60">
              জমাকৃত সকল মাসের ফি এবং সেগুলোর বর্তমান যাচাইকৃত স্ট্যাটাস (পরিশোধিত, অপেক্ষমাণ, বাতিল) দেখুন
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={studentFilter}
            onChange={(e) => setStudentFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
          >
            <option value="All">সকল সন্তান</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
          >
            <option value="All">সকল স্ট্যাটাস</option>
            <option value="Verified">পরিশোধিত (Verified)</option>
            <option value="Pending">অপেক্ষমাণ (Pending)</option>
            <option value="Rejected">বাতিল (Rejected)</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-base-content/60 bg-slate-50/50 dark:bg-slate-950/50">
              <th className="py-3.5 px-4">ছাত্রের নাম</th>
              <th className="py-3.5 px-4">মাস ও সেমিস্টার</th>
              <th className="py-3.5 px-4">মাধ্যম ও ট্রানজেকশন</th>
              <th className="py-3.5 px-4">টাকার পরিমাণ</th>
              <th className="py-3.5 px-4">স্ট্যাটাস ও নোট</th>
              <th className="py-3.5 px-4 text-right">ডিজিটাল রশিদ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
            {filtered.map((p) => (
              <tr key={p._id}>
                <td className="py-3.5 px-4">
                  <p className="font-bold text-base-content">{p.studentName}</p>
                  <p className="font-mono text-[10px] text-primary">{p.admissionId}</p>
                </td>
                <td className="py-3.5 px-4">
                  <p className="font-bold">{MONTH_LABELS_BN[p.month] || p.month}</p>
                  <p className="text-[10px] text-base-content/60">{p.semesterName}</p>
                </td>
                <td className="py-3.5 px-4 font-mono">
                  <span className="font-bold text-primary">{p.method}</span> • {p.transactionId}
                </td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-sm">
                  ৳ {Number(p.amount).toLocaleString()}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      p.status === "Verified"
                        ? "bg-emerald-500/15 text-emerald-500"
                        : p.status === "Pending"
                        ? "bg-amber-500/15 text-amber-500"
                        : "bg-rose-500/15 text-rose-500"
                    }`}
                  >
                    {p.status === "Verified"
                      ? "পরিশোধিত"
                      : p.status === "Pending"
                      ? "যাচাইয়ের অপেক্ষায়"
                      : "বাতিল"}
                  </span>
                  {p.note && (
                    <p className="text-[10px] text-base-content/60 mt-1">{p.note}</p>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right">
                  {p.status === "Verified" ? (
                    <Link
                      to="/dashboard/receipts"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary/10 text-primary font-mono font-bold text-[11px]"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>{p.receiptNumber}</span>
                    </Link>
                  ) : (
                    <span className="text-[10px] text-base-content/40">
                      যাচাইয়ের অপেক্ষায়
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GuardianPaymentHistory;
