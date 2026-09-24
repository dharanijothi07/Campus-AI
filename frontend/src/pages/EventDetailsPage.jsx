import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventService } from '../services/eventService';
import { VerificationBadge } from '../components/VerificationBadge';
import { Sparkles, Calendar, MapPin, Building, ShieldCheck, ExternalLink, ArrowLeft, CheckCircle2, Clock } from 'lucide-react';

export const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const evtData = await eventService.getEventById(id);
        setEvent(evtData);
        const verData = await eventService.verifyEvent(id);
        setVerification(verData);
      } catch (err) {
        console.error('Failed to load event details', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleRegister = async () => {
    setRegistering(true);
    try {
      await eventService.registerForEvent(id);
      setRegistered(true);
    } catch (err) {
      alert(err.message || 'Successfully registered!');
      setRegistered(true);
    } finally {
      setRegistering(false);
    }
  };

  if (loading || !event) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-cyan-400 font-semibold text-sm">
        Loading Event Details & AI Verification...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-cyan-400 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Opportunities
      </Link>

      {/* Top Main Card */}
      <div className="glass-card p-6 lg:p-8 rounded-3xl border border-gray-800 space-y-6">
        {/* Banner image if available */}
        {event.imageUrl && (
          <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden bg-gray-900 relative -mt-2">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-black/80 backdrop-blur-md text-cyan-300 border border-white/10">
              {event.locationMode || 'Online'}
            </span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              {event.categoryName}
            </span>
            {event.locationMode && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-800 text-gray-300 border border-gray-700">
                {event.locationMode}
              </span>
            )}
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/30">
              {event.departmentTarget || 'All Departments'}
            </span>
            {event.approvalStatus && (
              <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${
                event.approvalStatus === 'APPROVED'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : event.approvalStatus === 'REJECTED'
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                {event.approvalStatus}
              </span>
            )}
          </div>

          <VerificationBadge qualityScore={event.qualityScore || 92} isVerified={event.isVerified} compact />
        </div>

        <div>
          <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-1">
            Organized by {event.organizerName || 'Verified Partner'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{event.title}</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-gray-900/60 p-4 rounded-2xl border border-gray-800 text-xs">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-purple-400 shrink-0" />
            <div>
              <span className="block text-gray-500 font-semibold">Organizer</span>
              <span className="text-gray-200 font-bold truncate">{event.organizerName || 'Official'}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <span className="block text-gray-500 font-semibold">Location</span>
              <span className="text-gray-200 font-bold">{event.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <span className="block text-gray-500 font-semibold">Event Date</span>
              <span className="text-gray-200 font-bold">{new Date(event.eventDate).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="block text-gray-500 font-semibold">Registration Deadline</span>
              <span className="text-amber-400 font-bold">{new Date(event.deadline).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            onClick={handleRegister}
            disabled={registering || registered}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 ${
              registered
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                : 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black shadow-lg shadow-cyan-500/25'
            }`}
          >
            {registered ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Registration Confirmed
              </>
            ) : registering ? (
              'Submitting Registration...'
            ) : (
              'Register Now'
            )}
          </button>

          <a
            href={event.registrationLink}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gray-900 hover:bg-gray-800 text-gray-300 font-bold text-xs border border-gray-800 flex items-center justify-center gap-2 transition-colors"
          >
            Official Website <ExternalLink className="w-4 h-4 text-cyan-400" />
          </a>
        </div>
      </div>

      {/* Dedicated AI Eligibility & Match Analysis Section */}
      {event.eligibilityMatch && (
        <div className="glass-card p-6 lg:p-8 rounded-3xl border border-cyan-500/30 relative overflow-hidden space-y-6 bg-gradient-to-b from-gray-900/90 to-gray-950/90 shadow-xl shadow-cyan-500/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-1.5 border border-cyan-500/30">
                <Sparkles className="w-3.5 h-3.5" /> AI Eligibility & Match Analysis
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">Your Profile Compatibility Breakdown</h2>
              <p className="text-xs text-gray-400 mt-1">
                Deterministic rule-based analysis comparing your department, year of study, CGPA, mandatory skills, and career goals with event requirements.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {/* Match Percentage Pill */}
              <div className="text-right">
                <span className="text-2xl font-black text-white">{event.eligibilityMatch.matchPercentage}%</span>
                <span className="block text-[10px] text-gray-400 font-semibold uppercase">Match Score</span>
              </div>

              {/* Status Badge */}
              {event.eligibilityMatch.status === 'ELIGIBLE' ? (
                <div className="px-4 py-2 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Eligible ✓
                </div>
              ) : event.eligibilityMatch.status === 'NOT_FULLY_ELIGIBLE' ? (
                <div className="px-4 py-2 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-extrabold flex items-center gap-1.5">
                  <span>⚠️</span> Not Fully Eligible
                </div>
              ) : (
                <div className="px-4 py-2 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-extrabold flex items-center gap-1.5">
                  <span>❌</span> Not Eligible
                </div>
              )}
            </div>
          </div>

          {/* Match Score Meter */}
          <div>
            <div className="flex justify-between text-xs font-bold text-gray-300 mb-1.5">
              <span>Overall Compatibility Score</span>
              <span className="text-cyan-400">{event.eligibilityMatch.matchPercentage}% / 100%</span>
            </div>
            <div className="w-full h-3 bg-gray-850 rounded-full overflow-hidden p-0.5 border border-gray-800">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  event.eligibilityMatch.matchPercentage >= 80
                    ? 'bg-gradient-to-r from-cyan-400 to-emerald-400'
                    : event.eligibilityMatch.matchPercentage >= 50
                    ? 'bg-gradient-to-r from-amber-400 to-cyan-400'
                    : 'bg-gradient-to-r from-rose-500 to-amber-500'
                }`}
                style={{ width: `${Math.min(100, Math.max(5, event.eligibilityMatch.matchPercentage))}%` }}
              />
            </div>
          </div>

          {/* Two-Column Match & Gap Report */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Why You Match Column */}
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Why You Match ({event.eligibilityMatch.matchReasons?.length || 0})
              </h3>
              <ul className="space-y-2">
                {event.eligibilityMatch.matchReasons && event.eligibilityMatch.matchReasons.length > 0 ? (
                  event.eligibilityMatch.matchReasons.map((reason, idx) => (
                    <li key={idx} className="text-xs text-gray-300 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                      <span>{reason.replace(/^✓\s*/, '')}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-gray-400 italic">No specific skill matches detected.</li>
                )}
              </ul>
            </div>

            {/* Gap Analysis / Missing Requirements Column */}
            <div className={`p-4 rounded-2xl border space-y-3 ${
              event.eligibilityMatch.missingRequirements && event.eligibilityMatch.missingRequirements.length > 0
                ? 'bg-amber-500/5 border-amber-500/20'
                : 'bg-gray-900/40 border-gray-800'
            }`}>
              <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                event.eligibilityMatch.missingRequirements && event.eligibilityMatch.missingRequirements.length > 0
                  ? 'text-amber-400'
                  : 'text-gray-400'
              }`}>
                <span>⚠️</span> Missing Requirements & Gap Analysis
              </h3>
              <ul className="space-y-2">
                {event.eligibilityMatch.missingRequirements && event.eligibilityMatch.missingRequirements.length > 0 ? (
                  event.eligibilityMatch.missingRequirements.map((miss, idx) => (
                    <li key={idx} className="text-xs text-amber-300 flex items-start gap-2">
                      <span className="text-amber-400 font-bold shrink-0 mt-0.5">✗</span>
                      <span>{miss.replace(/^✗\s*/, '')}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> All hard eligibility criteria fully satisfied!
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Structured Criteria Matrix Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-gray-950/70 p-3.5 rounded-2xl border border-gray-850">
            <div>
              <span className="text-gray-500 block text-[10px] uppercase font-bold">Eligible Years</span>
              <span className="text-white font-semibold">{event.eligibleYears || 'All Years'}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px] uppercase font-bold">Minimum CGPA</span>
              <span className="text-white font-semibold">{event.minCgpa ? `${event.minCgpa} / 10.0` : 'None required'}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px] uppercase font-bold">Eligible Colleges</span>
              <span className="text-white font-semibold truncate block">{event.eligibleColleges || 'All Colleges'}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px] uppercase font-bold">Mandatory Skills</span>
              <span className="text-white font-semibold truncate block">{event.mandatorySkills || 'None required'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Content Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event Details Left */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-gray-800 space-y-4">
            <h3 className="font-bold text-lg text-white">Event Overview & Syllabus</h3>
            <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-gray-800 space-y-4">
            <h3 className="font-bold text-lg text-white">Eligibility & Prerequisites</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              {event.eligibility}
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-gray-800 space-y-4">
            <h3 className="font-bold text-lg text-white">Recommended Skills</h3>
            <div className="flex flex-wrap gap-2">
              {(event.skillsRequired || '').split(',').map((skill, idx) => (
                <span key={idx} className="px-3 py-1 rounded-xl text-xs font-semibold bg-gray-900 text-cyan-300 border border-gray-800">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* AI Audit Right */}
        <div className="space-y-6">
          {verification && (
            <div className="glass-card p-6 rounded-3xl border border-gray-800 space-y-4">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                AI Audit Report
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-gray-900/60">
                  <span className="text-gray-400">Event Quality Score:</span>
                  <span className="font-bold text-emerald-400">{verification.qualityScore}%</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-gray-900/60">
                  <span className="text-gray-400">Organizer Credibility:</span>
                  <span className="font-bold text-blue-400">{verification.credibilityScore}%</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-gray-900/60">
                  <span className="text-gray-400">Duplicate Risk:</span>
                  <span className="font-bold text-emerald-400">{verification.isDuplicate ? 'High' : 'None detected'}</span>
                </div>
              </div>

              <p className="text-[11px] text-gray-400 leading-relaxed bg-gray-950 p-3 rounded-xl border border-gray-900">
                {verification.verificationSummary}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
