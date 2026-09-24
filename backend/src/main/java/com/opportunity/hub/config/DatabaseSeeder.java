package com.opportunity.hub.config;

import com.opportunity.hub.model.Event;
import com.opportunity.hub.model.EventCategory;
import com.opportunity.hub.model.EventVerification;
import com.opportunity.hub.model.User;
import com.opportunity.hub.repository.EventCategoryRepository;
import com.opportunity.hub.repository.EventRepository;
import com.opportunity.hub.repository.EventVerificationRepository;
import com.opportunity.hub.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DatabaseSeeder.class);

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final EventCategoryRepository categoryRepository;
    private final EventVerificationRepository verificationRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(UserRepository userRepository,
                          EventRepository eventRepository,
                          EventCategoryRepository categoryRepository,
                          EventVerificationRepository verificationRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.categoryRepository = categoryRepository;
        this.verificationRepository = verificationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // 1. Ensure default Admin user exists
        User adminUser = userRepository.findByEmail("admin@campusai.dev").orElseGet(() -> {
            User admin = new User(
                    "admin@campusai.dev",
                    passwordEncoder.encode("adminPassword123!"),
                    "CampusAI Administrator",
                    "ADMIN"
            );
            log.info("Created default Admin user: admin@campusai.dev");
            return userRepository.save(admin);
        });

        // 2. Ensure standard categories exist
        EventCategory hackathonCat = getOrCreateCategory("Hackathon", "Intensive 24-48 hour coding and innovation challenges");
        EventCategory workshopCat = getOrCreateCategory("Workshop", "Hands-on learning sessions led by domain experts");
        EventCategory internshipCat = getOrCreateCategory("Internship", "Practical career opportunities for undergraduate and postgraduate students");
        EventCategory competitionCat = getOrCreateCategory("Competition", "Skill-based competitive events, algorithms, and project showcases");

        // 3. Seed or update initial genuine events (APPROVED for development/demo testing)
        log.info("Checking initial dataset of 12 genuine upcoming student opportunities...");

        List<EventSeedData> seeds = Arrays.asList(
                new EventSeedData(
                        "Smart India Hackathon 2026 - Hardware & Software Edition",
                        "Ministry of Education & AICTE",
                        "Nationwide open innovation model bringing college students to solve nation-building challenges across 150+ real-world problem statements with a 36-hour non-stop Grand Finale.",
                        hackathonCat,
                        "New Delhi / Nodal Centers Across India",
                        "HYBRID",
                        LocalDateTime.of(2026, 12, 15, 9, 0),
                        LocalDateTime.of(2026, 10, 15, 23, 59, 59),
                        "Bona fide undergraduate and postgraduate engineering students across India in teams of 6 with mandatory female representation.",
                        "IoT, Embedded Systems, Python, React, AI, Cloud Computing, Mobile Apps",
                        "https://sih.gov.in",
                        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800",
                        97.0
                ),
                new EventSeedData(
                        "NASA International Space Apps Challenge 2026",
                        "National Aeronautics and Space Administration (NASA)",
                        "The world's largest annual global hackathon where technologists, scientists, designers, and students tackle real-world challenges on Earth and in space using NASA's open data.",
                        hackathonCat,
                        "Global / Universal Virtual & Local In-Person",
                        "HYBRID",
                        LocalDateTime.of(2026, 11, 14, 9, 0),
                        LocalDateTime.of(2026, 11, 14, 23, 59, 59),
                        "Open to all students, coders, scientists, and makers worldwide. Teams of 1 to 6 members.",
                        "Python, Data Science, Satellite Imagery, GIS, AI/ML, Astrophysics, Web Dev",
                        "https://www.spaceappschallenge.org",
                        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
                        98.0
                ),
                new EventSeedData(
                        "Microsoft Imagine Cup 2026 - Global Student AI Competition",
                        "Microsoft Corporation",
                        "Global tech championship empowering student founders and developers to build transformative AI applications using Microsoft Azure and Azure AI Studio. Winner receives $100,000 USD and mentorship from Satya Nadella.",
                        competitionCat,
                        "Global / Online",
                        "ONLINE",
                        LocalDateTime.of(2026, 11, 25, 10, 0),
                        LocalDateTime.of(2026, 11, 15, 23, 59, 59),
                        "Enrolled high school, college, or university students aged 18+ worldwide in teams of up to 4 members.",
                        "Microsoft Azure, OpenAI, Python, C#, Full Stack Development, Cloud Architecture",
                        "https://imaginecup.microsoft.com",
                        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800",
                        96.0
                ),
                new EventSeedData(
                        "Google Solution Challenge 2026",
                        "Google Developer Groups (GDG) on Campus",
                        "Annual global competition inviting university students to develop solutions for one or more of the United Nations 17 Sustainable Development Goals using Google technologies like Gemini, Flutter, Firebase, and Google Cloud.",
                        competitionCat,
                        "Global / Online",
                        "ONLINE",
                        LocalDateTime.of(2026, 11, 30, 10, 0),
                        LocalDateTime.of(2026, 11, 10, 23, 59, 59),
                        "Enrolled undergraduate or graduate university students aged 18+ affiliated with or joining a GDG on Campus.",
                        "Flutter, Firebase, Google Cloud, Gemini API, Android, Python, Web Dev",
                        "https://developers.google.com/community/gdsc-solution-challenge",
                        "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800",
                        95.0
                ),
                new EventSeedData(
                        "ICPC India Regional Contests 2026 (Chennai & Kanpur Regionals)",
                        "International Collegiate Programming Contest (ICPC) Foundation",
                        "The premier global collegiate competitive programming championship. Teams of three students solve complex algorithmic, graph-theoretic, and mathematical problems within a strict 5-hour time window.",
                        competitionCat,
                        "Chennai & Kanpur Onsite Sites",
                        "OFFLINE",
                        LocalDateTime.of(2026, 12, 11, 9, 0),
                        LocalDateTime.of(2026, 10, 25, 23, 59, 59),
                        "Bona fide undergraduate and postgraduate college students under 24 years old enrolled at recognized Indian universities in teams of 3 with a faculty coach.",
                        "C++, Java, Python, Advanced Data Structures, Graph Theory, Dynamic Programming",
                        "https://icpc.global",
                        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800",
                        99.0
                ),
                new EventSeedData(
                        "MLH Global Hack Week: Open Source & Builders 2026",
                        "Major League Hacking (MLH)",
                        "Week-long global virtual festival celebrating open-source development, practical software engineering, beginner workshops, API integrations, and community building on Discord.",
                        workshopCat,
                        "Virtual (Discord & Twitch)",
                        "ONLINE",
                        LocalDateTime.of(2026, 10, 9, 18, 0),
                        LocalDateTime.of(2026, 10, 9, 23, 59, 59),
                        "Free and open to all students, high schoolers, and beginners worldwide regardless of experience.",
                        "Git, GitHub, Open Source, JavaScript, Python, REST APIs, Documentation",
                        "https://ghw.mlh.io",
                        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
                        91.0
                ),
                new EventSeedData(
                        "Linux Foundation LFX Mentorship - Winter & Spring Terms 2026",
                        "The Linux Foundation & CNCF",
                        "Full-time and part-time remote paid open-source internship program. Selected student mentees work directly with maintainers on critical cloud-native, Linux kernel, Kubernetes, and RISC-V projects with a stipend.",
                        internshipCat,
                        "Remote / Worldwide",
                        "ONLINE",
                        LocalDateTime.of(2026, 12, 1, 9, 0),
                        LocalDateTime.of(2026, 11, 5, 23, 59, 59),
                        "Open-source contributors, student developers, and university engineers worldwide aged 18+.",
                        "Go, Rust, C, Linux Kernel, Kubernetes, Docker, Microservices, Open Source",
                        "https://mentorship.lfx.linuxfoundation.org",
                        "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800",
                        96.0
                ),
                new EventSeedData(
                        "GitHub Octernships - Global Student Software Engineering Internships",
                        "GitHub Education",
                        "Paid software engineering internship program pairing verified GitHub Global Campus students with partner companies worldwide to work on real-world production codebases and developer tools.",
                        internshipCat,
                        "Remote / Global",
                        "ONLINE",
                        LocalDateTime.of(2026, 11, 15, 9, 0),
                        LocalDateTime.of(2026, 10, 31, 23, 59, 59),
                        "Verified students enrolled in accredited institutions on GitHub Global Campus aged 18+ with active GitHub profiles.",
                        "Git, React, Node.js, Python, TypeScript, CI/CD, Automated Testing",
                        "https://education.github.com/globalcampus/octernships",
                        "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800",
                        97.0
                ),
                new EventSeedData(
                        "ETHGlobal Mumbai 2026",
                        "ETHGlobal & Devfolio",
                        "Premier Web3 and decentralized application hackathon bringing together global blockchain developers, smart contract engineers, and university students to build on Ethereum and Layer-2 rollups.",
                        hackathonCat,
                        "Mumbai, Maharashtra",
                        "OFFLINE",
                        LocalDateTime.of(2026, 11, 5, 9, 0),
                        LocalDateTime.of(2026, 10, 25, 23, 59, 59),
                        "Open to student developers, smart contract engineers, and Web3 enthusiasts globally. Individual and team tracks.",
                        "Solidity, Ethereum, Web3.js, React, TypeScript, Smart Contracts, Cryptography",
                        "https://ethglobal.com/events/mumbai2026",
                        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
                        93.0
                ),
                new EventSeedData(
                        "Microsoft Student Ambassadors Program 2026-2027",
                        "Microsoft Learn",
                        "Global community program for student tech leaders. Members gain access to Azure credits, Microsoft 365, Copilot tools, LinkedIn Learning, direct mentorship from Microsoft engineers, and technical leadership workshops.",
                        workshopCat,
                        "Global / Virtual & On-Campus",
                        "HYBRID",
                        LocalDateTime.of(2026, 10, 20, 10, 0),
                        LocalDateTime.of(2026, 10, 15, 23, 59, 59),
                        "Full-time enrolled undergraduate and postgraduate students aged 18+ with an Azure for Students account.",
                        "Azure, Technical Community Leadership, AI/ML, Cloud Computing, Public Speaking",
                        "https://studentambassadors.com",
                        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
                        94.0
                ),
                new EventSeedData(
                        "Tata Imagination Challenge 2026 - National Student Idea Pitch",
                        "Tata Sons & Tata Group",
                        "Flagship national idea pitching challenge for Indian college students. Participants propose solutions across technology, social impact, and sustainability with cash awards, executive mentorship, and interview fast-tracks.",
                        competitionCat,
                        "Virtual & Mumbai (Tata Headquarters)",
                        "HYBRID",
                        LocalDateTime.of(2026, 11, 17, 9, 0),
                        LocalDateTime.of(2026, 10, 20, 23, 59, 59),
                        "Full-time undergraduate and postgraduate students from recognized colleges and universities across India.",
                        "Product Strategy, Technology Innovation, Pitching, Business Analytics, Sustainability",
                        "https://www.tata.com",
                        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
                        92.0
                ),
                new EventSeedData(
                        "AWS Generative AI & Cloud Developer Workshop Series",
                        "Amazon Web Services (AWS) Training & Certification",
                        "Intensive developer-focused workshop covering foundation models, Amazon Bedrock, LangChain, vector databases, and serverless architectures on AWS for student engineers.",
                        workshopCat,
                        "Online Interactive Classroom",
                        "ONLINE",
                        LocalDateTime.of(2026, 11, 8, 14, 0),
                        LocalDateTime.of(2026, 11, 7, 23, 59, 59),
                        "Open to all computer science, data science, and engineering students with basic programming knowledge.",
                        "AWS, Amazon Bedrock, Python, Generative AI, Cloud Architecture, Serverless",
                        "https://explore.skillbuilder.aws",
                        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
                        95.0
                )
        );

        int newlyCreated = 0;
        int updatedCount = 0;

        for (EventSeedData seed : seeds) {
            Optional<Event> existingOpt = eventRepository.findFirstByTitle(seed.title);
            if (existingOpt.isPresent()) {
                Event existing = existingOpt.get();
                boolean updated = false;

                // Requirement: Update the seeded 12 demo events so that they are APPROVED and visible to students
                if (!"APPROVED".equalsIgnoreCase(existing.getApprovalStatus())) {
                    existing.setApprovalStatus("APPROVED");
                    updated = true;
                }
                if (!Boolean.TRUE.equals(existing.getIsApproved())) {
                    existing.setIsApproved(true);
                    updated = true;
                }
                if (existing.getOrganizerName() == null && seed.organizerName != null) {
                    existing.setOrganizerName(seed.organizerName);
                    updated = true;
                }
                if (existing.getLocationMode() == null && seed.locationMode != null) {
                    existing.setLocationMode(seed.locationMode);
                    updated = true;
                }
                if (existing.getImageUrl() == null && seed.imageUrl != null) {
                    existing.setImageUrl(seed.imageUrl);
                    updated = true;
                }
                if (updated) {
                    eventRepository.save(existing);
                    updatedCount++;
                }

                // Ensure verification record is VERIFIED
                Optional<EventVerification> verOpt = verificationRepository.findByEventId(existing.getId());
                if (verOpt.isPresent()) {
                    EventVerification verification = verOpt.get();
                    if (!"VERIFIED".equalsIgnoreCase(verification.getStatus())) {
                        verification.setStatus("VERIFIED");
                        verification.setVerificationSummary("Imported from verified public organizer portal. Status: APPROVED for demo/testing.");
                        verificationRepository.save(verification);
                    }
                }
            } else {
                Event event = new Event();
                event.setOrganizer(adminUser);
                event.setCategory(seed.category);
                event.setCategoryName(seed.category.getName());
                event.setTitle(seed.title);
                event.setOrganizerName(seed.organizerName);
                event.setDescription(seed.description);
                event.setLocation(seed.location);
                event.setLocationMode(seed.locationMode);
                event.setEventDate(seed.eventDate);
                event.setDeadline(seed.deadline);
                event.setEligibility(seed.eligibility);
                event.setSkillsRequired(seed.skillsRequired);
                event.setRegistrationLink(seed.registrationLink);
                event.setImageUrl(seed.imageUrl);
                event.setDepartmentTarget("Computer Science & Engineering");
                // Requirement: Initial seeded demo events are APPROVED for development/demo testing
                event.setApprovalStatus("APPROVED");
                event.setIsApproved(true);
                event.setQualityScore(seed.qualityScore);
                event.setIsVerified(true);

                Event savedEvent = eventRepository.save(event);

                EventVerification verification = new EventVerification();
                verification.setEvent(savedEvent);
                verification.setIsDuplicate(false);
                verification.setIsSuspicious(false);
                verification.setMissingInfo(false);
                verification.setQualityScore(seed.qualityScore);
                verification.setCredibilityScore(95.0);
                verification.setVerificationSummary("Imported from verified public organizer portal. Status: APPROVED for demo/testing.");
                verification.setStatus("VERIFIED");
                verificationRepository.save(verification);

                newlyCreated++;
            }
        }

        log.info("DatabaseSeeder finished: {} new demo events seeded, {} existing demo events updated to APPROVED. Total checked: {}.",
                newlyCreated, updatedCount, seeds.size());
    }

    private EventCategory getOrCreateCategory(String name, String description) {
        return categoryRepository.findByNameIgnoreCase(name)
                .orElseGet(() -> categoryRepository.save(new EventCategory(name, description)));
    }

    private static class EventSeedData {
        String title;
        String organizerName;
        String description;
        EventCategory category;
        String location;
        String locationMode;
        LocalDateTime eventDate;
        LocalDateTime deadline;
        String eligibility;
        String skillsRequired;
        String registrationLink;
        String imageUrl;
        Double qualityScore;

        EventSeedData(String title, String organizerName, String description, EventCategory category,
                      String location, String locationMode, LocalDateTime eventDate, LocalDateTime deadline,
                      String eligibility, String skillsRequired, String registrationLink, String imageUrl,
                      Double qualityScore) {
            this.title = title;
            this.organizerName = organizerName;
            this.description = description;
            this.category = category;
            this.location = location;
            this.locationMode = locationMode;
            this.eventDate = eventDate;
            this.deadline = deadline;
            this.eligibility = eligibility;
            this.skillsRequired = skillsRequired;
            this.registrationLink = registrationLink;
            this.imageUrl = imageUrl;
            this.qualityScore = qualityScore;
        }
    }
}
