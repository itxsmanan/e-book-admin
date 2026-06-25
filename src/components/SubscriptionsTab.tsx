import React, { useState } from "react";
import { useAdminAuth } from "../context/AuthContext";
import type { SubscriptionPlan } from "../context/AuthContext";
import { CloseIcon } from "./Icons";
import { tw } from "./adminTailwind";

export const SubscriptionsTab: React.FC = () => {
  const { plansList, updatePlan } = useAdminAuth();
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [price, setPrice] = useState(0);
  const [saveText, setSaveText] = useState("");
  const [badge, setBadge] = useState("");
  const [features, setFeatures] = useState("");
  const [isPopular, setIsPopular] = useState(false);
  const [isGold, setIsGold] = useState(false);

  const handleOpenEdit = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setPrice(plan.price);
    setSaveText(plan.saveText);
    setBadge(plan.badge || "");
    setFeatures(plan.features.join("\n"));
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
      features: features.split("\n").filter((f) => f.trim() !== ""),
      isPopular,
      isGold,
    });

    setEditingPlan(null);
  };

  return (
    <div className="grid gap-6">
      <div className={tw.notice}>
        <strong className="text-gold-bright">Membership Tiers Configurator:</strong>{" "}
        Updates to pricing structures and perk lists dynamically overwrite the
        website landing page cards.
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-5">
        {plansList.map((plan) => (
          <article
            key={plan.name}
            className={`${tw.card} relative flex flex-col p-5 ${
              plan.isPopular ? "border-gold/40 shadow-[0_18px_48px_rgba(201,169,98,0.12)]" : ""
            }`}
          >
            {plan.badge && (
              <span className="mb-4 w-fit rounded-full bg-gold px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-midnight">
                {plan.badge}
              </span>
            )}
            <h3 className="text-xl font-extrabold text-text-main">{plan.name}</h3>
            <div className="mt-4 text-3xl font-black text-gold-bright">
              Rs. {plan.price.toLocaleString()}
              <span className="ml-1 text-sm font-semibold text-text-dim">{plan.period}</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-accent-light">{plan.saveText}</p>
            <ul className="my-5 grid gap-3 text-sm text-text-dim">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="text-gold">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className={`${tw.secondaryBtn} mt-auto`} onClick={() => handleOpenEdit(plan)}>
              Edit Plan Tier
            </button>
          </article>
        ))}
      </div>

      {editingPlan && (
        <div className={tw.modalOverlay} onClick={() => setEditingPlan(null)}>
          <div className={tw.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={tw.modalHeader}>
              <h3 className={tw.modalTitle}>Edit {editingPlan.name} Plan Details</h3>
              <button className={tw.iconBtn} onClick={() => setEditingPlan(null)} type="button">
                <CloseIcon size={20} />
              </button>
            </div>

            <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleSubmit}>
              <div className={tw.modalBody}>
                <label className={tw.field}>
                  <span>Plan Price (Rs.)</span>
                  <input
                    className={tw.input}
                    type="number"
                    placeholder="e.g. 499"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
                    required
                  />
                </label>

                <label className={tw.field}>
                  <span>Savings / Highlight Text</span>
                  <input
                    className={tw.input}
                    type="text"
                    placeholder="e.g. Save 20% - Rs. 400/month"
                    value={saveText}
                    onChange={(e) => setSaveText(e.target.value)}
                    required
                  />
                </label>

                <label className={tw.field}>
                  <span>Plan Highlight Badge</span>
                  <input
                    className={tw.input}
                    type="text"
                    placeholder="e.g. Most Popular"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                  />
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex items-center gap-3 rounded-xl border border-text-main/10 bg-midnight/25 p-4 text-sm font-semibold text-text-main">
                    <input
                      type="checkbox"
                      checked={isPopular}
                      onChange={(e) => setIsPopular(e.target.checked)}
                    />
                    Highlight Card
                  </label>
                  <label className="flex items-center gap-3 rounded-xl border border-text-main/10 bg-midnight/25 p-4 text-sm font-semibold text-text-main">
                    <input
                      type="checkbox"
                      checked={isGold}
                      onChange={(e) => setIsGold(e.target.checked)}
                    />
                    Gold Accent Button
                  </label>
                </div>

                <label className={tw.field}>
                  <span>Plan Perks / Features (One per line)</span>
                  <textarea
                    className={tw.textarea}
                    placeholder={"Full E-Library access\nUnlimited book downloads\nAudio book streaming"}
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    required
                  />
                </label>
              </div>

              <div className={tw.modalFooter}>
                <button className={tw.secondaryBtn} type="button" onClick={() => setEditingPlan(null)}>
                  Cancel
                </button>
                <button className={tw.primaryBtn} type="submit">
                  Update Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
