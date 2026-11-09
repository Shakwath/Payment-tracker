import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreditCard,
  CheckCircle2,
  Info,
  ShieldCheck,
  Send,
} from "lucide-react";
import { toast } from "react-toastify";
import { useMadrasa, MONTH_LABELS_BN } from "../../../Context/MadrasaContext";

const PAYMENT_METHODS = [
  { key: "bKash", label: "বিকাশ (bKash)" },
  { key: "Nagad", label: "নগদ (Nagad)" },
  { key: "Bank", label: "ব্যাংক (Bank)" },
  { key: "Offline", label: "অফিস ক্যাশ" },
];

const PayFees = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    students,
    semesters,
    MONTHS,
    selectedMonth,
    settings,
    submitPayment,
  } = useMadrasa();

  const guardianStudents = students.filter((s) => s.guardianId === "grd-01");
  const initialStudent =
    guardianStudents.find((s) => s._id === location.state?.studentId) ||
    guardianStudents[0] ||
    students[0];

  const [studentId, setStudentId] = useState(initialStudent?._id || "");
  const [semesterId, setSemesterId] = useState(
    initialStudent?.semesterId || semesters[0]?._id || ""
  );
  const [month, setMonth] = useState(selectedMonth);
  const [method, setMethod] = useState("bKash");
  const [transactionId, setTransactionId] = useState("");
  const [payerInfo, setPayerInfo] = useState(initialStudent?.guardianPhone || "01712-345678");
  const [bankName, setBankName] = useState("ইসলামী ব্যাংক বাংলাদেশ পিএলসি");
  const [proofUrl, setProofUrl] = useState("");
  const [note, setNote] = useState("");
  const [submittedRecord, setSubmittedRecord] = useState(null);

  const currentStudent = students.find((s) => s._id === studentId) || initialStudent;
  const currentSemester = semesters.find((s) => s._id === semesterId) || semesters[0];

  const handleStudentChange = (id) => {
    setStudentId(id);
    const st = students.find((s) => s._id === id);
    if (st) {
      setSemesterId(st.semesterId);
      setPayerInfo(st.guardianPhone || "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (method !== "Offline" && !transactionId.trim()) {
      toast.error(`অনুগ্রহ করে ${method}-এর ট্রানজেকশন / রেফারেন্স আইডি লিখুন`);
      return;
    }

    try {
      const created = await submitPayment({
        studentId: currentStudent._id,
        semesterId: currentSemester._id,
        semesterName: currentSemester.name,
        month,
        feeType: "মাসিক বেতন ও বোর্ডিং ফি",
        amount: currentStudent.monthlyFee,
        method,
        transactionId:
          transactionId.trim() || `OFF-REQ-${Date.now().toString().slice(-4)}`,
        payerInfo,
        bankName: method === "Bank" ? bankName : "",
        proofUrl,
        note,
        autoVerify: false,
      });
      setSubmittedRecord(created);
      toast.success("পেমেন্ট তথ্য সফলভাবে জমা হয়েছে! স্ট্যাটাস: যাচাইয়ের অপেক্ষায়।");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (submittedRecord) {
    return (
      <div className="max-w-xl mx-auto p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-5">
        <div className="h-16 w-16 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <div>
          <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-500 text-xs font-bold">
            স্ট্যাটাস: যাচাইয়ের অপেক্ষায় (Pending Verification)
          </span>
          <h2 className="text-2xl font-extrabold text-base-content mt-3">
            পেমেন্ট তথ্য সফলভাবে জমা হয়েছে!
          </h2>
          <p className="text-xs text-base-content/60 mt-1">
            মাদ্রাসা কর্তৃপক্ষ আপনার {submittedRecord.method} ট্রানজেকশন যাচাই করে অফিশিয়াল ডিজিটাল রশিদ ইস্যু করবেন।
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-base-content/60">ছাত্রের নাম:</span>
            <span className="font-bold">
              {submittedRecord.studentName} ({submittedRecord.admissionId})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-base-content/60">মাস ও সেমিস্টার:</span>
            <span>
              {MONTH_LABELS_BN[submittedRecord.month] || submittedRecord.month} • {submittedRecord.semesterName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-base-content/60">মাধ্যম ও ট্রানজেকশন আইডি:</span>
            <span className="text-primary font-mono font-bold">
              {submittedRecord.method} • {submittedRecord.transactionId}
            </span>
          </div>
          <div className="flex justify-between text-sm font-black pt-2 border-t border-slate-200 dark:border-slate-800">
            <span>জমাকৃত ফি পরিমাণ:</span>
            <span className="text-emerald-500 font-mono">
              ৳ {Number(submittedRecord.amount).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => setSubmittedRecord(null)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold cursor-pointer"
          >
            অন্য ফি জমা দিন
          </button>
          <button
            onClick={() => navigate("/dashboard/payment-history")}
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold cursor-pointer"
          >
            পেমেন্ট ইতিহাস দেখুন →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
          <CreditCard className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
            অভিভাবক মাসিক ফি জমা দেওয়ার ফরম
          </h1>
          <p className="text-xs text-base-content/60">
            সন্তান, সেমিস্টার ও মাস নির্বাচন করুন → নির্ধারিত ফি যাচাই করুন → বিকাশ, নগদ, ব্যাংক বা ক্যাশের তথ্য জমা দিন
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
      >
        {/* Left Column */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5 text-xs">
          <h3 className="text-sm font-extrabold text-base-content border-b border-slate-200 dark:border-slate-800 pb-3">
            ১. ছাত্র, সেমিস্টার ও ফি-এর মাস নির্বাচন করুন
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-base-content/70 block mb-1">
                সন্তান / ছাত্র নির্বাচন করুন
              </label>
              <select
                value={studentId}
                onChange={(e) => handleStudentChange(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold"
              >
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name} ({s.admissionId})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-base-content/70 block mb-1">
                শিক্ষাবর্ষের সেমিস্টার
              </label>
              <select
                value={semesterId}
                onChange={(e) => setSemesterId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-semibold"
              >
                {semesters.map((sem) => (
                  <option key={sem._id} value={sem._id}>
                    {sem.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-base-content/70 block mb-1">
              ফি প্রদানের মাস
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold"
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>
                  {MONTH_LABELS_BN[m] || m}
                </option>
              ))}
            </select>
          </div>

          <h3 className="text-sm font-extrabold text-base-content border-b border-slate-200 dark:border-slate-800 pb-3 pt-2">
            ২. পেমেন্ট মাধ্যম নির্বাচন ও ট্রানজেকশন তথ্য প্রদান করুন
          </h3>

          {/* Payment Method Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PAYMENT_METHODS.map((m) => (
              <button
                type="button"
                key={m.key}
                onClick={() => setMethod(m.key)}
                className={`py-2.5 rounded-xl font-bold text-xs border transition cursor-pointer ${
                  method === m.key
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                    : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-base-content/70"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Method-Specific Instructions Box */}
          <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20 flex items-start gap-2.5 text-primary">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed">
              <strong>{method} পেমেন্ট নির্দেশনা:</strong>{" "}
              {settings.paymentInstructions?.[method]}
            </p>
          </div>

          {/* Method-Specific Required Fields */}
          {method !== "Offline" ? (
            <div className="space-y-3">
              {method === "Bank" && (
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    ব্যাংকের নাম
                  </label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                    required
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {method === "Bank"
                      ? "ডিপোজিট স্লিপ / রেফারেন্স আইডি *"
                      : `${method} ট্রানজেকশন আইডি (TrxID) *`}
                  </label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder={method === "Bank" ? "IBBL-SLIP-XXXX" : "যেমন: BKX982341KL"}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {method === "Bank" ? "জমাদানকারীর নাম / অ্যাকাউন্ট" : "প্রেরকের মোবাইল নম্বর"}
                  </label>
                  <input
                    type="text"
                    value={payerInfo}
                    onChange={(e) => setPayerInfo(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  পেমেন্ট স্ক্রিনশট / স্লিপের লিংক (ঐচ্ছিক)
                </label>
                <input
                  type="url"
                  value={proofUrl}
                  onChange={(e) => setProofUrl(e.target.value)}
                  placeholder="https://example.com/payment-screenshot.jpg"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  ক্যাশ জমাদানের বিবরণ / জমাদানকারীর নাম
                </label>
                <input
                  type="text"
                  value={payerInfo}
                  onChange={(e) => setPayerInfo(e.target.value)}
                  placeholder="যেমন: মাদ্রাসা অফিসে সরাসরি জমাদান"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                />
              </div>
            </div>
          )}

          <div>
            <label className="font-bold text-base-content/70 block mb-1">
              অতিরিক্ত মন্তব্য / নোট (ঐচ্ছিক)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="মাদ্রাসা হিসাব শাখার জন্য কোনো বার্তা থাকলে লিখুন..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
            />
          </div>
        </div>

        {/* Right Column: Preconfigured Student & Fee Summary Box */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold text-base-content">
              নির্ধারিত মাসিক ফি সারসংক্ষেপ
            </h3>
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-500 text-[10px] font-bold">
              সক্রিয় ফি কাঠামো
            </span>
          </div>

          {currentStudent && (
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-base-content/60">ছাত্রের নাম:</span>
                <span className="font-bold text-base-content">{currentStudent.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/60">ভর্তি আইডি:</span>
                <span className="font-mono font-bold text-primary">
                  {currentStudent.admissionId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/60">জামাত / বিভাগ:</span>
                <span className="font-semibold">{currentStudent.classProgram}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/60">নির্বাচিত সেমিস্টার:</span>
                <span className="font-semibold">{currentSemester?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/60">ফি প্রদানের মাস:</span>
                <span className="font-bold">{MONTH_LABELS_BN[month] || month}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/60">পেমেন্ট মাধ্যম:</span>
                <span className="font-mono font-bold text-primary">{method}</span>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-sm font-extrabold text-base-content">
                  প্রদেয় মাসিক ফি
                </span>
                <span className="text-2xl font-mono font-black text-emerald-500">
                  ৳ {Number(currentStudent.monthlyFee).toLocaleString()}
                </span>
              </div>
            </div>
          )}

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5 text-[11px] text-base-content/60">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
            <span>
              একই ছাত্র ও একই মাসের জন্য ডুপ্লিকেট ফি জমা স্বয়ংক্রিয়ভাবে প্রতিরোধ করা হয়।
            </span>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold shadow-lg shadow-primary/25 hover:opacity-95 transition cursor-pointer"
          >
            <Send className="h-4 w-4" />
            <span>{method} পেমেন্ট তথ্য জমা দিন</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PayFees;
