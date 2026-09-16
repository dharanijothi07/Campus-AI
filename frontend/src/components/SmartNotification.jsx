import React from 'react';
import { Bell, Sparkles, Clock, AlertCircle } from 'lucide-react';

export const SmartNotification = ({ notification }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'RECOMMENDATION':
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
      case 'DEADLINE':
        return <Clock className="w-4 h-4 text-amber-400" />;
      default:
        return <Bell className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className={`p-4 rounded-xl border transition-all ${
      notification.isRead
        ? 'bg-gray-900/40 border-gray-800/60 opacity-80'
        : 'glass-card border-cyan-500/30 bg-cyan-500/5'
    }`}>
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-gray-800 border border-gray-700 shrink-0">
          {getIcon(notification.type)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-white">{notification.title}</h4>
            <span className="text-[10px] text-gray-500">
              {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <p className="text-xs text-gray-300 mt-1 leading-relaxed">
            {notification.message}
          </p>
        </div>
      </div>
    </div>
  );
};
