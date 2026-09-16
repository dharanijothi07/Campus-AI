import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { Sparkles, Bell, User, LogOut, Search, Compass, Award, Calendar, Layers, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 glass-nav border-b border-gray-800/80 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              Opportunity<span className="gradient-text">Hub</span>
            </span>
            <span className="text-[10px] text-cyan-400 font-semibold tracking-wider block uppercase -mt-1">
              AI Opportunity Ecosystem
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-gray-900/60 p-1.5 rounded-xl border border-gray-800">
          <Link
            to="/dashboard"
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
              isActive('/dashboard') ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <Compass className="w-4 h-4" />
            Dashboard
          </Link>

          <Link
            to="/recommendations"
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
              isActive('/recommendations') ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            AI Match
          </Link>

          <Link
            to="/search"
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
              isActive('/search') ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <Search className="w-4 h-4" />
            Smart Search
          </Link>

          <Link
            to="/feed"
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
              isActive('/feed') ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <Layers className="w-4 h-4" />
            Personal Feed
          </Link>

          <Link
            to="/registrations"
            className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
              isActive('/registrations') ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Registrations
          </Link>

          {user?.role === 'ORGANIZER' && (
            <Link
              to="/organizer"
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                isActive('/organizer') ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              Organizer HQ
            </Link>
          )}
        </div>

        {/* User / Actions Header */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Notification Button */}
              <Link
                to="/notifications"
                className="relative p-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 transition-colors"
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
                className="flex items-center gap-2 p-1.5 pl-3 pr-2 rounded-xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all"
              >
                <div className="text-right hidden sm:block">
                  <span className="block text-xs font-semibold text-white leading-none">
                    {user.fullName || user.email.split('@')[0]}
                  </span>
                  <span className="text-[10px] text-cyan-400 font-medium">
                    {user.role}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
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
            <div className="flex items-center gap-2.5">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4.5 py-2 text-sm font-semibold text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
