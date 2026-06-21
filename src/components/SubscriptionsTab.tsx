import React, { useState } from 'react';
import { useAdminAuth } from '../context/AuthContext';
import type { SubscriptionPlan } from '../context/AuthContext';
import { CloseIcon } from './Icons';

export const SubscriptionsTab: React.FC = () => {
  const { plansList, updatePlan } = useAdminAuth();

  // Modal State
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  
  // Form State
  const [price, setPrice] = useState<number>(0);
  const [saveText, setSaveText] = useState('');
  const [badge, setBadge] = useState('');
  const [features, setFeatures] = useState<string>('');
  const [isPopular, setIsPopular] = useState(false);
  const [isGold, setIsGold] = useState(false);

  const handleOpenEdit = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setPrice(plan.price);
    setSaveText(plan.saveText);
    setBadge(plan.badge || '');
    setFeatures(plan.features.join('\n'));
    setIsPopular(plan.isPopular);
    setIsGold(plan.isGold);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;

    updatePlan(editingPlan.name, {
      price,
      saveText,
      badge: badge || undefined,
      features: features.split('\n').filter(f => f.trim() !== ''),
      isPopular,
      isGold
    });

    setEditingPlan(null);
  };

  return (
    <div>
      {/* Informative top section */}
      <div style={{ background: 'rgba(201, 169, 98, 0.05)', border: '1px dashed rgba(201, 169, 98, 0.2)', padding: '1.2rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
        💬 <strong>Membership Tiers Configurator:</strong> Updates to these pricing structures and perk lists dynamically overwrite the website's landing page cards.
      </div>

      {/* Grid of Plans */}
      <div className="admin-plans-grid">
        {plansList.map((plan, idx) => (
          <div key={idx} className={`admin-plan-card ${plan.isPopular ? 'popular' : ''}`}>
            {plan.badge && <span className="admin-plan-badge">{plan.badge}</span>}
            <h3 className="admin-plan-name">{plan.name}</h3>
            
            <div className="admin-plan-price">
              Rs. {plan.price.toLocaleString()}
              <span>{plan.period}</span>
            </div>
            
            <p className="admin-plan-save">{plan.saveText}</p>
            
            <ul className="admin-plan-features-list">
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx}>{feature}</li>
              ))}
            </ul>

            <button className="admin-plan-edit-btn" onClick={() => handleOpenEdit(plan)}>
              Edit Plan Tier
            </button>
          </div>
        ))}
      </div>

      {/* Edit Plan Modal */}
      {editingPlan && (
        <div className="admin-modal-overlay" onClick={() => setEditingPlan(null)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Edit {editingPlan.name} Plan Details</h3>
              <button className="admin-modal-close" onClick={() => setEditingPlan(null)}>
                <CloseIcon size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                
                <div className="admin-form-group">
                  <label>Plan Price (Rs.)</label>
                  <div className="admin-input-wrapper" style={{ display: 'block' }}>
                    <input 
                      type="number" 
                      placeholder="e.g. 499"
                      value={price}
                      onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                      required
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Savings / Highlight Text</label>
                  <div className="admin-input-wrapper" style={{ display: 'block' }}>
                    <input 
                      type="text" 
                      placeholder="e.g. Save 20% • Rs. 400/month"
                      value={saveText}
                      onChange={(e) => setSaveText(e.target.value)}
                      required
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Plan Highlight Badge</label>
                  <div className="admin-input-wrapper" style={{ display: 'block' }}>
                    <input 
                      type="text" 
                      placeholder="e.g. Most Popular or Best Deal (Leave blank if none)"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textTransform: 'none' }}>
                      <input 
                        type="checkbox" 
                        checked={isPopular} 
                        onChange={(e) => setIsPopular(e.target.checked)}
                        style={{ width: 'auto', outline: 'none' }}
                      />
                      <span>Highlight Card (Border color)</span>
                    </label>
                  </div>

                  <div className="admin-form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textTransform: 'none' }}>
                      <input 
                        type="checkbox" 
                        checked={isGold} 
                        onChange={(e) => setIsGold(e.target.checked)}
                        style={{ width: 'auto', outline: 'none' }}
                      />
                      <span>Gold Accent Button</span>
                    </label>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Plan Perks / Features (One per line)</label>
                  <textarea 
                    placeholder="e.g.&#10;Full E-Library access&#10;Unlimited book downloads&#10;Audio book streaming"
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    required
                    style={{ minHeight: '150px' }}
                  />
                </div>

              </div>
              <div className="admin-modal-footer">
                <button type="submit" className="admin-btn-action-primary" style={{ padding: '0.7rem 1.5rem' }}>
                  Update Plan
                </button>
                <button type="button" className="admin-btn-secondary" onClick={() => setEditingPlan(null)}>
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
