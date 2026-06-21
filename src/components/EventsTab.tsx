import React, { useState } from 'react';
import { useAdminAuth } from '../context/AuthContext';
import type { Event } from '../context/AuthContext';
import { PlusIcon, EditIcon, TrashIcon, CloseIcon } from './Icons';

export const EventsTab: React.FC = () => {
  const { eventsList, createEvent, updateEvent, deleteEvent } = useAdminAuth();

  // State for Editor Modal
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [badgeDate, setBadgeDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageIcon, setImageIcon] = useState('📸');
  const [gallery, setGallery] = useState<string[]>([]);
  
  const [celebrityName, setCelebrityName] = useState('');
  const [celebrityTitle, setCelebrityTitle] = useState('');
  const [celebrityAvatar, setCelebrityAvatar] = useState('🌟');
  
  const [quote, setQuote] = useState('');

  // Handle Multi-File Gallery Upload (Base64 conversion in parallel)
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const promises = fileArray.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(base64Images => {
      setGallery(prev => [...prev, ...base64Images]);
    });
  };

  // Handle modal open for Create
  const handleOpenCreate = () => {
    setEditingId(null);
    setTitle('');
    setDate('');
    setBadgeDate('');
    setLocation('');
    setDescription('');
    setImageIcon('📸');
    setGallery([]);
    setCelebrityName('');
    setCelebrityTitle('');
    setCelebrityAvatar('🌟');
    setQuote('');
    setShowEditor(true);
  };

  // Handle modal open for Edit
  const handleOpenEdit = (event: Event) => {
    setEditingId(event.id);
    setTitle(event.title);
    setDate(event.date);
    setBadgeDate(event.badgeDate);
    setLocation(event.location);
    setDescription(event.description);
    setImageIcon(event.imageIcon || '📸');
    setGallery(event.gallery || []);
    setCelebrityName(event.celebrity.name);
    setCelebrityTitle(event.celebrity.title);
    setCelebrityAvatar(event.celebrity.avatar || '🌟');
    setQuote(event.quote);
    setShowEditor(true);
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !location || !celebrityName) return;

    const eventPayload = {
      title,
      date,
      badgeDate: badgeDate || date.split(',')[0],
      location,
      description,
      imageIcon,
      celebrity: {
        name: celebrityName,
        title: celebrityTitle,
        avatar: celebrityAvatar
      },
      quote,
      gallery,
      testimonials: [
        {
          name: celebrityName,
          role: celebrityTitle,
          avatar: celebrityAvatar,
          quote: quote || description.slice(0, 100) + '...'
        }
      ]
    };

    if (editingId !== null) {
      updateEvent(editingId, eventPayload);
    } else {
      createEvent(eventPayload);
    }

    setShowEditor(false);
  };

  return (
    <div>
      {/* Tab Header Controls */}
      <div className="admin-table-controls" style={{ justifyContent: 'flex-end' }}>
        <button className="admin-btn-action-primary" onClick={handleOpenCreate}>
          <PlusIcon size={18} />
          <span>Create New Event</span>
        </button>
      </div>

      {/* Grid of Events */}
      <div className="admin-cards-list-grid">
        {eventsList.map((event) => (
          <div key={event.id} className="admin-entity-card">
            <div className="admin-entity-card-media" style={{ overflow: 'hidden' }}>
              <span className="admin-entity-card-badge">{event.badgeDate}</span>
              {event.gallery && event.gallery.length > 0 ? (
                <img src={event.gallery[0]} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                event.imageIcon
              )}
            </div>
            
            <div className="admin-entity-card-content">
              <h4 className="admin-entity-card-title">{event.title}</h4>
              <div className="admin-entity-card-meta">
                📅 {event.date} <br />
                📍 {event.location}
              </div>
              <p className="admin-entity-card-desc">{event.description}</p>
              
              {/* Event card gallery grid preview */}
              {(() => {
                const galleryList = event.gallery || [];
                if (galleryList.length === 0) return null;
                return (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.4rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                    {galleryList.slice(0, 4).map((img, idx) => (
                      <div 
                        key={idx} 
                        style={{ position: 'relative', width: '100%', paddingBottom: '100%', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-color)' }}
                      >
                        <img src={img} alt="Mini preview" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
                        {idx === 3 && galleryList.length > 4 && (
                          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: 'var(--gold-bright)', fontWeight: 600 }}>
                            +{galleryList.length - 4}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })()}
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto' }}>
                <span style={{ fontSize: '1.2rem' }}>{event.celebrity.avatar}</span>
                <div style={{ lineHeight: '1.2' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)' }}>{event.celebrity.name}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{event.celebrity.title}</div>
                </div>
              </div>
            </div>

            <div className="admin-entity-card-footer">
              <span style={{ fontSize: '0.8rem', color: 'var(--gold-bright)', fontWeight: 500 }}>
                💬 {event.testimonials?.length || 0} Testimonial{event.testimonials?.length !== 1 ? 's' : ''}
              </span>
              <div className="admin-action-btn-group">
                <button 
                  className="admin-action-btn edit" 
                  onClick={() => handleOpenEdit(event)}
                  title="Edit Event"
                >
                  <EditIcon size={16} />
                </button>
                <button 
                  className="admin-action-btn delete" 
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${event.title}"?`)) {
                      deleteEvent(event.id);
                    }
                  }}
                  title="Delete Event"
                >
                  <TrashIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <div className="admin-modal-overlay" onClick={() => setShowEditor(false)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingId !== null ? 'Modify Event Details' : 'Publish New Event'}</h3>
              <button className="admin-modal-close" onClick={() => setShowEditor(false)}>
                <CloseIcon size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                
                <div className="admin-form-group">
                  <label>Event Title</label>
                  <div className="admin-input-wrapper" style={{ display: 'block' }}>
                    <input 
                      type="text" 
                      placeholder="e.g. Supreme Court Book Launch"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Full Date</label>
                    <div className="admin-input-wrapper" style={{ display: 'block' }}>
                      <input 
                        type="text" 
                        placeholder="e.g. December 15, 2025"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Badge Date (Short)</label>
                    <div className="admin-input-wrapper" style={{ display: 'block' }}>
                      <input 
                        type="text" 
                        placeholder="e.g. Dec 15, 2025"
                        value={badgeDate}
                        onChange={(e) => setBadgeDate(e.target.value)}
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Location / Venue</label>
                    <div className="admin-input-wrapper" style={{ display: 'block' }}>
                      <input 
                        type="text" 
                        placeholder="e.g. Supreme Court of Pakistan"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Event Icon (Emoji Default)</label>
                    <div className="admin-input-wrapper">
                      <select
                        value={imageIcon}
                        onChange={(e) => setImageIcon(e.target.value)}
                      >
                        <option value="📸">📸 Camera (Launch/Meet)</option>
                        <option value="🏛️">🏛️ Courthouse/Govt</option>
                        <option value="🎬">🎬 Film/Celebrity</option>
                        <option value="✍️">✍️ Author signing</option>
                        <option value="📚">📚 Books gathering</option>
                        <option value="🎖️">🎖️ Award ceremony</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Event Photo Gallery (Multiple Uploads)</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <label 
                      className="admin-btn-secondary" 
                      style={{ display: 'block', padding: '0.75rem', textAlign: 'center', cursor: 'pointer', margin: 0, textTransform: 'none' }}
                    >
                      🖼️ Select & Upload Pictures
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleGalleryUpload} 
                        style={{ display: 'none' }} 
                      />
                    </label>
                    
                    {gallery.length > 0 && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem', background: 'var(--uploader-bg)', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        {gallery.map((img, idx) => (
                          <div 
                            key={idx} 
                            style={{ position: 'relative', width: '100%', paddingBottom: '100%', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-color)' }}
                          >
                            <img src={img} alt="Uploaded preview" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
                            <button 
                              type="button"
                              style={{ position: 'absolute', top: '2px', right: '2px', width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.95)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}
                              onClick={() => setGallery(prev => prev.filter((_, i) => i !== idx))}
                              title="Delete Photo"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Celebrity Guest Name</label>
                  <div className="admin-input-wrapper" style={{ display: 'block' }}>
                    <input 
                      type="text" 
                      placeholder="e.g. Justice Qazi Faez Isa"
                      value={celebrityName}
                      onChange={(e) => setCelebrityName(e.target.value)}
                      required
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Celebrity Designation / Title</label>
                    <div className="admin-input-wrapper" style={{ display: 'block' }}>
                      <input 
                        type="text" 
                        placeholder="e.g. Chief Justice of Pakistan"
                        value={celebrityTitle}
                        onChange={(e) => setCelebrityTitle(e.target.value)}
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Guest Avatar (Emoji)</label>
                    <div className="admin-input-wrapper">
                      <select
                        value={celebrityAvatar}
                        onChange={(e) => setCelebrityAvatar(e.target.value)}
                      >
                        <option value="👨‍⚖️">👨‍⚖️ Male Judge</option>
                        <option value="👩‍⚖️">👩‍⚖️ Female Judge</option>
                        <option value="🌟">🌟 Star (Mahira/Fawad)</option>
                        <option value="🎖️">🎖️ Official/Officer</option>
                        <option value="📚">📚 Author/Critic</option>
                        <option value="👨‍💼">👨‍💼 Business Leader</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Featured Quote by Guest</label>
                  <div className="admin-input-wrapper" style={{ display: 'block' }}>
                    <input 
                      type="text" 
                      placeholder="e.g. This book brilliantly captures the essence..."
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Full Event Description</label>
                  <textarea 
                    placeholder="Provide a detailed paragraph summary of the ceremony, attendees, and discussions..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

              </div>
              <div className="admin-modal-footer">
                <button type="submit" className="admin-btn-action-primary" style={{ padding: '0.7rem 1.5rem' }}>
                  {editingId !== null ? 'Save Changes' : 'Publish Event'}
                </button>
                <button type="button" className="admin-btn-secondary" onClick={() => setShowEditor(false)}>
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
