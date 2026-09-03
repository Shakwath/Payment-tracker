import { useContext, useState } from "react";
import Registeri from "../../assets/SignUp.png";
import google from "../../assets/google.svg";
import github from "../../assets/github.svg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useTheme } from "../../Context/ThemeProvider";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ImageIcon,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import useAxios from "../../Hooks/useAxios";

const fields = [
  {
    name: "name",
    label: "Full Name",
    icon: User,
    type: "text",
    placeholder: "Enter your name",
  },
  {
    name: "photo",
    label: "Photo URL",
    icon: ImageIcon,
    type: "url",
    placeholder: "https://image.com/photo.jpg",
  },
  {
    name: "email",
    label: "Email",
    icon: Mail,
    type: "email",
    placeholder: "Enter your email",
  },
];

const SignUp = () => {
  const { createUser, setUser, updateUserProfile, loading, googleSignIn, gitHubSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");

  const { theme } = useTheme();
  const dark = theme === "dark";

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  const password = watch("password", "");
  const rules = [
    {
      text: "6+ characters",
      valid: password.length >= 6
    },
    {
      text: "Uppercase letter",
      valid: /[A-Z]/.test(password)
    },
    {
      text: "Lowercase letter",
      valid: /[a-z]/.test(password)
    }
  ];

  const handleRegister = (data) => {
    const { name, email, password, photo } = data;
    createUser(email, password)
      .then(({ user }) => {
        updateUserProfile(name, photo)
          .then(() => {
            localStorage.setItem("userPassword", password);

            setUser({
              ...user,
              displayName: name,
              photoURL: photo
            });

            axiosInstance.post("/api/users/register", {
              name,
              email,
              photoURL: photo
            });

            toast.success("Account created!");
            reset();
            navigate("/");
          });
      })
      .catch(err => {
        setFirebaseError(err.message);
        toast.error(err.message);
      });
  };

  const handleGoogleSignIn = () => {
    setFirebaseError("");
    googleSignIn()
      .then(async (result) => {
        const { displayName, email, photoURL } = result.user;
        try {
          await axiosInstance.post("/api/users/register", {
            name: displayName || "User",
            email,
            photoURL: photoURL || "",
          });
        } catch (dbErr) {
          console.error("Database registration failed, continuing login:", dbErr);
        }

        toast.success("Signed up with Google!");
        navigate("/");
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
        const { displayName, email, photoURL } = result.user;
        try {
          await axiosInstance.post("/api/users/register", {
            name: displayName || "User",
            email,
            photoURL: photoURL || "",
          });
        } catch (dbErr) {
          console.error("Database registration failed, continuing login:", dbErr);
        }

        toast.success("Signed up with GitHub!");
        navigate("/");
      })
      .catch((error) => {
        setFirebaseError(error.message);
        toast.error(error.message);
      });
  };

  const inputClass = (error) =>
    `w-full bg-transparent py-3.5 px-3 outline-none text-sm ${
      dark ? "text-white" : "text-slate-800"
    } ${error ? "" : "placeholder:text-slate-400"}`;

  return (
    <section
      className={`min-h-screen px-5 pt-24 pb-16 transition-all duration-500 ${
        dark
          ? "bg-base-100"
          : "bg-gradient-to-br from-slate-50 via-white to-purple-50/30"
      }`}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:block"
        >
          <p className="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-bold tracking-widest text-primary">
            JOIN PAYMENTTRACK • REG-01
          </p>
          <h2
            className={`mt-4 text-4xl font-extrabold leading-tight ${
              dark ? "text-white" : "text-slate-900"
            }`}
          >
            Manage and track all student payments effortlessly
          </h2>
          <div
            className={`mt-8 rounded-3xl border p-5 shadow-xl backdrop-blur ${
              dark ? "border-slate-800 bg-slate-900/60" : "border-slate-200 bg-white/80"
            }`}
          >
            <img
              src={Registeri}
              alt="Register"
              className={`w-full rounded-2xl transition duration-500 ${
                dark ? "brightness-95" : "brightness-100"
              }`}
            />
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className={`rounded-3xl border p-6 shadow-xl backdrop-blur-xl sm:p-8 transition-all duration-500 ${
              dark
                ? "border-slate-800 bg-slate-900/80"
                : "border-slate-200 bg-white/90"
            }`}
          >
            <div className="mb-6 text-center">
              <h1
                className={`text-3xl font-extrabold tracking-tight ${
                  dark ? "text-white" : "text-slate-900"
                }`}
              >
                Create Account
              </h1>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Start tracking tuition and fee collections today
              </p>
            </div>
            <form
              onSubmit={handleSubmit(handleRegister)}
              className="space-y-4"
            >
              {firebaseError && (
                <p className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-500">
                  {firebaseError}
                </p>
              )}

              {/* Common Fields */}
              {fields.map(({ name, label, icon: Icon, type, placeholder }) => (
                <div key={name}>
                  <label
                    className={`mb-1 block text-xs font-mono font-bold uppercase tracking-wider ${
                      dark ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    {label}
                  </label>

                  <div className={`flex items-center rounded-2xl border px-4 transition ${
                    errors[name]
                      ? "border-red-500 ring-2 ring-red-500/20"
                      : dark
                      ? "border-slate-800 bg-slate-950 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                      : "border-slate-200 bg-slate-50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                  }`}>
                    <Icon className="h-5 w-5 text-slate-400" />
                    <input
                      type={type}
                      placeholder={placeholder}
                      className={inputClass(errors[name])}
                      {...register(name, {
                        required: `${label} is required`,
                        ...(name === "name" && {
                          minLength: {
                            value: 5,
                            message: "Name must be 5 characters"
                          }
                        }),
                        ...(name === "email" && {
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address"
                          }
                        }),
                        ...(name === "photo" && {
                          pattern: {
                            value: /^https?:\/\/.+/,
                            message: "Enter valid image URL"
                          }
                        })
                      })}
                    />
                  </div>
                  {errors[name] && (
                    <p className="mt-1 text-xs text-red-500 font-medium">
                      {errors[name].message}
                    </p>
                  )}
                </div>
              ))}

              {/* Password */}
              <div>
                <label
                  className={`mb-1 block text-xs font-mono font-bold uppercase tracking-wider ${
                    dark ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Password
                </label>

                <div className={`flex items-center rounded-2xl border px-4 transition ${
                  errors.password
                    ? "border-red-500 ring-2 ring-red-500/20"
                    : dark
                    ? "border-slate-800 bg-slate-950 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                    : "border-slate-200 bg-slate-50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                }`}>
                  <Lock className="h-5 w-5 text-slate-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Create password"
                    className={inputClass(errors.password)}
                    {...register("password", {
                      required: "Password required"
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className={dark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-700"}
                  >
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Password Suggestion */}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {rules.map((item) => (
                    <p
                      key={item.text}
                      className={`flex items-center gap-1.5 font-mono text-[11px] ${
                        item.valid ? "text-emerald-500 font-bold" : "text-slate-400"
                      }`}
                    >
                      {item.valid ? <Check size={13} /> : <X size={13} />}
                      {item.text}
                    </p>
                  ))}
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  className={`mb-1 block text-xs font-mono font-bold uppercase tracking-wider ${
                    dark ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Confirm Password
                </label>
                <div className={`flex items-center rounded-2xl border px-4 transition ${
                  errors.confirmPassword
                    ? "border-red-500 ring-2 ring-red-500/20"
                    : dark
                    ? "border-slate-800 bg-slate-950 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                    : "border-slate-200 bg-slate-50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20"
                }`}>
                  <Lock className="h-5 w-5 text-slate-400" />
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm password"
                    className={inputClass(errors.confirmPassword)}
                    {...register("confirmPassword", {
                      required: "Confirm password required",
                      validate: (value) =>
                        value === password || "Password not matched"
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className={dark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-700"}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500 font-medium">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-secondary py-3.5 font-bold text-white shadow-lg shadow-primary/25 transition duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Creating..." : "Register"}
                {!loading && (
                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                )}
              </button>
              <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                Already have an account?
                <Link
                  to="/signin"
                  className="ml-1 font-bold text-primary hover:underline"
                >
                  Login
                </Link>
              </p>

              {/* divider */}
              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${dark ? "border-slate-800" : "border-slate-200"}`} />
                </div>
                <div className="relative flex justify-center">
                  <span
                    className={`px-4 text-xs font-mono uppercase tracking-wider ${
                      dark
                        ? "bg-slate-900 text-slate-500"
                        : "bg-white text-slate-400"
                    }`}
                  >
                    Or continue with
                  </span>
                </div>
              </div>

              {/* social login */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className={`flex items-center justify-center gap-3 rounded-2xl border px-4 py-3 font-semibold text-sm shadow-sm transition hover:scale-[1.02] active:scale-[0.98] ${
                    dark
                      ? "border-slate-800 bg-slate-950 text-white hover:bg-slate-800"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white"
                  }`}
                >
                  <img src={google} alt="Google" className="h-5 w-5" />
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={handleGithubSignIn}
                  className={`flex items-center justify-center gap-3 rounded-2xl border px-4 py-3 font-semibold text-sm shadow-sm transition hover:scale-[1.02] active:scale-[0.98] ${
                    dark
                      ? "border-slate-800 bg-slate-950 text-white hover:bg-slate-800"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white"
                  }`}
                >
                  <img src={github} alt="GitHub" className="h-5 w-5" />
                  <span>GitHub</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SignUp;