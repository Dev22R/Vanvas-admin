import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Plus, 
  Trash2, 
  Save, 
  Sparkles, 
  X 
} from 'lucide-react';
import { updateStudio, addStudio, deleteStudio } from '../../store/websiteContentSlice';
import { toast } from 'sonner';

export default function StudiosCmsPage() {
  const dispatch = useDispatch();
  const studios = useSelector(state => state.websiteContent.studios);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudio, setNewStudio] = useState({
    city: '',
    address: '',
    phone: '',
    email: '',
    hours: 'Mon - Sat: 10:00 AM - 7:30 PM'
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newStudio.city || !newStudio.address) {
      toast.error('Please enter city name and address');
      return;
    }
    dispatch(addStudio(newStudio));
    toast.success(`Studio location for ${newStudio.city} added!`);
    setShowAddModal(false);
    setNewStudio({
      city: '',
      address: '',
      phone: '',
      email: '',
      hours: 'Mon - Sat: 10:00 AM - 7:30 PM'
    });
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE3D9] text-[#5C381E] text-xs font-semibold uppercase tracking-wider mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#8B5A2B]" />
            <span>Locations & Contact CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E120B]">
            Experience Studios & Experience Centers
          </h1>
          <p className="text-xs text-[#7E4F2D]">
            Manage studio addresses, visiting hours, and concierge numbers shown across public footers and contact pages.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-full bg-[#5C381E] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3A2114] shadow-md flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4 text-[#DFCA9B]" />
          <span>Add New Studio</span>
        </button>
      </div>

      {/* Studios List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studios.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-3xl p-6 border border-[#EAE3D9] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-base text-[#1E120B]">{s.city}</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Open
                </span>
              </div>

              <p className="text-xs text-[#5C381E]/85 leading-relaxed">{s.address}</p>

              <div className="pt-2 border-t border-[#EAE3D9] space-y-1.5 text-xs text-[#7E4F2D]">
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  <span>{s.phone}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  <span>{s.email}</span>
                </p>
                <p className="flex items-center gap-1.5 text-[11px] text-[#8B5A2B]">
                  <Clock className="w-3.5 h-3.5 text-[#8B5A2B]" />
                  <span>{s.hours}</span>
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EAE3D9] flex justify-end">
              <button
                onClick={() => {
                  if (window.confirm(`Delete ${s.city}?`)) {
                    dispatch(deleteStudio(s.id));
                    toast.success('Studio removed from website directory.');
                  }
                }}
                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#EAE3D9] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D9]">
              <h3 className="text-lg font-serif font-bold text-[#1E120B]">
                Add Experience Studio
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-[#3A2114]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#5C381E] uppercase mb-1">Studio Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hyderabad Flagship Studio"
                  value={newStudio.city}
                  onChange={(e) => setNewStudio({ ...newStudio, city: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5C381E] uppercase mb-1">Physical Address *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Road No 36, Jubilee Hills, Hyderabad 500033"
                  value={newStudio.address}
                  onChange={(e) => setNewStudio({ ...newStudio, address: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#5C381E] uppercase mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 (040) 2300..."
                    value={newStudio.phone}
                    onChange={(e) => setNewStudio({ ...newStudio, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#5C381E] uppercase mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="hyderabad@vanvasdesign.com"
                    value={newStudio.email}
                    onChange={(e) => setNewStudio({ ...newStudio, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#5C381E] uppercase mb-1">Operating Hours</label>
                <input
                  type="text"
                  value={newStudio.hours}
                  onChange={(e) => setNewStudio({ ...newStudio, hours: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
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
                  Publish Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
