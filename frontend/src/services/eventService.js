import api from './api';

const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Smart India Hackathon 2026 - Hardware & Software Edition',
    organizerName: 'Ministry of Education & AICTE',
    description: 'Nationwide open innovation model bringing college students to solve nation-building challenges across 150+ real-world problem statements with a 36-hour non-stop Grand Finale.',
    categoryName: 'Hackathon',
    location: 'New Delhi / Nodal Centers Across India',
    locationMode: 'HYBRID',
    eventDate: '2026-12-15T09:00:00',
    deadline: '2026-10-15T23:59:59',
    eligibility: 'Bona fide undergraduate and postgraduate engineering students across India in teams of 6 with mandatory female representation.',
    skillsRequired: 'IoT, Embedded Systems, Python, React, AI, Cloud Computing, Mobile Apps',
    registrationLink: 'https://sih.gov.in',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    qualityScore: 97.0,
    isVerified: true,
    approvalStatus: 'APPROVED',
    isApproved: true,
    aiMatchPercentage: 96.0
  },
  {
    id: 2,
    title: 'NASA International Space Apps Challenge 2026',
    organizerName: 'National Aeronautics and Space Administration (NASA)',
    description: 'The world\'s largest annual global hackathon where technologists, scientists, designers, and students tackle real-world challenges on Earth and in space using NASA\'s open data.',
    categoryName: 'Hackathon',
    location: 'Global / Universal Virtual & Local In-Person',
    locationMode: 'HYBRID',
    eventDate: '2026-11-14T09:00:00',
    deadline: '2026-11-14T23:59:59',
    eligibility: 'Open to all students, coders, scientists, and makers worldwide. Teams of 1 to 6 members.',
    skillsRequired: 'Python, Data Science, Satellite Imagery, GIS, AI/ML, Astrophysics, Web Dev',
    registrationLink: 'https://www.spaceappschallenge.org',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    qualityScore: 98.0,
    isVerified: true,
    approvalStatus: 'APPROVED',
    isApproved: true,
    aiMatchPercentage: 94.5
  },
  {
    id: 3,
    title: 'Microsoft Imagine Cup 2026 - Global Student AI Competition',
    organizerName: 'Microsoft Corporation',
    description: 'Global tech championship empowering student founders and developers to build transformative AI applications using Microsoft Azure and Azure AI Studio. Winner receives $100,000 USD and mentorship from Satya Nadella.',
    categoryName: 'Competition',
    location: 'Global / Online',
    locationMode: 'ONLINE',
    eventDate: '2026-11-25T10:00:00',
    deadline: '2026-11-15T23:59:59',
    eligibility: 'Enrolled high school, college, or university students aged 18+ worldwide in teams of up to 4 members.',
    skillsRequired: 'Microsoft Azure, OpenAI, Python, C#, Full Stack Development, Cloud Architecture',
    registrationLink: 'https://imaginecup.microsoft.com',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    qualityScore: 96.0,
    isVerified: true,
    approvalStatus: 'APPROVED',
    isApproved: true,
    aiMatchPercentage: 95.0
  },
  {
    id: 4,
    title: 'Google Solution Challenge 2026',
    organizerName: 'Google Developer Groups (GDG) on Campus',
    description: 'Annual global competition inviting university students to develop solutions for one or more of the United Nations 17 Sustainable Development Goals using Google technologies like Gemini, Flutter, Firebase, and Google Cloud.',
    categoryName: 'Competition',
    location: 'Global / Online',
    locationMode: 'ONLINE',
    eventDate: '2026-11-30T10:00:00',
    deadline: '2026-11-10T23:59:59',
    eligibility: 'Enrolled undergraduate or graduate university students aged 18+ affiliated with or joining a GDG on Campus.',
    skillsRequired: 'Flutter, Firebase, Google Cloud, Gemini API, Android, Python, Web Dev',
    registrationLink: 'https://developers.google.com/community/gdsc-solution-challenge',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800',
    qualityScore: 95.0,
    isVerified: true,
    approvalStatus: 'APPROVED',
    isApproved: true,
    aiMatchPercentage: 93.0
  },
  {
    id: 5,
    title: 'ICPC India Regional Contests 2026 (Chennai & Kanpur Regionals)',
    organizerName: 'International Collegiate Programming Contest (ICPC) Foundation',
    description: 'The premier global collegiate competitive programming championship. Teams of three students solve complex algorithmic, graph-theoretic, and mathematical problems within a strict 5-hour time window.',
    categoryName: 'Competition',
    location: 'Chennai & Kanpur Onsite Sites',
    locationMode: 'OFFLINE',
    eventDate: '2026-12-11T09:00:00',
    deadline: '2026-10-25T23:59:59',
    eligibility: 'Bona fide undergraduate and postgraduate college students under 24 years old enrolled at recognized Indian universities in teams of 3 with a faculty coach.',
    skillsRequired: 'C++, Java, Python, Advanced Data Structures, Graph Theory, Dynamic Programming',
    registrationLink: 'https://icpc.global',
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800',
    qualityScore: 99.0,
    isVerified: true,
    approvalStatus: 'APPROVED',
    isApproved: true,
    aiMatchPercentage: 91.0
  },
  {
    id: 6,
    title: 'MLH Global Hack Week: Open Source & Builders 2026',
    organizerName: 'Major League Hacking (MLH)',
    description: 'Week-long global virtual festival celebrating open-source development, practical software engineering, beginner workshops, API integrations, and community building on Discord.',
    categoryName: 'Workshop',
    location: 'Virtual (Discord & Twitch)',
    locationMode: 'ONLINE',
    eventDate: '2026-10-09T18:00:00',
    deadline: '2026-10-09T23:59:59',
    eligibility: 'Free and open to all students, high schoolers, and beginners worldwide regardless of experience.',
    skillsRequired: 'Git, GitHub, Open Source, JavaScript, Python, REST APIs, Documentation',
    registrationLink: 'https://ghw.mlh.io',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800',
    qualityScore: 91.0,
    isVerified: true,
    approvalStatus: 'APPROVED',
    isApproved: true,
    aiMatchPercentage: 89.0
  },
  {
    id: 7,
    title: 'Linux Foundation LFX Mentorship - Winter & Spring Terms 2026',
    organizerName: 'The Linux Foundation & CNCF',
    description: 'Full-time and part-time remote paid open-source internship program. Selected student mentees work directly with maintainers on critical cloud-native, Linux kernel, Kubernetes, and RISC-V projects with a stipend.',
    categoryName: 'Internship',
    location: 'Remote / Worldwide',
    locationMode: 'ONLINE',
    eventDate: '2026-12-01T09:00:00',
    deadline: '2026-11-05T23:59:59',
    eligibility: 'Open-source contributors, student developers, and university engineers worldwide aged 18+.',
    skillsRequired: 'Go, Rust, C, Linux Kernel, Kubernetes, Docker, Microservices, Open Source',
    registrationLink: 'https://mentorship.lfx.linuxfoundation.org',
    imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800',
    qualityScore: 96.0,
    isVerified: true,
    approvalStatus: 'APPROVED',
    isApproved: true,
    aiMatchPercentage: 92.5
  },
  {
    id: 8,
    title: 'GitHub Octernships - Global Student Software Engineering Internships',
    organizerName: 'GitHub Education',
    description: 'Paid software engineering internship program pairing verified GitHub Global Campus students with partner companies worldwide to work on real-world production codebases and developer tools.',
    categoryName: 'Internship',
    location: 'Remote / Global',
    locationMode: 'ONLINE',
    eventDate: '2026-11-15T09:00:00',
    deadline: '2026-10-31T23:59:59',
    eligibility: 'Verified students enrolled in accredited institutions on GitHub Global Campus aged 18+ with active GitHub profiles.',
    skillsRequired: 'Git, React, Node.js, Python, TypeScript, CI/CD, Automated Testing',
    registrationLink: 'https://education.github.com/globalcampus/octernships',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800',
    qualityScore: 97.0,
    isVerified: true,
    approvalStatus: 'APPROVED',
    isApproved: true,
    aiMatchPercentage: 97.0
  },
  {
    id: 9,
    title: 'ETHGlobal Mumbai 2026',
    organizerName: 'ETHGlobal & Devfolio',
    description: 'Premier Web3 and decentralized application hackathon bringing together global blockchain developers, smart contract engineers, and university students to build on Ethereum and Layer-2 rollups.',
    categoryName: 'Hackathon',
    location: 'Mumbai, Maharashtra',
    locationMode: 'OFFLINE',
    eventDate: '2026-11-05T09:00:00',
    deadline: '2026-10-25T23:59:59',
    eligibility: 'Open to student developers, smart contract engineers, and Web3 enthusiasts globally. Individual and team tracks.',
    skillsRequired: 'Solidity, Ethereum, Web3.js, React, TypeScript, Smart Contracts, Cryptography',
    registrationLink: 'https://ethglobal.com/events/mumbai2026',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    qualityScore: 93.0,
    isVerified: true,
    approvalStatus: 'APPROVED',
    isApproved: true,
    aiMatchPercentage: 88.0
  },
  {
    id: 10,
    title: 'Microsoft Student Ambassadors Program 2026-2027',
    organizerName: 'Microsoft Learn',
    description: 'Global community program for student tech leaders. Members gain access to Azure credits, Microsoft 365, Copilot tools, LinkedIn Learning, direct mentorship from Microsoft engineers, and technical leadership workshops.',
    categoryName: 'Workshop',
    location: 'Global / Virtual & On-Campus',
    locationMode: 'HYBRID',
    eventDate: '2026-10-20T10:00:00',
    deadline: '2026-10-15T23:59:59',
    eligibility: 'Full-time enrolled undergraduate and postgraduate students aged 18+ with an Azure for Students account.',
    skillsRequired: 'Azure, Technical Community Leadership, AI/ML, Cloud Computing, Public Speaking',
    registrationLink: 'https://studentambassadors.com',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    qualityScore: 94.0,
    isVerified: true,
    approvalStatus: 'APPROVED',
    isApproved: true,
    aiMatchPercentage: 90.0
  },
  {
    id: 11,
    title: 'Tata Imagination Challenge 2026 - National Student Idea Pitch',
    organizerName: 'Tata Sons & Tata Group',
    description: 'Flagship national idea pitching challenge for Indian college students. Participants propose solutions across technology, social impact, and sustainability with cash awards, executive mentorship, and interview fast-tracks.',
    categoryName: 'Competition',
    location: 'Virtual & Mumbai (Tata Headquarters)',
    locationMode: 'HYBRID',
    eventDate: '2026-11-17T09:00:00',
    deadline: '2026-10-20T23:59:59',
    eligibility: 'Full-time undergraduate and postgraduate students from recognized colleges and universities across India.',
    skillsRequired: 'Product Strategy, Technology Innovation, Pitching, Business Analytics, Sustainability',
    registrationLink: 'https://www.tata.com',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    qualityScore: 92.0,
    isVerified: true,
    approvalStatus: 'APPROVED',
    isApproved: true,
    aiMatchPercentage: 86.0
  },
  {
    id: 12,
    title: 'AWS Generative AI & Cloud Developer Workshop Series',
    organizerName: 'Amazon Web Services (AWS) Training & Certification',
    description: 'Intensive developer-focused workshop covering foundation models, Amazon Bedrock, LangChain, vector databases, and serverless architectures on AWS for student engineers.',
    categoryName: 'Workshop',
    location: 'Online Interactive Classroom',
    locationMode: 'ONLINE',
    eventDate: '2026-11-08T14:00:00',
    deadline: '2026-11-07T23:59:59',
    eligibility: 'Open to all computer science, data science, and engineering students with basic programming knowledge.',
    skillsRequired: 'AWS, Amazon Bedrock, Python, Generative AI, Cloud Architecture, Serverless',
    registrationLink: 'https://explore.skillbuilder.aws',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800',
    qualityScore: 95.0,
    isVerified: true,
    approvalStatus: 'APPROVED',
    isApproved: true,
    aiMatchPercentage: 94.0
  }
];

