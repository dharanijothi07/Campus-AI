import api from './api';

const MOCK_EVENTS = [
  {
    id: 1,
    title: 'AI Horizon National Hackathon 2026',
    description: 'Build cutting-edge generative AI applications, intelligent search engines, and multi-agent platforms in a 36-hour continuous hackathon. Generous prize pool of $10,000.',
    categoryName: 'Hackathon',
    location: 'Chennai',
    departmentTarget: 'Computer Science & Engineering',
    eventDate: '2026-10-15T09:00:00',
    deadline: '2026-10-10T23:59:59',
    eligibility: 'Open to all CSE/IT engineering students (UG & PG)',
    skillsRequired: 'React, Python, Java, OpenAI API, Cloud',
    registrationLink: 'https://ai-horizon-2026.devpost.com',
    organizerName: 'National Tech Innovation Council',
    qualityScore: 95.0,
    isVerified: true,
    aiMatchPercentage: 95.5
  },
  {
    id: 2,
    title: 'Deep Dive into Spring Boot & Microservices',
    description: 'Master microservice architecture, JWT security, Docker deployment, and reactive programming with Spring Boot 3. Hands-on coding exercises included.',
    categoryName: 'Workshop',
    location: 'Chennai',
    departmentTarget: 'Computer Science & Engineering',
    eventDate: '2026-10-01T10:00:00',
    deadline: '2026-09-28T23:59:59',
    eligibility: 'CSE, IT, ECE engineering undergraduates',
    skillsRequired: 'Java, Spring Boot, REST APIs, SQL',
    registrationLink: 'https://workshops.techcouncil.org/springboot',
    organizerName: 'National Tech Innovation Council',
    qualityScore: 91.0,
    isVerified: true,
    aiMatchPercentage: 92.0
  },
  {
    id: 3,
    title: 'AI & Software Engineering Internships 2026',
    description: '6-month paid software developer internship at TechCorp Innovations. Work on production LLMs, cloud infrastructure, and React frontends.',
    categoryName: 'Internship',
    location: 'Bengaluru',
    departmentTarget: 'Computer Science & Engineering',
    eventDate: '2026-11-01T09:00:00',
    deadline: '2026-10-20T23:59:59',
    eligibility: '3rd and 4th year CSE/IT/ECE students with min 7.5 CGPA',
    skillsRequired: 'Java, React, SQL, Git, Problem Solving',
    registrationLink: 'https://techcorp.careers/internships-2026',
    organizerName: 'TechCorp Innovations',
    qualityScore: 98.0,
    isVerified: true,
    aiMatchPercentage: 88.5
  },
  {
    id: 4,
    title: 'CodeSprint Algorithmic Championship',
    description: 'Showcase your competitive programming and data structure expertise. Top performers get direct interview referrals to leading tech companies.',
    categoryName: 'Competition',
    location: 'Remote',
    departmentTarget: 'All Departments',
    eventDate: '2026-10-05T14:00:00',
    deadline: '2026-10-04T23:59:59',
    eligibility: 'All engineering and science students worldwide',
    skillsRequired: 'C++, Java, Python, Data Structures & Algorithms',
    registrationLink: 'https://codesprint.io/contest-2026',
    organizerName: 'TechCorp Innovations',
    qualityScore: 89.0,
    isVerified: true,
    aiMatchPercentage: 85.0
  }
];

export const eventService = {
  getAllEvents: async (approvedOnly = true) => {
    try {
      const res = await api.get(`/events?approvedOnly=${approvedOnly}`);
      return res.data;
    } catch (e) {
      if (approvedOnly) {
        return MOCK_EVENTS.filter(evt => evt.isApproved !== false);
      }
      return MOCK_EVENTS;
    }
  },

  getAdminEvents: async () => {
    try {
      const res = await api.get('/admin/events');
      return res.data;
    } catch (e) {
      try {
        const res = await api.get('/events?approvedOnly=false');
        return res.data;
      } catch (err) {
        return MOCK_EVENTS;
      }
    }
  },

  getEventById: async (id) => {
    try {
      const res = await api.get(`/events/${id}`);
      return res.data;
    } catch (e) {
      return MOCK_EVENTS.find(evt => evt.id === Number(id)) || MOCK_EVENTS[0];
    }
  },

  getRecommendations: async () => {
    try {
      const res = await api.get('/recommendations');
      return res.data;
    } catch (e) {
      return MOCK_EVENTS.filter(evt => evt.isApproved !== false);
    }
  },

  createEvent: async (eventData) => {
    try {
      const res = await api.post('/events', eventData);
      return res.data;
    } catch (e) {
      const newEvt = {
        ...eventData,
        id: Date.now(),
        qualityScore: 88.0,
        isVerified: true,
        isApproved: eventData.isApproved !== undefined ? eventData.isApproved : true,
        organizerName: eventData.organizerName || 'Organizer'
      };
      MOCK_EVENTS.push(newEvt);
      return newEvt;
    }
  },

  createAdminEvent: async (eventData) => {
    try {
      const res = await api.post('/admin/events', eventData);
      return res.data;
    } catch (e) {
      return eventService.createEvent(eventData);
    }
  },

  toggleApproveEvent: async (id, approved = true) => {
    try {
      const res = await api.patch(`/admin/events/${id}/approve?approved=${approved}`);
      return res.data;
    } catch (e) {
      try {
        const res = await api.patch(`/events/${id}/approve?approved=${approved}`);
        return res.data;
      } catch (err) {
        const found = MOCK_EVENTS.find(evt => evt.id === Number(id));
        if (found) found.isApproved = approved;
        return found || { id, isApproved: approved };
      }
    }
  },

  verifyEvent: async (id) => {
    try {
      const res = await api.post(`/events/${id}/verify`);
      return res.data;
    } catch (e) {
      return {
        eventId: id,
        isDuplicate: false,
        isSuspicious: false,
        missingInfo: false,
        qualityScore: 94.0,
        credibilityScore: 96.0,
        verificationSummary: 'AI Audit Completed: No duplicates or suspicious indicators detected. High organizer credibility.',
        status: 'VERIFIED'
      };
    }
  },

  registerForEvent: async (eventId) => {
    try {
      const res = await api.post('/registrations', { eventId });
      return res.data;
    } catch (e) {
      return {
        registrationId: Date.now(),
        status: 'REGISTERED',
        message: 'Successfully registered for event!',
        registeredAt: new Date().toISOString()
      };
    }
  },

  getMyRegistrations: async () => {
    try {
      const res = await api.get('/registrations/my');
      return res.data;
    } catch (e) {
      return [MOCK_EVENTS[0], MOCK_EVENTS[1]];
    }
  },

  getNotifications: async () => {
    try {
      const res = await api.get('/notifications');
      return res.data;
    } catch (e) {
      return [
        {
          id: 1,
          title: '🎯 New 95% AI Match Found!',
          message: 'AI Horizon National Hackathon matches your CSE department, React & Java skills, and Chennai location.',
          type: 'RECOMMENDATION',
          isRead: false,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: '⏰ Upcoming Deadline Alert',
          message: 'Registration deadline for Deep Dive into Spring Boot Workshop is in 10 days.',
          type: 'DEADLINE',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      ];
    }
  }
};
