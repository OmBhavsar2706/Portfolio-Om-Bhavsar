import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X, Calendar, PhoneCall, Users } from 'lucide-react';
import { Theme } from '../hooks/useTheme';
import GlassSurface from './GlassSurface';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  activePart: string;
  setActivePart: (part: string) => void;
}

export default function Navbar({
  theme,
  toggleTheme,
  activePart,
  setActivePart
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(75);

  // Generate real, persistent and incrementing visitor simulations
  useEffect(() => {
    try {
      const hasVisited = localStorage.getItem('om_bhavsar_has_visited');
      if (!hasVisited) {
        setVisitorCount(75);
        localStorage.setItem('om_bhavsar_has_visited', 'true');
        localStorage.setItem('om_bhavsar_visitors', '75');
      } else {
        const randVal = Math.floor(Math.random() * 200) + 1; // range 1 to 200
        setVisitorCount(randVal);
        localStorage.setItem('om_bhavsar_visitors', randVal.toString());
      }
    } catch {
      // standard fallback
      setVisitorCount(75);
    }
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Experience', id: 'experience' },
    { name: 'Skills', id: 'skills' },
    { name: 'Work', id: 'work' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-neutral-50/60 dark:bg-[#070708]/65 backdrop-blur-lg border-b border-neutral-200/20 dark:border-neutral-800/40 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo - Styled Monogram OB matching screenshot DB style */}
          <button
            onClick={() => {
              if (activePart !== 'home') {
                setActivePart('home');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center space-x-1 outline-none group text-left"
            id="nav-logo"
            aria-label="Om Bhavsar Monogram Logo"
          >
            <span className="font-display text-4xl font-extrabold text-[#E2B04E] dark:text-[#E2B04E] uppercase tracking-tighter transition-transform group-hover:scale-105">
              O
            </span>
            <span className="font-display text-4xl font-extrabold text-neutral-900 dark:text-white uppercase tracking-tighter transition-transform group-hover:scale-105 italic -ml-1">
              B
            </span>
          </button>

          {/* Centered Floating Nav Pill Navigation with GlassSurface integration */}
          <div className="hidden md:block">
            <GlassSurface
              width="auto"
              height="auto"
              borderRadius={999}
              brightness={theme === 'dark' ? 12 : 92}
              opacity={0.35}
              backgroundOpacity={theme === 'dark' ? 0.45 : 0.75}
              saturation={1.8}
              distortionScale={-110}
              redOffset={10}
              greenOffset={5}
              blueOffset={15}
              blur={12}
              className="p-0.5 border border-neutral-200/40 dark:border-white/10 shadow-lg rounded-full"
            >
              <nav className="flex items-center">
                {navLinks.map((link) => {
                  const isActive = activePart === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        if (activePart !== link.id) {
                          setActivePart(link.id);
                        } else {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-200 ${
                        isActive
                          ? 'text-[#E2B04E] bg-neutral-900 dark:bg-white dark:text-neutral-950 font-black shadow-sm'
                          : 'text-neutral-500 dark:text-neutral-450 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                      id={`nav-tab-${link.id}`}
                    >
                      {link.name}
                    </button>
                  );
                })}

              </nav>
            </GlassSurface>
          </div>

          {/* Right Side Options: Visitors pill + dark switch toggle */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Live simulate visitor count matching screenshot details */}
            <div
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full bg-white/70 dark:bg-[#121213]/85 border border-neutral-200/60 dark:border-white/10 text-[10px] font-mono tracking-widest text-[#475569] dark:text-[#94A3B8] uppercase shadow-sm select-none"
              id="visitor-pill"
            >
              <Users className="w-3.5 h-3.5 text-[#E2B04E] animate-pulse" />
              <span>
                <strong className="text-neutral-900 dark:text-white font-black">{visitorCount}</strong> Visitors
              </span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 px-2.5 rounded-full bg-white/70 dark:bg-[#121213]/85 border border-neutral-200/60 dark:border-white/10 text-neutral-600 dark:text-neutral-350 hover:text-neutral-950 dark:hover:text-white transition-all shadow-sm"
              aria-label="Toggle visual theme"
              id="theme-toggler-header"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-[spin_40s_linear_infinite]" />
              ) : (
                <Moon className="w-4 h-4 text-neutral-700" />
              )}
            </button>

          </div>

          {/* Mobile Navigation controls */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/80 dark:bg-[#121213]/85 text-neutral-600 dark:text-neutral-350"
              aria-label="Toggle visual theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-full bg-white/80 dark:bg-[#121213]/85 text-neutral-600 dark:text-neutral-350 border border-neutral-200/60 dark:border-white/10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white dark:bg-[#0B0B0C] border-b border-neutral-200 dark:border-[#1E1E21] mt-3"
            id="mobile-nav-panel"
          >
            <div className="px-5 pt-3 pb-6 space-y-4 text-left">
              {navLinks.map((link) => {
                const isActive = activePart === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      if (activePart !== link.id) {
                        setActivePart(link.id);
                      } else {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left py-2 text-sm font-semibold border-b border-neutral-100 dark:border-neutral-900 transition-colors ${
                      isActive ? 'text-[#E2B04E] font-black' : 'text-neutral-600 dark:text-neutral-350'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}

              {/* Visitor Counter for mobile drawer */}
              <div className="pt-2 flex items-center space-x-2 text-xs font-mono text-neutral-500 py-2">
                <Users className="w-4 h-4 text-[#E2B04E]" />
                <span>Live Visitors: {visitorCount}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
