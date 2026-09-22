import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eventService } from '../services/eventService';
import {
  ShieldCheck,
  Plus,
  Calendar,
  MapPin,
  Building,
  CheckCircle2,
  Clock,
  ExternalLink,
  Globe,
  Tag
} from 'lucide-react';

export const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL'); // ALL, APPROVED, PENDING

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await eventService.getAdminEvents();
      setEvents(data);
    } catch (err) {
      console.error('Failed to load admin events', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleToggleApproval = async (id, currentStatus) => {
    try {
      await eventService.toggleApproveEvent(id, !currentStatus);
      setEvents(prev =>
        prev.map(evt => (evt.id === id ? { ...evt, isApproved: !currentStatus } : evt))
      );
    } catch (err) {
      alert('Failed to update event status');
    }
  };

  const filteredEvents = events.filter(evt => {
    if (filter === 'APPROVED') return evt.isApproved === true;
    if (filter === 'PENDING') return evt.isApproved !== true;
    return true;
  });

  const approvedCount = events.filter(e => e.isApproved === true).length;
  const pendingCount = events.length - approvedCount;

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="glass-card p-6 lg:p-8 rounded-3xl border border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" /> Platform Event Administration
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Event Verification & Management</h1>
          <p className="text-xs text-gray-400 mt-1 max-w-xl">
            Audit upcoming events, manage public visibility, and enter genuine opportunity postings from official sources.
          </p>
        </div>

        <Link
          to="/admin/add-event"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4" /> Add Genuine Event
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-gray-800">
          <span className="text-xs text-gray-400 font-semibold">Total Listed Events</span>
          <p className="text-2xl font-extrabold text-white mt-1">{events.length}</p>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-gray-800">
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Approved & Public
          </span>
          <p className="text-2xl font-extrabold text-emerald-400 mt-1">{approvedCount}</p>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-gray-800">
          <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Pending / Draft
          </span>
          <p className="text-2xl font-extrabold text-amber-400 mt-1">{pendingCount}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-2">
          {['ALL', 'APPROVED', 'PENDING'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === tab
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-gray-900'
              }`}
            >
              {tab} ({tab === 'ALL' ? events.length : tab === 'APPROVED' ? approvedCount : pendingCount})
            </button>
          ))}
        </div>

        <span className="text-xs text-gray-400">
          Only events with <span className="text-emerald-400 font-bold">Approved</span> status are displayed to students.
        </span>
      </div>

      {/* Events Table / Grid */}
      {loading ? (
        <div className="text-center py-16 text-cyan-400 font-semibold text-sm">
          Loading Admin Event List...
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-3xl border border-gray-800 text-gray-400 text-sm">
          No events found in this view. Click <Link to="/admin/add-event" className="text-cyan-400 underline font-bold">Add Genuine Event</Link> to create one!
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEvents.map(evt => (
            <div
              key={evt.id}
              className="glass-card p-5 rounded-2xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gray-700 transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Image thumbnail */}
                {evt.imageUrl ? (
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-900">
                    <img
                      src={evt.imageUrl}
                      alt={evt.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=200&auto=format&fit=crop&q=80';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center shrink-0">
                    <Tag className="w-6 h-6 text-cyan-400/50" />
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      {evt.categoryName}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-800 text-gray-300 border border-gray-700 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-emerald-400" />
                      {evt.locationMode || 'Offline'}
                    </span>
                    {evt.isApproved ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Approved
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Pending Review
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-white">{evt.title}</h3>

                  <div className="flex items-center gap-4 text-xs text-gray-400 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-purple-400" />
                      {evt.organizerName || 'Verified Organizer'}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {evt.location || 'Remote'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      Event: {new Date(evt.eventDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      Deadline: {new Date(evt.deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                <button
                  onClick={() => handleToggleApproval(evt.id, evt.isApproved)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    evt.isApproved
                      ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {evt.isApproved ? 'Unapprove' : 'Approve Event'}
                </button>

                <a
                  href={evt.registrationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 text-xs font-medium flex items-center gap-1"
                  title="Official Link"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <Link
                  to={`/events/${evt.id}`}
                  className="px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-cyan-400 border border-gray-800 text-xs font-bold"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

