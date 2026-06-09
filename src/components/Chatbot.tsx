import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Navigation, Loader2, Bot, User, HelpCircle } from 'lucide-react';
import { Theme } from '../hooks/useTheme';
import GlassSurface from './GlassSurface';

// Custom designed professional high-tech SVG Profile Icon matching the portfolio design
const OBAvatarIcon = ({ className = "w-full h-full" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="obGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFECA6" />
        <stop offset="60%" stopColor="#E2B04E" />
        <stop offset="100%" stopColor="#A87714" />
      </linearGradient>
      <linearGradient id="obBgrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#A87714" />
        <stop offset="100%" stopColor="#FFECA6" />
      </linearGradient>
    </defs>
    
    {/* Dark tech background plate inside the icon circle */}
    <circle cx="50" cy="50" r="48" fill="#0A0A0B" stroke="url(#obGrad)" strokeWidth="1.5" />
    
    {/* Futuristic outer segmented rings */}
    <circle cx="50" cy="50" r="42" fill="none" stroke="url(#obGrad)" strokeWidth="1.5" strokeDasharray="16 8" strokeLinecap="round" />
    <circle cx="50" cy="50" r="36" fill="none" stroke="url(#obBgrad)" strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
    
    {/* Monogram Letters "OB" linked by tech circuits */}
    {/* 'O' shape as an elegant tech loop */}
    <circle cx="40" cy="50" r="14" fill="none" stroke="url(#obGrad)" strokeWidth="4" strokeLinecap="round" />
    
    {/* 'B' shape beautifully overlapping with cyber-grid alignments */}
    <path
      d="M52,36 L52,64 M52,36 L61,36 C65.5,36 68,39 68,42.5 C68,46 65,49 60,50 L52,50 M52,50 L62,50 C67,50 69.5,53 69.5,57 C69.5,61 66,64 60,64 L52,64"
      fill="none"
      stroke="url(#obGrad)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    
    {/* Tech accents / microchip nodes linking OB */}
    <circle cx="40" cy="36" r="2.5" fill="#FFECA6" />
    <circle cx="40" cy="64" r="2.5" fill="#FFECA6" />
    <circle cx="60" cy="50" r="2" fill="#FFECA6" />
    <line x1="40" y1="36" x2="52" y2="36" stroke="url(#obGrad)" strokeWidth="1.5" opacity="0.8" />
  </svg>
);

interface ChatbotProps {
  activePart: string;
  setActivePart: (part: string) => void;
  theme: Theme;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const SUGGESTED_PROMPTS = [
  { text: '🎓 Where did Om study?', target: 'education' },
  { text: '🏆 Show me Om\'s certificates', target: 'certifications' },
  { text: '💼 What services does he offer?', target: 'services' },
  { text: '🎬 See his main projects', target: 'work' },
];

function getLocalClientFallback(message: string) {
  const msg = message.toLowerCase().trim().replace(/[?.,!;]/g, '');
  
  if (msg.includes('study') || msg.includes('education') || msg.includes('college') || msg.includes('school') || msg.includes('timeline') || msg.includes('diploma') || msg.includes('degree')) {
    return {
      reply: "Om Bhavsar is currently pursuing a Diploma in Artificial Intelligence & Machine Learning under the Maharashtra State Board of Technical Education (MSBTE) (2024 – 2027), and completed his Computer Programming Certification at I-Tech System in 2024. Let me show you his detailed academic timeline!",
      navigate: "education"
    };
  }
  
  if (msg.includes('cert') || msg.includes('qualification') || msg.includes('course') || msg.includes('ea') || msg.includes('sports') || msg.includes('deloitte')) {
    return {
      reply: "Om has earned excellent credentials, including EA Sports Software Engineering Job Simulation, Deloitte Australia Cybersecurity Job Simulation, and Java/Programming certifications. I've scrolled you down to the Credentials & Certificates section so you can view them!",
      navigate: "certifications"
    };
  }
  
  if (msg.includes('service') || msg.includes('offer') || msg.includes('solution') || msg.includes('pricing') || msg.includes('seo') || msg.includes('e-commerce') || msg.includes('landing')) {
    return {
      reply: "Om offers bespoke Full-Stack Development, Custom Website Creation, AI integrations (such as LLMs prompting and embeddings), SEO Optimization, and conversion-friendly Landing Pages. Let me show you his available Engineering Services!",
      navigate: "services"
    };
  }
  
  if (msg.includes('project') || msg.includes('work') || msg.includes('showcase') || msg.includes('thrift') || msg.includes('unicorn') || msg.includes('build')) {
    return {
      reply: "Some of Om's premier projects include 'My Thrift Crew' (a collaborative fashion-forward marketplace catalog) and 'Jersey Unicorn' (an e-commerce kit customizer powered by interactive AI recommendations). I will shift your view directly to his Projects work gallery!",
      navigate: "work"
    };
  }
  
  if (msg.includes('book') || msg.includes('schedule') || msg.includes('call') || msg.includes('calendar') || msg.includes('meeting') || msg.includes('talk') || msg.includes('appoin')) {
    return {
      reply: "I'd be thrilled to help you connect with Om for an interactive call or collaboration! Let me navigate you directly to his contact section where you can message him, send an email, or connect via social platforms.",
      navigate: "contact"
    };
  }

  if (msg.includes('experience') || msg.includes('intern') || msg.includes('softcrowd') || msg.includes('freelance') || msg.includes('job') || msg.includes('r-tech')) {
    return {
      reply: "Om works as an AI & ML Intern at SoftCrowd Technologies Nashik and as a Freelance Full-Stack Developer. Previously, he worked as a Frontend Developer at R-Tech Solutions where he overhauled corporate components. Let me redirect you to his Experience section!",
      navigate: "experience"
    };
  }

  if (msg.includes('skills') || msg.includes('tech') || msg.includes('python') || msg.includes('react') || msg.includes('typescript') || msg.includes('java') || msg.includes('database')) {
    return {
      reply: "Om is proficient in Python, Java, C++, Javascript, and TypeScript. His specialties include React, Tailwind CSS, Node.js, and Supabase integration. I have directed your window to his Skills panel!",
      navigate: "skills"
    };
  }

  if (msg.includes('contact') || msg.includes('reach') || msg.includes('phone') || msg.includes('whatsapp') || msg.includes('email') || msg.includes('number')) {
    return {
      reply: "You can reach out to Om Bhavsar directly using his email (ombhavsar552@gmail.com), calls/WhatsApp (+91 8208461469), or LinkedIn. Let me navigate you directly to his contact form section!",
      navigate: "contact"
    };
  }

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('who are you') || msg.includes('bot') || msg.includes('help')) {
    return {
      reply: "Hello! I am 'OB Assistant', Om's smart virtual helper. Ask me about his software projects, Machine Learning internships, certifications, academic path, or services!",
      navigate: ""
    };
  }

  return {
    reply: "As Om's personal AI digital assistant, I can tell you about his AI/ML algorithms research, Full-Stack applications (like Jersey Unicorn or My Thrift Crew), education background, and freelance web services. What would you like to inquire about?",
    navigate: ""
  };
}

export default function Chatbot({
  activePart,
  setActivePart,
  theme
}: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I am OB Assistant, your guide to Om's professional background, experiences, and developer portfolio. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    try {
      // Build conversation history format for API
      const history = messages.slice(-4).map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Server responded with an error');
      }

      const botMessage: Message = {
        id: `msg-bot-${Date.now()}`,
        sender: 'assistant',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);

      if (data.navigate) {
        handleNavigation(data.navigate);
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.warn('⚠️ Server-side chat query failed or took too long. Running smart offline fallback:', err);
      
      const offlineRes = getLocalClientFallback(textToSend);
      
      const botMessage: Message = {
        id: `msg-fallback-${Date.now()}`,
        sender: 'assistant',
        text: offlineRes.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);

      if (offlineRes.navigate) {
        handleNavigation(offlineRes.navigate);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = (target: string) => {
    if (!target) return;

    // Set activePart based on target section
    if (target === 'education') {
      setActivePart('about');
    } else if (target === 'certifications') {
      setActivePart('skills');
    } else if (target === 'services') {
      setActivePart('contact');
    } else if (target === 'achievements') {
      setActivePart('home');
    } else {
      setActivePart(target); // visible top tabs
    }

    // Smooth scroll offset after component mounting
    setTimeout(() => {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 450);
  };

  const handleSuggestedClick = (text: string, target: string) => {
    handleNavigation(target);
    const userMsg: Message = {
      id: `msg-user-suggest-${Date.now()}`,
      sender: 'user',
      text: `${text.substring(2)} (Navigating to section...)`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const botMsg: Message = {
      id: `msg-bot-suggest-${Date.now()}`,
      sender: 'assistant',
      text: `Certainly! I've automatically updated your view and scrolled you straight to the ${target.charAt(0).toUpperCase() + target.slice(1)} section. What else would you like to know about Om?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  return (
    <>
      {/* Floating Chat Trigger Button with Golden Hue Accent */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl bg-gradient-to-r from-neutral-900 to-neutral-950 dark:from-[#E2B04E] dark:to-[#C28E12] text-white dark:text-neutral-950 hover:scale-115 transition-transform duration-300 focus:outline-none border border-neutral-200/20 dark:border-white/10"
        aria-label="OB Assistant Companion"
        id="chatbot-trigger-btn"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-semibold bg-emerald-500 rounded-full border-2 border-white dark:border-neutral-900 animate-pulse" />
          </div>
        )}
      </button>

      {/* Main Chatbot Floating Window Panel with custom animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92%] sm:w-[380px] h-[500px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-neutral-200/50 dark:border-neutral-800/80 bg-white/95 dark:bg-[#070708]/96 backdrop-blur-xl"
            id="chatbot-window-panel"
          >
            {/* Elegant Header with custom OB Assistant badge & "online" status beneath */}
            <div className="px-4 py-4 bg-neutral-950 border-b border-neutral-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-10 h-10 rounded-full shrink-0">
                  <OBAvatarIcon className="w-10 h-10" />
                </div>
                <div className="flex flex-col">
                  {/* Name of Chatbot - OB Assistant with online status */}
                  <span className="font-sans font-extrabold text-sm tracking-wide text-white" id="chatbot-badge-name">
                    OB Assistant
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold uppercase tracking-widest mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors"
                aria-label="Close Chat Window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Flow Display Container */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 text-left custom-scrollbar">
              {messages.map((msg) => {
                const isBot = msg.sender === 'assistant';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isBot ? 'justify-start' : 'justify-end'} items-start space-x-2`}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-full shrink-0">
                        <OBAvatarIcon className="w-7 h-7" />
                      </div>
                    )}
                    <div className="max-w-[80%] flex flex-col">
                      <div
                        className={`text-sm px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                          isBot
                            ? 'bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/30 dark:border-neutral-800/40 text-neutral-800 dark:text-neutral-200 rounded-tl-none font-medium'
                            : 'bg-neutral-950 dark:bg-[#E2B04E] text-white dark:text-neutral-950 rounded-tr-none font-semibold'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-neutral-400 dark:text-neutral-500 font-mono mt-1 px-1 self-start">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Loader Animated Bubble */}
              {isLoading && (
                <div className="flex justify-start items-start space-x-2">
                  <div className="w-7 h-7 rounded-full shrink-0 animate-pulse">
                    <OBAvatarIcon className="w-7 h-7" />
                  </div>
                  <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/30 dark:border-neutral-800/40 text-neutral-500 dark:text-neutral-400 text-sm px-4 py-3 rounded-2xl rounded-tl-none flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#E2B04E]" />
                    <span className="font-bold tracking-wide">OB Assistant is thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick suggested quick links / navigational prompts option panel */}
            <div className="p-3 bg-neutral-50/50 dark:bg-neutral-950/40 border-t border-neutral-200/30 dark:border-neutral-800/50 text-left">
              <span className="text-[9.5px] font-mono text-neutral-400 dark:text-neutral-400 font-bold uppercase tracking-wider block mb-2">
                Quick Navigation & Questions:
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-[82px] overflow-y-auto py-0.5 custom-scrollbar">
                {SUGGESTED_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedClick(prompt.text, prompt.target)}
                    className="flex items-center gap-1 text-[10.5px] font-semibold px-2.5 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-[#E2B04E] dark:hover:border-[#E2B04E] text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-[#E2B04E] transition-all cursor-pointer shadow-xs select-none"
                    id={`chatbot-suggestion-${index}`}
                  >
                    <span>{prompt.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Input Section bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3.5 bg-white dark:bg-[#070708] border-t border-neutral-250/20 dark:border-neutral-800/60 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Om's ML experience..."
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-250/60 dark:border-neutral-800/80 rounded-full text-xs font-medium text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-[#E2B04E] focus:border-[#E2B04E] transition-all"
                id="chatbot-msg-input"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 rounded-full bg-neutral-950 dark:bg-[#E2B04E] text-white dark:text-neutral-950 disabled:opacity-40 disabled:hover:scale-100 hover:scale-105 transition-all outline-none flex items-center justify-center cursor-pointer"
                id="chatbot-msg-send-btn"
                aria-label="Send Message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
