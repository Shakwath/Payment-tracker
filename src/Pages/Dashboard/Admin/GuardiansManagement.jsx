import { useState } from "react";
import { UserCheck, Plus, Search, Phone, Mail, Link2, X } from "lucide-react";
import { toast } from "react-toastify";
import { useMadrasa } from "../../../Context/MadrasaContext";
import useAuth from "../../../Hooks/useAuth";
import { useLanguage } from "../../../Context/LanguageContext";

const GuardiansManagement = () => {
  const { guardians, students, addGuardian, updateGuardian } = useMadrasa();
  const { assignEmailRole } = useAuth();
  const { t } = useLanguage();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [linkingGuardian, setLinkingGuardian] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    relation: "পিতা",
    occupation: "",
    address: "",
  });

  const filtered = guardians.filter((g) => {
    const q = search.toLowerCase();
    return (
      g.name.toLowerCase().includes(q) ||
      g.phone.toLowerCase().includes(q) ||
      (g.email || "").toLowerCase().includes(q) ||
      g.guardianId.toLowerCase().includes(q)
    );
  });

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error(t("অভিভাবকের নাম ও মোবাইল নম্বর আবশ্যক", "Name and phone are required"));
      return;
    }
    const created = await addGuardian(formData);
    if (formData.email?.trim()) {
      assignEmailRole({
        email: formData.email,
        role: "guardian",
        name: formData.name,
        linkedId: created?._id || "grd-01",
      });
    }
    toast.success(
      t(
        `অভিভাবক ${formData.name} সফলভাবে যুক্ত হয়েছেন এবং ইমেইলে Guardian রোল সেট হয়েছে!`,
        `Guardian ${formData.name} added and assigned Guardian role!`
      )
    );
    setModalOpen(false);
    setFormData({ name: "", phone: "", email: "", relation: "পিতা", occupation: "", address: "" });
  };

  const toggleLinkStudent = async (guardian, stuId) => {
    const current = guardian.linkedStudentIds || [];
    const exists = current.includes(stuId);
    const updatedIds = exists ? current.filter((id) => id !== stuId) : [...current, stuId];
    await updateGuardian(guardian._id, { linkedStudentIds: updatedIds });
    setLinkingGuardian({ ...guardian, linkedStudentIds: updatedIds });
    toast.success(
      t("অভিভাবকের সাথে সংযুক্ত ছাত্র তালিকা আপডেট হয়েছে!", "Updated linked students!")
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <UserCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
              {t(
                "অভিভাবক তালিকা, ইমেইল রোল ও ছাত্র সংযুক্তিকরণ",
                "Guardian Directory, Email Role & Student Linking"
              )}
            </h1>
            <p className="text-xs text-base-content/60">
              {t(
                "অভিভাবকের ইমেইল যুক্ত করলে সেই ইমেইলে স্বয়ংক্রিয়ভাবে ফায়ারবেস 'Guardian' রোল নির্ধারিত হবে",
                "Adding a guardian email automatically assigns the Firebase 'Guardian' role to that email"
              )}
            </p>
          </div>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>{t("নতুন অভিভাবক যোগ করুন", "Add Guardian Account")}</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 flex items-center gap-3">
        <Search className="h-4 w-4 text-base-content/40" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t(
            "অভিভাবকের নাম, মোবাইল নম্বর, ইমেইল বা আইডি দিয়ে খুঁজুন...",
            "Search guardian by name, phone, email, or ID..."
          )}
          className="w-full bg-transparent text-xs outline-none"
        />
      </div>

      {/* Guardian Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((g) => {
          const linkedList = students.filter(
            (s) => (g.linkedStudentIds || []).includes(s._id) || s.guardianId === g._id
          );
          return (
            <div
              key={g._id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-primary uppercase">
                    {g.guardianId} • {g.relation}
                  </span>
                  <h3 className="text-base font-extrabold text-base-content mt-0.5">{g.name}</h3>
                  <p className="text-xs text-base-content/60">{g.address}</p>
                </div>
                <button
                  onClick={() => setLinkingGuardian(g)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary hover:text-white transition cursor-pointer"
                >
                  <Link2 className="h-3.5 w-3.5" />
                  <span>
                    {t("ছাত্র যুক্ত করুন", "Link Students")} ({linkedList.length})
                  </span>
                </button>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-base-content/70 font-mono">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  {g.phone}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                  {g.email}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold text-base-content/50 block mb-2">
                  {t("সংযুক্ত ছাত্রসমূহ", "Linked Students")} ({linkedList.length}):
                </span>
                <div className="flex flex-wrap gap-2">
                  {linkedList.map((stu) => (
                    <span
                      key={stu._id}
                      className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
                    >
                      {stu.name} ({stu.admissionId})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Guardian Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-base-content">
                {t("নতুন অভিভাবক নিবন্ধন", "Register New Guardian")}
              </h3>
              <button onClick={() => setModalOpen(false)} className="cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  {t("অভিভাবকের পূর্ণ নাম *", "Guardian Full Name *")}
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
                    placeholder="017XXXXXXXX"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("সম্পর্ক", "Relation")}
                  </label>
                  <select
                    value={formData.relation}
                    onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  >
                    <option value="পিতা">{t("পিতা (Father)", "Father")}</option>
                    <option value="মাতা">{t("মাতা (Mother)", "Mother")}</option>
                    <option value="অভিভাবক">{t("অভিভাবক (Guardian)", "Legal Guardian")}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  {t(
                    "ফায়ারবেস লগইন ইমেইল ঠিকানা (অভিভাবক রোল পাবে) *",
                    "Firebase Login Email (Assigned Guardian Role) *"
                  )}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="guardian@gmail.com"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono"
                  required
                />
              </div>
              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  {t("বর্তমান ঠিকানা", "Residential Address")}
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
                  {t("অভিভাবক সংরক্ষণ করুন", "Save Guardian")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Link Multiple Students Modal */}
      {linkingGuardian && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-base-content">
                  {linkingGuardian.name} — {t("ছাত্র সংযুক্তিকরণ", "Link Students")}
                </h3>
                <p className="text-xs text-base-content/60">
                  {t(
                    "এই অভিভাবকের অধীনে থাকা ছাত্রদের ক্লিক করে যুক্ত বা বিযুক্ত করুন",
                    "Click to link or unlink students managed by this guardian"
                  )}
                </p>
              </div>
              <button onClick={() => setLinkingGuardian(null)} className="cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {students.map((stu) => {
                const isLinked = (linkingGuardian.linkedStudentIds || []).includes(stu._id);
                return (
                  <div
                    key={stu._id}
                    onClick={() => toggleLinkStudent(linkingGuardian, stu._id)}
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between text-xs transition ${
                      isLinked
                        ? "border-primary bg-primary/10 font-bold"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div>
                      <p className="text-base-content">{stu.name}</p>
                      <p className="text-[10px] font-mono text-base-content/50">
                        {stu.admissionId} • {stu.classProgram}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] uppercase px-2.5 py-1 rounded-lg bg-base-100">
                      {isLinked ? t("✓ সংযুক্ত", "✓ Linked") : t("যুক্ত করুন", "Link")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuardiansManagement;
