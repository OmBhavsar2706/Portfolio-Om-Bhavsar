import { motion } from 'motion/react';
import { BookOpen, GraduationCap, MapPin, Code2, Cpu, Calendar } from 'lucide-react';
import { educations } from '../data/portfolio';

// Local bullets mapping for education details to maximize visual depth & fidelity
const educationBullets: Record<string, string[]> = {
  'edu-3': [
    'Completed secondary education (SSC) under CBSE with strict focus on core Sciences, Advanced Mathematics, and Computing fundamentals.',
    'Formed strong academic foundations in analytic thinking, structural reasoning, and procedural computational logic.',
    'Actively participated in scientific research modules and computing lab tournaments.'
  ],
  'edu-2': [
    'Enrolled in advanced professional certification covering architectural OOP models, algorithm optimizations, and data mechanics.',
    'Acquired deep operational expertise in C++ complexity resolution, dynamic memory allocation, and basic Java structures.',
    'Engineered custom console projects including terminal automation scripts and record management engines.'
  ],
  'edu-1': [
    'Pursuing formal professional technical curriculum in intelligent systems engineering, neural architectures, and data design.',
    'Engaged in end-to-end cycles including data grooming, descriptive regression forecasting, neural training models, and predictive models.',
    'Bridging advanced model orchestration with client web architectures for production-grade deliverables.'
  ]
};

// Select icons dynamically based on academic nature of the entry
function getEducationIcon(id: string) {
  switch (id) {
    case 'edu-3':
      return <GraduationCap className="w-5 h-5 text-amber-500 dark:text-amber-400" />;
    case 'edu-2':
      return <Code2 className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />;
    case 'edu-1':
    default:
      return <Cpu className="w-5 h-5 text-emerald-500" />;
  }
}

export default function Education() {
  return (
    <section id="education" className="py-24 bg-[#FCFDFE] dark:bg-[#050505] border-t border-b border-neutral-200/40 dark:border-neutral-900/40 relative overflow-hidden">
      
      {/* Background Subtle Noise and Orbits */}
      <div className="absolute inset-0 bg-grid-dots pointer-events-none opacity-20 dark:opacity-[0.12]" />
      <div className="absolute top-1/4 right-[10%] w-[350px] h-[350px] bg-brand-accent-light/5 dark:bg-brand-accent-dark/5 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[5%] w-[250px] h-[250px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left space-y-4 mb-20 max-w-3xl border-l-[3px] border-[#B497CF] pl-5">
          <span className="text-xs font-mono font-bold tracking-widest text-[#B497CF] uppercase block">
            Academic Milestones
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white mb-2" id="education-title">
            Education <span className="font-display italic font-medium text-gradient-cosmic">Timeline</span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base font-medium max-w-lg">
            Every classic milestone shaped my skills and fueled my growth
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

          {/* Education list mapping */}
          <div className="space-y-16 text-left">
            {educations.map((edu, idx) => {
              const bullets = educationBullets[edu.id] || [];
              const isCurrent = edu.id === 'edu-1'; // MSBTE is the active present enrollment

              return (
                <div key={edu.id} className="relative group flex flex-col pt-2" id={`edu-item-${edu.id}`}>
                  
                  {/* Timeline Badge (grows softly or lights up active outline) */}
                  <div className="absolute left-[-38px] md:left-[-52px] top-1 z-10 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-15px" }}
                      transition={{ type: "spring", stiffness: 220, damping: 16, delay: idx * 0.15 }}
                      className={`w-10 h-10 rounded-full border flex items-center justify-center shadow-md transition-all duration-350 cursor-default relative bg-white dark:bg-[#07070a] ${
                        isCurrent 
                          ? 'border-[#3B82F6] dark:border-[#60A5FA] ring-2 ring-blue-500/10' 
                          : 'border-neutral-200 dark:border-neutral-800 group-hover:border-[#B497CF]'
                      }`}
                    >
                      {/* Active present pulsating glow aura */}
                      {isCurrent && (
                        <span className="absolute inset-x-0 inset-y-0 rounded-full bg-blue-500/20 dark:bg-sky-500/15 animate-ping z-[-1]" />
                      )}
                      <div className="transition-transform duration-300 group-hover:scale-110">
                        {getEducationIcon(edu.id)}
                      </div>
                    </motion.div>
                  </div>

                  {/* Desktop Columns / Mobile vertical flex split */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Column 1: Academic details metadata */}
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
                          <span>{edu.duration}</span>
                        </div>

                        {/* Institution */}
                        <h4 className="text-sm font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-mono mt-2 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{edu.institution}</span>
                        </h4>

                        {/* Degree/Certificate title */}
                        <h3 className="text-xl font-bold font-sans text-neutral-800 dark:text-neutral-100 uppercase tracking-tight leading-snug group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                          {edu.degree}
                        </h3>

                        {/* Location */}
                        {edu.location && (
                          <div className="flex items-center space-x-1.5 text-xs text-neutral-400 dark:text-neutral-500 font-medium font-sans mt-2">
                            <MapPin className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                            <span>{edu.location}</span>
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
                        className="p-6 rounded-2xl bg-white dark:bg-[#0B0B0C] border border-neutral-200/55 dark:border-brand-border-dark shadow-sm group-hover:border-[#B497CF]/30 dark:group-hover:border-brand-accent-dark/30 hover:shadow-md transition-all duration-300 relative overflow-hidden"
                      >
                        {/* Radial ambient glow hover backing */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#B497CF]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <ul className="space-y-4">
                          {bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5 text-neutral-600 dark:text-neutral-300 text-xs sm:text-[13px] font-sans font-light leading-relaxed">
                              {/* Dot pointer indicator */}
                              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700 mt-2 shrink-0 group-hover:bg-[#B497CF] transition-colors duration-300" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
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
