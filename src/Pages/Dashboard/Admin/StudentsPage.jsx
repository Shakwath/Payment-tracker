import { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Filter,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  UserCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  UserPlus
} from "lucide-react";
import { INITIAL_STUDENTS } from "../../../data/mockData";

const StudentsPage = () => {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal states
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Student Form State
  const [newStudent, setNewStudent] = useState({
    name: "",
    roll: "",
    class: "Grade 10",
    section: "A",
    gender: "Male",
    monthlyFee: 4500,
    guardianName: "",
    guardianRelation: "Father",
    guardianPhone: "",
    guardianEmail: "",
    guardianOccupation: "",
    guardianAddress: "",
  });

  // Filter students based on search and dropdowns
  const filteredStudents = students.filter((stu) => {
    const matchesSearch =
      stu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stu.roll.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stu.guardian.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stu.guardian.phone.includes(searchTerm);

    const matchesClass = classFilter === "All" || stu.class === classFilter;
    const matchesStatus = statusFilter === "All" || stu.paymentStatus === statusFilter;

    return matchesSearch && matchesClass && matchesStatus;
  });

  // Handlers
  const handleAddStudentSubmit = (e) => {
    e.preventDefault();
    const createdStudent = {
      id: `STU-${1000 + students.length + 1}`,
      name: newStudent.name,
      roll: newStudent.roll,
      class: newStudent.class,
      section: newStudent.section,
      gender: newStudent.gender,
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      paymentStatus: "Paid",
      dues: 0,
      monthlyFee: Number(newStudent.monthlyFee) || 4000,
      lastPaymentDate: new Date().toISOString().split("T")[0],
      guardian: {
        id: `GRD-${200 + students.length + 1}`,
        name: newStudent.guardianName,
        relation: newStudent.guardianRelation,
        phone: newStudent.guardianPhone,
        email: newStudent.guardianEmail,
        occupation: newStudent.guardianOccupation,
        address: newStudent.guardianAddress,
      },
    };

    setStudents([createdStudent, ...students]);
    setIsAddModalOpen(false);
    setNewStudent({
      name: "",
      roll: "",
      class: "Grade 10",
      section: "A",
      gender: "Male",
      monthlyFee: 4500,
      guardianName: "",
      guardianRelation: "Father",
      guardianPhone: "",
      guardianEmail: "",
      guardianOccupation: "",
      guardianAddress: "",
    });
  };

  const handleDeleteStudent = (id) => {
    if (confirm("Are you sure you want to remove this student record?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  // Stats calculation
  const totalStudents = students.length;
  const paidCount = students.filter((s) => s.paymentStatus === "Paid").length;
  const pendingCount = students.filter((s) => s.paymentStatus === "Pending").length;
  const totalDuesAmount = students.reduce((acc, curr) => acc + curr.dues, 0);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase mb-1">
            <Users className="h-4 w-4" />
            <span>People Management</span>
          </div>
          <h1 className="text-2xl font-black text-base-content tracking-tight">
            Student & Guardian Records
          </h1>
          <p className="text-xs text-base-content/60 mt-0.5">
            Manage enrolled students along with their linked parent/guardian contact & fee metrics.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add New Student</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono font-bold uppercase text-base-content/60">Total Enrolled</span>
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-base-content mt-2">{totalStudents}</p>
          <span className="text-[11px] text-emerald-500 font-bold mt-1 inline-block">Active Roster</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono font-bold uppercase text-base-content/60">Fees Cleared</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-base-content mt-2">{paidCount} Students</p>
          <span className="text-[11px] text-emerald-500 font-bold mt-1 inline-block">Current Term</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono font-bold uppercase text-base-content/60">Pending Dues</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-base-content mt-2">{pendingCount} Students</p>
          <span className="text-[11px] text-amber-500 font-bold mt-1 inline-block">Notice Sent</span>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono font-bold uppercase text-base-content/60">Total Outstanding</span>
            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500">
              <AlertCircle className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-base-content mt-2">৳ {totalDuesAmount.toLocaleString()}</p>
          <span className="text-[11px] text-rose-500 font-bold mt-1 inline-block">Uncollected Balance</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/40" />
          <input
            type="text"
            placeholder="Search student, roll, or guardian..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs font-mono text-base-content/60">
            <Filter className="h-3.5 w-3.5" />
            <span>Class:</span>
          </div>
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
          >
            <option value="All">All Classes</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 7">Grade 7</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
          >
            <option value="All">All Payment Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Main Students & Guardians Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase font-bold text-base-content/60">
                <th className="py-4 px-6">Student Information</th>
                <th className="py-4 px-6">Class & Roll</th>
                <th className="py-4 px-6">Guardian Details</th>
                <th className="py-4 px-6">Guardian Contact</th>
                <th className="py-4 px-6">Fee Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70 text-xs">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-base-content/50 font-medium">
                    No student records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((stu) => (
                  <tr key={stu.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/50 transition">
                    {/* Student Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={stu.photo}
                          alt={stu.name}
                          className="h-10 w-10 rounded-xl object-cover border border-primary/20 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-base-content text-sm">{stu.name}</p>
                          <p className="text-[10px] font-mono text-primary font-bold">{stu.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Class & Roll */}
                    <td className="py-4 px-6">
                      <p className="font-bold text-base-content">{stu.class}</p>
                      <p className="text-[11px] text-base-content/60 font-mono">
                        Sec: {stu.section} • Roll: {stu.roll}
                      </p>
                    </td>

                    {/* Guardian Details */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-primary shrink-0" />
                        <div>
                          <p className="font-bold text-base-content">{stu.guardian.name}</p>
                          <span className="inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-base-content/70">
                            {stu.guardian.relation}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Guardian Contact */}
                    <td className="py-4 px-6">
                      <div className="space-y-1 text-[11px]">
                        <p className="flex items-center gap-1.5 text-base-content/80 font-mono">
                          <Phone className="h-3 w-3 text-primary shrink-0" />
                          {stu.guardian.phone}
                        </p>
                        <p className="flex items-center gap-1.5 text-base-content/60">
                          <Mail className="h-3 w-3 text-primary shrink-0" />
                          {stu.guardian.email}
                        </p>
                      </div>
                    </td>

                    {/* Fee Status */}
                    <td className="py-4 px-6">
                      <div>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase ${
                            stu.paymentStatus === "Paid"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                              : stu.paymentStatus === "Pending"
                              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                              : "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                          }`}
                        >
                          {stu.paymentStatus}
                        </span>
                        {stu.dues > 0 && (
                          <p className="text-[10px] text-rose-500 font-mono font-bold mt-1">
                            Due: ৳ {stu.dues}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedStudent(stu)}
                          title="View Full Profile"
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-primary/10 text-base-content/70 hover:text-primary transition"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(stu.id)}
                          title="Delete Student"
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-rose-500/10 text-base-content/70 hover:text-rose-500 transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: View Student & Guardian Full Details */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-base-content/70 hover:text-primary transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <img
                src={selectedStudent.photo}
                alt={selectedStudent.name}
                className="h-16 w-16 rounded-2xl object-cover ring-2 ring-primary/30"
              />
              <div>
                <span className="text-[10px] font-mono font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary/10">
                  {selectedStudent.id}
                </span>
                <h3 className="text-xl font-extrabold text-base-content mt-1">
                  {selectedStudent.name}
                </h3>
                <p className="text-xs text-base-content/60 font-mono">
                  {selectedStudent.class} • Sec {selectedStudent.section} • Roll #{selectedStudent.roll}
                </p>
              </div>
            </div>

            {/* Guardian Card Section */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold uppercase text-primary flex items-center gap-1.5">
                  <UserCheck className="h-4 w-4" /> Guardian Details
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
                  {selectedStudent.guardian.relation}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-[10px] text-base-content/50 uppercase font-mono">Guardian Name</p>
                  <p className="font-bold text-base-content">{selectedStudent.guardian.name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-base-content/50 uppercase font-mono">Occupation</p>
                  <p className="font-bold text-base-content">{selectedStudent.guardian.occupation}</p>
                </div>
                <div>
                  <p className="text-[10px] text-base-content/50 uppercase font-mono">Phone Number</p>
                  <p className="font-mono text-base-content">{selectedStudent.guardian.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] text-base-content/50 uppercase font-mono">Email Address</p>
                  <p className="font-mono text-base-content truncate">{selectedStudent.guardian.email}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-base-content/50 uppercase font-mono">Home Address</p>
                <p className="text-xs text-base-content">{selectedStudent.guardian.address}</p>
              </div>
            </div>

            {/* Fee Stats */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                <p className="text-[10px] text-base-content/50 uppercase font-mono">Monthly Tuition</p>
                <p className="text-base font-bold text-primary">৳ {selectedStudent.monthlyFee}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                <p className="text-[10px] text-base-content/50 uppercase font-mono">Current Dues</p>
                <p className={`text-base font-bold ${selectedStudent.dues > 0 ? "text-rose-500" : "text-emerald-500"}`}>
                  ৳ {selectedStudent.dues}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}

      {/* Modal: Add New Student */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-base-content/70 hover:text-primary transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <h3 className="text-xl font-extrabold text-base-content flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" /> Register New Student
              </h3>
              <p className="text-xs text-base-content/60">
                Enter student details along with mandatory parent/guardian contact information.
              </p>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="space-y-4 text-xs">
              {/* Student Information Fields */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <h4 className="font-mono text-xs font-bold uppercase text-primary">1. Student Profile</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Student Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir Hossain"
                      value={newStudent.name}
                      onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Roll Number</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 108"
                      value={newStudent.roll}
                      onChange={(e) => setNewStudent({ ...newStudent, roll: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Class / Grade</label>
                    <select
                      value={newStudent.class}
                      onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                    >
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 7">Grade 7</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Monthly Tuition Fee (৳)</label>
                    <input
                      type="number"
                      required
                      value={newStudent.monthlyFee}
                      onChange={(e) => setNewStudent({ ...newStudent, monthlyFee: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                    />
                  </div>
                </div>
              </div>

              {/* Guardian Information Fields */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <h4 className="font-mono text-xs font-bold uppercase text-primary">2. Guardian Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Guardian Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Parent / Guardian Full Name"
                      value={newStudent.guardianName}
                      onChange={(e) => setNewStudent({ ...newStudent, guardianName: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Relation</label>
                    <select
                      value={newStudent.guardianRelation}
                      onChange={(e) => setNewStudent({ ...newStudent, guardianRelation: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Legal Guardian">Legal Guardian</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1711-xxxxxx"
                      value={newStudent.guardianPhone}
                      onChange={(e) => setNewStudent({ ...newStudent, guardianPhone: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="parent@email.com"
                      value={newStudent.guardianEmail}
                      onChange={(e) => setNewStudent({ ...newStudent, guardianEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Residential Address</label>
                  <input
                    type="text"
                    placeholder="House, Road, City"
                    value={newStudent.guardianAddress}
                    onChange={(e) => setNewStudent({ ...newStudent, guardianAddress: e.target.value })}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-base-content/70 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition shadow-md shadow-primary/20"
                >
                  Save & Register Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentsPage;
