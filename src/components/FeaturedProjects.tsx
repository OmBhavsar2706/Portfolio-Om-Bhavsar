import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  Settings, 
  Upload, 
  Link2, 
  Globe, 
  RotateCw, 
  Sparkles, 
  Undo2,
  CheckCircle2,
  Lock
} from 'lucide-react';

const PRESETS_P1 = [
  {
    name: 'Vintage Wear',
    url: '/projects/thrift_crew.jpg'
  },
  {
    name: 'Store Display',
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Retro Wardrobe',
    url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Concept Retail',
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'
  }
];

const PRESETS_P2 = [
  {
    name: 'Retro Jersey Customizer',
    url: '/projects/jersey_unicorn.png'
  },
  {
    name: 'Soccer Kit Theme',
    url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Teal Sports Collection',
    url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Uniform Showcase',
    url: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function FeaturedProjects() {
  // ------------ PROJECT 1 STATE ------------
  const [p1Title, setP1Title] = useState(() => {
    return localStorage.getItem('featured_p1_title') || localStorage.getItem('featured_proj_title') || 'My Thrift Crew';
  });
  const [p1Desc, setP1Desc] = useState(() => {
    return localStorage.getItem('featured_p1_desc') || localStorage.getItem('featured_proj_desc') || 'A premium fashion-forward collaborative thrift catalog and vintage apparel marketplace, enabling teams to showcase and curate hand-picked aesthetic clothing lines with sub-second responsive performance and modern layout.';
  });
  const [p1Link, setP1Link] = useState(() => {
    return localStorage.getItem('featured_p1_link') || localStorage.getItem('featured_proj_link') || 'https://thrift-crew.vercel.app/';
  });
  const [p1Thumb, setP1Thumb] = useState(() => {
    const val = localStorage.getItem('featured_p1_thumb') || localStorage.getItem('featured_proj_thumb');
    if (val && val.includes('photo-1489987707025-afc232f7ea0f')) {
      return PRESETS_P1[0].url;
    }
    return val || PRESETS_P1[0].url;
  });

  // ------------ PROJECT 2 STATE ------------
  const [p2Title, setP2Title] = useState(() => {
    return localStorage.getItem('featured_p2_title') || 'Jersey Unicorn';
  });
  const [p2Desc, setP2Desc] = useState(() => {
    return localStorage.getItem('featured_p2_desc') || 'A high-end sports apparel customizer and premium e-commerce platform specializing in exclusive vintage jersey collections and AI-driven kit customization recommendations.';
  });
  const [p2Link, setP2Link] = useState(() => {
    return localStorage.getItem('featured_p2_link') || 'https://www.jerseyunicorn.com/';
  });
  const [p2Thumb, setP2Thumb] = useState(() => {
    const val = localStorage.getItem('featured_p2_thumb');
    if (val && val.includes('photo-1541534741688-6078c6bfb5c5')) {
      return PRESETS_P2[0].url;
    }
    return val || PRESETS_P2[0].url;
  });

  // ------------ CONTROLS & UTILITIES ------------
  const [isSettings1Open, setIsSettings1Open] = useState(false);
  const [isSettings2Open, setIsSettings2Open] = useState(false);

  const [isDragging1, setIsDragging1] = useState(false);
  const [isDragging2, setIsDragging2] = useState(false);

  const [saveSuccess1, setSaveSuccess1] = useState(false);
  const [saveSuccess2, setSaveSuccess2] = useState(false);

  const fileInput1Ref = useRef<HTMLInputElement>(null);
  const fileInput2Ref = useRef<HTMLInputElement>(null);

  // SAVE & RESET PROJECT 1
  const handleSaveP1 = () => {
    localStorage.setItem('featured_p1_title', p1Title);
    localStorage.setItem('featured_p1_desc', p1Desc);
    localStorage.setItem('featured_p1_link', p1Link);
    localStorage.setItem('featured_p1_thumb', p1Thumb);
    setSaveSuccess1(true);
    setTimeout(() => setSaveSuccess1(false), 2000);
  };

  const handleResetP1 = () => {
    if (window.confirm('Do you want to restore original Project 1 settings?')) {
      const defaultTitle = 'My Thrift Crew';
      const defaultDesc = 'A premium fashion-forward collaborative thrift catalog and vintage apparel marketplace, enabling teams to showcase and curate hand-picked aesthetic clothing lines with sub-second responsive performance and modern layout.';
      const defaultLink = 'https://thrift-crew.vercel.app/';
      const defaultThumb = PRESETS_P1[0].url;

      setP1Title(defaultTitle);
      setP1Desc(defaultDesc);
      setP1Link(defaultLink);
      setP1Thumb(defaultThumb);

      localStorage.setItem('featured_p1_title', defaultTitle);
      localStorage.setItem('featured_p1_desc', defaultDesc);
      localStorage.setItem('featured_p1_link', defaultLink);
      localStorage.setItem('featured_p1_thumb', defaultThumb);

      setSaveSuccess1(true);
      setTimeout(() => setSaveSuccess1(false), 1500);
    }
  };

  // SAVE & RESET PROJECT 2
  const handleSaveP2 = () => {
    localStorage.setItem('featured_p2_title', p2Title);
    localStorage.setItem('featured_p2_desc', p2Desc);
    localStorage.setItem('featured_p2_link', p2Link);
    localStorage.setItem('featured_p2_thumb', p2Thumb);
    setSaveSuccess2(true);
    setTimeout(() => setSaveSuccess2(false), 2000);
  };

  const handleResetP2 = () => {
    if (window.confirm('Do you want to restore original Project 2 settings?')) {
      const defaultTitle = 'Jersey Unicorn';
      const defaultDesc = 'A high-end sports apparel customizer and premium e-commerce platform specializing in exclusive vintage jersey collections and AI-driven kit customization recommendations.';
      const defaultLink = 'https://www.jerseyunicorn.com/';
      const defaultThumb = PRESETS_P2[0].url;

      setP2Title(defaultTitle);
      setP2Desc(defaultDesc);
      setP2Link(defaultLink);
      setP2Thumb(defaultThumb);

      localStorage.setItem('featured_p2_title', defaultTitle);
      localStorage.setItem('featured_p2_desc', defaultDesc);
      localStorage.setItem('featured_p2_link', defaultLink);
      localStorage.setItem('featured_p2_thumb', defaultThumb);

      setSaveSuccess2(true);
      setTimeout(() => setSaveSuccess2(false), 1500);
    }
  };

  // FILE UPLOADER UTILS FOR PROJECT 1
  const processFile1 = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        setP1Thumb(e.target.result);
        localStorage.setItem('featured_p1_thumb', e.target.result);
        setSaveSuccess1(true);
        setTimeout(() => setSaveSuccess1(false), 1500);
      }
    };
    reader.readAsDataURL(file);
  };

  // FILE UPLOADER UTILS FOR PROJECT 2
  const processFile2 = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        setP2Thumb(e.target.result);
        localStorage.setItem('featured_p2_thumb', e.target.result);
        setSaveSuccess2(true);
        setTimeout(() => setSaveSuccess2(false), 1500);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="featured-projects" className="py-24 bg-white dark:bg-brand-bg-dark border-b border-brand-border-light/40 dark:border-brand-border-dark/40 relative overflow-hidden">
      {/* Background radial elements */}
      <div className="absolute top-1/4 right-[5%] w-[450px] h-[450px] bg-brand-accent-light/5 dark:bg-brand-accent-dark/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute top-3/4 left-[5%] w-[400px] h-[400px] bg-violet-500/5 dark:bg-violet-500/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left space-y-3 mb-20 border-l-4 border-brand-accent-light dark:border-brand-accent-dark pl-4">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-accent-light dark:text-brand-accent-dark uppercase block">
            Featured Spotlight
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-neutral-900 dark:text-white capitalize">
            Featured Projects
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-2xl">
            A premium immersive look at my top commercial launch deployments and customized commercial solutions.
          </p>
        </div>

        {/* PROJECTS CONTAINER */}
        <div className="space-y-32">

          {/* ================= PROJECT 1 ROW ================= */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Browser Frame (Cols 1-7) */}
              <div className="lg:col-span-7 flex flex-col space-y-3">
                <div 
                  id="p1-browser-window"
                  className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group cursor-pointer"
                >
                  {/* Browser simulated bar */}
                  <div className="bg-neutral-950 px-4 py-3 flex items-center justify-between border-b border-neutral-850 select-none">
                    <div className="flex items-center space-x-1.5 w-20">
                      <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                    </div>

                    <a 
                      href={p1Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-neutral-900 hover:bg-neutral-850 px-3.5 py-1.5 rounded-lg text-[11px] font-mono tracking-tight text-neutral-400 hover:text-white transition-all w-full max-w-md justify-center border border-neutral-800/85"
                    >
                      <Lock className="w-3 h-3 text-emerald-500" />
                      <span className="truncate">{p1Link.replace('https://', '')}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>

                    <div className="flex items-center justify-end space-x-3 w-20 text-neutral-400 text-xs">
                      <RotateCw className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                      <Globe className="w-3.5 h-3.5 hidden sm:block" />
                    </div>
                  </div>

                  {/* Browser Webpage Frame Display Canvas */}
                  <a 
                    href={p1Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block aspect-[16/10] overflow-hidden bg-neutral-950 focus:outline-none"
                  >
                    <motion.img 
                      src={p1Thumb} 
                      alt={p1Title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    />
                    <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/95 dark:bg-[#111827]/95 text-neutral-900 dark:text-white backdrop-blur-md px-5 py-2.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase shadow-xl flex items-center space-x-2 border border-white/20">
                        <span>Launch Live Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md border border-white/10 px-3 py-1 rounded-md flex items-center space-x-1.5 text-[10px] font-mono font-bold tracking-wide text-white">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>SPOTLIGHT I</span>
                    </div>
                  </a>
                </div>

                {/* Browser frame shadow spacer */}
                <div className="h-2" />
              </div>

              {/* Right Column: Project Details (Cols 8-12) */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="bg-neutral-50 dark:bg-brand-card-dark/60 border border-neutral-200/50 dark:border-brand-border-dark/50 rounded-2xl p-8 space-y-6">
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-400 font-semibold tracking-wide">
                      Demo Project
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-neutral-900 dark:text-white">
                    {p1Title}
                  </h3>

                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                    {p1Desc}
                  </p>

                  <div className="space-y-2 border-t border-neutral-200/50 dark:border-brand-border-dark/50 pt-4 text-xs text-neutral-500 dark:text-neutral-400 font-medium col-span-full">
                    <div className="flex items-start space-x-2">
                      <span className="text-brand-accent-light dark:text-brand-accent-dark text-lg font-black leading-none">•</span>
                      <span>Collaborative vintage boards – Allow community design teams dynamically to showcase and curate hand-picked listings.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-brand-accent-light dark:text-brand-accent-dark text-lg font-black leading-none">•</span>
                      <span>Sub-second layout searching – Fast query indexing, responsive tags, and instant filter updates across clients.</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={p1Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-brand-accent-light dark:bg-white text-white dark:text-neutral-950 font-mono text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-md group"
                    >
                      <span>Explore Project Workspace</span>
                      <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                </div>
              </div>

            </div>

          </div>

          {/* ================= PROJECT 2 ROW ================= */}
          {/* Symmetrical / Alternating structure for Project 2 */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Symmetrical layout on large display with Alternating order: content on left, browser image on right */}
              {/* Right Column: Project Details (Cols 1-5) */}
              <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
                <div className="bg-neutral-50 dark:bg-brand-card-dark/60 border border-neutral-200/50 dark:border-brand-border-dark/50 rounded-2xl p-8 space-y-6">
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-400 font-semibold tracking-wide">
                      Live Website (Sold to Client)
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-neutral-900 dark:text-white">
                    {p2Title}
                  </h3>

                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                    {p2Desc}
                  </p>

                  <div className="space-y-2 border-t border-neutral-200/50 dark:border-brand-border-dark/50 pt-4 text-xs text-neutral-500 dark:text-neutral-400 font-medium col-span-full">
                    <div className="flex items-start space-x-2">
                      <span className="text-brand-accent-light dark:text-brand-accent-dark text-lg font-black leading-none">•</span>
                      <span>Real-time customizer previews – Supports dynamic names, customizable numbering fonts, and real-time kit collar presets.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-brand-accent-light dark:text-brand-accent-dark text-lg font-black leading-none">•</span>
                      <span>AI Palette Stylist – Adaptive client helper to advise on matching custom shorts and sock suggestions inside the checkout drawer.</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={p2Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-brand-accent-light dark:bg-white text-white dark:text-neutral-950 font-mono text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-md group"
                    >
                      <span>Explore Project Workspace</span>
                      <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>

                </div>
              </div>

              {/* Left Column: Browser Frame (Cols 6-12) */}
              <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col space-y-3">
                <div 
                  id="p2-browser-window"
                  className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group cursor-pointer"
                >
                  {/* Browser simulated bar */}
                  <div className="bg-neutral-950 px-4 py-3 flex items-center justify-between border-b border-neutral-850 select-none">
                    <div className="flex items-center space-x-1.5 w-20">
                      <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                    </div>

                    <a 
                      href={p2Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-neutral-900 hover:bg-neutral-850 px-3.5 py-1.5 rounded-lg text-[11px] font-mono tracking-tight text-neutral-400 hover:text-white transition-all w-full max-w-md justify-center border border-neutral-800/85"
                    >
                      <Lock className="w-3 h-3 text-emerald-500" />
                      <span className="truncate">{p2Link.replace('https://', '')}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>

                    <div className="flex items-center justify-end space-x-3 w-20 text-neutral-400 text-xs">
                      <RotateCw className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                      <Globe className="w-3.5 h-3.5 hidden sm:block" />
                    </div>
                  </div>

                  {/* Browser Webpage Frame Display Canvas */}
                  <a 
                    href={p2Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block aspect-[16/10] overflow-hidden bg-neutral-950 focus:outline-none"
                  >
                    <motion.img 
                      src={p2Thumb} 
                      alt={p2Title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    />
                    <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/95 dark:bg-[#111827]/95 text-neutral-900 dark:text-white backdrop-blur-md px-5 py-2.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase shadow-xl flex items-center space-x-2 border border-white/20">
                        <span>Launch Live Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md border border-white/10 px-3 py-1 rounded-md flex items-center space-x-1.5 text-[10px] font-mono font-bold tracking-wide text-white">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>SPOTLIGHT II</span>
                    </div>
                  </a>
                </div>

                {/* Browser frame shadow spacer */}
                <div className="h-2" />
              </div>

            </div>


          </div>

        </div>

      </div>
    </section>
  );
}
