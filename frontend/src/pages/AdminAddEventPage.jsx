import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { eventService } from '../services/eventService';
import {
  Sparkles,
  ArrowLeft,
  Calendar,
  MapPin,
  Building,
  Tag,
  Link2,
  Image as ImageIcon,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Globe
} from 'lucide-react';

export const AdminAddEventPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    organizerName: '',
    description: '',
    categoryName: 'Hackathon',
    eventDate: '',
    location: '',
    locationMode: 'ONLINE', // ONLINE, OFFLINE, HYBRID
    eligibility: '',
    deadline: '',
    registrationLink: '',
    imageUrl: '',
    approvalStatus: 'PENDING',
    isApproved: false
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'isApproved') {
      setFormData(prev => ({
        ...prev,
        isApproved: checked,
        approvalStatus: checked ? 'APPROVED' : 'PENDING'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Validations
    if (!formData.title.trim()) {
      setErrorMessage('Event Name is required.');
      return;
    }
    if (!formData.organizerName.trim()) {
      setErrorMessage('Organizer Name is required.');
      return;
    }
    if (!formData.description.trim()) {
      setErrorMessage('Description is required.');
      return;
    }
    if (!formData.eventDate) {
      setErrorMessage('Event Date is required.');
      return;
    }
    if (!formData.deadline) {
      setErrorMessage('Registration Deadline is required.');
      return;
    }
    if (!formData.registrationLink.trim()) {
      setErrorMessage('Official Registration URL is required.');
      return;
    }

    setSubmitting(true);
    try {
      await eventService.createAdminEvent(formData);
      setSuccessMessage('Genuine event added successfully!');
      setTimeout(() => {
        navigate('/admin/events');
      }, 1200);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message || 'Failed to add event.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Admin Events
        </Link>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Admin Control
          </span>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="glass-card p-6 lg:p-8 rounded-3xl border border-gray-800 space-y-6">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Official Event Publishing</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Add Genuine Upcoming Event
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Enter official, verified event information collected from public organizer portals. Only approved events are presented to students.
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Event Name */}
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-cyan-400" /> Event Name *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Smart India Hackathon 2026 / Google Girl Hackathon"
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* 2. Organizer */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-purple-400" /> Organizer *
              </label>
              <input
                type="text"
                name="organizerName"
                required
                value={formData.organizerName}
                onChange={handleChange}
                placeholder="e.g. Ministry of Education / Google / IIT Madras"
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* 4. Category */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Category *</label>
              <select
                name="categoryName"
                value={formData.categoryName}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
              >
                <option value="Hackathon">Hackathon</option>
                <option value="Workshop">Workshop</option>
                <option value="Internship">Internship</option>
                <option value="Competition">Competition</option>
                <option value="Webinar">Webinar / Conference</option>
              </select>
            </div>

            {/* 5. Event Date */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-400" /> Event Date & Time *
              </label>
              <input
                type="datetime-local"
                name="eventDate"
                required
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* 9. Registration Deadline */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Registration Deadline *
              </label>
              <input
                type="datetime-local"
                name="deadline"
                required
                value={formData.deadline}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* 7. Online/Offline Mode */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" /> Mode (Online / Offline) *
              </label>
              <select
                name="locationMode"
                value={formData.locationMode}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
              >
                <option value="ONLINE">Online / Virtual</option>
                <option value="OFFLINE">Offline / On-Campus</option>
                <option value="HYBRID">Hybrid</option>
              </select>
            </div>

            {/* 6. Location */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" /> Venue / City Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Remote / Bengaluru / New Delhi / Chennai"
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          {/* 3. Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Detailed Description *</label>
            <textarea
              name="description"
              rows="4"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide complete official details: event overview, problem statements, timeline, rewards/prizes, schedule..."
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* 8. Eligibility */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Eligibility Criteria</label>
            <input
              type="text"
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              placeholder="e.g. All enrolled college undergraduates and postgraduates across India"
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* 10. Official Registration URL */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-cyan-400" /> Official Registration URL *
            </label>
            <input
              type="url"
              name="registrationLink"
              required
              value={formData.registrationLink}
              onChange={handleChange}
              placeholder="https://official-event-portal.com/register"
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* 11. Event Image URL */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5 text-purple-400" /> Event Banner / Poster Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/... or official poster link"
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />

            {/* Live Image Preview */}
            {formData.imageUrl && (
              <div className="mt-3 p-3 rounded-2xl bg-gray-900 border border-gray-800 max-w-sm">
                <span className="text-[10px] font-semibold text-gray-400 block mb-1.5">Live Banner Preview</span>
                <div className="w-full h-36 rounded-xl overflow-hidden bg-gray-950 flex items-center justify-center">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Approved Status Checkbox */}
          <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Event Approval Status</span>
              <span className="text-[11px] text-gray-400 block">
                {formData.isApproved
                  ? 'Active: This event will immediately appear on student dashboards and discovery feeds.'
                  : 'Pending / Draft: This event will only be visible in the Admin management panel.'}
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="isApproved"
                checked={formData.isApproved}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-sm shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all"
          >
            {submitting ? 'Saving Event to Database...' : 'Save & Publish Genuine Event'}{' '}
            <ShieldCheck className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

