import { Printer } from "lucide-react";
import { MONTH_LABELS_BN } from "../../Context/MadrasaContext";
import { useLanguage } from "../../Context/LanguageContext";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toBnDigits = (val) =>
  String(val ?? "").replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

// Convert integer Taka amount into Bengali words (e.g., 2700 -> "দুই হাজার সাতশত টাকা মাত্র")
export const amountToWordsBn = (num) => {
  const n = Math.round(Number(num) || 0);
  if (n <= 0) return "শূন্য টাকা মাত্র";

  const units = [
    "",
    "এক",
    "দুই",
    "তিন",
    "চার",
    "পাঁচ",
    "ছয়",
    "সাত",
    "আট",
    "নয়",
    "দশ",
    "এগারো",
    "বারো",
    "তেরো",
    "চৌদ্দ",
    "পনেরো",
    "ষোলো",
    "সতেরো",
    "আঠারো",
    "উনিশ",
    "বিশ",
    "একুশ",
    "বাইশ",
    "তেইশ",
    "চব্বিশ",
    "পঁচিশ",
    "ছাব্বিশ",
    "সাতাশ",
    "আটাশ",
    "ঊনত্রিশ",
    "ত্রিশ",
    "একত্রিশ",
    "বত্রিশ",
    "তেত্রিশ",
    "চৌত্রিশ",
    "পঁয়ত্রিশ",
    "ছত্রিশ",
    "সাঁইত্রিশ",
    "আটত্রিশ",
    "ঊনচল্লিশ",
    "চল্লিশ",
    "একচল্লিশ",
    "বিয়াল্লিশ",
    "তেতাল্লিশ",
    "চুয়াল্লিশ",
    "পঁয়তাল্লিশ",
    "ছেচল্লিশ",
    "সাতচল্লিশ",
    "আটচল্লিশ",
    "ঊনপঞ্চাশ",
    "পঞ্চাশ",
    "একান্ন",
    "বায়ান্ন",
    "তিপ্পান্ন",
    "চুয়ান্ন",
    "পঞ্চান্ন",
    "ছাপ্পান্ন",
    "সাতান্ন",
    "আটান্ন",
    "ঊনষাট",
    "ষাট",
    "একষট্টি",
    "বাষট্টি",
    "তেষট্টি",
    "চৌষট্টি",
    "পঁয়ষট্টি",
    "ছেষট্টি",
    "সাতষট্টি",
    "আটষট্টি",
    "ঊনসত্তর",
    "সত্তর",
    "একাত্তর",
    "বাহাত্তর",
    "তিয়াত্তর",
    "চুয়াত্তর",
    "পঁচাত্তর",
    "ছিয়াত্তর",
    "সাতাত্তর",
    "আটাত্তর",
    "ঊনআশি",
    "আশি",
    "একাশি",
    "বিরাশি",
    "তিরাশি",
    "চুরাশি",
    "পঁচাশি",
    "ছিয়াশি",
    "সাতাশি",
    "আটাশি",
    "ঊননব্বই",
    "নব্বই",
    "একানব্বই",
    "বিরানব্বই",
    "তিরানব্বই",
    "চুরানব্বই",
    "পঁচানব্বই",
    "ছিয়ানব্বই",
    "সাতানব্বই",
    "আটানব্বই",
    "নিরানব্বই",
  ];

  const parts = [];
  let rem = n;

  const lakh = Math.floor(rem / 100000);
  if (lakh > 0) {
    parts.push(`${units[lakh] || toBnDigits(lakh)} লক্ষ`);
    rem %= 100000;
  }

  const thousand = Math.floor(rem / 1000);
  if (thousand > 0) {
    parts.push(`${units[thousand] || toBnDigits(thousand)} হাজার`);
    rem %= 1000;
  }

  const hundred = Math.floor(rem / 100);
  if (hundred > 0) {
    parts.push(`${units[hundred]}শত`);
    rem %= 100;
  }

  if (rem > 0) {
    parts.push(units[rem] || toBnDigits(rem));
  }

  return `${parts.join(" ")} টাকা মাত্র`;
};

