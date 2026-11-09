import { Link } from "react-router-dom";
import { BookOpen, Users, FileSpreadsheet } from "lucide-react";
import { useMadrasa } from "../../../Context/MadrasaContext";

const TeacherSubjects = () => {
  const { teachers, students } = useMadrasa();
  const teacher = teachers[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
              আমার নির্ধারিত কিতাব ও জামাতসমূহ
            </h1>
            <p className="text-xs text-base-content/60">
              নির্ধারিত কিতাবের তালিকা, অধ্যয়নরত ছাত্র সংখ্যা এবং মাসিক অগ্রগতি ফলাফল প্রকাশ করুন
            </p>
          </div>
        </div>
        <Link
          to="/dashboard/input-student-result"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20"
        >
          <FileSpreadsheet className="h-4 w-4" />
          <span>ছাত্রের ফলাফল ইনপুট দিন</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {(teacher?.subjects || []).map((subject, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-primary/10 text-primary font-bold text-xs">
                কিতাব / বিষয় #{idx + 1}
              </span>
              <span className="text-xs text-emerald-500 font-bold">
                দ্বিতীয় সাময়িক ২০২৬ (চলমান)
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-base-content">{subject}</h3>
            <p className="text-xs text-base-content/60">
              নির্ধারিত জামাত: {(teacher?.assignedClasses || []).join(" • ")}
            </p>
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <Users className="h-4 w-4 text-primary" />
                {students.filter((s) => s.status === "Active").length} জন সক্রিয় ছাত্র
              </span>
              <Link
                to="/dashboard/input-student-result"
                className="text-primary font-bold hover:underline"
              >
                ফলাফল ও মূল্যায়ন দিন →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherSubjects;
