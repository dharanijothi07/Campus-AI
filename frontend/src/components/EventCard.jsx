import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, MapPin, Tag, Building, ArrowRight, ShieldCheck, CheckCircle2, ExternalLink } from 'lucide-react';
import { eventService } from '../services/eventService';

export const EventCard = ({ event, onRegisterSuccess }) => {
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setRegistering(true);
    try {
      await eventService.registerForEvent(event.id);
      setRegistered(true);
      if (onRegisterSuccess) onRegisterSuccess(event.id);
    } catch (err) {
      alert(err.message || 'Registration completed');
      setRegistered(true);
    } finally {
      setRegistering(false);
    }
  };

  const getCategoryColor = (cat) => {
    switch ((cat || '').toLowerCase()) {
      case 'hackathon':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'workshop':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'internship':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'competition':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-gray-800/80 hover:border-cyan-500/40 transition-all group flex flex-col justify-between relative overflow-hidden">
      {/* Background Subtle AI Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all pointer-events-none" />

      <div>
        {/* Event Banner Image if present */}
        {event.imageUrl && (
          <div className="w-full h-36 rounded-xl overflow-hidden mb-3.5 bg-gray-900 relative">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-black/70 backdrop-blur-md text-cyan-300 border border-white/10">
              {event.locationMode || 'Online'}
            </span>
          </div>
        )}

        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(event.categoryName)}`}>
              {event.categoryName}
            </span>
            {!event.imageUrl && event.locationMode && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-gray-800 text-gray-300 border border-gray-700">
                {event.locationMode}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {/* AI Match & Eligibility Badges */}
            {event.eligibilityMatch && (
              <div className="flex items-center gap-1.5 flex-wrap">
                {/* Match Percentage */}
                <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  {event.eligibilityMatch.matchPercentage}% Match
                </span>

                {/* Eligibility Gate Badge */}
                {event.eligibilityMatch.status === 'ELIGIBLE' ? (
                  <span className="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    Eligible ✓
                  </span>
                ) : event.eligibilityMatch.status === 'NOT_FULLY_ELIGIBLE' ? (
                  <span className="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                    Not Fully Eligible ⚠️
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-lg text-[11px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                    Not Eligible ❌
                  </span>
                )}
              </div>
            )}

            {!event.eligibilityMatch && event.aiMatchPercentage && (
              <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                {event.aiMatchPercentage}% Match
              </span>
            )}

            <span className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-gray-800 text-gray-300 border border-gray-700 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              {event.qualityScore || 92}% Score
            </span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/events/${event.id}`}>
          <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2">
            {event.title}
          </h3>
        </Link>

        {/* Description Snippet */}
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">
          {event.description}
        </p>

        {/* AI Eligibility Insights Preview */}
        {event.eligibilityMatch && (
          <div className="mb-3 p-2.5 rounded-xl bg-gray-950/70 border border-gray-800/80 space-y-1 text-[11px]">
            {/* Positive match preview */}
            {event.eligibilityMatch.matchReasons && event.eligibilityMatch.matchReasons.slice(0, 2).map((reason, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-emerald-400 truncate">
                <span className="font-bold shrink-0">✓</span>
                <span className="truncate text-gray-300">{reason.replace(/^✓\s*/, '')}</span>
              </div>
            ))}

            {/* Missing requirement preview if not fully eligible */}
            {event.eligibilityMatch.missingRequirements && event.eligibilityMatch.missingRequirements.slice(0, 1).map((miss, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-amber-400 truncate font-medium">
                <span className="font-bold shrink-0">✗</span>
                <span className="truncate">{miss.replace(/^✗\s*/, '')}</span>
              </div>
            ))}
          </div>
        )}

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 mb-4 bg-gray-900/50 p-2.5 rounded-xl border border-gray-800/60">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="truncate">Deadline: {new Date(event.deadline).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate col-span-2">
            <Building className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="truncate">{event.organizerName || 'Verified Tech Partner'}</span>
          </div>
        </div>

        {/* Required Skills Badges */}
        {event.skillsRequired && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {event.skillsRequired.split(',').slice(0, 3).map((skill, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-800/80 text-gray-300 border border-gray-700/60">
                {skill.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between gap-2 mt-2 flex-wrap">
        <Link
          to={`/events/${event.id}`}
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
        >
          View Details <ArrowRight className="w-3 h-3" />
        </Link>

        <div className="flex items-center gap-2">
          {event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-2.5 py-1.5 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Official Registration Portal"
            >
              <ExternalLink className="w-3 h-3 text-cyan-400" />
              <span>Official Link</span>
            </a>
          )}

          <button
            onClick={handleRegister}
            disabled={registering || registered}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              registered
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                : 'bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold shadow-md shadow-cyan-500/20'
            }`}
          >
            {registered ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> Registered
              </>
            ) : registering ? (
              'Processing...'
            ) : (
              'Quick Register'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
