export const tw = {
  notice:
    "mb-8 rounded-2xl border border-dashed border-gold/25 bg-gold/5 p-4 text-sm leading-relaxed text-text-dim",
  primaryBtn:
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-gold to-gold-bright px-5 py-2.5 text-sm font-extrabold text-midnight shadow-[0_10px_24px_rgba(201,169,98,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(201,169,98,0.34)]",
  secondaryBtn:
    "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-text-main/10 bg-text-main/5 px-4 py-2 text-sm font-semibold text-text-main transition hover:border-text-main/20 hover:bg-text-main/10",
  dangerBtn:
    "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-400/20",
  iconBtn:
    "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-text-main/10 bg-text-main/5 text-text-dim transition hover:border-gold/40 hover:bg-gold/10 hover:text-gold-bright",
  dangerIconBtn:
    "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-red-400/20 bg-red-400/10 text-red-300 transition hover:bg-red-400/20",
  cardGrid:
    "grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5",
  card:
    "min-w-0 overflow-hidden rounded-2xl border border-text-main/10 bg-slate/40 shadow-[0_16px_42px_rgba(0,0,0,0.16)] transition hover:-translate-y-1 hover:border-gold/25 hover:bg-slate/55",
  cardBody: "flex flex-1 flex-col gap-3 p-5",
  cardFooter:
    "flex flex-wrap items-center justify-between gap-3 border-t border-text-main/5 p-5",
  media:
    "relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-navy to-slate text-5xl text-gold-bright",
  badge:
    "inline-flex min-h-7 items-center justify-center rounded-full border px-3 py-1 text-xs font-extrabold uppercase tracking-wide",
  activeBadge: "border-emerald-400/20 bg-emerald-400/15 text-emerald-300",
  suspendedBadge: "border-red-400/20 bg-red-400/15 text-red-300",
  pendingBadge: "border-amber-300/25 bg-amber-300/15 text-amber-200",
  resolvedBadge: "border-emerald-400/20 bg-emerald-400/15 text-emerald-300",
  neutralBadge: "border-text-main/10 bg-text-main/5 text-text-main",
  modalOverlay:
    "fixed inset-0 z-[200] flex items-end justify-center bg-midnight/80 p-3 backdrop-blur-md sm:items-center sm:p-4",
  modalContent:
    "flex max-h-[92svh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-text-main/10 border-t-4 border-t-gold bg-slate shadow-[0_28px_80px_rgba(0,0,0,0.45)]",
  modalHeader:
    "flex items-center justify-between gap-4 border-b border-text-main/10 p-4 sm:p-5",
  modalTitle: "text-lg font-extrabold text-text-main sm:text-xl",
  modalBody: "grid flex-1 gap-4 overflow-y-auto p-4 sm:p-5",
  modalFooter:
    "flex flex-col-reverse gap-3 border-t border-text-main/10 p-4 sm:flex-row sm:justify-end sm:p-5",
  field:
    "grid gap-2 text-left [&_label]:text-xs [&_label]:font-extrabold [&_label]:uppercase [&_label]:tracking-wider [&_label]:text-text-dim",
  input:
    "w-full rounded-xl border border-text-main/10 bg-midnight/35 px-4 py-3 text-sm text-text-main outline-none transition placeholder:text-text-dim/70 focus:border-gold focus:bg-midnight/55 focus:shadow-[0_0_0_3px_rgba(201,169,98,0.12)]",
  textarea:
    "min-h-32 w-full resize-y rounded-xl border border-text-main/10 bg-midnight/35 px-4 py-3 text-sm text-text-main outline-none transition placeholder:text-text-dim/70 focus:border-gold focus:bg-midnight/55 focus:shadow-[0_0_0_3px_rgba(201,169,98,0.12)]",
  select:
    "w-full appearance-none rounded-xl border border-text-main/10 bg-midnight/35 px-4 py-3 text-sm text-text-main outline-none transition focus:border-gold focus:bg-midnight/55 focus:shadow-[0_0_0_3px_rgba(201,169,98,0.12)]",
};

export const statusBadge = (status: "Active" | "Suspended") =>
  `${tw.badge} ${status === "Active" ? tw.activeBadge : tw.suspendedBadge}`;
