import { motion } from "framer-motion";
import { ShieldCheck, Zap, BarChart3, CreditCard } from "lucide-react";
import { useTheme } from "../../Context/ThemeProvider";

const features = [
  {
    icon: Zap,
    title: "Instant Payments",
    description: "Pay student tuition and subscription fees in seconds using local mobile banking or international cards.",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Secure Transactions",
    description: "All payments are processed securely via SSLCommerz. We support full data encryption and safe protocols.",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Keep track of all fee collections, filter payments by month, and analyze subscription trends effortlessly.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    icon: CreditCard,
    title: "Diverse Gateways",
    description: "Supports bKash, Nagad, Rocket, and traditional debit/credit cards for ultimate transactional flexibility.",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
];

const Features = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <section className={`py-20 transition-all duration-500 ${dark ? "bg-slate-950" : "bg-gradient-to-b from-white to-amber-50/20"}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-primary uppercase tracking-widest">
            Key Features
          </p>
          <h2 className={`mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl ${dark ? "text-white" : "text-slate-900"}`}>
            Why Choose PaymentTrack?
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            A comprehensive, simple, and elegant solution for student fee collection and tuition payment tracking.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    dark ? "border-slate-800 bg-slate-900/40 hover:border-amber-500/50" : "border-slate-100 bg-white hover:border-amber-300"
                  }`}
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${feature.bgColor}`}>
                      <Icon className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
                    </div>
                    <span className={dark ? "text-white" : "text-slate-900"}>{feature.title}</span>
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                    <p className="flex-auto text-sm">{feature.description}</p>
                  </dd>
                </motion.div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Features;
