import { createSlice } from '@reduxjs/toolkit';
import { initialProjectsList } from '../data/mockDashboardData';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    items: initialProjectsList,
    filterCategory: 'All',
    searchQuery: '',
    selectedProject: null,
  },
  reducers: {
    addProject: (state, action) => {
      state.items.unshift({
        ...action.payload,
        id: `proj-${Date.now().toString().slice(-4)}`,
        progress: action.payload.progress || 10,
        status: action.payload.status || 'Planning & 3D'
      });
    },
    updateProject: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    deleteProject: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
    updateProjectStatus: (state, action) => {
      const { id, status, progress } = action.payload;
      const project = state.items.find(p => p.id === id);
      if (project) {
        project.status = status;
        if (progress !== undefined) project.progress = progress;
      }
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    }
  }
});

export const {
  addProject,
  updateProject,
  deleteProject,
  updateProjectStatus,
  setFilterCategory,
  setSearchQuery,
  setSelectedProject
} = projectsSlice.actions;

export default projectsSlice.reducer;
