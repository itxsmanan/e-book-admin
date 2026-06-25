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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-midnight p-6">
      <div className="w-full max-w-[450px] bg-slate/65 backdrop-blur-xl border border-text-main/10 border-t-2 border-t-gold rounded-2xl p-10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-10 transition-all duration-300 hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] hover:border-gold/25">
        <div className="text-center mb-8">
          <div className="font-[Noto_Nastaliq_Urdu,serif] text-3xl text-gold-bright mb-1 drop-shadow-[0_0_10px_rgba(232,197,116,0.2)]">کتابوں کی دولت</div>
          <div className="text-xs font-bold tracking-[0.15em] text-text-dim uppercase">KITABON KI DOLAT</div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl text-text-main font-semibold mb-2">Admin Access</h2>
          <p className="text-text-dim text-sm">Sign in to manage library events, users, and plans.</p>
        </div>

        {error && (
          <div className="bg-accent/15 border border-accent/30 p-3 rounded-lg text-accent-light text-sm mb-6 flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit}>
          <div className="mb-6 text-left">
            <label className="block text-[0.85rem] font-semibold text-text-dim mb-2 uppercase tracking-[0.05em]">Username</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-text-dim pointer-events-none">
                <UserIcon size={18} />
              </span>
              <input 
                type="text" 
                placeholder="Enter admin username"
                className="w-full py-3 pr-4 pl-11 bg-midnight/60 border border-text-main/10 rounded-lg text-text-main text-[0.95rem] transition-all duration-300 focus:outline-none focus:border-gold focus:bg-midnight/90 focus:shadow-[0_0_10px_rgba(201,169,98,0.15)]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-6 text-left">
            <label className="block text-[0.85rem] font-semibold text-text-dim mb-2 uppercase tracking-[0.05em]">Password</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-text-dim pointer-events-none">
                <LockIcon size={18} />
              </span>
              <input 
                type="password" 
                placeholder="Enter password"
                className="w-full py-3 pr-4 pl-11 bg-midnight/60 border border-text-main/10 rounded-lg text-text-main text-[0.95rem] transition-all duration-300 focus:outline-none focus:border-gold focus:bg-midnight/90 focus:shadow-[0_0_10px_rgba(201,169,98,0.15)]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full p-3 mt-4 bg-gradient-to-br from-gold to-gold-bright border-none rounded-lg text-midnight text-base font-bold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(201,169,98,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(201,169,98,0.5)] hover:from-gold-bright hover:to-gold active:translate-y-0">
            Secure Sign In
          </button>
        </form>

        <div className="mt-6 text-[0.8rem] p-2.5 rounded-md bg-text-main/5 border border-dashed border-text-main/10 text-text-dim">
          <strong>🔑 Testing Credentials:</strong><br />
          Username: <code className="text-gold-bright">admin</code><br />
          Password: <code className="text-gold-bright">admin123</code>
        </div>
      </div>
    </div>
  );
};

export default Login;
