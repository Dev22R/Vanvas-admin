import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: false, // For mobile
    sidebarCollapsed: false, // For desktop
    notifications: [
      { id: 1, title: 'New 3D Consultation', message: 'Karan Johar booked for Bandra Penthouse', time: '10m ago', unread: true },
      { id: 2, title: 'Milestone Completed', message: 'The Elysian Grand Penthouse reached 85%', time: '1h ago', unread: true },
      { id: 3, title: 'Contract Signed', message: 'Sanjana Sanghi approved Gourmet Kitchen contract', time: '3h ago', unread: false }
    ],
  },
  reducers: {
    toggleMobileSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setMobileSidebar: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleDesktopSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    markAllNotificationsRead: (state) => {
      state.notifications.forEach(n => n.unread = false);
    }
  }
});

export const {
  toggleMobileSidebar,
  setMobileSidebar,
  toggleDesktopSidebar,
  markAllNotificationsRead
} = uiSlice.actions;

export default uiSlice.reducer;
