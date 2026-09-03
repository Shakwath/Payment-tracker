import { motion } from "framer-motion";
import { Wallet, TrendingUp, ShieldCheck, CreditCard } from "lucide-react";
import { useTheme } from "../../Context/ThemeProvider";

const features = [
  {
    id: "STN-01",
    icon: Wallet,
    title: "Instant Logging",
    description:
      "Simple, structured record forms that capture payments in seconds. Keep track of descriptions, tags, and amounts on the go.",
    iconColor: "text-amber-500",
  },
  {
    id: "STN-02",
    icon: TrendingUp,
    title: "Insight Analytics",
    description:
      "Aggregated summaries and interactive metrics that break down histories so you can visualize cashflow trends over time.",
    iconColor: "text-amber-500",
  },
  {
    id: "STN-03",
    icon: ShieldCheck,
    title: "The Vault Security",
    description:
      "Your transaction records are safely hosted and securely validated, ensuring complete privacy and read-only integrity for your data.",
    iconColor: "text-amber-500",
  },
  {
    id: "STN-04",
    icon: CreditCard,
    title: "Diverse Gateways",
    description:
      "Supports bKash, Nagad, Rocket, and traditional debit/credit cards for ultimate transactional flexibility and ease.",
    iconColor: "text-amber-500",
  },
];

const Features = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <section
      className={`py-20 transition-colors duration-500 ${
        dark ? "bg-base-100" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Key Architecture
          </span>
          <h2
            className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${
              dark ? "text-white" : "text-slate-900"
            }`}
          >
            Why Choose PaymentTrack?
          </h2>
          <p className={`mt-4 text-base leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>
            A comprehensive, structured box-grid architecture for effortless tuition tracking and payment logging.
          </p>
        </div>

        {/* Connected Box Shape Container Grid (Matching exact user screenshot) */}
        <div className="mt-14 max-w-6xl mx-auto">
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
                  className={`group relative flex flex-col justify-between p-7 lg:p-8 transition-colors duration-300 ${
                    dark
                      ? "hover:bg-primary/5"
                      : "hover:bg-primary/[0.02]"
                  }`}
                >
                  <div>
                    {/* Top Row: Icon on left, STN ID on right */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-center text-primary">
                        <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                      </div>
                      <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                        {feature.id}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`mt-7 text-lg font-bold tracking-tight transition-colors group-hover:text-primary ${
                        dark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        dark ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom subtle accent line on hover */}
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
