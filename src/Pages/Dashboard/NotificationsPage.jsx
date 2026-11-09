import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Bell, CheckCheck, Megaphone, Send } from "lucide-react";
import { toast } from "react-toastify";
import { useMadrasa } from "../../Context/MadrasaContext";

const NotificationsPage = () => {
  const context = useOutletContext() || {};
  const role = context.role || "admin";

  const {
    notifications,
    pushNotification,
    markNotificationRead,
    markAllNotificationsRead,
  } = useMadrasa();

  const [noticeForm, setNoticeForm] = useState({
    recipientRole: "all",
    title: "",
    message: "",
  });

  const visibleNotifications = notifications.filter(
    (n) => role === "admin" || n.recipientRole === "all" || n.recipientRole === role
  );

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!noticeForm.title || !noticeForm.message) {
      toast.error("অনুগ্রহ করে নোটিশের শিরোনাম ও বিস্তারিত বার্তা লিখুন");
      return;
    }
    pushNotification({
      recipientRole: noticeForm.recipientRole,
      recipientId: "all",
      type: "নোটিশ",
      title: noticeForm.title,
      message: noticeForm.message,
    });
    toast.success("অফিশিয়াল নোটিশ / ঘোষণা সফলভাবে প্রকাশিত হয়েছে!");
    setNoticeForm({ recipientRole: "all", title: "", message: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Bell className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-base-content">
              নোটিফিকেশন ও মাদ্রাসার ঘোষণাসমূহ
            </h1>
            <p className="text-xs text-base-content/60">
              পেমেন্ট যাচাইয়ের বার্তা, বেতন প্রদানের নিশ্চিতকরণ এবং অফিশিয়াল নোটিশসমূহ
            </p>
          </div>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-base-200 transition cursor-pointer"
        >
          <CheckCheck className="h-4 w-4 text-primary" />
          <span>সবগুলো পঠিত হিসেবে চিহ্নিত করুন</span>
        </button>
      </div>

      {/* Admin Announcement Broadcast Box */}
      {role === "admin" && (
        <form
          onSubmit={handleBroadcast}
          className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4 text-xs"
        >
          <div className="flex items-center gap-2 text-primary font-bold">
            <Megaphone className="h-4 w-4" />
            <span>নতুন অফিশিয়াল নোটিশ / ঘোষণা প্রকাশ করুন</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select
              value={noticeForm.recipientRole}
              onChange={(e) => setNoticeForm({ ...noticeForm, recipientRole: e.target.value })}
              className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-semibold"
            >
              <option value="all">সকল পোর্টাল (অভিভাবক ও উস্তাদ)</option>
              <option value="guardian">শুধুমাত্র অভিভাবকবৃন্দ</option>
              <option value="teacher">শুধুমাত্র উস্তাদবৃন্দ</option>
            </select>
            <input
              type="text"
              value={noticeForm.title}
              onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
              placeholder="নোটিশের শিরোনাম লিখুন..."
              className="sm:col-span-2 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
            />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={noticeForm.message}
              onChange={(e) => setNoticeForm({ ...noticeForm, message: e.target.value })}
              placeholder="বিস্তারিত নোটিশ বা ঘোষণা লিখুন..."
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-primary text-white font-bold cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>প্রকাশ করুন</span>
            </button>
          </div>
        </form>
      )}

      {/* Notifications Feed */}
      <div className="space-y-3">
        {visibleNotifications.map((n) => (
          <div
            key={n._id}
            onClick={() => markNotificationRead(n._id)}
            className={`p-5 rounded-3xl border transition cursor-pointer flex items-start justify-between gap-4 ${
              n.read
                ? "bg-white/70 dark:bg-slate-900/60 border-slate-200/70 dark:border-slate-800"
                : "bg-white dark:bg-slate-900 border-primary/40 shadow-sm"
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-mono text-[10px] font-bold uppercase">
                  {n.type}
                </span>
                <span className="text-[10px] font-mono text-base-content/50">
                  {new Date(n.createdAt).toLocaleString("bn-BD")}
                </span>
              </div>
              <h3 className="text-sm font-extrabold text-base-content">{n.title}</h3>
              <p className="text-xs text-base-content/70">{n.message}</p>
            </div>
            {!n.read && <span className="h-2.5 w-2.5 rounded-full bg-primary shrink-0 mt-2" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
