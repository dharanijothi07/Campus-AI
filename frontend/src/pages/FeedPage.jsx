import React, { useEffect, useState } from 'react';
import { eventService } from '../services/eventService';
import { EventCard } from '../components/EventCard';
import { Sparkles, Layers, Activity } from 'lucide-react';

export const FeedPage = () => {
  const [feedEvents, setFeedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventService.getRecommendations().then(events => {
      setFeedEvents(events);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      <div className="glass-card p-6 lg:p-8 rounded-3xl border border-gray-800 flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-2">
            <Layers className="w-4 h-4 text-cyan-400" /> Personalized Activity Stream
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Your Opportunity Feed</h1>
          <p className="text-xs text-gray-400 mt-1">
            Curated continuous feed of events matching your CSE department, React/Java skills, and target milestones.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center text-cyan-400 font-semibold text-sm">
          Generating Personal Feed Stream...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};
