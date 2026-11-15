import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import MyArtwork from './pages/MyArtwork';
import AIArtStory from './pages/AIArtStory';
import CataloguePage from './pages/CataloguePage';
import PortfolioPage from './pages/PortfolioPage';
import HeritageArchivePage from './pages/HeritageArchivePage';
import SettingsPage from './pages/SettingsPage';
import HelpSupportPage from './pages/HelpSupportPage';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { LanguageProvider } from './i18n';
import { AuthProvider } from './context/AuthContext';

// Placeholder page component for unbuilt sections
function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-beige border border-beige-dark/50 flex items-center justify-center mb-4 shadow-card">
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#9D4935" strokeWidth="1.5" strokeLinecap="round">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M9 12h6M12 9v6" />
        </svg>
      </div>
      <h2 className="font-serif text-xl text-brown font-semibold mb-2">{title}</h2>
      <p className="font-sans text-brown/50 text-sm max-w-xs leading-relaxed">
        This section is coming soon. We're building something beautiful for you.
      </p>
      <div className="mt-6 flex items-center gap-2 text-ochre/60 text-xs font-sans">
        <span className="w-8 h-px bg-ochre/40" />
        Under Construction
        <span className="w-8 h-px bg-ochre/40" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<AuthPage defaultMode="signin" />} />
            <Route path="/register" element={<AuthPage defaultMode="signup" />} />
            <Route path="/signup" element={<AuthPage defaultMode="signup" />} />
            <Route path="/forgot-password" element={<AuthPage defaultMode="forgot" />} />
            <Route path="/forgot" element={<AuthPage defaultMode="forgot" />} />

            {/* Protected Workspace Layout & Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/artwork" element={<MyArtwork />} />
              <Route path="/artwork/upload" element={<MyArtwork />} />
              <Route path="/artstory" element={<AIArtStory />} />
              <Route path="/artstory/create" element={<AIArtStory />} />
              <Route path="/catalogue" element={<CataloguePage />} />
              <Route path="/catalogue/create" element={<CataloguePage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/profile" element={<PortfolioPage />} />
              <Route path="/heritage" element={<HeritageArchivePage />} />
              <Route path="/settings" element={<SettingsPage initialTab="profile" />} />
              <Route path="/help" element={<HelpSupportPage />} />
              <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
