import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Wallet, TrendingUp, ShieldCheck } from "lucide-react";
import { useTheme } from "../../Context/ThemeProvider";
import { ScrollRestoration } from "react-router-dom";

/* ------------------------------------------------------------------ */
/*  Motion primitives — one reveal, reused everywhere                  */
/* ------------------------------------------------------------------ */

const useReveal = () => {
  const reduce = useReducedMotion();
  return {
    initial: reduce ? undefined : { opacity: 0, y: 16 },
    whileInView: reduce ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-15% 0px" },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  };
};

const Reveal = ({ delay = 0, className, children }) => {
  const reveal = useReveal();
  return (
    <motion.div
      {...reveal}
      transition={{ ...reveal.transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Small shared pieces                                                */
/* ------------------------------------------------------------------ */

const Eyebrow = ({ children }) => (
  <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-primary">
    {children}
  </span>
);

const Rule = ({ isDark }) => (
  <hr className={isDark ? "border-white/10" : "border-slate-900/10"} />
);

/* Wordmark: flat, typographic, matching navbar logo design */
const Wordmark = ({ isDark }) => (
  <div className="inline-flex items-baseline gap-2 select-none">
    <span
      className={`text-[15px] font-semibold tracking-tight ${
        isDark ? "text-white" : "text-slate-900"
      }`}
    >
      Payment
    </span>
    <span className="rounded-sm bg-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-[0.18em] text-primary">
      TRACK
    </span>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const STAGES = [
  {
    num: "01",
    element: "Record",
    body:
      "Instantly log your transactions with customizable attributes. Fast entry forms ensure you never miss registering an expense or income.",
  },
  {
    num: "02",
    element: "Track",
    body:
      "Watch your financial data structure itself. Interactive dashboards, categories, and query filters let you view exactly where your funds are heading.",
  },
  {
    num: "03",
    element: "Optimize",
    body:
      "Harness detailed payment history reports to find leaks, adjust budgets, and keep your balances completely reconciled in real time.",
  },
];

const STATIONS = [
  {
    id: "STN-01",
    icon: Wallet,
    title: "Instant Logging",
    body:
      "Simple, structured record forms that capture payments in seconds. Keep track of descriptions, tags, and amounts on the go.",
  },
  {
    id: "STN-02",
    icon: TrendingUp,
    title: "Insight Analytics",
    body:
      "Aggregated summaries and interactive metrics that break down histories so you can visualize cashflow trends over time.",
  },
  {
    id: "STN-03",
    icon: ShieldCheck,
    title: "The Vault Security",
    body:
      "Your transaction records are safely hosted and securely validated, ensuring complete privacy and read-only integrity for your data.",
  },
];

const FACTS = [
  { value: "0.1s", label: "Transaction logging latency" },
  { value: "100%", label: "Secure encrypted sessions" },
  { value: "24/7", label: "Real-time access to history logs" },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

const About = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const t = {
    page: isDark ? "bg-[#050816] text-slate-100" : "bg-white text-slate-900",
    heading: isDark ? "text-white" : "text-slate-900",
    body: isDark ? "text-slate-400" : "text-slate-600",
    subtle: isDark ? "text-slate-500" : "text-slate-500",
    hairline: isDark ? "border-white/10" : "border-slate-900/10",
    inset: isDark ? "bg-white/[0.02]" : "bg-slate-50",
  };

  return (
    <main className={`min-h-screen transition-colors duration-300 ${t.page}`}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="mx-auto max-w-6xl px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <Reveal>
          <Wordmark isDark={isDark} />
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-12">
          <Reveal delay={0.05} className="md:col-span-7">
            <h1
              className={`text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-5xl md:text-[3.75rem] ${t.heading}`}
            >
              Financial clarity,
              <br className="hidden sm:block" />{" "}
              <span className="text-primary font-bold">made simple</span> and secure.
            </h1>
          </Reveal>

          <Reveal delay={0.12} className="md:col-span-5 md:pt-3">
            <p className={`text-lg leading-8 ${t.body}`}>
              PaymentTrack helps individuals and small businesses keep their logs clean.
              We simplify transaction recording, categorize your history, and structure
              your cashflow insights — so you can make informed decisions.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                to="/payment"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-content transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Log a Payment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                to="/payment-history"
                className={`text-sm font-medium underline-offset-4 transition-colors hover:underline ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                See History Logs
              </Link>
            </div>
          </Reveal>
        </div>
      </header>

      {/* ── Mission ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6">
        <Rule isDark={isDark} />
        <div className="grid gap-8 py-16 md:grid-cols-12 md:gap-12 md:py-20">
          <Reveal className="md:col-span-3">
            <Eyebrow>Mission</Eyebrow>
          </Reveal>
          <Reveal delay={0.06} className="md:col-span-9">
            <p
              className={`text-pretty text-2xl font-medium leading-[1.35] tracking-[-0.01em] md:text-[1.75rem] ${t.heading}`}
            >
              Eliminate record-keeping friction — with a sleek input platform,
              automated categorization, and verifiable transaction logs.
            </p>
            <p className={`mt-6 max-w-2xl leading-7 ${t.body}`}>
              We build tools with one clear goal in mind: creating clean,
              reconcilable, and private financial logs that save you time
              during accounting, auditing, or daily tracking.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── The Process ───────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6">
        <Rule isDark={isDark} />
        <div className="grid gap-8 py-16 md:grid-cols-12 md:gap-12 md:py-20">
          <Reveal className="md:col-span-3">
            <Eyebrow>How it works</Eyebrow>
            <h2
              className={`mt-4 text-2xl font-semibold tracking-[-0.01em] ${t.heading}`}
            >
              The Ledger Cycle
            </h2>
            <p className={`mt-3 text-sm leading-6 ${t.subtle}`}>
              Financial tracking is a cycle: record the initial data, track its structure, and optimize your balances.
            </p>
          </Reveal>

          <ol className="md:col-span-9">
            {STAGES.map((stage, i) => (
              <Reveal key={stage.num} delay={i * 0.06}>
                <li
                  className={`grid grid-cols-[3rem_1fr] gap-6 border-t py-8 first:border-t-0 first:pt-0 md:grid-cols-[4rem_1fr] ${t.hairline}`}
                >
                  <span className="font-mono text-sm tabular-nums text-primary font-bold">
                    {stage.num}
                  </span>
                  <div>
                    <h3
                      className={`text-lg font-semibold tracking-[-0.01em] ${t.heading}`}
                    >
                      {stage.element}
                    </h3>
                    <p className={`mt-2 max-w-xl leading-7 ${t.body}`}>
                      {stage.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Stations ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6">
        <Rule isDark={isDark} />
        <div className="py-16 md:py-20">
          <Reveal className="max-w-xl">
            <Eyebrow>What we offer</Eyebrow>
            <h2
              className={`mt-4 text-2xl font-semibold tracking-[-0.01em] md:text-3xl ${t.heading}`}
            >
              Three pillars, one dashboard
            </h2>
          </Reveal>

          <div
            className={`mt-10 grid divide-y overflow-hidden rounded-xl border md:grid-cols-3 md:divide-x md:divide-y-0 ${t.hairline} ${
              isDark ? "divide-white/10" : "divide-slate-900/10"
            }`}
          >
            {STATIONS.map((station, i) => {
              const Icon = station.icon;
              return (
                <Reveal key={station.id} delay={i * 0.06}>
                  <article
                    className={`group h-full p-7 transition-colors md:p-8 ${
                      isDark ? "hover:bg-white/3" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon
                        className="h-5 w-5 text-primary"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[10px] tracking-[0.2em] text-slate-500">
                        {station.id}
                      </span>
                    </div>
                    <h3
                      className={`mt-8 text-lg font-semibold tracking-[-0.01em] ${t.heading}`}
                    >
                      {station.title}
                    </h3>
                    <p className={`mt-3 text-sm leading-6 ${t.body}`}>
                      {station.body}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Facts ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6">
        <Rule isDark={isDark} />
        <dl className="grid gap-10 py-14 sm:grid-cols-3 md:py-16">
          {FACTS.map((fact, i) => (
            <Reveal key={fact.label} delay={i * 0.06}>
              <div>
                <dt
                  className={`text-4xl font-semibold tabular-nums tracking-[-0.02em] ${t.heading}`}
                >
                  {fact.value}
                </dt>
                <dd className={`mt-2 text-sm leading-6 ${t.subtle}`}>
                  {fact.label}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ── Security promise ─────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6">
        <Rule isDark={isDark} />
        <div className="grid gap-8 py-16 md:grid-cols-12 md:gap-12 md:py-20">
          <Reveal className="md:col-span-3">
            <Eyebrow>Privacy First</Eyebrow>
          </Reveal>
          <Reveal delay={0.06} className="md:col-span-9">
            <h2
              className={`max-w-2xl text-2xl font-semibold leading-snug tracking-[-0.01em] md:text-3xl ${t.heading}`}
            >
              Your data stays yours. Security is built-in.
            </h2>
            <p className={`mt-5 max-w-2xl leading-7 ${t.body}`}>
              Every input is protected by Firebase authentication and local encryption,
              assuring that only you can access or manage your financial ledgers.
              PaymentTrack does not lease, sell, or publicize your transaction details.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                to="/payment"
                className={`group inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  isDark
                    ? "border-white/15 text-white hover:bg-white/5"
                    : "border-slate-900/15 text-slate-900 hover:bg-slate-50"
                }`}
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <span
                className={`inline-flex items-center gap-2 text-sm ${t.subtle}`}
              >
                <ShieldCheck
                  className="h-4 w-4 text-primary"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                Secure session verification active
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-24 md:pb-32">
        <Reveal>
          <div
            className={`relative overflow-hidden rounded-2xl border px-8 py-14 md:px-14 md:py-20 ${t.hairline} ${t.inset}`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent"
            />
            <div className="max-w-2xl">
              <Eyebrow>Take control</Eyebrow>
              <h2
                className={`mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.02em] md:text-4xl ${t.heading}`}
              >
                Track your flow. Reach your goals.
              </h2>
              <p className={`mt-5 leading-7 ${t.body}`}>
                One unified ledger, detailed search filters, and complete history logs
                ready whenever you need them.
              </p>
              <Link
                to="/signup"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-content transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
      <ScrollRestoration />
    </main>
  );
};

export default About;
