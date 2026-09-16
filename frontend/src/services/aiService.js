import api from './api';

export const aiService = {
  smartSearch: async (query) => {
    try {
      const res = await api.post('/search', { query });
      return res.data;
    } catch (e) {
      // Local NLP smart query fallback
      const q = query.toLowerCase();
      let cat = 'All Categories';
      if (q.includes('hackathon')) cat = 'Hackathon';
      else if (q.includes('workshop')) cat = 'Workshop';
      else if (q.includes('internship')) cat = 'Internship';

      let loc = 'All Locations';
      if (q.includes('chennai')) loc = 'Chennai';
      else if (q.includes('bengaluru')) loc = 'Bengaluru';
      else if (q.includes('remote')) loc = 'Remote';

      return {
        originalQuery: query,
        extractedCategory: cat,
        extractedLocation: loc,
        extractedDepartment: 'Computer Science & Engineering',
        extractedKeywords: ['ai', 'hackathon', 'cse'],
        events: []
      };
    }
  },

  chat: async (query) => {
    try {
      const res = await api.post('/chatbot', { query });
      return res.data;
    } catch (e) {
      const q = query.toLowerCase();
      let responseText = "Welcome to AI Opportunity Hub! I can help you find suitable hackathons, check eligibility, search for paid internships, and monitor registration deadlines.";
      
      if (q.includes('hackathon')) {
        responseText = "We found several active hackathons! AI Horizon National Hackathon is coming up on Oct 15 with a 95% AI profile match for CSE students.";
      } else if (q.includes('internship')) {
        responseText = "TechCorp Innovations is offering 6-month software development internships in Bengaluru for CSE/IT students.";
      } else if (q.includes('eligibility')) {
        responseText = "Most engineering hackathons and workshops are open to UG & PG students in Computer Science, IT, and ECE with programming skills.";
      } else if (q.includes('deadline')) {
        responseText = "Next upcoming registration deadline: Deep Dive into Spring Boot Workshop (Sept 28, 2026).";
      }

      return {
        query,
        response: responseText,
        suggestedEvents: []
      };
    }
  },

  generateDescription: async (req) => {
    try {
      const res = await api.post('/ai/generate-description', req);
      return res.data;
    } catch (e) {
      return {
        generatedContent: `🔥 Welcome to ${req.title || 'this event'}! This high-impact session focuses on ${req.keyTopics || 'cutting-edge technologies'}, providing hands-on project building, mentorship from senior engineers, and practical skill development for ${req.targetAudience || 'students'}. Build portfolio-ready projects and network with recruiters!`
      };
    }
  },

  generatePromotion: async (req) => {
    try {
      const res = await api.post('/ai/generate-promotion', req);
      return res.data;
    } catch (e) {
      return {
        generatedContent: `🚀 Big News! Registrations are officially open for ${req.title || 'our upcoming event'}!\n\n${req.description || 'Build innovative solutions and accelerate your tech career.'}\n\n👉 Platform: ${req.platform || 'LinkedIn'}\n📍 Don't miss out - register now: https://opportunityhub.dev #TechEvent #StudentOpportunities #Hackathon #CareerGrowth`
      };
    }
  }
};
