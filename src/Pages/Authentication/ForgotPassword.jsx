import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle2, KeyRound, Send } from "lucide-react";
import { toast } from "react-toastify";
import useAxios from "../../Hooks/useAxios";

const ForgotPassword = () => {
  const location = useLocation();
  const axiosInstance = useAxios();
  const [email, setEmail] = useState(location.state?.email || "");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResetRequest = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("অনুগ্রহ করে আপনার নিবন্ধিত ইমেইল বা মোবাইল নম্বর দিন।");
      return;
    }
    setSubmitting(true);
    try {
      await axiosInstance.post("/api/auth/forgot-password", { email });
    } catch {}
    setSubmitting(false);
    setSent(true);
    toast.success("পাসওয়ার্ড রিসেট নির্দেশনা পাঠানো হয়েছে!");
  };

  return (
    <section className="min-h-[82vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 p-8 shadow-xl backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-base-content/60 hover:text-primary transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>লগইন পেজে ফিরুন</span>
          </Link>
          <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
            পাসওয়ার্ড পুনরুদ্ধার
          </span>
        </div>

        <div className="mb-6">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
            <KeyRound className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-base-content">
            পাসওয়ার্ড ভুলে গেছেন?
          </h1>
          <p className="text-xs text-base-content/60 mt-1">
            আপনার নিবন্ধিত ইমেইল অথবা অভিভাবকের মোবাইল নম্বর দিলে পাসওয়ার্ড রিসেট করার লিংক পাঠানো হবে।
          </p>
        </div>

        {sent ? (
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center space-y-3">
            <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
            <h3 className="font-bold text-base-content">রিসেট লিংক পাঠানো হয়েছে</h3>
            <p className="text-xs text-base-content/70">
              <span className="font-mono font-bold text-primary">{email}</span> ঠিকানায় পাসওয়ার্ড পরিবর্তনের নির্দেশনা পাঠানো হয়েছে।
            </p>
            <Link
              to="/login"
              className="mt-2 inline-flex items-center justify-center w-full py-3 rounded-xl bg-primary text-white text-xs font-bold"
            >
              লগইন পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <form onSubmit={handleResetRequest} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-xs font-bold text-base-content/70">
                নিবন্ধিত ইমেইল / মোবাইল নম্বর
              </label>
              <div className="flex items-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 focus-within:border-primary">
                <Mail className="h-4 w-4 text-base-content/40" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ইমেইল বা 017XXXXXXXX"
                  className="w-full bg-transparent px-3 py-3.5 text-sm outline-none text-base-content"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:opacity-95 transition"
            >
              <Send className="h-4 w-4" />
              <span>{submitting ? "পাঠানো হচ্ছে..." : "রিসেট লিংক পাঠান"}</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
