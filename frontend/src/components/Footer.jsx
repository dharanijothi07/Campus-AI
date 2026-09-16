import React from 'react';
import { Sparkles, Shield, Cpu, Zap, Github, Globe } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-gray-800/80 bg-[#070A12] py-12 px-4 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="font-extrabold text-lg text-white">AI Opportunity Hub</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            AI-powered student opportunity ecosystem designed to scale event discovery, recommendations, credibility verification, and participation for 1 million students.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-3">Platform Capabilities</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-cyan-400" /> AI Recommendation Engine</li>
            <li className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-cyan-400" /> Smart Natural Language Search</li>
            <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-cyan-400" /> Duplicate & Fraud Detection</li>
            <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-cyan-400" /> AI Content Generator</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-3">Quick Navigation</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><a href="/recommendations" className="hover:text-cyan-400 transition-colors">AI Recommendations</a></li>
            <li><a href="/search" className="hover:text-cyan-400 transition-colors">Natural Language Search</a></li>
            <li><a href="/feed" className="hover:text-cyan-400 transition-colors">Personal Content Feed</a></li>
            <li><a href="/organizer" className="hover:text-cyan-400 transition-colors">Organizer Suite</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-3">Hackathon Info</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Built with Spring Boot, JWT, React.js, MySQL, and Gemini / OpenAI API integration. Production-ready full stack implementation.
          </p>
          <div className="flex items-center gap-3 mt-4 text-gray-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors"><Github className="w-5 h-5" /></a>
            <a href="https://opportunityhub.dev" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors"><Globe className="w-5 h-5" /></a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <p>© 2026 AI Student Opportunity Ecosystem. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
          <span className="hover:text-gray-400 cursor-pointer">API Docs</span>
        </div>
      </div>
    </footer>
  );
};