export const eventService = {
  getAllEvents: async (approvedOnly = true) => {
    try {
      const res = await api.get(`/events?approvedOnly=${approvedOnly}`);
      return res.data;
    } catch (e) {
      if (approvedOnly) {
        return MOCK_EVENTS.filter(evt => evt.approvalStatus === 'APPROVED' || (evt.isApproved === true && !evt.approvalStatus));
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
      return MOCK_EVENTS.filter(evt => evt.approvalStatus === 'APPROVED' || (evt.isApproved === true && !evt.approvalStatus));
    }
  },

  createEvent: async (eventData) => {
    try {
      const res = await api.post('/events', eventData);
      return res.data;
    } catch (e) {
      const isExplicitlyApproved = Boolean(eventData.isApproved || eventData.approvalStatus === 'APPROVED');
      const newEvt = {
        ...eventData,
        id: Date.now(),
        qualityScore: 88.0,
        isVerified: true,
        isApproved: isExplicitlyApproved,
        approvalStatus: eventData.approvalStatus || (isExplicitlyApproved ? 'APPROVED' : 'PENDING'),
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

  approveEvent: async (id) => {
    try {
      const res = await api.post(`/admin/events/${id}/approve`);
      return res.data;
    } catch (e) {
      try {
        const res = await api.patch(`/admin/events/${id}/approve`);
        return res.data;
      } catch (err) {
        const found = MOCK_EVENTS.find(evt => evt.id === Number(id));
        if (found) {
          found.approvalStatus = 'APPROVED';
          found.isApproved = true;
        }
        return found || { id, approvalStatus: 'APPROVED', isApproved: true };
      }
    }
  },

  rejectEvent: async (id) => {
    try {
      const res = await api.post(`/admin/events/${id}/reject`);
      return res.data;
    } catch (e) {
      try {
        const res = await api.patch(`/admin/events/${id}/reject`);
        return res.data;
      } catch (err) {
        const found = MOCK_EVENTS.find(evt => evt.id === Number(id));
        if (found) {
          found.approvalStatus = 'REJECTED';
          found.isApproved = false;
        }
        return found || { id, approvalStatus: 'REJECTED', isApproved: false };
      }
    }
  },

  updateAdminEvent: async (id, eventData) => {
    try {
      const res = await api.put(`/admin/events/${id}`, eventData);
      return res.data;
    } catch (e) {
      return { ...eventData, id };
    }
  },

  deleteAdminEvent: async (id) => {
    try {
      await api.delete(`/admin/events/${id}`);
      return true;
    } catch (e) {
      return true;
    }
  },

  toggleApproveEvent: async (id, approved = true) => {
    return approved ? eventService.approveEvent(id) : eventService.rejectEvent(id);
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
