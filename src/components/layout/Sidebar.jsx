import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  PlusCircle, 
  Users, 
  Sparkles, 
  Layers, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  X, 
  Globe,
  Star,
  Calculator,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { setMobileSidebar } from '../../store/uiSlice';

export default function Sidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { sidebarOpen } = useSelector(state => state.ui);
  const projectsCount = useSelector(state => state.projects.items.length);
  const consultationsCount = useSelector(state => state.consultations.items.filter(c => c.status === 'New').length);

  const mainNavItems = [
    { label: 'Executive Dashboard', path: '/', icon: LayoutDashboard, exact: true },
    { label: 'Projects & Sites', path: '/projects', icon: FolderKanban, badge: projectsCount },
    { label: 'Add New Project', path: '/projects/add', icon: PlusCircle, isSub: true },
    { label: 'Consultation Leads', path: '/consultations', icon: Users, badge: consultationsCount, badgeColor: 'bg-[#8B5A2B] text-white' },
    { label: 'Wardrobe Systems', path: '/wardrobes', icon: Layers },
    { label: 'Studio Services', path: '/services', icon: Sparkles },
    { label: 'Revenue Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Client Inquiries', path: '/messages', icon: MessageSquare },
  ];

  const cmsNavItems = [
    { label: 'Hero & Lookbook CMS', path: '/content/hero', icon: Globe },
    { label: 'Testimonials CMS', path: '/content/testimonials', icon: Star },
    { label: 'Estimator Rates CMS', path: '/content/estimator-rates', icon: Calculator },
    { label: 'Experience Studios', path: '/content/studios', icon: MapPin },
    { label: 'Publish & Live Sync', path: '/content/publish', icon: RefreshCw, badge: 'Live', badgeColor: 'bg-emerald-600 text-white' },
    { label: 'Studio Settings', path: '/settings', icon: Settings },
  ];

  const renderNavList = (items) => (
    items.map((item) => {
      const Icon = item.icon;
      const isActive = item.exact 
        ? location.pathname === item.path 
        : location.pathname.startsWith(item.path) && item.path !== '/';

      return (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={() => dispatch(setMobileSidebar(false))}
          className={({ isActive: active }) => `
            flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group
            ${(item.exact ? active : isActive)
              ? 'bg-[#5C381E] text-white shadow-sm'
              : 'text-[#5C381E]/80 hover:bg-[#EAE3D9]/60 hover:text-[#1E120B]'
            }
            ${item.isSub ? 'ml-3 border-l border-[#D3C5B4] pl-4 py-2' : ''}
          `}
        >
          <div className="flex items-center gap-3">
            <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${(item.exact ? isActive : isActive) ? 'text-[#DFCA9B]' : 'text-[#8B5A2B]'}`} />
            <span>{item.label}</span>
          </div>

          {item.badge !== undefined && (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-[#EAE3D9] text-[#5C381E]'}`}>
              {item.badge}
            </span>
          )}
        </NavLink>
      );
    })
  );

  const NavContent = () => (
    <div className="flex flex-col h-full justify-between">
      <div className="overflow-y-auto flex-1">
        {/* Logo Brand Header */}
        <div className="p-5 border-b border-[#EAE3D9] flex items-center justify-between sticky top-0 bg-white z-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5C381E] to-[#3A2114] flex items-center justify-center text-[#DFCA9B] font-serif font-bold text-lg shadow-sm">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base tracking-wider text-[#3A2114]">
                VANVAS
              </span>
              <span className="text-[9px] font-bold tracking-widest text-[#8B5A2B] uppercase">
                Studio CMS & Control
              </span>
            </div>
          </Link>

          {/* Close button on mobile */}
          <button
            onClick={() => dispatch(setMobileSidebar(false))}
            className="lg:hidden p-1.5 rounded-lg text-[#3A2114] hover:bg-[#EAE3D9]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Core Operations */}
        <div className="p-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-[#8B5A2B]">
            Studio Operations
          </div>
          {renderNavList(mainNavItems)}
        </div>

        {/* Section 2: Website CMS & Content */}
        <div className="p-4 pt-1 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-[#8B5A2B]">
            Website CMS & Publishing
          </div>
          {renderNavList(cmsNavItems)}
        </div>
      </div>

      {/* Bottom Profile Footer */}
      <div className="p-4 border-t border-[#EAE3D9] bg-[#FAF8F5]/80 sticky bottom-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#DFCA9B] text-[#1E120B] font-bold flex items-center justify-center text-xs">
              AD
            </div>
            <div>
              <p className="text-xs font-bold text-[#1E120B]">Aarav Deshmukh</p>
              <p className="text-[10px] text-[#8B5A2B]">Principal Architect</p>
            </div>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" title="Studio CMS Active" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#EAE3D9] h-screen sticky top-0 shrink-0 z-30 shadow-sm">
        <NavContent />
      </aside>

      {/* Mobile Slide-out Drawer with Motion */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => dispatch(setMobileSidebar(false))}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-72 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <NavContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
