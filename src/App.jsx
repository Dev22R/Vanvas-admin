import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { store } from './store';

import AdminLayout from './components/layout/AdminLayout';
import DashboardOverview from './pages/DashboardOverview';
import ProjectsListPage from './pages/ProjectsListPage';
import ProjectFormPage from './pages/ProjectFormPage';
import ConsultationsPage from './pages/ConsultationsPage';
import WardrobesCatalogPage from './pages/WardrobesCatalogPage';
import ServicesManagementPage from './pages/ServicesManagementPage';
import AnalyticsPage from './pages/AnalyticsPage';
import MessagesPage from './pages/MessagesPage';
import SettingsPage from './pages/SettingsPage';

// Website CMS & Content Management Pages
import HeroCmsPage from './pages/cms/HeroCmsPage';
import TestimonialsCmsPage from './pages/cms/TestimonialsCmsPage';
import EstimatorRatesCmsPage from './pages/cms/EstimatorRatesCmsPage';
import StudiosCmsPage from './pages/cms/StudiosCmsPage';
import PublishCenterPage from './pages/cms/PublishCenterPage';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* Sonner Global Toast Notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1E120B',
              color: '#FAF8F5',
              border: '1px solid #DFCA9B',
              borderRadius: '16px',
              fontFamily: 'inherit'
            }
          }}
        />

        <Routes>
          <Route path="/" element={<AdminLayout />}>
            {/* Dashboard Overview */}
            <Route index element={<DashboardOverview />} />
            
            {/* Projects & Form Sub-routes */}
            <Route path="projects" element={<ProjectsListPage />} />
            <Route path="projects/add" element={<ProjectFormPage />} />
            <Route path="projects/edit/:id" element={<ProjectFormPage />} />
            
            {/* Consultations / Leads Tracker */}
            <Route path="consultations" element={<ConsultationsPage />} />
            
            {/* Wardrobes Catalog Manager */}
            <Route path="wardrobes" element={<WardrobesCatalogPage />} />
            
            {/* Services & Rate Cards */}
            <Route path="services" element={<ServicesManagementPage />} />
            
            {/* Analytics */}
            <Route path="analytics" element={<AnalyticsPage />} />
            
            {/* Client Inquiries & Messages */}
            <Route path="messages" element={<MessagesPage />} />
            
            {/* Website CMS & Content Publishing */}
            <Route path="content/hero" element={<HeroCmsPage />} />
            <Route path="content/testimonials" element={<TestimonialsCmsPage />} />
            <Route path="content/estimator-rates" element={<EstimatorRatesCmsPage />} />
            <Route path="content/studios" element={<StudiosCmsPage />} />
            <Route path="content/publish" element={<PublishCenterPage />} />

            {/* Studio Settings */}
            <Route path="settings" element={<SettingsPage />} />

            {/* Catch-all redirect to Dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
