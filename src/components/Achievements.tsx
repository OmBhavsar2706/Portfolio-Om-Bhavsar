import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Code2, Users, Lightbulb, Settings, Award } from 'lucide-react';
import { statistics } from '../data/portfolio';

interface CounterProps {
  value: number;
  duration?: number;
}

function AnimatedCounter({ value, duration = 1.2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(countRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalMilliseconds = duration * 1000;
    const intervalTime = Math.max(Math.floor(totalMilliseconds / end), 25);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={countRef}>{count}</span>;
}

export default function Achievements() {
  // Map icons dynamically to matches
  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'projects built':
        return (
          <motion.div
            animate={{ 
              scale: [1, 1.08, 1], 
              filter: [
                "drop-shadow(0 0 0px rgba(59, 130, 246, 0))", 
                "drop-shadow(0 0 8px rgba(59, 130, 246, 0.35))", 
                "drop-shadow(0 0 0px rgba(59, 130, 246, 0))"
              ]
            }}
            transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
          >
            <Code2 className="w-6 h-6 text-blue-500" />
          </motion.div>
        );
      case 'freelance clients':
        return (
          <motion.div
            animate={{ 
              rotate: [0, -3, 3, 0],
              y: [0, -2, 0]
            }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.3 }}
          >
            <Users className="w-6 h-6 text-purple-500" />
          </motion.div>
        );
      case 'technologies used':
        return (
          <div className="relative w-6 h-6 flex items-center justify-center">
            <motion.div
              animate={{ 
                opacity: [0.75, 1, 0.75],
                scale: [0.97, 1.03, 0.97]
              }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <Lightbulb className="w-6 h-6 text-amber-500" />
            </motion.div>
            <Settings 
              className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 absolute -top-1 -right-1 animate-spin" 
              style={{ animationDuration: '6s' }} 
            />
          </div>
        );
      case 'experience':
      default:
        return (
          <motion.div
            animate={{ 
              y: [0, -3, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.6 }}
          >
            <Award className="w-6 h-6 text-emerald-500" />
          </motion.div>
        );
    }
  };

  return (
    <section id="achievements" className="py-20 bg-neutral-50 dark:bg-[#090d18] border-b border-brand-border-light/40 dark:border-brand-border-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-accent-light dark:text-brand-accent-dark uppercase block mb-2">
            Overview
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium tracking-normal text-neutral-900 dark:text-white capitalize">
            Quick Stats
          </h2>
        </div>
        
        {/* Achievements Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12" id="achievements-grid">
          {statistics.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="flex flex-col items-center text-center p-6 bg-white dark:bg-brand-card-dark rounded-xl border border-neutral-200/40 dark:border-brand-border-dark shadow-sm group"
              id={`stat-card-${idx}`}
            >
              {/* Dynamic Icon */}
              <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl mb-4 border border-neutral-100 dark:border-neutral-700/50 group-hover:scale-105 transition-transform">
                {getIcon(stat.label)}
              </div>

              {/* Counter Display with suffix */}
              <div className="flex items-baseline justify-center text-4xl sm:text-5xl font-black text-neutral-900 dark:text-white font-display tracking-tighter">
                {stat.prefix && <span>{stat.prefix}</span>}
                <AnimatedCounter value={stat.value} />
                {stat.suffix && <span className="text-brand-accent-light dark:text-brand-accent-dark ml-0.5">{stat.suffix}</span>}
              </div>

              {/* Label */}
              <p className="text-[10px] uppercase font-black text-neutral-500 dark:text-neutral-450 tracking-widest mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
