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
        department: 'Computer Science & Engineering',
        skills: 'React, Java, Python, Spring Boot, MySQL',
        interests: 'Hackathons, Web Dev, AI/ML, Cloud Computing',
        location: 'Chennai',
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
