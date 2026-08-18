import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMoneyCheckAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaShieldAlt,
  FaTimes,
  FaLock,
  FaPhoneAlt,
  FaKey,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Mock Payment Modal States
  const [gateway, setGateway] = useState(null); // 'bKash' | 'Nagad' | 'Rocket' | 'Visa' | 'Mastercard' | 'SSLCommerz'
  const [step, setStep] = useState(1); // 1: Info input, 2: OTP/PIN, 3: Loading, 4: Success
  const [walletNumber, setWalletNumber] = useState("");
  const [pin, setPin] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const handleOpenGateway = (name) => {
    setGateway(name);
    setStep(1);
    setWalletNumber("");
    setPin("");
    setCardNo("");
    setCardExpiry("");
    setCardCvv("");
  };

  const handleProceed = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      // Simulate API loading then transition to success screen
      setTimeout(() => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let trxId = "TRX";
        for (let i = 0; i < 8; i++) {
          trxId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setTransactionId(trxId);
        setStep(4);
      }, 2000);
    }
  };

  return (
    <footer className="bg-base-200/60 border-t border-base-200/50 pt-16 pb-8 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link
              to="/"
              className="flex items-center gap-3 text-xl font-bold tracking-tight text-base-content"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-secondary text-white shadow-md shadow-primary/20">
                <FaMoneyCheckAlt className="text-lg" />
              </div>
              <span className="bg-gradient-to-r from-base-content to-base-content/85 bg-clip-text text-transparent">
                Payment<span className="text-primary font-extrabold">Track</span>
              </span>
            </Link>

            <p className="text-sm text-base-content/65 max-w-sm leading-relaxed">
              A secure, fast, and simple payment management platform to track
              student tuitions, monitor dues, and simplify record-keeping.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: <FaFacebookF />, url: "#" },
                { icon: <FaTwitter />, url: "#" },
                { icon: <FaLinkedinIn />, url: "#" },
                { icon: <FaGithub />, url: "#" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-base-350 bg-base-100 text-base-content/70 transition-all hover:bg-primary hover:text-primary-content hover:-translate-y-1 hover:border-primary hover:shadow-md hover:shadow-primary/10"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {[
            {
              title: "Product",
              links: [
                { name: "Features", path: "/#features" },
                { name: "Security", path: "/#security" },
                { name: "Pricing", path: "/#pricing" },
                { name: "Updates", path: "/#updates" },
              ],
            },
            {
              title: "Company",
              links: [
                { name: "About Us", path: "/about" },
                { name: "Careers", path: "/careers" },
                { name: "Contact Us", path: "/contact" },
                { name: "Press Kit", path: "/press" },
              ],
            },
            {
              title: "Resources",
              links: [
                { name: "Documentation", path: "/docs" },
                { name: "Help Center", path: "/help" },
                { name: "Guides", path: "/guides" },
                { name: "Privacy Policy", path: "/privacy" },
              ],
            },
          ].map((column, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/85">
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      to={link.path}
                      className="text-sm text-base-content/65 transition-all duration-200 hover:text-primary hover:pl-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Secured Payments / SSLCommerz & Mobile Banking Badges */}
        <div className="mt-12 pt-8 border-t border-base-200/50">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-base-content/85 mb-1.5">
                <FaShieldAlt className="text-primary text-sm" />
                <span>Secured Payment Gateway</span>
              </div>
              <p className="text-xs text-base-content/60 max-w-sm">
                Safe and encrypted payments powered by SSLCommerz. We support local mobile banking and international cards.
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3">
              {/* SSLCommerz Brand Badge */}
              <button
                onClick={() => handleOpenGateway("SSLCommerz")}
                className="flex items-center gap-1 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl shadow-sm border border-base-300 cursor-pointer hover:scale-[1.04] active:scale-[0.96] hover:border-[#0D6EFD]/50 transition-all"
              >
                <span className="text-sm font-black text-[#E21B70] tracking-tighter">SSL</span>
                <span className="text-xs font-black text-[#0D6EFD] tracking-tight">Commerz</span>
              </button>

              {/* bKash */}
              <button
                onClick={() => handleOpenGateway("bKash")}
                className="flex items-center justify-center bg-[#D81B60] text-white px-4 py-2 rounded-xl shadow-sm cursor-pointer hover:scale-[1.04] active:scale-[0.96] transition-all font-bold text-xs hover:bg-[#C2185B]"
              >
                bKash
              </button>

              {/* Nagad */}
              <button
                onClick={() => handleOpenGateway("Nagad")}
                className="flex items-center justify-center bg-[#F15A24] text-white px-4 py-2 rounded-xl shadow-sm cursor-pointer hover:scale-[1.04] active:scale-[0.96] transition-all font-bold text-xs hover:bg-[#D54A18]"
              >
                Nagad
              </button>

              {/* Rocket */}
              <button
                onClick={() => handleOpenGateway("Rocket")}
                className="flex items-center justify-center bg-[#8C3494] text-white px-4 py-2 rounded-xl shadow-sm cursor-pointer hover:scale-[1.04] active:scale-[0.96] transition-all font-bold text-xs hover:bg-[#74287B]"
              >
                Rocket
              </button>

              {/* Visa */}
              <button
                onClick={() => handleOpenGateway("Visa")}
                className="flex items-center justify-center bg-[#1A1F71] text-white px-4 py-2 rounded-xl shadow-sm cursor-pointer hover:scale-[1.04] active:scale-[0.96] transition-all font-extrabold text-xs italic tracking-wider hover:bg-[#121650]"
              >
                VISA
              </button>

              {/* Mastercard */}
              <button
                onClick={() => handleOpenGateway("Mastercard")}
                className="flex items-center gap-1.5 bg-slate-950 text-white px-4 py-2 rounded-xl shadow-sm cursor-pointer hover:scale-[1.04] active:scale-[0.96] transition-all font-semibold text-xs hover:bg-black"
              >
                <div className="flex -space-x-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B]"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F00] opacity-90"></div>
                </div>
                <span>Mastercard</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="mt-8 pt-8 border-t border-base-200/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-base-content/55">
            &copy; {currentYear} PaymentTrack. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-base-content/55">
            <Link
              to="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="hover:text-primary transition-colors"
            >
              Cookies Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Mock Payment Modal */}
      {gateway && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-all duration-300">
          <div className="relative w-full max-w-md bg-base-100 rounded-3xl shadow-2xl border border-base-200 overflow-hidden transform transition-all duration-300 scale-100">
            {/* Top Header branded by gateway */}
            <div
              className={`p-6 text-white relative transition-colors duration-300 ${
                gateway === "bKash"
                  ? "bg-[#D81B60]"
                  : gateway === "Nagad"
                  ? "bg-[#F15A24]"
                  : gateway === "Rocket"
                  ? "bg-[#8C3494]"
                  : gateway === "Visa"
                  ? "bg-[#1A1F71]"
                  : gateway === "Mastercard"
                  ? "bg-slate-950"
                  : "bg-[#0D6EFD]"
              }`}
            >
              <button
                onClick={() => setGateway(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white hover:scale-110 transition-all cursor-pointer"
              >
                <FaTimes className="text-xl" />
              </button>

              <div className="flex items-center gap-2">
                {gateway === "bKash" && (
                  <span className="text-2xl font-black tracking-tighter">bKash</span>
                )}
                {gateway === "Nagad" && (
                  <span className="text-2xl font-black tracking-tighter">Nagad</span>
                )}
                {gateway === "Rocket" && (
                  <span className="text-2xl font-black tracking-tighter">Rocket</span>
                )}
                {gateway === "Visa" && (
                  <span className="text-2xl font-extrabold italic tracking-wider">
                    VISA
                  </span>
                )}
                {gateway === "Mastercard" && (
                  <div className="flex items-center gap-1.5 font-bold">
                    <div className="flex -space-x-1">
                      <div className="w-4 h-4 rounded-full bg-[#EB001B]"></div>
                      <div className="w-4 h-4 rounded-full bg-[#FF5F00] opacity-90"></div>
                    </div>
                    <span>mastercard</span>
                  </div>
                )}
                {gateway === "SSLCommerz" && (
                  <div className="flex items-center gap-0.5">
                    <span className="text-xl font-black text-white tracking-tighter">
                      SSL
                    </span>
                    <span className="text-base font-black text-white/90 tracking-tight">
                      Commerz
                    </span>
                  </div>
                )}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 uppercase tracking-widest font-semibold ml-2">
                  Mock Gateway
                </span>
              </div>

              <div className="mt-5 flex justify-between items-end border-t border-white/25 pt-4">
                <div>
                  <p className="text-[10px] text-white/70 uppercase font-bold tracking-wider">
                    Merchant
                  </p>
                  <p className="text-sm font-black">PaymentTrack</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/70 uppercase font-bold tracking-wider">
                    Amount
                  </p>
                  <p className="text-lg font-black">৳ 2,500.00</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Step 1: Input Info */}
              {step === 1 && (
                <form onSubmit={handleProceed} className="space-y-4">
                  {["bKash", "Nagad", "Rocket", "SSLCommerz"].includes(gateway) ? (
                    <div>
                      <label className="label text-xs font-bold uppercase tracking-wider text-base-content/65 mb-1.5">
                        {gateway === "SSLCommerz"
                          ? "Select Wallet Account Number"
                          : `${gateway} Account Number`}
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-base-content/40">
                          <FaPhoneAlt className="text-sm" />
                        </span>
                        <input
                          type="tel"
                          required
                          pattern="01[3-9][0-9]{8}"
                          placeholder="e.g. 017XXXXXXXX"
                          value={walletNumber}
                          onChange={(e) => setWalletNumber(e.target.value)}
                          className="input input-bordered w-full pl-10 rounded-2xl bg-base-200 border-none focus:outline-none focus:ring-2 focus:ring-primary/45 text-sm py-3.5 text-base-content"
                        />
                      </div>
                      <p className="text-[10px] text-base-content/50 mt-2 leading-normal">
                        Enter your 11-digit mobile banking account number to initiate mock transaction validation.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="label text-xs font-bold uppercase tracking-wider text-base-content/65 mb-1.5">
                          Card Number
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-base-content/40">
                            <FaCreditCard className="text-sm" />
                          </span>
                          <input
                            type="text"
                            required
                            pattern="[0-9]{16}"
                            maxLength={16}
                            placeholder="4111222233334444"
                            value={cardNo}
                            onChange={(e) => setCardNo(e.target.value)}
                            className="input input-bordered w-full pl-10 rounded-2xl bg-base-200 border-none focus:outline-none focus:ring-2 focus:ring-primary/45 text-sm py-3.5 text-base-content"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="label text-xs font-bold uppercase tracking-wider text-base-content/65 mb-1.5">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            required
                            pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                            maxLength={5}
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="input input-bordered w-full rounded-2xl bg-base-200 border-none focus:outline-none focus:ring-2 focus:ring-primary/45 text-sm py-3.5 text-base-content"
                          />
                        </div>
                        <div>
                          <label className="label text-xs font-bold uppercase tracking-wider text-base-content/65 mb-1.5">
                            CVV
                          </label>
                          <input
                            type="password"
                            required
                            pattern="[0-9]{3,4}"
                            maxLength={4}
                            placeholder="123"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="input input-bordered w-full rounded-2xl bg-base-200 border-none focus:outline-none focus:ring-2 focus:ring-primary/45 text-sm py-3.5 text-base-content"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary w-full rounded-2xl py-3.5 font-bold tracking-wide mt-4 shadow-lg shadow-primary/20 cursor-pointer"
                  >
                    Proceed
                  </button>
                </form>
              )}

              {/* Step 2: OTP & PIN */}
              {step === 2 && (
                <form onSubmit={handleProceed} className="space-y-4">
                  <div>
                    <label className="label text-xs font-bold uppercase tracking-wider text-base-content/65 mb-1.5">
                      Verification OTP
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-base-content/40">
                        <FaKey className="text-sm" />
                      </span>
                      <input
                        type="text"
                        required
                        pattern="[0-9]{6}"
                        maxLength={6}
                        placeholder="Enter 6-digit OTP (e.g. 123456)"
                        className="input input-bordered w-full pl-10 rounded-2xl bg-base-200 border-none focus:outline-none focus:ring-2 focus:ring-primary/45 text-sm py-3.5 text-base-content"
                      />
                    </div>
                  </div>

                  {["bKash", "Nagad", "Rocket", "SSLCommerz"].includes(gateway) && (
                    <div>
                      <label className="label text-xs font-bold uppercase tracking-wider text-base-content/65 mb-1.5">
                        Enter PIN
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-base-content/40">
                          <FaLock className="text-sm" />
                        </span>
                        <input
                          type="password"
                          required
                          pattern="[0-9]{4,5}"
                          maxLength={5}
                          placeholder="Enter Account PIN"
                          value={pin}
                          onChange={(e) => setPin(e.target.value)}
                          className="input input-bordered w-full pl-10 rounded-2xl bg-base-200 border-none focus:outline-none focus:ring-2 focus:ring-primary/45 text-sm py-3.5 text-base-content"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn btn-outline flex-1 rounded-2xl py-3.5 border-base-300 font-semibold cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary flex-1 rounded-2xl py-3.5 font-bold shadow-lg shadow-primary/20 cursor-pointer"
                    >
                      Confirm Payment
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Loading spinner */}
              {step === 3 && (
                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                  <p className="text-sm font-semibold text-base-content/85 animate-pulse">
                    Processing credentials...
                  </p>
                  <p className="text-xs text-base-content/50 text-center">
                    Simulating SSL connection. Please do not close or refresh.
                  </p>
                </div>
              )}

              {/* Step 4: Success message */}
              {step === 4 && (
                <div className="py-6 flex flex-col items-center text-center space-y-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success shadow-inner">
                    <FaCheckCircle className="text-3xl" />
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-base-content">
                      Payment Successful!
                    </h3>
                    <p className="text-xs text-base-content/65 mt-1 leading-normal">
                      Your tuition fee of ৳ 2,500 has been paid successfully to
                      PaymentTrack.
                    </p>
                  </div>

                  <div className="w-full bg-base-200 rounded-2xl p-4 space-y-2.5 border border-base-300/40 text-left">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-base-content/60">
                        Amount Paid
                      </span>
                      <span className="font-extrabold text-base-content">
                        ৳ 2,500
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-base-content/60">
                        Payment Mode
                      </span>
                      <span className="font-extrabold text-base-content">
                        {gateway}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-base-content/60">
                        Transaction ID
                      </span>
                      <span className="font-mono font-bold text-primary select-all">
                        {transactionId}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setGateway(null)}
                    className="btn btn-primary w-full rounded-2xl py-3.5 font-bold shadow-lg shadow-primary/20 cursor-pointer"
                  >
                    Close Gateway
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;