import React from "react";
import { useAdminAuth } from "../context/AuthContext";
import {
  UsersIcon,
  BooksIcon,
  EventsIcon,
  SubscriptionIcon,
  InquiriesIcon,
} from "./Icons";

export const DashboardTab: React.FC = () => {
  const { users, booksList, eventsList, plansList, inquiriesList } =
    useAdminAuth();

  // Calculate statistics
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const suspendedUsers = users.filter((u) => u.status === "Suspended").length;
  const libraryBooks = booksList.length;
  const eventsCount = eventsList.length;
  const pendingInquiries = inquiriesList.filter(
    (i) => i.status === "Pending",
  ).length;

  // Calculate live revenue based on active users' subscription plans
  const calculateRevenue = () => {
    let rev = 0;
    users.forEach((u) => {
      if (u.status === "Active") {
        const plan = plansList.find((p) => p.name === u.subscription);
        if (plan) {
          rev += plan.price;
        }
      }
    });
    return rev;
  };

  const activeSubscriptionRevenue = calculateRevenue();

  // Find count per subscription plan for visual chart
  const subscriptionCounts = plansList.map((plan) => {
    const count = users.filter(
      (u) => u.status === "Active" && u.subscription === plan.name,
    ).length;
    return { name: plan.name, count };
  });

  const maxCount = Math.max(...subscriptionCounts.map((s) => s.count), 1);

  // Recent simulated actions
  const recentActivities = [
    {
      type: "sub",
      text: "Fatima Zahra renewed her Annual membership.",
      time: "1 hour ago",
      avatar: "👩‍⚕️",
    },

    {
      type: "inquiry",
      text: 'New support ticket: "Payment issue via EasyPaisa" by Amna Malik.',
      time: "5 hours ago",
      avatar: "👩‍🏫",
    },
    {
      type: "user",
      text: 'Hamza Siddiqui added "Building Fortune" to favorites.',
      time: "Yesterday",
      avatar: "👨‍🎨",
    },
  ];

  return (
    <div className="flex flex-col gap-5 sm:gap-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] sm:gap-6">
        <div className="flex items-center gap-4 rounded-2xl border border-text-main/5 bg-slate/40 p-4 shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:bg-slate/60 hover:shadow-[0_12px_24px_rgba(0,0,0,0.25)] sm:p-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#38bdf81f] text-[#38bdf8]">
            <UsersIcon size={24} />
          </div>
          <div className="min-w-0 flex flex-col">
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-text-dim">
              Total Users
            </h3>
            <div className="text-2xl font-extrabold text-text-main">
              {totalUsers}
            </div>
            <div className="mt-1 text-sm text-text-dim">
              {activeUsers} Active • {suspendedUsers} Suspended
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-text-main/5 bg-slate/40 p-4 shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:bg-slate/60 hover:shadow-[0_12px_24px_rgba(0,0,0,0.25)] sm:p-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
            <SubscriptionIcon size={24} />
          </div>
          <div className="min-w-0 flex flex-col">
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-text-dim">
              Active Revenue
            </h3>
            <div className="break-words text-2xl font-extrabold text-text-main">
              Rs. {activeSubscriptionRevenue.toLocaleString()}
            </div>
            <div className="mt-1 text-sm text-text-dim">
              Sign-ups Monthly Value
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-text-main/5 bg-slate/40 p-4 shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:bg-slate/60 hover:shadow-[0_12px_24px_rgba(0,0,0,0.25)] sm:p-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#34d3991f] text-[#34d399]">
            <BooksIcon size={24} />
          </div>
          <div className="min-w-0 flex flex-col">
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-text-dim">
              Books Catalog
            </h3>
            <div className="text-2xl font-extrabold text-text-main">
              {libraryBooks}
            </div>
            <div className="mt-1 text-sm text-text-dim">
              Ebooks & Printed copies
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-text-main/5 bg-slate/40 p-4 shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:bg-slate/60 hover:shadow-[0_12px_24px_rgba(0,0,0,0.25)] sm:p-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-light">
            <EventsIcon size={24} />
          </div>
          <div className="min-w-0 flex flex-col">
            <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-text-dim">
              Literary Events
            </h3>
            <div className="text-2xl font-extrabold text-text-main">
              {eventsCount}
            </div>
            <div className="mt-1 text-sm text-text-dim">
              Launches & Meetups
            </div>
          </div>
        </div>
      </div>

      {/* Pending Tasks Banner */}
      {pendingInquiries > 0 && (
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-5 flex items-center justify-between gap-4 flex-wrap text-text-main text-[0.95rem] shadow-[0_10px_20px_rgba(212,102,74,0.08)]">
          <div className="flex items-center gap-[0.8rem]">
            <InquiriesIcon size={20} />
            <span>
              You have{" "}
              <strong>
                {pendingInquiries} pending inquiry request
                {pendingInquiries > 1 ? "s" : ""}
              </strong>{" "}
              from readers. Head over to the Inquiries tab to reply.
            </span>
          </div>
        </div>
      )}

      {/* Main Charts & Activity Row */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr] lg:gap-6">
        {/* Subscription stats */}
        <div className="overflow-hidden rounded-2xl border border-text-main/5 bg-slate/40 p-4 shadow-[0_8px_16px_rgba(0,0,0,0.15)] sm:p-6">
          <h3 className="text-[1.1rem] font-semibold text-text-main mb-6 flex items-center justify-between">
            Active Subscriptions Distribution
          </h3>
          <div className="mb-4 flex h-[190px] items-end justify-between gap-2 overflow-x-auto border-b border-text-main/10 pt-4 sm:h-[200px] sm:gap-0">
            {subscriptionCounts.map((sub, index) => {
              const heightPercent = `${(sub.count / maxCount) * 150 + 20}px`;
              return (
                <div
                  key={index}
                  className="group relative flex min-w-12 flex-1 flex-col items-center gap-2"
                >
                  <div className="absolute -top-6 text-[0.75rem] font-semibold text-gold-bright opacity-0 transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap">
                    {sub.count} user{sub.count !== 1 ? "s" : ""}
                  </div>
                  <div
                    className="w-8 rounded-t-md bg-gradient-to-t from-slate to-gold transition-all duration-[1s] group-hover:from-navy group-hover:to-gold-bright"
                    style={{ height: heightPercent }}
                  />
                  <span className="max-w-16 truncate text-[0.7rem] text-text-dim sm:text-[0.75rem]">
                    {sub.name}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-[0.85rem] text-text-dim text-center mt-4">
            Hover bars to see exact active reader counts per tier
          </p>
        </div>

        {/* Live Logs */}
        <div className="rounded-2xl border border-text-main/5 bg-slate/40 p-4 shadow-[0_8px_16px_rgba(0,0,0,0.15)] sm:p-6">
          <h3 className="text-[1.1rem] font-semibold text-text-main mb-6 flex items-center justify-between">
            Recent Site Activities
          </h3>
          <div className="flex flex-col gap-4">
            {recentActivities.map((act, index) => (
              <div
                key={index}
                className="flex items-center gap-4 pb-[0.8rem] border-b border-text-main/[0.03] last:border-b-0 last:pb-0"
              >
                <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-base">
                  {act.avatar}
                </div>
                <div className="flex-grow">
                  <div className="text-[0.85rem] text-text-main [&>strong]:text-text-main">
                    {act.text}
                  </div>
                  <div className="text-[0.75rem] text-text-dim mt-1">
                    {act.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
