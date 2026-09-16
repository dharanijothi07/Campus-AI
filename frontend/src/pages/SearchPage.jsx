import React, { useState } from 'react';
import { aiService } from '../services/aiService';
import { EventCard } from '../components/EventCard';
import { Search, Sparkles, Filter, MapPin, Building, Tag, ArrowRight } from 'lucide-react';

export const SearchPage = () => {
  const [query, setQuery] = useState('Find AI hackathons for CSE students in Chennai this month');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery) => {
    const q = searchQuery || query;
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await aiService.smartSearch(q);
      setResult(res);
    } catch (err) {
      console.error('Search failed', err);
    } finally {
      setLoading(false);
    }
  };

  const exampleQueries = [
    "Find AI hackathons for CSE students in Chennai this month",
    "Paid software developer internships in Bengaluru for IT students",
    "Hands-on Spring Boot workshops for engineering undergraduates",
    "Competitive coding contests for algorithm enthusiasts"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Search Header Banner */}
      <div className="glass-card p-6 lg:p-8 rounded-3xl border border-gray-800 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold ai-glow">
          <Sparkles className="w-4 h-4 text-cyan-400" /> Natural Language Smart Search
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Ask in Plain English. <span className="gradient-text">Find Exact Events.</span>
        </h1>

        {/* Natural Language Search Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="relative max-w-2xl mx-auto"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Find AI hackathons for CSE students in Chennai this month"
            className="w-full bg-gray-900 border-2 border-gray-800 rounded-2xl pl-12 pr-28 py-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 shadow-2xl"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-4.5" />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 px-5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center gap-1"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Preset Query Chips */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {exampleQueries.map((eq, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(eq);
                handleSearch(eq);
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-medium bg-gray-900 hover:bg-cyan-500/10 text-gray-300 hover:text-cyan-300 border border-gray-800 transition-colors"
            >
              "{eq}"
            </button>
          ))}
        </div>
      </div>

      {/* Extracted NLP Parameters Breakdown */}
      {result && (
        <div className="space-y-6">
          <div className="glass-card p-5 rounded-2xl border border-gray-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white">AI Extracted Parameters:</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30">
                Category: <strong>{result.extractedCategory}</strong>
              </span>
              <span className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Location: <strong>{result.extractedLocation}</strong>
              </span>
              <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30">
                Target Dept: <strong>{result.extractedDepartment}</strong>
              </span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.events && result.events.length > 0 ? (
              result.events.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-400 text-sm">
                No events matched your criteria directly. Try broadening your query!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
