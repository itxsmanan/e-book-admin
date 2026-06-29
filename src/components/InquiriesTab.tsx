import React from "react";
import { useAdminAuth } from "../context/AuthContext";
import { CheckIcon, TrashIcon } from "./Icons";
import { tw } from "./adminTailwind";

export const InquiriesTab: React.FC = () => {
  const { inquiriesList, resolveInquiry, deleteInquiry } = useAdminAuth();

  return (
    <div className="grid gap-6">
      <div className={tw.notice}>
        <strong className="text-gold-bright">Reader Support Portal:</strong>{" "}
        View, manage, and address email contact forms and support messages
        submitted by website visitors.
      </div>

      <div className="grid gap-4">
        {inquiriesList.length > 0 ? (
          inquiriesList.map((inq) => (
            <article key={inq.id} className={`${tw.card} p-5`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h3 className="text-lg font-extrabold text-text-main">{inq.name}</h3>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-dim">
                    <span className="break-words">{inq.email}</span>
                    {inq.phone && <span>{inq.phone}</span>}
                    {inq.source && <span>{inq.source}</span>}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm text-text-dim">{inq.date}</span>
                  <span
                    className={`${tw.badge} ${
                      inq.status === "Resolved" ? tw.resolvedBadge : tw.pendingBadge
                    }`}
                  >
                    {inq.status}
                  </span>
                </div>
              </div>

              {inq.subject && (
                <div className="mt-4 rounded-xl border border-gold/20 bg-gold/10 px-4 py-3 text-sm font-bold text-gold-bright">
                  {inq.subject}
                </div>
              )}

              <p className="mt-5 rounded-xl border border-text-main/10 bg-midnight/25 p-4 text-sm leading-7 text-text-main">
                {inq.message}
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                {inq.status === "Pending" && (
                  <button
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 text-sm font-extrabold text-midnight transition hover:-translate-y-0.5"
                    onClick={() => resolveInquiry(inq.id)}
                  >
                    <CheckIcon size={14} />
                    Mark Resolved
                  </button>
                )}
                <button
                  className={tw.dangerBtn}
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this inquiry?")) {
                      deleteInquiry(inq.id);
                    }
                  }}
                >
                  <TrashIcon size={14} />
                  Delete
                </button>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-2xl border border-text-main/10 bg-slate/40 p-12 text-center text-text-dim">
            No inquiries received. Everything is clear!
          </div>
        )}
      </div>
    </div>
  );
};
