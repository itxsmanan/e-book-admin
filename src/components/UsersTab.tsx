import React, { useState } from 'react';
import { useAdminAuth } from '../context/AuthContext';
import type { User } from '../context/AuthContext';
import { SearchIcon, PlusIcon, CloseIcon } from './Icons';

export const UsersTab: React.FC = () => {
  const { users, toggleUserStatus, deleteUser, addUser, booksList } = useAdminAuth();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal State
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for Adding User
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'User' | 'Moderator' | 'Admin'>('User');
  const [newUserSub, setNewUserSub] = useState<'Monthly' | 'Quarterly' | 'Half-Yearly' | '9-Month Plan' | 'Annual' | 'None'>('None');
  const [newUserAvatar, setNewUserAvatar] = useState('🧑‍💻');

  // Filter and search computation
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    addUser({
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      subscription: newUserSub,
      status: 'Active',
      avatar: newUserAvatar,
      purchasedBooks: []
    });

    // Reset Form
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('User');
    setNewUserSub('None');
    setNewUserAvatar('🧑‍💻');
    setShowAddModal(false);
  };

  const getBookTitle = (bookId: number) => {
    const book = booksList.find(b => b.id === bookId);
    return book ? `${book.title} ${book.cover}` : `Book #${bookId}`;
  };

  return (
    <div>
      {/* Controls Header */}
      <div className="admin-table-controls">
        <div className="admin-search-box">
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="admin-search-icon">
            <SearchIcon size={18} />
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', flexGrow: 1 }}>
          <select 
            className="admin-filter-select"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Moderator">Moderator</option>
            <option value="User">User</option>
          </select>

          <select 
            className="admin-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>

        <button className="admin-btn-action-primary" onClick={() => setShowAddModal(true)}>
          <PlusIcon size={18} />
          <span>Add User</span>
        </button>
      </div>

      {/* Responsive Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Joined Date</th>
              <th>Subscription</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="admin-table-user">
                      <div className="admin-table-avatar">{user.avatar}</div>
                      <div className="admin-table-user-details">
                        <span className="admin-table-username">{user.name}</span>
                        <span className="admin-table-email">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`admin-badge badge-role-${user.role.toLowerCase().slice(0, 3)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-dim)' }}>{user.joinedDate}</span>
                  </td>
                  <td>
                    <span className={`admin-badge badge-sub-${user.subscription.toLowerCase().split(' ')[0]}`}>
                      {user.subscription}
                    </span>
                  </td>
                  <td>
                    <span className={`admin-badge ${user.status === 'Active' ? 'badge-active' : 'badge-suspended'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-action-btn-group" style={{ justifyContent: 'flex-end' }}>
                      <button 
                        className="admin-btn-secondary" 
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                        onClick={() => setSelectedUser(user)}
                      >
                        Details
                      </button>
                      <button 
                        className={`admin-btn-status-toggle ${user.status === 'Active' ? 'suspend' : 'active'}`}
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        {user.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                      <button 
                        className="admin-action-btn delete"
                        onClick={() => deleteUser(user.id)}
                        title="Delete User"
                      >
                        ×
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-dim)' }}>
                  No users found matching filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="admin-modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>User Profile Details</h3>
              <button className="admin-modal-close" onClick={() => setSelectedUser(null)}>
                <CloseIcon size={20} />
              </button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-user-details-card">
                <div className="admin-user-details-profile">
                  <div className="admin-user-details-avatar">{selectedUser.avatar}</div>
                  <div className="admin-user-details-main">
                    <h4>{selectedUser.name}</h4>
                    <p style={{ color: 'var(--text-dim)' }}>{selectedUser.email}</p>
                  </div>
                </div>

                <div className="admin-user-details-grid">
                  <div className="admin-user-detail-item">
                    <label>User ID</label>
                    <p>{selectedUser.id}</p>
                  </div>
                  <div className="admin-user-detail-item">
                    <label>Security Role</label>
                    <p>{selectedUser.role}</p>
                  </div>
                  <div className="admin-user-detail-item">
                    <label>Joined Date</label>
                    <p>{selectedUser.joinedDate}</p>
                  </div>
                  <div className="admin-user-detail-item">
                    <label>Subscription Tier</label>
                    <p>{selectedUser.subscription}</p>
                  </div>
                  <div className="admin-user-detail-item">
                    <label>Account Status</label>
                    <p>{selectedUser.status}</p>
                  </div>
                </div>

                <div className="admin-user-detail-books">
                  <label>Purchased / Borrowed Books ({selectedUser.purchasedBooks.length})</label>
                  {selectedUser.purchasedBooks.length > 0 ? (
                    <div className="admin-user-books-grid">
                      {selectedUser.purchasedBooks.map((bId) => (
                        <span key={bId} className="admin-user-book-tag">
                          {getBookTitle(bId)}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>No books purchased or checked out.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button 
                className={`admin-btn-primary`} 
                style={{ width: 'auto', background: selectedUser.status === 'Active' ? '#ef4444' : '#34d399', color: '#fff', boxShadow: 'none' }}
                onClick={() => {
                  toggleUserStatus(selectedUser.id);
                  // Update state local modal
                  setSelectedUser({
                    ...selectedUser,
                    status: selectedUser.status === 'Active' ? 'Suspended' : 'Active'
                  });
                }}
              >
                {selectedUser.status === 'Active' ? '🛑 Suspend Account' : '✓ Activate Account'}
              </button>
              <button className="admin-btn-secondary" onClick={() => setSelectedUser(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="admin-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Create User Account</h3>
              <button className="admin-modal-close" onClick={() => setShowAddModal(false)}>
                <CloseIcon size={20} />
              </button>
            </div>
            <form onSubmit={handleAddUserSubmit}>
              <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div className="admin-form-group">
                  <label>Full Name</label>
                  <div className="admin-input-wrapper" style={{ display: 'block' }}>
                    <input 
                      type="text" 
                      placeholder="e.g. Sajid Kakar"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      required
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Email Address</label>
                  <div className="admin-input-wrapper" style={{ display: 'block' }}>
                    <input 
                      type="email" 
                      placeholder="e.g. sajid@gmail.com"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      required
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Avatar / Emoji</label>
                  <div className="admin-input-wrapper">
                    <select
                      value={newUserAvatar}
                      onChange={(e) => setNewUserAvatar(e.target.value)}
                    >
                      <option value="🧑‍💻">🧑‍💻 Coder</option>
                      <option value="👩‍⚕️">👩‍⚕️ Doctor</option>
                      <option value="👨‍💼">👨‍💼 Business</option>
                      <option value="👩‍🏫">👩‍🏫 Teacher</option>
                      <option value="👨‍🎨">👨‍🎨 Artist</option>
                      <option value="📖">📖 Reader</option>
                      <option value="✍️">✍️ Author</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Security Role</label>
                  <div className="admin-input-wrapper">
                    <select
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value as any)}
                    >
                      <option value="User">User</option>
                      <option value="Moderator">Moderator</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Subscription Tier</label>
                  <div className="admin-input-wrapper">
                    <select
                      value={newUserSub}
                      onChange={(e) => setNewUserSub(e.target.value as any)}
                    >
                      <option value="None">None (Free Reader)</option>
                      <option value="Monthly">Monthly Plan</option>
                      <option value="Quarterly">Quarterly Plan</option>
                      <option value="Half-Yearly">Half-Yearly Plan</option>
                      <option value="9-Month Plan">9-Month Plan</option>
                      <option value="Annual">Annual Plan</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="submit" className="admin-btn-action-primary" style={{ padding: '0.7rem 1.5rem' }}>
                  Create User
                </button>
                <button type="button" className="admin-btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
