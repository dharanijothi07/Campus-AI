-- Sample Data Seed for AI-Powered Student Opportunity Ecosystem
USE opportunity_hub;

-- Password for all sample users: password123 (BCrypt hash)
-- $2a$10$7R0Zq.mZg/8p4U8xW7E34e2kX1oP5/bA0sC2nZ3aX4bC5dE6fG7hI

-- Insert Categories
INSERT INTO event_categories (id, name, description) VALUES
(1, 'Hackathon', 'Intensive 24-48 hour coding and innovation challenges'),
(2, 'Workshop', 'Hands-on learning sessions led by domain experts'),
(3, 'Internship', 'Practical career opportunities for undergraduate and postgraduate students'),
(4, 'Competition', 'Skill-based competitive events, algorithms, and project showcases');

-- Insert Sample Users
-- ID 1: Student (Rahul Sharma)
-- ID 2: Student (Priya Patel)
-- ID 3: Organizer (TechCorp Innovations / Admin)
INSERT INTO users (id, email, password, full_name, role, created_at) VALUES
(1, 'student@example.com', '$2a$10$E2bn.f7z8w40q/NlY.eB0.O0J1u9z2P2C2A2B2C2D2E2F2G2H2I2K', 'Rahul Sharma', 'STUDENT', NOW()),
(2, 'priya@example.com', '$2a$10$E2bn.f7z8w40q/NlY.eB0.O0J1u9z2P2C2A2B2C2D2E2F2G2H2I2K', 'Priya Patel', 'STUDENT', NOW()),
(3, 'organizer@example.com', '$2a$10$E2bn.f7z8w40q/NlY.eB0.O0J1u9z2P2C2A2B2C2D2E2F2G2H2I2K', 'TechCorp Organizer', 'ORGANIZER', NOW());

-- Insert Student Profiles
INSERT INTO student_profiles (id, user_id, department, skills, interests, location, career_goals, previous_activities) VALUES
(1, 1, 'Computer Science & Engineering', 'React, Java, Python, Spring Boot, MySQL', 'Hackathons, Web Dev, AI/ML, Cloud Computing', 'Chennai', 'Become a Senior Full-Stack AI Engineer', 'Participated in Smart India Hackathon 2024, Built E-commerce app'),
(2, 2, 'Information Technology', 'Python, Data Science, PyTorch, SQL', 'AI/ML, Data Science, Internships, Competitions', 'Bengaluru', 'Machine Learning Research Scientist', 'Winner of DataVision 2024, Published paper on NLP');

-- Insert Organizer Profile
INSERT INTO organizers (id, user_id, organization_name, website, credibility_score) VALUES
(1, 3, 'National Tech Innovation Council', 'https://techcouncil.org', 96.5);

-- Insert Sample Events
INSERT INTO events (id, organizer_id, category_id, title, description, category_name, location, department_target, event_date, deadline, eligibility, skills_required, registration_link, quality_score, is_verified) VALUES
(1, 3, 1, 'AI Horizon National Hackathon 2026', 'Build cutting-edge generative AI applications, intelligent search engines, and multi-agent platforms in a 36-hour continuous hackathon. Generous prize pool of $10,000.', 'Hackathon', 'Chennai', 'Computer Science & Engineering', '2026-10-15 09:00:00', '2026-10-10 23:59:59', 'Open to all CSE/IT engineering students (UG & PG)', 'React, Python, Java, OpenAI API, Cloud', 'https://ai-horizon-2026.devpost.com', 95.0, TRUE),

(2, 3, 2, 'Deep Dive into Spring Boot & Microservices', 'Master microservice architecture, JWT security, Docker deployment, and reactive programming with Spring Boot 3. Hands-on coding exercises included.', 'Workshop', 'Chennai', 'Computer Science & Engineering', '2026-10-01 10:00:00', '2026-09-28 23:59:59', 'CSE, IT, ECE engineering undergraduates', 'Java, Spring Boot, REST APIs, SQL', 'https://workshops.techcouncil.org/springboot', 91.0, TRUE),

