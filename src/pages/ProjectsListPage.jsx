import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Plus, 
  Search, 
  Download, 
  LayoutGrid, 
  List, 
  MapPin, 
  Ruler, 
  Edit3, 
  Trash2, 
  ExternalLink,
  Sparkles,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { deleteProject, updateProjectStatus } from '../store/projectsSlice';
import { toast } from 'sonner';

export default function ProjectsListPage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || '';

  const projects = useSelector(state => state.projects.items);
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const categories = ['All', 'Residential', 'Commercial / Office', 'Modular Kitchen', 'Wardrobes'];
  const statuses = ['All', 'In Execution', '3D Approved', 'Snagging / Handover', 'Completed'];

  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      dispatch(deleteProject(id));
      toast.success(`Project "${title}" deleted from studio records.`);
    }
  };

  const handleExportExcel = () => {
    const exportData = filteredProjects.map(p => ({
      ID: p.id,
      Title: p.title,
      Client: p.client,
      Phone: p.clientPhone,
      Category: p.category,
      Location: p.location,
      Area: p.area,
      Budget: p.budget,
      Progress: `${p.progress}%`,
      Status: p.status,
      LeadArchitect: p.leadArchitect,
      Deadline: p.deadline
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vanvas_Projects");
    XLSX.writeFile(wb, `Vanvas_Projects_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success('Projects spreadsheet exported successfully!');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E120B]">
            Studio Projects & Site Pipeline
          </h1>
          <p className="text-xs text-[#7E4F2D]">
            Manage turnkey executions, timelines, site budgets, and architectural progress.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportExcel}
            className="px-4 py-2.5 rounded-full bg-white border border-[#D3C5B4] text-[#5C381E] text-xs font-semibold hover:bg-[#FAF8F5] transition-all flex items-center gap-2 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Excel</span>
          </button>

          <Link
            to="/projects/add"
            className="px-5 py-2.5 rounded-full bg-[#5C381E] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3A2114] transition-all flex items-center gap-2 shadow-md"
          >
            <Plus className="w-4 h-4 text-[#DFCA9B]" />
            <span>Add New Project</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-[#EAE3D9] shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8B5A2B] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by project, client, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-full text-xs text-[#3A2114] placeholder-[#A47551]/60 focus:outline-none focus:border-[#8B5A2B]"
            />
          </div>

          {/* View Mode & Status Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-xl text-xs font-semibold text-[#5C381E] focus:outline-none focus:border-[#8B5A2B]"
            >
              <option value="All">All Statuses</option>
              <option value="In Execution">In Execution</option>
              <option value="3D Approved">3D Approved</option>
              <option value="Snagging / Handover">Snagging / Handover</option>
              <option value="Completed">Completed</option>
            </select>

            <div className="flex bg-[#FAF8F5] p-1 rounded-xl border border-[#D3C5B4]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#5C381E] text-white' : 'text-[#5C381E]'}`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-[#5C381E] text-white' : 'text-[#5C381E]'}`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-3 border-t border-[#EAE3D9]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#5C381E] text-white shadow-sm'
                  : 'bg-[#FAF8F5] text-[#5C381E] hover:bg-[#EAE3D9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Display: Grid or Table */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#EAE3D9] p-8 space-y-3">
          <h3 className="text-lg font-serif text-[#1E120B]">No projects match your filter</h3>
          <p className="text-xs text-[#7E4F2D]">Try adjusting your search terms or status criteria.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedStatus('All'); setSearchQuery(''); }}
            className="px-5 py-2 rounded-full bg-[#5C381E] text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#EAE3D9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Project Image & Badge */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1E120B]">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-[#5C381E] uppercase">
                  {p.category}
                </div>

                <div className="absolute top-3 right-3 bg-[#1E120B]/90 text-[#DFCA9B] px-2.5 py-1 rounded-full text-[10px] font-bold">
                  {p.budget}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#DFCA9B]" />
                    {p.location}
                  </span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Ruler className="w-3 h-3 text-[#DFCA9B]" />
                    {p.area}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#1E120B] line-clamp-1">
                    {p.title}
                  </h3>

                  <div className="mt-1 text-xs text-[#5C381E]/80">
                    Client: <strong className="text-[#1E120B]">{p.client}</strong>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#7E4F2D] font-medium">Turnkey Progress</span>
                      <span className="font-bold text-[#5C381E]">{p.progress}%</span>
                    </div>
                    <div className="w-full bg-[#EAE3D9] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#5C381E] h-full rounded-full transition-all"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-[#EAE3D9] flex items-center justify-between">
                  <select
                    value={p.status}
                    onChange={(e) => {
                      dispatch(updateProjectStatus({ id: p.id, status: e.target.value }));
                      toast.success(`Updated status for ${p.title}`);
                    }}
                    className="bg-[#FAF8F5] border border-[#D3C5B4] rounded-lg px-2 py-1 text-[11px] font-bold text-[#5C381E]"
                  >
                    <option value="Planning & 3D">Planning & 3D</option>
                    <option value="3D Approved">3D Approved</option>
                    <option value="In Execution">In Execution</option>
                    <option value="Snagging / Handover">Snagging / Handover</option>
                    <option value="Completed">Completed</option>
                  </select>

                  <div className="flex items-center gap-1">
                    <Link
                      to={`/projects/edit/${p.id}`}
                      className="p-1.5 rounded-lg text-[#5C381E] hover:bg-[#FAF8F5] hover:text-[#8B5A2B]"
                      title="Edit project"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id, p.title)}
                      className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-3xl border border-[#EAE3D9] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-[#8B5A2B] uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="py-3.5 px-4">Project Title</th>
                  <th className="py-3.5 px-4">Client</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Area & Budget</th>
                  <th className="py-3.5 px-4">Progress</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE3D9]">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="py-3.5 px-4 font-serif font-bold text-[#1E120B]">
                      {p.title}
                      <span className="block text-[10px] font-normal text-[#7E4F2D]">{p.location}</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#3A2114]">
                      {p.client}
                      <span className="block text-[10px] text-[#8B5A2B]">{p.clientPhone}</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#5C381E]">{p.category}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-[#1E120B]">{p.budget}</span>
                      <span className="block text-[10px] text-[#7E4F2D]">{p.area}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="w-24 bg-[#EAE3D9] h-2 rounded-full overflow-hidden mb-1">
                        <div className="bg-[#5C381E] h-full rounded-full" style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-[#8B5A2B]">{p.progress}%</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#EAE3D9] text-[#5C381E]">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/projects/edit/${p.id}`}
                          className="p-1.5 rounded-lg text-[#5C381E] hover:bg-[#FAF8F5]"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
