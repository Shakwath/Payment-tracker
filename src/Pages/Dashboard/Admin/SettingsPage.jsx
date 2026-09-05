import { useState } from "react";
import { Settings, Shield, CreditCard, Bell, Save, CheckCircle2 } from "lucide-react";

const SettingsPage = () => {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    institutionName: "Ideal International School & College",
    currencySymbol: "৳",
    academicYear: "2026",
    bkashMerchant: "01711223344",
    nagadMerchant: "01811223344",
    autoSmsAlerts: true,
    emailReceipts: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase mb-1">
            <Settings className="h-4 w-4" />
            <span>System Administration</span>
          </div>
          <h1 className="text-2xl font-black text-base-content tracking-tight">System Settings & Configurations</h1>
          <p className="text-xs text-base-content/60 mt-0.5">
            Configure payment gateway integrations, school profile details, and automated notification triggers.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* School Details */}
        <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-base-content flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" /> Institution Identity
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Institution Name</label>
              <input
                type="text"
                value={settings.institutionName}
                onChange={(e) => setSettings({ ...settings, institutionName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-base-content focus:ring-2 focus:ring-primary/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Currency Symbol</label>
              <input
                type="text"
                value={settings.currencySymbol}
                onChange={(e) => setSettings({ ...settings, currencySymbol: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-base-content focus:ring-2 focus:ring-primary/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Active Academic Year</label>
              <input
                type="text"
                value={settings.academicYear}
                onChange={(e) => setSettings({ ...settings, academicYear: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-base-content focus:ring-2 focus:ring-primary/40 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-base-content flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-emerald-500" /> Payment Gateway Integration Keys
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">bKash Merchant Wallet Number</label>
              <input
                type="text"
                value={settings.bkashMerchant}
                onChange={(e) => setSettings({ ...settings, bkashMerchant: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-base-content font-mono focus:ring-2 focus:ring-primary/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Nagad Merchant Account</label>
              <input
                type="text"
                value={settings.nagadMerchant}
                onChange={(e) => setSettings({ ...settings, nagadMerchant: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-base-content font-mono focus:ring-2 focus:ring-primary/40 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-base-content flex items-center gap-2">
            <Bell className="h-4 w-4 text-amber-500" /> Automated Communication Triggers
          </h3>
          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoSmsAlerts}
                onChange={(e) => setSettings({ ...settings, autoSmsAlerts: e.target.checked })}
                className="h-4 w-4 rounded accent-primary"
              />
              <span className="text-base-content font-medium">Send automatic SMS reminders to guardians on payment due date</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailReceipts}
                onChange={(e) => setSettings({ ...settings, emailReceipts: e.target.checked })}
                className="h-4 w-4 rounded accent-primary"
              />
              <span className="text-base-content font-medium">Auto-email digital payment receipts immediately upon verification</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-primary text-white font-bold text-xs shadow-md shadow-primary/20 hover:bg-primary/90 transition flex items-center gap-2"
        >
          <Save className="h-4 w-4" /> Save System Settings
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
