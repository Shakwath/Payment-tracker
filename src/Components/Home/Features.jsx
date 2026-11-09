import { motion } from "framer-motion";
import { Wallet, TrendingUp, ShieldCheck, CreditCard } from "lucide-react";
import { useTheme } from "../../Context/ThemeProvider";
import { useLanguage } from "../../Context/LanguageContext";

const features = [
  {
    id: "STN-01",
    icon: Wallet,
    titleBn: "দ্রুত মাসিক ফি জমা ও ম্যানুয়াল আপডেট",
    titleEn: "Fast Monthly Fee & Manual Update",
    descBn:
      "অভিভাবকগণ কয়েক ক্লিকেই মাসিক ফি সাবমিট করতে পারেন এবং অ্যাডমিন যেকোনো শিক্ষার্থীর মাসিক বেতন ম্যানুয়ালি আপডেট করতে পারেন।",
    descEn:
      "Guardians can submit monthly fees in a few clicks and Admin can manually update any student's monthly fee status.",
  },
  {
    id: "STN-02",
    icon: TrendingUp,
    titleBn: "পূর্ণাঙ্গ আর্থিক ড্যাশবোর্ড ও PDF রিপোর্ট",
    titleEn: "Complete Financial Ledger & PDF Reports",
    descBn:
      "মাসিক সম্ভাব্য আয়, ভেরিফাইড কালেকশন, বকেয়া, বোর্ডিং খরচ এবং নিট ব্যালেন্সের বিস্তারিত হিসাব ও প্রিন্টেবল PDF প্রতিবেদন।",
    descEn:
      "Track expected collection, verified income, pending dues, boarding expenses, and printable PDF statements.",
  },
  {
    id: "STN-03",
    icon: ShieldCheck,
    titleBn: "ফায়ারবেস অথেনটিকেশন ও ইমেইল রোল কন্ট্রোল",
    titleEn: "Firebase Auth & Email Role Control",
    descBn:
      "অ্যাডমিন, অভিভাবক এবং শিক্ষকদের জন্য ফায়ারবেস ইমেইল ভিত্তিক আলাদা সুরক্ষিত পোর্টাল ও অপরিবর্তনীয় অডিট লগ।",
    descEn:
      "Dedicated Firebase email-based role portals for Admin, Guardians, and Teachers with immutable audit logs.",
  },
  {
    id: "STN-04",
    icon: CreditCard,
    titleBn: "বিকাশ, নগদ, ব্যাংক ও অফিশিয়াল মানি রিসিট",
    titleEn: "bKash, Nagad, Bank & Official Receipts",
    descBn:
      "বিকাশ, নগদ, ব্যাংক স্লিপ অথবা সরাসরি মাদ্রাসার হিসাব শাখায় নগদ জমার মাধ্যমে ফি পরিশোধ ও ২-অংশবিশিষ্ট অফিশিয়াল রশিদ ডাউনলোড।",
    descEn:
      "Pay via bKash, Nagad, Bank slip, or office cash and download two-part perforated official Madrasa receipts.",
  },
];

const Features = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const { t } = useLanguage();

  return (
    <section className={`py-16 transition-colors duration-500 ${dark ? "bg-base-100" : "bg-white"}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
            {t("মারকাযুল ইলমি ওয়াল হুদা", "Markajul Ilm Wal Huda")}
          </span>
          <h2
            className={`mt-2 text-2xl font-extrabold tracking-tight sm:text-4xl ${
              dark ? "text-white" : "text-slate-900"
            }`}
          >
            {t(
              "আমাদের ডিজিটাল ব্যবস্থাপনার বৈশিষ্ট্যসমূহ",
              "Core Features of Our Digital Portal"
            )}
          </h2>
          <p className={`mt-3 text-sm sm:text-base ${dark ? "text-slate-400" : "text-slate-600"}`}>
            {t(
              "শিক্ষার্থী, অভিভাবক, শিক্ষক এবং মাদ্রাসা প্রশাসনের জন্য সহজ ও স্বচ্ছ হিসাব ব্যবস্থাপনা।",
              "Transparent financial and academic management for students, guardians, faculty, and administration."
            )}
          </p>
        </div>

        <div className="mt-12 max-w-6xl mx-auto">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x rounded-2xl border overflow-hidden transition-all duration-300 shadow-sm ${
              dark
                ? "border-slate-800 bg-slate-900/40 divide-slate-800/80"
                : "border-slate-200/90 bg-white divide-slate-200/80"
            }`}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.article
                  key={feature.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group relative flex flex-col justify-between p-7 hover:bg-primary/5 transition-colors duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-center text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-slate-400">
                        {feature.id}
                      </span>
                    </div>

                    <h3
                      className={`mt-6 text-base font-extrabold tracking-tight group-hover:text-primary ${
                        dark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {t(feature.titleBn, feature.titleEn)}
                    </h3>

                    <p
                      className={`mt-2.5 text-xs sm:text-sm leading-relaxed ${
                        dark ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {t(feature.descBn, feature.descEn)}
                    </p>
                  </div>

                  <div className="mt-6 h-0.5 w-0 bg-primary/40 group-hover:w-full transition-all duration-500" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
