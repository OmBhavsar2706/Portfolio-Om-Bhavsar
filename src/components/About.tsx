import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Instagram, FileText, Download, Award, GraduationCap, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import BorderGlow from './BorderGlow';
import Aurora from './Aurora';
import { useTheme } from '../hooks/useTheme';
import { generateResumePDF } from '../utils/generateResume';

export default function About() {
  const { theme } = useTheme();
  const triggerResumeDownload = () => {
    generateResumePDF();
  };

  return (
    <section className="py-24 bg-brand-bg-light dark:bg-[#050505] min-h-[85vh] relative overflow-hidden">
      {/* Aurora Organic Animated Wave Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-40 dark:opacity-65 mix-blend-screen overflow-hidden">
        <Aurora
          colorStops={["#EAB308", "#B497CF", "#3B82F6"]}
          blend={0.74}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Background Star Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-500/5 dark:bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-14">
        
        {/* Main Columns Container matching the screenshot design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content and Branding */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            {/* Monospace Small Header */}
            <span className="text-xs font-mono font-black tracking-widest text-[#E2B04E] uppercase block" id="about-meta-text">
              More About Me
            </span>

            {/* Custom Serif Display Title */}
            <h1 className="text-5xl sm:text-6xl font-display font-medium text-neutral-900 dark:text-white leading-[1.05] tracking-tight">
              I'm Om, a <br />
              <span className="text-gradient-cosmic italic font-serif">Ai & ML Engineer</span>
            </h1>

            {/* Structured bio paragraphs mirroring the screenshot format */}
            <div className="space-y-4 text-[#475569] dark:text-[#94A3B8] font-sans text-sm sm:text-base leading-relaxed max-w-2xl font-light">
              <p>
                I'm Om Vinayak Bhavsar, a AI & ML Engineer and Full-Stack Developer based in Nashik, Maharashtra. Currently pursuing a Diploma in Artificial Intelligence & Machine Learning, I work as an AI & Machine Learning Intern at SoftCrowd Technologies and as a Freelance Full-Stack Engineer.
              </p>
              <p>
                My work focuses on bridging the gap between intelligent systems and scalable web architecture. I have hands-on experience managing the complete AI development lifecycle—from data preprocessing and model training to production deployment—and transforming business requirements into user-focused digital products.
              </p>
              <p>
                I believe in making the most of every day and building things that leave a positive impact!
              </p>
            </div>

            {/* Bottom Row: Social Icons and White Pill Button "Download CV" */}
            <div className="flex flex-wrap items-center gap-6 pt-4 w-full">
              
              {/* social symbols row */}
              <div className="flex items-center space-x-5 text-neutral-500 dark:text-neutral-450">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors duration-200"
                  aria-label="GitHub profile page link"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors duration-200"
                  aria-label="LinkedIn profile page link"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black dark:hover:text-white transition-colors duration-200"
                  aria-label="Instagram profile page link"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>

              {/* White Pill Button "Download CV" */}
              <BorderGlow
                edgeSensitivity={30}
                glowColor={theme === 'dark' ? '41 74 59' : '26 91 36'}
                backgroundColor={theme === 'dark' ? '#050505' : '#f8fafc'}
                borderRadius={50}
                glowRadius={20}
                glowIntensity={1.4}
                coneSpread={25}
                animated={true}
                colors={theme === 'dark' ? ['#E2B04E', '#8B5CF6', '#3B82F6'] : ['#b45309', '#6366F1', '#EC4899']}
                className="inline-grid w-auto"
                fillOpacity={0.4}
              >
                <button
                  onClick={triggerResumeDownload}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-white text-neutral-900 dark:bg-white dark:text-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-100 active:scale-95 transition-all shadow-md font-sans border border-neutral-200 dark:border-transparent"
                  id="about-download-cv-btn"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </button>
              </BorderGlow>

            </div>

          </div>

          {/* Right Column: Beautiful Rounded Picture Wrapper matching Dhiraj's photography framing */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative w-full max-w-[360px] aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-950 shadow-2xl group border border-neutral-200 dark:border-[#1E1E21]"
              id="about-portrait-card"
            >
              <img
                src="/images/about_portrait.png"
                alt="Om Bhavsar - AI & ML Innovator Portrait"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />

              {/* Lunar/Sunset elegant dark backing vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
