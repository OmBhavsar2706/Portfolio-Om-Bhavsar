import { motion } from 'motion/react';
import { Calendar, Award, Briefcase, MapPin, Cpu, Code2, Terminal, Sparkles } from 'lucide-react';
import { experiences } from '../data/portfolio';
import BorderGlow from './BorderGlow';

// Select icons dynamically based on professional nature of the entry
function getExperienceIcon(id: string) {
  switch (id) {
    case 'exp-1':
      return (
        <svg 
          viewBox="0 0 100 100" 
          className="w-6 h-6 select-none" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Grey interlocking monogram shape */}
          <path 
            d="M 75 16 H 49 A 24 24 0 0 0 25 40 V 60 H 54 V 44 H 41 V 40 A 8 8 0 0 1 49 32 H 75 Z" 
            fill="#5E5E5E" 
            className="dark:fill-[#9E9E9E]"
          />
          {/* Blue interlocking monogram shape */}
          <path 
            d="M 75 44 V 60 A 24 24 0 0 1 51 84 H 25 V 68 H 51 A 8 8 0 0 0 59 60 V 44 Z" 
            fill="#09A6EC" 
            className="dark:fill-[#0EA5E9]"
          />
        </svg>
      );
    case 'exp-2':
      return (
        <svg 
          viewBox="0 0 100 100" 
          className="w-6 h-6 select-none" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="origamiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          {/* Back Wing */}
          <polygon 
            points="25.5,21.2 42.5,28.5 29,27.8" 
            fill="url(#origamiGrad)" 
          />
          {/* Head Crown */}
          <polygon 
            points="48.5,29.8 55,21.2 60.5,29.8" 
            fill="url(#origamiGrad)" 
          />
          {/* Beak / Upper Head */}
          <polygon 
            points="57.7,21.2 89.2,21.2 62.5,29.8" 
            fill="url(#origamiGrad)" 
          />
          {/* Fore Wing */}
          <polygon 
            points="12.2,28.8 45,30.8 33.8,55.5" 
            fill="url(#origamiGrad)" 
          />
          {/* Main Body / Chest */}
          <polygon 
            points="46.5,31 60.8,32.2 57.5,55.5 45.2,70.2 35.2,57" 
            fill="url(#origamiGrad)" 
          />
          {/* Tail */}
          <polygon 
            points="35.2,60.8 29.8,87.5 44.5,71.5" 
            fill="url(#origamiGrad)" 
          />
        </svg>
      );
    case 'exp-3':
      return (
        <svg 
          viewBox="0 0 100 100" 
          className="w-6 h-6 select-none" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="rTechGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>

          {/* Large Filled Head Circle */}
          <circle cx="78" cy="46" r="8.5" fill="url(#rTechGrad)" />

          {/* Main sweeping 'r' body with diagonal bottom cut */}
          <path 
            d="M 32 27 H 55 C 65 27 72 34 72 43 V 85 L 57 70 V 43 C 57 40 54 38 51 38 H 32 Z" 
            fill="url(#rTechGrad)" 
          />

          {/* Horizontal circuit lines (feathering) */}
          <path d="M 32 31 H 51" stroke="url(#rTechGrad)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 32 35 H 48" stroke="url(#rTechGrad)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 32 39 H 45" stroke="url(#rTechGrad)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 34 43 H 42" stroke="url(#rTechGrad)" strokeWidth="2" strokeLinecap="round" />

          {/* Circuit tracks and nodes on the left */}
          {/* Top-left node and bent line */}
          <circle cx="12" cy="27" r="3" fill="url(#rTechGrad)" />
          <path d="M 15 27 H 19 L 23 31 H 32" stroke="url(#rTechGrad)" strokeWidth="2" strokeLinecap="round" />

          {/* Hollow circle outline below top-left */}
          <circle cx="18" cy="35" r="2.5" stroke="url(#rTechGrad)" strokeWidth="1.5" fill="none" />

          {/* Middle filled node and line */}
          <circle cx="30" cy="27" r="2.5" fill="url(#rTechGrad)" />

          {/* Left-middle node and connector */}
          <circle cx="32" cy="35" r="2.5" fill="url(#rTechGrad)" />

          {/* Bottom-left node and bent line */}
          <circle cx="21" cy="52" r="3" fill="url(#rTechGrad)" />
          <path d="M 24 52 H 34 L 38 43 H 45" stroke="url(#rTechGrad)" strokeWidth="2" strokeLinecap="round" />

          {/* Little hollow ring under the sweep */}
          <circle cx="40" cy="55" r="2" stroke="url(#rTechGrad)" strokeWidth="1.2" fill="none" />
        </svg>
      );
    case 'exp-4':
      return (
        <svg 
          viewBox="0 0 100 100" 
          className="w-6 h-6 select-none" 
          fill="none" 
          strokeLinecap="round"
          strokeWidth="6"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Track 1 (Inner, Radius = 15) */}
          {/* Red Semicircle (left) */}
          <path 
            d="M 47.4 35.2 A 15 15 0 0 0 47.4 64.8" 
            className="stroke-[#C21E23] dark:stroke-[#F87171]" 
          />
          {/* Dark Blue Top-Right Arc */}
          <path 
            d="M 57.5 37.0 A 15 15 0 0 1 64.1 44.9" 
            className="stroke-[#1E144F] dark:stroke-[#60A5FA]" 
          />
          {/* Red Dot (Radius = 3) */}
          <circle 
            cx="65.5" 
            cy="41.5" 
            r="3" 
            className="fill-[#C21E23] dark:fill-[#F87171]" 
            stroke="none"
          />
          {/* Dark Blue Bottom-Right Arc */}
          <path 
            d="M 64.1 55.1 A 15 15 0 0 1 56.3 63.6" 
            className="stroke-[#1E144F] dark:stroke-[#60A5FA]" 
          />

          {/* Track 2 (Radius = 25) */}
          {/* Red Bottom Arc */}
          <path 
            d="M 28.3 62.5 A 25 25 0 0 0 56.5 74.1" 
            className="stroke-[#C21E23] dark:stroke-[#F87171]" 
          />
          {/* Dark Blue Left Arc */}
          <path 
            d="M 28.3 37.5 A 25 25 0 0 0 25.4 54.3" 
            className="stroke-[#1E144F] dark:stroke-[#60A5FA]" 
          />
          {/* Dark Blue Top-Left Arc */}
          <path 
            d="M 33.9 30.8 A 25 25 0 0 1 58.6 26.5" 
            className="stroke-[#1E144F] dark:stroke-[#60A5FA]" 
          />
          {/* Dark Blue Top-Right Arc */}
          <path 
            d="M 66.1 30.8 A 25 25 0 0 1 69.2 66.1" 
            className="stroke-[#1E144F] dark:stroke-[#60A5FA]" 
          />

          {/* Track 3 (Radius = 35) */}
          {/* Dark Blue Bottom-Left Arc */}
          <path 
            d="M 35.2 81.7 A 35 35 0 0 1 15.1 46.9" 
            className="stroke-[#1E144F] dark:stroke-[#60A5FA]" 
          />
          {/* Dark Blue Dot */}
          <circle 
            cx="16.7" 
            cy="39.2" 
            r="3" 
            className="fill-[#1E144F] dark:fill-[#60A5FA]" 
            stroke="none"
          />
          {/* Red Top-Left Arc */}
          <path 
            d="M 19.7 32.5 A 35 35 0 0 1 56.1 15.5" 
            className="stroke-[#C21E23] dark:stroke-[#F87171]" 
          />
          {/* Red Outer-Right Arc */}
          <path 
            d="M 74.7 25.3 A 35 35 0 0 1 62.0 82.9" 
            className="stroke-[#C21E23] dark:stroke-[#F87171]" 
          />

          {/* Track 4 (Radius = 44) */}
          {/* Dark Blue Top-Right Arc */}
          <path 
            d="M 72.0 11.9 A 44 44 0 0 1 88.1 28.0" 
            className="stroke-[#1E144F] dark:stroke-[#60A5FA]" 
          />
          {/* Dark Blue Bottom-Right Arc */}
          <path 
            d="M 81.1 81.1 A 44 44 0 0 1 68.6 89.9" 
            className="stroke-[#1E144F] dark:stroke-[#60A5FA]" 
          />
          {/* Dark Blue Far-Left Outer Arc */}
          <path 
            d="M 8.7 35.0 A 44 44 0 0 0 6.7 57.6" 
            className="stroke-[#1E144F] dark:stroke-[#60A5FA]" 
          />
        </svg>
      );
    default:
      return <Terminal className="w-5 h-5 text-rose-500" />;
  }
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-[#FCFDFE] dark:bg-[#050505] border-t border-b border-neutral-200/40 dark:border-neutral-900/40 relative overflow-hidden">
      
      {/* Background Subtle Noise and Orbits */}
      <div className="absolute inset-0 bg-grid-dots pointer-events-none opacity-20 dark:opacity-[0.12]" />
      <div className="absolute top-1/4 right-[10%] w-[350px] h-[350px] bg-brand-accent-light/5 dark:bg-brand-accent-dark/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-[250px] h-[250px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left space-y-4 mb-20 max-w-3xl border-l-[3px] border-[#B497CF] pl-5">
          <span className="text-xs font-mono font-bold tracking-widest text-[#B497CF] uppercase block">
            Professional History
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white mb-2" id="experience-title">
            Engineering <span className="font-display italic font-medium text-gradient-cosmic">Milestones</span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base font-medium max-w-lg">
            Practical industry contributions and freelance engagements mapping out a robust software engineering career.
          </p>
        </div>

        {/* Timeline wrapper */}
        <div className="relative pl-10 md:pl-16 max-w-5xl mx-auto">
          
          {/* 1. Vertical Background Line Track */}
          <div className="absolute left-[12px] md:left-[24px] top-6 bottom-6 w-[2px] bg-neutral-200 dark:bg-[#1A1A1D] rounded-full" />

          {/* 2. Vertical Animated Flowing Line (Draws downwards on view scroll/trigger) */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 'calc(100% - 48px)' }}
            viewport={{ once: true, margin: "-15px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-[12px] md:left-[24px] top-6 w-[2px] bg-gradient-to-b from-[#EAB308] via-[#B497CF] to-[#3B82F6] origin-top rounded-full z-0"
          />

          {/* Experience list mapping */}
          <div className="space-y-16 text-left">
            {experiences.map((exp, idx) => {
              const isCurrent = exp.duration.toLowerCase().includes('present');

              return (
                <div key={exp.id} className="relative group flex flex-col pt-2" id={`experience-item-${exp.id}`}>
                  
                  {/* Timeline Badge (grows softly or lights up active outline) */}
                  <div className="absolute left-[-38px] md:left-[-52px] top-1 z-10 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-15px" }}
                      transition={{ type: "spring", stiffness: 220, damping: 16, delay: idx * 0.15 }}
                      className={`w-10 h-10 rounded-full border flex items-center justify-center shadow-md transition-all duration-350 cursor-default relative bg-white dark:bg-[#07070a] overflow-hidden ${
                        isCurrent 
                          ? 'border-[#3B82F6] dark:border-[#60A5FA] ring-2 ring-blue-500/10' 
                          : 'border-neutral-200 dark:border-neutral-800 group-hover:border-[#B497CF]'
                      }`}
                    >
                      {/* Active present pulsating glow aura */}
                      {isCurrent && (
                        <span className="absolute inset-x-0 inset-y-0 rounded-full bg-blue-500/20 dark:bg-sky-500/15 animate-ping z-[-1]" />
                      )}
                      <div className="transition-transform duration-300 group-hover:scale-110 w-full h-full flex items-center justify-center overflow-hidden">
                        {getExperienceIcon(exp.id)}
                      </div>
                    </motion.div>
                  </div>

                  {/* Desktop Columns / Mobile vertical flex split */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Column 1: Academic/Professional details metadata */}
                    <div className="lg:col-span-5 space-y-2.5">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                      >
                        {/* Duration label badge */}
                        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-neutral-100 dark:bg-[#111115] border border-neutral-200/50 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
                          <Calendar className="w-3 h-3" />
                          <span>{exp.duration}</span>
                        </div>

                        {/* Company title */}
                        <h4 className="text-sm font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-mono mt-2 flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{exp.company}</span>
                        </h4>

                        {/* Role */}
                        <h3 className="text-xl font-bold font-sans text-neutral-800 dark:text-neutral-100 uppercase tracking-tight leading-snug group-hover:text-neutral-900 dark:group-hover:text-white transition-colors flex items-center gap-2">
                          <span>{exp.role}</span>
                          {idx === 0 && (
                            <span className="text-[9px] tracking-wider font-mono bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/60 py-0.5 px-2 rounded-full font-bold uppercase shrink-0">
                              Active
                            </span>
                          )}
                        </h3>

                        {/* Location */}
                        {exp.location && (
                          <div className="flex items-center space-x-1.5 text-xs text-neutral-400 dark:text-neutral-500 font-medium font-sans mt-2">
                            <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Column 2: Specific high-end card describing achievements or focus areas */}
                    <div className="lg:col-span-7">
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.15 }}
                        className="h-full w-full"
                      >
                        {exp.id === 'exp-1' ? (
                          <BorderGlow
                            borderRadius={16}
                            glowColor="205 90 70"
                            colors={['#09A6EC', '#B497CF', '#3B82F6']}
                            backgroundColor="var(--experience-card-bg)"
                            glowIntensity={0.65}
                            glowRadius={30}
                            animated={true}
                            className="w-full h-full rounded-2xl border border-neutral-200/55 dark:border-brand-border-dark shadow-sm group-hover:border-[#B497CF]/30 dark:group-hover:border-brand-accent-dark/30 hover:shadow-md transition-all duration-300 relative overflow-hidden"
                          >
                            <div className="p-6 relative overflow-hidden w-full h-full">
                              {/* Radial ambient glow hover backing */}
                              <div className="absolute inset-0 bg-gradient-to-br from-[#B497CF]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                              <div className="space-y-4">
                                <div>
                                  <p className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase mb-3">
                                    Core Focus & Responsibilities
                                  </p>
                                  <ul className="space-y-4">
                                    {exp.responsibilities.map((resp, rIdx) => (
                                      <li key={rIdx} className="flex items-start gap-2.5 text-neutral-600 dark:text-neutral-300 text-xs sm:text-[13px] font-sans font-light leading-relaxed">
                                        {/* Dot pointer indicator */}
                                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700 mt-2 shrink-0 group-hover:bg-[#B497CF] transition-colors duration-300" />
                                        <span>{resp}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Achievements */}
                                {exp.achievements && exp.achievements.length > 0 && (
                                  <div className="border-t border-neutral-100 dark:border-neutral-800/80 pt-4 space-y-2 text-left">
                                    <p className="text-[10px] font-mono font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1.5 mb-2">
                                      <Award className="w-3.5 h-3.5 text-emerald-500" />
                                      <span>Key Accomplishments</span>
                                    </p>
                                    <ul className="space-y-2">
                                      {exp.achievements.map((ach, aIdx) => (
                                        <li key={aIdx} className="flex items-start gap-2.5 text-neutral-800 dark:text-neutral-200 text-xs sm:text-[13px] font-semibold font-sans leading-relaxed">
                                          <span className="text-emerald-500 select-none shrink-0 text-sm">✔</span>
                                          <span>{ach}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </BorderGlow>
                        ) : (
                          <div className="p-6 rounded-2xl bg-white dark:bg-[#0B0B0C] border border-neutral-200/55 dark:border-brand-border-dark shadow-sm group-hover:border-[#B497CF]/30 dark:group-hover:border-brand-accent-dark/30 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                            {/* Radial ambient glow hover backing */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#B497CF]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="space-y-4">
                              <div>
                                <p className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase mb-3">
                                  Core Focus & Responsibilities
                                </p>
                                <ul className="space-y-4">
                                  {exp.responsibilities.map((resp, rIdx) => (
                                    <li key={rIdx} className="flex items-start gap-2.5 text-neutral-600 dark:text-neutral-300 text-xs sm:text-[13px] font-sans font-light leading-relaxed">
                                      {/* Dot pointer indicator */}
                                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700 mt-2 shrink-0 group-hover:bg-[#B497CF] transition-colors duration-300" />
                                      <span>{resp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Achievements */}
                              {exp.achievements && exp.achievements.length > 0 && (
                                <div className="border-t border-neutral-100 dark:border-neutral-800/80 pt-4 space-y-2 text-left">
                                  <p className="text-[10px] font-mono font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1.5 mb-2">
                                    <Award className="w-3.5 h-3.5 text-emerald-500" />
                                    <span>Key Accomplishments</span>
                                  </p>
                                  <ul className="space-y-2">
                                    {exp.achievements.map((ach, aIdx) => (
                                      <li key={aIdx} className="flex items-start gap-2.5 text-neutral-800 dark:text-neutral-200 text-xs sm:text-[13px] font-semibold font-sans leading-relaxed">
                                        <span className="text-emerald-500 select-none shrink-0 text-sm">✔</span>
                                        <span>{ach}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
