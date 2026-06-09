import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle, 
  ExternalLink, 
  Plus, 
  Trash2, 
  X, 
  Upload, 
  Sparkles, 
  Globe, 
  FileText,
  Key,
  Database
} from 'lucide-react';
import { certifications as initialCertifications } from '../data/portfolio';
import { Certification } from '../types';
import { supabase } from '../utils/supabase';

export default function Certifications() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [viewingCert, setViewingCert] = useState<Certification | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [dbStatus, setDbStatus] = useState<'connecting' | 'connected' | 'fallback'>('connecting');

  // Form State
  const [newCert, setNewCert] = useState({
    title: '',
    issuer: '',
    date: new Date().getFullYear().toString(),
    credentialId: '',
    credentialUrl: '',
    description: ''
  });

  // Load from Supabase with localStorage backup
  useEffect(() => {
    async function fetchCertifications() {
      try {
        const { data, error } = await supabase
          .from('certifications')
          .select('*')
          .order('date', { ascending: false });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          const formatted = data.map((row: any) => ({
            id: row.id || `cert-db-${row.credential_id || Date.now()}`,
            title: row.title || '',
            issuer: row.issuer || '',
            date: row.date || '',
            credentialId: row.credential_id || row.credentialId || '',
            credentialUrl: row.credential_url || row.credentialUrl || '',
            description: row.description || '',
            image: row.image || null
          }));
          
          const dbIds = new Set(formatted.map(c => c.id));
          const dbTitles = new Set(formatted.map(c => c.title.toLowerCase()));
          const filteredInitial = initialCertifications.filter(
            c => !dbIds.has(c.id) && !dbTitles.has(c.title.toLowerCase())
          );

          const combined = [...formatted, ...filteredInitial];
          setCerts(combined);
          setDbStatus('connected');
          // Sync with local storage
          localStorage.setItem('user_portfolio_certifications', JSON.stringify(combined));
        } else {
          // If Supabase table is empty, fall back to localStorage/empty
          setDbStatus('connected');
          loadFallback();
        }
      } catch (err) {
        console.warn('Supabase fetch failed or table is missing, falling back to local storage:', err);
        setDbStatus('fallback');
        loadFallback();
      }
    }

    function loadFallback() {
      const saved = localStorage.getItem('user_portfolio_certifications');
      let customCerts: Certification[] = [];
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          customCerts = parsed.filter((c: Certification) => !['cert-1', 'cert-2', 'cert-3', 'cert-4', 'cert-5'].includes(c.id));
        } catch (e) {
          customCerts = [];
        }
      }
      setCerts([...customCerts, ...initialCertifications]);
    }

    fetchCertifications();
  }, []);

  const saveCertsLocally = (updated: Certification[]) => {
    setCerts(updated);
    localStorage.setItem('user_portfolio_certifications', JSON.stringify(updated));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  };

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreviewImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.title || !newCert.issuer) {
      alert('Title and Issuer are required!');
      return;
    }

    const created: Certification = {
      id: `cert-custom-${Date.now()}`,
      title: newCert.title,
      issuer: newCert.issuer,
      date: newCert.date || undefined,
      credentialId: newCert.credentialId || `OB-${Date.now().toString().slice(-4)}`,
      credentialUrl: newCert.credentialUrl || undefined,
      description: newCert.description || 'No description provided.',
      image: previewImage || undefined
    };

    // Optimistically save locally
    const updated = [created, ...certs];
    saveCertsLocally(updated);

    // Persist to Supabase
    try {
      const payload = {
        id: created.id,
        title: created.title,
        issuer: created.issuer,
        date: created.date || null,
        credential_id: created.credentialId,
        credential_url: created.credentialUrl || null,
        description: created.description,
        image: created.image || null
      };
      
      const { error } = await supabase.from('certifications').insert([payload]);
      if (error) {
        console.warn('Supabase insert failed, table may not be ready yet. Retrying with upsert:', error);
        await supabase.from('certifications').upsert([payload]);
      }
    } catch (err) {
      console.warn('Could not save to remote database. Keeps local copy:', err);
    }

    // Reset Form
    setNewCert({
      title: '',
      issuer: '',
      date: new Date().getFullYear().toString(),
      credentialId: '',
      credentialUrl: '',
      description: ''
    });
    setPreviewImage('');
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this certificate?')) {
      const updated = certs.filter(c => c.id !== id);
      saveCertsLocally(updated);

      try {
        await supabase.from('certifications').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase remote deletion error:', err);
      }
    }
  };

  return (
    <section id="certifications" className="py-24 bg-[#FCFDFE] dark:bg-[#050505] border-t border-b border-neutral-200/40 dark:border-neutral-900/40 relative overflow-hidden transition-all duration-500">
      
      {/* Visual Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#B497CF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[200px] h-[200px] bg-[#B497CF]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block with Inline Trigger to Admin Add Button */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div className="text-left space-y-4 max-w-2xl border-l-[3px] border-[#B497CF] pl-5">
            <span className="text-xs font-mono font-bold tracking-widest text-[#B497CF] uppercase block">
              Professional Credentials
            </span>
            <h2 className="text-4xl sm:text-5xl font-sans font-bold tracking-tight text-neutral-900 dark:text-white mb-2" id="certifications-title">
              Credentials & <span className="font-display italic font-medium text-gradient-cosmic">Certificates</span>
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-base font-medium leading-relaxed">
              Curate digital qualifications, industry simulations, and academic engineering completions with active link validation pathways.
            </p>
          </div>

          {/* Secure Admin Control Panel Anchor (Controls Hidden for Production) */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            {/* Dynamic Admin Action Trigger */}
            <AnimatePresence>
              {isAdminMode && (
                <motion.button
                  initial={{ opacity: 0, x: 10, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-sans font-bold text-xs uppercase tracking-widest rounded-full hover:shadow-lg hover:shadow-purple-500/10 active:scale-95 transition-all duration-205 cursor-pointer"
                  id="btn-add-certification-admin"
                >
                  <Plus className="w-3.5 h-3.5 text-[#B497CF]" />
                  Upload
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Certifications Grid */}
        {certs.length === 0 ? (
          <div className="text-center py-20 bg-neutral-50 dark:bg-neutral-900/10 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800">
            <Award className="w-12 h-12 text-[#B497CF]/60 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">No Credentials uploaded yet</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto mt-1 mb-6">
              Verified credentials and certificates can be displayed here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="certifications-grid">
            <AnimatePresence mode="popLayout">
              {certs.map((cert, idx) => (
                <motion.div
                  key={cert.id}
                  layoutId={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex flex-col justify-between bg-white dark:bg-[#0B0B0C] border border-neutral-200/55 dark:border-brand-border-dark shadow-sm hover:shadow-xl dark:shadow-black/45 rounded-2xl overflow-hidden hover:border-[#B497CF]/30 dark:hover:border-brand-accent-dark/30 transition-all duration-350 select-none text-left"
                  id={`cert-item-${cert.id}`}
                >
                  {/* Aspect Ratio 16:10 Container for Certificate Preview / Beautiful SVG Abstract Artwork */}
                  <div 
                    onClick={() => setViewingCert(cert)}
                    className="w-full h-48 relative overflow-hidden bg-gradient-to-tr from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-950 border-b border-neutral-100 dark:border-neutral-900 flex items-center justify-center cursor-zoom-in"
                  >
                    {cert.image ? (
                      <img 
                        src={cert.image} 
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      /* Fallback High-Fidelity abstract vector layout that acts as visual certificate */
                      <div className="w-full h-full flex flex-col justify-between p-6 opacity-85 group-hover:opacity-100 transition-opacity bg-gradient-to-tr from-neutral-950 via-slate-900 to-neutral-950 relative overflow-hidden">
                        <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-[#B497CF]/10 rounded-full blur-2xl" />
                        <div className="flex items-start justify-between relative z-10 w-full mb-3">
                          <div className="px-2 py-1 rounded bg-[#B497CF]/15 border border-[#B497CF]/20">
                            <span className="text-[9px] font-mono font-bold tracking-wider text-[#B497CF] uppercase">
                              {cert.issuer || 'Credential Verification'}
                            </span>
                          </div>
                          <Sparkles className="w-4 h-4 text-[#B497CF]" />
                        </div>
                        <div className="space-y-1 my-auto relative z-10">
                          <h4 className="text-sm font-bold text-white line-clamp-2 tracking-tight">
                            {cert.title}
                          </h4>
                          <p className="text-[10px] text-neutral-400 font-mono">
                            Issued Date: {cert.date || '2025'}
                          </p>
                        </div>
                        <div className="flex justify-between items-center text-[8px] font-mono text-neutral-400 border-t border-white/5 pt-2 relative z-10 mt-2">
                          <span>VERIFIED PORTFOLIO NO.</span>
                          <span className="text-emerald-400 font-bold">{cert.credentialId}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Body Details Area */}
                  <div className="p-6 flex-1 flex flex-col justify-between relative">
                    <div className="space-y-3.5 mb-6">
                      {/* Issuer Tag and Certification Title */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#B497CF] block">
                          {cert.issuer}
                        </span>
                        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 font-sans tracking-tight leading-snug line-clamp-2">
                          {cert.title}
                        </h3>
                      </div>

                      {/* Brief description */}
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                        {cert.description || 'Successfully completed the specialized engineering program requirements.'}
                      </p>

                      {/* Credential ID tag */}
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="text-xs font-mono font-semibold text-neutral-500 dark:text-neutral-400">
                          ID: <span className="font-bold text-neutral-700 dark:text-neutral-300">{cert.credentialId}</span>
                        </span>
                      </div>
                    </div>

                    {/* Footer band */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
                          Verified
                        </span>
                      </div>
                      
                      {cert.credentialUrl && cert.credentialUrl !== '#' ? (
                        <a 
                          href={cert.credentialUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase text-neutral-600 hover:text-[#B497CF] dark:text-neutral-400 dark:hover:text-[#B497CF] transition-colors"
                        >
                          Credential Link
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 font-medium">
                          Issued: {cert.date || '2025'}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* Modern Pop-up Upload Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal Glass Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-md"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, cubicBezier: [0.16, 1, 0.3, 1] }}
              className="bg-white dark:bg-[#0B0B0C] w-full max-w-xl rounded-2xl shadow-2xl border border-neutral-200 dark:border-brand-border-dark relative overflow-hidden z-10 flex flex-col p-6 text-left"
            >
              
              {/* Modal Title Header */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-900 mb-6">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#B497CF]" />
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Add Certificate Credentials
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors text-neutral-500 dark:text-neutral-400 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form implementation */}
              <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1 max-h-[70vh]">
                
                {/* Drag-and-drop Image Area */}
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold tracking-wider text-neutral-500 uppercase block">
                    Certificate Image (Optional)
                  </label>
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                      dragActive 
                        ? 'border-[#B497CF] bg-[#B497CF]/5' 
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-950/20'
                    }`}
                  >
                    {previewImage ? (
                      <div className="relative inline-block max-w-[200px] mx-auto rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
                        <img src={previewImage} alt="Uploaded preview" className="w-full h-auto max-h-32 object-contain" />
                        <button
                          type="button"
                          onClick={() => setPreviewImage('')}
                          className="absolute -top-1 right-1 p-1 bg-red-600 text-white rounded-full cursor-pointer hover:bg-red-700 shadow-md"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full w-fit mx-auto">
                          <Upload className="w-4 h-4 text-[#B497CF]" />
                        </div>
                        <p className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
                          Drag and drop files here, or <label className="text-[#B497CF] hover:underline cursor-pointer">browse<input type="file" onChange={handleFileInput} accept="image/*" className="hidden" /></label>
                        </p>
                        <p className="text-[10px] text-neutral-400">
                          Supports PNG, JPG (highly compressed base64 memory limit)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-neutral-500 uppercase">
                      Certificate Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AI & ML Deep Learning Certification"
                      value={newCert.title}
                      onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:border-[#B497CF]/80 focus:outline-none focus:ring-1 focus:ring-[#B497CF]/50 text-neutral-900 dark:text-white text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-neutral-500 uppercase">
                      Issuer / Provider
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Stanford Online, Deloitte"
                      value={newCert.issuer}
                      onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:border-[#B497CF]/80 focus:outline-none focus:ring-1 focus:ring-[#B497CF]/50 text-neutral-900 dark:text-white text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-neutral-500 uppercase">
                      Credential ID
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. DEL-CYBER-9021"
                      value={newCert.credentialId}
                      onChange={(e) => setNewCert({ ...newCert, credentialId: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:border-[#B497CF]/80 focus:outline-none focus:ring-1 focus:ring-[#B497CF]/50 text-neutral-900 dark:text-white text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-neutral-500 uppercase">
                      Issued Date (Year/Month)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2025"
                      value={newCert.date}
                      onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                      className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:border-[#B497CF]/80 focus:outline-none focus:ring-1 focus:ring-[#B497CF]/50 text-neutral-900 dark:text-white text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-neutral-500 uppercase">
                    Verification Url / Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/verify-credential"
                    value={newCert.credentialUrl}
                    onChange={(e) => setNewCert({ ...newCert, credentialUrl: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:border-[#B497CF]/80 focus:outline-none focus:ring-1 focus:ring-[#B497CF]/50 text-neutral-900 dark:text-white text-sm transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-neutral-500 uppercase">
                    Short Description
                  </label>
                  <textarea
                    rows={2.5}
                    placeholder="Briefly state key skills covered, simulation scopes, or score thresholds achieved."
                    value={newCert.description}
                    onChange={(e) => setNewCert({ ...newCert, description: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:border-[#B497CF]/80 focus:outline-none focus:ring-1 focus:ring-[#B497CF]/50 text-neutral-900 dark:text-white text-sm transition-all resize-none"
                  />
                </div>

                {/* Trigger Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-900">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors uppercase tracking-widest cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white text-xs font-bold uppercase tracking-widest transition-all hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer"
                  >
                    Save Credentials
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox for Viewing Full Certificate */}
      <AnimatePresence>
        {viewingCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal Glass Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingCert(null)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, cubicBezier: [0.16, 1, 0.3, 1] }}
              className="bg-white dark:bg-[#0B0B0C] w-full max-w-3xl rounded-2xl shadow-2xl border border-neutral-200 dark:border-brand-border-dark relative overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] text-left"
            >
              {/* Absoluted close trigger */}
              <button
                onClick={() => setViewingCert(null)}
                className="absolute top-4 right-4 p-2 bg-neutral-900/60 hover:bg-neutral-900/95 dark:bg-black/50 dark:hover:bg-neutral-800 text-white rounded-full transition-all duration-200 z-20 shadow-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Side: Certificate Canvas Image */}
              <div className="w-full md:w-3/5 h-64 md:h-auto min-h-[250px] relative bg-neutral-950 flex items-center justify-center overflow-hidden">
                {viewingCert.image ? (
                  <img 
                    src={viewingCert.image} 
                    alt={viewingCert.title} 
                    className="w-full h-full object-contain max-h-[45vh] md:max-h-full" 
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col justify-between p-8 bg-gradient-to-tr from-neutral-950 via-slate-900 to-neutral-950 relative overflow-hidden">
                    <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-[#B497CF]/10 rounded-full blur-3xl animate-pulse" />
                    <div className="flex justify-between items-start relative z-10">
                      <div className="px-3 py-1.5 rounded-lg bg-[#B497CF]/15 border border-[#B497CF]/25">
                        <span className="text-xs font-mono font-bold tracking-widest text-[#B497CF] uppercase">
                          {viewingCert.issuer || 'Verification Record'}
                        </span>
                      </div>
                      <Award className="w-6 h-6 text-[#B497CF]" />
                    </div>
                    
                    <div className="space-y-2.5 my-auto relative z-10">
                      <h4 className="text-2xl font-bold text-white tracking-tight leading-snug">
                        {viewingCert.title}
                      </h4>
                      <p className="text-xs text-neutral-400 font-mono">
                        Date Issued: {viewingCert.date || '2025'}
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 border-t border-white/5 pt-3 relative z-10">
                      <span>VERIFIED ID</span>
                      <span className="text-emerald-400 font-bold tracking-wider">{viewingCert.credentialId}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side: Detailed credentials pane */}
              <div className="w-full md:w-2/5 p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-full">
                <div className="space-y-5">
                  <div>
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#B497CF]">
                      {viewingCert.issuer}
                    </span>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight leading-snug mt-1">
                      {viewingCert.title}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                    {viewingCert.description || 'Verified achievement of engineering curricula, technical simulation pathways, and specific skill capabilities.'}
                  </p>

                  <div className="space-y-3 pt-3 border-t border-neutral-100 dark:border-neutral-900">
                    <div className="flex items-center gap-2.5 text-xs text-neutral-500 dark:text-neutral-400">
                      <FileText className="w-4 h-4 text-neutral-400 shrink-0" />
                      <span>ID: <strong className="font-semibold text-neutral-800 dark:text-neutral-300 font-mono">{viewingCert.credentialId}</strong></span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-neutral-500 dark:text-neutral-400">
                      <Award className="w-4 h-4 text-neutral-400 shrink-0" />
                      <span>Issued: <strong className="font-semibold text-neutral-800 dark:text-neutral-300">{viewingCert.date || '2025'}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-8 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
                      Verified
                    </span>
                  </div>

                  {viewingCert.credentialUrl && viewingCert.credentialUrl !== '#' && (
                    <a 
                      href={viewingCert.credentialUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-50 transition-all rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer"
                    >
                      Verify Link
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
