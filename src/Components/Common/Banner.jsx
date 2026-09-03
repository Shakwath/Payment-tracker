import { Link } from "react-router-dom";
import {
  FaSearch,
  FaPlus,
  FaMoneyBillWave,
  FaUserFriends,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaFilter,
} from "react-icons/fa";

const Banner = () => {
  return (
    <section className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-28 pb-12 lg:pb-16">
      
      {/* Background Orbit Ring SVG Pattern */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[1000px] h-[650px] pointer-events-none -z-10 opacity-40 dark:opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 650" fill="none">
          <circle cx="500" cy="190" r="220" stroke="#9603F8" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="500" cy="190" r="380" stroke="#7805F5" strokeWidth="1" strokeDasharray="6 6" />
          <circle cx="500" cy="190" r="520" stroke="#9603F8" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>

      {/* Floating Ambient Theme Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[40rem] h-[25rem] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* ------------------------------------------------------------- */}
      {/* FLOATING PAYMENT LOGOS (bKash, Nagad, Rocket, SSLCommerz)     */}
      {/* ------------------------------------------------------------- */}

      {/* 1. bKash (Top-Left Orbit) */}
      <div className="absolute top-16 lg:top-24 left-[6%] sm:left-[10%] lg:left-[12%] hidden sm:flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-900/40 shadow-xl hover:scale-110 transition-transform duration-300 z-20">
        <img src="/bkash.png" alt="bKash Logo" className="w-full h-full object-contain" />
      </div>

      {/* 2. Nagad (Mid-Left Orbit) */}
      <div className="absolute top-56 lg:top-64 left-[3%] sm:left-[6%] lg:left-[8%] hidden sm:flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-900/40 shadow-xl hover:scale-110 transition-transform duration-300 z-20">
        <img src="/nagad.png" alt="Nagad Logo" className="w-full h-full object-contain" />
      </div>

      {/* 3. SSLCommerz (Top-Right Orbit) */}
      <div className="absolute top-16 lg:top-24 right-[6%] sm:right-[10%] lg:right-[12%] hidden sm:flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-900/40 shadow-xl hover:scale-110 transition-transform duration-300 z-20">
        <img src="/sslcommerz.jpg" alt="SSLCommerz Logo" className="w-full h-full object-contain rounded-lg" />
      </div>

      {/* 4. Rocket (Mid-Right Orbit) */}
      <div className="absolute top-56 lg:top-64 right-[3%] sm:right-[6%] lg:right-[8%] hidden sm:flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-900/40 shadow-xl hover:scale-110 transition-transform duration-300 z-20">
        <img src="/rocket.webp" alt="Rocket Logo" className="w-full h-full object-contain" />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CENTERED HERO CONTENT                                          */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top Active Users Avatar Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-purple-900/40 shadow-sm mb-6">
          <div className="flex -space-x-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
              alt="User"
              className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
              alt="User"
              className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
              alt="User"
              className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-900 object-cover"
            />
          </div>
          <span className="text-xs font-semibold text-base-content/80">
            <strong className="text-primary font-bold">24K+</strong> institutions & tutors
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-base-content max-w-3xl mx-auto">
          Track payments better, faster, and together
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-base-content/75 max-w-2xl mx-auto leading-relaxed font-normal">
          The modern payment management system designed specifically for educational institutions, academies, and tutors. Streamline fee collections from concept to total ledger reconciliation.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/signup"
            className="rounded-2xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 px-8 py-3.5 font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Get Started
          </Link>

          <Link
            to="/about"
            className="rounded-2xl bg-base-200/80 hover:bg-base-200 border border-base-300 dark:border-slate-800 text-base-content px-8 py-3.5 font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            See Demo
          </Link>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* DASHBOARD PREVIEW MOCKUP AT THE BOTTOM (Slightly Taller)      */}
      {/* ------------------------------------------------------------- */}
      <div className="mt-12 sm:mt-16 max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="relative rounded-3xl border border-slate-200/90 dark:border-purple-900/40 bg-white/95 dark:bg-slate-900/95 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-500 min-h-[520px]">
          
          <div className="grid grid-cols-12 min-h-[520px]">
            
            {/* Sidebar Left Panel (12 cols mobile, 3 cols desktop) */}
            <div className="hidden lg:block lg:col-span-3 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 p-5">
              {/* Sidebar Logo */}
              <div className="flex items-center gap-2 font-bold text-base text-base-content mb-6">
                <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white text-xs">
                  PT
                </div>
                <span>PaymentTrack</span>
              </div>

              {/* Search Box */}
              <div className="relative mb-6">
                <FaSearch className="absolute left-3 top-3 text-xs text-base-content/40" />
                <input
                  type="text"
                  disabled
                  placeholder="Search..."
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-base-content placeholder:text-base-content/40 cursor-not-allowed"
                />
              </div>

              {/* Sidebar Nav */}
              <div className="space-y-1 text-xs">
                <span className="font-mono text-[10px] uppercase font-bold text-base-content/40 tracking-wider block px-3 mb-2">
                  MAIN MENU
                </span>
                <div className="px-3 py-2 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-between">
                  <span>Dashboard</span>
                </div>
                <div className="px-3 py-2 rounded-xl text-base-content/60 flex items-center justify-between">
                  <span>Payments</span>
                  <span className="bg-base-200 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-mono">76</span>
                </div>
                <div className="px-3 py-2 rounded-xl text-base-content/60 flex items-center justify-between">
                  <span>Students</span>
                  <span className="bg-base-200 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-mono">21</span>
                </div>
                <div className="px-3 py-2 rounded-xl text-base-content/60">
                  <span>History Logs</span>
                </div>
                <div className="px-3 py-2 rounded-xl text-base-content/60 flex items-center justify-between">
                  <span>Reports</span>
                  <span className="bg-base-200 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] font-mono">3</span>
                </div>
              </div>
            </div>

            {/* Main Dashboard Area (12 cols mobile, 9 cols desktop) */}
            <div className="col-span-12 lg:col-span-9 p-5 sm:p-7 flex flex-col justify-between pb-24">
              
              {/* Header Bar */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h2 className="text-xl font-bold text-base-content tracking-tight">Dashboard</h2>
                    <p className="text-[11px] text-base-content/50 font-mono mt-0.5">Last sync: Just now</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button disabled className="btn btn-sm btn-ghost border border-slate-200 dark:border-slate-800 rounded-xl text-xs flex items-center gap-1.5">
                      <FaFilter className="text-[10px]" />
                      <span>Monthly</span>
                    </button>
                    <button disabled className="btn btn-sm btn-primary text-white rounded-xl text-xs font-bold flex items-center gap-1.5">
                      <FaPlus className="text-[10px]" />
                      <span>Add Record</span>
                    </button>
                  </div>
                </div>

                {/* Dashboard Metric Widgets Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                  <div className="p-3.5 rounded-2xl bg-base-200/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-mono uppercase font-bold text-primary block">Active Students</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xl font-black text-base-content">156</span>
                      <span className="text-[10px] font-bold text-emerald-500">+4%</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-base-200/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-mono uppercase font-bold text-emerald-500 block">Tuition Paid</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xl font-black text-base-content">৳ 85,450</span>
                      <span className="text-[10px] font-bold text-emerald-500">+18%</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-base-200/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-mono uppercase font-bold text-amber-500 block">Pending Dues</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xl font-black text-base-content">44</span>
                      <span className="text-[10px] font-bold text-amber-500">Action</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-base-200/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-mono uppercase font-bold text-purple-500 block">Overdue Fees</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xl font-black text-base-content">15</span>
                      <span className="text-[10px] font-bold text-emerald-500">-2%</span>
                    </div>
                  </div>
                </div>

                {/* Extended Micro Ledger Stream Preview */}
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-base-200/40 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                        <FaCheckCircle className="text-xs" />
                      </div>
                      <div>
                        <p className="font-bold text-base-content">Rahim Uddin — Tuition Fee</p>
                        <p className="text-[10px] text-base-content/50 font-mono">Paid via bKash • TRX-98214</p>
                      </div>
                    </div>
                    <span className="font-bold text-primary">৳ 2,500</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-base-200/40 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-500 flex items-center justify-center">
                        <FaClock className="text-xs" />
                      </div>
                      <div>
                        <p className="font-bold text-base-content">Nusrat Jahan — Lab Fee</p>
                        <p className="text-[10px] text-base-content/50 font-mono">Pending Nagad verification</p>
                      </div>
                    </div>
                    <span className="font-bold text-amber-500">৳ 1,200</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-base-200/40 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                        <FaCheckCircle className="text-xs" />
                      </div>
                      <div>
                        <p className="font-bold text-base-content">Anika Rahman — Semester Admission</p>
                        <p className="text-[10px] text-base-content/50 font-mono">Paid via Rocket • TRX-98216</p>
                      </div>
                    </div>
                    <span className="font-bold text-primary">৳ 5,000</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-base-200/40 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                        <FaMoneyBillWave className="text-xs" />
                      </div>
                      <div>
                        <p className="font-bold text-base-content">Tanvir Hossain — Course Materials</p>
                        <p className="text-[10px] text-base-content/50 font-mono">Paid via SSLCommerz • TRX-98217</p>
                      </div>
                    </div>
                    <span className="font-bold text-primary">৳ 1,800</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Smooth Bottom Gradient Fade Mask over Dashboard Preview */}
          <div className="pointer-events-none absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-white via-white/85 to-transparent dark:from-slate-900 dark:via-slate-900/85 dark:to-transparent z-20" />

        </div>
      </div>

      {/* Smooth Transition Gradient Wave between Hero and Features section */}
      <div className="pointer-events-none absolute -bottom-6 inset-x-0 h-32 bg-gradient-to-b from-transparent via-primary/10 to-transparent blur-xl -z-10" />

    </section>
  );
};

export default Banner;