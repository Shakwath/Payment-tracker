import { useState } from "react";
import { TrendingDown, Plus, Trash2, Edit3, X } from "lucide-react";
import { toast } from "react-toastify";
import { useMadrasa, MONTH_LABELS_BN } from "../../../Context/MadrasaContext";
import { useLanguage } from "../../../Context/LanguageContext";

const ExpensesManagement = () => {
  const {
    expenses,
    MONTHS,
    selectedMonth,
    addExpense,
    updateExpense,
    deleteExpense,
  } = useMadrasa();
  const { lang, t } = useLanguage();

  const EXPENSE_CATEGORIES = [
    {
      key: "utilities",
      label: t("বিদ্যুৎ ও ইউটিলিটি (Utilities)", "Utilities & Electricity"),
    },
    { key: "food", label: t("লিল্লাহ বোর্ডিং ও খাবার (Food)", "Boarding & Food") },
    {
      key: "maintenance",
      label: t("মাদ্রাসা সংস্কার ও রক্ষণাবেক্ষণ (Maintenance)", "Maintenance & Repair"),
    },
    {
      key: "supplies",
      label: t("কিতাব ও শিক্ষা উপকরণ (Supplies)", "Books & Educational Supplies"),
    },
    { key: "transport", label: t("যাতায়াত ও পরিবহন (Transport)", "Transport") },
    { key: "salary", label: t("উস্তাদ ও স্টাফ বেতন (Salary)", "Staff & Teacher Salary") },
    { key: "rent", label: t("ভাড়া ও আবাসন (Rent)", "Rent & Housing") },
    { key: "other", label: t("অন্যান্য খরচ (Other)", "Other Expenses") },
  ];

  const CATEGORY_LABEL = {
    utilities: t("বিদ্যুৎ ও ইউটিলিটি", "Utilities"),
    food: t("বোর্ডিং ও খাবার", "Boarding & Food"),
    maintenance: t("সংস্কার ও মেরামত", "Maintenance"),
    supplies: t("শিক্ষা উপকরণ", "Supplies"),
    transport: t("যাতায়াত", "Transport"),
    salary: t("বেতন ও ভাতা", "Salary"),
    rent: t("ভাড়া", "Rent"),
    other: t("অন্যান্য", "Other"),
  };

  const [monthFilter, setMonthFilter] = useState(selectedMonth);
  const [catFilter, setCatFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "utilities",
    month: selectedMonth,
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    description: "",
    attachmentUrl: "",
  });

  const filtered = expenses.filter((e) => {
    const matchesMonth = monthFilter === "All" || e.month === monthFilter;
    const matchesCat = catFilter === "All" || e.category === catFilter;
    return matchesMonth && matchesCat;
  });

  const totalFiltered = filtered.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const openAdd = () => {
    setEditingExp(null);
    setFormData({
      title: "",
      category: "utilities",
      month: selectedMonth,
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      description: "",
      attachmentUrl: "",
    });
    setModalOpen(true);
  };

  const openEdit = (exp) => {
    setEditingExp(exp);
    setFormData({
      title: exp.title,
      category: exp.category,
      month: exp.month,
      amount: exp.amount,
      date: exp.date,
      description: exp.description || "",
      attachmentUrl: exp.attachmentUrl || "",
    });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) {
      toast.error(
        t("খরচের বিবরণ ও টাকার পরিমাণ আবশ্যক", "Title and amount are required")
      );
      return;
    }
    if (editingExp) {
      await updateExpense(editingExp._id, formData);
      toast.success(
        t(
          "খরচের ভাউচার আপডেট ও অডিট লগে সংরক্ষিত হয়েছে!",
          "Expense voucher updated and logged!"
        )
      );
    } else {
      await addExpense(formData);
      toast.success(
        t("নতুন খরচের ভাউচার সংরক্ষিত হয়েছে!", "New expense voucher saved!")
      );
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <TrendingDown className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
              {t(
                "মাদ্রাসার মাসিক ব্যয় ও ভাউচার ব্যবস্থাপনা",
                "Monthly Expenses & Voucher Management"
              )}
            </h1>
            <p className="text-xs text-base-content/60">
              {t(
                "বিদ্যুৎ বিল, বোর্ডিং বাজার, সংস্কার, শিক্ষা উপকরণ, যাতায়াত ও অন্যান্য খরচের হিসাব সংরক্ষণ করুন",
                "Track electricity bills, boarding groceries, maintenance, supplies, transport, and other expenses"
              )}
            </p>
          </div>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>{t("নতুন খরচের ভাউচার যোগ করুন", "Add New Expense Voucher")}</span>
        </button>
      </div>

      {/* Filters & Monthly Total Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800">
        <div className="sm:col-span-4">
          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold"
          >
            <option value="All">{t("সকল মাস", "All Months")}</option>
            {MONTHS.map((m) => (
              <option key={m} value={m}>
                {lang === "bn" ? MONTH_LABELS_BN[m] || m : m}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-4">
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold"
          >
            <option value="All">{t("সকল খরচের খাত", "All Categories")}</option>
            {EXPENSE_CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-4 text-right px-2">
          <span className="text-[10px] font-bold uppercase text-base-content/50 block">
            {t("নির্বাচিত মোট ব্যয়", "Total Selected Expenses")}
          </span>
          <span className="text-lg font-mono font-black text-rose-500">
            ৳ {totalFiltered.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Expense Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-base-content/60 bg-slate-50/50 dark:bg-slate-950/50">
              <th className="py-3.5 px-4">
                {t("ভাউচারের শিরোনাম ও বিবরণ", "Voucher Title & Description")}
              </th>
              <th className="py-3.5 px-4">{t("খরচের খাত", "Category")}</th>
              <th className="py-3.5 px-4">{t("মাস ও তারিখ", "Month & Date")}</th>
              <th className="py-3.5 px-4">{t("টাকার পরিমাণ", "Amount")}</th>
              <th className="py-3.5 px-4 text-right">{t("অ্যাকশন", "Actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800">
            {filtered.map((exp) => (
              <tr key={exp._id}>
                <td className="py-3.5 px-4">
                  <p className="font-bold text-base-content">{exp.title}</p>
                  <p className="text-[11px] text-base-content/60">{exp.description}</p>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-500 text-[11px] font-bold">
                    {CATEGORY_LABEL[exp.category] || exp.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono">
                  {lang === "bn" ? MONTH_LABELS_BN[exp.month] || exp.month : exp.month} •{" "}
                  <span className="text-base-content/50">{exp.date}</span>
                </td>
                <td className="py-3.5 px-4 font-mono font-extrabold text-sm text-rose-500">
                  ৳ {Number(exp.amount).toLocaleString()}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      onClick={() => openEdit(exp)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white transition cursor-pointer"
                      title={t("ভাউচার সম্পাদনা", "Edit Voucher")}
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={async () => {
                        await deleteExpense(exp._id);
                        toast.info(
                          t(
                            "খরচের ভাউচার মুছে ফেলা হয়েছে এবং অডিট লগে রেকর্ড হয়েছে",
                            "Expense voucher deleted and logged in audit trail"
                          )
                        );
                      }}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white transition cursor-pointer"
                      title={t("মুছে ফেলুন", "Delete")}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Expense Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-base-content">
                {editingExp
                  ? t("খরচের ভাউচার সম্পাদনা করুন", "Edit Expense Voucher")
                  : t("নতুন মাসিক খরচ যোগ করুন", "Add New Monthly Expense")}
              </h3>
              <button onClick={() => setModalOpen(false)} className="cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  {t("খরচের শিরোনাম", "Expense Title")}
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder={t(
                    "যেমন: বোর্ডিং বাজার ও চাল ক্রয়",
                    "e.g., Boarding groceries & rice purchase"
                  )}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("খরচের খাত", "Category")}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  >
                    {EXPENSE_CATEGORIES.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("টাকার পরিমাণ (৳)", "Amount (৳)")}
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono font-bold"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("হিসাবের মাস", "Accounting Month")}
                  </label>
                  <select
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  >
                    {MONTHS.map((m) => (
                      <option key={m} value={m}>
                        {lang === "bn" ? MONTH_LABELS_BN[m] || m : m}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-base-content/70 block mb-1">
                    {t("ভাউচারের তারিখ", "Voucher Date")}
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-base-content/70 block mb-1">
                  {t("বিবরণ / নোট", "Description / Note")}
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
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
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white font-bold cursor-pointer"
                >
                  {t("খরচ সংরক্ষণ করুন", "Save Expense")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesManagement;
