import { BookOpen, Users, Calendar } from "lucide-react";

const MySubjectsPage = () => {
  const subjects = [
    { class: "Grade 10 - Sec A", subject: "Higher Mathematics", students: 45, schedule: "Mon, Wed 09:00 AM" },
    { class: "Grade 9 - Sec B", subject: "General Mathematics", students: 40, schedule: "Tue, Thu 11:30 AM" },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase mb-1">
          <BookOpen className="h-4 w-4" />
          <span>Teacher Hub</span>
        </div>
        <h1 className="text-2xl font-black text-base-content tracking-tight">Assigned Subjects & Classes</h1>
        <p className="text-xs text-base-content/60 mt-0.5">
          Classes assigned to your faculty schedule for the current semester.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((sub, idx) => (
          <div key={idx} className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
            <h3 className="text-lg font-extrabold text-base-content">{sub.class}</h3>
            <p className="text-xs font-mono font-bold text-primary">{sub.subject}</p>
            <div className="space-y-1 text-xs text-base-content/70 pt-2 border-t border-slate-200 dark:border-slate-800">
              <p className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-primary" /> {sub.students} Enrolled Students</p>
              <p className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary" /> {sub.schedule}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySubjectsPage;
