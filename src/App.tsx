import { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { motion, AnimatePresence } from 'motion/react';

// Sections & Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Achievements from './components/Achievements';
import TechSkillsPreview from './components/TechSkillsPreview';
import FeaturedProjects from './components/FeaturedProjects';
import ContactCTA from './components/ContactCTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ClickSpark from './components/ClickSpark';
import Chatbot from './components/Chatbot';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [activePart, setActivePart] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const sectionParam = searchParams.get('section');
      if (sectionParam) {
        return sectionParam;
      }
      
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        return hash;
      }
      
      const saved = localStorage.getItem('om_active_part');
      if (saved) {
        return saved;
      }
    }
    return 'home';
  });

  // Sync activePart with URL search parameter and localStorage
  useEffect(() => {
    localStorage.setItem('om_active_part', activePart);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('section', activePart);
      window.history.replaceState({ path: url.toString() }, '', url.toString());
    }
  }, [activePart]);

  // Automatically scroll back to absolute top whenever active section changes
  useEffect(() => {
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    const originalScrollBehavior = htmlEl.style.scrollBehavior;
    
    // Temporarily bypass any smooth scroll animations during component swapping
    htmlEl.style.scrollBehavior = 'auto';
    bodyEl.style.scrollBehavior = 'auto';

    const forceScrollToTop = () => {
      window.scrollTo(0, 0);
      htmlEl.scrollTop = 0;
      bodyEl.scrollTop = 0;
      const rootEl = document.getElementById('root');
      if (rootEl) {
        rootEl.scrollTop = 0;
      }
    };

    // Execute immediately on state shift
    forceScrollToTop();

    // Repeatedly re-zero positions as AnimatePresence animates out and the height shifts
    const timings = [20, 60, 120, 200, 300, 420];
    const timers = timings.map(time => setTimeout(forceScrollToTop, time));

    // Restore original scroll behavior after transition resolves
    const restoreTimer = setTimeout(() => {
      htmlEl.style.scrollBehavior = originalScrollBehavior;
      bodyEl.style.scrollBehavior = originalScrollBehavior;
    }, 500);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(restoreTimer);
    };
  }, [activePart]);

  // Return the main content parts dynamically based on user selection
  const renderPartContent = () => {
    switch (activePart) {
      case 'about':
        return (
          <div key="about-section" className="space-y-4">
            <About />
            <Education />
          </div>
        );
      case 'experience':
        return (
          <div key="experience-section">
            <Experience />
          </div>
        );
      case 'skills':
        return (
          <div key="skills-section" className="space-y-4">
            <Skills />
            <Certifications />
          </div>
        );
      case 'work':
        return (
          <div key="work-section" className="space-y-4">
            <Projects />
          </div>
        );
      case 'contact':
        return (
          <div key="contact-section" className="space-y-4">
            <Contact />
            <Services />
          </div>
        );
      case 'home':
      default:
        return (
          <div key="home-section" className="space-y-4 pb-12">
            <Hero setActivePart={setActivePart} />
            <Achievements />
            <TechSkillsPreview />
            <FeaturedProjects />
            <ContactCTA />
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-bg-light dark:bg-brand-bg-dark transition-colors duration-300 bg-grid-dots">
      <ClickSpark
        sparkColor={theme === 'dark' ? '#E2B04E' : '#C28E12'}
        sparkSize={12}
        sparkRadius={20}
        sparkCount={10}
        duration={500}
      >
        {/* Premium cosmic lunar sphere curvature background shown in dark mode */}
        <div className="hidden dark:block absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] lunar-curve pointer-events-none select-none z-0" />

        {/* Custom sticky pill and route header */}
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          activePart={activePart}
          setActivePart={setActivePart}
        />

        {/* Main Container with slide-fade transition */}
        <main className="relative pt-20 z-10 min-h-[75vh]" id="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePart}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              {renderPartContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer View */}
        <Footer setActivePart={setActivePart} />

        {/* OB Assistant Floating Chatbot Companion */}
        <Chatbot
          activePart={activePart}
          setActivePart={setActivePart}
          theme={theme}
        />
      </ClickSpark>
    </div>
  );
}
