import { User, Phone, Mail, MapPin, Briefcase } from "lucide-react";
import useAuth from "../../../Hooks/useAuth";

const GuardianProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm text-center">
        <img
          src={user?.photoURL || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"}
          alt="Guardian"
          className="h-20 w-20 rounded-3xl object-cover mx-auto ring-4 ring-primary/20 mb-3"
        />
        <h1 className="text-2xl font-black text-base-content tracking-tight">{user?.displayName || "Rafiqul Islam Rahman"}</h1>
        <span className="text-xs font-mono font-bold text-primary px-3 py-1 rounded-full bg-primary/10 inline-block mt-1">
          Registered Parent / Guardian
        </span>
      </div>

      <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4 text-xs">
        <h3 className="font-extrabold text-base-content text-sm">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] uppercase font-mono text-base-content/50">Phone</p>
            <p className="font-bold text-base-content flex items-center gap-1 mt-0.5"><Phone className="h-3 w-3 text-primary" /> +880 1711-234567</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono text-base-content/50">Email</p>
            <p className="font-bold text-base-content flex items-center gap-1 mt-0.5"><Mail className="h-3 w-3 text-primary" /> {user?.email || "rafiq.rahman@gmail.com"}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono text-base-content/50">Occupation</p>
            <p className="font-bold text-base-content flex items-center gap-1 mt-0.5"><Briefcase className="h-3 w-3 text-primary" /> Senior Software Engineer</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono text-base-content/50">Residential Address</p>
            <p className="font-bold text-base-content flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3 text-primary" /> Dhanmondi, Dhaka</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardianProfilePage;
