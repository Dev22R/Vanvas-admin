import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Edit3, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  X 
} from 'lucide-react';
import { initialWardrobeCatalog } from '../data/mockDashboardData';
import { toast } from 'sonner';

export default function WardrobesCatalogPage() {
  const [wardrobes, setWardrobes] = useState(initialWardrobeCatalog);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWardrobe, setNewWardrobe] = useState({
    name: '',
    category: 'Walk-In Dressing',
    subtitle: '',
    startingPrice: '',
    leadTime: '3 Weeks',
    popularFinish: 'Smoked American Walnut',
    status: 'Active'
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newWardrobe.name || !newWardrobe.startingPrice) {
      toast.error('Please enter name and starting price');
      return;
    }
    setWardrobes([
      ...wardrobes,
      {
        ...newWardrobe,
        id: `ward-${Date.now().toString().slice(-4)}`,
        featuresCount: 5
      }
    ]);
    toast.success(`Wardrobe system "${newWardrobe.name}" added to catalog!`);
    setShowAddModal(false);
    setNewWardrobe({
      name: '',
      category: 'Walk-In Dressing',
      subtitle: '',
      startingPrice: '',
      leadTime: '3 Weeks',
      popularFinish: 'Smoked American Walnut',
      status: 'Active'
    });
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}" from wardrobe catalog?`)) {
      setWardrobes(wardrobes.filter(w => w.id !== id));
      toast.success(`Wardrobe "${name}" deleted.`);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E120B]">
            Bespoke Wardrobe & Storage Systems
          </h1>
          <p className="text-xs text-[#7E4F2D]">
            Manage modular closets, sliding glass profiles, finishes, and catalog pricing.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-full bg-[#5C381E] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3A2114] transition-all flex items-center gap-2 shadow-md w-fit"
        >
          <Plus className="w-4 h-4 text-[#DFCA9B]" />
          <span>New Wardrobe Model</span>
        </button>
      </div>

      {/* Wardrobe Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wardrobes.map((w) => (
          <div
            key={w.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EAE3D9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#D3C5B4] text-[10px] font-bold text-[#5C381E] uppercase">
                  {w.category}
                </span>

                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {w.status}
                </span>
              </div>

              <h3 className="text-xl font-serif font-bold text-[#1E120B] mt-3">
                {w.name}
              </h3>
              <p className="text-xs text-[#8B5A2B] font-medium mt-0.5">
                {w.subtitle}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 pt-3 border-t border-[#EAE3D9] text-xs">
                <div>
                  <span className="text-[#7E4F2D] text-[11px]">Starting Price</span>
                  <p className="font-serif font-bold text-[#1E120B] text-base">{w.startingPrice}</p>
                </div>
                <div>
                  <span className="text-[#7E4F2D] text-[11px]">Production Lead Time</span>
                  <p className="font-semibold text-[#5C381E]">{w.leadTime}</p>
                </div>
              </div>

              <div className="mt-3 text-xs text-[#7E4F2D]">
                Signature Finish: <strong className="text-[#1E120B]">{w.popularFinish}</strong>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EAE3D9] flex items-center justify-between">
              <button
                onClick={() => toast.info('System configuration editor active')}
                className="text-xs font-bold text-[#5C381E] hover:underline"
              >
                Configure Materials & LED →
              </button>

              <button
                onClick={() => handleDelete(w.id, w.name)}
                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                title="Delete model"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Wardrobe Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#EAE3D9] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D9]">
              <h3 className="text-lg font-serif font-bold text-[#1E120B]">
                Add Bespoke Wardrobe Model
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full text-[#3A2114] hover:bg-[#FAF8F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#5C381E] uppercase mb-1">
                  Model Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Sovereign Walnut Wardrobe"
                  value={newWardrobe.name}
                  onChange={(e) => setNewWardrobe({ ...newWardrobe, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#5C381E] uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={newWardrobe.category}
                    onChange={(e) => setNewWardrobe({ ...newWardrobe, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                  >
                    <option value="Walk-In Dressing">Walk-In Dressing</option>
                    <option value="Sliding Wardrobe">Sliding Wardrobe</option>
                    <option value="Hinged Wardrobe">Hinged Wardrobe</option>
                    <option value="Minimalist System">Minimalist System</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#5C381E] uppercase mb-1">
                    Starting Price *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹ 3.2 Lakhs"
                    value={newWardrobe.startingPrice}
                    onChange={(e) => setNewWardrobe({ ...newWardrobe, startingPrice: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#5C381E] uppercase mb-1">
                  Subtitle / Aesthetic
                </label>
                <input
                  type="text"
                  placeholder="e.g. Solid Fluted Wood with Brass Accents"
                  value={newWardrobe.subtitle}
                  onChange={(e) => setNewWardrobe({ ...newWardrobe, subtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#5C381E] uppercase mb-1">
                    Lead Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3-4 Weeks"
                    value={newWardrobe.leadTime}
                    onChange={(e) => setNewWardrobe({ ...newWardrobe, leadTime: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#5C381E] uppercase mb-1">
                    Signature Finish
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Smoked American Walnut"
                    value={newWardrobe.popularFinish}
                    onChange={(e) => setNewWardrobe({ ...newWardrobe, popularFinish: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#D3C5B4] text-[#5C381E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#5C381E] text-white font-bold uppercase"
                >
                  Save Model
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
