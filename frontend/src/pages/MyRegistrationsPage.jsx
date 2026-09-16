import React, { useEffect, useState } from 'react';
import { eventService } from '../services/eventService';
import { EventCard } from '../components/EventCard';
import { Calendar, CheckCircle2 } from 'lucide-react';

export const MyRegistrationsPage = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventService.getMyRegistrations().then(data => {
      setRegistrations(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      <div className="glass-card p-6 lg:p-8 rounded-3xl border border-gray-800 flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-2">
            <CheckCircle2 className="w-4 h-4" /> Active Student Enrollments
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">My Event Registrations</h1>
          <p className="text-xs text-gray-400 mt-1">
            Track registered hackathons, workshops, and internship application statuses.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center text-cyan-400 font-semibold text-sm">
          Fetching Registrations...
        </div>
      ) : registrations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registrations.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 glass-card rounded-3xl border border-gray-800 text-gray-400 text-sm">
          No registered events yet. Explore recommendations and register now!
        </div>
      )}
    </div>
  );
};
