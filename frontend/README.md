# CAMPUS AI - Frontend (React.js)

The React.js single-page frontend application for the **CAMPUS AI - Student Opportunity Ecosystem**.

## Features
- Modern hackathon-level Dark Navy UI with glowing cyan/blue AI accents.
- Responsive mobile & desktop layout with frosted glass cards.
- Floating interactive AI Chatbot assistant.
- Smart Natural-Language search query bar with live parameter extraction chips.
- Event Credibility & Quality score gauges with verification badges.
- One-click AI content generator for event organizers.

## Setup & Running Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file or configure Vercel environment variables:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production / Vercel
```bash
npm run build
```
Pre-configured with `vercel.json` rewrites for zero-404 SPA routing.
