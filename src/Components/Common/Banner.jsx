import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaChartLine,
  FaMoneyBillWave,
  FaUserFriends,
  FaLock,
  FaBolt,
} from "react-icons/fa";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-base-100 to-base-200/50 py-16 lg:py-24 flex items-center min-h-[calc(100vh-4.5rem)]">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-5 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse duration-[4000ms]"></div>
      <div className="absolute bottom-1/4 right-5 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-10 animate-pulse duration-[6000ms]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-20"></div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide border border-primary/20 hover:bg-primary/15 transition-all">
              <FaBolt className="text-xs" />
              <span>Smart Payment Management</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-base-content">
              Track Payments
              <span className="block mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Easily & Securely
              </span>
            </h1>

            <p className="text-base sm:text-lg text-base-content/70 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Manage payments, track transactions, monitor student progress, and
              keep your payment records organized in one simple, beautiful
              platform.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                to="/signup"
                className="btn btn-primary rounded-xl px-7 py-3.5 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 shadow-lg shadow-primary/25 font-semibold text-sm group"
              >
                <span>Get Started</span>
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/about"
                className="btn btn-outline rounded-xl px-7 py-3.5 hover:bg-base-200 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 font-semibold text-sm border-base-300"
              >
                Learn More
              </Link>
            </div>

            {/* Features list */}
            <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3">
              <span className="flex items-center gap-2 text-sm font-medium text-base-content/85">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
                  <FaCheckCircle className="text-xs" />
                </div>
                Easy to Use
              </span>

              <span className="flex items-center gap-2 text-sm font-medium text-base-content/85">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
                  <FaCheckCircle className="text-xs" />
                </div>
                Secure
              </span>

              <span className="flex items-center gap-2 text-sm font-medium text-base-content/85">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
                  <FaCheckCircle className="text-xs" />
                </div>
                Fast Tracking
              </span>
            </div>
          </div>

          {/* Right Dashboard Preview */}
          <div className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none">
            {/* Main Preview Card */}
            <div className="card bg-base-100/90 backdrop-blur-sm shadow-2xl border border-base-200/80 hover:scale-[1.02] hover:rotate-1 transition-all duration-500 z-10 relative overflow-hidden group">
              {/* Background gradient overlay in hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl -z-10 group-hover:scale-150 transition-all duration-700"></div>

              <div className="card-body p-6 sm:p-8">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
                      Payment Overview
                    </span>
                    <h2 className="text-3xl font-extrabold text-base-content mt-1 tracking-tight">
                      ৳ 85,450
                    </h2>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center shadow-inner">
                    <FaMoneyBillWave className="text-primary text-xl" />
                  </div>
                </div>

                {/* Progress bar section */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-base-content/75 uppercase tracking-wide">
                      Monthly Progress
                    </span>
                    <span className="text-sm font-black text-primary">78%</span>
                  </div>

                  <div className="w-full bg-base-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="rounded-2xl border border-success/15 bg-success/5 p-4 transition-all duration-300 hover:bg-success/10 hover:shadow-md">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-success/80">
                        Paid
                      </span>
                      <div className="p-1.5 rounded-lg bg-success/15 text-success">
                        <FaChartLine className="text-xs" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black mt-1 text-base-content">
                      156
                    </h3>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-base-content/50 mt-0.5">
                      Students
                    </p>
                  </div>

                  <div className="rounded-2xl border border-warning/15 bg-warning/5 p-4 transition-all duration-300 hover:bg-warning/10 hover:shadow-md">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-warning/80">
                        Due
                      </span>
                      <div className="p-1.5 rounded-lg bg-warning/15 text-warning">
                        <FaUserFriends className="text-xs" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-black mt-1 text-base-content">
                      44
                    </h3>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-base-content/50 mt-0.5">
                      Students
                    </p>
                  </div>
                </div>

                {/* Recent Transaction */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/65">
                      Recent Payment
                    </h3>
                    <span className="badge badge-success badge-sm font-semibold rounded-lg px-2.5 py-1">
                      Paid
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-base-200/50 border border-base-200 rounded-2xl p-4 transition-all hover:bg-base-200">
                    <div>
                      <p className="text-sm font-semibold text-base-content">
                        Student Tuition
                      </p>
                      <p className="text-[10px] font-medium text-base-content/50 mt-0.5">
                        Trans #PT-10245
                      </p>
                    </div>
                    <p className="text-base font-black text-base-content">
                      ৳ 2,500
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 hidden md:block z-20 group-hover:translate-y-1 transition-transform duration-300">
              <div className="card bg-base-100/90 backdrop-blur-md shadow-xl border border-base-200/80 rounded-2xl">
                <div className="card-body p-4 flex flex-row items-center gap-3">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-base-content/40">
                      Payment Status
                    </p>
                    <span className="text-xs font-extrabold text-base-content">
                      All Systems Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional floating lock icon representing security */}
            <div className="absolute -top-6 -right-6 hidden md:flex items-center justify-center h-12 w-12 rounded-2xl bg-base-100 shadow-lg border border-base-200 text-secondary z-20 hover:scale-110 transition-transform">
              <FaLock className="text-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;