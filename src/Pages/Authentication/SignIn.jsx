import { useContext, useState } from "react";
import google from "../../assets/google.svg";
import github from "../../assets/github.svg";
import login from "../../assets/login-illustration.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck, Globe } from "lucide-react";
import useAxios from "../../Hooks/useAxios";
import { useTheme } from "../../Context/ThemeProvider";
import { useLanguage } from "../../Context/LanguageContext";

const SignIn = () => {
  const [firebaseError, setFirebaseError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, googleSignIn, gitHubSignIn, resolveRoleForEmail, loading } =
    useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { theme } = useTheme();
  const dark = theme === "dark";
  const { lang, toggleLang, t } = useLanguage();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailValue = watch("email");

  const goToForget = () => {
    navigate("/forgetpassword", { state: { email: emailValue || "" } });
  };

  const handleLogin = (data) => {
    setFirebaseError("");
    const { email, password } = data;
    signIn(email, password)
      .then((res) => {
        const loggedEmail = res?.user?.email || email;
        const assignedRole = resolveRoleForEmail(loggedEmail, res?.user?.displayName);
        toast.success(
          t(
            `সফলভাবে ফায়ারবেস লগইন সম্পন্ন হয়েছে! (রোল: ${assignedRole.toUpperCase()})`,
            `Firebase Login Successful! (Role: ${assignedRole.toUpperCase()})`
          )
        );
        navigate(location.state?.from?.pathname || "/dashboard");
      })
      .catch((error) => {
        const errorMessage =
          error.message || t("লগইন ব্যর্থ হয়েছে। ইমেইল ও পাসওয়ার্ড যাচাই করুন।", "Login failed.");
        toast.error(errorMessage);
        setFirebaseError(errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    setFirebaseError("");
    googleSignIn()
      .then(async (result) => {
        const { displayName, email, photoURL } = result.user || {};
        const assignedRole = resolveRoleForEmail(email, displayName);
        try {
          await axiosInstance.post("/api/users/register", {
            name: displayName || "User",
            email,
            photoURL: photoURL || "",
            role: assignedRole,
          });
        } catch {}
        toast.success(
          t(
            `গুগল লগইন সফল হয়েছে! (রোল: ${assignedRole.toUpperCase()})`,
            `Google login successful! (Role: ${assignedRole.toUpperCase()})`
          )
        );
        navigate(location.state?.from?.pathname || "/dashboard");
      })
      .catch((error) => {
        setFirebaseError(error.message);
        toast.error(error.message);
      });
  };

  const handleGithubSignIn = () => {
    setFirebaseError("");
    gitHubSignIn()
      .then(async (result) => {
        const { displayName, email, photoURL } = result.user || {};
        const assignedRole = resolveRoleForEmail(email, displayName);
        try {
          await axiosInstance.post("/api/users/register", {
            name: displayName || "User",
            email,
            photoURL: photoURL || "",
            role: assignedRole,
          });
        } catch {}
        toast.success(
          t(
            `গিটহাব লগইন সফল হয়েছে! (রোল: ${assignedRole.toUpperCase()})`,
            `GitHub login successful! (Role: ${assignedRole.toUpperCase()})`
          )
        );
        navigate(location.state?.from?.pathname || "/dashboard");
      })
      .catch((error) => {
        setFirebaseError(error.message);
        toast.error(error.message);
      });
  };

  return (
    <section
      className={`relative min-h-screen pt-16 pb-16 ${
        dark ? "bg-base-100" : "bg-gradient-to-br from-slate-50 via-white to-purple-50/30"
      }`}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:block"
        >
          <div className="relative mx-auto max-w-xl">
            <div className="mt-2 max-w-lg space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="মারকাযুল ইলমি ওয়াল হুদা"
                  className="h-14 w-14 rounded-2xl object-contain bg-white p-1 border border-primary/25 shadow-md"
                />
                <div>
                  <p className="text-sm font-bold text-primary">مركز العلم والهدى</p>
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
              <h2
                className={`text-2xl sm:text-3xl font-extrabold tracking-tight pt-2 ${
                  dark ? "text-white" : "text-slate-900"
                }`}
              >
                {t(
                  "ডিজিটাল ফি ও হিসাব ব্যবস্থাপনা পোর্টালে স্বাগতম",
                  "Welcome to the Digital Fee & Accounting Portal"
                )}
              </h2>
            </div>

            <div
              className={`mt-5 rounded-3xl border p-5 shadow-xl backdrop-blur-xl ${
                dark ? "border-slate-800 bg-slate-900/60" : "border-slate-200 bg-white/80"
              }`}
            >
              <img
                src={login}
                alt="Login Illustration"
                className="w-full rounded-2xl"
              />
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE FORM */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto w-full max-w-xl"
        >
          <div
            className={`rounded-3xl border p-6 shadow-xl backdrop-blur-2xl sm:p-8 ${
              dark ? "border-slate-800 bg-slate-900/80" : "border-slate-200 bg-white/90"
            }`}
          >
            {/* Language Switcher Top Right */}
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
                className="h-14 w-14 mx-auto mb-2 rounded-2xl object-contain bg-white p-1 border border-primary/20 shadow-sm"
              />
              <h1
                className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                  dark ? "text-white" : "text-slate-900"
                }`}
              >
                {t("ফায়ারবেস অ্যাকাউন্টে লগইন করুন", "Sign In with Firebase")}
              </h1>
              <p className={`mt-1 text-xs sm:text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
                {t(
                  "মারকাযুল ইলমি ওয়াল হুদা • আপনার নিবন্ধিত ইমেইল দিয়ে প্রবেশ করুন",
                  "Markajul Ilm Wal Huda • Sign in with your registered email"
                )}
              </p>
            </div>

            {/* Firebase Role Security Notice */}
            <div className="mb-5 p-3.5 rounded-2xl bg-primary/10 border border-primary/20 flex items-start gap-2.5 text-xs text-primary">
              <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {t(
                  "ফায়ারবেস অথেনটিকেশন সক্রিয়: লগইন করার পর আপনার ইমেইল অনুযায়ী স্বয়ংক্রিয়ভাবে নির্ধারিত পোর্টাল (অ্যাডমিন / অভিভাবক / শিক্ষক) ওপেন হবে। অ্যাডমিন ড্যাশবোর্ড থেকে যেকোনো ইমেইলের রোল নির্ধারণ করা যাবে।",
                  "Firebase Auth Active: Your role (Admin / Guardian / Teacher) is automatically determined by your email address as assigned by the Madrasa Admin."
                )}
              </p>
            </div>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              {firebaseError && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs font-semibold text-red-500">
                  {firebaseError}
                </div>
              )}

              <div>
                <label className="mb-1 block text-xs font-bold text-base-content/80">
                  {t("ইমেইল ঠিকানা", "Email Address")}
                </label>
                <div
                  className={`flex items-center rounded-2xl border px-4 transition ${
                    dark
                      ? "border-slate-800 bg-slate-950 focus-within:border-primary"
                      : "border-slate-200 bg-slate-50 focus-within:border-primary"
                  }`}
                >
                  <Mail className="h-5 w-5 text-slate-400" />
                  <input
                    type="email"
                    placeholder={t("আপনার ফায়ারবেস ইমেইল লিখুন", "Enter your Firebase email")}
                    className={`w-full bg-transparent px-3 py-3.5 outline-none text-sm ${
                      dark ? "text-white" : "text-slate-800"
                    }`}
                    {...register("email", {
                      required: t("ইমেইল আবশ্যক", "Email is required"),
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs font-medium text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-base-content/80">
                  {t("পাসওয়ার্ড", "Password")}
                </label>
                <div
                  className={`flex items-center rounded-2xl border px-4 transition ${
                    dark
                      ? "border-slate-800 bg-slate-950 focus-within:border-primary"
                      : "border-slate-200 bg-slate-50 focus-within:border-primary"
                  }`}
                >
                  <Lock className="h-5 w-5 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("পাসওয়ার্ড লিখুন", "Enter your password")}
                    className={`w-full bg-transparent px-3 py-3.5 outline-none text-sm ${
                      dark ? "text-white" : "text-slate-800"
                    }`}
                    {...register("password", {
                      required: t("পাসওয়ার্ড আবশ্যক", "Password is required"),
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-primary cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={goToForget}
                  className="text-xs font-bold text-primary transition hover:underline cursor-pointer"
                >
                  {t("পাসওয়ার্ড ভুলে গেছেন?", "Forgot Password?")}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition duration-300 hover:scale-[1.01] cursor-pointer"
              >
                <span>
                  {loading
                    ? t("প্রবেশ করা হচ্ছে...", "Signing in...")
                    : t("লগইন করুন", "Sign In")}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="pt-1 text-center text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {t("নতুন অ্যাকাউন্ট খুলতে চান?", "Don't have an account?")}{" "}
                <Link className="font-bold text-primary hover:underline" to="/signup">
                  {t("রেজিস্ট্রেশন করুন", "Create Account")}
                </Link>
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className={`flex items-center justify-center gap-2.5 rounded-2xl border px-4 py-2.5 font-bold text-xs shadow-sm transition cursor-pointer ${
                    dark
                      ? "border-slate-800 bg-slate-950 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-700"
                  }`}
                >
                  <img src={google} alt="Google" className="h-4 w-4" />
                  <span>{t("গুগল লগইন", "Google Login")}</span>
                </button>

                <button
                  type="button"
                  onClick={handleGithubSignIn}
                  className={`flex items-center justify-center gap-2.5 rounded-2xl border px-4 py-2.5 font-bold text-xs shadow-sm transition cursor-pointer ${
                    dark
                      ? "border-slate-800 bg-slate-950 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-700"
                  }`}
                >
                  <img src={github} alt="GitHub" className="h-4 w-4" />
                  <span>{t("গিটহাব লগইন", "GitHub Login")}</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SignIn;
