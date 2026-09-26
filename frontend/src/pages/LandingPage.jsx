import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Zap,
  Bot,
  Trophy,
  Briefcase,
  GraduationCap,
  Search,
  Compass,
  Calendar,
  Code2,
  MapPin,
  Check,
  AlertTriangle,
  UserCheck,
  Cpu,
  Layers,
  ExternalLink,
  ChevronRight,
  Terminal,
  Send,
  SlidersHorizontal,
  Flame,
  Globe
} from 'lucide-react';
import { eventService } from '../services/eventService';
import { EventCard } from '../components/EventCard';

export const LandingPage = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  
  // Interactive Smart Search State
  const searchPresets = [
    {
      query: "AI hackathons in Chennai for 3rd year CSE students with prizes",
      tags: [
        { label: "Category", val: "Hackathon", color: "border-cyan-500/40 text-cyan-300 bg-cyan-500/10" },
        { label: "Location", val: "Chennai (Offline)", color: "border-purple-500/40 text-purple-300 bg-purple-500/10" },
        { label: "Target Dept", val: "CSE / IT", color: "border-blue-500/40 text-blue-300 bg-blue-500/10" },
        { label: "Eligible Year", val: "3rd & 4th Year", color: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10" },
        { label: "Tech Focus", val: "GenAI & LLMs", color: "border-pink-500/40 text-pink-300 bg-pink-500/10" }
      ],
      resultTitle: "National GenAI Autonomous Hackathon 2026",
      resultOrg: "IIT Madras Research Park & Google Cloud",
      resultDate: "March 28, 2026",
      resultMatch: 96
    },
    {
      query: "Remote Machine Learning summer internships 2026 with stipend",
      tags: [
        { label: "Category", val: "Internship", color: "border-cyan-500/40 text-cyan-300 bg-cyan-500/10" },
        { label: "Location", val: "Online / Remote", color: "border-purple-500/40 text-purple-300 bg-purple-500/10" },
        { label: "Skills", val: "Python, PyTorch", color: "border-blue-500/40 text-blue-300 bg-blue-500/10" },
        { label: "Eligible Year", val: "2nd, 3rd, 4th Year", color: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10" },
        { label: "Type", val: "Paid Internship", color: "border-pink-500/40 text-pink-300 bg-pink-500/10" }
      ],
      resultTitle: "Microsoft AI Research Summer Associate",
      resultOrg: "Microsoft Research India",
      resultDate: "Application closes April 15, 2026",
      resultMatch: 94
    },
    {
      query: "Robotics and Embedded Systems workshops with hands-on hardware kits",
      tags: [
        { label: "Category", val: "Workshop", color: "border-cyan-500/40 text-cyan-300 bg-cyan-500/10" },
        { label: "Location", val: "Bengaluru / Hybrid", color: "border-purple-500/40 text-purple-300 bg-purple-500/10" },
        { label: "Target Dept", val: "ECE / EEE / Mech / CSE", color: "border-blue-500/40 text-blue-300 bg-blue-500/10" },
        { label: "Hands-on", val: "Hardware Kit Provided", color: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10" },
        { label: "Certification", val: "Verified IEEE", color: "border-pink-500/40 text-pink-300 bg-pink-500/10" }
      ],
      resultTitle: "Autonomous Edge Robotics & Embedded Vision Bootcamp",
      resultOrg: "IEEE Robotics & Automation Society",
      resultDate: "April 04, 2026",
      resultMatch: 91
    }
  ];
  const [selectedSearchPreset, setSelectedSearchPreset] = useState(0);

  // Interactive Chatbot Preview State
  const chatScenarios = [
    {
      prompt: "What opportunities can I apply for this weekend?",
      reply: "Based on your verified student profile (3rd Year CSE, Python & Machine Learning), here are 2 high-match events closing soon:\n\n1. National GenAI Autonomous Hackathon — 96% Match (Eligible ✅, Registration closes in 48 hours)\n2. Cloud Innovation Sprint 2026 — 92% Match (Eligible ✅, Online team sprint)\n\nWould you like me to prepare your registration checklist or find teammates with complementary skills?"
    },
    {
      prompt: "Am I eligible for the Google GenAI Hackathon?",
      reply: "Yes, you are 100% Eligible! ✅\n\n• Department: Computer Science & Engineering ✓ (Matches required CSE/IT)\n• Year: 3rd Year ✓ (Open to 2nd–4th Years)\n• CGPA: 8.8 ✓ (Minimum required: 7.5)\n• Mandatory Skills: Python, Machine Learning ✓ (Both present in your profile)\n\nMatch Score: 94%. Your background in PyTorch gives you an advantage for the autonomous agent track."
    },
    {
      prompt: "What skills should I learn to qualify for the Full-Stack Summit?",
      reply: "For the Full-Stack Web Innovation Summit, you currently have a 72% Match (Not Fully Eligible ⚠️).\n\n• You satisfy Department, Year, and CGPA.\n• Missing Mandatory Skill: React.js ✗\n\nRecommended Action: Complete our recommended 1-week React foundation project. Once added to your profile, your match score will jump to 95% and unlock eligibility!"
    }
  ];
  const [activeChatIndex, setActiveChatIndex] = useState(0);

  // Interactive Mobile App Showcase State
  const [activeAppTab, setActiveAppTab] = useState(0);

  useEffect(() => {
    eventService.getAllEvents().then(events => {
      if (events && events.length > 0) {
        setFeaturedEvents(events.slice(0, 3));
      }
    }).catch(() => {
      // Fallback handled gracefully
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#05070E] text-gray-100 overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Ambient Lighting Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-gradient-to-b from-purple-900/20 via-cyan-900/15 to-transparent blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-[800px] -left-48 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[1600px] -right-48 w-[650px] h-[650px] bg-cyan-600/10 blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-[3000px] left-1/3 w-[800px] h-[800px] bg-indigo-600/10 blur-[180px] pointer-events-none -z-10" />

      {/* ========================================================
          1. HERO SECTION (Cinematic, Modern, High-Impact)
         ======================================================== */}
      <section className="relative pt-16 sm:pt-24 lg:pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          
          {/* Subtle Glowing Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide mb-8 ai-glow backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="tracking-wider uppercase">AI-Powered Student Opportunity Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-5xl text-white">
            Your next opportunity <br className="hidden sm:inline" />
            <span className="gradient-text font-black">starts with you.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-7 text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl leading-relaxed font-normal">
            Discover hackathons, internships, competitions, and research fellowships matched precisely to your skills, department, and verified eligibility.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 text-black font-extrabold text-sm sm:text-base shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started Free <ArrowRight className="w-4 h-4 text-black" />
            </Link>
            <a
              href="#discover"
              className="w-full sm:w-auto px-8 py-4 rounded-full glass-pill hover:bg-white/[0.08] text-white font-semibold text-sm sm:text-base border border-white/[0.12] flex items-center justify-center gap-2 transition-all hover:border-white/[0.25]"
            >
              Explore Opportunities <Compass className="w-4 h-4 text-cyan-400" />
            </a>
          </div>

          {/* ========================================================
              Hero Centerpiece: Floating Futuristic Smartphone & Dashboard UI
             ======================================================== */}
          <div className="relative mt-20 w-full max-w-4xl mx-auto flex items-center justify-center">
            
            {/* Ambient Backlight for Phone Centerpiece */}
            <div className="absolute w-[450px] sm:w-[650px] h-[350px] bg-gradient-to-tr from-cyan-500/20 via-indigo-500/25 to-purple-500/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

            {/* Floating UI Micro-Card Left Top */}
            <div className="hidden lg:flex absolute -left-12 top-16 z-20 items-center gap-3 px-4 py-3 rounded-2xl glass-card border border-white/[0.12] shadow-2xl animate-float-slow">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-white">8 Opportunities Found</span>
                <span className="text-[11px] text-cyan-300">Filtered for 3rd Year CSE</span>
              </div>
            </div>

            {/* Floating UI Micro-Card Right Top */}
            <div className="hidden lg:flex absolute -right-10 top-24 z-20 items-center gap-3 px-4 py-3 rounded-2xl glass-card border border-emerald-500/30 shadow-2xl animate-float-delayed">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-white">Eligible ✓</span>
                <span className="text-[11px] text-emerald-300">Hard criteria satisfied</span>
              </div>
            </div>

            {/* Floating UI Micro-Card Left Bottom */}
            <div className="hidden lg:flex absolute -left-8 bottom-16 z-20 items-center gap-3 px-4 py-3 rounded-2xl glass-card border border-purple-500/30 shadow-2xl animate-float-delayed">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-white">AI Hackathon 2026</span>
                <span className="text-[11px] text-purple-300">National Grand Finale</span>
              </div>
            </div>

            {/* Floating UI Micro-Card Right Bottom */}
            <div className="hidden lg:flex absolute -right-8 bottom-12 z-20 items-center gap-3 px-4 py-3 rounded-2xl glass-card border border-cyan-500/40 shadow-2xl animate-float-slow">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-black font-extrabold text-sm shadow-md shadow-cyan-500/40">
                96%
              </div>
              <div className="text-left">
                <span className="block text-xs font-bold text-white">Match Accuracy</span>
                <span className="text-[11px] text-cyan-300">Department + Skills + CGPA</span>
              </div>
            </div>

            {/* Center Phone / Device Frame */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-[42px] p-3.5 bg-gradient-to-b from-white/[0.18] via-white/[0.06] to-white/[0.02] border border-white/[0.15] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all">
              
              {/* Inner Smartphone Screen */}
              <div className="rounded-[34px] bg-[#070B16] border border-white/[0.08] overflow-hidden text-left p-5 space-y-4">
                
                {/* Phone Speaker Notch & Status Bar */}
                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-0.5 pb-1">
                  <span className="font-semibold text-white">9:41</span>
                  <div className="w-20 h-4 bg-black/70 rounded-full border border-white/[0.1] mx-auto" />
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <span className="text-[10px]">5G</span>
                    <div className="w-4 h-2 rounded-sm border border-gray-400 flex items-center p-0.5">
                      <div className="w-full h-full bg-gray-200 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* In-App Header Greeting */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[11px] font-medium text-cyan-400 uppercase tracking-wider block">Student Dashboard</span>
                    <h4 className="text-base font-bold text-white">Welcome back, Dharani 👋</h4>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-cyan-500/20">
                    DJ
                  </div>
                </div>

                {/* Live Match Card Inside Device */}
                <div className="rounded-2xl p-4 bg-[#0F1626]/90 border border-cyan-500/30 shadow-lg space-y-3 relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex items-start justify-between">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold">
                      <Flame className="w-3 h-3 text-cyan-400" />
                      Top Recommended
                    </div>
                    <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Eligible
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-sm text-white">National GenAI Hackathon 2026</h5>
                    <p className="text-[11px] text-gray-400 mt-0.5">IIT Madras & Google Cloud</p>
                  </div>

                  {/* Match Percentage Display */}
                  <div className="flex items-center gap-2.5 pt-1">
                    <div className="px-2 py-1 rounded-lg bg-cyan-400 text-black text-xs font-black shadow-sm shadow-cyan-400/30">
                      96% Match
                    </div>
                    <span className="text-[11px] text-gray-300 font-medium">Exceptional profile fit</span>
                  </div>

                  {/* Verified Criteria Bullets */}
                  <div className="pt-2 border-t border-white/[0.06] space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between text-gray-300">
                      <span className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Department: CSE
                      </span>
                      <span className="text-emerald-400 text-[10px] font-semibold">Matched</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-300">
                      <span className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Required Skills: Python, ML
                      </span>
                      <span className="text-emerald-400 text-[10px] font-semibold">Matched</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-300">
                      <span className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Year of Study: 3rd Year
                      </span>
                      <span className="text-emerald-400 text-[10px] font-semibold">Matched</span>
                    </div>
                  </div>

                  <Link
                    to="/register"
                    className="block w-full text-center py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-xs shadow-md shadow-cyan-500/20 hover:brightness-110 transition-all mt-2"
                  >
                    Quick Apply with Profile →
                  </Link>
                </div>

                {/* Secondary Mini Snippet inside phone */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-[10px]">
                      MS
                    </div>
                    <div>
                      <span className="block font-semibold text-white text-[11px]">AI Research Intern</span>
                      <span className="text-[10px] text-gray-400">Microsoft Research</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                    94% Match
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          2. TRUST / VALUE STRIP
         ======================================================== */}
      <section className="relative border-y border-white/[0.06] bg-[#070A14]/70 backdrop-blur-md py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-6 sm:gap-10 text-gray-400 text-xs sm:text-sm font-medium tracking-wide">
          <div className="flex items-center gap-2 hover:text-white transition-colors">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center gap-2 hover:text-white transition-colors">
            <UserCheck className="w-4 h-4 text-purple-400" />
            <span>Personalized Matching</span>
          </div>
          <div className="flex items-center gap-2 hover:text-white transition-colors">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Eligibility-Aware</span>
          </div>
          <div className="flex items-center gap-2 hover:text-white transition-colors">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span>Student-Focused</span>
          </div>
          <div className="flex items-center gap-2 hover:text-white transition-colors">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Smart Discovery</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. PERSONALIZED OPPORTUNITIES SECTION
         ======================================================== */}
      <section id="discover" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Trophy className="w-3.5 h-3.5" /> Curated For You
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Stop searching. <span className="gradient-text">Start discovering.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-2xl">
              Opportunities curated for your unique profile, skills, and eligibility status. Zero generic spam.
            </p>
          </div>
          <Link
            to="/recommendations"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group self-start md:self-auto"
          >
            Explore all AI opportunities <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Showcase Opportunity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: Hackathon */}
          <div className="glass-card glass-card-hover p-6 sm:p-7 rounded-3xl border border-white/[0.08] relative flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold border border-cyan-500/20">
                  Hackathon
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  <Check className="w-3 h-3" /> Eligible
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                <span>Google for Developers</span>
                <span>•</span>
                <span>Hybrid (Chennai / Online)</span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                Google GenAI & Agentic Systems Hackathon
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-2">
                Build autonomous multi-agent systems and real-world developer tools with Gemini 1.5 Pro and Vertex AI.
              </p>

              {/* Match Score Strip */}
              <div className="mt-5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="block text-[11px] text-gray-400">Match Fit</span>
                  <span className="text-xs font-bold text-white">Full-Stack & ML</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-cyan-400">94%</span>
                  <span className="block text-[10px] text-gray-400">High Match</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] text-[11px] text-gray-300 border border-white/[0.06]">Python</span>
                <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] text-[11px] text-gray-300 border border-white/[0.06]">LLMs</span>
                <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] text-[11px] text-gray-300 border border-white/[0.06]">React</span>
                <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] text-[11px] text-gray-300 border border-white/[0.06]">FastAPI</span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-gray-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Closes in 4 days
              </span>
              <Link
                to="/register"
                className="font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Internship */}
          <div className="glass-card glass-card-hover p-6 sm:p-7 rounded-3xl border border-white/[0.08] relative flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-bold border border-purple-500/20">
                  Internship
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  <Check className="w-3 h-3" /> Eligible
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                <span>Microsoft Research</span>
                <span>•</span>
                <span>Bengaluru / Hybrid</span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                Microsoft AI Research Summer Fellow 2026
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-2">
                Conduct applied machine learning research alongside principal scientists on multimodal models and natural language semantics.
              </p>

              {/* Match Score Strip */}
              <div className="mt-5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="block text-[11px] text-gray-400">Match Fit</span>
                  <span className="text-xs font-bold text-white">Algorithms & PyTorch</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-purple-400">88%</span>
                  <span className="block text-[10px] text-gray-400">Target Match</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] text-[11px] text-gray-300 border border-white/[0.06]">PyTorch</span>
                <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] text-[11px] text-gray-300 border border-white/[0.06]">Python</span>
                <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] text-[11px] text-gray-300 border border-white/[0.06]">Data Structures</span>
                <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] text-[11px] text-gray-300 border border-white/[0.06]">NLP</span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-gray-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-400" /> Closes April 15
              </span>
              <Link
                to="/register"
                className="font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Workshop */}
          <div className="glass-card glass-card-hover p-6 sm:p-7 rounded-3xl border border-white/[0.08] relative flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-bold border border-blue-500/20">
                  Workshop & Bootcamp
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  <Check className="w-3 h-3" /> Eligible
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                <span>IIT Madras Research Park</span>
                <span>•</span>
                <span>Online Live Interactive</span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                Quantum Computing & Quantum Algorithms
              </h3>

              <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-2">
                Hands-on programming using Qiskit, quantum superposition circuits, Shor's algorithm simulations, and cryptography implications.
              </p>

              {/* Match Score Strip */}
              <div className="mt-5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="block text-[11px] text-gray-400">Match Fit</span>
                  <span className="text-xs font-bold text-white">Math & Linear Algebra</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-blue-400">91%</span>
                  <span className="block text-[10px] text-gray-400">Strong Match</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] text-[11px] text-gray-300 border border-white/[0.06]">Qiskit</span>
                <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] text-[11px] text-gray-300 border border-white/[0.06]">Python</span>
                <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] text-[11px] text-gray-300 border border-white/[0.06]">Linear Algebra</span>
                <span className="px-2 py-0.5 rounded-lg bg-white/[0.04] text-[11px] text-gray-300 border border-white/[0.06]">Quantum Gates</span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <span className="text-gray-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-400" /> Starts May 02
              </span>
              <Link
                to="/register"
                className="font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Live Seeded Events (if loaded) */}
        {featuredEvents.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/[0.06]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                Live Upcoming Events from the Campus AI Database
              </h3>
              <Link to="/recommendations" className="text-xs font-semibold text-cyan-400 hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ========================================================
          4. ELIGIBILITY MATCH SECTION (CAMPUS AI DIFFERENTIATOR)
         ======================================================== */}
      <section id="eligibility" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" /> Two-Phase Transparent Engine
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Know before <span className="gradient-text">you apply.</span>
          </h2>
          <p className="mt-4 text-base text-gray-400 leading-relaxed">
            Never waste time applying to events you are disqualified for. Campus AI evaluates your department, year, CGPA, and mandatory skills with complete transparency.
          </p>
        </div>

        {/* Side-by-Side Comparison: Eligible vs Not Fully Eligible */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: 96% Eligible */}
          <div className="rounded-3xl p-7 sm:p-8 bg-[#090E1B] border border-emerald-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Hard Requirements Met</span>
                <h3 className="text-xl font-bold text-white mt-1">National AI Hackathon</h3>
                <span className="text-xs text-gray-400">Student Profile: CSE • 3rd Year • CGPA 8.8</span>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Eligible ✅
                </div>
                <div className="text-3xl font-black text-emerald-400">96%</div>
                <span className="text-[10px] text-gray-400 font-medium">Match Score</span>
              </div>
            </div>

            {/* Criteria Breakdown */}
            <div className="mt-6 space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-emerald-500/15">
                <div className="flex items-center gap-2.5 text-gray-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Department:</strong> Matches CSE / IT requirement</span>
                </div>
                <span className="text-emerald-400 text-xs font-bold">Passed</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-emerald-500/15">
                <div className="flex items-center gap-2.5 text-gray-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Year of Study:</strong> 3rd Year (Event open to 3rd & 4th)</span>
                </div>
                <span className="text-emerald-400 text-xs font-bold">Passed</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-emerald-500/15">
                <div className="flex items-center gap-2.5 text-gray-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Mandatory Skill:</strong> Python present in profile</span>
                </div>
                <span className="text-emerald-400 text-xs font-bold">Matched</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-emerald-500/15">
                <div className="flex items-center gap-2.5 text-gray-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Mandatory Skill:</strong> Machine Learning present</span>
                </div>
                <span className="text-emerald-400 text-xs font-bold">Matched</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-emerald-500/15">
                <div className="flex items-center gap-2.5 text-gray-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Minimum CGPA:</strong> 7.5 satisfied (Student: 8.8)</span>
                </div>
                <span className="text-emerald-400 text-xs font-bold">Passed</span>
              </div>
            </div>

            <div className="mt-7 pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-emerald-300 font-medium">Ready for immediate 1-click registration</span>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-colors"
              >
                Apply Now →
              </Link>
            </div>
          </div>

          {/* Card 2: 72% Not Fully Eligible */}
          <div className="rounded-3xl p-7 sm:p-8 bg-[#090E1B] border border-amber-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Missing 1 Requirement</span>
                <h3 className="text-xl font-bold text-white mt-1">Full-Stack Innovation Summit</h3>
                <span className="text-xs text-gray-400">Student Profile: CSE • 3rd Year • CGPA 8.8</span>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-extrabold mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Not Fully Eligible ⚠️
                </div>
                <div className="text-3xl font-black text-amber-400">72%</div>
                <span className="text-[10px] text-gray-400 font-medium">Match Score</span>
              </div>
            </div>

            {/* Criteria Breakdown */}
            <div className="mt-6 space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2.5 text-gray-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Department:</strong> Matches CSE requirement</span>
                </div>
                <span className="text-emerald-400 text-xs font-bold">Passed</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2.5 text-gray-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Year of Study:</strong> 3rd Year satisfies requirement</span>
                </div>
                <span className="text-emerald-400 text-xs font-bold">Passed</span>
              </div>

              {/* FAILED REQUIREMENT */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                <div className="flex items-center gap-2.5 text-red-200">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span><strong>Mandatory Skill:</strong> React.js missing from profile</span>
                </div>
                <span className="text-red-400 text-xs font-bold">Missing ✗</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2.5 text-gray-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Minimum CGPA:</strong> 7.0 satisfied</span>
                </div>
                <span className="text-emerald-400 text-xs font-bold">Passed</span>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
                💡 <strong>AI Guidance:</strong> Learn basic React components and state management to unlock eligibility and raise your score to 95%.
              </div>
            </div>

            <div className="mt-7 pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium">Update profile skills to recalculate eligibility</span>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-xs border border-white/[0.1] transition-colors"
              >
                Learn Skills →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          5. SMART NATURAL-LANGUAGE SEARCH SECTION
         ======================================================== */}
      <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Zap className="w-4 h-4" /> Zero SQL • Pure Language
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Search naturally. <span className="gradient-text">Discover intelligently.</span>
          </h2>
          <p className="mt-4 text-base text-gray-400 leading-relaxed">
            Ask Campus AI in plain conversational English. The smart engine extracts location, department, eligibility, and skill criteria in milliseconds.
          </p>
        </div>

        {/* Interactive Search Console Preview */}
        <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 bg-[#080C17] border border-white/[0.1] shadow-2xl space-y-6">
          
          {/* Preset Prompts Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-400 flex items-center gap-1.5 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" /> Try prompt:
            </span>
            {searchPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSearchPreset(idx)}
                className={`text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                  selectedSearchPreset === idx
                    ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-white/[0.04] border-white/[0.08] text-gray-400 hover:text-white hover:border-white/[0.2]'
                }`}
              >
                Prompt {idx + 1}
              </button>
            ))}
          </div>

          {/* Search Input Bar Mockup */}
          <div className="relative flex items-center">
            <div className="absolute left-4 text-cyan-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              readOnly
              value={searchPresets[selectedSearchPreset].query}
              className="w-full pl-12 pr-28 py-4 bg-[#0E1526] rounded-2xl border border-cyan-500/40 text-sm sm:text-base text-white focus:outline-none shadow-inner"
            />
            <div className="absolute right-3 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-extrabold text-xs flex items-center gap-1 shadow-md">
              <Sparkles className="w-3.5 h-3.5" /> Parse
            </div>
          </div>

          {/* Extracted Parameters Glowing Chips */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Extracted Structured Parameters
            </div>
            <div className="flex flex-wrap gap-2">
              {searchPresets[selectedSearchPreset].tags.map((tag, i) => (
                <div
                  key={i}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 ${tag.color}`}
                >
                  <span className="opacity-70 text-[10px] uppercase font-bold">{tag.label}:</span>
                  <span>{tag.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instant Result Card Preview */}
          <div className="mt-4 p-5 rounded-2xl bg-[#0D1424] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  Exact Criteria Match
                </span>
                <span className="text-xs text-gray-400">{searchPresets[selectedSearchPreset].resultOrg}</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                {searchPresets[selectedSearchPreset].resultTitle}
              </h4>
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {searchPresets[selectedSearchPreset].resultDate}
              </p>
            </div>
            <div className="flex items-center gap-4 self-end sm:self-center">
              <div className="text-right">
                <div className="text-2xl font-black text-cyan-400">{searchPresets[selectedSearchPreset].resultMatch}%</div>
                <div className="text-[10px] text-gray-400">Match Fit</div>
              </div>
              <Link
                to="/search"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1"
              >
                Try Search <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          6. AI ASSISTANT / CHATBOT PREVIEW SECTION
         ======================================================== */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
              <Bot className="w-4 h-4" /> 24/7 AI Career Co-Pilot
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Your personal <br />
              <span className="gradient-text">Campus AI Advisor.</span>
            </h2>
            <p className="text-base text-gray-400 leading-relaxed">
              Ask questions about upcoming deadlines, eligibility rules, skill preparation roadmaps, and team requirements in natural conversation.
            </p>

            {/* Quick interactive prompts */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Click a sample question to test:
              </span>
              {chatScenarios.map((scenario, index) => (
                <button
                  key={index}
                  onClick={() => setActiveChatIndex(index)}
                  className={`w-full text-left p-3 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                    activeChatIndex === index
                      ? 'bg-purple-500/15 border-purple-500/40 text-purple-300 font-bold shadow-lg shadow-purple-500/10'
                      : 'bg-[#090E1B] border-white/[0.06] text-gray-400 hover:text-white hover:border-white/[0.15]'
                  }`}
                >
                  <span className="truncate pr-2">"{scenario.prompt}"</span>
                  <ChevronRight className="w-4 h-4 shrink-0 text-cyan-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chat Window Mockup */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-7 bg-[#080C17] border border-white/[0.1] shadow-2xl space-y-5">
            
            {/* Chat Window Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-600 p-0.5 flex items-center justify-center">
                  <div className="w-full h-full bg-[#080C17] rounded-[10px] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    Campus AI Assistant
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h4>
                  <span className="text-[11px] text-gray-400">Context: 3rd Year CSE • Python & ML</span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/[0.05] text-gray-400 border border-white/[0.08]">
                Real-time
              </span>
            </div>

            {/* Conversation Flow */}
            <div className="space-y-4 py-2 min-h-[220px]">
              
              {/* User Message */}
              <div className="flex justify-end">
                <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tr-none px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-black text-xs sm:text-sm font-semibold shadow-md">
                  {chatScenarios[activeChatIndex].prompt}
                </div>
              </div>

              {/* Bot Response */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="max-w-[90%] rounded-2xl rounded-tl-none px-4 py-3.5 bg-[#0F1626] border border-white/[0.08] text-xs sm:text-sm text-gray-200 leading-relaxed whitespace-pre-line shadow-lg">
                  {chatScenarios[activeChatIndex].reply}
                </div>
              </div>

            </div>

            {/* Chat Input Placeholder */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                readOnly
                placeholder="Ask about opportunities, deadlines, or eligibility..."
                className="w-full px-4 py-3 bg-[#0D1322] rounded-xl border border-white/[0.08] text-xs text-gray-400 focus:outline-none"
              />
              <button
                className="p-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors shrink-0 shadow-md"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          7. HOW IT WORKS SECTION (Clean, Minimal, 3-Step Flow)
         ======================================================== */}
      <section id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Cpu className="w-4 h-4" /> Simple 3-Step Pipeline
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How Campus AI works.
          </h2>
          <p className="mt-4 text-base text-gray-400 leading-relaxed">
            From setup to confident application in less than 3 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 01 */}
          <div className="glass-card glass-card-hover p-8 rounded-3xl border border-white/[0.08] relative">
            <div className="text-4xl sm:text-5xl font-black text-white/10 mb-4 font-mono">01</div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Create Student Profile</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Enter your college, department, year of study, technical skills, interests, and career goals.
            </p>
          </div>

          {/* Step 02 */}
          <div className="glass-card glass-card-hover p-8 rounded-3xl border border-white/[0.08] relative">
            <div className="text-4xl sm:text-5xl font-black text-white/10 mb-4 font-mono">02</div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Instant AI Matching</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Our 2-phase engine evaluates hard eligibility and computes transparent match percentages for every event.
            </p>
          </div>

          {/* Step 03 */}
          <div className="glass-card glass-card-hover p-8 rounded-3xl border border-white/[0.08] relative">
            <div className="text-4xl sm:text-5xl font-black text-white/10 mb-4 font-mono">03</div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Apply with Confidence</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Register via verified official links knowing you meet all prerequisites. Zero disqualification surprises.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================
          8. MOBILE APP SHOWCASE (Multi-Mockup Experience)
         ======================================================== */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Globe className="w-4 h-4" /> Multi-Device Experience
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Discover opportunities <span className="gradient-text">everywhere.</span>
          </h2>
          <p className="mt-4 text-base text-gray-400 leading-relaxed">
            Optimized for seamless performance whether on your desktop workstation or on the go on your phone.
          </p>
        </div>

        {/* 3 Smartphone Mockup Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          
          {/* Mockup 1: Dashboard View */}
          <div className="rounded-[38px] p-3 bg-gradient-to-b from-white/[0.15] to-white/[0.02] border border-white/[0.12] shadow-2xl backdrop-blur-xl">
            <div className="rounded-[30px] bg-[#070B16] p-4 border border-white/[0.08] space-y-3 text-left">
              <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Screen 01</div>
              <h4 className="text-sm font-bold text-white">Live Student Dashboard</h4>
              <p className="text-[11px] text-gray-400">Personalized feed with genuine verified upcoming events and deadlines.</p>
              
              <div className="p-3 rounded-2xl bg-[#0F1626] border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-white">IITM GenAI Hackathon</span>
                  <span className="text-cyan-400 font-extrabold">96%</span>
                </div>
                <div className="text-[10px] text-gray-400">March 28 • Chennai</div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div className="bg-cyan-400 h-1.5 rounded-full w-[96%]" />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-white">Microsoft AI Fellow</span>
                  <span className="text-purple-400 font-extrabold">88%</span>
                </div>
                <div className="text-[10px] text-gray-400">April 15 • Research</div>
              </div>
            </div>
          </div>

          {/* Mockup 2: Match Detail Center (Elevated / Highlighted) */}
          <div className="rounded-[42px] p-3.5 bg-gradient-to-b from-cyan-500/30 via-indigo-500/20 to-purple-500/20 border border-cyan-500/40 shadow-[0_20px_60px_-10px_rgba(6,182,212,0.3)] md:-translate-y-4 backdrop-blur-2xl">
            <div className="rounded-[34px] bg-[#070B16] p-5 border border-white/[0.08] space-y-4 text-left">
              <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Check className="w-3 h-3" /> Screen 02 • Match Engine
              </div>
              <h4 className="text-base font-bold text-white">Detailed Eligibility Breakdown</h4>
              
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 text-center">
                <div className="text-3xl font-black text-emerald-400">96%</div>
                <span className="text-[11px] font-bold text-white block mt-0.5">Officially Eligible</span>
                <span className="text-[10px] text-gray-400">Hard criteria passed</span>
              </div>

              <div className="space-y-1.5 text-[11px] text-gray-300">
                <div className="flex items-center justify-between">
                  <span>✓ Department match</span>
                  <span className="text-emerald-400 font-bold">100%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>✓ Year match</span>
                  <span className="text-emerald-400 font-bold">100%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>✓ Required Python skill</span>
                  <span className="text-emerald-400 font-bold">100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mockup 3: Smart Search View */}
          <div className="rounded-[38px] p-3 bg-gradient-to-b from-white/[0.15] to-white/[0.02] border border-white/[0.12] shadow-2xl backdrop-blur-xl">
            <div className="rounded-[30px] bg-[#070B16] p-4 border border-white/[0.08] space-y-3 text-left">
              <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Screen 03</div>
              <h4 className="text-sm font-bold text-white">Natural Language Search</h4>
              <p className="text-[11px] text-gray-400">Type any query in English to query events and opportunities instantly.</p>
              
              <div className="p-2.5 rounded-xl bg-[#0F1626] border border-purple-500/30 text-[11px] text-purple-200">
                "Find AI hackathons in Chennai for CSE"
              </div>

              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 text-[10px] font-bold">Hackathon</span>
                <span className="px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-300 text-[10px] font-bold">Chennai</span>
                <span className="px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-300 text-[10px] font-bold">CSE</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          9. FINAL CINEMATIC CALL-TO-ACTION (CTA)
         ======================================================== */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-[40px] p-8 sm:p-14 lg:p-16 bg-gradient-to-b from-[#0F172A]/90 to-[#070A14] border border-white/[0.12] shadow-[0_30px_100px_-20px_rgba(0,242,254,0.15)] text-center overflow-hidden">
          
          {/* Ambient Lighting Spheres inside CTA Card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-blue-600/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>JOIN THOUSANDS OF AMBITIOUS STUDENTS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Your next opportunity is <span className="gradient-text">closer than you think.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Join students from top universities discovering personalized hackathons, internships, competitions, and research workshops with AI precision.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 text-black font-extrabold text-sm sm:text-base shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              Get Started Free →
            </Link>
            <Link
              to="/search"
              className="w-full sm:w-auto px-9 py-4 rounded-full glass-pill hover:bg-white/[0.08] text-white font-semibold text-sm sm:text-base border border-white/[0.12] flex items-center justify-center gap-2 transition-all hover:border-white/[0.25]"
            >
              Explore Platform <Compass className="w-4 h-4 text-cyan-400" />
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> 100% Free for Students</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Instant Eligibility Breakdown</span>
          </div>

        </div>
      </section>

    </div>
  );
};
