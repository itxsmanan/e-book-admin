import React, { useState } from "react";
import { useAdminAuth } from "../context/AuthContext";
import type { Event } from "../context/AuthContext";
import {
  BuildingIcon,
  CalendarIcon,
  CloseIcon,
  EditIcon,
  FileTextIcon,
  ImageIcon,
  MapPinIcon,
  PlusIcon,
  QuoteIcon,
  StarIcon,
  TagIcon,
  TrashIcon,
  TypeIcon,
  UserIcon,
} from "./Icons";
import { tw } from "./adminTailwind";

const eventIcons = ["Camera", "Courthouse", "Film", "Author signing", "Books gathering", "Award ceremony"];
const guestAvatars = ["Judge", "Guest", "Star", "Officer", "Author", "Business Leader"];

export const EventsTab: React.FC = () => {
  const { eventsList, createEvent, updateEvent, deleteEvent } = useAdminAuth();
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [badgeDate, setBadgeDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageIcon, setImageIcon] = useState("Camera");
  const [gallery, setGallery] = useState<string[]>([]);
  const [celebrityName, setCelebrityName] = useState("");
  const [celebrityTitle, setCelebrityTitle] = useState("");
  const [celebrityAvatar, setCelebrityAvatar] = useState("Guest");
  const [quote, setQuote] = useState("");

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Promise.all(
      Array.from(files).map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          }),
      ),
    ).then((base64Images) => setGallery((prev) => [...prev, ...base64Images]));
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setTitle("");
    setDate("");
    setBadgeDate("");
    setLocation("");
    setDescription("");
    setImageIcon("Camera");
    setGallery([]);
    setCelebrityName("");
    setCelebrityTitle("");
    setCelebrityAvatar("Guest");
    setQuote("");
    setShowEditor(true);
  };

  const handleOpenEdit = (event: Event) => {
    setEditingId(event.id);
    setTitle(event.title);
    setDate(event.date);
    setBadgeDate(event.badgeDate);
    setLocation(event.location);
    setDescription(event.description);
    setImageIcon(event.imageIcon || "Camera");
    setGallery(event.gallery || []);
    setCelebrityName(event.celebrity.name);
    setCelebrityTitle(event.celebrity.title);
    setCelebrityAvatar(event.celebrity.avatar || "Guest");
    setQuote(event.quote);
    setShowEditor(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !location || !celebrityName) return;

    const eventPayload = {
      title,
      date,
      badgeDate: badgeDate || date.split(",")[0],
      location,
      description,
      imageIcon,
      celebrity: {
        name: celebrityName,
        title: celebrityTitle,
        avatar: celebrityAvatar,
      },
      quote,
      gallery,
      testimonials: [
        {
          name: celebrityName,
          role: celebrityTitle,
          avatar: celebrityAvatar,
          quote: quote || `${description.slice(0, 100)}...`,
        },
      ],
    };

    if (editingId !== null) updateEvent(editingId, eventPayload);
    else createEvent(eventPayload);

    setShowEditor(false);
  };

  return (
    <div className="grid gap-6">
      <div className="flex justify-end">
        <button className={tw.primaryBtn} onClick={handleOpenCreate}>
          <PlusIcon size={18} />
          Create New Event
        </button>
      </div>

      <div className={tw.cardGrid}>
        {eventsList.map((event) => {
          const galleryList = event.gallery || [];
          return (
            <article key={event.id} className={`${tw.card} flex flex-col`}>
              <div className={tw.media}>
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-black uppercase text-midnight">
                  <TagIcon size={13} />
                  {event.badgeDate}
                </span>
                {galleryList[0] ? (
                  <img src={galleryList[0]} alt={event.title} className="h-full w-full object-cover" />
                ) : (
                  <span className="px-4 text-center text-2xl font-black">{event.imageIcon}</span>
                )}
              </div>

              <div className={tw.cardBody}>
                <h3 className="text-lg font-black leading-tight text-text-main">{event.title}</h3>
                <div className="grid gap-2 text-sm text-text-dim">
                  <span className="inline-flex min-w-0 items-center gap-2 rounded-xl bg-midnight/25 px-3 py-2">
                    <CalendarIcon size={15} className="shrink-0 text-gold/80" />
                    <span className="min-w-0 truncate">{event.date}</span>
                  </span>
                  <span className="inline-flex min-w-0 items-center gap-2 rounded-xl bg-midnight/25 px-3 py-2">
                    <MapPinIcon size={15} className="shrink-0 text-gold/80" />
                    <span className="min-w-0 truncate">{event.location}</span>
                  </span>
                </div>
                <p className="line-clamp-4 text-sm leading-6 text-text-dim">{event.description}</p>

                {galleryList.length > 0 && (
                  <div className="grid gap-2">
                    <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-gold">
                      <ImageIcon size={14} />
                      {galleryList.length} Photo{galleryList.length !== 1 ? "s" : ""}
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                    {galleryList.slice(0, 4).map((img, idx) => (
                      <div key={idx} className="relative aspect-square overflow-hidden rounded-lg border border-text-main/10">
                        <img src={img} alt="Mini preview" className="h-full w-full object-cover" />
                        {idx === 3 && galleryList.length > 4 && (
                          <div className="absolute inset-0 grid place-items-center bg-midnight/80 text-sm font-black text-gold-bright">
                            +{galleryList.length - 4}
                          </div>
                        )}
                      </div>
                    ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto flex items-center gap-3 rounded-xl bg-midnight/25 p-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/10 text-gold-bright">
                    <UserIcon size={17} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-text-main">
                      {event.celebrity.name}
                    </p>
                    <p className="inline-flex max-w-full items-center gap-1.5 truncate text-xs text-text-dim">
                      <BuildingIcon size={13} className="shrink-0 text-gold/70" />
                      <span className="truncate">{event.celebrity.title}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className={tw.cardFooter}>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-gold-bright">
                  <QuoteIcon size={16} />
                  {event.testimonials?.length || 0} testimonial{event.testimonials?.length !== 1 ? "s" : ""}
                </span>
                <div className="flex gap-2">
                  <button className={tw.iconBtn} onClick={() => handleOpenEdit(event)} title="Edit Event">
                    <EditIcon size={16} />
                  </button>
                  <button
                    className={tw.dangerIconBtn}
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${event.title}"?`)) deleteEvent(event.id);
                    }}
                    title="Delete Event"
                  >
                    <TrashIcon size={16} />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {showEditor && (
        <div className={tw.modalOverlay} onClick={() => setShowEditor(false)}>
          <div className={`${tw.modalContent} max-w-4xl`} onClick={(e) => e.stopPropagation()}>
            <div className={tw.modalHeader}>
              <h3 className={tw.modalTitle}>{editingId !== null ? "Modify Event Details" : "Publish New Event"}</h3>
              <button className={tw.iconBtn} onClick={() => setShowEditor(false)} type="button">
                <CloseIcon size={20} />
              </button>
            </div>

            <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleSubmit}>
              <div className={tw.modalBody}>
                <label className={tw.field}>
                  <span>Event Title</span>
                  <div className={tw.control}>
                    <TypeIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} value={title} onChange={(e) => setTitle(e.target.value)} required />
                  </div>
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className={tw.field}>
                    <span>Full Date</span>
                    <div className={tw.control}>
                      <CalendarIcon className={tw.fieldIcon} size={18} />
                      <input className={tw.input} value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>
                  </label>
                  <label className={tw.field}>
                    <span>Badge Date</span>
                    <div className={tw.control}>
                    <TagIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} value={badgeDate} onChange={(e) => setBadgeDate(e.target.value)} />
                  </div>
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className={tw.field}>
                    <span>Location / Venue</span>
                    <div className={tw.control}>
                      <MapPinIcon className={tw.fieldIcon} size={18} />
                      <input className={tw.input} value={location} onChange={(e) => setLocation(e.target.value)} required />
                    </div>
                  </label>
                  <label className={tw.field}>
                    <span>Event Icon Label</span>
                    <div className={tw.control}>
                      <ImageIcon className={tw.fieldIcon} size={18} />
                      <select className={tw.select} value={imageIcon} onChange={(e) => setImageIcon(e.target.value)}>
                        {eventIcons.map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>
                </div>

                <label className={tw.field}>
                  <span>Event Photo Gallery</span>
                  <label className={`${tw.secondaryBtn} cursor-pointer`}>
                    <ImageIcon size={16} />
                    Select & Upload Pictures
                    <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="hidden" />
                  </label>
                  {gallery.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 rounded-2xl border border-text-main/10 bg-midnight/25 p-3 sm:grid-cols-4">
                      {gallery.map((img, idx) => (
                        <div key={idx} className="relative aspect-square overflow-hidden rounded-xl border border-text-main/10">
                          <img src={img} alt="Uploaded preview" className="h-full w-full object-cover" />
                          <button
                            type="button"
                            className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-red-500 text-sm font-black text-text-main"
                            onClick={() => setGallery((prev) => prev.filter((_, i) => i !== idx))}
                          >
                            x
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </label>

                <label className={tw.field}>
                  <span>Celebrity Guest Name</span>
                  <div className={tw.control}>
                    <UserIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} value={celebrityName} onChange={(e) => setCelebrityName(e.target.value)} required />
                  </div>
                </label>

                <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                  <label className={tw.field}>
                    <span>Celebrity Designation / Title</span>
                    <div className={tw.control}>
                      <BuildingIcon className={tw.fieldIcon} size={18} />
                      <input className={tw.input} value={celebrityTitle} onChange={(e) => setCelebrityTitle(e.target.value)} />
                    </div>
                  </label>
                  <label className={tw.field}>
                    <span>Guest Avatar Label</span>
                    <div className={tw.control}>
                      <StarIcon className={tw.fieldIcon} size={18} />
                      <select className={tw.select} value={celebrityAvatar} onChange={(e) => setCelebrityAvatar(e.target.value)}>
                        {guestAvatars.map((avatar) => (
                          <option key={avatar} value={avatar}>
                            {avatar}
                          </option>
                        ))}
                      </select>
                    </div>
                  </label>
                </div>

                <label className={tw.field}>
                  <span>Featured Quote by Guest</span>
                  <div className={tw.control}>
                    <QuoteIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} value={quote} onChange={(e) => setQuote(e.target.value)} />
                  </div>
                </label>

                <label className={tw.field}>
                  <span>Full Event Description</span>
                  <div className={tw.control}>
                    <FileTextIcon className={tw.textareaIcon} size={18} />
                    <textarea className={tw.textarea} value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                </label>
              </div>

              <div className={tw.modalFooter}>
                <button className={tw.secondaryBtn} type="button" onClick={() => setShowEditor(false)}>
                  Cancel
                </button>
                <button className={tw.primaryBtn} type="submit">
                  {editingId !== null ? "Save Changes" : "Publish Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
