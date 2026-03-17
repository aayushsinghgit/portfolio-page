import React, { useEffect, lazy, Suspense } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { initSmoothScroll, initScrollAnimations } from './utils/animations';

// Components
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import AnoAI from './components/ui/animated-shader-background';

// Lazy load components
const Hero = lazy(() => import('./pages/Hero'));
const About = lazy(() => import('./pages/About'));
const Brands = lazy(() => import('./pages/Brands'));
const Skills = lazy(() => import('./pages/Skills'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const Footer = lazy(() => import('./pages/Footer'));
const BottomNav = lazy(() => import('./components/BottomNav'));
const Chatbot = lazy(() => import('./components/Chatbot'));

function App() {
  useEffect(() => {
    const lenis = initSmoothScroll();
    initScrollAnimations();
    return () => lenis?.destroy();
  }, []);

  return (
    <LanguageProvider>
      <div className="App">
        <AnoAI />
        <ScrollProgress />
        <Navbar />
        
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <Chatbot />
          <main>
            <Hero />
            <About />
            <Brands />
            <Skills />
            <Certifications />
            <Portfolio />
            <Contact />
          </main>
          <Footer />
          <BottomNav />
        </Suspense>
      </div>
    </LanguageProvider>
  );
}

export default App;