import { useState } from "react";
import { GraduationCap, Plus, Phone, Mail, MapPin, BookOpen, Edit3, X } from "lucide-react";
import { toast } from "react-toastify";
import { useMadrasa } from "../../../Context/MadrasaContext";
import useAuth from "../../../Hooks/useAuth";
import { useLanguage } from "../../../Context/LanguageContext";

const TeachersManagement = () => {
  const { teachers, addTeacher, updateTeacher } = useMadrasa();
  const { assignEmailRole } = useAuth();
  const { t } = useLanguage();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    subjects: "তাফসীরুল কুরআন, ফিকহ",
    assignedClasses: "কিতাব বিভাগ (মিযান)",
    fixedSalary: 16000,
    joiningDate: new Date().toISOString().slice(0, 10),
    status: "Active",
  });

  const openAdd = () => {
    setEditingTeacher(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      subjects: "তাজবীদ, হিফযুল কুরআন",
      assignedClasses: "হিফযুল কুরআন বিভাগ",
      fixedSalary: 16000,
      joiningDate: new Date().toISOString().slice(0, 10),
      status: "Active",
    });
    setModalOpen(true);
  };

  const openEdit = (tch) => {
    setEditingTeacher(tch);
    setFormData({
      name: tch.name,
      phone: tch.phone,
      email: tch.email || "",
      address: tch.address || "",
      subjects: (tch.subjects || []).join(", "),
      assignedClasses: (tch.assignedClasses || []).join(", "),
      fixedSalary: tch.fixedSalary,
      joiningDate: tch.joiningDate,
      status: tch.status,
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error(t("উস্তাদের নাম ও মোবাইল নম্বর আবশ্যক", "Name and phone are required"));
      return;
    }
    const payload = {
      ...formData,
      fixedSalary: Number(formData.fixedSalary),
      subjects: String(formData.subjects)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      assignedClasses: String(formData.assignedClasses)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    if (editingTeacher) {
      await updateTeacher(editingTeacher._id, payload);
      if (formData.email?.trim()) {
        assignEmailRole({
          email: formData.email,
          role: "teacher",
          name: formData.name,
          linkedId: editingTeacher._id,
        });
      }
      toast.success(
        t(
          `উস্তাদ ${formData.name}-এর তথ্য ও ইমেইল রোল আপডেট হয়েছে`,
          `Updated teacher ${formData.name} & assigned Teacher role`
        )
      );
    } else {
      const created = await addTeacher(payload);
      if (formData.email?.trim()) {
        assignEmailRole({
          email: formData.email,
          role: "teacher",
          name: formData.name,
          linkedId: created?._id || "tch-01",
        });
      }
      toast.success(
        t(
          `নতুন উস্তাদ ${formData.name} যুক্ত হয়েছেন এবং ইমেইলে Teacher রোল সেট হয়েছে`,
          `Added teacher ${formData.name} and assigned Teacher role`
        )
      );
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
              {t(
                "উস্তাদ ও শিক্ষক প্রোফাইল, ইমেইল রোল ও কিতাব বণ্টন",
                "Teacher Profiles, Email Role & Subject Assignment"
              )}
            </h1>
            <p className="text-xs text-base-content/60">
              {t(
                "উস্তাদদের ইমেইল যুক্ত করলে সেই ইমেইলে স্বয়ংক্রিয়ভাবে ফায়ারবেস 'Teacher' রোল নির্ধারিত হবে",
                "Adding a teacher email automatically assigns the Firebase 'Teacher' role to that email"
              )}
            </p>
          </div>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>{t("নতুন উস্তাদ যোগ করুন", "Add New Teacher")}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teachers.map((tch) => (
          <div
            key={tch._id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3.5">
                <img
                  src={tch.photoURL}
                  alt={tch.name}
                  className="h-12 w-12 rounded-2xl bg-primary/10 object-cover"
                />
                <div>
                  <span className="text-[10px] font-mono font-bold text-primary uppercase">
                    {tch.teacherId} • {t("যোগদান:", "Joined:")} {tch.joiningDate}
                  </span>
                  <h3 className="text-base font-extrabold text-base-content">{tch.name}</h3>
                  <p className="text-xs text-base-content/60 flex flex-wrap items-center gap-2 mt-0.5">
                    <span className="inline-flex items-center gap-1 font-mono">
                      <Phone className="h-3 w-3 text-primary" /> {tch.phone}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono">
                      <Mail className="h-3 w-3 text-primary" /> {tch.email}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-primary" /> {tch.address}
                    </span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => openEdit(tch)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white transition cursor-pointer"
                title={t("প্রোফাইল সম্পাদনা", "Edit Profile")}
              >
                <Edit3 className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(tch.subjects || []).map((sub, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-primary/10 text-primary text-xs font-bold"
                >
                  <BookOpen className="h-3 w-3" />
                  {sub}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  tch.status === "Active"
                    ? "bg-emerald-500/15 text-emerald-500"
                    : "bg-rose-500/15 text-rose-500"
                  }`}
              >
                {tch.status === "Active" ? t("সক্রিয়", "Active") : t("নিষ্ক্রিয়", "Inactive")}
              </span>
              <span className="font-mono font-extrabold text-sm text-base-content">
                {t("নির্ধারিত বেতন:", "Fixed Salary:")}{" "}
                <span className="text-emerald-500">
                  ৳ {Number(tch.fixedSalary).toLocaleString()}/{t("মাস", "mo")}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Teacher Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-base-content">
                {editingTeacher
                  ? t("উস্তাদের প্রোফাইল সম্পাদনা", "Edit Teacher Profile")
                  : t("নতুন উস্তাদ নিবন্ধন", "Register New Teacher")}
              </h3>
              <button onClick={() => setModalOpen(false)} className="cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  {t("উস্তাদের পূর্ণ নাম *", "Teacher Full Name *")}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("মোবাইল নম্বর *", "Phone Number *")}
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("মাসিক নির্ধারিত বেতন (৳) *", "Fixed Monthly Salary (৳) *")}
                  </label>
                  <input
                    type="number"
                    value={formData.fixedSalary}
                    onChange={(e) => setFormData({ ...formData, fixedSalary: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono font-bold"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  {t(
                    "ফায়ারবেস লগইন ইমেইল ঠিকানা (শিক্ষক রোল পাবে) *",
                    "Firebase Login Email (Assigned Teacher Role) *"
                  )}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="teacher@gmail.com"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  {t("নির্ধারিত কিতাব / বিষয়সমূহ (কমা দিয়ে লিখুন)", "Assigned Subjects (Comma separated)")}
                </label>
                <input
                  type="text"
                  value={formData.subjects}
                  onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                />
              </div>
              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  {t("ঠিকানা", "Address")}
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 font-bold cursor-pointer"
                >
                  {t("বাতিল", "Cancel")}
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-primary text-white font-bold cursor-pointer">
                  {t("সংরক্ষণ করুন", "Save Teacher")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersManagement;
