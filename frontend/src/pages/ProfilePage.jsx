import React, { useState, useEffect } from 'react';
import { studentService } from '../services/studentService';
import { Sparkles, Save, User, Building, MapPin, Briefcase, Code, CheckCircle2, GraduationCap, Award, Compass, Heart } from 'lucide-react';

export const ProfilePage = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    college: '',
    yearOfStudy: 3,
    cgpa: 8.0,
    department: 'Computer Science & Engineering',
    skills: '',
    technicalSkills: '',
    interests: '',
    technicalInterests: '',
    nonTechnicalInterests: '',
    location: '',
    careerGoals: '',
    previousActivities: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    studentService.getProfile().then(data => {
      if (data) {
        setProfile({
          fullName: data.fullName || '',
          email: data.email || '',
          college: data.college || 'Anna University',
          yearOfStudy: data.yearOfStudy != null ? Number(data.yearOfStudy) : 3,
          cgpa: data.cgpa != null ? Number(data.cgpa) : 8.0,
          department: data.department || 'Computer Science & Engineering',
          skills: data.skills || '',
          technicalSkills: data.technicalSkills || data.skills || '',
          interests: data.interests || '',
          technicalInterests: data.technicalInterests || data.interests || '',
          nonTechnicalInterests: data.nonTechnicalInterests || '',
          location: data.location || '',
          careerGoals: data.careerGoals || data.careerGoal || '',
          previousActivities: data.previousActivities || ''
        });
      }
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let val = value;
    if (name === 'yearOfStudy') {
      val = parseInt(value, 10) || 1;
    } else if (name === 'cgpa') {
      val = parseFloat(value) || 0.0;
    }
    setProfile(prev => ({
      ...prev,
      [name]: val,
      // Keep legacy fields in sync
      ...(name === 'technicalSkills' ? { skills: val } : {}),
      ...(name === 'technicalInterests' ? { interests: val } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    try {
      const payload = {
        ...profile,
        yearOfStudy: Number(profile.yearOfStudy),
        cgpa: Number(profile.cgpa),
        skills: profile.technicalSkills || profile.skills,
        interests: profile.technicalInterests || profile.interests
      };
      await studentService.updateProfile(payload);
      setSuccessMsg('Profile updated successfully! AI Eligibility & Opportunity Matching has been re-evaluated.');
    } catch (err) {
      alert('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-cyan-400 font-semibold text-sm">
        Loading AI Student Profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-3xl border border-gray-800 flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI-Powered Eligibility Profile
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Student Eligibility & Matching Profile</h1>
          <p className="text-xs text-gray-400 mt-1">
            Keep your academic year, CGPA, skills, and interests updated. The AI Engine uses this data to compute your official eligibility and transparent Match % for every opportunity.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" /> {successMsg}
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="glass-card p-6 lg:p-8 rounded-3xl border border-gray-800 space-y-6">
        <div className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
          <GraduationCap className="w-4 h-4" /> Academic & Personal Details
        </div>

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

          {/* College / Institution */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-purple-400" /> College / University Name *
            </label>
            <input
              type="text"
              name="college"
              required
              value={profile.college || ''}
              onChange={handleChange}
              placeholder="e.g. Anna University, PES University, IIT Madras"
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2">Department / Degree *</label>
            <select
              name="department"
              value={profile.department || 'Computer Science & Engineering'}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="Computer Science & Engineering">Computer Science & Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics & Communication">Electronics & Communication</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Data Science & AI">Data Science & AI</option>
            </select>
          </div>

          {/* Year of Study */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-400" /> Current Year of Study *
            </label>
            <select
              name="yearOfStudy"
              value={profile.yearOfStudy || 3}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value={1}>1st Year (Freshman)</option>
              <option value={2}>2nd Year (Sophomore)</option>
              <option value={3}>3rd Year (Junior)</option>
              <option value={4}>4th Year (Senior / Final)</option>
            </select>
          </div>

          {/* CGPA */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Current CGPA (0.0 - 10.0) *
            </label>
            <input
              type="number"
              step="0.01"
              min="0.0"
              max="10.0"
              name="cgpa"
              required
              value={profile.cgpa != null ? profile.cgpa : 8.0}
              onChange={handleChange}
              placeholder="e.g. 8.4"
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Target Location */}
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Current / Preferred Location
            </label>
            <input
              type="text"
              name="location"
              value={profile.location || ''}
              onChange={handleChange}
              placeholder="e.g. Chennai, Bengaluru, Mumbai, Remote"
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800 text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
          <Code className="w-4 h-4" /> Skills, Interests & Career Aspirations
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5 text-cyan-400" /> Technical Skills (Comma-separated) *
          </label>
          <textarea
            name="technicalSkills"
            rows="2"
            value={profile.technicalSkills || ''}
            onChange={handleChange}
            placeholder="e.g. React, Java, Python, Spring Boot, MySQL, Git, Docker, C++"
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
          <span className="text-[10px] text-gray-500 mt-1 block">
            Used by the AI engine to evaluate Mandatory Skills and compute 35% of your event Match Score.
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-purple-400" /> Technical Interests (Comma-separated)
          </label>
          <textarea
            name="technicalInterests"
            rows="2"
            value={profile.technicalInterests || ''}
            onChange={handleChange}
            placeholder="e.g. AI/ML, Web Development, Cloud Computing, Hackathons, Cybersecurity"
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-400" /> Non-Technical Interests & Soft Skills (Comma-separated)
          </label>
          <input
            type="text"
            name="nonTechnicalInterests"
            value={profile.nonTechnicalInterests || ''}
            onChange={handleChange}
            placeholder="e.g. Public Speaking, Problem Solving, Product Design, Team Leadership"
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" /> Career Goal
          </label>
          <input
            type="text"
            name="careerGoals"
            value={profile.careerGoals || ''}
            onChange={handleChange}
            placeholder="e.g. Become a Senior Full-Stack AI Engineer / Cloud Architect"
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
            placeholder="e.g. Participated in Smart India Hackathon 2024, Winner of DataVision Hackathon, Built AI search assistant"
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Updating AI Profile...' : 'Save & Sync AI Eligibility Engine'}
        </button>
      </form>
    </div>
  );
};
