import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Users, 
  Search, 
  Download, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  Sparkles,
  X 
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { 
  updateConsultationStatus, 
  deleteConsultation, 
  addConsultation 
} from '../store/consultationsSlice';
import { toast } from 'sonner';

export default function ConsultationsPage() {
  const dispatch = useDispatch();
  const consultations = useSelector(state => state.consultations.items);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    spaceType: 'Residential Penthouse / Villa',
    budget: '₹ 25 Lakhs - ₹ 50 Lakhs',
    city: 'Mumbai',
    notes: ''
  });

  const statuses = ['All', 'New', 'Moodboard Sent', 'Site Visit Scheduled', 'Contract Signed'];

  const filteredLeads = consultations.filter(c => {
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.spaceType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateConsultationStatus({ id, status: newStatus }));
    toast.success(`Lead status changed to "${newStatus}"`);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete lead entry for ${name}?`)) {
      dispatch(deleteConsultation(id));
      toast.success(`Consultation lead for ${name} removed.`);
    }
  };

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLead.name || !newLead.phone) {
      toast.error('Please enter client name and phone');
      return;
    }
    dispatch(addConsultation(newLead));
    toast.success(`Consultation lead for ${newLead.name} logged successfully!`);
    setShowAddModal(false);
    setNewLead({
      name: '',
      email: '',
      phone: '',
      spaceType: 'Residential Penthouse / Villa',
      budget: '₹ 25 Lakhs - ₹ 50 Lakhs',
      city: 'Mumbai',
      notes: ''
    });
  };

  const handleExportExcel = () => {
    const exportData = filteredLeads.map(c => ({
      ID: c.id,
      Date: c.date,
      Client: c.name,
      Email: c.email,
      Phone: c.phone,
      SpaceType: c.spaceType,
      Budget: c.budget,
      City: c.city,
      Status: c.status,
      Notes: c.notes
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vanvas_Leads");
    XLSX.writeFile(wb, `Vanvas_Leads_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success('Leads spreadsheet exported successfully!');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E120B]">
            Consultations & Client Inquiries
          </h1>
          <p className="text-xs text-[#7E4F2D]">
            Track 3D consultation bookings, moodboards, and contract conversion stages.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportExcel}
            className="px-4 py-2.5 rounded-full bg-white border border-[#D3C5B4] text-[#5C381E] text-xs font-semibold hover:bg-[#FAF8F5] transition-all flex items-center gap-2 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Leads</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 rounded-full bg-[#5C381E] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3A2114] transition-all flex items-center gap-2 shadow-md"
          >
            <Plus className="w-4 h-4 text-[#DFCA9B]" />
            <span>Log Studio Lead</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-[#EAE3D9] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8B5A2B] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by client name, city, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-full text-xs text-[#3A2114] placeholder-[#A47551]/60 focus:outline-none focus:border-[#8B5A2B]"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-[#5C381E] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#5C381E] hover:bg-[#EAE3D9]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-[#EAE3D9] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] text-[#8B5A2B] uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="py-3.5 px-4">Client Details</th>
                <th className="py-3.5 px-4">Space Type</th>
                <th className="py-3.5 px-4">Budget Scope</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Pipeline Status</th>
                <th className="py-3.5 px-4">Notes</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE3D9]">
              {filteredLeads.map((c) => (
                <tr key={c.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-serif font-bold text-[#1E120B] text-sm">{c.name}</p>
                    <div className="flex items-center gap-3 text-[11px] text-[#7E4F2D] mt-0.5">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#8B5A2B]" />
                        {c.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#8B5A2B]" />
                        {c.city}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-[#5C381E] font-medium">
                    {c.spaceType}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-[#1E120B]">
                    {c.budget}
                  </td>

                  <td className="py-3.5 px-4 text-[11px] text-[#7E4F2D]">
                    {c.date}
                  </td>

                  <td className="py-3.5 px-4">
                    <select
                      value={c.status}
                      onChange={(e) => handleStatusChange(c.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none ${
                        c.status === 'Contract Signed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : c.status === 'Site Visit Scheduled'
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : c.status === 'Moodboard Sent'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-[#5C381E]/10 text-[#5C381E] border-[#5C381E]/30'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Moodboard Sent">Moodboard Sent</option>
                      <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                      <option value="Contract Signed">Contract Signed</option>
                    </select>
                  </td>

                  <td className="py-3.5 px-4 text-[11px] text-[#5C381E]/80 max-w-xs truncate">
                    {c.notes || 'No notes added'}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDelete(c.id, c.name)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#EAE3D9] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D9]">
              <h3 className="text-lg font-serif font-bold text-[#1E120B]">
                Log New Design Inquiry
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full text-[#3A2114] hover:bg-[#FAF8F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#5C381E] uppercase mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Karan Johar"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#5C381E] uppercase mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200..."
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#5C381E] uppercase mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="karan@domain.com"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#5C381E] uppercase mb-1">
                    Space Type
                  </label>
                  <select
                    value={newLead.spaceType}
                    onChange={(e) => setNewLead({ ...newLead, spaceType: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                  >
                    <option value="Residential Penthouse / Villa">Residential Penthouse / Villa</option>
                    <option value="Commercial Office HQ">Commercial Office HQ</option>
                    <option value="Custom Wardrobes & Closets">Custom Wardrobes & Closets</option>
                    <option value="Modular Kitchen">Modular Kitchen</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#5C381E] uppercase mb-1">
                    Budget
                  </label>
                  <select
                    value={newLead.budget}
                    onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                  >
                    <option value="₹ 15 Lakhs - ₹ 25 Lakhs">₹ 15L - ₹ 25L</option>
                    <option value="₹ 25 Lakhs - ₹ 50 Lakhs">₹ 25L - ₹ 50L</option>
                    <option value="₹ 50 Lakhs - ₹ 1 Crore">₹ 50L - ₹ 1 Cr</option>
                    <option value="₹ 1 Crore+ Ultra Luxury">₹ 1 Cr+ Luxury</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#5C381E] uppercase mb-1">
                  City / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai (Worli)"
                  value={newLead.city}
                  onChange={(e) => setNewLead({ ...newLead, city: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5C381E] uppercase mb-1">
                  Project Notes
                </label>
                <textarea
                  rows="3"
                  placeholder="Client requirements, moodboard notes..."
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
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
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
