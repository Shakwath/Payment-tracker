import { useContext, useState } from "react";
import Registeri from "../../assets/SignUp.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useTheme } from "../../Context/ThemeProvider";
import { useLanguage } from "../../Context/LanguageContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ImageIcon,
  ArrowRight,
  ShieldCheck,
  Globe,
} from "lucide-react";
import useAxios from "../../Hooks/useAxios";

const SignUp = () => {
  const { createUser, setUser, updateUserProfile, resolveRoleForEmail, loading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [showPass, setShowPass] = useState(false);
  const { theme } = useTheme();
  const dark = theme === "dark";
  const { lang, toggleLang, t } = useLanguage();

  const { register, handleSubmit } = useForm();

  const handleRegister = (data) => {
    const { name, email, password, photo } = data;
    createUser(email, password)
      .then(({ user }) => {
        const assignedRole = resolveRoleForEmail(email, name);
        updateUserProfile(name, photo || "/logo.png").then(() => {
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: name,
            photoURL: photo || "/logo.png",
            emailVerified: user.emailVerified,
            role: assignedRole,
          });
          axiosInstance
            .post("/api/users/register", {
              name,
              email,
              photoURL: photo || "/logo.png",
              role: assignedRole,
            })
            .catch(() => {});
          toast.success(
            t(
              `ফায়ারবেস অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! (রোল: ${assignedRole.toUpperCase()})`,
              `Firebase account created! (Role: ${assignedRole.toUpperCase()})`
            )
          );
          navigate("/dashboard");
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <section
      className={`min-h-screen px-5 pt-16 pb-16 transition-all duration-500 ${
        dark ? "bg-base-100" : "bg-gradient-to-br from-slate-50 via-white to-purple-50/30"
      }`}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-14 w-14 rounded-2xl object-contain bg-white p-1 border border-primary/25 shadow-sm"
            />
            <div>
              <p className="text-xs font-bold text-primary">مركز العلم والهدى</p>
              <h3 className="text-xl font-extrabold text-base-content">
                {t("মারকাযুল ইলমি ওয়াল হুদা", "Markajul Ilm Wal Huda")}
              </h3>
              <p className="text-xs text-base-content/60">
                {t(
                  "দারুল আনোয়ার, পশ্চিম ফটিকা, হাটহাজারী পৌরসভা, চট্টগ্রাম",
                  "Darul Anwar, West Fotika, Hathazari Municipality, Chattogram"
                )}
              </p>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold leading-tight text-base-content">
            {t(
              "অভিভাবক ও শিক্ষকদের জন্য সহজ ও নিরাপদ ফায়ারবেস রেজিস্ট্রেশন",
              "Secure Firebase Portal Registration for Guardians & Faculty"
            )}
          </h2>
          <div className="mt-6 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xl bg-white/80 dark:bg-slate-900/60">
            <img src={Registeri} alt="Register" className="w-full rounded-2xl" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className={`rounded-3xl border p-6 shadow-xl backdrop-blur-xl sm:p-8 ${
              dark ? "border-slate-800 bg-slate-900/80" : "border-slate-200 bg-white/90"
            }`}
          >
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={toggleLang}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border border-primary/30 bg-primary/10 text-primary text-xs font-bold cursor-pointer"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{lang === "bn" ? "English" : "বাংলা"}</span>
              </button>
            </div>

            <div className="mb-5 text-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-12 w-12 mx-auto mb-2 rounded-2xl object-contain bg-white p-1 border border-primary/20"
              />
              <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content">
                {t("নতুন অ্যাকাউন্ট তৈরি করুন", "Create New Account")}
              </h1>
              <p className="mt-1 text-xs text-base-content/60">
                {t("মারকাযুল ইলমি ওয়াল হুদা • হাটহাজারী, চট্টগ্রাম", "Markajul Ilm Wal Huda • Hathazari, Chattogram")}
              </p>
            </div>

            <div className="mb-4 p-3 rounded-2xl bg-primary/10 border border-primary/20 flex items-start gap-2 text-xs text-primary">
              <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                {t(
                  "অ্যাডমিন প্যানেল থেকে আপনার ইমেইলের বিপরীতে যে রোল (অভিভাবক / শিক্ষক / অ্যাডমিন) নির্ধারণ করা হয়েছে, রেজিস্ট্রেশনের পর সেটি স্বয়ংক্রিয়ভাবে কার্যকর হবে।",
                  "Your account role (Guardian / Teacher / Admin) is assigned by the Madrasa Admin based on your registered email address."
                )}
              </span>
            </div>

            <form onSubmit={handleSubmit(handleRegister)} className="space-y-4 text-xs">
              <div>
                <label className="mb-1 block font-bold text-base-content/80">
                  {t("পূর্ণ নাম", "Full Name")}
                </label>
                <div className="flex items-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4">
                  <User className="h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder={t("আপনার পূর্ণ নাম লিখুন", "Enter your full name")}
                    className="w-full bg-transparent py-3 px-3 outline-none"
                    {...register("name", { required: true })}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-bold text-base-content/80">
                  {t("ইমেইল ঠিকানা", "Email Address")}
                </label>
                <div className="flex items-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    placeholder={t("আপনার ইমেইল লিখুন", "Enter your email address")}
                    className="w-full bg-transparent py-3 px-3 outline-none"
                    {...register("email", { required: true })}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-bold text-base-content/80">
                  {t("ছবির লিংক (ঐচ্ছিক)", "Photo URL (Optional)")}
                </label>
                <div className="flex items-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4">
                  <ImageIcon className="h-4 w-4 text-slate-400" />
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    className="w-full bg-transparent py-3 px-3 outline-none"
                    {...register("photo")}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-bold text-base-content/80">
                  {t("পাসওয়ার্ড", "Password")}
                </label>
                <div className="flex items-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4">
                  <Lock className="h-4 w-4 text-slate-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder={t("কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড", "At least 6 characters")}
                    className="w-full bg-transparent py-3 px-3 outline-none"
                    {...register("password", { required: true })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="cursor-pointer"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 cursor-pointer"
              >
                <span>
                  {loading
                    ? t("তৈরি হচ্ছে...", "Creating Account...")
                    : t("রেজিস্ট্রেশন সম্পন্ন করুন", "Complete Registration")}
                </span>
                <ArrowRight size={16} />
              </button>

              <p className="text-center text-xs text-slate-600 dark:text-slate-400">
                {t("ইতিমধ্যে অ্যাকাউন্ট আছে?", "Already have an account?")}{" "}
                <Link to="/signin" className="font-bold text-primary hover:underline">
                  {t("লগইন করুন", "Sign In")}
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SignUp;
