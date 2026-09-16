import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { eventService } from '../services/eventService';
import { EventCard } from '../components/EventCard';
import { SmartNotification } from '../components/SmartNotification';
import { Sparkles, Trophy, Briefcase, Code, GraduationCap, Calendar, Bell, Filter, Search, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [allEvts, recEvts, notifs] = await Promise.all([
          eventService.getAllEvents(),
          eventService.getRecommendations(),
          eventService.getNotifications()
        ]);
        setEvents(allEvts);
        setRecommendations(recEvts);
        setNotifications(notifs);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredEvents = events.filter(e => {
    if (activeCategory === 'ALL') return true;
    return (e.categoryName || '').toUpperCase() === activeCategory;
  });

  const hackathons = events.filter(e => (e.categoryName || '').toLowerCase() === 'hackathon');
  const internships = events.filter(e => (e.categoryName || '').toLowerCase() === 'internship');
  const workshops = events.filter(e => (e.categoryName || '').toLowerCase() === 'workshop');
  const competitions = events.filter(e => (e.categoryName || '').toLowerCase() === 'competition');

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-10">
      {/* Welcome Banner */}
      <div className="glass-card rounded-3xl p-6 lg:p-8 border border-gray-800 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Opportunity Hub Active</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            Welcome back, <span className="gradient-text">{user?.fullName || 'Student'}</span>!
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed">
            Your profile has been synchronized. Explore your high-confidence AI event matches, upcoming registration deadlines, and verified internships.
          </p>
        </div>

        <div className="flex items-center gap-3 z-10 w-full md:w-auto">
          <Link
            to="/search"
            className="flex-1 md:flex-none px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <Search className="w-4 h-4" /> Smart Search
          </Link>
          <Link
            to="/profile"
            className="flex-1 md:flex-none px-5 py-3 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs border border-gray-800 flex items-center justify-center gap-2 transition-colors"
          >
            Update AI Profile
          </Link>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Category Tabs & Event Cards */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI Top Recommendations Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                AI-Personalized Matches
              </h2>
              <Link to="/recommendations" className="text-xs font-semibold text-cyan-400 hover:underline">
                View All Recommendations
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendations.slice(0, 2).map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-xl font-bold text-white">Discover Opportunities</h2>
              <div className="flex items-center gap-1.5 bg-gray-900/80 p-1 rounded-xl border border-gray-800 overflow-x-auto">
                {['ALL', 'HACKATHON', 'WORKSHOP', 'INTERNSHIP', 'COMPETITION'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      activeCategory === cat
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Upcoming Deadlines & Smart Notifications */}
        <div className="space-y-6">
          {/* Upcoming Deadlines Widget */}
          <div className="glass-card p-5 rounded-2xl border border-gray-800 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              Registration Deadlines Ticker
            </h3>
            <div className="space-y-2.5">
              {events.slice(0, 3).map(event => (
                <div key={event.id} className="p-3 rounded-xl bg-gray-900/60 border border-gray-800 flex items-center justify-between">
                  <div className="truncate pr-2">
                    <span className="block text-xs font-semibold text-white truncate">{event.title}</span>
                    <span className="text-[10px] text-gray-400">{event.categoryName}</span>
                  </div>
                  <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                    {new Date(event.deadline).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Notifications Feed */}
          <div className="glass-card p-5 rounded-2xl border border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-cyan-400" />
                Smart Notifications
              </h3>
              <Link to="/notifications" className="text-[11px] text-cyan-400 hover:underline">
                See All
              </Link>
            </div>
            <div className="space-y-3">
              {notifications.slice(0, 3).map(notif => (
                <SmartNotification key={notif.id} notification={notif} />
              ))}
            </div>
          </div>

          {/* Platform Credibility Indicator */}
          <div className="glass-card p-4 rounded-2xl border border-gray-800 text-center space-y-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto" />
            <h4 className="text-xs font-bold text-white">AI Verification Engine</h4>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Every event is scanned for duplicates, fake fees, and credibility scores before being displayed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
