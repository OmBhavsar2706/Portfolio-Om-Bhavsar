import React from 'react';
import { Github, Linkedin, Mail, ArrowUp, MessageSquare, ShieldAlert } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

interface FooterProps {
  setActivePart?: (part: string) => void;
}

export default function Footer({ setActivePart }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleFooterLinkClick = (e: React.MouseEvent<HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    if (setActivePart) {
      setActivePart(targetId);
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const socialLinks = [
    { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn Connection" },
    { icon: Github, href: personalInfo.github, label: "GitHub Profile" },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email Link" },
  ];

  const footerLinksData = [
    { name: 'Home View', id: 'home' },
    { name: 'About Overview', id: 'about' },
    { name: 'Experience Milestones', id: 'experience' },
    { name: 'Technical Skills', id: 'skills' },
    { name: 'Work Showcase', id: 'work' },
    { name: 'Contact & Services', id: 'contact' },
  ];

  return (
    <footer className="bg-neutral-50 dark:bg-[#070708] border-t border-neutral-200 dark:border-[#1E1E21] pt-16 pb-12 text-left relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start text-left pb-12 border-b border-neutral-200/50 dark:border-neutral-800/50">
          
          {/* Col 1: Bio */}
          <div className="md:col-span-6 space-y-4">
            <span className="flex items-center space-x-1 select-none">
              <span className="font-display text-4xl font-extrabold text-[#E2B04E] dark:text-[#E2B04E] uppercase tracking-tighter transition-transform">
                O
              </span>
              <span className="font-display text-4xl font-extrabold text-neutral-900 dark:text-white uppercase tracking-tighter transition-transform italic -ml-1">
                B
              </span>
            </span>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm max-w-sm leading-relaxed font-sans font-light">
              AI Engineer and Full Stack Developer. Designing clean, professional enterprise solutions, robust prompt strategies, and responsive high-performing web tools.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[10px] font-mono font-black tracking-widest text-[#E2B04E] uppercase">
              Quick Portals
            </h4>
            <ul className="space-y-2" id="footer-links-list">
              {footerLinksData.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={(e) => handleFooterLinkClick(e, link.id)}
                    className="text-xs text-neutral-500 dark:text-neutral-450 hover:text-[#E2B04E] dark:hover:text-[#E2B04E] transition-all font-sans font-normal border-none p-0 bg-transparent text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Social Connections */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-mono font-black tracking-widest text-[#E2B04E] uppercase">
              Connect Online
            </h4>
            <div className="flex gap-2" id="footer-social-icons">
              {socialLinks.map((soc, sIdx) => {
                const IconComp = soc.icon;
                return (
                  <a
                    key={sIdx}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-white dark:bg-[#111112] border border-neutral-200 dark:border-[#1E1E21] rounded-lg text-neutral-500 dark:text-neutral-450 hover:text-[#E2B04E] dark:hover:text-[#E2B04E] hover:border-[#E2B04E]/30 dark:hover:border-[#E2B04E]/30 transition-all shadow-sm"
                    aria-label={soc.label}
                  >
                    <IconComp className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            
          </div>
        </div>

        {/* Bottom row copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-center sm:text-left">
          <p className="text-xs text-neutral-450 dark:text-neutral-500 font-mono">
            &copy; {currentYear} Om Bhavsar. All rights reserved.
          </p>

          <button
            onClick={handleScrollTop}
            className="flex items-center space-x-1.5 text-xs font-bold text-neutral-500 dark:text-neutral-400 hover:text-[#E2B04E] dark:hover:text-[#E2B04E] group transition-colors"
            id="back-to-top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
