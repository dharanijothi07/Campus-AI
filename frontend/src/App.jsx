import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { ProtectedRoute } from './components/ProtectedRoute';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { SearchPage } from './pages/SearchPage';
import { EventDetailsPage } from './pages/EventDetailsPage';
import { FeedPage } from './pages/FeedPage';
import { MyRegistrationsPage } from './pages/MyRegistrationsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { OrganizerDashboardPage } from './pages/OrganizerDashboardPage';
import { CreateEventPage } from './pages/CreateEventPage';
import { AdminAddEventPage } from './pages/AdminAddEventPage';
import { AdminEventsPage } from './pages/AdminEventsPage';

export function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
            <div>
              <Navbar />
              <main className="pb-16">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />

                  <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                  <Route path="/recommendations" element={<ProtectedRoute><RecommendationsPage /></ProtectedRoute>} />
                  <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
                  <Route path="/events/:id" element={<ProtectedRoute><EventDetailsPage /></ProtectedRoute>} />
                  <Route path="/feed" element={<ProtectedRoute><FeedPage /></ProtectedRoute>} />
                  <Route path="/registrations" element={<ProtectedRoute><MyRegistrationsPage /></ProtectedRoute>} />
                  <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

                  <Route path="/organizer" element={<ProtectedRoute requiredRole="ORGANIZER"><OrganizerDashboardPage /></ProtectedRoute>} />
                  <Route path="/organizer/create" element={<ProtectedRoute requiredRole="ORGANIZER"><CreateEventPage /></ProtectedRoute>} />

                  <Route path="/admin/events" element={<ProtectedRoute requiredRole="ADMIN"><AdminEventsPage /></ProtectedRoute>} />
                  <Route path="/admin/add-event" element={<ProtectedRoute requiredRole="ADMIN"><AdminAddEventPage /></ProtectedRoute>} />
                  <Route path="/admin/edit-event/:id" element={<ProtectedRoute requiredRole="ADMIN"><AdminAddEventPage /></ProtectedRoute>} />
                </Routes>
              </main>
            </div>

            <Chatbot />
            <Footer />
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
