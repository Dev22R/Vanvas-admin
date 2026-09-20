import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  TrendingUp, 
  Home, 
  Users, 
  Sparkles, 
  ArrowUpRight, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ChevronRight 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { 
  initialKPIs, 
  monthlyRevenueData, 
  categoryDistributionData 
} from '../data/mockDashboardData';
import { updateConsultationStatus } from '../store/consultationsSlice';
import { toast } from 'sonner';

export default function DashboardOverview() {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.projects.items);
  const consultations = useSelector(state => state.consultations.items);

  const getKpiIcon = (name) => {
    switch (name) {
      case 'TrendingUp': return TrendingUp;
      case 'Home': return Home;
      case 'Users': return Users;
      case 'Sparkles': return Sparkles;
      default: return TrendingUp;
    }
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateConsultationStatus({ id, status: newStatus }));
    toast.success(`Lead status updated to ${newStatus}`);
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* Welcome Banner & Quick Action */}
      <div className="bg-gradient-to-r from-[#1E120B] via-[#3A2114] to-[#5C381E] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#DFCA9B] text-xs font-semibold uppercase tracking-wider border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Management Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-white">
            Welcome back, Architect Aarav
          </h1>
          <p className="text-xs sm:text-sm text-white/70 max-w-lg leading-relaxed">
            You have <strong className="text-[#DFCA9B]">{consultations.filter(c => c.status === 'New').length} new design consultation inquiries</strong> and <strong className="text-white">{projects.filter(p => p.status === 'In Execution').length} active sites</strong> in execution.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10 w-full sm:w-auto">
          <Link
            to="/projects/add"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#DFCA9B] text-[#1E120B] text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </Link>

          <Link
            to="/consultations"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all border border-white/20"
          >
            <span>Review Leads</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Subtle decorative circle */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {initialKPIs.map((kpi) => {
          const Icon = getKpiIcon(kpi.iconName);
          return (
            <div
              key={kpi.id}
              className="bg-white rounded-3xl p-6 border border-[#EAE3D9] shadow-sm hover:shadow-md transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
                  {kpi.title}
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#D3C5B4] flex items-center justify-center text-[#5C381E]">
                  <Icon className="w-4 h-4 text-[#8B5A2B]" />
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#1E120B]">
                  {kpi.id === 'active-projects' ? projects.length : kpi.value}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {kpi.change}
                </span>
              </div>

              <p className="text-[11px] text-[#7E4F2D]/75">
                {kpi.period}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts Section: Revenue Area Chart & Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Monthly Revenue Area Chart (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-serif font-bold text-[#1E120B]">
                Revenue & Turnkey Execution Velocity
              </h3>
              <p className="text-xs text-[#7E4F2D]">Monthly billing in ₹ Lakhs (2026 Q1-Q3)</p>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-[#5C381E]">
                <span className="w-3 h-3 rounded-full bg-[#5C381E]" />
                Actual Billing
              </span>
              <span className="flex items-center gap-1.5 text-[#C5A059]">
                <span className="w-3 h-3 rounded-full bg-[#C5A059]" />
                Target
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5C381E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#5C381E" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C5A059" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#C5A059" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE3D9" />
                <XAxis dataKey="month" stroke="#8B5A2B" fontSize={11} />
                <YAxis stroke="#8B5A2B" fontSize={11} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E120B', 
                    borderRadius: '12px', 
                    border: '1px solid #DFCA9B', 
                    color: '#FAF8F5', 
                    fontSize: '12px' 
                  }} 
                />
                <Area type="monotone" dataKey="revenue" stroke="#5C381E" strokeWidth={2.5} fillOpacity={1} fill="url(#revenueGrad)" name="Revenue (₹ Lakhs)" />
                <Area type="monotone" dataKey="target" stroke="#C5A059" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#targetGrad)" name="Studio Target" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Space Category Distribution (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#1E120B]">
              Space Portfolio Share
            </h3>
            <p className="text-xs text-[#7E4F2D]">By project volume & square footage</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E120B', 
                    borderRadius: '12px', 
                    color: '#FAF8F5', 
                    fontSize: '12px' 
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#EAE3D9]">
            {categoryDistributionData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[#3A2114] font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-[#1E120B]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Tables Section: Recent Inquiries & Active Sites */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Inquiries Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#EAE3D9] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-serif font-bold text-[#1E120B]">
                Recent 3D Consultation Inquiries
              </h3>
              <p className="text-xs text-[#7E4F2D]">Incoming requests from user portal</p>
            </div>
            <Link to="/consultations" className="text-xs font-bold text-[#8B5A2B] hover:underline flex items-center gap-1">
              <span>View All ({consultations.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-[#8B5A2B] uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="py-3 px-3 rounded-l-xl">Client</th>
                  <th className="py-3 px-3">Space Type</th>
                  <th className="py-3 px-3">Budget</th>
                  <th className="py-3 px-3 rounded-r-xl">Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE3D9]">
                {consultations.slice(0, 4).map((c) => (
                  <tr key={c.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="py-3 px-3 font-semibold text-[#1E120B]">
                      {c.name}
                      <span className="block text-[10px] text-[#7E4F2D] font-normal">{c.city}</span>
                    </td>
                    <td className="py-3 px-3 text-[#5C381E]">{c.spaceType}</td>
                    <td className="py-3 px-3 text-[#1E120B] font-medium">{c.budget}</td>
                    <td className="py-3 px-3">
                      <select
                        value={c.status}
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                        className="bg-[#FAF8F5] border border-[#D3C5B4] rounded-lg px-2 py-1 text-[11px] font-semibold text-[#5C381E] focus:outline-none focus:border-[#8B5A2B]"
                      >
                        <option value="New">New</option>
                        <option value="Moodboard Sent">Moodboard Sent</option>
                        <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                        <option value="Contract Signed">Contract Signed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Active Projects Milestones (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#EAE3D9] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-serif font-bold text-[#1E120B]">
                Active Project Milestones
              </h3>
              <p className="text-xs text-[#7E4F2D]">On-site turnkey progression</p>
            </div>
            <Link to="/projects" className="text-xs font-bold text-[#8B5A2B] hover:underline flex items-center gap-1">
              <span>All Projects</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {projects.slice(0, 4).map((p) => (
              <div key={p.id} className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#EAE3D9] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#1E120B] line-clamp-1">{p.title}</h4>
                  <span className="text-[10px] font-bold text-[#8B5A2B] bg-white px-2 py-0.5 rounded-full border border-[#D3C5B4]">
                    {p.progress}%
                  </span>
                </div>

                <div className="w-full bg-[#EAE3D9] h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#5C381E] h-full rounded-full transition-all duration-500" 
                    style={{ width: `${p.progress}%` }} 
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#7E4F2D]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#8B5A2B]" />
                    {p.location}
                  </span>
                  <span>Lead: {p.leadArchitect}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
