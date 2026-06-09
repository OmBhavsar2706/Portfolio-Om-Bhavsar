import { motion } from 'motion/react';
import { ArrowRight, Bot, Cpu, Code2, Sparkles, MapPin, Download, LayoutGrid, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { useTheme } from '../hooks/useTheme';
import BorderGlow from './BorderGlow';
import Aurora from './Aurora';
import ShinyText from './ShinyText';
import { generateResumePDF } from '../utils/generateResume';

interface HeroProps {
  setActivePart?: (part: string) => void;
}

export default function Hero({ setActivePart }: HeroProps) {
  const { theme } = useTheme();
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleDownloadResume = () => {
    generateResumePDF();
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex items-center pt-24 pb-16 overflow-hidden bg-brand-bg-light dark:bg-brand-bg-dark"
    >
      {/* Aurora Organic Animated Wave Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-40 dark:opacity-65 mix-blend-screen overflow-hidden">
        <Aurora
          colorStops={["#EAB308", "#B497CF", "#3B82F6"]}
          blend={0.74}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Premium Minimal Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Futuristic Ambient Radials */}
      <div className="absolute top-1/4 right-1/10 w-96 h-96 bg-brand-accent-light/10 dark:bg-brand-accent-dark/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Presentation */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            {/* Main Headline */}
            <div className="space-y-2">
              <div>
                <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#94A3B8] block mb-1">
                  Ai/Ml Engineer
                </span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-5xl sm:text-7xl lg:text-[74px] font-display font-medium tracking-normal italic leading-none"
                  id="hero-main-title"
                >
                  <ShinyText
                    text={personalInfo.name}
                    speed={2}
                    delay={1}
                    color={theme === 'dark' ? '#ffffff' : '#0f172a'}
                    shineColor={theme === 'dark' ? '#E2B04E' : '#b45309'}
                    className="capitalize font-display font-medium tracking-normal italic leading-none"
                  />
                </motion.h1>
              </div>
            </div>

            {/* Role Rotation Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-2 sm:gap-3 pt-2"
              id="hero-taglines-list"
            >
              {personalInfo.titles.map((title) => (
                <BorderGlow
                  key={title}
                  edgeSensitivity={20}
                  glowColor={theme === 'dark' ? '41 74 59' : '26 91 36'}
                  backgroundColor={theme === 'dark' ? '#18181b' : '#f4f4f5'}
                  borderRadius={8}
                  glowRadius={16}
                  glowIntensity={1.4}
                  coneSpread={24}
                  animated={true}
                  colors={theme === 'dark' ? ['#E2B04E', '#8B5CF6', '#3B82F6'] : ['#b45309', '#6366F1', '#EC4899']}
                  className="rounded-lg shadow-sm border border-neutral-200/50 dark:border-neutral-700/50"
                  fillOpacity={0.4}
                >
                  <span
                    className="text-xs font-mono font-bold px-3.5 py-1.5 uppercase tracking-wide text-neutral-800 dark:text-neutral-100 flex items-center justify-center whitespace-nowrap"
                  >
                    {title}
                  </span>
                </BorderGlow>
              ))}
            </motion.div>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed font-sans"
              id="hero-summary-text"
            >
              {personalInfo.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex items-center space-x-2 text-xs text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-wider"
              id="hero-location"
            >
              <MapPin className="w-4 h-4 text-brand-accent-light dark:text-brand-accent-dark" />
              <span>{personalInfo.location}</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-4"
              id="hero-cta-buttons"
            >
              <button
                onClick={() => {
                  if (setActivePart) {
                    setActivePart('work');
                  } else {
                    handleScrollTo('#projects');
                  }
                }}
                className="group px-6 py-3.5 bg-brand-accent-light text-white dark:bg-white dark:text-[#0B1120] font-black uppercase text-xs tracking-widest rounded-xl hover:scale-105 transition-transform shadow-lg shadow-brand-accent-light/20 dark:shadow-white/5 flex items-center justify-center gap-2"
              >
                <LayoutGrid className="w-4 h-4" />
                <span>View Projects</span>
              </button>

              <button
                onClick={() => {
                  if (setActivePart) {
                    setActivePart('contact');
                  } else {
                    handleScrollTo('#contact');
                  }
                }}
                className="px-6 py-3.5 border-2 border-neutral-300 dark:border-[#1F2937] text-neutral-800 dark:text-white font-black uppercase text-xs tracking-widest rounded-xl hover:scale-105 hover:bg-neutral-100 dark:hover:bg-[#1E293B] transition-all flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </button>

              <BorderGlow
                edgeSensitivity={30}
                glowColor="40 72 59"
                backgroundColor="transparent"
                borderRadius={12}
                glowRadius={25}
                glowIntensity={1.5}
                coneSpread={25}
                animated={true}
                colors={['#E2B04E', '#FB923C', '#6366F1']}
                className="hover:scale-105 transition-all duration-300"
              >
                <button
                  onClick={handleDownloadResume}
                  className="px-6 py-3.5 bg-neutral-150/40 dark:bg-[#111827]/30 text-neutral-800 dark:text-neutral-200 font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 rounded-xl focus:outline-none"
                >
                  <Download className="w-4 h-4 text-[#E2B04E]" />
                  <span>Download Resume</span>
                </button>
              </BorderGlow>
            </motion.div>
          </div>

          {/* Core Graphic Visual Section */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end lg:-translate-x-8">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative w-full max-w-[425px] aspect-[4/5] rounded-[32px] overflow-hidden bg-neutral-950 shadow-2xl group border border-neutral-200 dark:border-[#1E1E21]"
              id="hero-abstract-art"
            >
              <img
                src="/images/hero_portrait.png"
                alt="Om Bhavsar - AI & ML Engineer Portrait"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />

              {/* Minimal elegant radial/conic light glare vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

              {/* Dynamic bottom detail label block inside the portrait card */}
              <div className="absolute bottom-6 left-6 right-6 text-left space-y-1 z-20">
                <h4 className="text-sm font-black text-white tracking-tight uppercase font-sans">
                  Om Bhavsar
                </h4>
                <p className="text-[10px] font-mono font-bold text-[#E2B04E]">
                  Ai & Ml Engineer - Nashik
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
