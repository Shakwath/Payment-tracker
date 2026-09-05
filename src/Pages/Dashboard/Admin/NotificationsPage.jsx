import { useState } from "react";
import { Bell, Plus, Send, CheckCircle2, MessageSquare, X } from "lucide-react";
import { INITIAL_NOTIFICATIONS } from "../../../data/mockData";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const [newNotice, setNewNotice] = useState({
    title: "",
    message: "",
    target: "All Guardians",
    channel: "SMS & In-App",
  });

  const handleSendNotification = (e) => {
    e.preventDefault();
    const created = {
      id: `NOTIF-${100 + notifications.length + 1}`,
      title: newNotice.title,
      message: newNotice.message,
      target: newNotice.target,
      channel: newNotice.channel,
      date: new Date().toLocaleString(),
      status: "Sent",
    };
    setNotifications([created, ...notifications]);
    setIsSendModalOpen(false);
    setNewNotice({ title: "", message: "", target: "All Guardians", channel: "SMS & In-App" });
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold uppercase mb-1">
            <Bell className="h-4 w-4" />
            <span>Communication</span>
          </div>
          <h1 className="text-2xl font-black text-base-content tracking-tight">System Announcements & Notices</h1>
          <p className="text-xs text-base-content/60 mt-0.5">
            Broadcast fee reminders, exam schedules, and automated SMS notifications to parents and staff.
          </p>
        </div>

        <button
          onClick={() => setIsSendModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition"
        >
          <Send className="h-4 w-4" />
          <span>Send New Announcement</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0">
                <Bell className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-base-content">{notif.title}</h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-base-content/70">
                    {notif.target}
                  </span>
                </div>
                <p className="text-xs text-base-content/80 max-w-2xl">{notif.message}</p>
                <div className="flex items-center gap-3 text-[11px] font-mono text-base-content/50 pt-1">
                  <span>Channel: {notif.channel}</span>
                  <span>•</span>
                  <span>Sent: {notif.date}</span>
                </div>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs self-start md:self-center">
              <CheckCircle2 className="h-3.5 w-3.5" /> Delivered
            </span>
          </div>
        ))}
      </div>

      {/* Modal: Send Notification */}
      {isSendModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsSendModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-base-content/70 hover:text-primary transition"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-xl font-extrabold text-base-content">Broadcast Announcement</h3>
            <form onSubmit={handleSendNotification} className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Notice Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Due Date Extension Notice"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Target Audience</label>
                  <select
                    value={newNotice.target}
                    onChange={(e) => setNewNotice({ ...newNotice, target: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                  >
                    <option value="All Guardians">All Guardians</option>
                    <option value="Grade 10 Guardians">Grade 10 Guardians</option>
                    <option value="All Teachers">All Teachers</option>
                    <option value="Everyone">Everyone</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Channel</label>
                  <select
                    value={newNotice.channel}
                    onChange={(e) => setNewNotice({ ...newNotice, channel: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                  >
                    <option value="SMS & In-App">SMS & In-App</option>
                    <option value="In-App Announcement">In-App Announcement</option>
                    <option value="Email & SMS">Email & SMS</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-base-content/60 mb-1">Message Body</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Type your announcement text here..."
                  value={newNotice.message}
                  onChange={(e) => setNewNotice({ ...newNotice, message: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-base-content"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSendModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-base-content/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition flex items-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" /> Broadcast Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
