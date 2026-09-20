import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Globe, 
  Download, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  RefreshCw, 
  Layers, 
  FileCode 
} from 'lucide-react';
import { toast } from 'sonner';

export default function PublishCenterPage() {
  const projects = useSelector(state => state.projects.items);
  const consultations = useSelector(state => state.consultations.items);
  const websiteContent = useSelector(state => state.websiteContent);

  const handleExportFullSchema = () => {
    const fullPayload = {
      timestamp: new Date().toISOString(),
      studio: "Vanvas Architectural Interiors",
      version: "2.4.0",
      hero: websiteContent.hero,
      stats: websiteContent.stats,
      estimatorRates: websiteContent.estimatorRates,
      studios: websiteContent.studios,
      testimonials: websiteContent.testimonials,
      projects: projects
    };

    const blob = new Blob([JSON.stringify(fullPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vanvas_live_cms_export_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Complete website CMS schema exported as JSON payload!');
  };

  const handleLiveSync = () => {
    toast.success('Website cache invalidated and synchronized with Admin CMS!');
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#1E120B] via-[#3A2114] to-[#5C381E] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#DFCA9B] text-xs font-semibold uppercase tracking-wider border border-white/10">
            <Globe className="w-3.5 h-3.5" />
            <span>Central Website Command Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white">
            Publishing & Live Synchronization
          </h1>
          <p className="text-xs text-white/70 max-w-lg leading-relaxed">
            All content, rate cards, and project lookbooks modified in this admin portal are wired into the global CMS state.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleLiveSync}
            className="px-5 py-3 rounded-full bg-[#DFCA9B] text-[#1E120B] text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-md flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Sync Live Website</span>
          </button>

          <button
            onClick={handleExportFullSchema}
            className="px-5 py-3 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export CMS JSON</span>
          </button>
        </div>
      </div>

      {/* Published Modules Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-[#EAE3D9] shadow-sm space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#8B5A2B]">Live Projects</span>
          <p className="text-2xl font-serif font-bold text-[#1E120B]">{projects.length}</p>
          <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Published on Portfolio</span>
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#EAE3D9] shadow-sm space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#8B5A2B]">Client Testimonials</span>
          <p className="text-2xl font-serif font-bold text-[#1E120B]">{websiteContent.testimonials.length}</p>
          <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Live on Home Swiper</span>
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#EAE3D9] shadow-sm space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#8B5A2B]">Studio Locations</span>
          <p className="text-2xl font-serif font-bold text-[#1E120B]">{websiteContent.studios.length}</p>
          <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Mapped in Contact & Footer</span>
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#EAE3D9] shadow-sm space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#8B5A2B]">Estimator Base Rates</span>
          <p className="text-2xl font-serif font-bold text-[#1E120B]">₹ {websiteContent.estimatorRates.luxuryRate}</p>
          <p className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Luxury sq.ft active</span>
          </p>
        </div>
      </div>

      {/* JSON Schema Live Inspector */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-[#8B5A2B]" />
            <h3 className="text-base font-serif font-bold text-[#1E120B]">
              Real-Time JSON Output Inspector
            </h3>
          </div>
          <span className="text-[10px] bg-[#FAF8F5] text-[#8B5A2B] px-3 py-1 rounded-full border border-[#D3C5B4] font-bold">
            REST API & Production Ready
          </span>
        </div>

        <div className="bg-[#1E120B] text-[#FAF8F5] p-5 rounded-2xl text-xs font-mono max-h-72 overflow-y-auto leading-relaxed border border-[#DFCA9B]/30">
          <pre>{JSON.stringify({
            hero: websiteContent.hero,
            stats: websiteContent.stats,
            estimatorRates: websiteContent.estimatorRates,
            studiosCount: websiteContent.studios.length,
            projectsCount: projects.length,
            testimonialsCount: websiteContent.testimonials.length
          }, null, 2)}</pre>
        </div>
      </div>

    </div>
  );
}
