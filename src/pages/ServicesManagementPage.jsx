import React from 'react';
import { Sparkles, Check, Edit, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function ServicesManagementPage() {
  const services = [
    {
      id: "srv-01",
      title: "Luxury Residential Interiors",
      rate: "₹ 1,800 / sq.ft",
      timeline: "60 - 90 Days",
      activeSites: 18,
      features: [
        "Turnkey Architectural Space Planning",
        "Custom Handcrafted Luxury Furniture",
        "Circadian Smart Lighting Integration",
        "Italian Marble & Timber Flooring"
      ]
    },
    {
      id: "srv-02",
      title: "Executive & Corporate Workspaces",
      rate: "₹ 1,400 / sq.ft",
      timeline: "45 - 75 Days",
      activeSites: 6,
      features: [
        "Acoustic Isolation Engineering",
        "Ergonomic Sit-Stand Workstations",
        "Boardroom AV Integration",
        "Breakout Cafeteria & Wellness Lounges"
      ]
    },
    {
      id: "srv-03",
      title: "Custom Wardrobes & Walk-In Closets",
      rate: "₹ 1.8 Lakhs onwards",
      timeline: "21 - 30 Days",
      activeSites: 12,
      features: [
        "Walk-in Dressing Rooms with Central Islands",
        "Fluted Glass & Slim Profile Sliding Wardrobes",
        "Velvet-Lined Jewelry & Timepiece Drawers"
      ]
    },
    {
      id: "srv-04",
      title: "Gourmet Modular Kitchens",
      rate: "₹ 3.5 Lakhs onwards",
      timeline: "25 - 35 Days",
      activeSites: 9,
      features: [
        "10-Year Water & Pest Proof Marine Plywood",
        "Blum / Hettich Soft-Close Hardware",
        "Sintered Stone Quartz Countertops"
      ]
    },
    {
      id: "srv-05",
      title: "3D Visualization & VR Walkthroughs",
      rate: "Complimentary with Design",
      timeline: "7 - 10 Days",
      activeSites: 28,
      features: [
        "4K Photorealistic Day & Night Lighting Renders",
        "360° Virtual Reality Interactive Walkthroughs",
        "CAD Production Drawings for Execution"
      ]
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E120B]">
            Studio Architectural Services & Base Rates
          </h1>
          <p className="text-xs text-[#7E4F2D]">
            Manage turnkey design disciplines, deliverables, and rate card benchmarks.
          </p>
        </div>

        <button
          onClick={() => toast.info('Service pricing sync enabled across user estimator')}
          className="px-5 py-2.5 rounded-full bg-[#5C381E] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3A2114] transition-all shadow-md w-fit"
        >
          <span>Sync Estimator Rates</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-3xl p-6 border border-[#EAE3D9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#8B5A2B] uppercase tracking-wider bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#D3C5B4]">
                  {s.timeline}
                </span>
                <span className="text-xs font-bold text-[#5C381E] bg-[#5C381E]/10 px-2 py-0.5 rounded-full">
                  {s.activeSites} Sites Active
                </span>
              </div>

              <h3 className="text-lg font-serif font-bold text-[#1E120B] mt-3">
                {s.title}
              </h3>

              <div className="mt-3 p-3 bg-[#FAF8F5] rounded-2xl border border-[#EAE3D9]">
                <span className="text-[10px] uppercase font-bold text-[#7E4F2D]">Standard Benchmark Rate</span>
                <p className="text-base font-serif font-bold text-[#1E120B]">{s.rate}</p>
              </div>

              <div className="mt-4 space-y-1.5">
                <p className="text-[10px] uppercase font-bold text-[#8B5A2B] tracking-wider">Scope Deliverables</p>
                {s.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-[#5C381E]">
                    <Check className="w-3.5 h-3.5 text-[#8B5A2B] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#EAE3D9] flex justify-end">
              <button
                onClick={() => toast.success(`Updated rate specifications for ${s.title}`)}
                className="text-xs font-bold text-[#5C381E] hover:underline"
              >
                Edit Deliverables & Pricing →
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
