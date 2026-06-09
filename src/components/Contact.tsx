import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  Mail,
  Linkedin,
  Github,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { supabase } from '../utils/supabase';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please make sure to fill out all required fields correctly.');
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
      return;
    }

    setFormStatus('submitting');
    setErrorMessage('');

    console.log('📤 Submitting contact message to Supabase "contacts" table...');
    console.log('Contact Payload:', {
      name: formData.name,
      email: formData.email,
      subject: formData.subject || null,
      message: formData.message
    });

    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject || null,
            message: formData.message
          }
        ]);

      if (error) {
        console.error('❌ Supabase contact form submission failed:', error);
        console.error(error); // Explicitly logged as requested
        setErrorMessage(error.message || 'database error.');
        setFormStatus('error');
        return;
      }

      console.log('✅ Contact form submitted successfully! Supabase result reference:', data);

      // Trigger server-side Resend email notification
      console.log('📬 Dispatching email notification via server API proxy...');
      try {
        const emailPayload = {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        };

        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailPayload),
        });

        const responseData = await response.json();

        if (!response.ok) {
          console.error('❌ Resend email dispatch failed:', responseData.error || responseData);
          // Highlight that database insert worked but email notification had some configuration issues
          console.warn('Note: Database record was saved, but email notification failed to deliver.');
        } else {
          console.log('✅ Email notification successfully processed by Resend:', responseData);
        }
      } catch (emailError) {
        console.error('❌ Network error while calling email service API:', emailError);
      }

      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error('❌ Unexpected contact submission local error:', err);
      setErrorMessage(err?.message || 'A network error occurred.');
      setFormStatus('error');
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email Address",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-100"
    },
    {
      icon: Phone,
      label: "Phone Number",
      value: `+91 ${personalInfo.phone}`,
      href: `tel:${personalInfo.phone}`,
      color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100"
    },
    {
      icon: Linkedin,
      label: "LinkedIn Connection",
      value: "linkedin.com/in/ombhavsar2706",
      href: personalInfo.linkedin,
      color: "text-sky-500 bg-sky-50 dark:bg-sky-950/40 border-sky-100"
    },
    {
      icon: Github,
      label: "GitHub Profile",
      value: "github.com/Ombhavsar2706",
      href: personalInfo.github,
      color: "text-neutral-700 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-200 border-neutral-200"
    },
    {
      icon: MessageSquare,
      label: "WhatsApp Chat",
      value: "Message On WhatsApp",
      href: personalInfo.whatsapp,
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-[#FCFDFE] dark:bg-[#050505] border-t border-b border-neutral-200/40 dark:border-neutral-900/40 relative overflow-hidden transition-all duration-500">
      
      {/* Visual Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#B497CF]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[200px] h-[200px] bg-[#B497CF]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left space-y-4 mb-16 max-w-3xl border-l-[3px] border-[#B497CF] pl-5">
          <span className="text-xs font-mono font-bold tracking-widest text-[#B497CF] uppercase block">
            Get In Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white mb-2" id="contact-title">
            Start A <span className="font-display italic font-medium text-gradient-cosmic">Conversation</span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base font-medium max-w-xl font-sans leading-relaxed">
            Reach out directly for freelance contracts, full-time opportunities, or project discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Block: Standard Methods Cards */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-6 text-left">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-neutral-800 dark:text-white font-display">
                Contact Information
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                Prefer direct communication? Tap any reference link below to launch immediate connection sessions.
              </p>
            </div>

            <div className="space-y-4" id="contact-cards-container">
              {contactMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <a
                    key={method.label}
                    href={method.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-neutral-950/40 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-850 shadow-sm hover:border-brand-accent-light/40 dark:hover:border-brand-accent-dark/40 transition-all hover:translate-x-1 group"
                    id={`contact-item-${method.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className={`p-3 rounded-lg shrink-0 border ${method.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="text-left font-sans">
                      <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        {method.label}
                      </p>
                      <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-brand-accent-light dark:group-hover:text-brand-accent-dark transition-colors truncate">
                        {method.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Block:validated Contact HTML Form */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="bg-white dark:bg-neutral-950/40 backdrop-blur-md rounded-2xl border border-neutral-200/50 dark:border-neutral-850 p-6 sm:p-8 shadow-sm text-left relative overflow-hidden">
              
              {/* Backing decorative glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-accent-light/5 dark:bg-brand-accent-dark/5 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-xl font-bold text-neutral-800 dark:text-white font-display mb-6">
                Send A Message
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-5" id="contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-name" className="text-xs font-bold text-neutral-500 dark:text-neutral-400 font-mono tracking-wider uppercase">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="form-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent text-neutral-800 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-brand-accent-light dark:focus:border-brand-accent-dark text-sm transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label htmlFor="form-email" className="text-xs font-bold text-neutral-500 dark:text-neutral-400 font-mono tracking-wider uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g., john@gmail.com"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent text-neutral-800 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-brand-accent-light dark:focus:border-[#B497CF] text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-1.5">
                  <label htmlFor="form-subject" className="text-xs font-bold text-neutral-500 dark:text-neutral-400 font-mono tracking-wider uppercase">
                    Subject Focus
                  </label>
                  <input
                    type="text"
                    id="form-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g., Contract Opportunity / Consultation"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent text-neutral-800 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-brand-accent-light dark:focus:border-[#B497CF] text-sm transition-colors"
                  />
                </div>

                {/* Message text area */}
                <div className="space-y-1.5">
                  <label htmlFor="form-message" className="text-xs font-bold text-neutral-500 dark:text-neutral-400 font-mono tracking-wider uppercase">
                    Detailed Message *
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your project, milestones timeline, or custom engineering targets..."
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent text-neutral-800 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:outline-none focus:border-brand-accent-light dark:focus:border-[#B497CF] text-sm transition-colors resize-none"
                  />
                </div>

                {/* Notifications Panel */}
                <AnimatePresence mode="wait">
                  {formStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 flex items-start gap-3"
                      id="form-success-banner"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-500 pt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold font-display">Message Received Safely!</p>
                        <p className="text-[11px] font-sans">Thank you for writing. I will review details and reply to you on priority.</p>
                      </div>
                    </motion.div>
                  )}

                  {formStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-400 border border-red-100 dark:border-red-950 flex items-start gap-3"
                      id="form-error-banner"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 pt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold font-display">Submission Failure</p>
                        <p className="text-[11px] font-sans">{errorMessage || "Please make sure to fill out all the fields correctly before sending."}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submitting Trigger Button */}
                <button
                  type="submit"
                  disabled={formStatus === 'submitting' || formStatus === 'success'}
                  className="w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-xl font-black bg-neutral-900 text-white dark:bg-white dark:text-[#0B1120] text-xs uppercase tracking-widest hover:scale-[1.01] transition-transform disabled:opacity-50 font-display shadow-lg shadow-neutral-900/15 dark:shadow-white/5 active:scale-[0.99] cursor-pointer"
                  id="form-submit-btn"
                >
                  {formStatus === 'submitting' ? (
                    <span>Streaming Message...</span>
                  ) : formStatus === 'success' ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Message Dispatched</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Dispatch Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
