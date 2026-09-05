import { useState } from "react";
import { GraduationCap, Search, Plus, Phone, Mail, BookOpen, DollarSign, Calendar, X } from "lucide-react";
import { INITIAL_TEACHERS } from "../../../data/mockData";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState(INITIAL_TEACHERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newTeacher, setNewTeacher] = useState({
    name: "",
    designation: "Lecturer",
    department: "Science",
    subject: "",
    phone: "",
    email: "",
    salary: 40000,
  });

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTeacher = (e) => {
    e.preventDefault();
    const created = {
      id: `TCH-${300 + teachers.length + 1}`,
      name: newTeacher.name,
      designation: newTeacher.designation,
      department: newTeacher.department,
      subject: newTeacher.subject,
      phone: newTeacher.phone,
      email: newTeacher.email,
      salary: Number(newTeacher.salary) || 40000,
      status: "Active",
      joiningDate: new Date().toISOString().split("T")[0],
      classesAssigned: ["Grade 10-A"],
    };
    setTeachers([created, ...teachers]);
    setIsAddModalOpen(false);
    setNewTeacher({ name: "", designation: "Lecturer", department: "Science", subject: "", phone: "", email: "", salary: 40000 });
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase mb-1">
            <GraduationCap className="h-4 w-4" />
            <span>People Management</span>
          </div>
          <h1 className="text-2xl font-black text-base-content tracking-tight">Faculty & Teachers</h1>
          <p className="text-xs text-base-content/60 mt-0.5">
            Teaching staff directory, assigned subjects, and payroll parameters.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Teacher</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40" />
          <input
            type="text"
            placeholder="Search by teacher name, department, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
          />
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase font-bold text-base-content/60">
                <th className="py-4 px-6">Teacher Profile</th>
                <th className="py-4 px-6">Department & Subject</th>
                <th className="py-4 px-6">Contact Info</th>
                <th className="py-4 px-6">Monthly Salary</th>
                <th className="py-4 px-6">Status & Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 text-xs">
              {filteredTeachers.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-base-content text-sm">{t.name}</p>
                        <p className="text-[10px] text-base-content/60">{t.designation}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-base-content">{t.department}</p>
                    <p className="text-[11px] text-primary font-mono flex items-center gap-1">
                      <BookOpen className="h-3 w-3" /> {t.subject}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1 text-[11px]">
                      <p className="flex items-center gap-1.5 text-base-content/80 font-mono">
                        <Phone className="h-3 w-3 text-primary shrink-0" />
                        {t.phone}
                      </p>
                      <p className="flex items-center gap-1.5 text-base-content/60">
                        <Mail className="h-3 w-3 text-primary shrink-0" />
                        {t.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-mono font-extrabold text-emerald-500 text-sm">
                      ৳ {t.salary.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-[10px]">
                      {t.status}
                    </span>
                    <p className="text-[10px] text-base-content/50 font-mono flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3" /> Joined {t.joiningDate}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Teacher Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-base-content/70 hover:text-primary transition"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-xl font-extrabold text-base-content">Add Faculty Member</h3>
            <form onSubmit={handleAddTeacher} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Dr. John Doe"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Designation</label>
                <input
                  type="text"
                  required
                  placeholder="Assistant Professor"
                  value={newTeacher.designation}
                  onChange={(e) => setNewTeacher({ ...newTeacher, designation: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Department</label>
                  <input
                    type="text"
                    required
                    placeholder="Science"
                    value={newTeacher.department}
                    onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Physics"
                    value={newTeacher.subject}
                    onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+880 1711-xxxxxx"
                  value={newTeacher.phone}
                  onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="teacher@school.edu.bd"
                  value={newTeacher.email}
                  onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Monthly Salary (৳)</label>
                <input
                  type="number"
                  required
                  value={newTeacher.salary}
                  onChange={(e) => setNewTeacher({ ...newTeacher, salary: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-base-content/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition"
                >
                  Save Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersPage;