export const amountToWordsEn = (num) => {
  const n = Math.round(Number(num) || 0);
  if (n <= 0) return "Zero Taka Only";
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const underThousand = (val) => {
    let str = "";
    if (val >= 100) {
      str += `${ones[Math.floor(val / 100)]} Hundred `;
      val %= 100;
    }
    if (val >= 20) {
      str += `${tens[Math.floor(val / 10)]} `;
      val %= 10;
    }
    if (val > 0) {
      str += `${ones[val]} `;
    }
    return str.trim();
  };

  let res = "";
  let rem = n;
  if (rem >= 1000) {
    res += `${underThousand(Math.floor(rem / 1000))} Thousand `;
    rem %= 1000;
  }
  if (rem > 0) {
    res += underThousand(rem);
  }
  return `${res.trim()} Taka Only`;
};

const MadrasaReceiptSlip = ({ receipt, student, settings, showPrintButton = true }) => {
  const { lang, t } = useLanguage();

  if (!receipt) return null;

  // Extract serial number like 172 from RCP-2026-1001 or _id
  const rawReceiptNo = receipt.receiptNumber || "RCP-2026-172";
  const numericSerial = rawReceiptNo.replace(/\D/g, "").slice(-3) || "172";

  // Parse Date into DD | MM | YY
  const dateObj = receipt.verifiedAt
    ? new Date(receipt.verifiedAt)
    : receipt.submittedAt
    ? new Date(receipt.submittedAt)
    : new Date();
  const dd = String(dateObj.getDate()).padStart(2, "0");
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const yy = String(dateObj.getFullYear()).slice(-2);

  const studentName = receipt.studentName || student?.name || "—";
  const classLabel =
    student?.classProgram ||
    receipt.classProgram ||
    t("হিফয / কিতাব বিভাগ", "Hifz / Kitab Dept");
  const addressLabel =
    student?.address ||
    t("পশ্চিম ফটিকা, হাটহাজারী, চট্টগ্রাম", "Hathazari, Chattogram");
  const isResidential = student?.residenceType !== "Non-Residential";

  const monthLabel =
    lang === "bn"
      ? MONTH_LABELS_BN[receipt.month] || receipt.month
      : receipt.month;

  const amountVal = Number(receipt.amount || 0);
  const amountDisplay =
    lang === "bn" ? `${toBnDigits(amountVal)}/=` : `${amountVal.toLocaleString()}/=`;
  const amountWords =
    lang === "bn" ? amountToWordsBn(amountVal) : amountToWordsEn(amountVal);

  const madrasaTitleBn = settings?.madrasaName || "মারকাযুল ইলমি ওয়াল হুদা";
  const madrasaTitleEn = settings?.madrasaNameEn || "Markajul Ilm Wal Huda";
  const madrasaAddr =
    settings?.address ||
    "দারুল আনোয়ার, পশ্চিম ফটিকা, হাটহাজারী পৌরসভা, চট্টগ্রাম। মোবাইলঃ ০১৭৪১৫১২০১৮";

  return (
    <div className="space-y-3">
      {/* Traditional 2-Part Perforated Madrasa Receipt Paper */}
      <div className="rounded-2xl overflow-hidden border-2 border-emerald-900/30 shadow-lg bg-gradient-to-br from-[#ebf5ee] via-[#f3f9f5] to-[#e4f0e8] text-slate-900 print:shadow-none print:border-slate-400">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT PART: Counterfoil / Office Copy (অফিস কপি) */}
          <div className="lg:col-span-5 p-5 sm:p-6 border-b-2 lg:border-b-0 lg:border-r-2 border-dashed border-emerald-900/40 flex flex-col justify-between space-y-3.5 relative">
            {/* Top Header */}
            <div className="text-center border-b border-emerald-900/20 pb-2.5">
              <div className="flex items-center justify-between text-[10px] font-bold text-emerald-900/70 mb-0.5">
                <span>{t("অফিস কপি", "Office Stub")}</span>
                <span className="font-mono">{rawReceiptNo}</span>
              </div>
              <p className="text-lg sm:text-xl font-black text-emerald-900 tracking-wide leading-tight">
                مركز العلم والهدى
              </p>
              <h4 className="text-base sm:text-lg font-black text-emerald-950 leading-tight">
                {lang === "bn" ? madrasaTitleBn : madrasaTitleEn}
              </h4>
              <p className="text-[10px] text-emerald-950/80 leading-snug mt-0.5">
                {madrasaAddr}
              </p>
            </div>

            {/* Body Fields */}
            <div className="space-y-2.5 text-xs">
              {/* Row 1: Serial & Date Box */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-bold text-emerald-950">{t("নং-", "No-")}</span>
                  <span className="text-base font-black font-mono text-slate-900">
                    {numericSerial}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-emerald-950">{t("তারিখ:", "Date:")}</span>
                  <div className="inline-grid grid-cols-3 border border-emerald-900/60 bg-white/70 text-[11px] font-bold text-blue-900">
                    <span className="px-1.5 py-0.5 border-r border-emerald-900/50 text-center">
                      {lang === "bn" ? toBnDigits(dd) : dd}
                    </span>
                    <span className="px-1.5 py-0.5 border-r border-emerald-900/50 text-center">
                      {lang === "bn" ? toBnDigits(mm) : mm}
                    </span>
                    <span className="px-1.5 py-0.5 text-center">
                      {lang === "bn" ? toBnDigits(yy) : yy}
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 2: Name & Class Box */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-baseline gap-1 flex-1 min-w-0">
                  <span className="font-bold shrink-0">{t("নাম:", "Name:")}</span>
                  <span className="flex-1 border-b border-dotted border-slate-700 font-bold text-blue-900 px-1 truncate">
                    {studentName}
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="font-bold">{t("শ্রেণি", "Class")}</span>
                  <span className="px-2 py-0.5 border border-emerald-900/60 bg-white/70 font-bold text-blue-900 text-[11px] max-w-[110px] truncate">
                    {classLabel}
                  </span>
                </div>
              </div>

              {/* Row 3: Address & Residential Checkboxes */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-baseline gap-1 flex-1 min-w-0">
                  <span className="font-bold shrink-0">{t("ঠিকানা", "Addr:")}</span>
                  <span className="flex-1 border-b border-dotted border-slate-700 text-blue-900 px-1 truncate text-[11px]">
                    {addressLabel}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 text-[11px] font-bold">
                  <label className="inline-flex items-center gap-1">
                    <span className="w-3.5 h-3.5 border border-emerald-900/70 bg-white inline-flex items-center justify-center text-blue-900 text-[10px]">
                      {isResidential ? "✓" : ""}
                    </span>
                    <span>{t("আবাসিক", "Res.")}</span>
                  </label>
                  <label className="inline-flex items-center gap-1">
                    <span className="w-3.5 h-3.5 border border-emerald-900/70 bg-white inline-flex items-center justify-center text-blue-900 text-[10px]">
                      {!isResidential ? "✓" : ""}
                    </span>
                    <span>{t("অনাবাসিক", "Non-Res")}</span>
                  </label>
                </div>
              </div>

              {/* Row 4: Fee Type & Month */}
              <div className="flex items-baseline gap-1">
                <span className="font-bold shrink-0 text-[11px]">
                  {t(
                    "ভর্তি ফি/পরীক্ষার ফি/✓মাসিক বেতন/খোরাকী",
                    "Adm / Exam / ✓Monthly Tuition"
                  )}
                </span>
                <span className="flex-1 border-b border-dotted border-slate-700 font-bold text-blue-900 px-1 text-center">
                  ({monthLabel})
                </span>
              </div>

              {/* Row 5: Misc & Boxed Amount */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-baseline gap-1 flex-1 min-w-0">
                  <span className="font-bold shrink-0">{t("বিবিধ", "Method")}</span>
                  <span className="flex-1 border-b border-dotted border-slate-700 font-mono text-[11px] text-blue-900 px-1 truncate">
                    {receipt.method} ({receipt.transactionId})
                  </span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="font-bold">{t("পরিমাণ", "Amt")}</span>
                  <span className="px-2.5 py-0.5 border border-emerald-900/70 bg-white/80 font-black text-blue-900 text-sm">
                    {amountDisplay}
                  </span>
                </div>
              </div>

              {/* Row 6: Amount in Words */}
              <div className="flex items-baseline gap-1">
                <span className="font-bold shrink-0">{t("কথায়:", "Words:")}</span>
                <span className="flex-1 border-b border-dotted border-slate-700 font-bold text-blue-900 px-1">
                  {amountWords}
                </span>
              </div>
            </div>

            {/* Footer Signatures */}
            <div className="pt-4 flex items-end justify-between text-xs font-bold text-emerald-950">
              <div className="text-center">
                <div className="w-20 border-t border-emerald-900/50 pt-0.5">
                  {t("পরিচালক", "Director")}
                </div>
              </div>
              <div className="text-center">
                <p className="text-[11px] italic font-serif text-blue-900 -mb-0.5">
                  {receipt.verifiedBy || "হিসাব শাখা"}
                </p>
                <div className="w-24 border-t border-emerald-900/50 pt-0.5">
                  {t("উসূলকারক", "Collector")}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PART: Main Guardian / Student Receipt (মূল রশিদ) */}
          <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between space-y-4">
            {/* Top Header with Official Logo */}
            <div className="flex items-center gap-3.5 border-b border-emerald-900/20 pb-3">
              <div className="shrink-0 text-center">
                <img
                  src="/logo.png"
                  alt={madrasaTitleBn}
                  className="h-14 w-14 sm:h-16 sm:w-16 rounded-xl object-contain bg-white p-1 border border-emerald-900/20 shadow-sm mx-auto"
                />
                <span className="block text-[9px] font-bold text-emerald-950 mt-0.5">
                  মারকাযুল ইলমি ওয়াল হুদা
                </span>
              </div>

              <div className="flex-1 text-center">
                <div className="flex items-center justify-between text-[10px] font-bold text-emerald-900/75">
                  <span>{t("অভিভাবক / ছাত্র কপি", "Guardian / Student Copy")}</span>
                  <span className="font-mono">{rawReceiptNo}</span>
                </div>
                <p className="text-xl sm:text-2xl font-black text-emerald-900 tracking-wide leading-tight">
                  مركز العلم والهدى
                </p>
                <h3 className="text-lg sm:text-2xl font-black text-emerald-950 leading-tight">
                  {lang === "bn" ? madrasaTitleBn : madrasaTitleEn}
                </h3>
                <p className="text-[11px] text-emerald-950/85 mt-0.5">{madrasaAddr}</p>
              </div>
            </div>

            {/* Main Receipt Body Fields */}
            <div className="space-y-3 text-xs sm:text-sm">
              {/* Row 1: Serial & Boxed Date */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-emerald-950">{t("নং", "No")}</span>
                  <span className="text-lg font-black font-mono text-slate-900">
                    {numericSerial}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-900/70">
                    ({t("ভর্তি আইডি:", "ID:")} {receipt.admissionId})
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-emerald-950">{t("তারিখ:", "Date:")}</span>
                  <div className="inline-grid grid-cols-3 border border-emerald-900/70 bg-white/80 text-xs font-bold text-blue-900 shadow-2xs">
                    <span className="px-2 py-0.5 border-r border-emerald-900/50 text-center">
                      {lang === "bn" ? toBnDigits(dd) : dd}
                    </span>
                    <span className="px-2 py-0.5 border-r border-emerald-900/50 text-center">
                      {lang === "bn" ? toBnDigits(mm) : mm}
                    </span>
                    <span className="px-2 py-0.5 text-center">
                      {lang === "bn" ? toBnDigits(yy) : yy}
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 2: Student Name & Class Box */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-1.5 flex-1 min-w-0">
                  <span className="font-bold shrink-0">{t("নাম:", "Name:")}</span>
                  <span className="flex-1 border-b border-dotted border-slate-700 font-extrabold text-blue-900 px-2 text-sm sm:text-base truncate">
                    {studentName}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold">{t("শ্রেণি", "Class")}</span>
                  <span className="px-3 py-0.5 border border-emerald-900/70 bg-white/80 font-bold text-blue-900 text-xs">
                    {classLabel}
                  </span>
                </div>
              </div>

              {/* Row 3: Address & Residential / Non-Residential Checkboxes */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-1.5 flex-1 min-w-0">
                  <span className="font-bold shrink-0">{t("ঠিকানা", "Address")}</span>
                  <span className="flex-1 border-b border-dotted border-slate-700 text-blue-900 px-2 truncate text-xs">
                    {addressLabel}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0 text-xs font-bold">
                  <label className="inline-flex items-center gap-1.5">
                    <span className="w-4 h-4 border border-emerald-900/70 bg-white inline-flex items-center justify-center text-blue-900 text-xs font-black">
                      {isResidential ? "✓" : ""}
                    </span>
                    <span>{t("আবাসিক", "Residential")}</span>
                  </label>
                  <label className="inline-flex items-center gap-1.5">
                    <span className="w-4 h-4 border border-emerald-900/70 bg-white inline-flex items-center justify-center text-blue-900 text-xs font-black">
                      {!isResidential ? "✓" : ""}
                    </span>
                    <span>{t("অনাবাসিক", "Non-Residential")}</span>
                  </label>
                </div>
              </div>

              {/* Row 4: Fee Type & Month */}
              <div className="flex items-baseline gap-2">
                <span className="font-bold shrink-0 text-xs">
                  {t(
                    "ভর্তি ফি / পরীক্ষার ফি / ✓ মাসিক বেতন / খোরাকী",
                    "Admission Fee / Exam Fee / ✓ Monthly Tuition / Boarding"
                  )}
                </span>
                <span className="flex-1 border-b border-dotted border-slate-700 font-extrabold text-blue-900 px-2 text-center">
                  ({monthLabel} • {receipt.semesterName || ""})
                </span>
              </div>

              {/* Row 5: Misc / Method & Boxed Amount */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-1.5 flex-1 min-w-0">
                  <span className="font-bold shrink-0">{t("বিবিধ", "Method/Ref")}</span>
                  <span className="flex-1 border-b border-dotted border-slate-700 font-mono text-xs text-blue-900 px-2 truncate">
                    {receipt.method} • TrxID: {receipt.transactionId}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-bold">{t("পরিমাণ", "Amount")}</span>
                  <span className="px-4 py-1 border border-emerald-900/80 bg-white/90 font-black text-blue-900 text-base shadow-2xs">
                    ৳ {amountDisplay}
                  </span>
                </div>
              </div>

              {/* Row 6: Amount in Words */}
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold shrink-0">{t("কথায়", "In Words")}</span>
                <span className="flex-1 border-b border-dotted border-slate-700 font-extrabold text-blue-900 px-2">
                  {amountWords}
                </span>
              </div>
            </div>

            {/* Footer Signatures */}
            <div className="pt-5 flex items-end justify-between text-xs sm:text-sm font-bold text-emerald-950">
              <div className="text-center">
                <div className="w-28 border-t border-emerald-900/60 pt-1">
                  {t("পরিচালক", "Director / Muhtamim")}
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs italic font-serif text-blue-900 mb-0.5">
                  {receipt.verifiedBy || "মাদ্রাসা হিসাব শাখা"}
                </p>
                <div className="w-32 border-t border-emerald-900/60 pt-1">
                  {t("উসূলকারক", "Authorized Collector")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Action Bar */}
      {showPrintButton && (
        <div className="flex justify-end print:hidden">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:opacity-95 transition cursor-pointer"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>
              {t(
                "অফিশিয়াল রশিদ ডাউনলোড / প্রিন্ট করুন",
                "Download / Print Official Receipt"
              )}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MadrasaReceiptSlip;

