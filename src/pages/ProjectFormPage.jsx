import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ArrowLeft, 
  Save, 
  UploadCloud, 
  Plus, 
  X, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { addProject, updateProject } from '../store/projectsSlice';
import { toast } from 'sonner';

export default function ProjectFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEdit = Boolean(id);

  const existingProject = useSelector(state => 
    state.projects.items.find(p => p.id === id)
  );

  const [formData, setFormData] = useState({
    title: '',
    client: '',
    clientEmail: '',
    clientPhone: '',
    category: 'Residential',
    subcategory: 'Penthouse & Living',
    location: '',
    area: '',
    budget: '',
    progress: 15,
    status: 'In Execution',
    startDate: '',
    deadline: '',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    leadArchitect: 'Aarav Deshmukh',
    materials: ['Italian Travertine', 'Smoked Walnut'],
    highlights: ['Double-height living lounge', 'Bespoke floating bar']
  });

  const [newMaterial, setNewMaterial] = useState('');
  const [newHighlight, setNewHighlight] = useState('');

  useEffect(() => {
    if (isEdit && existingProject) {
      setFormData({
        ...existingProject,
        materials: existingProject.materials || [],
        highlights: existingProject.highlights || []
      });
    }
  }, [isEdit, existingProject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.client || !formData.location) {
      toast.error('Please complete all required fields');
      return;
    }

    if (isEdit) {
      dispatch(updateProject(formData));
      toast.success(`Project "${formData.title}" successfully updated!`);
    } else {
      dispatch(addProject(formData));
      toast.success(`New Project "${formData.title}" created successfully!`);
    }

    navigate('/projects');
  };

  const handleAddMaterial = () => {
    if (!newMaterial.trim()) return;
    setFormData({
      ...formData,
      materials: [...formData.materials, newMaterial.trim()]
    });
    setNewMaterial('');
  };

  const handleRemoveMaterial = (index) => {
    setFormData({
      ...formData,
      materials: formData.materials.filter((_, idx) => idx !== index)
    });
  };

  const handleAddHighlight = () => {
    if (!newHighlight.trim()) return;
    setFormData({
      ...formData,
      highlights: [...formData.highlights, newHighlight.trim()]
    });
    setNewHighlight('');
  };

  const handleRemoveHighlight = (index) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, idx) => idx !== index)
    });
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/projects"
            className="p-2 rounded-full bg-white border border-[#D3C5B4] text-[#5C381E] hover:bg-[#FAF8F5] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#1E120B]">
              {isEdit ? 'Edit Project Details' : 'Create New Studio Project'}
            </h1>
            <p className="text-xs text-[#7E4F2D]">
              {isEdit ? `Updating records for #${id}` : 'Add a new bespoke turnkey architectural site'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 1: Basic & Client Info */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B5A2B] pb-2 border-b border-[#EAE3D9]">
            1. Core Project & Client Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C381E] mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. The Elysian Grand Penthouse"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-xs text-[#3A2114] focus:outline-none focus:border-[#8B5A2B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C381E] mb-1.5">
                Client Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vikram Singhania"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-xs text-[#3A2114] focus:outline-none focus:border-[#8B5A2B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C381E] mb-1.5">
                Client Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 98200 12345"
                value={formData.clientPhone}
                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-xs text-[#3A2114] focus:outline-none focus:border-[#8B5A2B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C381E] mb-1.5">
                Client Email
              </label>
              <input
                type="email"
                placeholder="vikram@domain.com"
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-xs text-[#3A2114] focus:outline-none focus:border-[#8B5A2B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C381E] mb-1.5">
                Lead Studio Architect
              </label>
              <select
                value={formData.leadArchitect}
                onChange={(e) => setFormData({ ...formData, leadArchitect: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-xs text-[#3A2114] focus:outline-none focus:border-[#8B5A2B]"
              >
                <option value="Aarav Deshmukh">Aarav Deshmukh (Principal)</option>
                <option value="Meera Sen">Meera Sen (Interior Curation)</option>
                <option value="Kabir Varma">Kabir Varma (Engineering)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Space Specifications */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B5A2B] pb-2 border-b border-[#EAE3D9]">
            2. Space Specifications & Execution Scope
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C381E] mb-1.5">
                Space Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-xs text-[#3A2114] focus:outline-none focus:border-[#8B5A2B]"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial / Office">Commercial / Office</option>
                <option value="Modular Kitchen">Modular Kitchen</option>
                <option value="Wardrobes">Wardrobes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C381E] mb-1.5">
                Subcategory / Room Focus
              </label>
              <input
                type="text"
                placeholder="e.g. Penthouse & Living"
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-xs text-[#3A2114] focus:outline-none focus:border-[#8B5A2B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C381E] mb-1.5">
                Location / City *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Worli Sea Face, Mumbai"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-xs text-[#3A2114] focus:outline-none focus:border-[#8B5A2B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C381E] mb-1.5">
                Carpet Area (Sq.Ft)
              </label>
              <input
                type="text"
                placeholder="e.g. 4,850 sq.ft"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-xs text-[#3A2114] focus:outline-none focus:border-[#8B5A2B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C381E] mb-1.5">
                Contract Budget
              </label>
              <input
                type="text"
                placeholder="e.g. ₹ 85 Lakhs"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-xs text-[#3A2114] focus:outline-none focus:border-[#8B5A2B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C381E] mb-1.5">
                Project Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-xs text-[#3A2114] focus:outline-none focus:border-[#8B5A2B]"
              >
                <option value="Planning & 3D">Planning & 3D</option>
                <option value="3D Approved">3D Approved</option>
                <option value="In Execution">In Execution</option>
                <option value="Snagging / Handover">Snagging / Handover</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Progress Slider */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#5C381E]">
                Execution Progress ({formData.progress}%)
              </label>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
              className="w-full accent-[#5C381E] cursor-pointer h-2 bg-[#EAE3D9] rounded-lg"
            />
          </div>
        </div>

        {/* Section 3: Materials & Highlights */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#8B5A2B] pb-2 border-b border-[#EAE3D9]">
            3. Architectural Finishes & Highlights
          </h3>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C381E] mb-1.5">
              Materials & Natural Stones
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="e.g. Italian Travertine, Dekton Sintered Stone..."
                value={newMaterial}
                onChange={(e) => setNewMaterial(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddMaterial())}
                className="flex-1 px-4 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-xs text-[#3A2114]"
              />
              <button
                type="button"
                onClick={handleAddMaterial}
                className="px-4 py-2 rounded-xl bg-[#5C381E] text-white text-xs font-semibold"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.materials.map((mat, idx) => (
                <span key={idx} className="px-3 py-1 bg-[#FAF8F5] border border-[#D3C5B4] rounded-full text-xs text-[#5C381E] flex items-center gap-1.5">
                  {mat}
                  <button type="button" onClick={() => handleRemoveMaterial(idx)} className="text-rose-500 hover:text-rose-700">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C381E] mb-1.5">
              Key Highlights / Scope Bullets
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="e.g. Double-height living lounge with motorized acoustic panels..."
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddHighlight())}
                className="flex-1 px-4 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-xs text-[#3A2114]"
              />
              <button
                type="button"
                onClick={handleAddHighlight}
                className="px-4 py-2 rounded-xl bg-[#5C381E] text-white text-xs font-semibold"
              >
                Add
              </button>
            </div>
            <div className="space-y-1.5">
              {formData.highlights.map((high, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-[#FAF8F5] rounded-xl border border-[#EAE3D9] text-xs text-[#3A2114]">
                  <span>• {high}</span>
                  <button type="button" onClick={() => handleRemoveHighlight(idx)} className="text-rose-500 hover:text-rose-700">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Image Cover URL */}
          <div className="pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C381E] mb-1.5">
              Cover Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-xs text-[#3A2114] focus:outline-none focus:border-[#8B5A2B]"
            />
            {formData.image && (
              <div className="mt-3 relative aspect-[21/9] rounded-2xl overflow-hidden border border-[#EAE3D9] max-h-48 bg-black">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded text-[10px]">
                  Live Preview
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Submit & Cancel Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            to="/projects"
            className="px-6 py-3 rounded-full border border-[#D3C5B4] text-xs font-semibold text-[#5C381E] hover:bg-[#FAF8F5]"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#5C381E] to-[#3A2114] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3A2114] shadow-xl hover:scale-[1.01] transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-[#DFCA9B]" />
            <span>{isEdit ? 'Save Project Changes' : 'Publish New Project'}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
