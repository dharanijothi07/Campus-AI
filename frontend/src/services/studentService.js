import api from './api';

export const studentService = {
  getProfile: async () => {
    try {
      const res = await api.get('/students/profile');
      return res.data;
    } catch (e) {
      return {
        id: 1,
        userId: 1,
        fullName: 'Rahul Sharma',
        email: 'student@example.com',
        college: 'Anna University',
        yearOfStudy: '3rd Year',
        cgpa: 8.4,
        department: 'Computer Science & Engineering',
        skills: 'React, Java, Python, Spring Boot, MySQL',
        technicalSkills: 'React, Java, Python, Spring Boot, MySQL, Git',
        interests: 'Hackathons, Web Dev, AI/ML, Cloud Computing',
        technicalInterests: 'AI/ML, Web Development, Cloud Computing, Hackathons',
        nonTechnicalInterests: 'Problem Solving, Team Leadership',
        location: 'Chennai',
        careerGoal: 'Become a Senior Full-Stack AI Engineer',
        careerGoals: 'Become a Senior Full-Stack AI Engineer',
        previousActivities: 'Participated in Smart India Hackathon 2024'
      };
    }
  },

  updateProfile: async (profileData) => {
    try {
      const res = await api.put('/students/profile', profileData);
      return res.data;
    } catch (e) {
      return profileData;
    }
  }
};
