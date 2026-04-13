import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import ContactPage from './pages/ContactPage';
import BookPage from './pages/BookPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ZuzanaManovaPage from './pages/ZuzanaManovaPage';
const App: React.FC = () => {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <div className="App flex min-h-screen flex-col">
            <Header />
            <main className="main-content flex-1 pt-20">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tours" element={<ToursPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/book" element={<BookPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/zuzana-manova" element={<ZuzanaManovaPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
};

export default App;