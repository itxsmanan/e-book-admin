import React from 'react';
import { useAdminAuth } from '../context/AuthContext';
import { TrashIcon, CheckIcon } from './Icons';

export const InquiriesTab: React.FC = () => {
  const { inquiriesList, resolveInquiry, deleteInquiry } = useAdminAuth();

  return (
    <div>
      {/* Informative top section */}
      <div style={{ background: 'rgba(201, 169, 98, 0.05)', border: '1px dashed rgba(201, 169, 98, 0.2)', padding: '1.2rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
        💬 <strong>Reader Support Portal:</strong> View, manage, and address email contact forms and support messages submitted by website visitors.
      </div>

      {/* List of Inquiries */}
      <div className="admin-inquiries-list">
        {inquiriesList.length > 0 ? (
          inquiriesList.map((inq) => (
            <div key={inq.id} className="admin-inquiry-card">
              <div className="admin-inquiry-header">
                <div className="admin-inquiry-user-info">
                  <span className="admin-inquiry-name">{inq.name}</span>
                  <span className="admin-inquiry-email">{inq.email}</span>
                </div>
                
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span className="admin-inquiry-date">📅 {inq.date}</span>
                  <span className={`admin-badge ${inq.status === 'Resolved' ? 'admin-inquiry-badge-resolved' : 'admin-inquiry-badge-pending'}`}>
                    {inq.status}
                  </span>
                </div>
              </div>

              <div className="admin-inquiry-message">
                {inq.message}
              </div>

              <div className="admin-inquiry-footer">
                {inq.status === 'Pending' && (
                  <button 
                    className="admin-btn-action-primary" 
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', background: '#34d399', color: '#0A0E27' }}
                    onClick={() => resolveInquiry(inq.id)}
                  >
                    <CheckIcon size={14} style={{ marginRight: '0.3rem', strokeWidth: 3 }} />
                    Mark Resolved
                  </button>
                )}
                
                <button 
                  className="admin-btn-secondary" 
                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this inquiry?')) {
                      deleteInquiry(inq.id);
                    }
                  }}
                >
                  <TrashIcon size={14} style={{ marginRight: '0.3rem' }} />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ background: 'var(--preview-card-bg)', border: '1px solid var(--border-color)', padding: '4rem', borderRadius: '12px', textAlign: 'center', color: 'var(--text-dim)' }}>
            No inquiries received. Everything is clear!
          </div>
        )}
      </div>

    </div>
  );
};
