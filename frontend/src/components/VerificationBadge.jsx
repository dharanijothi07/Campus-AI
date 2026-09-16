import React from 'react';
import { ShieldCheck, AlertTriangle, Sparkles } from 'lucide-react';

export const VerificationBadge = ({ qualityScore = 90, isVerified = true, compact = false }) => {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>{qualityScore}% Quality Score</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-2 rounded-xl bg-gray-900/80 border border-gray-800">
      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
        <ShieldCheck className="w-4 h-4" />
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-white">AI Credibility Score:</span>
          <span className="text-xs font-extrabold text-emerald-400">{qualityScore}%</span>
        </div>
        <span className="text-[10px] text-gray-400 block">
          Audited for duplicate detection, domain credibility, and complete eligibility.
        </span>
      </div>
    </div>
  );
};
