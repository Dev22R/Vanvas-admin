import React from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { monthlyRevenueData, categoryDistributionData } from '../data/mockDashboardData';
import { TrendingUp, Award, Clock, DollarSign } from 'lucide-react';

export default function AnalyticsPage() {
  const spaceDemandData = [
    { type: '3BHK Residences', sqft: 48500, count: 18 },
    { type: '4BHK+ Penthouses', sqft: 34200, count: 8 },
    { type: 'Luxury Villas', sqft: 62000, count: 6 },
    { type: 'Corporate HQ', sqft: 85000, count: 7 },
    { type: 'Bespoke Closets', sqft: 14000, count: 24 },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E120B]">
          Studio Financial & Performance Analytics
        </h1>
        <p className="text-xs text-[#7E4F2D]">
          Real-time metrics on architectural billing velocity, square footage demand, and conversion ratios.
        </p>
      </div>

      {/* 4 Financial Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-[#EAE3D9] shadow-sm space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#8B5A2B]">Total Annual Run Rate</span>
          <p className="text-2xl sm:text-3xl font-serif font-bold text-[#1E120B]">₹ 8.45 Cr</p>
          <p className="text-xs text-emerald-700 font-semibold">+22.4% vs FY 2025</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#EAE3D9] shadow-sm space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#8B5A2B]">Avg Residential Ticket Size</span>
          <p className="text-2xl sm:text-3xl font-serif font-bold text-[#1E120B]">₹ 42.5 L</p>
          <p className="text-xs text-emerald-700 font-semibold">+8.5% premium uplift</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#EAE3D9] shadow-sm space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#8B5A2B]">Total Carpet Area Executed</span>
          <p className="text-2xl sm:text-3xl font-serif font-bold text-[#1E120B]">243,700</p>
          <p className="text-xs text-[#7E4F2D]">Square feet in 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-[#EAE3D9] shadow-sm space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#8B5A2B]">On-Time Handover Index</span>
          <p className="text-2xl sm:text-3xl font-serif font-bold text-[#1E120B]">98.2%</p>
          <p className="text-xs text-emerald-700 font-semibold">Zero penalty streak</p>
        </div>
      </div>

      {/* Chart 1: Monthly Consultations vs Conversion */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#1E120B]">
              Monthly Client Consultations & Pipeline Growth
            </h3>
            <p className="text-xs text-[#7E4F2D]">Total 3D bookings per month (2026)</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAE3D9" />
              <XAxis dataKey="month" stroke="#8B5A2B" fontSize={11} />
              <YAxis stroke="#8B5A2B" fontSize={11} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1E120B', 
                  borderRadius: '12px', 
                  color: '#FAF8F5', 
                  fontSize: '12px' 
                }} 
              />
              <Bar dataKey="consultations" fill="#5C381E" radius={[8, 8, 0, 0]} name="Consultations Booked" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Square Footage Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-sm space-y-4">
          <h3 className="text-lg font-serif font-bold text-[#1E120B]">
            Carpet Area Demand by Architectural Typology
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
            {spaceDemandData.map((d, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE3D9] space-y-1">
                <span className="text-xs font-bold text-[#1E120B] block">{d.type}</span>
                <p className="text-lg font-serif font-bold text-[#5C381E]">{d.sqft.toLocaleString()} sq.ft</p>
                <span className="text-[11px] text-[#7E4F2D]">{d.count} completed sites</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
