import { User, Phone, Mail, MapPin, BookOpen, Shield } from "lucide-react";
import { useMadrasa } from "../../../Context/MadrasaContext";

const TeacherProfile = () => {
  const { teachers } = useMadrasa();
  const teacher = teachers[0];

  if (!teacher) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={teacher.photoURL}
            alt={teacher.name}
            className="h-20 w-20 rounded-3xl bg-primary/10 object-cover ring-4 ring-primary/20"
          />
          <div>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold">
              {teacher.teacherId} • {teacher.status === "Active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
            </span>
            <h1 className="text-2xl font-extrabold text-base-content mt-2">{teacher.name}</h1>
            <p className="text-xs text-base-content/60 font-mono">
              যোগদানের তারিখ: {teacher.joiningDate}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-right">
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block">
            নির্ধারিত মাসিক বেতন
          </span>
          <span className="text-2xl font-mono font-black text-emerald-600 dark:text-emerald-400">
            ৳ {Number(teacher.fixedSalary).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-extrabold text-base-content flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            <span>ব্যক্তিগত ও যোগাযোগের তথ্য</span>
          </h3>
          <div className="space-y-3 font-mono">
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-primary" />
              <span>{teacher.phone}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-primary" />
              <span>{teacher.email}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-sans">{teacher.address}</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-extrabold text-base-content flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span>নির্ধারিত কিতাব ও জামাতসমূহ</span>
          </h3>
          <div className="space-y-2">
            <p className="text-base-content/60 font-bold text-[11px]">নির্ধারিত কিতাব/বিষয়:</p>
            <div className="flex flex-wrap gap-2">
              {(teacher.subjects || []).map((sub, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl bg-primary/10 text-primary font-bold"
                >
                  {sub}
                </span>
              ))}
            </div>
            <p className="text-base-content/60 font-bold text-[11px] pt-2">
              নির্ধারিত জামাত / বিভাগ:
            </p>
            <div className="flex flex-wrap gap-2">
              {(teacher.assignedClasses || []).map((cls, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 font-semibold"
                >
                  {cls}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5 text-xs text-base-content/60">
        <Shield className="h-4 w-4 text-primary shrink-0" />
        <span>
          রোল-ভিত্তিক নিরাপত্তা সক্রিয়: মাদ্রাসার অভ্যন্তরীণ আর্থিক লেজার শুধুমাত্র মুহতামিম / অ্যাডমিন প্যানেলে সংরক্ষিত।
        </span>
      </div>
    </div>
  );
};

export default TeacherProfile;
