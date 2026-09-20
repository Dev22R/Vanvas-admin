import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { ChevronRight, Home } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();

  // Generate clean breadcrumbs
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const getBreadcrumbLabel = (seg) => {
    switch (seg) {
      case 'projects': return 'Projects & Sites';
      case 'add': return 'New Project Form';
      case 'edit': return 'Edit Project';
      case 'consultations': return 'Consultation Leads';
      case 'wardrobes': return 'Wardrobe Systems';
      case 'services': return 'Studio Services';
      case 'analytics': return 'Revenue & Analytics';
      case 'messages': return 'Client Inquiries';
      case 'settings': return 'Studio Settings';
      default: return seg.charAt(0).toUpperCase() + seg.slice(1);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FAF8F5] text-[#2C1810]">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />

        {/* Breadcrumb strip */}
        <div className="px-4 sm:px-8 pt-4 pb-2 flex items-center gap-1.5 text-[11px] text-[#7E4F2D]">
          <Link to="/" className="hover:text-[#5C381E] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>

          {pathSegments.map((seg, idx) => {
            const path = `/${pathSegments.slice(0, idx + 1).join('/')}`;
            const isLast = idx === pathSegments.length - 1;
            return (
              <React.Fragment key={path}>
                <ChevronRight className="w-3 h-3 text-[#D3C5B4]" />
                {isLast ? (
                  <span className="font-bold text-[#3A2114]">{getBreadcrumbLabel(seg)}</span>
                ) : (
                  <Link to={path} className="hover:text-[#5C381E]">
                    {getBreadcrumbLabel(seg)}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Page Container */}
        <main className="flex-1 p-4 sm:p-8 pt-2 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
