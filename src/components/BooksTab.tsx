import React, { useState } from "react";
import { useAdminAuth } from "../context/AuthContext";
import type { Book } from "../context/AuthContext";
import {
  BookCoverIcon,
  BuildingIcon,
  CalendarIcon,
  CloseIcon,
  DollarIcon,
  EditIcon,
  FileTextIcon,
  GlobeIcon,
  HashIcon,
  ImageIcon,
  PlusIcon,
  StarIcon,
  TagIcon,
  TrashIcon,
  TypeIcon,
  UserIcon,
} from "./Icons";
import { tw } from "./adminTailwind";

const defaultCover = "Book";

export const BooksTab: React.FC = () => {
  const { booksList, createBook, updateBook, deleteBook } = useAdminAuth();
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("Dolat Khan Kakar");
  const [category, setCategory] = useState("");
  const [cover, setCover] = useState("");
  const [description, setDescription] = useState("");
  const [pages, setPages] = useState(300);
  const [language, setLanguage] = useState("English");
  const [isbn, setIsbn] = useState("978-969-XXXXX-X");
  const [publisher, setPublisher] = useState("Kitabon Ki Dolat Publishing");
  const [published, setPublished] = useState("2026");
  const [ebookPrice, setEbookPrice] = useState(500);
  const [printPrice, setPrintPrice] = useState(1000);
  const [isDragging, setIsDragging] = useState(false);

  const loadCoverFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") setCover(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setTitle("");
    setAuthor("Dolat Khan Kakar");
    setCategory("");
    setCover("");
    setDescription("");
    setPages(300);
    setLanguage("English");
    setIsbn("978-969-XXXXX-X");
    setPublisher("Kitabon Ki Dolat Publishing");
    setPublished("2026");
    setEbookPrice(500);
    setPrintPrice(1000);
    setShowEditor(true);
  };

  const handleOpenEdit = (book: Book) => {
    setEditingId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setCategory(book.category);
    setCover(book.cover || "");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !isbn) return;

    const bookPayload = {
      title,
      author,
      category,
      cover: cover || defaultCover,
      description,
      pages: Number(pages),
      language,
      isbn,
      publisher,
      published,
      ebookPrice: Number(ebookPrice),
      printPrice: Number(printPrice),
    };

    if (editingId !== null) updateBook(editingId, bookPayload);
    else createBook(bookPayload);

    setShowEditor(false);
  };

  return (
    <div className="grid gap-6">
      <div className="flex justify-end">
        <button className={tw.primaryBtn} onClick={handleOpenCreate}>
          <PlusIcon size={18} />
          Add New Book
        </button>
      </div>

      <div className={tw.cardGrid}>
        {booksList.map((book) => (
          <article key={book.id} className={`${tw.card} flex flex-col`}>
            <div className={tw.media}>
              {book.id === 1 && (
                <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-black uppercase text-midnight">
                  Bestseller
                </span>
              )}
              {book.cover && (book.cover.startsWith("data:") || book.cover.startsWith("http")) ? (
                <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-navy/30 text-text-dim">
                  <BookCoverIcon size={48} className="opacity-50" />
                </div>
              )}
            </div>

            <div className={tw.cardBody}>
              <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-gold">
                <TagIcon size={14} />
                {book.category}
              </p>
              <h3 className="text-lg font-black leading-tight text-text-main">{book.title}</h3>
              <p className="inline-flex items-center gap-2 text-sm text-text-dim">
                <UserIcon size={15} className="text-gold/80" />
                by {book.author}
              </p>

              <div className="grid grid-cols-2 gap-2 text-sm text-text-dim">
                <span className="inline-flex min-w-0 items-center gap-2 rounded-xl bg-midnight/25 px-3 py-2">
                  <DollarIcon size={15} className="shrink-0 text-gold/80" />
                  <span className="min-w-0 truncate">Print: <strong className="text-text-main">Rs. {book.printPrice.toLocaleString()}</strong></span>
                </span>
                <span className="inline-flex min-w-0 items-center gap-2 rounded-xl bg-midnight/25 px-3 py-2">
                  <DollarIcon size={15} className="shrink-0 text-gold/80" />
                  <span className="min-w-0 truncate">Ebook: <strong className="text-text-main">Rs. {book.ebookPrice.toLocaleString()}</strong></span>
                </span>
                <span className="inline-flex min-w-0 items-center gap-2 rounded-xl bg-midnight/25 px-3 py-2">
                  <FileTextIcon size={15} className="shrink-0 text-gold/80" />
                  <span className="min-w-0 truncate">Pages: <strong className="text-text-main">{book.pages}</strong></span>
                </span>
                <span className="inline-flex min-w-0 items-center gap-2 rounded-xl bg-midnight/25 px-3 py-2">
                  <GlobeIcon size={15} className="shrink-0 text-gold/80" />
                  <span className="min-w-0 truncate">Lang: <strong className="text-text-main">{book.language}</strong></span>
                </span>
              </div>

              <p className="line-clamp-4 text-sm leading-6 text-text-dim">{book.description}</p>
            </div>

            <div className={tw.cardFooter}>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-gold-bright">
                <StarIcon size={16} />
                {book.rating || "5.0"} ({book.reviews || 0} reviews)
              </span>
              <div className="flex gap-2">
                <button className={tw.iconBtn} onClick={() => handleOpenEdit(book)} title="Edit Book">
                  <EditIcon size={16} />
                </button>
                <button
                  className={tw.dangerIconBtn}
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${book.title}"?`)) deleteBook(book.id);
                  }}
                  title="Delete Book"
                >
                  <TrashIcon size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {showEditor && (
        <div className={tw.modalOverlay} onClick={() => setShowEditor(false)}>
          <div className={`${tw.modalContent} max-w-4xl`} onClick={(e) => e.stopPropagation()}>
            <div className={tw.modalHeader}>
              <h3 className={tw.modalTitle}>{editingId !== null ? "Modify Book Details" : "Catalog New Book"}</h3>
              <button className={tw.iconBtn} onClick={() => setShowEditor(false)} type="button">
                <CloseIcon size={20} />
              </button>
            </div>

            <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleSubmit}>
              <div className={tw.modalBody}>
                <label className={tw.field}>
                  <span>Book Title</span>
                  <div className={tw.control}>
                    <TypeIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} value={title} onChange={(e) => setTitle(e.target.value)} required />
                  </div>
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className={tw.field}>
                    <span>Author Name</span>
                    <div className={tw.control}>
                    <UserIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} value={author} onChange={(e) => setAuthor(e.target.value)} required />
                  </div>
                  </label>
                  <label className={tw.field}>
                    <span>Language</span>
                    <div className={tw.control}>
                    <GlobeIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} value={language} onChange={(e) => setLanguage(e.target.value)} required />
                  </div>
                  </label>
                </div>

                <label className={tw.field}>
                  <span>Book Cover Image</span>
                  {cover ? (
                    <div className="flex flex-col gap-4 rounded-2xl border border-text-main/10 bg-midnight/25 p-4 sm:flex-row sm:items-center">
                      <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-xl border border-text-main/10 bg-navy/50">
                        {cover && (cover.startsWith("data:") || cover.startsWith("http")) ? (
                          <img src={cover} alt="Cover preview" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-gold-bright/60">
                            <BookCoverIcon size={32} />
                          </div>
                        )}
                      </div>
                      <div className="grid flex-1 gap-3">
                        <p className="font-bold text-text-main">
                          {cover.startsWith("data:") || cover.startsWith("http") ? "Custom Cover Image" : cover}
                        </p>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <label className={tw.secondaryBtn}>
                            <ImageIcon size={16} />
                            Replace Cover
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => loadCoverFile(e.target.files?.[0])}
                              className="hidden"
                            />
                          </label>
                          <button className={tw.dangerBtn} type="button" onClick={() => setCover("")}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label
                      className={`grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
                        isDragging ? "border-gold bg-gold/10" : "border-text-main/15 bg-midnight/25 hover:border-gold/50"
                      }`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        loadCoverFile(e.dataTransfer.files?.[0]);
                      }}
                    >
                      <ImageIcon size={30} className="mb-3 text-gold-bright" />
                      <span className="text-sm font-bold text-text-main">Drag & drop cover image here</span>
                      <span className="mt-1 text-xs text-text-dim">or click to browse PNG, JPG, or WEBP</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => loadCoverFile(e.target.files?.[0])}
                        className="hidden"
                      />
                    </label>
                  )}
                </label>

                <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
                  <label className={tw.field}>
                    <span>Category</span>
                    <div className={tw.control}>
                    <TagIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} value={category} onChange={(e) => setCategory(e.target.value)} required />
                  </div>
                  </label>
                  <label className={tw.field}>
                    <span>Publishing House</span>
                    <div className={tw.control}>
                    <BuildingIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} value={publisher} onChange={(e) => setPublisher(e.target.value)} required />
                  </div>
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className={tw.field}>
                    <span>Print Copy Price (Rs.)</span>
                    <div className={tw.control}>
                    <DollarIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} type="number" value={printPrice} onChange={(e) => setPrintPrice(Number(e.target.value) || 0)} required />
                  </div>
                  </label>
                  <label className={tw.field}>
                    <span>E-Book Price (Rs.)</span>
                    <div className={tw.control}>
                    <DollarIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} type="number" value={ebookPrice} onChange={(e) => setEbookPrice(Number(e.target.value) || 0)} required />
                  </div>
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <label className={tw.field}>
                    <span>Page Count</span>
                    <div className={tw.control}>
                    <FileTextIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} type="number" value={pages} onChange={(e) => setPages(Number(e.target.value) || 0)} required />
                  </div>
                  </label>
                  <label className={tw.field}>
                    <span>Published Year</span>
                    <div className={tw.control}>
                    <CalendarIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} value={published} onChange={(e) => setPublished(e.target.value)} required />
                  </div>
                  </label>
                  <label className={tw.field}>
                    <span>ISBN Code</span>
                    <div className={tw.control}>
                    <HashIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
                  </div>
                  </label>
                </div>

                <label className={tw.field}>
                  <span>Book Synopsis / Description</span>
                  <div className={tw.control}>
                    <FileTextIcon className={tw.textareaIcon} size={18} />
                    <textarea className={tw.textarea} value={description} onChange={(e) => setDescription(e.target.value)} required />
                  </div>
                </label>
              </div>

              <div className={tw.modalFooter}>
                <button className={tw.secondaryBtn} type="button" onClick={() => setShowEditor(false)}>
                  Cancel
                </button>
                <button className={tw.primaryBtn} type="submit">
                  {editingId !== null ? "Save Changes" : "Catalog Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
