import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { CrowdBadge } from '../../components/ui/CrowdBadge';
import { Button } from '../../components/ui/Button';
import { MOCK_NOTIFICATIONS } from '../../constants/mockData';
import { Bell, ArrowRight, Sparkles, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filterType, setFilterType] = useState<'ALL' | 'UNREAD'>('ALL');

  const filtered = notifications.filter((n) => filterType === 'ALL' || !n.isRead);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Live Crowd Surge & Queue Alerts"
        description="Proactive notifications emitted when hospital crowd levels spike or consultation wait times change."
        badge={
          <span className="text-xs px-3.5 py-1.5 rounded-full bg-[#FAECE8] text-[#8C301E] font-extrabold border border-[#F2C4BA]">
            {notifications.filter((n) => !n.isRead).length} Unread Alerts
          </span>
        }
        actions={
          <Button variant="outline" size="sm" onClick={markAllRead}>
            Mark All Read
          </Button>
        }
      />

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              filterType === 'ALL'
                ? 'bg-[#2B4C3F] text-white shadow-xs'
                : 'bg-[#F8F5EF] text-[#5C5852] hover:text-[#252525]'
            }`}
          >
            All Alerts ({notifications.length})
          </button>
          <button
            onClick={() => setFilterType('UNREAD')}
            className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              filterType === 'UNREAD'
                ? 'bg-[#2B4C3F] text-white shadow-xs'
                : 'bg-[#F8F5EF] text-[#5C5852] hover:text-[#252525]'
            }`}
          >
            Unread ({notifications.filter((n) => !n.isRead).length})
          </button>
        </div>

        <span className="text-xs text-[#8C867D]">Real-time telemetry push feed</span>
      </div>

      {/* Notifications List with Entrance Animation (Requirement #11) */}
      <div className="space-y-4">
        <AnimatePresence>
          {filtered.map((n, idx) => {
            const isCrowdSpike = n.type === 'crowd_alert';

            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
              >
                <div
                  className={`mediq-card p-6 rounded-3xl space-y-4 relative overflow-hidden transition-all border ${
                    !n.isRead
                      ? 'bg-white border-[#C8DDD0] shadow-sm'
                      : 'bg-[#FAF8F5] border-[#E8E2D5] opacity-90'
                  }`}
                >
                  {/* Accent Left Bar */}
                  {!n.isRead && (
                    <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#2B4C3F]" />
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Live Icon */}
                      <div
                        className={`p-3.5 rounded-2xl border shrink-0 ${
                          isCrowdSpike
                            ? 'bg-[#FAECE8] border-[#F2C4BA] text-[#8C301E]'
                            : 'bg-[#FDF7E7] border-[#F5E3B3] text-[#705008]'
                        }`}
                      >
                        <Bell className="w-5 h-5 animate-pulse" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[10px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full ${
                              isCrowdSpike ? 'bg-[#FAECE8] text-[#8C301E]' : 'bg-[#FDF7E7] text-[#705008]'
                            }`}
                          >
                            {isCrowdSpike ? '🔔 CROWD UPDATE' : '⏱️ QUEUE UPDATE'}
                          </span>
                          <span className="text-xs font-bold text-[#252525]">{n.hospitalName}</span>
                          <span className="text-xs text-[#8C867D]">• {n.departmentName}</span>
                        </div>
                        <h3 className="text-base font-extrabold text-[#252525]">{n.title}</h3>
                        <p className="text-xs text-[#5C5852] leading-relaxed max-w-2xl">{n.message}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-2 shrink-0">
                      <span className="text-[11px] text-[#8C867D]">{n.timestamp}</span>
                      {n.crowdLevel && (
                        <div className="flex items-center gap-2 bg-[#F8F5EF] px-3 py-1 rounded-xl border border-[#E8E2D5]">
                          <span className="text-[10px] text-[#5C5852] font-semibold">Shift: Moderate →</span>
                          <CrowdBadge level={n.crowdLevel} size="sm" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recommendation & Action Box */}
                  <div className="pt-3 border-t border-[#E8E2D5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-[#2A543B] bg-[#EAF2EC] px-3.5 py-1.5 rounded-xl border border-[#C8DDD0] font-bold">
                      <Sparkles className="w-4 h-4 text-[#2B4C3F]" />
                      <span>MEDIQ Recommendation: Visit after 5:00 PM to save 30+ min waiting time.</span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => toggleRead(n.id)}
                        className="text-[11px] text-[#5C5852] hover:text-[#252525] font-semibold px-2 py-1"
                      >
                        {n.isRead ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <Link to={n.actionUrl || ROUTES.PATIENT.HOSPITALS}>
                        <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                          View Hospital
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
