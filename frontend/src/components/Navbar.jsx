import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { Sparkles, Bell, User, LogOut, Search, Compass, Award, Calendar, Layers, ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const isLandingPage = location.pathname === '/';

  const handleNavScroll = (elementId) => {
    setMobileMenuOpen(false);
    if (!isLandingPage) {
      navigate(`/#${elementId}`);
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(elementId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass-nav border-b border-white/[0.06] px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#05070E] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-wider text-white flex items-center gap-1.5">
              CAMPUS <span className="gradient-text">AI</span>
            </span>
            <span className="text-[10px] text-cyan-400/90 font-medium tracking-wider block uppercase -mt-1">
              Student Opportunity Platform
            </span>
          </div>
        </Link>

        {/* Navigation Links - Dynamic based on login or visitor */}
        {user ? (
          <div className="hidden md:flex items-center gap-1 bg-[#0D121F]/70 p-1.5 rounded-xl border border-white/[0.08]">
            <Link
              to="/dashboard"
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                isActive('/dashboard') ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Compass className="w-4 h-4" />
              Dashboard
            </Link>

            <Link
              to="/recommendations"
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                isActive('/recommendations') ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              AI Match
            </Link>

            <Link
              to="/search"
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                isActive('/search') ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Search className="w-4 h-4" />
              Smart Search
            </Link>

            <Link
              to="/feed"
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                isActive('/feed') ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Layers className="w-4 h-4" />
              Personal Feed
            </Link>

            <Link
              to="/registrations"
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                isActive('/registrations') ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Registrations
            </Link>

            {(user?.role === 'ADMIN' || user?.role === 'ORGANIZER') && (
              <>
                <Link
                  to="/admin/events"
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive('/admin/events') ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'text-gray-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  Admin HQ
                </Link>
                <Link
                  to="/admin/add-event"
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    isActive('/admin/add-event') ? 'bg-cyan-500 text-black shadow-md' : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40'
                  }`}
                >
                  + Add Event
                </Link>
              </>
            )}
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <button
              onClick={() => handleNavScroll('discover')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Discover
            </button>
            <button
              onClick={() => handleNavScroll('eligibility')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Eligibility Engine
            </button>
            <button
              onClick={() => handleNavScroll('features')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              AI Features
            </button>
            <button
              onClick={() => handleNavScroll('how-it-works')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              How It Works
            </button>
          </div>
        )}

        {/* User / Actions Header */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {/* Notification Button */}
              <Link
                to="/notifications"
                className="relative p-2 rounded-xl bg-[#0D121F] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/[0.08] transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-bounce shadow-md shadow-red-500/50">
                    {unreadCount}
                  </span>
                )}
              </Link>

              {/* Profile Link */}
              <Link
                to="/profile"
                className="flex items-center gap-2 p-1.5 pl-3 pr-2 rounded-xl bg-[#0D121F] border border-white/[0.08] hover:border-white/[0.15] transition-all"
              >
                <div className="text-right hidden sm:block">
                  <span className="block text-xs font-semibold text-white leading-none">
                    {user.fullName || user.email.split('@')[0]}
                  </span>
                  <span className="text-[10px] text-cyan-400 font-medium">
                    {user.role}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                  {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                </div>
              </Link>

              {/* Logout */}
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors"
                title="Log Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 text-sm font-semibold text-black bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-full shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          {user && (
            <Link
              to="/notifications"
              className="relative p-2 rounded-lg bg-[#0D121F] text-gray-300 border border-white/[0.08]"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#0D121F] text-gray-300 hover:text-white border border-white/[0.08]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 rounded-2xl bg-[#080B14]/95 border border-white/[0.1] backdrop-blur-2xl space-y-3 transition-all animate-fadeIn">
          {user ? (
            <div className="flex flex-col gap-2">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/[0.06] flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-cyan-400" /> Dashboard
              </Link>
              <Link
                to="/recommendations"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/[0.06] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" /> AI Match
              </Link>
              <Link
                to="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/[0.06] flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-cyan-400" /> Smart Search
              </Link>
              <Link
                to="/feed"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/[0.06] flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-cyan-400" /> Personal Feed
              </Link>
              <Link
                to="/registrations"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/[0.06] flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-cyan-400" /> Registrations
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/[0.06] flex items-center gap-2"
              >
                <User className="w-4 h-4 text-cyan-400" /> Profile ({user.fullName || user.email})
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                  navigate('/');
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleNavScroll('discover')}
                className="text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/[0.06]"
              >
                Discover
              </button>
              <button
                onClick={() => handleNavScroll('eligibility')}
                className="text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/[0.06]"
              >
                Eligibility Engine
              </button>
              <button
                onClick={() => handleNavScroll('features')}
                className="text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/[0.06]"
              >
                AI Features
              </button>
              <button
                onClick={() => handleNavScroll('how-it-works')}
                className="text-left px-3 py-2 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/[0.06]"
              >
                How It Works
              </button>
              <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-medium text-white bg-white/[0.06] hover:bg-white/[0.1] rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl shadow-lg"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

