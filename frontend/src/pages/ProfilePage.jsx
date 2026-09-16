import React, { useState, useEffect } from 'react';
import { studentService } from '../services/studentService';
import { Sparkles, Save, User, Building, MapPin, Briefcase, Code, CheckCircle2 } from 'lucide-react';

export const ProfilePage = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    department: '',
    skills: '',
    interests: '',
    location: '',
    careerGoals: '',
    previousActivities: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    studentService.getProfile().then(data => {
      setProfile(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    try {
      await studentService.updateProfile(profile);
      setSuccessMsg('Profile updated successfully! AI recommendation model resynchronized.');
    } catch (err) {
      alert('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-cyan-400 font-semibold text-sm">
        Loading Profile Data...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-3xl border border-gray-800 flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Matching Profile
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Student Profile Settings</h1>
          <p className="text-xs text-gray-400 mt-1">
            Keep your skills, interests, and career goals updated to maximize recommendation accuracy.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> {successMsg}
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="glass-card p-6 lg:p-8 rounded-3xl border border-gray-800 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName || ''}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">Email Address (Read-only)</label>
            <input
              type="email"
              disabled
              value={profile.email || ''}
              className="w-full bg-gray-950 border border-gray-900 rounded-xl px-4 py-3 text-xs text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">Department</label>
            <select
              name="department"
              value={profile.department || ''}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics & Communication">Electronics & Communication</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">Target Location</label>
            <input
              type="text"
              name="location"
              value={profile.location || ''}
              onChange={handleChange}
              placeholder="Chennai, Bengaluru, Remote"
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-2">Technical Skills (Comma-separated)</label>
          <textarea
            name="skills"
            rows="2"
            value={profile.skills || ''}
            onChange={handleChange}
            placeholder="React, Java, Python, Spring Boot, MySQL, OpenAI API"
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-2">Areas of Interest (Comma-separated)</label>
          <textarea
            name="interests"
            rows="2"
            value={profile.interests || ''}
            onChange={handleChange}
            placeholder="Hackathons, Web Dev, AI/ML, Cloud Computing, Internships"
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-2">Career Goals & Milestones</label>
          <input
            type="text"
            name="careerGoals"
            value={profile.careerGoals || ''}
            onChange={handleChange}
            placeholder="Become a Senior Full-Stack AI Engineer at a top tech company"
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-2">Previous Activities & Achievements</label>
          <textarea
            name="previousActivities"
            rows="3"
            value={profile.previousActivities || ''}
            onChange={handleChange}
            placeholder="Participated in Smart India Hackathon 2024, Winner of DataVision Hackathon, Built AI search assistant"
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving Profile...' : 'Save & Sync AI Model'}
        </button>
      </form>
    </div>
  );
};
