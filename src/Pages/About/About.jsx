import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, CreditCard } from "lucide-react";
import { useLanguage } from "../../Context/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
      {/* Official Banner Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-center gap-8">
        <img
          src="/logo.png"
          alt="মারকাযুল ইলমি ওয়াল হুদা"
          className="h-32 w-32 rounded-3xl object-contain bg-white p-2 border border-primary/25 shadow-md shrink-0"
        />
        <div className="space-y-3 text-center md:text-left">
          <p className="text-lg font-bold text-primary">مركز العلم والهدى</p>
          <h1 className="text-3xl sm:text-4xl font-black text-base-content">
            {t("মারকাযুল ইলমি ওয়াল হুদা", "Markajul Ilm Wal Huda")}
          </h1>
          <p className="text-sm font-semibold text-base-content/75">
            {t(
              "দারুল আনোয়ার, পশ্চিম ফটিকা, হাটহাজারী পৌরসভা, চট্টগ্রাম। মোবাইলঃ ০১৭৪১৫১২০১৮",
              "Darul Anwar, West Fotika, Hathazari Municipality, Chattogram. Phone: 01741512018"
            )}
          </p>
          <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed max-w-2xl">
            {t(
              "আহলে সুন্নাত ওয়াল জামাআতের আকিদা অনুযায়ী পরিচালিত একটি আদর্শ দ্বীনি শিক্ষাপ্রতিষ্ঠান। নূরানী, নাযেরা, হিফজুল কুরআন এবং কিতাব বিভাগের শিক্ষার্থীদের পড়াশোনার পাশাপাশি স্বচ্ছ আর্থিক হিসাব ও অভিভাবক সেবার লক্ষ্যে আমাদের এই ডিজিটাল পেমেন্ট ও একাডেমিক পোর্টাল।",
              "An ideal Islamic educational institution offering Noorani, Nazera, Hifzul Quran, and Kitab departments with a transparent digital fee and academic progress portal for guardians and faculty."
            )}
          </p>
          <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20"
            >
              <span>{t("ড্যাশবোর্ডে প্রবেশ করুন", "Enter Dashboard")}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/payment"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold hover:border-primary"
            >
              <span>{t("মাসিক ফি জমা দিন", "Pay Monthly Fee")}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Departments & Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="text-base font-extrabold text-base-content">
            {t("আমাদের বিভাগসমূহ", "Academic Departments")}
          </h3>
          <p className="text-xs text-base-content/70 leading-relaxed">
            {t(
              "নূরানী ও নাযেরা বিভাগ, হিফজুল কুরআন বিভাগ এবং কিতাব বিভাগ (মিযান, নাহবেমীর, শরহে বেকায়া ও উচ্চতর জামাত)।",
              "Noorani & Nazera Department, Hifzul Quran Department, and Kitab Department (Mizan, Nahbemir, Sharhe Bekaya & higher classes)."
            )}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CreditCard className="h-5 w-5" />
          </div>
          <h3 className="text-base font-extrabold text-base-content">
            {t("সহজ অনলাইন ও অফলাইন ফি", "Online & Offline Fee Payment")}
          </h3>
          <p className="text-xs text-base-content/70 leading-relaxed">
            {t(
              "বিকাশ, নগদ, ব্যাংক ডিপোজিট অথবা সরাসরি অফিসে নগদ ফি প্রদান এবং ভেরিফিকেশনের পর তাৎক্ষণিক ২-অংশবিশিষ্ট ডিজিটাল রশিদ গ্রহণ।",
              "Pay via bKash, Nagad, Bank deposit, or cash at the office and receive instant two-part verified receipts."
            )}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="h-11 w-11 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Users className="h-5 w-5" />
          </div>
          <h3 className="text-base font-extrabold text-base-content">
            {t("অভিভাবক ও শিক্ষক পোর্টাল", "Guardian & Teacher Portals")}
          </h3>
          <p className="text-xs text-base-content/70 leading-relaxed">
            {t(
              "অভিভাবকগণ সন্তানদের মাসিক পরীক্ষার ফলাফল, উপস্থিতির হার ও অগ্রগতির প্রতিবেদন দেখতে পারবেন।",
              "Guardians can track their children's monthly exam results, attendance percentage, and teacher progress remarks."
            )}
          </p>
        </div>
      </div>
    </main>
  );
};

export default About;
