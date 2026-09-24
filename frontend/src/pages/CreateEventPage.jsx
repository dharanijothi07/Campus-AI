import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { eventService } from '../services/eventService';
import { aiService } from '../services/aiService';
import { Sparkles, Plus, ArrowLeft, Wand2, ShieldCheck } from 'lucide-react';

export const CreateEventPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryName: 'Hackathon',
    location: 'Chennai',
    departmentTarget: 'Computer Science & Engineering',
    eventDate: '2026-10-25T09:00',
    deadline: '2026-10-20T23:59',
    eligibility: 'Open to all CSE, IT, and ECE engineering students',
    skillsRequired: 'React, Java, Python, Spring Boot',
    registrationLink: 'https://campusai.dev/register'
  });

  const [generatingDesc, setGeneratingDesc] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerateAiDescription = async () => {
    if (!formData.title) {
      alert('Please enter an event title first!');
      return;
    }
    setGeneratingDesc(true);
    try {
      const res = await aiService.generateDescription({
        title: formData.title,
        categoryName: formData.categoryName,
        keyTopics: formData.skillsRequired,
        targetAudience: formData.departmentTarget
      });
      setFormData(prev => ({ ...prev, description: res.generatedContent }));
    } catch (err) {
      alert('AI generation failed.');
    } finally {
      setGeneratingDesc(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await eventService.createEvent(formData);
      navigate('/organizer');
    } catch (err) {
      alert('Failed to publish event.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <Link to="/organizer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-cyan-400 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Organizer HQ
      </Link>

      <div className="glass-card p-6 lg:p-8 rounded-3xl border border-gray-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">AI Event Studio</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Publish New Opportunity</h1>
          </div>
          <button
            type="button"
            onClick={handleGenerateAiDescription}
            disabled={generatingDesc}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-purple-500/20 flex items-center gap-1.5 transition-all"
          >
            <Wand2 className="w-4 h-4" /> {generatingDesc ? 'Writing Description...' : 'Generate Description with AI'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Event Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. AI Horizon National Hackathon 2026"
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Category</label>
              <select
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Hackathon">Hackathon</option>
                <option value="Workshop">Workshop</option>
                <option value="Internship">Internship</option>
                <option value="Competition">Competition</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Target Department</label>
              <input
                type="text"
                name="departmentTarget"
                value={formData.departmentTarget}
                onChange={handleChange}
                placeholder="Computer Science & Engineering"
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Chennai / Bengaluru / Remote"
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Registration Deadline</label>
              <input
                type="datetime-local"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Detailed Description</label>
            <textarea
              name="description"
              rows="4"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Full event details, schedule, prizes, mentorship..."
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Eligibility Criteria</label>
            <input
              type="text"
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              placeholder="Open to all CSE, IT, and ECE engineering undergraduates"
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Required Skills (Comma-separated)</label>
            <input
              type="text"
              name="skillsRequired"
              value={formData.skillsRequired}
              onChange={handleChange}
              placeholder="React, Java, Python, Spring Boot, MySQL"
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Registration Portal Link</label>
            <input
              type="url"
              name="registrationLink"
              value={formData.registrationLink}
              onChange={handleChange}
              placeholder="https://campusai.dev/register"
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl shadow-purple-500/25 flex items-center justify-center gap-2 transition-all mt-4"
          >
            {submitting ? 'Auditing & Publishing...' : 'Audit with AI & Publish Event'} <ShieldCheck className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
