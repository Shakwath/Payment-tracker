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
    name:"name",
    label:"Full Name",
    icon:User,
    type:"text",
    placeholder:"Enter your name",
  },
  {
    name:"photo",
    label:"Photo URL",
    icon:ImageIcon,
    type:"url",
    placeholder:"https://image.com/photo.jpg",
  },
  {
    name:"email",
    label:"Email",
    icon:Mail,
    type:"email",
    placeholder:"Enter your email",
  },
];

const SignUp = () => {

  const {createUser,setUser,updateUserProfile,loading,googleSignIn,gitHubSignIn}=useContext(AuthContext);
  const navigate=useNavigate();
  const axiosInstance=useAxios();

  const [showPass,setShowPass]=useState(false);
  const [showConfirm,setShowConfirm]=useState(false);
  const [firebaseError,setFirebaseError]=useState("");

  const { theme } = useTheme();
  const dark = theme === "dark";

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState:{errors}
  }=useForm();

  const password=watch("password","");
  const rules=[
    {
      text:"6+ characters",
      valid:password.length>=6
    },
    {
      text:"Uppercase letter",
      valid:/[A-Z]/.test(password)
    },
    {
      text:"Lowercase letter",
      valid:/[a-z]/.test(password)
    }
  ];

  const handleRegister=(data)=>{
    const {name,email,password,photo}=data;
    createUser(email,password)
    .then(({user})=>{
      updateUserProfile(name,photo)
      .then(()=>{
        localStorage.setItem("userPassword", password);

        setUser({
          ...user,
          displayName:name,
          photoURL:photo
        });

        axiosInstance.post("/api/users/register",{
          name,
          email,
          photoURL:photo
        });

        toast.success("Account created!");
        reset();
        navigate("/");
      });

    })
    .catch(err=>{
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

  const inputClass=(error)=>
    `w-full bg-transparent py-3 px-3 outline-none text-slate-800 
    ${error?"":"placeholder:text-slate-400"}`;
  return (
    <section
      className={`min-h-screen px-5 py-10 transition-all duration-500 ${
        dark
          ? "bg-slate-900"
          : "bg-gradient-to-br from-slate-50 via-white to-amber-50/40"
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
          <p className="inline-block rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-amber-600 dark:text-amber-400">
            JOIN PAYMENTTRACK
          </p>
          <h2
            className={`mt-4 text-4xl font-bold ${
              dark ? "text-white" : "text-slate-900"
            }`}
          >
            Manage and track all student payments effortlessly
          </h2>
          <div
            className={`mt-8 rounded-4xl border p-5 shadow-xl backdrop-blur ${
              dark ? "border-slate-800 bg-slate-900/70" : "border-white bg-white/70"
            }`}
          >
            <img
              src={Registeri}
              alt="Register"
              className={`w-full rounded-3xl transition duration-500 ${
                dark ? "brightness-45" : "brightness-100"
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
            className={`rounded-4xl border p-6 shadow-xl backdrop-blur-xl sm:p-8 transition-all duration-500 ${
              dark
                ? "border-slate-800 bg-slate-900/70"
                : "border-white/70 bg-white/80"
            }`}
          >
            <div className="mb-6 text-center">
              <h1
                className={`text-3xl font-bold ${
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
                <p className="rounded-xl bg-red-50 p-3 text-sm text-red-500">
                  {firebaseError}
                </p>
              )}

              {/* Common Fields */}
              {fields.map(({name,label,icon:Icon,type,placeholder})=>(
                <div key={name}>
                 <label
                  className={`mb-1 block text-sm font-semibold ${  dark ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {label}
                </label>

                  <div className={`
                 flex items-center rounded-2xl border px-4 ${dark  ?"text-slate-300 border-slate-700":"bg-white border-slate-200"
                  } ${errors[name]?"border-red-400":"border-slate-200"}
                  `}>
                    <Icon className="h-5 w-5 text-slate-400"/>
                    <input
                      type={type}
                      placeholder={placeholder}
                      className={inputClass(errors[name])}
                      {...register(name,{
                        required:`${label} is required`,
                        ...(name==="name" && {
                          minLength:{
                            value:5,
                            message:"Name must be 5 characters"
                          }
                        }),
                        ...(name==="email" && {
                          pattern:{
                            value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/ ,
                            message:"Invalid email address"
                          }
                        }),
                        ...(name==="photo" && {
                          pattern:{
                            value:/^https?:\/\/.+/ ,
                            message:"Enter valid image URL"
                          }
                        })
                      })}
                    />
                  </div>
                  {errors[name] &&
                  <p className="mt-1 text-sm text-red-500">
                    {errors[name].message}
                  </p>}
                </div>
              ))}

              {/* Password */}
              <div>
                  <label
                  className={`mb-1 block text-sm font-semibold ${
                    dark ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  Password
                </label>

                <div className="flex items-center rounded-2xl border border-slate-200 px-4">
                  <Lock className="h-5 w-5 text-slate-400"/>
                  <input
                    type={showPass?"text":"password"}
                    placeholder="Create password"
                    className={inputClass()}
                    {...register("password",{
                      required:"Password required"
                    })}
                  />
                  <button
                    type="button"
                    onClick={()=>setShowPass(!showPass)}
                  >
                    {
                      showPass?
                      <EyeOff size={20}/>:
                      <Eye size={20}/>
                    }
                  </button>
                </div>

                {/* Password Suggestion */}
                <div className="mt-2 flex  flex-wrap space-y-1">
                  {
                    rules.map(item=>(
                      <p
                        key={item.text}
                        className={`flex items-center gap-2 text-xs ${ item.valid ?"text-green-600"  :"text-slate-400"
                        }`}
                      >
                        {
                          item.valid?
                          <Check size={14}/>:
                          <X size={14}/>
                        }
                        {item.text}
                      </p>
                    ))
                  }
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                  <label
                  className={`mb-1 block text-sm font-semibold ${
                    dark ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  Confirm Password
                </label>
                <div className="flex items-center rounded-2xl border border-slate-200 px-4">
                  <Lock className="h-5 w-5 text-slate-400"/>
                  <input
                    type={showConfirm?"text":"password"}
                    placeholder="Confirm password"
                    className={inputClass()}
                    {...register("confirmPassword",{
                      required:"Confirm password required",
                      validate:value=>
                      value===password ||
                      "Password not matched"

                    })}
                  />
                  <button
                    type="button"
                    onClick={()=>setShowConfirm(!showConfirm)}
                  >
                    {
                      showConfirm?
                      <EyeOff size={20}/>:
                      <Eye size={20}/>
                    }
                  </button>
                </div>
                {
                  errors.confirmPassword &&
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                }
              </div>

              <button
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 font-semibold text-white shadow-lg shadow-amber-500/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-amber-500/35 disabled:cursor-not-allowed disabled:opacity-70"
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
                  className="ml-1 font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400"
                >
                  Login
                </Link>
              </p>

              {/* divider */}
              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${ dark ? "border-slate-800" : "border-slate-200"
                    }`}
                  />
                </div>
                <div className="relative flex justify-center">
                  <span
                    className={`px-4 text-sm ${
                      dark
                        ? "bg-slate-900 text-slate-400"
                        : "bg-white text-slate-500"
                    }`}
                  >
                    Or continue with
                  </span>
                </div>
              </div>

             
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SignUp;