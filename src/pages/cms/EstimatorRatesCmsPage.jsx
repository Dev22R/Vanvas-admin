import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Calculator, Save, Sparkles, CheckCircle2 } from 'lucide-react';
import { updateEstimatorRates } from '../../store/websiteContentSlice';
import { toast } from 'sonner';

export default function EstimatorRatesCmsPage() {
  const dispatch = useDispatch();
  const rates = useSelector(state => state.websiteContent.estimatorRates);
  const [formData, setFormData] = useState({ ...rates });

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateEstimatorRates(formData));
    toast.success('Live Interior Cost Calculator rates updated and synced!');
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE3D9] text-[#5C381E] text-xs font-semibold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5 text-[#8B5A2B]" />
            <span>Interactive Tool Configurator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E120B]">
            Cost Estimator Formula & Rate Cards
          </h1>
          <p className="text-xs text-[#7E4F2D]">
            Set the base per sq.ft pricing and add-on costs used in the public calculation engine.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-full bg-[#5C381E] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3A2114] shadow-md flex items-center gap-2 w-fit"
        >
          <Save className="w-4 h-4 text-[#DFCA9B]" />
          <span>Save & Sync Calculator</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-sm space-y-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B5A2B] pb-2 border-b border-[#EAE3D9]">
            Base Material Grade Rates (Per Sq.Ft)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE3D9] space-y-2">
              <span className="font-bold text-[#1E120B] block">Contemporary Tier</span>
              <p className="text-[11px] text-[#7E4F2D]">Standard premium laminates & soft close</p>
              <div className="relative pt-1">
                <span className="absolute left-3 top-3 text-[#5C381E] font-bold">₹</span>
                <input
                  type="number"
                  value={formData.contemporaryRate}
                  onChange={(e) => setFormData({ ...formData, contemporaryRate: Number(e.target.value) })}
                  className="w-full pl-8 pr-3 py-2 bg-white border border-[#D3C5B4] rounded-xl text-sm font-bold text-[#1E120B]"
                />
              </div>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE3D9] space-y-2">
              <span className="font-bold text-[#1E120B] block">Signature Luxury Tier</span>
              <p className="text-[11px] text-[#7E4F2D]">Italian veneers, fluted glass, quartz</p>
              <div className="relative pt-1">
                <span className="absolute left-3 top-3 text-[#5C381E] font-bold">₹</span>
                <input
                  type="number"
                  value={formData.luxuryRate}
                  onChange={(e) => setFormData({ ...formData, luxuryRate: Number(e.target.value) })}
                  className="w-full pl-8 pr-3 py-2 bg-white border border-[#D3C5B4] rounded-xl text-sm font-bold text-[#1E120B]"
                />
              </div>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE3D9] space-y-2">
              <span className="font-bold text-[#1E120B] block">Haute Bespoke Tier</span>
              <p className="text-[11px] text-[#7E4F2D]">Marble inlays, solid walnut, brass</p>
              <div className="relative pt-1">
                <span className="absolute left-3 top-3 text-[#5C381E] font-bold">₹</span>
                <input
                  type="number"
                  value={formData.bespokeRate}
                  onChange={(e) => setFormData({ ...formData, bespokeRate: Number(e.target.value) })}
                  className="w-full pl-8 pr-3 py-2 bg-white border border-[#D3C5B4] rounded-xl text-sm font-bold text-[#1E120B]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Addons */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B5A2B] pb-2 border-b border-[#EAE3D9]">
            Add-on Module Benchmark Costs
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#5C381E] uppercase mb-1">
                Gourmet Modular Kitchen Base Price (₹)
              </label>
              <input
                type="number"
                value={formData.kitchenCost}
                onChange={(e) => setFormData({ ...formData, kitchenCost: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-sm font-bold text-[#1E120B]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#5C381E] uppercase mb-1">
                Bespoke Wardrobe Unit Base Cost (₹ / unit)
              </label>
              <input
                type="number"
                value={formData.wardrobeUnitCost}
                onChange={(e) => setFormData({ ...formData, wardrobeUnitCost: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-sm font-bold text-[#1E120B]"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
