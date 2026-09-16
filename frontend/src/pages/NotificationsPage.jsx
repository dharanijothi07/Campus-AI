import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import { SmartNotification } from '../components/SmartNotification';
import { Bell, CheckCheck } from 'lucide-react';

export const NotificationsPage = () => {
  const { notifications, markAllAsRead } = useNotifications();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="glass-card p-6 lg:p-8 rounded-3xl border border-gray-800 flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-2">
            <Bell className="w-4 h-4 text-cyan-400" /> Smart Notification Alerts
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Notifications & Alerts</h1>
          <p className="text-xs text-gray-400 mt-1">
            Real-time notifications for high-scoring AI matches, registration deadlines, and opportunity alerts.
          </p>
        </div>

        <button
          onClick={markAllAsRead}
          className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-cyan-400 border border-gray-800 text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
        >
          <CheckCheck className="w-4 h-4" /> Mark All Read
        </button>
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map(notif => (
            <SmartNotification key={notif.id} notification={notif} />
          ))
        ) : (
          <div className="text-center py-12 glass-card rounded-3xl border border-gray-800 text-gray-400 text-sm">
            No notifications available.
          </div>
        )}
      </div>
    </div>
  );
};
