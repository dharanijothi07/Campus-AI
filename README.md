# AI-Powered Student Opportunity Ecosystem (AI-Opportunity-Hub)

![AI Opportunity Hub Banner](https://img.shields.io/badge/Platform-AI--Powered%20Student%20Ecosystem-00F2FE?style=for-the-badge)
![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot%203.2-green?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React.js%2018-blue?style=for-the-badge)
![MySQL](https://img.shields.io/badge/Database-MySQL%208.0-orange?style=for-the-badge)
![Vercel Ready](https://img.shields.io/badge/Vercel-Compatible-000000?style=for-the-badge)

An intelligent, full-stack college event platform designed to scale student participation to **1 million users**. Provides personalized event recommendations, smart natural-language search, automated credibility verification, AI chatbot assistance, and organizer content generation.

---

## 1. Project Overview

College event discovery is often fragmented across multiple channels, resulting in missed hackathon deadlines, low student engagement, and exposure to suspicious or low-quality events. **AI-Opportunity-Hub** bridges this gap by unifying hackathons, workshops, internships, and competitions into a single AI-driven ecosystem.

### Core Value Proposition
- **Multi-Vector Personalization**: Recommends events matching student skills, department, location, and long-term career goals.
- **Natural-Language Smart Search**: Converts queries like *"Find AI hackathons for CSE students in Chennai this month"* into instant search parameters.
- **Automated AI Audit**: Detects duplicate, suspicious, and low-quality events while generating Quality Scores (0-100%).
- **Interactive AI Chatbot**: Real-time event queries, eligibility verification, and deadline assistance.
- **Organizer AI Suite**: Generates promotional copy, social media teasers, and descriptions in one click.

---

## 2. Key Features

1. **Landing Page**: Project introduction, featured live events, statistics counter, and quick CTA buttons.
2. **Student Registration/Login**: Role-based access (`STUDENT`, `ORGANIZER`, `ADMIN`) with JWT security and BCrypt password hashing.
3. **Student Dashboard**: Personalized feed, recommended hackathons, workshops, internships, competitions, and deadline tickers.
4. **Student Profile**: Complete profile management for skills, interests, department, location, and career goals.
5. **AI Recommendation Engine**: Calculates exact match percentages (e.g. 95% Match) using interest, skill, department, and location vectors.
6. **Smart Natural Language Search**: Extract category, location, target department, and keywords from plain English search queries.
7. **Event Details Page**: Eligibility criteria, required skills, deadline countdown, quality score gauges, and direct registration triggers.
8. **24/7 AI Chatbot Assistant**: Real-time interactive widget answering event questions, eligibility, and platform help.
9. **Personalized Feed**: Stream of opportunities tailored to profile changes and student activity logs.
10. **Smart Notifications**: Instant alerts for high-matching events, registration deadlines, and opportunity updates.
11. **My Registrations**: Track registered hackathons and application status.
12. **Organizer HQ**: Event creation, editing, AI description generation, and social media copy creation.
13. **AI Event Verification**: Audits duplicate titles, suspicious keyword patterns, missing info, and calculates Credibility Scores.

---

## 3. Technology Stack

- **Frontend**: React.js 18, Vite, Lucide React, Axios, Tailwind CSS / Custom Glassmorphism CSS. Pre-configured with `vercel.json` for zero-error Vercel deployments.
- **Backend**: Java 17+, Spring Boot 3.2, Spring Security, JWT (JSON Web Tokens), Spring Data JPA, REST APIs, Maven.
- **Database**: MySQL 8.0+ / MariaDB (production) & H2 (instant embedded dev runtime).
- **AI Integration**: Gemini API or OpenAI API via environment variables with deterministic smart NLP fallback engine.
- **API Testing**: Postman collection compatible.

---

## 4. Exact Folder Structure

```
AI-Opportunity-Hub/
│
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── EventCard.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   ├── SmartNotification.jsx
│   │   │   ├── VerificationBadge.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── RecommendationsPage.jsx
│   │   │   ├── SearchPage.jsx
│   │   │   ├── EventDetailsPage.jsx
│   │   │   ├── FeedPage.jsx
│   │   │   ├── MyRegistrationsPage.jsx
│   │   │   ├── NotificationsPage.jsx
│   │   │   ├── OrganizerDashboardPage.jsx
│   │   │   └── CreateEventPage.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── eventService.js
│   │   │   ├── aiService.js
│   │   │   └── studentService.js
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── NotificationContext.jsx
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── README.md
│
├── backend/
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/
│           │   └── com/
│           │       └── opportunity/
│           │           └── hub/
│           │               ├── config/
│           │               │   ├── SecurityConfig.java
│           │               │   ├── CorsConfig.java
│           │               │   └── RestTemplateConfig.java
│           │               ├── controller/
│           │               │   ├── AuthController.java
│           │               │   ├── StudentController.java
│           │               │   ├── EventController.java
│           │               │   ├── RecommendationController.java
│           │               │   ├── SearchController.java
│           │               │   ├── ChatbotController.java
│           │               │   ├── VerificationController.java
│           │               │   ├── AIContentController.java
│           │               │   ├── RegistrationController.java
│           │               │   └── NotificationController.java
│           │               ├── dto/
│           │               ├── model/
│           │               ├── repository/
│           │               ├── security/
│           │               ├── service/
│           │               └── OpportunityHubApplication.java
│           └── resources/
│               └── application.properties
│
├── database/
│   ├── schema.sql
│   └── sample-data.sql
│
├── README.md
└── .gitignore
```

---

## 5. MySQL Setup & Database Creation

1. Start your local MySQL server on port `3306`.
2. Login to MySQL client:
   ```bash
   mysql -u root -p
   ```
3. Run the schema creation script:
   ```sql
   SOURCE database/schema.sql;
   ```
4. Seed the sample dataset:
   ```sql
   SOURCE database/sample-data.sql;
   ```

---

## 6. AI API Key & Environment Variables Setup

Configure the following environment variables (in system PATH or `application.properties`):

| Variable Name | Description | Default |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API Key | *(Optional, fallback active)* |
| `OPENAI_API_KEY` | OpenAI API Key | *(Optional, fallback active)* |
| `SPRING_DATASOURCE_URL` | MySQL Connection URL | `jdbc:mysql://localhost:3306/opportunity_hub` |
| `SPRING_DATASOURCE_USERNAME` | MySQL Username | `root` |
| `SPRING_DATASOURCE_PASSWORD` | MySQL Password | `password` |
| `JWT_SECRET` | 256-bit signing key for JWT | `9a8f7e6d5c4b3a210987...` |

---

## 7. How to Run the Backend (Spring Boot)

Navigating to the `backend` directory and run with Maven:

```bash
cd backend
mvn clean spring-boot:run
```
*The server will start on `http://localhost:8080`.*

---

## 8. How to Run the Frontend (React.js)

Navigate to the `frontend` directory:

```bash
cd frontend
npm install
npm run dev
```
*The React app will launch on `http://localhost:3000`.*

---

## 9. Vercel Deployment Instructions

1. Push code to GitHub repository.
2. Import `frontend` folder into Vercel.
3. Configure Environment Variables in Vercel settings:
   `VITE_API_BASE_URL=https://your-backend-api-domain.com/api`
4. Click **Deploy**. The included `vercel.json` rewrites guarantee zero SPA 404 errors!

---

## 10. REST API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Student/Organizer Registration
- `POST /api/auth/login` - User Login & JWT Issuance

### Student Profile
- `GET /api/students/profile` - Fetch current student profile
- `PUT /api/students/profile` - Update skills, interests, department

### Events & Verification
- `GET /api/events` - Get all opportunities
- `GET /api/events/{id}` - Get event details
- `POST /api/events` - Create new event (Organizer)
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event
- `POST /api/events/{id}/verify` - AI Event Credibility Audit

### AI Services & Search
- `GET /api/recommendations` - Get AI matched events
- `POST /api/search` - Smart natural language search
- `POST /api/chatbot` - Query AI Chatbot
- `POST /api/ai/generate-description` - Auto-generate description
- `POST /api/ai/generate-promotion` - Auto-generate promotional copy

### Registrations & Notifications
- `POST /api/registrations` - Register for an event
- `GET /api/registrations/my` - Fetch registered events
- `GET /api/notifications` - Fetch smart notifications

---

## 11. Sample Login Credentials

| Role | Email | Password |
|---|---|---|
| **Student** | `student@example.com` | `password123` |
| **Student 2** | `priya@example.com` | `password123` |
| **Organizer** | `organizer@example.com` | `password123` |

---

## 12. Postman Testing Instructions

1. Import backend endpoints into Postman.
2. Call `POST http://localhost:8080/api/auth/login` with:
   ```json
   {
     "email": "student@example.com",
     "password": "password123"
   }
   ```
3. Copy the returned `token`.
4. For protected endpoints, set Header `Authorization: Bearer <your_token>`.

---

## 13. GitHub Push Instructions

```bash
git init
git add .
git commit -m "Initial commit: AI Student Opportunity Ecosystem full-stack project"
git branch -M main
git remote add origin https://github.com/your-username/AI-Opportunity-Hub.git
git push -u origin main
```
