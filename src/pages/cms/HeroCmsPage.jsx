import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Sparkles, 
  Save, 
  Eye, 
  Layers, 
  TrendingUp, 
  Image as ImageIcon, 
  CheckCircle2, 
  RefreshCw 
} from 'lucide-react';
import { updateHeroContent, updateStats } from '../../store/websiteContentSlice';
import { toast } from 'sonner';

export default function HeroCmsPage() {
  const dispatch = useDispatch();
  const heroContent = useSelector(state => state.websiteContent.hero);
  const statsContent = useSelector(state => state.websiteContent.stats);

  const [formData, setFormData] = useState({ ...heroContent });
  const [stats, setStats] = useState([...statsContent]);
  const [activeTab, setActiveTab] = useState('hero'); // 'hero' | 'stats'

  const handleSaveHero = (e) => {
    e.preventDefault();
    dispatch(updateHeroContent(formData));
    dispatch(updateStats(stats));
    toast.success('Homepage Hero & Stats published live to user website!');
  };

  const handleStatChange = (index, field, value) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE3D9] text-[#5C381E] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#8B5A2B]" />
            <span>Website CMS Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E120B]">
            Homepage Hero & Counter Metrics CMS
          </h1>
          <p className="text-xs text-[#7E4F2D]">
            Changes saved here update the public client portal immediately.
          </p>
        </div>

        <button
          onClick={handleSaveHero}
          className="px-6 py-3 rounded-full bg-[#5C381E] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3A2114] shadow-md flex items-center gap-2 w-fit"
        >
          <Save className="w-4 h-4 text-[#DFCA9B]" />
          <span>Publish to Website</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#EAE3D9] pb-2">
        <button
          onClick={() => setActiveTab('hero')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'hero'
              ? 'bg-[#5C381E] text-white'
              : 'bg-white text-[#5C381E] border border-[#D3C5B4]'
          }`}
        >
          Hero Banner & Lookbook
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'stats'
              ? 'bg-[#5C381E] text-white'
              : 'bg-white text-[#5C381E] border border-[#D3C5B4]'
          }`}
        >
          4 Live Architectural Stats
        </button>
      </div>

      {/* Hero Form */}
      {activeTab === 'hero' && (
        <form onSubmit={handleSaveHero} className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B5A2B] pb-2 border-b border-[#EAE3D9]">
              Hero Headlines & Typography
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold text-[#5C381E] uppercase mb-1">
                  Top Floating Badge Text
                </label>
                <input
                  type="text"
                  value={formData.badgeText}
                  onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5C381E] uppercase mb-1">
                  Headline Prefix
                </label>
                <input
                  type="text"
                  value={formData.headlinePrefix}
                  onChange={(e) => setFormData({ ...formData, headlinePrefix: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5C381E] uppercase mb-1">
                  Highlight Italic Word (Warmth)
                </label>
                <input
                  type="text"
                  value={formData.highlightWord}
                  onChange={(e) => setFormData({ ...formData, highlightWord: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#8B5A2B] font-serif font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-[#5C381E] uppercase mb-1">
                  Headline Suffix
                </label>
                <input
                  type="text"
                  value={formData.headlineSuffix}
                  onChange={(e) => setFormData({ ...formData, headlineSuffix: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-[#5C381E] uppercase mb-1">
                  Editorial Subtitle / Value Proposition
                </label>
                <textarea
                  rows="3"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
              </div>
            </div>
          </div>

          {/* Hero CTAs & Visual Lookbook */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B5A2B] pb-2 border-b border-[#EAE3D9]">
              Hero CTAs & Featured Lookbook Image
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#5C381E] uppercase mb-1">
                  Primary CTA Button Text
                </label>
                <input
                  type="text"
                  value={formData.ctaPrimaryText}
                  onChange={(e) => setFormData({ ...formData, ctaPrimaryText: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5C381E] uppercase mb-1">
                  Secondary CTA Button Text
                </label>
                <input
                  type="text"
                  value={formData.ctaSecondaryText}
                  onChange={(e) => setFormData({ ...formData, ctaSecondaryText: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-[#5C381E] uppercase mb-1">
                  Featured 3D Lookbook Cover URL
                </label>
                <input
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5C381E] uppercase mb-1">
                  Lookbook Overlay Title
                </label>
                <input
                  type="text"
                  value={formData.coverTitle}
                  onChange={(e) => setFormData({ ...formData, coverTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5C381E] uppercase mb-1">
                  Lookbook Overlay Subtitle
                </label>
                <input
                  type="text"
                  value={formData.coverSubtitle}
                  onChange={(e) => setFormData({ ...formData, coverSubtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
              </div>
            </div>

            {/* Live Preview Box */}
            <div className="pt-3">
              <label className="block font-bold text-[#5C381E] uppercase mb-1.5 text-xs">
                Live Hero Visual Card Preview
              </label>
              <div className="relative aspect-[16/9] max-h-56 rounded-2xl overflow-hidden border border-[#EAE3D9] bg-[#1E120B]">
                <img src={formData.coverImage} alt="Hero Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <p className="text-[10px] font-bold text-[#DFCA9B] uppercase">{formData.coverTitle}</p>
                  <p className="text-xs font-bold">{formData.coverSubtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Stats Form */}
      {activeTab === 'stats' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B5A2B] pb-2 border-b border-[#EAE3D9]">
              Homepage Key Performance Metrics
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((st, idx) => (
                <div key={st.id} className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE3D9] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#5C381E]">Metric #{idx + 1}</span>
                    <span className="text-[10px] text-[#8B5A2B] font-semibold">{st.sub}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#7E4F2D]">Value Number</label>
                      <input
                        type="number"
                        step="any"
                        value={st.number}
                        onChange={(e) => handleStatChange(idx, 'number', Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 bg-white border border-[#D3C5B4] rounded-lg text-sm font-serif font-bold text-[#1E120B]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#7E4F2D]">Suffix (e.g. +, %)</label>
                      <input
                        type="text"
                        value={st.suffix}
                        onChange={(e) => handleStatChange(idx, 'suffix', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-[#D3C5B4] rounded-lg text-sm font-bold text-[#8B5A2B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#7E4F2D]">Metric Title Label</label>
                    <input
                      type="text"
                      value={st.label}
                      onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-[#D3C5B4] rounded-lg text-xs text-[#3A2114]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={handleSaveHero}
                className="px-6 py-2.5 rounded-full bg-[#5C381E] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3A2114]"
              >
                Save Stats Counters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
