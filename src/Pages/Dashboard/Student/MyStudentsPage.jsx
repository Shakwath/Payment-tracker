import { Users, GraduationCap, Phone, Mail, UserCheck } from "lucide-react";
import { INITIAL_STUDENTS } from "../../../data/mockData";

const MyStudentsPage = () => {
  // Enrolled student info
  const myChildren = INITIAL_STUDENTS.slice(0, 2);

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase mb-1">
          <Users className="h-4 w-4" />
          <span>Student Portal</span>
        </div>
        <h1 className="text-2xl font-black text-base-content tracking-tight">Student Academic Overview</h1>
        <p className="text-xs text-base-content/60 mt-0.5">
          Overview of enrolled student accounts, class info, and tuition fee clearance status.
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
              <div className="flex justify-between items-center">
                <span className="text-base-content/60 font-mono">Guardian:</span>
                <span className="font-bold text-base-content">{stu.guardianName} ({stu.guardianRelation})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base-content/60 font-mono">Contact:</span>
                <span className="font-mono text-base-content">{stu.guardianPhone}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base-content/60 font-mono">Fee Clearance:</span>
                <span className={`font-mono font-bold px-2 py-0.5 rounded-full text-[10px] ${
                  stu.tuitionStatus === "Paid" ? "bg-emerald-500/15 text-emerald-500" : "bg-amber-500/15 text-amber-500"
                }`}>
                  {stu.tuitionStatus}
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
