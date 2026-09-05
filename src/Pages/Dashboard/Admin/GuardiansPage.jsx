import { useState } from "react";
import { UserCheck, Search, Plus, Phone, Mail, MapPin, Briefcase, GraduationCap, X } from "lucide-react";
import { INITIAL_GUARDIANS } from "../../../data/mockData";

const GuardiansPage = () => {
  const [guardians, setGuardians] = useState(INITIAL_GUARDIANS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newGuardian, setNewGuardian] = useState({
    name: "",
    phone: "",
    email: "",
    occupation: "",
    address: "",
    studentInfo: "",
  });

  const filteredGuardians = guardians.filter(
    (g) =>
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.phone.includes(searchTerm) ||
      g.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddGuardian = (e) => {
    e.preventDefault();
    const created = {
      id: `GRD-${200 + guardians.length + 1}`,
      name: newGuardian.name,
      phone: newGuardian.phone,
      email: newGuardian.email,
      occupation: newGuardian.occupation || "Not Specified",
      address: newGuardian.address || "N/A",
      students: [newGuardian.studentInfo || "Student Linked"],
      status: "Active",
      totalPaid: "৳ 0",
      pendingDues: "৳ 0",
    };
    setGuardians([created, ...guardians]);
    setIsAddModalOpen(false);
    setNewGuardian({ name: "", phone: "", email: "", occupation: "", address: "", studentInfo: "" });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase mb-1">
            <UserCheck className="h-4 w-4" />
            <span>People Management</span>
          </div>
          <h1 className="text-2xl font-black text-base-content tracking-tight">Guardian Directory</h1>
          <p className="text-xs text-base-content/60 mt-0.5">
            Registered parents and legal guardians linked with enrolled students.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Guardian</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40" />
          <input
            type="text"
            placeholder="Search by guardian name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
          />
        </div>
      </div>

      {/* Guardians Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase font-bold text-base-content/60">
                <th className="py-4 px-6">Guardian Name & ID</th>
                <th className="py-4 px-6">Contact Info</th>
                <th className="py-4 px-6">Occupation & Address</th>
                <th className="py-4 px-6">Linked Students</th>
                <th className="py-4 px-6">Payment Ledger</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 text-xs">
              {filteredGuardians.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/50 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-black">
                        {g.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-base-content text-sm">{g.name}</p>
                        <span className="text-[10px] font-mono text-primary font-bold">{g.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1 text-[11px]">
                      <p className="flex items-center gap-1.5 text-base-content/80 font-mono">
                        <Phone className="h-3 w-3 text-primary shrink-0" />
                        {g.phone}
                      </p>
                      <p className="flex items-center gap-1.5 text-base-content/60">
                        <Mail className="h-3 w-3 text-primary shrink-0" />
                        {g.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="flex items-center gap-1 font-bold text-base-content">
                      <Briefcase className="h-3.5 w-3.5 text-primary" /> {g.occupation}
                    </p>
                    <p className="text-[11px] text-base-content/60 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-base-content/40" /> {g.address}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    {g.students.map((stu, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-base-content font-mono mr-1 mb-1"
                      >
                        <GraduationCap className="h-3 w-3 text-primary" />
                        {stu}
                      </span>
                    ))}
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-mono text-emerald-500 font-bold">Paid: {g.totalPaid}</p>
                      <p className="font-mono text-rose-500 text-[10px]">Dues: {g.pendingDues}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Guardian Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-base-content/70 hover:text-primary transition"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-xl font-extrabold text-base-content">Add Guardian Record</h3>
            <form onSubmit={handleAddGuardian} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Guardian Name"
                  value={newGuardian.name}
                  onChange={(e) => setNewGuardian({ ...newGuardian, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+880 1711-xxxxxx"
                  value={newGuardian.phone}
                  onChange={(e) => setNewGuardian({ ...newGuardian, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="guardian@email.com"
                  value={newGuardian.email}
                  onChange={(e) => setNewGuardian({ ...newGuardian, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Occupation</label>
                <input
                  type="text"
                  placeholder="e.g. Business"
                  value={newGuardian.occupation}
                  onChange={(e) => setNewGuardian({ ...newGuardian, occupation: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Street, City"
                  value={newGuardian.address}
                  onChange={(e) => setNewGuardian({ ...newGuardian, address: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Student Name & Roll</label>
                <input
                  type="text"
                  placeholder="e.g. Arif Rahman (Grade 10)"
                  value={newGuardian.studentInfo}
                  onChange={(e) => setNewGuardian({ ...newGuardian, studentInfo: e.target.value })}
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
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuardiansPage;
