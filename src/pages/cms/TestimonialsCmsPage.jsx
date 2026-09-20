import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Star, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  X, 
  Sparkles 
} from 'lucide-react';
import { 
  addTestimonial, 
  deleteTestimonial, 
  toggleTestimonialPublish 
} from '../../store/websiteContentSlice';
import { toast } from 'sonner';

export default function TestimonialsCmsPage() {
  const dispatch = useDispatch();
  const testimonials = useSelector(state => state.websiteContent.testimonials);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: '',
    rating: 5,
    comment: '',
    projectType: 'Luxury Villa Architecture',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) {
      toast.error('Please enter client name and testimonial quote');
      return;
    }

    dispatch(addTestimonial(newReview));
    toast.success('Testimonial published live to client website!');
    setShowAddModal(false);
    setNewReview({
      name: '',
      role: '',
      rating: 5,
      comment: '',
      projectType: 'Luxury Villa Architecture',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    });
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE3D9] text-[#5C381E] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#8B5A2B]" />
            <span>Social Proof & Reviews CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E120B]">
            Client Praise & Testimonials Manager
          </h1>
          <p className="text-xs text-[#7E4F2D]">
            Manage featured reviews, star ratings, and client quotes on the public homepage.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-full bg-[#5C381E] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3A2114] shadow-md flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4 text-[#DFCA9B]" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-3xl p-6 border border-[#EAE3D9] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex text-[#C5A059] gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <button
                  onClick={() => {
                    dispatch(toggleTestimonialPublish(t.id));
                    toast.success(`Toggled visibility for ${t.name}`);
                  }}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                    t.published !== false
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-zinc-100 text-zinc-500'
                  }`}
                >
                  {t.published !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                  <span>{t.published !== false ? 'Live on Home' : 'Hidden'}</span>
                </button>
              </div>

              <p className="text-xs text-[#3A2114] italic leading-relaxed">
                "{t.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#EAE3D9] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#DFCA9B]"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#1E120B]">{t.name}</h4>
                  <p className="text-[10px] text-[#8B5A2B]">{t.role}</p>
                  <span className="text-[9px] text-[#7E4F2D] block">{t.projectType}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (window.confirm(`Delete review from ${t.name}?`)) {
                    dispatch(deleteTestimonial(t.id));
                    toast.success('Testimonial removed');
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
                Publish Client Praise
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-[#3A2114]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#5C381E] uppercase mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram & Ananya Singhania"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#5C381E] uppercase mb-1">Client Role / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Villa Owner, Worli"
                    value={newReview.role}
                    onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#5C381E] uppercase mb-1">Star Rating (1-5)</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                  >
                    <option value={5}>5 Stars (★★★★★)</option>
                    <option value={4}>4 Stars (★★★★)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#5C381E] uppercase mb-1">Project Typology</label>
                <input
                  type="text"
                  placeholder="e.g. 6,000 sq.ft Villa Architecture"
                  value={newReview.projectType}
                  onChange={(e) => setNewReview({ ...newReview, projectType: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5C381E] uppercase mb-1">Testimonial Quote *</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Write the client review..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-[#3A2114]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#5C381E] uppercase mb-1">Avatar Image URL</label>
                <input
                  type="url"
                  value={newReview.avatar}
                  onChange={(e) => setNewReview({ ...newReview, avatar: e.target.value })}
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
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
