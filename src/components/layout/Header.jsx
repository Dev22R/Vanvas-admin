import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Menu, 
  Search, 
  Bell, 
  Plus, 
  CheckCircle2, 
  Clock, 
  User, 
  LogOut, 
  ExternalLink 
} from 'lucide-react';
import { toggleMobileSidebar, markAllNotificationsRead } from '../../store/uiSlice';
import { toast } from 'sonner';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useSelector(state => state.ui.notifications);
  const unreadCount = notifications.filter(n => n.unread).length;
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    navigate(`/projects?search=${encodeURIComponent(searchValue)}`);
  };

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-[#EAE3D9] px-4 sm:px-6 py-3.5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Mobile Menu Toggle & Search Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          <button
            onClick={() => dispatch(toggleMobileSidebar())}
            className="lg:hidden p-2 rounded-xl text-[#3A2114] hover:bg-[#FAF8F5] border border-[#EAE3D9]"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search form */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="w-4 h-4 text-[#8B5A2B] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search projects, client names, materials, leads..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FAF8F5] border border-[#D3C5B4] rounded-full text-xs text-[#3A2114] placeholder-[#A47551]/60 focus:outline-none focus:border-[#8B5A2B] focus:bg-white transition-all"
            />
          </form>
        </div>

        {/* Right: Quick Actions & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          
          {/* Quick Add Project Button */}
          <Link
            to="/projects/add"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#5C381E] text-white text-xs font-semibold hover:bg-[#3A2114] transition-all shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[#DFCA9B]" />
            <span>Create Project</span>
          </Link>

          {/* Notifications Popover Trigger */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="p-2 rounded-full bg-[#FAF8F5] border border-[#D3C5B4] text-[#5C381E] hover:bg-[#EAE3D9] transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8B5A2B] text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Menu */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-[#EAE3D9] p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D9] px-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#3A2114]">
                    Studio Activity
                  </h4>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => dispatch(markAllNotificationsRead())}
                      className="text-[10px] text-[#8B5A2B] font-semibold hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="py-2 space-y-1.5 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl transition-colors ${
                        n.unread ? 'bg-[#FAF8F5] border border-[#EAE3D9]' : 'hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <p className="text-xs font-bold text-[#1E120B]">{n.title}</p>
                      <p className="text-[11px] text-[#5C381E]/80 mt-0.5">{n.message}</p>
                      <span className="text-[9px] text-[#8B5A2B] block mt-1">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2 p-1.5 rounded-full hover:bg-[#FAF8F5] border border-transparent hover:border-[#EAE3D9] transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-[#DFCA9B] text-[#1E120B] font-bold flex items-center justify-center text-xs shadow-sm">
                V
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-[#EAE3D9] p-2 z-50">
                <div className="p-2 border-b border-[#EAE3D9]">
                  <p className="text-xs font-bold text-[#1E120B]">Aarav Deshmukh</p>
                  <p className="text-[10px] text-[#8B5A2B]">aarav@vanvasdesign.com</p>
                </div>
                <div className="py-1">
                  <Link
                    to="/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-3 py-2 text-xs text-[#3A2114] rounded-lg hover:bg-[#FAF8F5]"
                  >
                    Studio Profile & Team
                  </Link>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      toast.info('Logged out from Studio portal demo');
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-rose-600 rounded-lg hover:bg-rose-50 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
