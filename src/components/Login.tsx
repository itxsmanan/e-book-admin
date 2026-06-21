import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AuthContext';
import { UserIcon, LockIcon } from './Icons';

export const Login: React.FC = () => {
  const { login, isAuthenticated } = useAdminAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(username, password);
    if (success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError('Invalid username or password credentials.');
    }
  };

  return (
    <div className="admin-auth-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-logo-urdu">کتابوں کی دولت</div>
          <div className="admin-login-logo-eng">KITABON KI DOLAT</div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h2>Admin Access</h2>
          <p>Sign in to manage library events, users, and plans.</p>
        </div>

        {error && (
          <div className="admin-login-error">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit}>
          <div className="admin-form-group">
            <label>Username</label>
            <div className="admin-input-wrapper">
              <span className="admin-input-icon">
                <UserIcon size={18} />
              </span>
              <input 
                type="text" 
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Password</label>
            <div className="admin-input-wrapper">
              <span className="admin-input-icon">
                <LockIcon size={18} />
              </span>
              <input 
                type="password" 
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="admin-btn-primary" style={{ marginTop: '1rem' }}>
            Secure Sign In
          </button>
        </form>

        <div className="admin-login-hint" style={{ color: 'var(--text-dim)' }}>
          <strong>🔑 Testing Credentials:</strong><br />
          Username: <code style={{ color: 'var(--gold-bright)' }}>admin</code><br />
          Password: <code style={{ color: 'var(--gold-bright)' }}>admin123</code>
        </div>
      </div>
    </div>
  );
};

export default Login;
