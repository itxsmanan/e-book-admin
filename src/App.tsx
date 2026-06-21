import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboardLayout from './components/AdminDashboardLayout';
import { DashboardTab } from './components/DashboardTab';
import { UsersTab } from './components/UsersTab';
import { EventsTab } from './components/EventsTab';
import { SubscriptionsTab } from './components/SubscriptionsTab';
import { BooksTab } from './components/BooksTab';
import { InquiriesTab } from './components/InquiriesTab';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="admin-panel-root">
        <Routes>
          {/* Public Login Route */}
          <Route path="login" element={<Login />} />

          {/* Protected Admin Routes mapped under layout Outlet */}
          <Route element={
            <ProtectedRoute>
              <AdminDashboardLayout />
            </ProtectedRoute>
          }>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardTab />} />
            <Route path="users" element={<UsersTab />} />
            <Route path="events" element={<EventsTab />} />
            <Route path="subscriptions" element={<SubscriptionsTab />} />
            <Route path="books" element={<BooksTab />} />
            <Route path="inquiries" element={<InquiriesTab />} />
          </Route>

          {/* Catch-all Redirect */}
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
