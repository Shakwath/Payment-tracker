import { GraduationCap, Phone, Mail, BookOpen } from "lucide-react";
import useAuth from "../../../Hooks/useAuth";

const TeacherProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm text-center">
        <img
          src={user?.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
          alt="Teacher"
          className="h-20 w-20 rounded-3xl object-cover mx-auto ring-4 ring-primary/20 mb-3"
        />
        <h1 className="text-2xl font-black text-base-content tracking-tight">{user?.displayName || "Dr. Mahmudul Hasan"}</h1>
        <span className="text-xs font-mono font-bold text-primary px-3 py-1 rounded-full bg-primary/10 inline-block mt-1">
          Senior Mathematics Lecturer
        </span>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4 text-xs">
        <h3 className="font-extrabold text-base-content text-sm">Faculty Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] uppercase font-mono text-base-content/50">Department</p>
            <p className="font-bold text-base-content mt-0.5">Science & Mathematics</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono text-base-content/50">Subject</p>
            <p className="font-bold text-primary font-mono mt-0.5">Higher Mathematics</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono text-base-content/50">Phone</p>
            <p className="font-bold text-base-content font-mono mt-0.5">+880 1712-990011</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono text-base-content/50">Official Email</p>
            <p className="font-bold text-base-content font-mono mt-0.5">{user?.email || "mahmudul.hasan@school.edu.bd"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfilePage;
