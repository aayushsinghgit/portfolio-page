import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { initSmoothScroll, initScrollAnimations } from './utils/animations';

// Components
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import AnoAI from './components/ui/animated-shader-background';

// Lazy load components
const Hero = lazy(() => import('./pages/Hero'));
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Brands = lazy(() => import('./pages/Brands'));
const Skills = lazy(() => import('./pages/Skills'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Blog = lazy(() => import('./components/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const Footer = lazy(() => import('./pages/Footer'));
const BottomNav = lazy(() => import('./components/BottomNav'));
const Chatbot = lazy(() => import('./components/Chatbot'));

// New Blog Pages
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const MainPortfolio = () => (
  <>
    <Hero />
    <About />
    <Experience />
    <Brands />
    <Skills />
    <Certifications />
    <Portfolio />
    <Testimonials />
    <Blog />
    <Contact />
  </>
);

function App() {
  useEffect(() => {
    const lenis = initSmoothScroll();
    initScrollAnimations();
    
    // Theme initialization
    const theme = localStorage.getItem('theme') || 'dark';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    return () => lenis?.destroy();
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="App transition-colors duration-300">
          <AnoAI />
          <ScrollProgress />
          <Navbar />
          
          <Suspense fallback={<div className="min-h-screen bg-white dark:bg-black" />}>
            <Chatbot />
            <main>
              <Routes>
                <Route path="/" element={<MainPortfolio />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPost />} />
              </Routes>
            </main>
            <Footer />
            <BottomNav />
          </Suspense>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;