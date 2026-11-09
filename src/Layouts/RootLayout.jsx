import { Outlet } from "react-router-dom";
import Navbar from "../Components/Common/Navbar";
import Footer from "../Components/Common/Footer";

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100/70 via-purple-50/30 via-30% to-base-100 dark:from-purple-950/50 dark:via-slate-900 dark:to-base-100 text-base-content transition-colors duration-300">
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
