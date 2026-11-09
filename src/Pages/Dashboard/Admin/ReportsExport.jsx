import { useState } from "react";
import { BarChart3, Printer, Download } from "lucide-react";
import { toast } from "react-toastify";
import { useMadrasa, MONTH_LABELS_BN } from "../../../Context/MadrasaContext";

const REPORT_TYPES = [
  { id: "monthly-payments", label: "মাসিক ফি আদায় রিপোর্ট" },
  { id: "pending-list", label: "মাসিক বকেয়া ফি তালিকা" },
  { id: "monthly-expenses", label: "মাসিক ব্যয় বিবরণী" },
  { id: "income-vs-expense", label: "মাসিক আয় বনাম ব্যয় সারসংক্ষেপ" },
  { id: "semester-payments", label: "সেমিস্টার ভিত্তিক পেমেন্ট রিপোর্ট" },
  { id: "teacher-salaries", label: "উস্তাদদের বেতন রিপোর্ট" },
  { id: "method-breakdown", label: "পেমেন্ট মাধ্যম ভিত্তিক হিসাব" },
];

const ReportsExport = () => {
  const {
    selectedMonth,
    setSelectedMonth,
    MONTHS,
    settings,
    students,
    payments,
    expenses,
    salaryPayments,
    getDashboardMetrics,
  } = useMadrasa();

  const [reportType, setReportType] = useState("monthly-payments");
  const metrics = getDashboardMetrics(selectedMonth);

  const monthPayments = payments.filter((p) => p.month === selectedMonth);
  const verifiedStudentIds = new Set(
    monthPayments.filter((p) => p.status === "Verified").map((p) => p.studentId)
  );
  const pendingStudentsList = students.filter(
    (s) => s.status === "Active" && !verifiedStudentIds.has(s._id)
  );
  const monthExpenses = expenses.filter((e) => e.month === selectedMonth);
  const monthSalaries = salaryPayments.filter((s) => s.month === selectedMonth);

  const handleExportCSV = () => {
    let csv = "Madrasa Report,Period,Generated At\n";
    csv += `"${settings.madrasaName}","${selectedMonth}","${new Date().toISOString()}"\n\n`;

    if (reportType === "monthly-payments" || reportType === "semester-payments") {
      csv += "Receipt,Student Name,Admission ID,Month,Method,Transaction ID,Amount,Status\n";
      monthPayments.forEach((p) => {
        csv += `"${p.receiptNumber || "N/A"}","${p.studentName}","${p.admissionId}","${p.month}","${p.method}","${p.transactionId}",${p.amount},"${p.status}"\n`;
      });
    } else if (reportType === "pending-list") {
      csv += "Admission ID,Student Name,Class,Guardian Name,Phone,Monthly Fee Due\n";
      pendingStudentsList.forEach((s) => {
        csv += `"${s.admissionId}","${s.name}","${s.classProgram}","${s.guardianName}","${s.guardianPhone}",${s.monthlyFee}\n`;
      });
    } else if (reportType === "monthly-expenses") {
      csv += "Date,Title,Category,Description,Amount\n";
      monthExpenses.forEach((e) => {
        csv += `"${e.date}","${e.title}","${e.category}","${e.description}",${e.amount}\n`;
      });
    } else {
      csv += `Expected Collection,${metrics.expectedCollection}\nVerified Collection,${metrics.verifiedCollection}\nPending Amount,${metrics.pendingAmount}\nExpenses,${metrics.totalMonthlyExpenses}\nNet Balance,${metrics.netBalance}\n`;
    }

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${reportType}-${selectedMonth.replace(/\s+/g, "-")}.csv`;
    a.click();
    toast.success("CSV / Excel রিপোর্ট সফলভাবে ডাউনলোড হয়েছে!");
  };

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
              আর্থিক প্রতিবেদন এবং অফিশিয়াল PDF / CSV এক্সপোর্ট
            </h1>
            <p className="text-xs text-base-content/60">
              মারকাযুল ইলমি ওয়াল হুদা-র অফিশিয়াল প্যাডে প্রিন্টযোগ্য পিডিএফ এবং এক্সেল রিপোর্ট তৈরি করুন
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
          >
            {MONTHS.map((m) => (
              <option key={m} value={m}>
                {MONTH_LABELS_BN[m] || m}
              </option>
            ))}
          </select>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-base-200 transition cursor-pointer"
          >
            <Download className="h-4 w-4 text-emerald-500" />
            <span>CSV / Excel ডাউনলোড</span>
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>অফিশিয়াল PDF প্রিন্ট</span>
          </button>
        </div>
      </div>

      {/* Report Type Selector Pills */}
      <div className="flex flex-wrap gap-2">
        {REPORT_TYPES.map((rt) => (
          <button
            key={rt.id}
            onClick={() => setReportType(rt.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              reportType === rt.id
                ? "bg-primary text-white shadow-sm"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-base-content/70 hover:text-base-content"
            }`}
          >
            {rt.label}
          </button>
        ))}
      </div>

      {/* Official Printable PDF Document Sheet */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
        {/* PDF Letterhead with Official Madrasa Logo & Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b-2 border-primary/30">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt={settings.madrasaName}
              className="h-16 w-16 rounded-2xl object-contain bg-white p-1 border border-slate-200 shadow-sm"
            />
            <div>
              <p className="text-sm font-bold text-primary">مركز العلم والهدى</p>
              <h2 className="text-xl sm:text-2xl font-black text-base-content">
                {settings.madrasaName}
              </h2>
              <p className="text-xs text-base-content/70">{settings.address}</p>
              <p className="text-xs font-mono font-bold text-primary">
                মোবাইলঃ {settings.phone} • {settings.email}
              </p>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="px-3 py-1 rounded-lg bg-primary/10 text-primary font-bold">
              {REPORT_TYPES.find((r) => r.id === reportType)?.label}
            </span>
            <p className="mt-2 text-base-content/70">
              হিসাবের মাস: <strong>{MONTH_LABELS_BN[selectedMonth] || selectedMonth}</strong>
            </p>
            <p className="text-base-content/50 font-mono">
              প্রস্তুতির তারিখ: {new Date().toLocaleDateString("bn-BD")}
            </p>
          </div>
        </div>

        {/* Summary Totals Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
          <div>
            <span className="text-base-content/60 font-bold block">সম্ভাব্য মোট আয়</span>
            <span className="text-base font-mono font-black">
              ৳ {metrics.expectedCollection.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-base-content/60 font-bold block">যাচাইকৃত আদায়কৃত ফি</span>
            <span className="text-base font-mono font-black text-emerald-500">
              ৳ {metrics.verifiedCollection.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-base-content/60 font-bold block">মোট মাসিক ব্যয়</span>
            <span className="text-base font-mono font-black text-rose-500">
              ৳ {metrics.totalMonthlyExpenses.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-base-content/60 font-bold block">নিট উদ্বৃত্ত ব্যালেন্স</span>
            <span className="text-base font-mono font-black text-primary">
              ৳ {metrics.netBalance.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Dynamic Tabular Details based on selected reportType */}
        {(reportType === "monthly-payments" || reportType === "semester-payments") && (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-base-content/60">
                <th className="py-2.5 px-3">রশিদ নম্বর</th>
                <th className="py-2.5 px-3">ছাত্রের নাম ও আইডি</th>
                <th className="py-2.5 px-3">মাধ্যম ও ট্রানজেকশন</th>
                <th className="py-2.5 px-3">স্ট্যাটাস</th>
                <th className="py-2.5 px-3 text-right">টাকার পরিমাণ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
              {(reportType === "semester-payments" ? payments : monthPayments).map((p) => (
                <tr key={p._id}>
                  <td className="py-2.5 px-3 font-mono">{p.receiptNumber || "যাচাইয়ের অপেক্ষায়"}</td>
                  <td className="py-2.5 px-3 font-bold">
                    {p.studentName} ({p.admissionId})
                  </td>
                  <td className="py-2.5 px-3 font-mono">
                    {p.method} • {p.transactionId}
                  </td>
                  <td className="py-2.5 px-3 font-bold">
                    {p.status === "Verified"
                      ? "পরিশোধিত"
                      : p.status === "Pending"
                      ? "অপেক্ষমাণ"
                      : p.status}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold">
                    ৳ {Number(p.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {reportType === "pending-list" && (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-base-content/60">
                <th className="py-2.5 px-3">ভর্তি আইডি</th>
                <th className="py-2.5 px-3">ছাত্রের নাম</th>
                <th className="py-2.5 px-3">জামাত / বিভাগ</th>
                <th className="py-2.5 px-3">অভিভাবক ও মোবাইল</th>
                <th className="py-2.5 px-3 text-right">
                  বকেয়া ফি ({MONTH_LABELS_BN[selectedMonth] || selectedMonth})
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
              {pendingStudentsList.map((s) => (
                <tr key={s._id}>
                  <td className="py-2.5 px-3 font-mono font-bold text-primary">{s.admissionId}</td>
                  <td className="py-2.5 px-3 font-bold">{s.name}</td>
                  <td className="py-2.5 px-3">{s.classProgram}</td>
                  <td className="py-2.5 px-3">
                    {s.guardianName} ({s.guardianPhone})
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-500">
                    ৳ {Number(s.monthlyFee).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {reportType === "monthly-expenses" && (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-base-content/60">
                <th className="py-2.5 px-3">তারিখ</th>
                <th className="py-2.5 px-3">ভাউচারের শিরোনাম</th>
                <th className="py-2.5 px-3">খাত</th>
                <th className="py-2.5 px-3">বিবরণ</th>
                <th className="py-2.5 px-3 text-right">টাকার পরিমাণ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
              {monthExpenses.map((e) => (
                <tr key={e._id}>
                  <td className="py-2.5 px-3 font-mono">{e.date}</td>
                  <td className="py-2.5 px-3 font-bold">{e.title}</td>
                  <td className="py-2.5 px-3 uppercase font-mono">{e.category}</td>
                  <td className="py-2.5 px-3 text-base-content/70">{e.description}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-rose-500">
                    ৳ {Number(e.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {reportType === "teacher-salaries" && (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-base-content/60">
                <th className="py-2.5 px-3">উস্তাদের নাম ও কোড</th>
                <th className="py-2.5 px-3">মাস</th>
                <th className="py-2.5 px-3">মাধ্যম ও রেফারেন্স</th>
                <th className="py-2.5 px-3">প্রদানের তারিখ</th>
                <th className="py-2.5 px-3 text-right">প্রদানকৃত টাকা</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
              {monthSalaries.map((s) => (
                <tr key={s._id}>
                  <td className="py-2.5 px-3 font-bold">
                    {s.teacherName} ({s.teacherCode})
                  </td>
                  <td className="py-2.5 px-3">{MONTH_LABELS_BN[s.month] || s.month}</td>
                  <td className="py-2.5 px-3 font-mono">
                    {s.method} ({s.reference})
                  </td>
                  <td className="py-2.5 px-3 font-mono">{s.paidDate}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-500">
                    ৳ {Number(s.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {(reportType === "income-vs-expense" || reportType === "method-breakdown") && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-base-content">পেমেন্ট মাধ্যম ভিত্তিক আদায় বিবরণী</h4>
              {metrics.methodBreakdown.map((m) => (
                <div key={m.method} className="flex justify-between font-mono">
                  <span>
                    {m.method} ({m.count}টি যাচাইকৃত লেনদেন)
                  </span>
                  <span className="font-bold">৳ {m.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-bold text-base-content">আয় বনাম ব্যয় লেজার সারসংক্ষেপ</h4>
              <div className="flex justify-between font-mono">
                <span>যাচাইকৃত মাসিক ফি আয়:</span>
                <span className="text-emerald-500 font-bold">
                  + ৳ {metrics.verifiedCollection.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between font-mono">
                <span>মাদ্রাসা পরিচালনা ব্যয়:</span>
                <span className="text-rose-500 font-bold">
                  - ৳ {metrics.totalMonthlyExpenses.toLocaleString()}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between font-mono font-black text-sm">
                <span>সমাপনী নিট উদ্বৃত্ত:</span>
                <span className="text-primary">৳ {metrics.netBalance.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsExport;
