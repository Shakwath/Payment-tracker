import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Ghost } from "lucide-react";
import { useTheme } from "../../Context/ThemeProvider";

const ErrorPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div
      className={`min-h-screen flex items-center justify-center overflow-hidden px-5 transition-all duration-500
      ${
        isDark ? "bg-slate-900 text-white" : "bg-gradient-to-br from-slate-100 via-white to-amber-50 text-gray-900"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className={`relative z-10 max-w-xl w-full text-center p-10 rounded-3xl backdrop-blur-xl border
        ${
          isDark
            ? "bg-slate-800/80 border-slate-700 shadow-[0_0_50px_rgba(245,158,11,.15)]"
            : "bg-white/70 border-gray-200 shadow-xl"
        }`}
      >
        {/* 404 Animation */}
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="flex justify-center"
        >
          <div
            className={`relative text-[120px] font-black tracking-widest ${
              isDark ? "text-amber-500" : "text-gray-800"
            }`}
          >
            404
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -right-5 top-5"
            >
              <Ghost size={45} className="text-amber-500" />
            </motion.div>
          </div>
        </motion.div>
        <h1 className="text-3xl font-bold mt-3">
          Oops! Page Not Found
        </h1>
        <p
          className={`mt-3 ${
            isDark ? "text-slate-400" : "text-gray-600"
          }`}
        >
          The page you are looking for doesn't exist or has been moved
        </p>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => navigate("/")}
          className="mt-8 px-8 py-3.5 rounded-full flex items-center gap-2 mx-auto font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/35 transition-all"
        >
          <Home size={20} />
          Back Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ErrorPage;