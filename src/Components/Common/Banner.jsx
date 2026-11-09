import { Link } from "react-router-dom";
import { FaCheckCircle, FaClock, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useLanguage } from "../../Context/LanguageContext";

const Banner = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-12 sm:pt-16 pb-12 lg:pb-16">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[40rem] h-[25rem] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Official Logo & Banner Card */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:px-7 sm:py-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-primary/25 shadow-xl mb-6">
          <img
            src="/logo.png"
            alt="মারকাযুল ইলমি ওয়াল হুদা লোগো"
            className="h-20 w-20 rounded-2xl object-contain bg-white p-1 border border-slate-200"
          />
          <div className="text-center sm:text-left">
            <p className="text-base sm:text-lg font-bold text-primary">مركز العلم والهدى</p>
            <h2 className="text-2xl sm:text-3xl font-black text-base-content">
              {t("মারকাযুল ইলমি ওয়াল হুদা", "Markajul Ilm Wal Huda")}
            </h2>
            <p className="text-xs sm:text-sm text-base-content/75 font-medium mt-0.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1">
                <FaMapMarkerAlt className="text-primary" />
                {t(
                  "দারুল আনোয়ার, পশ্চিম ফটিকা, হাটহাজারী পৌরসভা, চট্টগ্রাম",
                  "Darul Anwar, West Fotika, Hathazari Municipality, Chattogram"
                )}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 font-bold text-primary">
                <FaPhoneAlt /> {t("০১৭৪১৫১২০১৮", "01741512018")}
              </span>
            </p>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-base-content max-w-3xl mx-auto">
          {t(
            "মাদ্রাসার মাসিক বেতন, ফি ও হিসাব ব্যবস্থাপনা এখন সম্পূর্ণ ডিজিটাল",
            "Madrasa Monthly Tuition, Fee & Accounting Management — Fully Digital"
          )}
        </h1>

        <p className="mt-4 text-sm sm:text-base text-base-content/75 max-w-2xl mx-auto leading-relaxed">
          {t(
            "অভিভাবকগণ বিকাশ, নগদ, ব্যাংক অথবা সরাসরি অফিসে মাসিক ফি জমা দিতে পারবেন এবং অ্যাডমিন প্যানেল থেকে রিয়েল-টাইম ভেরিফিকেশন, ব্যয়, শিক্ষকদের বেতন ও PDF রিপোর্ট পরিচালনা করা যাবে।",
            "Guardians can submit monthly fees via bKash, Nagad, Bank, or Offline counter while Admin manages real-time verification, expenses, faculty payroll, and official PDF receipts."
          )}
        </p>

        {/* Action Buttons */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/dashboard"
            className="rounded-2xl bg-primary hover:opacity-95 text-white px-8 py-3.5 font-bold text-sm shadow-xl shadow-primary/25 transition-all"
          >
            {t("ড্যাশবোর্ডে প্রবেশ করুন", "Enter Dashboard")}
          </Link>

          <Link
            to="/payment"
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-base-content px-8 py-3.5 font-bold text-sm hover:border-primary transition-all"
          >
            {t("মাসিক ফি পরিশোধ করুন", "Pay Monthly Fee")}
          </Link>
        </div>
      </div>

      {/* Preview Box */}
      <div className="mt-12 max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="rounded-3xl border border-slate-200/90 dark:border-purple-900/40 bg-white/95 dark:bg-slate-900/95 shadow-2xl p-6 sm:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-xl object-contain" />
              <div>
                <h3 className="font-extrabold text-base text-base-content">
                  {t(
                    "মারকাযুল ইলমি ওয়াল হুদা — লাইভ হিসাব ড্যাশবোর্ড",
                    "Markajul Ilm Wal Huda — Live Finance Dashboard"
                  )}
                </h3>
                <p className="text-xs text-base-content/60">
                  {t(
                    "শিক্ষার্থী ফি, পেন্ডিং যাচাই, বোর্ডিং খরচ ও শিক্ষক বেতন ট্র্যাকার",
                    "Student fees, pending verification, boarding expenses & teacher payroll tracker"
                  )}
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-500 text-xs font-bold">
              {t("সক্রিয় সেশন ২০২৬", "Active Session 2026")}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-base-200/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-primary block">
                {t("মোট সক্রিয় শিক্ষার্থী", "Active Students")}
              </span>
              <span className="text-xl font-black text-base-content mt-1 block">
                {t("১৫৬ জন", "156")}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-base-200/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-emerald-500 block">
                {t("চলতি মাসের আদায়", "Verified Collection")}
              </span>
              <span className="text-xl font-black text-base-content mt-1 block">
                {t("৳ ৮৫,৪৫০", "৳ 85,450")}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-base-200/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-amber-500 block">
                {t("যাচাইয়ের অপেক্ষায়", "Pending Verification")}
              </span>
              <span className="text-xl font-black text-base-content mt-1 block">
                {t("২ টি পেমেন্ট", "2 Payments")}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-base-200/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold text-purple-500 block">
                {t("নিট ব্যালেন্স", "Net Balance")}
              </span>
              <span className="text-xl font-black text-base-content mt-1 block">
                {t("৳ ৭৯,৩৫০", "৳ 79,350")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                  <FaCheckCircle />
                </div>
                <div>
                  <p className="font-bold text-base-content">
                    {t(
                      "আব্দুল্লাহ আল মামুন — হিফজ বিভাগ",
                      "Abdullah Al Mamun — Hifz Department"
                    )}
                  </p>
                  <p className="text-[11px] text-base-content/60">
                    {t(
                      "বিকাশ পেমেন্ট • ভেরিফাইড রশিদ #RCP-2026-1001",
                      "bKash Payment • Verified Receipt #RCP-2026-1001"
                    )}
                  </p>
                </div>
              </div>
              <span className="font-bold text-primary">{t("৳ ২,৮০০", "৳ 2,800")}</span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-500 flex items-center justify-center">
                  <FaClock />
                </div>
                <div>
                  <p className="font-bold text-base-content">
                    {t("আয়েশা সিদ্দিকা — মিযান জামাত", "Ayesha Siddiqua — Mizan Class")}
                  </p>
                  <p className="text-[11px] text-base-content/60">
                    {t(
                      "নগদ পেমেন্ট • অ্যাডমিন ভেরিফিকেশন পেন্ডিং",
                      "Nagad Payment • Pending Admin Verification"
                    )}
                  </p>
                </div>
              </div>
              <span className="font-bold text-amber-500">{t("৳ ২,৫০০", "৳ 2,500")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
