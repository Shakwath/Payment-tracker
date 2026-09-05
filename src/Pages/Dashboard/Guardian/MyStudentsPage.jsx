import { Users, GraduationCap, Phone, Mail, UserCheck } from "lucide-react";
import { INITIAL_STUDENTS } from "../../../data/mockData";

const MyStudentsPage = () => {
  // Guardian's children (e.g. Arif Rahman & Nusrat Jahan)
  const myChildren = INITIAL_STUDENTS.slice(0, 2);

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase mb-1">
          <Users className="h-4 w-4" />
          <span>Guardian Portal</span>
        </div>
        <h1 className="text-2xl font-black text-base-content tracking-tight">My Registered Children</h1>
        <p className="text-xs text-base-content/60 mt-0.5">
          Overview of your children enrolled in school, class info, and tuition fee clearance status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myChildren.map((stu) => (
          <div
            key={stu.id}
            className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4"
          >
            <div className="flex items-center gap-4">
              <img src={stu.photo} alt={stu.name} className="h-14 w-14 rounded-2xl object-cover ring-2 ring-primary/30" />
              <div>
                <span className="text-[10px] font-mono font-bold text-primary px-2 py-0.5 rounded bg-primary/10">
                  {stu.id}
                </span>
                <h3 className="text-xl font-extrabold text-base-content mt-1">{stu.name}</h3>
                <p className="text-xs text-base-content/60 font-mono">
                  {stu.class} • Sec {stu.section} • Roll #{stu.roll}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-base-content/60">Monthly Fee Rate:</span>
                <span className="font-bold font-mono text-base-content">৳ {stu.monthlyFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/60">Payment Status:</span>
                <span className={`font-mono font-bold ${stu.dues > 0 ? "text-amber-500" : "text-emerald-500"}`}>
                  {stu.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-base-content/60">Outstanding Dues:</span>
                <span className={`font-bold font-mono ${stu.dues > 0 ? "text-rose-500" : "text-emerald-500"}`}>
                  ৳ {stu.dues}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyStudentsPage;