(3, 3, 3, 'AI & Software Engineering Internships 2026', '6-month paid software developer internship at TechCorp Innovations. Work on production LLMs, cloud infrastructure, and React frontends.', 'Internship', 'Bengaluru', 'Computer Science & Engineering', '2026-11-01 09:00:00', '2026-10-20 23:59:59', '3rd and 4th year CSE/IT/ECE students with min 7.5 CGPA', 'Java, React, SQL, Git, Problem Solving', 'https://techcorp.careers/internships-2026', 98.0, TRUE),

(4, 3, 4, 'CodeSprint Algorithmic Championship', 'Showcase your competitive programming and data structure expertise. Top performers get direct interview referrals to leading tech companies.', 'Competition', 'Remote', 'All Departments', '2026-10-05 14:00:00', '2026-10-04 23:59:59', 'All engineering and science students worldwide', 'C++, Java, Python, Data Structures & Algorithms', 'https://codesprint.io/contest-2026', 89.0, TRUE),

(5, 3, 1, 'Quantum & Edge AI Challenge', 'Explore edge AI model deployment on embedded devices and IoT platforms. Build low-latency smart IoT solutions.', 'Hackathon', 'Bengaluru', 'Information Technology', '2026-11-12 09:00:00', '2026-11-05 23:59:59', 'Open to all IT, ECE, CSE students', 'Python, PyTorch, C++, Embedded Systems', 'https://edge-ai-hack.org', 93.0, TRUE);

-- Insert Event Verifications
INSERT INTO event_verification (id, event_id, is_duplicate, is_suspicious, missing_info, quality_score, credibility_score, verification_summary, status) VALUES
(1, 1, FALSE, FALSE, FALSE, 95.0, 98.0, 'Verified by AI Audit. Clear deadline, verified organizer domain, complete eligibility criteria.', 'VERIFIED'),
(2, 2, FALSE, FALSE, FALSE, 91.0, 95.0, 'Verified workshop syllabus and host credentials.', 'VERIFIED'),
(3, 3, FALSE, FALSE, FALSE, 98.0, 99.0, 'Official company internship portal link verified. High stipend transparency.', 'VERIFIED'),
(4, 4, FALSE, FALSE, FALSE, 89.0, 92.0, 'Established competition platform with transparent evaluation criteria.', 'VERIFIED'),
(5, 5, FALSE, FALSE, FALSE, 93.0, 96.0, 'Verified partner university sponsorship and technical guidelines.', 'VERIFIED');

-- Insert Initial Recommendations for Rahul (Student ID 1)
INSERT INTO recommendations (student_id, event_id, match_percentage, match_reason, created_at) VALUES
(1, 1, 95.5, '95% match based on your interests in AI/ML, Hackathons, React/Java skills, and location in Chennai.', NOW()),
(1, 2, 92.0, '92% match based on your Spring Boot and Java skills and target career goal as a Full-Stack Engineer.', NOW()),
(1, 3, 88.5, '88% match for software engineering internship located in South India matching your skill stack.', NOW());

-- Insert Notifications for Rahul (Student ID 1)
INSERT INTO notifications (id, user_id, title, message, type, is_read, created_at) VALUES
(1, 1, '🎯 New 95% AI Match Found!', 'AI Horizon National Hackathon 2026 matches your CSE department, React & Java skills, and Chennai location.', 'RECOMMENDATION', FALSE, NOW()),
(2, 1, '⏰ Upcoming Deadline Alert', 'Registration deadline for Deep Dive into Spring Boot Workshop is in 10 days.', 'DEADLINE', FALSE, NOW()),
(3, 1, '🚀 Internship Opening', 'TechCorp AI & Software Engineering Internship applications are now live!', 'EVENT_ALERT', TRUE, NOW());

-- Insert Registration
INSERT INTO registrations (id, student_id, event_id, status, registered_at) VALUES
(1, 1, 2, 'REGISTERED', NOW());
