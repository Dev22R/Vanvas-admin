import { createSlice } from '@reduxjs/toolkit';
import { initialConsultationsList } from '../data/mockDashboardData';

const consultationsSlice = createSlice({
  name: 'consultations',
  initialState: {
    items: initialConsultationsList,
    statusFilter: 'All',
    searchQuery: '',
  },
  reducers: {
    addConsultation: (state, action) => {
      state.items.unshift({
        ...action.payload,
        id: `lead-${Date.now().toString().slice(-4)}`,
        date: new Date().toISOString().split('T')[0],
        status: 'New'
      });
    },
    updateConsultationStatus: (state, action) => {
      const { id, status } = action.payload;
      const item = state.items.find(c => c.id === id);
      if (item) {
        item.status = status;
      }
    },
    deleteConsultation: (state, action) => {
      state.items = state.items.filter(c => c.id !== action.payload);
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  }
});

export const {
  addConsultation,
  updateConsultationStatus,
  deleteConsultation,
  setStatusFilter,
  setSearchQuery
} = consultationsSlice.actions;

export default consultationsSlice.reducer;
