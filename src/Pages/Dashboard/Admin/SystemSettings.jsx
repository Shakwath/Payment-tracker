import { useState } from "react";
import { Settings, Save } from "lucide-react";
import { toast } from "react-toastify";
import { useMadrasa } from "../../../Context/MadrasaContext";

const SystemSettings = () => {
  const { settings, setSettings, recordAudit } = useMadrasa();
  const [formData, setFormData] = useState(settings);

  const handleSave = (e) => {
    e.preventDefault();
    setSettings(formData);
    recordAudit(
      "SYSTEM_SETTINGS_UPDATED",
      "settings",
      "global",
      settings.madrasaName,
      `${formData.madrasaName} • শেষ তারিখ: ${formData.dueDateDay}`
    );
    toast.success("মাদ্রাসার সিস্টেম সেটিংস ও পেমেন্ট নির্দেশনা সফলভাবে সংরক্ষিত হয়েছে!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3.5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
          <Settings className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
            সিস্টেম সেটিংস ও পেমেন্ট নির্দেশনা কনফিগারেশন
          </h1>
          <p className="text-xs text-base-content/60">
            মাদ্রাসার নাম, ঠিকানা, বিকাশ/নগদ/ব্যাংক পেমেন্ট নির্দেশনা এবং বিলম্ব ফি নিয়মাবলী আপডেট করুন
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6 text-xs"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-base-content/70 block mb-1">
              মাদ্রাসার অফিশিয়াল নাম (বাংলা)
            </label>
            <input
              type="text"
              value={formData.madrasaName}
              onChange={(e) => setFormData({ ...formData, madrasaName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-bold"
            />
          </div>
          <div>
            <label className="font-bold text-base-content/70 block mb-1">
              অফিশিয়াল মোবাইল নম্বর
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono"
            />
          </div>
          <div>
            <label className="font-bold text-base-content/70 block mb-1">
              মাদ্রাসার ঠিকানা
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-base-content/70 block mb-1">
                ফি পরিশোধের শেষ দিন (প্রতি মাসের তারিখ)
              </label>
              <input
                type="number"
                value={formData.dueDateDay}
                onChange={(e) =>
                  setFormData({ ...formData, dueDateDay: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-base-content/70 block mb-1">
                বিলম্ব ফি পরিমাণ (৳)
              </label>
              <input
                type="number"
                value={formData.lateFeeAmount}
                onChange={(e) =>
                  setFormData({ ...formData, lateFeeAmount: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono font-bold"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-extrabold text-base-content">
            অভিভাবকদের জন্য পেমেন্ট মাধ্যম নির্দেশনা (ফি পরিশোধ পেজে প্রদর্শিত হবে)
          </h3>
          {[
            { key: "bKash", label: "বিকাশ (bKash) নির্দেশনা" },
            { key: "Nagad", label: "নগদ (Nagad) নির্দেশনা" },
            { key: "Bank", label: "ব্যাংক অ্যাকাউন্ট (Bank) নির্দেশনা" },
            { key: "Offline", label: "অফিস ক্যাশ (Offline) নির্দেশনা" },
          ].map((method) => (
            <div key={method.key}>
              <label className="font-bold text-primary block mb-1">
                {method.label}
              </label>
              <input
                type="text"
                value={formData.paymentInstructions?.[method.key] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    paymentInstructions: {
                      ...formData.paymentInstructions,
                      [method.key]: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white text-xs font-bold shadow-lg shadow-primary/20 cursor-pointer"
        >
          <Save className="h-4 w-4" />
          <span>সিস্টেম কনফিগারেশন সংরক্ষণ করুন</span>
        </button>
      </form>
    </div>
  );
};

export default SystemSettings;
