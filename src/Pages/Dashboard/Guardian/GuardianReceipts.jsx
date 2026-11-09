import { useState } from "react";
import { FileText, Printer } from "lucide-react";
import { useMadrasa } from "../../../Context/MadrasaContext";
import { useLanguage } from "../../../Context/LanguageContext";
import MadrasaReceiptSlip from "../../../Components/Common/MadrasaReceiptSlip";

const GuardianReceipts = () => {
  const { payments, students, settings } = useMadrasa();
  const { t } = useLanguage();
  const [selectedStudentId, setSelectedStudentId] = useState("All");

  const verifiedReceipts = payments.filter((p) => {
    const isVerified = p.status === "Verified";
    const matchesStudent =
      selectedStudentId === "All" || p.studentId === selectedStudentId;
    return isVerified && matchesStudent;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm print:hidden">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
              {t(
                "যাচাইকৃত অফিশিয়াল পেমেন্ট রশিদসমূহ",
                "Verified Official Payment Receipts"
              )}
            </h1>
            <p className="text-xs text-base-content/60">
              {t(
                "মারকাযুল ইলমি ওয়াল হুদা-র অফিশিয়াল ২-অংশবিশিষ্ট (অফিস কপি ও অভিভাবক কপি) মানি রিসিট ডাউনলোড ও প্রিন্ট করুন",
                "Download or print official two-part (Office Stub & Guardian Copy) Madrasa money receipts"
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
          >
            <option value="All">{t("সকল ছাত্র", "All Students")}</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} ({s.admissionId})
              </option>
            ))}
          </select>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>{t("সব রশিদ প্রিন্ট করুন", "Print All Receipts")}</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {verifiedReceipts.map((r) => {
          const stu = students.find((s) => s._id === r.studentId);
          return (
            <MadrasaReceiptSlip
              key={r._id}
              receipt={r}
              student={stu}
              settings={settings}
              showPrintButton={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GuardianReceipts;
