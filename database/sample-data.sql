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

-- Insert Sample Events (Marked as PENDING for Admin review and approval)
INSERT INTO events (id, organizer_id, category_id, title, organizer_name, description, category_name, location, location_mode, department_target, event_date, deadline, eligibility, skills_required, registration_link, image_url, approval_status, is_approved, quality_score, is_verified) VALUES
(1, 3, 1, 'Smart India Hackathon 2026 - Hardware & Software Edition', 'Ministry of Education & AICTE', 'Nationwide open innovation model bringing college students to solve nation-building challenges across 150+ real-world problem statements with a 36-hour non-stop Grand Finale.', 'Hackathon', 'New Delhi / Nodal Centers Across India', 'HYBRID', 'Computer Science & Engineering', '2026-12-15 09:00:00', '2026-10-15 23:59:59', 'Bona fide undergraduate and postgraduate engineering students across India in teams of 6 with mandatory female representation.', 'IoT, Embedded Systems, Python, React, AI, Cloud Computing, Mobile Apps', 'https://sih.gov.in', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800', 'PENDING', FALSE, 97.0, TRUE),

(2, 3, 1, 'NASA International Space Apps Challenge 2026', 'National Aeronautics and Space Administration (NASA)', 'The world''s largest annual global hackathon where technologists, scientists, designers, and students tackle real-world challenges on Earth and in space using NASA''s open data.', 'Hackathon', 'Global / Universal Virtual & Local In-Person', 'HYBRID', 'All Departments', '2026-11-14 09:00:00', '2026-11-14 23:59:59', 'Open to all students, coders, scientists, and makers worldwide. Teams of 1 to 6 members.', 'Python, Data Science, Satellite Imagery, GIS, AI/ML, Astrophysics, Web Dev', 'https://www.spaceappschallenge.org', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800', 'PENDING', FALSE, 98.0, TRUE),

(3, 3, 4, 'Microsoft Imagine Cup 2026 - Global Student AI Competition', 'Microsoft Corporation', 'Global tech championship empowering student founders and developers to build transformative AI applications using Microsoft Azure and Azure AI Studio. Winner receives $100,000 USD and mentorship from Satya Nadella.', 'Competition', 'Global / Online', 'ONLINE', 'Computer Science & Engineering', '2026-11-25 10:00:00', '2026-11-15 23:59:59', 'Enrolled high school, college, or university students aged 18+ worldwide in teams of up to 4 members.', 'Microsoft Azure, OpenAI, Python, C#, Full Stack Development, Cloud Architecture', 'https://imaginecup.microsoft.com', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800', 'PENDING', FALSE, 96.0, TRUE),

(4, 3, 4, 'Google Solution Challenge 2026', 'Google Developer Groups (GDG) on Campus', 'Annual global competition inviting university students to develop solutions for one or more of the United Nations 17 Sustainable Development Goals using Google technologies like Gemini, Flutter, Firebase, and Google Cloud.', 'Competition', 'Global / Online', 'ONLINE', 'Computer Science & Engineering', '2026-11-30 10:00:00', '2026-11-10 23:59:59', 'Enrolled undergraduate or graduate university students aged 18+ affiliated with or joining a GDG on Campus.', 'Flutter, Firebase, Google Cloud, Gemini API, Android, Python, Web Dev', 'https://developers.google.com/community/gdsc-solution-challenge', 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800', 'PENDING', FALSE, 95.0, TRUE),

(5, 3, 4, 'ICPC India Regional Contests 2026 (Chennai & Kanpur Regionals)', 'International Collegiate Programming Contest (ICPC) Foundation', 'The premier global collegiate competitive programming championship. Teams of three students solve complex algorithmic, graph-theoretic, and mathematical problems within a strict 5-hour time window.', 'Competition', 'Chennai & Kanpur Onsite Sites', 'OFFLINE', 'Computer Science & Engineering', '2026-12-11 09:00:00', '2026-10-25 23:59:59', 'Bona fide undergraduate and postgraduate college students under 24 years old enrolled at recognized Indian universities in teams of 3 with a faculty coach.', 'C++, Java, Python, Advanced Data Structures, Graph Theory, Dynamic Programming', 'https://icpc.global', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800', 'PENDING', FALSE, 99.0, TRUE),

(6, 3, 2, 'MLH Global Hack Week: Open Source & Builders 2026', 'Major League Hacking (MLH)', 'Week-long global virtual festival celebrating open-source development, practical software engineering, beginner workshops, API integrations, and community building on Discord.', 'Workshop', 'Virtual (Discord & Twitch)', 'ONLINE', 'All Departments', '2026-10-09 18:00:00', '2026-10-09 23:59:59', 'Free and open to all students, high schoolers, and beginners worldwide regardless of experience.', 'Git, GitHub, Open Source, JavaScript, Python, REST APIs, Documentation', 'https://ghw.mlh.io', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800', 'PENDING', FALSE, 91.0, TRUE),

(7, 3, 3, 'Linux Foundation LFX Mentorship - Winter & Spring Terms 2026', 'The Linux Foundation & CNCF', 'Full-time and part-time remote paid open-source internship program. Selected student mentees work directly with maintainers on critical cloud-native, Linux kernel, Kubernetes, and RISC-V projects with a stipend.', 'Internship', 'Remote / Worldwide', 'ONLINE', 'Computer Science & Engineering', '2026-12-01 09:00:00', '2026-11-05 23:59:59', 'Open-source contributors, student developers, and university engineers worldwide aged 18+.', 'Go, Rust, C, Linux Kernel, Kubernetes, Docker, Microservices, Open Source', 'https://mentorship.lfx.linuxfoundation.org', 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800', 'PENDING', FALSE, 96.0, TRUE),

(8, 3, 3, 'GitHub Octernships - Global Student Software Engineering Internships', 'GitHub Education', 'Paid software engineering internship program pairing verified GitHub Global Campus students with partner companies worldwide to work on real-world production codebases and developer tools.', 'Internship', 'Remote / Global', 'ONLINE', 'Computer Science & Engineering', '2026-11-15 09:00:00', '2026-10-31 23:59:59', 'Verified students enrolled in accredited institutions on GitHub Global Campus aged 18+ with active GitHub profiles.', 'Git, React, Node.js, Python, TypeScript, CI/CD, Automated Testing', 'https://education.github.com/globalcampus/octernships', 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800', 'PENDING', FALSE, 97.0, TRUE),

(9, 3, 1, 'ETHGlobal Mumbai 2026', 'ETHGlobal & Devfolio', 'Premier Web3 and decentralized application hackathon bringing together global blockchain developers, smart contract engineers, and university students to build on Ethereum and Layer-2 rollups.', 'Hackathon', 'Mumbai, Maharashtra', 'OFFLINE', 'Information Technology', '2026-11-05 09:00:00', '2026-10-25 23:59:59', 'Open to student developers, smart contract engineers, and Web3 enthusiasts globally. Individual and team tracks.', 'Solidity, Ethereum, Web3.js, React, TypeScript, Smart Contracts, Cryptography', 'https://ethglobal.com/events/mumbai2026', 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800', 'PENDING', FALSE, 93.0, TRUE),

(10, 3, 2, 'Microsoft Student Ambassadors Program 2026-2027', 'Microsoft Learn', 'Global community program for student tech leaders. Members gain access to Azure credits, Microsoft 365, Copilot tools, LinkedIn Learning, direct mentorship from Microsoft engineers, and technical leadership workshops.', 'Workshop', 'Global / Virtual & On-Campus', 'HYBRID', 'Computer Science & Engineering', '2026-10-20 10:00:00', '2026-10-15 23:59:59', 'Full-time enrolled undergraduate and postgraduate students aged 18+ with an Azure for Students account.', 'Azure, Technical Community Leadership, AI/ML, Cloud Computing, Public Speaking', 'https://studentambassadors.com', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', 'PENDING', FALSE, 94.0, TRUE),

(11, 3, 4, 'Tata Imagination Challenge 2026 - National Student Idea Pitch', 'Tata Sons & Tata Group', 'Flagship national idea pitching challenge for Indian college students. Participants propose solutions across technology, social impact, and sustainability with cash awards, executive mentorship, and interview fast-tracks.', 'Competition', 'Virtual & Mumbai (Tata Headquarters)', 'HYBRID', 'All Departments', '2026-11-17 09:00:00', '2026-10-20 23:59:59', 'Full-time undergraduate and postgraduate students from recognized colleges and universities across India.', 'Product Strategy, Technology Innovation, Pitching, Business Analytics, Sustainability', 'https://www.tata.com', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800', 'PENDING', FALSE, 92.0, TRUE),

(12, 3, 2, 'AWS Generative AI & Cloud Developer Workshop Series', 'Amazon Web Services (AWS) Training & Certification', 'Intensive developer-focused workshop covering foundation models, Amazon Bedrock, LangChain, vector databases, and serverless architectures on AWS for student engineers.', 'Workshop', 'Online Interactive Classroom', 'ONLINE', 'Computer Science & Engineering', '2026-11-08 14:00:00', '2026-11-07 23:59:59', 'Open to all computer science, data science, and engineering students with basic programming knowledge.', 'AWS, Amazon Bedrock, Python, Generative AI, Cloud Architecture, Serverless', 'https://explore.skillbuilder.aws', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800', 'PENDING', FALSE, 95.0, TRUE);

-- Insert Event Verifications
INSERT INTO event_verification (id, event_id, is_duplicate, is_suspicious, missing_info, quality_score, credibility_score, verification_summary, status) VALUES
(1, 1, FALSE, FALSE, FALSE, 97.0, 99.0, 'Verified by AI Audit: Official Ministry of Education & AICTE portal link. Status: PENDING review by Admin.', 'PENDING_REVIEW'),
(2, 2, FALSE, FALSE, FALSE, 98.0, 99.0, 'Verified NASA Space Apps Challenge domain. Status: PENDING review by Admin.', 'PENDING_REVIEW'),
(3, 3, FALSE, FALSE, FALSE, 96.0, 98.0, 'Official Microsoft competition portal verified. Status: PENDING review by Admin.', 'PENDING_REVIEW'),
(4, 4, FALSE, FALSE, FALSE, 95.0, 97.0, 'Verified Google Developer Groups global competition. Status: PENDING review by Admin.', 'PENDING_REVIEW'),
(5, 5, FALSE, FALSE, FALSE, 99.0, 99.0, 'Official ICPC Foundation regional contest verified. Status: PENDING review by Admin.', 'PENDING_REVIEW'),
(6, 6, FALSE, FALSE, FALSE, 91.0, 95.0, 'Official Major League Hacking festival verified. Status: PENDING review by Admin.', 'PENDING_REVIEW'),
(7, 7, FALSE, FALSE, FALSE, 96.0, 98.0, 'Official Linux Foundation internship portal verified. Status: PENDING review by Admin.', 'PENDING_REVIEW'),
(8, 8, FALSE, FALSE, FALSE, 97.0, 99.0, 'Official GitHub Education student internship verified. Status: PENDING review by Admin.', 'PENDING_REVIEW'),
(9, 9, FALSE, FALSE, FALSE, 93.0, 96.0, 'Official ETHGlobal Web3 hackathon verified. Status: PENDING review by Admin.', 'PENDING_REVIEW'),
(10, 10, FALSE, FALSE, FALSE, 94.0, 97.0, 'Official Microsoft Student Ambassadors program verified. Status: PENDING review by Admin.', 'PENDING_REVIEW'),
(11, 11, FALSE, FALSE, FALSE, 92.0, 96.0, 'Official Tata Group national idea challenge verified. Status: PENDING review by Admin.', 'PENDING_REVIEW'),
(12, 12, FALSE, FALSE, FALSE, 95.0, 98.0, 'Official AWS Training & Certification workshop verified. Status: PENDING review by Admin.', 'PENDING_REVIEW');

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
