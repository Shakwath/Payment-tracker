import { Link } from "react-router-dom";
import { FaFacebookF, FaPhoneAlt, FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";
import { useLanguage } from "../../Context/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="w-full pt-8 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:hidden">
      <div className="rounded-3xl border border-slate-200/90 dark:border-purple-900/40 bg-white/95 dark:bg-slate-900/90 shadow-md backdrop-blur-md overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3.5 text-base-content">
              <img
                src="/logo.png"
                alt="মারকাযুল ইলমি ওয়াল হুদা"
                className="h-14 w-14 rounded-2xl object-contain bg-white p-1 border border-primary/20 shadow-sm"
              />
              <div>
                <p className="text-xs font-bold text-primary">مركز العلم والهدى</p>
                <h2 className="text-lg sm:text-xl font-extrabold text-base-content">
                  {t("মারকাযুল ইলমি ওয়াল হুদা", "Markajul Ilm Wal Huda")}
                </h2>
                <p className="text-[11px] font-mono text-base-content/60">
                  Markajul Ilm Wal Huda
                </p>
              </div>
            </Link>

            <div className="space-y-1.5 text-xs text-base-content/75">
              <p className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-primary mt-1 shrink-0" />
                <span>
                  {t(
                    "দারুল আনোয়ার, পশ্চিম ফটিকা, হাটহাজারী পৌরসভা, চট্টগ্রাম।",
                    "Darul Anwar, West Fotika, Hathazari Municipality, Chattogram."
                  )}
                </span>
              </p>
              <p className="flex items-center gap-2 font-bold">
                <FaPhoneAlt className="text-primary shrink-0" />
                <span>{t("মোবাইলঃ ০১৭৪১৫১২০১৮", "Phone: 01741512018")}</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-primary">
              {t("গুরুত্বপূর্ণ লিংকসমূহ", "Quick Links")}
            </h3>
            <ul className="space-y-2 text-xs font-medium text-base-content/75">
              <li>
                <Link to="/dashboard" className="hover:text-primary transition">
                  {t("ড্যাশবোর্ড প্যানেল", "Dashboard Panel")}
                </Link>
              </li>
              <li>
                <Link to="/payment" className="hover:text-primary transition">
                  {t("মাসিক ফি পরিশোধ", "Pay Monthly Fee")}
                </Link>
              </li>
              <li>
                <Link to="/payment-history" className="hover:text-primary transition">
                  {t("পেমেন্ট হিস্ট্রি ও রশিদ", "Payment History & Receipts")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition">
                  {t("মাদ্রাসা পরিচিতি", "About Madrasa")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Channels */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <FaShieldAlt />
              <span>{t("গ্রহণযোগ্য পেমেন্ট মাধ্যম", "Accepted Payment Channels")}</span>
            </h3>
            <p className="text-xs text-base-content/70 leading-relaxed">
              {t(
                "অভিভাবকগণ ঘরে বসেই বিকাশ, নগদ, ব্যাংক ডিপোজিট অথবা সরাসরি মাদ্রাসার হিসাব শাখায় অফলাইনে মাসিক ফি জমা দিতে পারবেন।",
                "Guardians can pay monthly fees via bKash, Nagad, Bank deposit, or cash at the Madrasa accounts office."
              )}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1.5 rounded-xl bg-[#D81B60] text-white text-xs font-bold">
                {t("বিকাশ (bKash)", "bKash")}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-[#F15A24] text-white text-xs font-bold">
                {t("নগদ (Nagad)", "Nagad")}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold">
                {t("ব্যাংক (Bank)", "Bank")}
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold">
                {t("অফিস ক্যাশ (Offline)", "Office Cash")}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-base-content/60">
          <p>
            &copy; {currentYear}{" "}
            {t(
              "মারকাযুল ইলমি ওয়াল হুদা (Markajul Ilm Wal Huda) — সর্বস্বত্ব সংরক্ষিত।",
              "Markajul Ilm Wal Huda — All Rights Reserved."
            )}
          </p>
          <div className="flex items-center gap-3">
            <a
              href="tel:01741512018"
              className="inline-flex items-center gap-1.5 text-primary font-bold"
            >
              <FaPhoneAlt /> {t("০১৭৪১৫১২০১৮", "01741512018")}
            </a>
            <span className="h-4 w-[1px] bg-slate-300 dark:bg-slate-700" />
            <span className="inline-flex items-center gap-1">
              <FaFacebookF className="text-primary" />{" "}
              {t("অফিশিয়াল পেজ", "Official Page")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
