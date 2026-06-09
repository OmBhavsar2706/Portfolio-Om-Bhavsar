import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Github, Mail, Phone, ArrowUpRight, MessageSquare, Copy, Check } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import LightRays from './LightRays';
import { useTheme } from '../hooks/useTheme';
import { ParticleCard, GlobalSpotlight, BentoCardGrid } from './MagicBento';

export default function ContactCTA() {
  const [copied, setCopied] = React.useState<string | null>(null);
  const { theme } = useTheme();
  const contactGridRef = React.useRef<HTMLDivElement | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => {
      setCopied(null);
    }, 2000);
  };

  const contacts = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      value: 'Om Bhavsar',
      label: 'Connect & Network',
      href: 'https://www.linkedin.com/in/ombhavsar2706/',
      icon: Linkedin,
      color: 'text-[#0077B5] dark:text-[#60A5FA]',
      accentBg: 'bg-[#0077B5]/15 dark:bg-[#0077B5]/25',
      borderColor: 'hover:border-[#0077B5]/40'
    },
    {
      id: 'github',
      name: 'GitHub',
      value: 'OmBhavsar2706',
      label: 'Explore Code Repositories',
      href: 'https://github.com/OmBhavsar2706',
      icon: Github,
      color: 'text-neutral-800 dark:text-neutral-100',
      accentBg: 'bg-neutral-200/60 dark:bg-neutral-800',
      borderColor: 'hover:border-neutral-500/40'
    },
    {
      id: 'email',
      name: 'Email Address',
      value: 'ombhavsar552@gmail.com',
      label: 'Inquire Directly',
      href: 'mailto:ombhavsar552@gmail.com',
      icon: Mail,
      color: 'text-[#C5922C] dark:text-[#E2B04E]',
      accentBg: 'bg-[#E2B04E]/15 dark:bg-[#E2B04E]/25',
      borderColor: 'hover:border-[#E2B04E]/40',
      copyValue: 'ombhavsar552@gmail.com'
    },
    {
      id: 'phone',
      name: 'Phone Number',
      value: '+91 8208461469',
      label: 'Instant Communication',
      href: 'tel:8208461469',
      icon: Phone,
      color: 'text-emerald-750 dark:text-emerald-400',
      accentBg: 'bg-emerald-500/15 dark:bg-emerald-500/25',
      borderColor: 'hover:border-emerald-500/40',
      copyValue: '8208461469'
    }
  ];

  const raysColor = theme === 'dark' ? '#E2B04E' : '#b45309';

  return (
    <section id="contact-cta" className="py-24 relative overflow-hidden bg-white dark:bg-brand-bg-dark border-t border-neutral-100 dark:border-brand-border-dark/60">
      {/* LightRays Interactive Background Component */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-20">
        <LightRays
          raysOrigin="top-center"
          raysColor={raysColor}
          raysSpeed={1.0}
          lightSpread={0.6}
          rayLength={1.4}
          followMouse={true}
          mouseInfluence={0.06}
          noiseAmount={0.02}
          distortion={0.04}
        />
      </div>

      {/* Decorative premium radial gradients */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-accent-light/5 dark:bg-brand-accent-dark/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/5 dark:bg-[#E2B04E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 select-none">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Pitch */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-mono font-black tracking-widest text-[#E2B04E] dark:text-[#E2B04E] uppercase block">
                Let's Build Together
              </span>
              <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tighter uppercase text-neutral-900 dark:text-white leading-none">
                Start a Live <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-400 dark:from-white dark:via-neutral-300 dark:to-neutral-550">
                  Project Discussion
                </span>
              </h2>
              <p className="text-neutral-500 dark:text-neutral-450 text-sm leading-relaxed max-w-md">
                Have a project idea, business requirement, or freelance workflow in mind? Connect across your favorite platforms or reach out directly via call or email for immediate professional evaluation.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://wa.me/918208461469"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/10 active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Message on WhatsApp</span>
              </a>
              <a
                href="mailto:ombhavsar552@gmail.com"
                className="inline-flex items-center space-x-2 bg-neutral-950 hover:bg-neutral-850 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all active:scale-95 border border-transparent dark:border-neutral-800"
              >
                <span>Hire Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Cards Grid with MagicBento functionality */}
          <GlobalSpotlight
            gridRef={contactGridRef}
            enabled={true}
            spotlightRadius={300}
            glowColor="226, 176, 78"
          />
          <BentoCardGrid
            gridRef={contactGridRef}
            className="lg:col-span-7 !grid !grid-cols-1 sm:!grid-cols-2 !gap-3 !p-0 !max-w-none !font-sans !bg-transparent"
          >
            {contacts.map((contact) => {
              const IconComponent = contact.icon;
              return (
                <ParticleCard
                  key={contact.id}
                  className={`magic-bento-card magic-bento-card--border-glow group relative flex flex-col justify-between !p-4 rounded-xl bg-neutral-50 dark:bg-brand-card-dark border border-neutral-200/40 dark:border-brand-border-dark shadow-sm hover:bg-white dark:hover:bg-brand-card-dark/90 hover:shadow-md transition-all duration-300 ${contact.borderColor} !aspect-auto !min-h-0 !w-full !max-w-none !font-sans`}
                  style={{
                    '--glow-color': '226, 176, 78'
                  } as React.CSSProperties}
                  particleCount={8}
                  glowColor="226, 176, 78"
                  enableTilt={true}
                  clickEffect={true}
                  enableMagnetism={true}
                >
                  <div className="flex items-start justify-between">
                    {/* Icon frame */}
                    <div className={`p-2.5 rounded-lg transition-colors ${contact.accentBg} ${contact.color}`}>
                      <IconComponent className="w-5 h-5 shrink-0" />
                    </div>

                    {/* Meta Action Buttons */}
                    <div className="flex items-center space-x-2">
                      {contact.copyValue && (
                        <button
                          onClick={() => handleCopy(contact.copyValue!, contact.id)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                          title={`Copy ${contact.name}`}
                          aria-label={`Copy ${contact.name}`}
                        >
                          {copied === contact.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                      
                      <a
                        href={contact.href}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                        aria-label={`Launch ${contact.name}`}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="mt-4 text-left">
                    <p className="text-[10px] font-mono font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                      {contact.label}
                    </p>
                    <h3 className="text-[11px] font-mono text-[#E2B04E] dark:text-[#E2B04E] font-medium uppercase tracking-wide mt-0.5">
                      {contact.name}
                    </h3>
                    <a
                      href={contact.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block text-sm font-bold font-sans text-neutral-850 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors mt-1 truncate max-w-full"
                    >
                      {contact.value}
                    </a>
                  </div>
                </ParticleCard>
              );
            })}
          </BentoCardGrid>

        </div>
      </div>
    </section>
  );
}
