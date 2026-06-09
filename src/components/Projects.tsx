import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Sparkles, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { projects } from '../data/portfolio';
import { Project } from '../types';

function getTechIcon(tag: string) {
  const norm = tag.toLowerCase().trim();
  switch (norm) {
    case 'react':
    case 'react.js':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#00D8FF" strokeWidth="2" className="w-3.5 h-3.5 animate-[spin_10s_linear_infinite] inline-block shrink-0">
          <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(0 12 12)" />
          <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(60 12 12)" />
          <ellipse rx="10" ry="4.5" cx="12" cy="12" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="#00D8FF" />
        </svg>
      );
    case 'node':
    case 'node.js':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 inline-block shrink-0" fill="none" stroke="#22C55E" strokeWidth="2">
          <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" />
          <text x="12" y="15" fill="#22C55E" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">JS</text>
        </svg>
      );
    case 'express':
    case 'express.js':
      return (
        <span className="w-4 h-4 bg-transparent border border-neutral-700/80 rounded px-0.5 text-[8px] font-bold text-neutral-300 flex items-center justify-center font-sans tracking-tighter shrink-0 select-none">
          ex
        </span>
      );
    case 'mongodb':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 inline-block shrink-0" fill="#22C55E">
          <path d="M12 2C11.5 4 9.5 8 9.5 11.5c0 3 2.5 5.5 2.5 5.5s2.5-2.5 2.5-5.5C14.5 8 12.5 4 12 2z" />
          <path d="M12 17v5" stroke="#22C55E" strokeWidth="2" />
        </svg>
      );
    case 'socket':
    case 'socket.io':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 inline-block shrink-0" fill="none" stroke="#FFFFFF" strokeWidth="2">
          <circle cx="12" cy="12" r="10" fill="#000000" />
          <path d="M13 7l-5 6h4l-2 4 5-6h-4l2-4z" fill="#FFFFFF" />
        </svg>
      );
    case 'tailwind':
    case 'tailwindcss':
    case 'tailwind css':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 inline-block shrink-0" fill="#06B6D4">
          <path d="M12 6.036c-2.28 0-3.42 1.14-3.42 3.42 0 3.42 1.71 4.56 3.42 6.84 1.71-2.28 3.42-3.42 3.42-6.84 0-2.28-1.14-3.42-3.42-3.42zm-6.84 4.56C2.88 10.596 1.74 11.736 1.74 14.016c0 3.42 1.71 4.56 3.42 6.84 1.71-2.28 3.42-3.42 3.42-6.84 0-2.28-1.14-3.42-3.42-3.42z" />
        </svg>
      );
    case 'motion':
    case 'motion.dev':
    case 'framer motion':
    case 'framer':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 inline-block shrink-0">
          <path d="M2 3h20l-10 10L2 3z" fill="#FBBF24" />
          <path d="M2 11h20l-10 10L2 11z" fill="#F59E0B" />
        </svg>
      );
    case 'vercel':
      return (
        <svg viewBox="0 0 24 24" fill="#FFFFFF" className="w-3.5 h-3.5 inline-block shrink-0">
          <polygon points="12,3 22,21 2,21" />
        </svg>
      );
    case 'vite':
      return (
        <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 inline-block shrink-0">
          <path d="M12 2L2 19h20L12 2z" fill="#BD34FE" />
          <path d="M12 5l-4 9h5l-1 6 6-8h-5l4-7z" fill="#FFD600" />
        </svg>
      );
    case 'guest sync':
    case 'sync':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 inline-block shrink-0">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'ai recommendations':
    case 'ai':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 inline-block shrink-0">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
        </svg>
      );
    case 'razorpay sim':
    case 'razorpay':
      return (
        <svg viewBox="0 0 24 24" fill="#0080FF" className="w-3.5 h-3.5 inline-block shrink-0">
          <path d="M2 19h12l4-8-4-8H2l4 8-4 8z" />
        </svg>
      );
    case 'cloudinary':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" className="w-3.5 h-3.5 inline-block shrink-0">
          <path d="M12 2C9.5 2 7.4 3.7 6.7 6C4.1 6.5 2 8.7 2 11.5 2 14.5 4.5 17 7.5 17h9c3 0 5.5-2.5 5.5-5.5s-2.5-5.5-5.5-5.5c-.2 0-.4 0-.6.1C15.2 3.7 13.8 2 12 2z" />
        </svg>
      );
    case 'jwt':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="2" className="w-3.5 h-3.5 inline-block shrink-0">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4" />
          <circle cx="12" cy="16" r="1" fill="#F43F5E" />
        </svg>
      );
    default:
      return (
        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent-light dark:bg-brand-accent-dark inline-block shrink-0" />
      );
  }
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'web'>('all');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const filteredProjects = projects.filter((proj) => {
    if (activeTab === 'all') return true;
    return proj.category === activeTab;
  });

  const toggleExpandProject = (id: string) => {
    if (expandedProjectId === id) {
      setExpandedProjectId(null);
    } else {
      setExpandedProjectId(id);
    }
  };

  return (
    <section id="projects" className="py-24 bg-brand-bg-light dark:bg-brand-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left space-y-4 mb-20 max-w-3xl border-l-[3px] border-[#B497CF] pl-5">
          <span className="text-xs font-mono font-bold tracking-widest text-[#B497CF] uppercase block">
            Case Studies
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white mb-2" id="projects-title">
            Product <span className="font-display italic font-medium text-gradient-cosmic">Portfolio</span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base font-medium max-w-lg font-sans">
            Practical demonstrations of complex full-stack workflows, responsive interfaces, and direct AI integrations.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-start gap-2 mb-12" id="projects-filter-bar">
          {(['all', 'ai', 'web'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setExpandedProjectId(null);
              }}
              className={`px-5 py-2.5 text-xs font-black rounded-lg border-2 transition-all uppercase tracking-widest relative ${
                activeTab === tab
                  ? 'border-brand-accent-light dark:border-brand-accent-dark bg-brand-accent-light dark:bg-white text-white dark:text-neutral-900'
                  : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-805'
              }`}
              id={`filter-btn-${tab}`}
            >
              {tab === 'all' && 'All Projects'}
              {tab === 'ai' && 'AI & ML Solutions'}
              {tab === 'web' && 'Full-Stack Web'}
            </button>
          ))}
        </div>

        {/* Project Modular Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start" id="projects-showcase-grid">
          {filteredProjects.map((proj, idx) => {
            const isExpanded = expandedProjectId === proj.id;
            return (
              <motion.div
                key={proj.id}
                layout="position"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-brand-card-dark border border-neutral-200/50 dark:border-brand-border-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                id={`project-card-${proj.id}`}
              >
                {/* Thumbnail Display with relative overlays */}
                <div className="relative aspect-video w-full overflow-hidden group/thumb bg-neutral-100 dark:bg-neutral-900">
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-700 select-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent opacity-80" />

                  {/* Indicator Title */}
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-[#f8f8f8]">
                      {proj.category === 'ai' ? '🤖 AI Solution' : '⚡ Full-Stack Web'}
                    </span>
                    <h3 className="text-lg font-bold text-white font-display mt-0.5">
                      {proj.title}
                    </h3>
                  </div>
                </div>

                {/* Info summary */}
                <div className="p-6 text-left space-y-4">
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Reusable list of tags */}
                  <div className="flex flex-wrap gap-2 pt-1" id={`project-tech-pills-${proj.id}`}>
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-2 bg-[#121214] border border-neutral-800/80 rounded-md px-3 py-1.5 text-[10.5px] font-mono font-extrabold tracking-wider text-neutral-200 uppercase hover:border-neutral-700/60 hover:bg-[#161619] transition-all cursor-default shadow-sm shadow-black/40"
                      >
                        {getTechIcon(tag)}
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-neutral-100 dark:border-neutral-800/80 pt-4 flex items-center justify-between">
                    {/* Collapsible activator */}
                    <button
                      onClick={() => toggleExpandProject(proj.id)}
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-brand-accent-light dark:text-brand-accent-dark hover:underline"
                      id={`project-expand-btn-${proj.id}`}
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Case Study'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {/* Code connections */}
                    <div className="flex items-center space-x-3" id={`project-links-${proj.id}`}>
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
                          aria-label="View source on GitHub"
                          id={`project-github-link-${proj.id}`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
                          aria-label="Launch application live"
                          id={`project-live-link-${proj.id}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Case Study details collapsible pane */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-neutral-100 dark:border-neutral-850 bg-neutral-50/50 dark:bg-neutral-900/10 text-left"
                      id={`project-expanded-pane-${proj.id}`}
                    >
                      <div className="p-6 space-y-5">
                        <div className="space-y-1">
                          <h4 className="text-xs font-mono font-bold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
                            Challenge & Solution
                          </h4>
                          <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
                            {proj.longDescription}
                          </p>
                        </div>

                        {/* Bullets lists */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-mono font-bold tracking-wider text-brand-accent-light dark:text-brand-accent-dark uppercase">
                            Key Product Features
                          </h4>
                          <ul className="list-none space-y-2 text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm">
                            {proj.features.map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-start space-x-2">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 pt-0.5 shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
