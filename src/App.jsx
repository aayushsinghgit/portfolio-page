import React, { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { initSmoothScroll, initScrollAnimations } from './utils/animations';

// Components
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import ScrollProgress from './components/ScrollProgress';

// Pages
import Hero from './pages/Hero';
import About from './pages/About';
import Brands from './pages/Brands';
import Skills from './pages/Skills';
import Certifications from './pages/Certifications';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Footer from './pages/Footer';

function App() {
  useEffect(() => {
    // Initialize smooth scroll
    const lenis = initSmoothScroll();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="App">
        <ScrollProgress />
        <Navbar />
        
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
      </div>
    </LanguageProvider>
  );
}

export default App;