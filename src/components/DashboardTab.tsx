import React from 'react';
import { useAdminAuth } from '../context/AuthContext';
import { UsersIcon, BooksIcon, EventsIcon, SubscriptionIcon, InquiriesIcon } from './Icons';

export const DashboardTab: React.FC = () => {
  const { users, booksList, eventsList, plansList, inquiriesList } = useAdminAuth();

  // Calculate statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const suspendedUsers = users.filter(u => u.status === 'Suspended').length;
  const libraryBooks = booksList.length;
  const eventsCount = eventsList.length;
  const pendingInquiries = inquiriesList.filter(i => i.status === 'Pending').length;

  // Calculate live revenue based on active users' subscription plans
  const calculateRevenue = () => {
    let rev = 0;
    users.forEach(u => {
      if (u.status === 'Active') {
        const plan = plansList.find(p => p.name === u.subscription);
        if (plan) {
          rev += plan.price;
        }
      }
    });
    return rev;
  };

  const activeSubscriptionRevenue = calculateRevenue();

  // Find count per subscription plan for visual chart
  const subscriptionCounts = plansList.map(plan => {
    const count = users.filter(u => u.status === 'Active' && u.subscription === plan.name).length;
    return { name: plan.name, count };
  });

  const maxCount = Math.max(...subscriptionCounts.map(s => s.count), 1);

  // Recent simulated actions
  const recentActivities = [
    { type: 'user', text: 'Ali Khan downloaded "The Silent Echo" ebook.', time: '10 minutes ago', avatar: '🧑‍💻' },
    { type: 'sub', text: 'Fatima Zahra renewed her Annual membership.', time: '1 hour ago', avatar: '👩‍⚕️' },
    { type: 'event', text: 'Admin updated details for "Supreme Court Book Launch".', time: '3 hours ago', avatar: '✍️' },
    { type: 'inquiry', text: 'New support ticket: "Payment issue via EasyPaisa" by Amna Malik.', time: '5 hours ago', avatar: '👩‍🏫' },
    { type: 'user', text: 'Hamza Siddiqui added "Building Fortune" to favorites.', time: 'Yesterday', avatar: '👨‍🎨' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Metrics Row */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-blue">
            <UsersIcon size={24} />
          </div>
          <div className="admin-stat-info">
            <h3>Total Users</h3>
            <div className="admin-stat-number">{totalUsers}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
              {activeUsers} Active • {suspendedUsers} Suspended
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-gold">
            <SubscriptionIcon size={24} />
          </div>
          <div className="admin-stat-info">
            <h3>Active Revenue</h3>
            <div className="admin-stat-number">Rs. {activeSubscriptionRevenue.toLocaleString()}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
              Sign-ups Monthly Value
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-green">
            <BooksIcon size={24} />
          </div>
          <div className="admin-stat-info">
            <h3>Books Catalog</h3>
            <div className="admin-stat-number">{libraryBooks}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
              Ebooks & Printed copies
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon icon-accent">
            <EventsIcon size={24} />
          </div>
          <div className="admin-stat-info">
            <h3>Literary Events</h3>
            <div className="admin-stat-number">{eventsCount}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
              Launches & Meetups
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts & Activity Row */}
      <div className="admin-charts-grid">
        
        {/* Subscription stats */}
        <div className="admin-chart-card">
          <h3>Active Subscriptions Distribution</h3>
          <div className="admin-bar-chart">
            {subscriptionCounts.map((sub, index) => {
              const heightPercent = `${(sub.count / maxCount) * 150 + 20}px`;
              return (
                <div key={index} className="admin-chart-bar-wrapper">
                  <div 
                    className="admin-chart-bar" 
                    style={{ height: heightPercent }}
                    data-value={`${sub.count} user${sub.count !== 1 ? 's' : ''}`}
                  />
                  <span className="admin-chart-label">{sub.name}</span>
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: '1rem' }}>
            Hover bars to see exact active reader counts per tier
          </p>
        </div>

        {/* Live Logs */}
        <div className="admin-chart-card">
          <h3>Recent Site Activities</h3>
          <div className="admin-activity-list">
            {recentActivities.map((act, index) => (
              <div key={index} className="admin-activity-item">
                <div className="admin-activity-avatar">{act.avatar}</div>
                <div className="admin-activity-details">
                  <div className="admin-activity-text">{act.text}</div>
                  <div className="admin-activity-time">{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Pending Tasks Banner */}
      {pendingInquiries > 0 && (
        <div className="admin-alert-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <InquiriesIcon size={20} />
            <span>
              You have <strong>{pendingInquiries} pending inquiry request{pendingInquiries > 1 ? 's' : ''}</strong> from readers. Head over to the Inquiries tab to reply.
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
