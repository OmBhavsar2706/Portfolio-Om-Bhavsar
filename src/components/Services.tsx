import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  Layout,
  Cpu,
  TrendingUp,
  RefreshCw,
  ShoppingBag,
  Smartphone,
  Briefcase,
  Check,
  ChevronRight
} from 'lucide-react';
import { services } from '../data/portfolio';

// Quick dynamic lookup map for static Lucide components
const iconMap: Record<string, any> = {
  Layers,
  Layout,
  Cpu,
  TrendingUp,
  RefreshCw,
  ShoppingBag,
  Smartphone,
  Briefcase
};

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 bg-white dark:bg-brand-card-dark border-t border-b border-brand-border-light/40 dark:border-brand-border-dark/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left space-y-3 mb-16 max-w-3xl border-l-4 border-brand-accent-light dark:border-brand-accent-dark pl-4">
          <span className="text-xs font-mono font-black tracking-widest text-brand-accent-light dark:text-brand-accent-dark uppercase block">
            Solutions Offered
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter uppercase text-neutral-900 dark:text-white" id="services-title">
            Engineering Services
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            High-end software capabilities and deep algorithmic integrations tailored strictly to modern commercial workloads.
          </p>
        </div>

        {/* 8 Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="services-grid">
          {services.map((srv, idx) => {
            const IconComponent = iconMap[srv.icon] || Briefcase;
            const isHovered = hoveredIndex === idx;

            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="p-6 bg-brand-bg-light dark:bg-brand-bg-dark rounded-xl border border-neutral-200/50 dark:border-brand-border-dark flex flex-col justify-between hover:border-brand-accent-light/40 dark:hover:border-brand-accent-dark/40 hover:shadow-sm transition-all group relative overflow-hidden"
                id={`service-card-${srv.id}`}
              >
                {/* Subtle light mode glow backing */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-accent-light/5 dark:from-brand-accent-dark/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4">
                  {/* Glowing Icon Shield */}
                  <div className="p-3 w-max bg-white dark:bg-neutral-800 text-brand-accent-light dark:text-brand-accent-dark rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-700/50 group-hover:bg-brand-accent-light group-hover:text-white dark:group-hover:bg-brand-accent-dark transition-all duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <div className="text-left space-y-1">
                    <h3 className="text-sm font-bold text-neutral-800 dark:text-neutral-100 font-display">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-sans min-h-[64px]">
                      {srv.description}
                    </p>
                  </div>

                  {/* Bullet deliverable points */}
                  <div className="border-t border-neutral-200/40 dark:border-neutral-800/60 pt-4 text-left">
                    <ul className="space-y-2">
                      {srv.features.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center space-x-2 text-[11px] font-medium text-neutral-600 dark:text-neutral-400">
                          <Check className="w-3.5 h-3.5 text-brand-accent-light dark:text-brand-accent-dark shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Subtle bottom action indicator */}
                <div className="mt-5 flex justify-end">
                  <span className="inline-flex items-center space-x-1 text-[10px] font-mono tracking-wider uppercase text-neutral-400 dark:text-neutral-500 group-hover:text-brand-accent-light dark:group-hover:text-brand-accent-dark transition-colors">
                    <span>Contact Details</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
