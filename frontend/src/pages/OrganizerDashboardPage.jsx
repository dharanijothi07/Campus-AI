import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eventService } from '../services/eventService';
import { aiService } from '../services/aiService';
import { ShieldCheck, Plus, Sparkles, Share2, FileText, CheckCircle2 } from 'lucide-react';

export const OrganizerDashboardPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoText, setPromoText] = useState('');
  const [generatingPromo, setGeneratingPromo] = useState(false);
  const [selectedEvtTitle, setSelectedEvtTitle] = useState('');

  useEffect(() => {
    eventService.getAllEvents().then(data => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  const handleGeneratePromo = async (evt) => {
    setSelectedEvtTitle(evt.title);
    setGeneratingPromo(true);
    try {
      const res = await aiService.generatePromotion({
        title: evt.title,
        description: evt.description,
        platform: 'LinkedIn'
      });
      setPromoText(res.generatedContent);
    } catch (err) {
      alert('Failed to generate promotion');
    } finally {
      setGeneratingPromo(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="glass-card p-6 lg:p-8 rounded-3xl border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" /> Organizer Management Suite
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Organizer Headquarters</h1>
          <p className="text-xs text-gray-400 mt-1">
            Publish events, perform AI credibility audits, and generate high-impact promotional copy.
          </p>
        </div>

        <Link
          to="/organizer/create"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" /> Create New Event
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Events Table / List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-white">Published & Audited Events</h2>
          {loading ? (
            <div className="text-cyan-400 text-xs">Loading Organizer Events...</div>
          ) : (
            <div className="space-y-3">
              {events.map(evt => (
                <div key={evt.id} className="glass-card p-5 rounded-2xl border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      {evt.categoryName}
                    </span>
                    <h3 className="font-bold text-sm text-white">{evt.title}</h3>
                    <p className="text-xs text-gray-400">{evt.location} • Deadline: {new Date(evt.deadline).toLocaleDateString()}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleGeneratePromo(evt)}
                      className="px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-cyan-400 border border-gray-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> AI Promo Copy
                    </button>
                    <Link
                      to={`/events/${evt.id}`}
                      className="px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 text-xs font-bold transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI Promo Copy Modal / Output Widget */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-cyan-400" />
            AI Content Generator
          </h2>

          <div className="glass-card p-5 rounded-2xl border border-gray-800 space-y-4">
            {generatingPromo ? (
              <div className="text-xs text-cyan-400 font-semibold animate-pulse">
                Generating promotional post for "{selectedEvtTitle}"...
              </div>
            ) : promoText ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400">Generated Promo Copy</span>
                  <button
                    onClick={() => { navigator.clipboard.writeText(promoText); alert('Copied to clipboard!'); }}
                    className="text-[10px] text-gray-400 hover:text-white underline"
                  >
                    Copy Text
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-900 text-xs text-gray-300 leading-relaxed whitespace-pre-line font-mono">
                  {promoText}
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-400 leading-relaxed">
                Click "AI Promo Copy" on any event to auto-generate high-converting LinkedIn, Twitter, and Email promotional copy.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
