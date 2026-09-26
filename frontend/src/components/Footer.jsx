import React from 'react';
import { Sparkles, Shield, Cpu, Zap, Github, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/[0.06] bg-[#05070E] py-14 px-4 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="font-extrabold text-lg text-white">CAMPUS AI</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            AI-powered student opportunity ecosystem designed to scale event discovery, recommendations, credibility verification, and participation for students.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-3">Platform Capabilities</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-cyan-400" /> AI Recommendation Engine</li>
            <li className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-cyan-400" /> Smart Natural Language Search</li>
            <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-cyan-400" /> Duplicate & Fraud Detection</li>
            <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-cyan-400" /> AI Eligibility Verifier</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-3">Quick Navigation</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><a href="/#discover" className="hover:text-cyan-400 transition-colors">Discover Opportunities</a></li>
            <li><a href="/#eligibility" className="hover:text-cyan-400 transition-colors">Eligibility Engine</a></li>
            <li><a href="/#features" className="hover:text-cyan-400 transition-colors">Smart Search</a></li>
            <li><a href="/#how-it-works" className="hover:text-cyan-400 transition-colors">How It Works</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-3">Platform Architecture</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Built with Spring Boot 3, React.js, Tailwind CSS, MySQL, and AI multi-vector matching. Production-ready student intelligence ecosystem.
          </p>
          <div className="flex items-center gap-3 mt-4 text-gray-400">
            <a href="https://github.com/dharanijothi07/Campus-AI" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors" title="GitHub"><Github className="w-5 h-5" /></a>
            <a href="https://campusai.dev" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors" title="Live Site"><Globe className="w-5 h-5" /></a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <p>© 2026 CAMPUS AI. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
          <span className="hover:text-gray-400 cursor-pointer">API Docs</span>
        </div>
      </div>
    </footer>
  );
};
