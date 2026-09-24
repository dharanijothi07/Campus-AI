import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Compass, ShieldCheck, Zap, Bot, ArrowRight, Code, Trophy, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';
import { eventService } from '../services/eventService';
import { EventCard } from '../components/EventCard';

export const LandingPage = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    eventService.getAllEvents().then(events => {
      setFeaturedEvents(events.slice(0, 3));
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 space-y-24 pb-12">
      {/* Hero Section */}
      <section className="relative pt-16 lg:pt-24 px-4 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-6 ai-glow">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>CAMPUS AI — Next-Gen Student Opportunity Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-5xl mx-auto">
          Scale Student Career Opportunities with <span className="gradient-text">AI Precision</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Personalized event recommendations based on skills, department, location, and career goals. Discover hackathons, workshops, internships, and competitions with smart natural-language search and AI credibility verification.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-sm shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            Create Free Student Profile <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/search"
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm border border-gray-800 flex items-center justify-center gap-2 transition-colors"
          >
            Try Smart Natural-Language Search <Zap className="w-4 h-4 text-cyan-400" />
          </Link>
        </div>

        {/* Stats Metrics */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="glass-card p-5 rounded-2xl border border-gray-800">
            <span className="block text-3xl font-extrabold text-cyan-400">1M+</span>
            <span className="text-xs text-gray-400 font-medium">Target Student Reach</span>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-gray-800">
            <span className="block text-3xl font-extrabold text-blue-400">98.4%</span>
            <span className="text-xs text-gray-400 font-medium">AI Match Accuracy</span>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-gray-800">
            <span className="block text-3xl font-extrabold text-purple-400">100%</span>
            <span className="text-xs text-gray-400 font-medium">Fraud & Duplicate Audit</span>
          </div>
          <div className="glass-card p-5 rounded-2xl border border-gray-800">
            <span className="block text-3xl font-extrabold text-emerald-400">24/7</span>
            <span className="text-xs text-gray-400 font-medium">AI Student Assistant</span>
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Trophy className="w-4 h-4" /> Live Opportunities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured College Events & Internships</h2>
          </div>
          <Link to="/recommendations" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
            View All AI Matches <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Core AI Platform Capabilities */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Why Students & Organizers Choose <span className="gradient-text">CAMPUS AI</span>
          </h2>
          <p className="text-sm text-gray-400">
            Built specifically to solve college event discovery fragmentations, fake listings, and registration drop-offs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-gray-800">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">Personalized Recommendation Engine</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Multi-vector matching based on your department, technical skills, interests, location preference, and career milestones.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-gray-800">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">Natural-Language Smart Search</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Type plain English queries like "Find AI hackathons for CSE students in Chennai this month" and get exact parameter matches instantly.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-gray-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">AI Credibility & Quality Scores</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Automated auditing detects duplicate events, suspicious fees, missing registration details, and assigns a trusted quality score.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
