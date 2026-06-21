import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AuthContext';
import { MenuIcon } from './Icons';

interface HeaderProps {
  setIsMobileOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ setIsMobileOpen }) => {
  const { adminUser } = useAdminAuth();
  const location = useLocation();

  // Theme state and toggle logic
  const [theme, setTheme] = React.useState(
    () => localStorage.getItem('kitabon_theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
  );

  React.useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.body.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('kitabon_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Determine section title from path
  const getSectionTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard Overview';
    if (path.includes('/users')) return 'User Access Management';
    if (path.includes('/events')) return 'Literary Events Manager';
    if (path.includes('/subscriptions')) return 'Subscription Pricing Plans';
    if (path.includes('/books')) return 'Library Books Catalog';
    if (path.includes('/inquiries')) return 'Reader Inquiries & Support';
    return 'Admin Panel';
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button className="admin-menu-toggle" onClick={() => setIsMobileOpen(true)}>
          <MenuIcon size={24} />
        </button>
        <h1 className="admin-header-title">{getSectionTitle()}</h1>
      </div>

      <div className="admin-header-right" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
        <button 
          onClick={toggleTheme} 
          className="admin-theme-toggle-btn"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          type="button"
        >
          {theme === 'light' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
        </button>

        {adminUser && (
          <div className="admin-header-user-profile">
            <div className="admin-user-avatar">
              ✍️
            </div>
            <div className="admin-user-info">
              <span className="admin-user-name">{adminUser.name}</span>
              <span className="admin-user-role">{adminUser.role}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
