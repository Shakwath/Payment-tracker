import { Link } from "react-router-dom";
import { Users, CreditCard, Award, CheckCircle2, Clock } from "lucide-react";
import { useMadrasa, MONTH_LABELS_BN } from "../../../Context/MadrasaContext";

const MyStudents = () => {
  const { students, payments, studentResults, selectedMonth } = useMadrasa();

  const linkedStudents = students.filter((s) => s.guardianId === "grd-01");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
              আমার সংযুক্ত সন্তানদের তথ্য ও পড়াশোনার অগ্রগতি
            </h1>
            <p className="text-xs text-base-content/60">
              একটি অভিভাবক অ্যাকাউন্ট থেকে একাধিক সন্তানের মাসিক ফি স্ট্যাটাস ও পরীক্ষার ফলাফল দেখুন
            </p>
          </div>
        </div>
        <Link
          to="/dashboard/pay-fees"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20"
        >
          <CreditCard className="h-4 w-4" />
          <span>মাসিক ফি পরিশোধ করুন</span>
        </Link>
      </div>

      {/* Linked Students Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {linkedStudents.map((stu) => {
          const stuPayments = payments.filter((p) => p.studentId === stu._id);
          const currentMonthPay = stuPayments.find((p) => p.month === selectedMonth);
          const stuResults = studentResults.filter((r) => r.studentId === stu._id);

          return (
            <div
              key={stu._id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <img
                    src={stu.photoURL}
                    alt={stu.name}
                    className="h-14 w-14 rounded-2xl bg-primary/10 object-cover border border-primary/20"
                  />
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary font-mono text-[10px] font-bold uppercase">
                      {stu.admissionId}
                    </span>
                    <h3 className="text-lg font-extrabold text-base-content mt-1">{stu.name}</h3>
                    <p className="text-xs text-base-content/60">
                      {stu.classProgram} • {stu.semesterName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-base-content/50 block">
                    মাসিক ফি
                  </span>
                  <span className="text-lg font-mono font-black text-primary">
                    ৳ {Number(stu.monthlyFee).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Current Month Payment Status */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-base-content/60 block">
                    <strong>{MONTH_LABELS_BN[selectedMonth] || selectedMonth}</strong> মাসের ফি স্ট্যাটাস:
                  </span>
                  {currentMonthPay ? (
                    <span className="font-mono text-[11px] text-base-content/70">
                      {currentMonthPay.method} ({currentMonthPay.transactionId})
                    </span>
                  ) : (
                    <span className="text-[11px] text-amber-500 font-semibold">
                      {MONTH_LABELS_BN[selectedMonth] || selectedMonth} মাসের ফি এখনো জমা দেওয়া হয়নি
                    </span>
                  )}
                </div>

                {currentMonthPay ? (
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold ${
                      currentMonthPay.status === "Verified"
                        ? "bg-emerald-500/15 text-emerald-500"
                        : "bg-amber-500/15 text-amber-500"
                    }`}
                  >
                    {currentMonthPay.status === "Verified" ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <Clock className="h-3.5 w-3.5" />
                    )}
                    {currentMonthPay.status === "Verified" ? "পরিশোধিত" : "যাচাইয়ের অপেক্ষায়"}
                  </span>
                ) : (
                  <Link
                    to="/dashboard/pay-fees"
                    state={{ studentId: stu._id }}
                    className="px-3.5 py-1.5 rounded-xl bg-primary text-white font-bold"
                  >
                    ফি জমা দিন
                  </Link>
                )}
              </div>

              {/* Student Result & Monthly Progress Report */}
              <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs font-extrabold text-base-content">
                  <Award className="h-4 w-4 text-amber-500" />
                  <span>একাডেমিক ফলাফল ও মাসিক অগ্রগতি প্রতিবেদন</span>
                </div>
                {stuResults.length === 0 ? (
                  <p className="text-xs text-base-content/50">এখনো কোনো ফলাফল প্রকাশিত হয়নি।</p>
                ) : (
                  stuResults.map((res) => (
                    <div
                      key={res._id}
                      className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs space-y-1.5"
                    >
                      <div className="flex justify-between font-bold">
                        <span>
                          {res.subject} ({MONTH_LABELS_BN[res.month] || res.month})
                        </span>
                        <span className="font-mono text-emerald-600 dark:text-emerald-400">
                          {res.marksObtained}/{res.totalMarks} • গ্রেড: {res.grade}
                        </span>
                      </div>
                      <p className="text-base-content/80 italic">"{res.monthlyProgressReport}"</p>
                      <div className="flex justify-between text-[10px] font-mono text-base-content/50">
                        <span>উপস্থিতি: {res.attendancePercent}%</span>
                        <span>উস্তাদ: {res.teacherName}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyStudents;
