import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { User, ImageIcon, Mail, Shield, Save, ArrowLeft } from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import { useTheme } from "../../Context/ThemeProvider";

const UpdateProfile = () => {
  const { user, setUser, updateUserProfile } = useAuth();
  const { theme } = useTheme();
  const dark = theme === "dark";
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Populate default values from the logged-in user
  useEffect(() => {
    if (user) {
      setValue("name", user.displayName || "");
      setValue("photo", user.photoURL || "");
    }
  }, [user, setValue]);

  const handleUpdate = async (data) => {
    const { name, photo } = data;
    setUpdating(true);
    try {
      await updateUserProfile(name, photo);
      
      // Update local state context
      setUser({
        ...user,
        displayName: name,
        photoURL: photo,
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  const inputClass = (error) =>
    `w-full bg-transparent py-3 px-3 outline-none text-sm ${
      dark ? "text-white" : "text-slate-800"
    } ${error ? "" : "placeholder:text-slate-400"}`;

  return (
    <section
      className={`min-h-[calc(100vh-4.5rem)] px-4 py-10 transition-all duration-500 flex items-center justify-center ${
        dark
          ? "bg-[#050816]"
          : "bg-gradient-to-br from-slate-50 via-white to-blue-50"
      }`}
    >
      <div className="w-full max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] border ${
            dark
              ? "border-slate-800 text-slate-300 bg-slate-900/40 hover:bg-slate-900/80"
              : "border-slate-200 text-slate-700 bg-white/50 hover:bg-white"
          }`}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: Current User Display Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div
              className={`h-full rounded-4xl border p-8 flex flex-col items-center justify-center text-center shadow-xl backdrop-blur-xl transition duration-500 ${
                dark
                  ? "border-slate-700 bg-slate-900/70 text-white"
                  : "border-white/70 bg-white/80 text-slate-800"
              }`}
            >
              {/* Profile Image with Dynamic Hover Effect */}
              <div className="relative group mb-6">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-secondary opacity-70 blur-md group-hover:opacity-100 transition duration-300 animate-pulse" />
                <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-base-100 shadow-2xl transition duration-300 group-hover:scale-105">
                  <img
                    src={
                      user?.photoURL ||
                      "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix"
                    }
                    alt="Current Profile Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* User Info */}
              <h2 className="text-2xl font-bold tracking-tight truncate max-w-full">
                {user?.displayName || "User Name"}
              </h2>
              <p
                className={`text-sm mt-1 mb-4 font-medium ${
                  dark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {user?.email}
              </p>

              {/* Status Badge */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                  dark
                    ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/25"
                    : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                }`}
              >
                <Shield size={14} />
                <span>Verified Account</span>
              </div>

              <div
                className={`w-full border-t my-6 ${
                  dark ? "border-slate-800" : "border-slate-200"
                }`}
              />

              <div className="text-left w-full space-y-3.5">
                <div>
                  <span
                    className={`block text-[11px] font-bold uppercase tracking-wider ${
                      dark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    User UID
                  </span>
                  <span className="font-mono text-xs font-semibold block truncate select-all bg-base-200 p-2.5 rounded-xl border border-base-300 mt-1">
                    {user?.uid}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Edit Profile Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div
              className={`rounded-4xl border p-6 shadow-xl backdrop-blur-xl sm:p-8 transition-all duration-500 ${
                dark
                  ? "border-slate-700 bg-slate-900/70"
                  : "border-white/70 bg-white/80"
              }`}
            >
              <div className="mb-6">
                <h1
                  className={`text-3xl font-bold tracking-tight ${
                    dark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Edit Profile
                </h1>
                <p
                  className={`text-sm mt-1 ${
                    dark ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  Update your account credentials and personalization preferences.
                </p>
              </div>

              <form onSubmit={handleSubmit(handleUpdate)} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label
                    className={`mb-1 block text-sm font-semibold ${
                      dark ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    Full Name
                  </label>
                  <div
                    className={`flex items-center rounded-2xl border px-4 transition ${
                      errors.name
                        ? "border-red-400 ring-2 ring-red-100"
                        : dark
                        ? "border-slate-700 bg-slate-800/50 focus-within:border-primary"
                        : "border-slate-200 bg-white focus-within:border-primary"
                    }`}
                  >
                    <User
                      className={`h-5 w-5 ${
                        dark ? "text-slate-500" : "text-slate-400"
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className={inputClass(errors.name)}
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 characters",
                        },
                      })}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1.5 text-xs font-semibold text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Photo URL */}
                <div>
                  <label
                    className={`mb-1 block text-sm font-semibold ${
                      dark ? "text-slate-200" : "text-slate-700"
                    }`}
                  >
                    Photo URL
                  </label>
                  <div
                    className={`flex items-center rounded-2xl border px-4 transition ${
                      errors.photo
                        ? "border-red-400 ring-2 ring-red-100"
                        : dark
                        ? "border-slate-700 bg-slate-800/50 focus-within:border-primary"
                        : "border-slate-200 bg-white focus-within:border-primary"
                    }`}
                  >
                    <ImageIcon
                      className={`h-5 w-5 ${
                        dark ? "text-slate-500" : "text-slate-400"
                      }`}
                    />
                    <input
                      type="url"
                      placeholder="https://image.com/photo.jpg"
                      className={inputClass(errors.photo)}
                      {...register("photo", {
                        required: "Photo URL is required",
                        pattern: {
                          value: /^https?:\/\/.+/,
                          message: "Please enter a valid URL starting with http/https",
                        },
                      })}
                    />
                  </div>
                  {errors.photo && (
                    <p className="mt-1.5 text-xs font-semibold text-red-500">
                      {errors.photo.message}
                    </p>
                  )}
                </div>

                {/* Email (Disabled) */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label
                      className={`block text-sm font-semibold ${
                        dark ? "text-slate-200" : "text-slate-700"
                      }`}
                    >
                      Email Address
                    </label>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        dark
                          ? "bg-slate-800/50 text-slate-500 border-slate-700"
                          : "bg-slate-100 text-slate-400 border-slate-200"
                      }`}
                    >
                      Read Only
                    </span>
                  </div>
                  <div
                    className={`flex items-center rounded-2xl border px-4 cursor-not-allowed ${
                      dark
                        ? "border-slate-800 bg-slate-900/40 text-slate-500"
                        : "border-slate-200 bg-slate-50 text-slate-400"
                    }`}
                  >
                    <Mail className="h-5 w-5" />
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full bg-transparent py-3 px-3 outline-none text-sm cursor-not-allowed opacity-80"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={updating}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-70 mt-6"
                >
                  <Save size={16} />
                  <span>{updating ? "Saving Changes..." : "Save Changes"}</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
