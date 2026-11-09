import { useState } from "react";
import {
  ShieldCheck,
  UserPlus,
  Mail,
  Shield,
  UserCheck,
  GraduationCap,
  Trash2,
  Search,
} from "lucide-react";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import { useMadrasa } from "../../../Context/MadrasaContext";
import { useLanguage } from "../../../Context/LanguageContext";

const UserRolesManagement = () => {
  const { user, emailRoles, assignEmailRole, removeEmailRole } = useAuth();
  const { guardians, teachers, recordAudit } = useMadrasa();
  const { t } = useLanguage();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    role: "guardian",
    linkedId: guardians[0]?._id || "grd-01",
  });

  const filtered = (emailRoles || []).filter((item) => {
    const q = search.toLowerCase();
    const matchesSearch =
      item.email.toLowerCase().includes(q) ||
      (item.name || "").toLowerCase().includes(q);
    const matchesRole = roleFilter === "All" || item.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAssign = (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      toast.error(t("ইমেইল ঠিকানা আবশ্যক", "Email address is required"));
      return;
    }

    let resolvedName = formData.name.trim();
    if (!resolvedName) {
      if (formData.role === "guardian") {
        const g = guardians.find((x) => x._id === formData.linkedId);
        resolvedName = g?.name || formData.email.split("@")[0];
      } else if (formData.role === "teacher") {
        const tch = teachers.find((x) => x._id === formData.linkedId);
        resolvedName = tch?.name || formData.email.split("@")[0];
      } else {
        resolvedName = formData.email.split("@")[0];
      }
    }

    assignEmailRole({
      email: formData.email,
      role: formData.role,
      name: resolvedName,
      linkedId: formData.linkedId,
    });

    recordAudit(
      "USER_ROLE_ASSIGNED",
      "users",
      formData.email.trim().toLowerCase(),
      "Role Assignment",
      `${formData.email.trim().toLowerCase()} -> ${formData.role.toUpperCase()}`
    );

    toast.success(
      t(
        `${formData.email}-কে "${formData.role}" রোল নির্ধারণ করা হয়েছে!`,
        `Assigned "${formData.role}" role to ${formData.email}!`
      )
    );

    setFormData({
      email: "",
      name: "",
      role: "guardian",
      linkedId: guardians[0]?._id || "grd-01",
    });
  };

  const handleQuickRoleChange = (item, newRole) => {
    assignEmailRole({
      email: item.email,
      role: newRole,
      name: item.name,
      linkedId: item.linkedId,
    });
    recordAudit(
      "USER_ROLE_CHANGED",
      "users",
      item.email,
      `Role: ${item.role}`,
      `Role: ${newRole}`
    );
    toast.success(
      t(
        `${item.email}-এর রোল পরিবর্তন করে "${newRole}" করা হয়েছে!`,
        `Updated ${item.email} role to "${newRole}"!`
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
              {t(
                "ফায়ারবেস ইমেইল ও রোল নির্ধারণ (Admin Role Control)",
                "Firebase Email & Role Assignment (Admin Control)"
              )}
            </h1>
            <p className="text-xs text-base-content/60">
              {t(
                "কোন ইমেইল দিয়ে লগইন করলে অভিভাবক (Guardian), কোন ইমেইল উস্তাদ (Teacher) এবং কোন ইমেইল অ্যাডমিন (Admin) হবে তা নির্ধারণ করুন",
                "Assign which Firebase email logs in as Guardian, Teacher, or Admin"
              )}
            </p>
          </div>
        </div>

        {user?.email && (
          <div className="px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
            <span className="text-base-content/60 block text-[10px]">
              {t("বর্তমান লগইনকৃত ফায়ারবেস ইমেইল:", "Logged-in Firebase Email:")}
            </span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {user.email}
            </span>
          </div>
        )}
      </div>

      {/* Add / Assign Email Role Form */}
      <form
        onSubmit={handleAssign}
        className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4 text-xs"
      >
        <div className="flex items-center gap-2 text-sm font-extrabold text-base-content border-b border-slate-200 dark:border-slate-800 pb-3">
          <UserPlus className="h-4 w-4 text-primary" />
          <span>
            {t(
              "নতুন ইমেইলে রোল (অভিভাবক / শিক্ষক / অ্যাডমিন) নির্ধারণ করুন",
              "Assign Role (Guardian / Teacher / Admin) to an Email"
            )}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="font-bold text-base-content/70 block mb-1">
              {t("ফায়ারবেস ইমেইল ঠিকানা *", "Firebase Email Address *")}
            </label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@gmail.com"
                className="w-full bg-transparent outline-none font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-base-content/70 block mb-1">
              {t("ব্যবহারকারীর নাম", "User Full Name")}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t("যেমন: মাওলানা আব্দুল করিম", "e.g. Maulana Abdul Karim")}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
            />
          </div>

          <div>
            <label className="font-bold text-base-content/70 block mb-1">
              {t("নির্ধারিত রোল (Role) *", "Assigned Role *")}
            </label>
            <select
              value={formData.role}
              onChange={(e) => {
                const nextRole = e.target.value;
                setFormData({
                  ...formData,
                  role: nextRole,
                  linkedId:
                    nextRole === "guardian"
                      ? guardians[0]?._id || "grd-01"
                      : nextRole === "teacher"
                      ? teachers[0]?._id || "tch-01"
                      : "adm-01",
                });
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold"
            >
              <option value="guardian">
                {t("অভিভাবক (Guardian)", "Guardian (অভিভাবক)")}
              </option>
              <option value="teacher">
                {t("উস্তাদ / শিক্ষক (Teacher)", "Teacher (উস্তাদ / শিক্ষক)")}
              </option>
              <option value="admin">
                {t("মুহতামিম / অ্যাডমিন (Admin)", "Admin (মুহতামিম / অ্যাডমিন)")}
              </option>
            </select>
          </div>

          <div>
            <label className="font-bold text-base-content/70 block mb-1">
              {formData.role === "guardian"
                ? t("সংযুক্ত অভিভাবক প্রোফাইল", "Linked Guardian Profile")
                : formData.role === "teacher"
                ? t("সংযুক্ত শিক্ষক প্রোফাইল", "Linked Teacher Profile")
                : t("অ্যাডমিন অ্যাক্সেস লেভেল", "Admin Access Level")}
            </label>
            {formData.role === "guardian" ? (
              <select
                value={formData.linkedId}
                onChange={(e) => setFormData({ ...formData, linkedId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
              >
                {guardians.map((g) => (
                  <option key={g._id} value={g._id}>
                    {g.name} ({g.guardianId})
                  </option>
                ))}
              </select>
            ) : formData.role === "teacher" ? (
              <select
                value={formData.linkedId}
                onChange={(e) => setFormData({ ...formData, linkedId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
              >
                {teachers.map((tch) => (
                  <option key={tch._id} value={tch._id}>
                    {tch.name} ({tch.teacherId})
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                disabled
                value={t("পূর্ণ অ্যাডমিন নিয়ন্ত্রণ", "Full Admin Access")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 opacity-70"
              />
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white font-bold shadow-md shadow-primary/20 cursor-pointer"
          >
            <UserPlus className="h-4 w-4" />
            <span>{t("ইমেইল ও রোল সংরক্ষণ করুন", "Save Email Role Assignment")}</span>
          </button>
        </div>
      </form>

      {/* Search & Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800">
        <div className="sm:col-span-8 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          <Search className="h-4 w-4 text-base-content/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t(
              "ইমেইল বা নাম দিয়ে খুঁজুন...",
              "Search by email address or name..."
            )}
            className="w-full bg-transparent text-xs outline-none"
          />
        </div>
        <div className="sm:col-span-4">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold"
          >
            <option value="All">{t("সকল রোল (All Roles)", "All Roles")}</option>
            <option value="admin">{t("অ্যাডমিন (Admin)", "Admin")}</option>
            <option value="guardian">{t("অভিভাবক (Guardian)", "Guardian")}</option>
            <option value="teacher">{t("শিক্ষক (Teacher)", "Teacher")}</option>
          </select>
        </div>
      </div>

      {/* Email Roles Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-base-content/60 bg-slate-50/50 dark:bg-slate-950/50">
                <th className="py-3.5 px-4">{t("ইমেইল ঠিকানা", "Email Address")}</th>
                <th className="py-3.5 px-4">{t("নাম ও প্রোফাইল আইডি", "Name & Linked ID")}</th>
                <th className="py-3.5 px-4">{t("বর্তমান রোল", "Current Role")}</th>
                <th className="py-3.5 px-4">{t("রোল পরিবর্তন করুন", "Change Role")}</th>
                <th className="py-3.5 px-4 text-right">{t("অ্যাকশন", "Action")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
              {filtered.map((item) => {
                const isSelf =
                  user?.email &&
                  user.email.trim().toLowerCase() === item.email.trim().toLowerCase();
                return (
                  <tr key={item.email} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-mono font-bold text-primary">
                      {item.email}
                      {isSelf && (
                        <span className="ml-2 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-500 text-[10px]">
                          {t("আপনি", "You")}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-base-content">{item.name}</p>
                      <p className="text-[10px] font-mono text-base-content/50">
                        ID: {item.linkedId || "N/A"} • {item.updatedAt}
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      {item.role === "admin" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 font-bold text-[11px]">
                          <Shield className="h-3 w-3" />
                          {t("অ্যাডমিন", "Admin")}
                        </span>
                      )}
                      {item.role === "guardian" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                          <UserCheck className="h-3 w-3" />
                          {t("অভিভাবক", "Guardian")}
                        </span>
                      )}
                      {item.role === "teacher" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold text-[11px]">
                          <GraduationCap className="h-3 w-3" />
                          {t("উস্তাদ / শিক্ষক", "Teacher")}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={item.role}
                        onChange={(e) => handleQuickRoleChange(item, e.target.value)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-bold text-xs cursor-pointer"
                      >
                        <option value="guardian">{t("অভিভাবক (Guardian)", "Guardian")}</option>
                        <option value="teacher">{t("শিক্ষক (Teacher)", "Teacher")}</option>
                        <option value="admin">{t("অ্যাডমিন (Admin)", "Admin")}</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          removeEmailRole(item.email);
                          toast.info(t("ইমেইল রোল তালিকা থেকে সরানো হয়েছে", "Removed email role entry"));
                        }}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white transition cursor-pointer"
                        title={t("মুছে ফেলুন", "Remove")}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserRolesManagement;

