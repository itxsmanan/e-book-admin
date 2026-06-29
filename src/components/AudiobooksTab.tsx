import React, { useState } from "react";
import { useAdminAuth } from "../context/AuthContext";
import type { Audiobook } from "../context/AuthContext";
import {
  CloseIcon,
  DollarIcon,
  EditIcon,
  PlusIcon,
  TagIcon,
  TrashIcon,
  TypeIcon,
  UserIcon,
  HeadphonesIcon,
  FileTextIcon
} from "./Icons";
import { tw } from "./adminTailwind";

export const AudiobooksTab: React.FC = () => {
  const { audiobooksList, createAudiobook, updateAudiobook, deleteAudiobook } = useAdminAuth();
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [narrator, setNarrator] = useState("");
  const [duration, setDuration] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState(0);
  const [coverIcon, setCoverIcon] = useState("FaHeadphones");
  const [waveColor, setWaveColor] = useState("#C9A962");
  const [audioFile, setAudioFile] = useState("");
  
  const [isDraggingAudio, setIsDraggingAudio] = useState(false);

  const loadAudioFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") setAudioFile(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setTitle("");
    setNarrator("");
    setDuration("");
    setGenre("");
    setPrice(0);
    setCoverIcon("FaHeadphones");
    setWaveColor("#C9A962");
    setAudioFile("");
    setShowEditor(true);
  };

  const handleOpenEdit = (audiobook: Audiobook) => {
    setEditingId(audiobook.id);
    setTitle(audiobook.title);
    setNarrator(audiobook.narrator);
    setDuration(audiobook.duration);
    setGenre(audiobook.genre);
    setPrice(audiobook.price);
    setCoverIcon(audiobook.coverIcon);
    setWaveColor(audiobook.waveColor);
    setAudioFile(audiobook.audioFile || "");
    setShowEditor(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !narrator || !genre) return;

    const payload = {
      title,
      narrator,
      duration,
      genre,
      price: Number(price),
      coverIcon,
      waveColor,
      audioFile,
    };

    if (editingId !== null) updateAudiobook(editingId, payload);
    else createAudiobook(payload);

    setShowEditor(false);
  };

  return (
    <div className="grid gap-6">
      <div className="flex justify-end">
        <button className={tw.primaryBtn} onClick={handleOpenCreate}>
          <PlusIcon size={18} />
          Add New Audio Book
        </button>
      </div>

      <div className={tw.cardGrid}>
        {audiobooksList.map((audiobook) => (
          <article key={audiobook.id} className={`${tw.card} flex flex-col`}>
            <div className={tw.media} style={{ backgroundColor: audiobook.waveColor }}>
                <div className="flex h-full w-full items-center justify-center text-midnight">
                  <HeadphonesIcon size={48} className="opacity-80" />
                </div>
            </div>

            <div className={tw.cardBody}>
              <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-gold">
                <TagIcon size={14} />
                {audiobook.genre}
              </p>
              <h3 className="text-lg font-black leading-tight text-text-main">{audiobook.title}</h3>
              <p className="inline-flex items-center gap-2 text-sm text-text-dim">
                <UserIcon size={15} className="text-gold/80" />
                Narrator: {audiobook.narrator}
              </p>

              <div className="grid grid-cols-2 gap-2 text-sm text-text-dim">
                <span className="inline-flex min-w-0 items-center gap-2 rounded-xl bg-midnight/25 px-3 py-2">
                  <DollarIcon size={15} className="shrink-0 text-gold/80" />
                  <span className="min-w-0 truncate">Price: <strong className="text-text-main">Rs. {audiobook.price.toLocaleString()}</strong></span>
                </span>
                <span className="inline-flex min-w-0 items-center gap-2 rounded-xl bg-midnight/25 px-3 py-2">
                  <FileTextIcon size={15} className="shrink-0 text-gold/80" />
                  <span className="min-w-0 truncate">Duration: <strong className="text-text-main">{audiobook.duration}</strong></span>
                </span>
              </div>
            </div>

            <div className={tw.cardFooter}>
              <div className="flex gap-2 ml-auto">
                <button className={tw.iconBtn} onClick={() => handleOpenEdit(audiobook)} title="Edit Audio Book">
                  <EditIcon size={16} />
                </button>
                <button
                  className={tw.dangerIconBtn}
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${audiobook.title}"?`)) deleteAudiobook(audiobook.id);
                  }}
                  title="Delete Audio Book"
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
              <h3 className={tw.modalTitle}>{editingId !== null ? "Modify Audio Book" : "Add Audio Book"}</h3>
              <button className={tw.iconBtn} onClick={() => setShowEditor(false)} type="button">
                <CloseIcon size={20} />
              </button>
            </div>

            <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleSubmit}>
              <div className={tw.modalBody}>
                <label className={tw.field}>
                  <span>Audio Book Title</span>
                  <div className={tw.control}>
                    <TypeIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} value={title} onChange={(e) => setTitle(e.target.value)} required />
                  </div>
                </label>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className={tw.field}>
                    <span>Narrator Name</span>
                    <div className={tw.control}>
                    <UserIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} value={narrator} onChange={(e) => setNarrator(e.target.value)} required />
                  </div>
                  </label>
                  <label className={tw.field}>
                    <span>Duration</span>
                    <div className={tw.control}>
                    <FileTextIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 8 hrs 30 min" required />
                  </div>
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className={tw.field}>
                    <span>Genre</span>
                    <div className={tw.control}>
                    <TagIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} value={genre} onChange={(e) => setGenre(e.target.value)} required />
                  </div>
                  </label>
                  <label className={tw.field}>
                    <span>Price (Rs.)</span>
                    <div className={tw.control}>
                    <DollarIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} type="number" value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)} required />
                  </div>
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className={tw.field}>
                    <span>Cover Icon Class</span>
                    <div className={tw.control}>
                    <TypeIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} value={coverIcon} onChange={(e) => setCoverIcon(e.target.value)} placeholder="e.g. FaHeadphones" required />
                  </div>
                  </label>
                  <label className={tw.field}>
                    <span>Wave Color (Hex)</span>
                    <div className={tw.control}>
                    <TypeIcon className={tw.fieldIcon} size={18} />
                    <input className={tw.input} type="color" value={waveColor} onChange={(e) => setWaveColor(e.target.value)} required />
                  </div>
                  </label>
                </div>

                <label className={tw.field}>
                  <span>Audio File</span>
                  {audioFile ? (
                    <div className="flex flex-col gap-4 rounded-2xl border border-text-main/10 bg-midnight/25 p-4 sm:flex-row sm:items-center">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-text-main/10 bg-navy/50 text-gold-bright">
                        <HeadphonesIcon size={24} />
                      </div>
                      <div className="grid flex-1 gap-3">
                        <p className="font-bold text-text-main">
                          {audioFile.startsWith("data:") ? "Custom Audio File" : audioFile}
                        </p>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <label className={tw.secondaryBtn}>
                            <HeadphonesIcon size={16} />
                            Replace Audio
                            <input
                              type="file"
                              accept="audio/*"
                              onChange={(e) => loadAudioFile(e.target.files?.[0])}
                              className="hidden"
                            />
                          </label>
                          <button className={tw.dangerBtn} type="button" onClick={() => setAudioFile("")}>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label
                      className={`grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
                        isDraggingAudio ? "border-gold bg-gold/10" : "border-text-main/15 bg-midnight/25 hover:border-gold/50"
                      }`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDraggingAudio(true);
                      }}
                      onDragLeave={() => setIsDraggingAudio(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDraggingAudio(false);
                        loadAudioFile(e.dataTransfer.files?.[0]);
                      }}
                    >
                      <HeadphonesIcon size={30} className="mb-3 text-gold-bright" />
                      <span className="text-sm font-bold text-text-main">Drag & drop Audio file here</span>
                      <span className="mt-1 text-xs text-text-dim">or click to browse .mp3, .wav</span>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => loadAudioFile(e.target.files?.[0])}
                        className="hidden"
                      />
                    </label>
                  )}
                </label>

              </div>

              <div className={tw.modalFooter}>
                <button className={tw.secondaryBtn} type="button" onClick={() => setShowEditor(false)}>
                  Cancel
                </button>
                <button className={tw.primaryBtn} type="submit">
                  {editingId !== null ? "Save Changes" : "Add Audio Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
