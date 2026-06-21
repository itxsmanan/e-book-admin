import React, { useState } from 'react';
import { useAdminAuth } from '../context/AuthContext';
import type { Book } from '../context/AuthContext';
import { PlusIcon, EditIcon, TrashIcon, CloseIcon } from './Icons';

export const BooksTab: React.FC = () => {
  const { booksList, createBook, updateBook, deleteBook } = useAdminAuth();

  // State for Editor Modal
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('Dolat Khan Kakar');
  const [category, setCategory] = useState('');
  const [cover, setCover] = useState('📖');
  const [description, setDescription] = useState('');
  const [pages, setPages] = useState<number>(300);
  const [language, setLanguage] = useState('English');
  const [isbn, setIsbn] = useState('978-969-XXXXX-X');
  const [publisher, setPublisher] = useState('Kitabon Ki Dolat Publishing');
  const [published, setPublished] = useState('2026');
  const [ebookPrice, setEbookPrice] = useState<number>(500);
  const [printPrice, setPrintPrice] = useState<number>(1000);

  // Drag and drop state for cover file upload
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setCover(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle Cover File Upload (Base64)
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setCover(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle modal open for Create
  const handleOpenCreate = () => {
    setEditingId(null);
    setTitle('');
    setAuthor('Dolat Khan Kakar');
    setCategory('');
    setCover(''); // Initialize empty for new creations
    setDescription('');
    setPages(300);
    setLanguage('English');
    setIsbn('978-969-XXXXX-X');
    setPublisher('Kitabon Ki Dolat Publishing');
    setPublished('2026');
    setEbookPrice(500);
    setPrintPrice(1000);
    setShowEditor(true);
  };

  // Handle modal open for Edit
  const handleOpenEdit = (book: Book) => {
    setEditingId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setCategory(book.category);
    setCover(book.cover || '');
    setDescription(book.description);
    setPages(book.pages);
    setLanguage(book.language);
    setIsbn(book.isbn);
    setPublisher(book.publisher);
    setPublished(book.published);
    setEbookPrice(book.ebookPrice);
    setPrintPrice(book.printPrice);
    setShowEditor(true);
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !isbn) return;

    // Use default book emoji if they didn't upload any cover image
    const finalCover = cover || '📖';

    const bookPayload = {
      title,
      author,
      category,
      cover: finalCover,
      description,
      pages: Number(pages),
      language,
      isbn,
      publisher,
      published,
      ebookPrice: Number(ebookPrice),
      printPrice: Number(printPrice)
    };

    if (editingId !== null) {
      updateBook(editingId, bookPayload);
    } else {
      createBook(bookPayload);
    }

    setShowEditor(false);
  };

  return (
    <div>
      {/* Tab Header Controls */}
      <div className="admin-table-controls" style={{ justifyContent: 'flex-end' }}>
        <button className="admin-btn-action-primary" onClick={handleOpenCreate}>
          <PlusIcon size={18} />
          <span>Add New Book</span>
        </button>
      </div>

      {/* Grid of Books */}
      <div className="admin-cards-list-grid">
        {booksList.map((book) => (
          <div key={book.id} className="admin-entity-card">
            <div className="admin-entity-card-media" style={{ fontSize: '4rem', overflow: 'hidden' }}>
              {book.id === 1 && <span className="admin-entity-card-badge">Bestseller</span>}
              {book.id === 2 && <span className="admin-entity-card-badge">New Release</span>}
              {book.cover && (book.cover.startsWith('data:') || book.cover.startsWith('http')) ? (
                <img src={book.cover} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                book.cover
              )}
            </div>
            
            <div className="admin-entity-card-content">
              <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase' }}>
                {book.category}
              </div>
              <h4 className="admin-entity-card-title">{book.title}</h4>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>by {book.author}</div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', margin: '0.5rem 0', fontSize: '0.8rem' }}>
                <div>Print: <strong>Rs. {book.printPrice.toLocaleString()}</strong></div>
                <div>Ebook: <strong>Rs. {book.ebookPrice.toLocaleString()}</strong></div>
                <div>Pages: <strong>{book.pages}</strong></div>
                <div>Lang: <strong>{book.language}</strong></div>
              </div>
              
              <p className="admin-entity-card-desc" style={{ marginTop: '0.5rem' }}>{book.description}</p>
            </div>

            <div className="admin-entity-card-footer">
              <span style={{ fontSize: '0.8rem', color: 'var(--gold-bright)', fontWeight: 500 }}>
                ⭐ {book.rating || '5.0'} ({book.reviews || 0} reviews)
              </span>
              <div className="admin-action-btn-group">
                <button 
                  className="admin-action-btn edit" 
                  onClick={() => handleOpenEdit(book)}
                  title="Edit Book Details"
                >
                  <EditIcon size={16} />
                </button>
                <button 
                  className="admin-action-btn delete" 
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${book.title}"?`)) {
                      deleteBook(book.id);
                    }
                  }}
                  title="Delete Book"
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
              <h3>{editingId !== null ? 'Modify Book Details' : 'Catalog New Book'}</h3>
              <button className="admin-modal-close" onClick={() => setShowEditor(false)}>
                <CloseIcon size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                
                <div className="admin-form-group">
                  <label>Book Title</label>
                  <div className="admin-input-wrapper" style={{ display: 'block' }}>
                    <input 
                      type="text" 
                      placeholder="e.g. The Silent Echo"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      style={{ paddingLeft: '1rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Author Name</label>
                    <div className="admin-input-wrapper" style={{ display: 'block' }}>
                      <input 
                        type="text" 
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Language</label>
                    <div className="admin-input-wrapper" style={{ display: 'block' }}>
                      <input 
                        type="text" 
                        placeholder="e.g. English, Urdu"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        required
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Book Cover Image</label>
                  <div style={{ marginTop: '0.4rem' }}>
                    {cover ? (
                      /* Enhanced Premium Cover Preview UI */
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '2rem', 
                        background: 'var(--preview-card-bg)', 
                        padding: '1.2rem', 
                        borderRadius: '12px', 
                        border: '1px solid var(--preview-card-border)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)'
                      }}>
                        {/* 3D Book Cover Mockup Representation */}
                        <div style={{ 
                          width: '85px', 
                          height: '120px', 
                          borderRadius: '8px', 
                          overflow: 'hidden', 
                          border: '1px solid var(--preview-card-border)', 
                          boxShadow: '4px 6px 18px rgba(0, 0, 0, 0.25), inset 2px 0 5px rgba(255, 255, 255, 0.15)',
                          position: 'relative',
                          background: 'var(--navy)',
                          flexShrink: 0
                        }}>
                          {/* Simulated book spine highlight overlay */}
                          <div style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '6px',
                            height: '100%',
                            background: 'linear-gradient(90deg, rgba(0,0,0,0.25) 0%, rgba(255,255,255,0.1) 30%, rgba(0,0,0,0.05) 100%)',
                            zIndex: 2
                          }} />
                          
                          {cover.startsWith('data:') || cover.startsWith('http') ? (
                            <img 
                              src={cover} 
                              alt="Cover Preview" 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                              {cover}
                            </div>
                          )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flexGrow: 1 }}>
                          <div style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: 600, letterSpacing: '0.02em' }}>
                            {cover.startsWith('data:') || cover.startsWith('http') ? 'Custom Cover Image' : `Default Seed Icon (${cover})`}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', lineHeight: '1.4' }}>
                            {cover.startsWith('data:') 
                              ? `Image file loaded • ${(cover.length / 1024).toFixed(0)} KB` 
                              : cover.startsWith('http') 
                                ? 'Loaded from external web address'
                                : 'Default seed emoji. Replace by uploading an image.'}
                          </div>
                          
                          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.2rem' }}>
                            <label 
                              className="admin-btn-secondary" 
                              style={{ 
                                padding: '0.5rem 1rem', 
                                fontSize: '0.8rem', 
                                cursor: 'pointer', 
                                margin: 0, 
                                textTransform: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                border: '1px solid rgba(201, 169, 98, 0.4)',
                                color: 'var(--gold-bright)'
                              }}
                            >
                              <span>🔄 Replace Cover</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleCoverUpload} 
                                style={{ display: 'none' }} 
                              />
                            </label>
                            <button 
                              type="button" 
                              className="admin-btn-secondary" 
                              style={{ 
                                color: '#ef4444', 
                                borderColor: 'rgba(239, 68, 68, 0.25)', 
                                padding: '0.5rem 1rem', 
                                fontSize: '0.8rem',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                              }}
                              onClick={() => setCover('')}
                            >
                              <span>🗑️ Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Drag-and-Drop Image Uploader with premium visual feedback */
                      <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        style={{ 
                          display: 'flex', 
                          flexDirection: 'column', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          padding: '2.5rem 1.5rem', 
                          border: isDragging ? '2px dashed var(--gold-bright)' : '2px dashed var(--uploader-border)', 
                          background: isDragging ? 'rgba(201, 169, 98, 0.06)' : 'var(--uploader-bg)', 
                          borderRadius: '12px', 
                          cursor: 'pointer', 
                          textAlign: 'center',
                          boxShadow: isDragging ? '0 0 25px rgba(201, 169, 98, 0.18)' : 'none',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                      >
                        <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', margin: 0 }}>
                          <span style={{ fontSize: '2.4rem', marginBottom: '0.6rem', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.15))' }}>📸</span>
                          <span style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: 600 }}>Drag & Drop Cover Image Here</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.3rem' }}>or click to browse local files</span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--gold)', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Supports PNG, JPG, or WEBP (Max 2MB)</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleCoverUpload} 
                            style={{ display: 'none' }} 
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Category (Category • Subcategory)</label>
                    <div className="admin-input-wrapper" style={{ display: 'block' }}>
                      <input 
                        type="text" 
                        placeholder="e.g. Fiction • Thriller"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Publishing House</label>
                    <div className="admin-input-wrapper" style={{ display: 'block' }}>
                      <input 
                        type="text" 
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                        required
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Print Copy Price (Rs.)</label>
                    <div className="admin-input-wrapper" style={{ display: 'block' }}>
                      <input 
                        type="number" 
                        placeholder="e.g. 1299"
                        value={printPrice}
                        onChange={(e) => setPrintPrice(Number(e.target.value) || 0)}
                        required
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>E-Book Price (Rs.)</label>
                    <div className="admin-input-wrapper" style={{ display: 'block' }}>
                      <input 
                        type="number" 
                        placeholder="e.g. 899"
                        value={ebookPrice}
                        onChange={(e) => setEbookPrice(Number(e.target.value) || 0)}
                        required
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="admin-form-group">
                    <label>Page Count</label>
                    <div className="admin-input-wrapper" style={{ display: 'block' }}>
                      <input 
                        type="number" 
                        value={pages}
                        onChange={(e) => setPages(Number(e.target.value) || 0)}
                        required
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Published Year</label>
                    <div className="admin-input-wrapper" style={{ display: 'block' }}>
                      <input 
                        type="text" 
                        value={published}
                        onChange={(e) => setPublished(e.target.value)}
                        required
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>ISBN Code</label>
                    <div className="admin-input-wrapper" style={{ display: 'block' }}>
                      <input 
                        type="text" 
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        required
                        style={{ paddingLeft: '1rem' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Book Synopsis / Description</label>
                  <textarea 
                    placeholder="Provide a detailed description of the plot, lessons, and utility of the book..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

              </div>
              <div className="admin-modal-footer">
                <button type="submit" className="admin-btn-action-primary" style={{ padding: '0.7rem 1.5rem' }}>
                  {editingId !== null ? 'Save Changes' : 'Catalog Book'}
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
