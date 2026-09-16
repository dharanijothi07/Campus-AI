import React, { useEffect, useState } from 'react';
import { eventService } from '../services/eventService';
import { EventCard } from '../components/EventCard';
import { Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const RecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventService.getRecommendations().then(data => {
      setRecommendations(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="glass-card p-6 lg:p-8 rounded-3xl border border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-2 ai-glow">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" /> AI Match Engine Active
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">AI Event Recommendations</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
            Ranked using multi-vector match scores across your technical skills, department, interests, location preference, and target career path.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center text-cyan-400 font-semibold text-sm">
          Calculating Profile Match Vectors...
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
