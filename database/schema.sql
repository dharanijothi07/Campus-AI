-- AI-Powered Student Opportunity Ecosystem Database Schema
-- Compatible with MySQL 8.0+ / MariaDB / H2

CREATE DATABASE IF NOT EXISTS opportunity_hub;
USE opportunity_hub;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'STUDENT', -- ROLE_STUDENT, ROLE_ORGANIZER, ROLE_ADMIN
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_email (email),
    INDEX idx_user_role (role)
);

-- 2. Student Profiles Table
CREATE TABLE IF NOT EXISTS student_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    skills TEXT NOT NULL, -- Comma-separated list: React, Java, Python, AI/ML
    interests TEXT NOT NULL, -- Comma-separated: Hackathons, Web Dev, Data Science
    location VARCHAR(100) NOT NULL,
    career_goals TEXT NOT NULL,
    previous_activities TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_student_department (department),
    INDEX idx_student_location (location)
);

-- 3. Organizers Table
CREATE TABLE IF NOT EXISTS organizers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    organization_name VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    credibility_score DOUBLE DEFAULT 85.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Event Categories Table
CREATE TABLE IF NOT EXISTS event_categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE, -- Hackathon, Workshop, Internship, Competition
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Events Table
CREATE TABLE IF NOT EXISTS events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    organizer_id BIGINT NOT NULL,
    category_id BIGINT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_name VARCHAR(100) NOT NULL, -- Hackathon, Workshop, Internship, Competition
    location VARCHAR(100) NOT NULL,
    department_target VARCHAR(100) DEFAULT 'All Departments',
    event_date TIMESTAMP NOT NULL,
    deadline TIMESTAMP NOT NULL,
    eligibility TEXT NOT NULL,
    skills_required TEXT NOT NULL,
    registration_link VARCHAR(500) NOT NULL,
    organizer_name VARCHAR(255),
    location_mode VARCHAR(50) DEFAULT 'OFFLINE', -- ONLINE, OFFLINE, HYBRID
    image_url VARCHAR(1000),
    approval_status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
    is_approved BOOLEAN DEFAULT FALSE,
    quality_score DOUBLE DEFAULT 80.0,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES event_categories(id) ON DELETE SET NULL,
    INDEX idx_event_category (category_name),
    INDEX idx_event_location (location),
    INDEX idx_event_deadline (deadline)
);

-- 6. Registrations Table
CREATE TABLE IF NOT EXISTS registrations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    event_id BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'REGISTERED', -- REGISTERED, CANCELLED, COMPLETED
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    UNIQUE KEY uk_student_event (student_id, event_id),
    INDEX idx_registration_student (student_id),
    INDEX idx_registration_event (event_id)
);

-- 7. User Activity Table
CREATE TABLE IF NOT EXISTS user_activity (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    event_id BIGINT,
    action_type VARCHAR(100) NOT NULL, -- VIEW, REGISTER, SEARCH, BOOKMARK
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE SET NULL
);

-- 8. Recommendations Table
CREATE TABLE IF NOT EXISTS recommendations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    event_id BIGINT NOT NULL,
    match_percentage DOUBLE NOT NULL,
    match_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    INDEX idx_recommendation_student (student_id)
);

-- 9. Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'INFO', -- EVENT_ALERT, DEADLINE, RECOMMENDATION
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_notification_user (user_id),
    INDEX idx_notification_unread (user_id, is_read)
);

-- 10. Event Verification Table
CREATE TABLE IF NOT EXISTS event_verification (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_id BIGINT NOT NULL UNIQUE,
    is_duplicate BOOLEAN DEFAULT FALSE,
    is_suspicious BOOLEAN DEFAULT FALSE,
    missing_info BOOLEAN DEFAULT FALSE,
    quality_score DOUBLE DEFAULT 85.0,
    credibility_score DOUBLE DEFAULT 90.0,
    verification_summary TEXT,
    status VARCHAR(50) DEFAULT 'VERIFIED', -- VERIFIED, FLAGGED, PENDING
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- 11. Chatbot History Table
CREATE TABLE IF NOT EXISTS chatbot_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    user_query TEXT NOT NULL,
    bot_response TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
