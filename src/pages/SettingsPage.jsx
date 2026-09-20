import React, { useState } from 'react';
import { 
  Settings, 
  Building2, 
  Users, 
  ShieldCheck, 
  Bell, 
  Save, 
  CheckCircle2, 
  Plus 
} from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('studio');

  const [studioProfile, setStudioProfile] = useState({
    name: 'Vanvas Architectural & Interior Studio',
    tagline: 'Timeless Spaces Sculpted in Warmth, Stone & Wood',
    email: 'concierge@vanvasdesign.com',
    phone: '+91 (022) 8900 4500',
    address: 'Floor 4, The Opus, Worli Sea Face, Mumbai 400018',
    warrantyYears: 10,
    currency: 'INR (₹)'
  });

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Aarav Deshmukh', role: 'Principal Architectural Director', email: 'aarav@vanvasdesign.com', access: 'Super Admin' },
    { id: 2, name: 'Meera Sen', role: 'Head of Interior Curation & Materials', email: 'meera@vanvasdesign.com', access: 'Lead Curator' },
    { id: 3, name: 'Kabir Varma', role: 'Chief of Execution & Engineering', email: 'kabir@vanvasdesign.com', access: 'Site Manager' }
  ]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    toast.success('Studio Profile & configuration updated successfully!');
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E120B]">
          Studio Portal Settings & Team Access
        </h1>
        <p className="text-xs text-[#7E4F2D]">
          Manage company profile, team member permissions, and notification protocols.
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex gap-2 border-b border-[#EAE3D9] pb-2">
        {[
          { id: 'studio', label: 'Studio Profile', icon: Building2 },
          { id: 'team', label: 'Team Members & Roles', icon: Users },
          { id: 'notifications', label: 'Notification Protocols', icon: Bell }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-[#5C381E] text-white shadow-sm'
                  : 'bg-white text-[#5C381E] border border-[#D3C5B4] hover:bg-[#FAF8F5]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Studio Profile */}
      {activeTab === 'studio' && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B5A2B] pb-2 border-b border-[#EAE3D9]">
            Studio Identity & Public Coordinates
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="block font-bold text-[#5C381E] uppercase mb-1">
                Studio Trade Name
              </label>
              <input
                type="text"
                value={studioProfile.name}
                onChange={(e) => setStudioProfile({ ...studioProfile, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-[#5C381E] uppercase mb-1">
                Brand Tagline
              </label>
              <input
                type="text"
                value={studioProfile.tagline}
                onChange={(e) => setStudioProfile({ ...studioProfile, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#5C381E] uppercase mb-1">
                Official Studio Email
              </label>
              <input
                type="email"
                value={studioProfile.email}
                onChange={(e) => setStudioProfile({ ...studioProfile, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#5C381E] uppercase mb-1">
                Concierge Phone Line
              </label>
              <input
                type="tel"
                value={studioProfile.phone}
                onChange={(e) => setStudioProfile({ ...studioProfile, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-[#5C381E] uppercase mb-1">
                Flagship Experience Studio Address
              </label>
              <input
                type="text"
                value={studioProfile.address}
                onChange={(e) => setStudioProfile({ ...studioProfile, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#5C381E] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3A2114] shadow-md flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-[#DFCA9B]" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Team Members */}
      {activeTab === 'team' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D9]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B5A2B]">
              Studio Architectural Personnel
            </h3>
            <button
              onClick={() => toast.info('Add team member modal active')}
              className="px-3.5 py-1.5 rounded-full bg-[#5C381E] text-white text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-[#DFCA9B]" />
              <span>Add Member</span>
            </button>
          </div>

          <div className="divide-y divide-[#EAE3D9]">
            {teamMembers.map((m) => (
              <div key={m.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#DFCA9B] text-[#1E120B] font-bold flex items-center justify-center text-xs">
                    {m.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1E120B]">{m.name}</h4>
                    <p className="text-[11px] text-[#7E4F2D]">{m.role} • {m.email}</p>
                  </div>
                </div>

                <span className="px-3 py-1 bg-[#FAF8F5] border border-[#D3C5B4] text-[#5C381E] text-[11px] font-bold rounded-full">
                  {m.access}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B5A2B] pb-2 border-b border-[#EAE3D9]">
            Instant Notification Channels
          </h3>

          <div className="space-y-3 text-xs">
            {[
              { title: 'New 3D Consultation Inquiries', desc: 'Instant email & SMS trigger upon user portal booking' },
              { title: 'Project Milestone Status Updates', desc: 'Notify team when on-site progress crosses 50%, 80%, 100%' },
              { title: 'Client Message Alerts', desc: 'Real-time badge counter on sidebar and push sound' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D9] flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#1E120B]">{item.title}</p>
                  <p className="text-[11px] text-[#7E4F2D]">{item.desc}</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 accent-[#5C381E] cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
