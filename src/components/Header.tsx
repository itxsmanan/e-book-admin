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

  const getSectionTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard Overview';
    if (path.includes('/users')) return 'User Access Management';
    if (path.includes('/events')) return 'Literary Events Manager';
    if (path.includes('/subscriptions')) return 'Subscription Pricing Plans';
    if (path.includes('/books')) return 'Library Books Catalog';
    if (path.includes('/inquiries')) return 'Reader Inquiries & Support';
    if (path.includes('/payments')) return 'Payments History';
    return 'Admin Panel';
  };

  return (
    <header className="min-h-[68px] bg-gradient-to-br from-slate/80 to-midnight/70 backdrop-blur-xl saturate-110 border-b border-gold/15 px-3 py-2 flex items-center justify-between gap-3 sticky top-0 z-[90] shadow-[0_18px_45px_rgba(0,0,0,0.18)] sm:min-h-[74px] sm:px-5 lg:min-h-[78px] lg:px-8">
      <div className="flex items-center gap-3 min-w-0 flex-1 sm:gap-4">
        <button 
          className="flex h-11 w-11 flex-none cursor-pointer items-center justify-center rounded-xl border border-text-main/10 bg-text-main/5 text-text-main transition-all duration-300 hover:-translate-y-px hover:border-gold/40 hover:text-gold-bright md:hidden" 
          onClick={() => setIsMobileOpen(true)} 
          aria-label="Open admin navigation"
        >
          <MenuIcon size={24} />
        </button>
        <div className="min-w-0">
          <span className="hidden text-gold text-[0.68rem] font-bold tracking-widest leading-none mb-1.5 uppercase sm:block">Kitabon Ki Dolat</span>
          <h1 className="m-0 max-w-[38vw] overflow-hidden text-ellipsis whitespace-nowrap text-[1rem] font-extrabold leading-tight tracking-tight text-text-main min-[420px]:max-w-[44vw] sm:max-w-[52vw] sm:text-[clamp(1.15rem,2vw,1.65rem)] lg:text-[clamp(1.3rem,2vw,1.8rem)]">{getSectionTitle()}</h1>
        </div>
      </div>

      <div className="flex flex-none items-center gap-2 sm:gap-3">
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-text-main/10 bg-text-main/5 text-text-dim transition-all duration-200 hover:bg-text-main/10 hover:text-text-main"
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
          <div className="hidden min-h-11 items-center gap-2 rounded-full border border-gold/15 bg-text-main/5 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:flex sm:min-h-[52px] sm:gap-3.5 sm:pr-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-gradient-to-br from-gold/30 to-gold-bright/15 text-lg shadow-[0_10px_24px_rgba(201,169,98,0.12)] sm:h-11 sm:w-11 sm:text-xl" aria-hidden="true">
              {'\u270d\ufe0f'}
            </div>
            <div className="hidden min-w-0 flex-col sm:flex">
              <span className="text-[0.95rem] leading-tight font-extrabold text-text-main whitespace-nowrap">{adminUser.name}</span>
              <span className="text-[0.78rem] text-text-dim font-semibold whitespace-nowrap">{adminUser.role}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
