import React from "react";
import { useAdminAuth } from "../context/AuthContext";
import { DollarIcon } from "./Icons";
import { tw } from "./adminTailwind";

const formatCurrency = (amount: number) => `Rs. ${Number(amount || 0).toLocaleString()}`;

export const PaymentsTab: React.FC = () => {
  const { paymentsList } = useAdminAuth();

  const totalRevenue = paymentsList.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const subscriptionRevenue = paymentsList
    .filter((payment) => payment.itemType === "Subscription")
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
  const bookRevenue = paymentsList
    .filter((payment) => payment.itemType === "Book")
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

  return (
    <div className="grid gap-6">
      <div className={tw.notice}>
        <strong className="text-gold-bright">Payments History:</strong>{" "}
        Track successful website checkout payments, wallet method, buyer details, and order totals.
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          ["Total Revenue", formatCurrency(totalRevenue)],
          ["Subscription Revenue", formatCurrency(subscriptionRevenue)],
          ["Book Orders", formatCurrency(bookRevenue)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-text-main/10 bg-slate/40 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.14)]">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold-bright">
              <DollarIcon size={20} />
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-text-dim">{label}</p>
            <strong className="mt-2 block text-2xl text-text-main">{value}</strong>
          </div>
        ))}
      </div>

      {paymentsList.length > 0 ? (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-text-main/10 bg-slate/40 shadow-[0_16px_42px_rgba(0,0,0,0.16)] lg:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-text-main/10 bg-midnight/30 text-left text-xs font-extrabold uppercase tracking-wider text-text-dim">
                  <th className="p-4">Transaction</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Item</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Amount</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentsList.map((payment) => (
                  <tr key={payment.id} className="border-b border-text-main/5 last:border-b-0">
                    <td className="p-4">
                      <span className="font-mono text-sm font-bold text-gold-bright">{payment.transactionId}</span>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-text-main">{payment.customerName}</div>
                      <div className="mt-1 text-xs text-text-dim">{payment.customerEmail}</div>
                      <div className="mt-1 text-xs text-text-dim">{payment.phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="max-w-xs truncate font-semibold text-text-main">{payment.itemName}</div>
                      <span className={`${tw.badge} mt-2 ${tw.neutralBadge}`}>{payment.itemType}</span>
                    </td>
                    <td className="p-4 text-sm font-semibold text-text-main">{payment.method}</td>
                    <td className="p-4 text-sm text-text-dim">{payment.date}</td>
                    <td className="p-4 text-right font-extrabold text-text-main">{formatCurrency(payment.amount)}</td>
                    <td className="p-4 text-right">
                      <span className={`${tw.badge} ${payment.status === "Paid" ? tw.resolvedBadge : tw.pendingBadge}`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 lg:hidden">
            {paymentsList.map((payment) => (
              <article key={payment.id} className={`${tw.card} p-5`}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <span className="font-mono text-xs font-bold text-gold-bright">{payment.transactionId}</span>
                    <h3 className="mt-2 text-lg font-extrabold text-text-main">{payment.customerName}</h3>
                    <p className="mt-1 break-words text-sm text-text-dim">{payment.customerEmail}</p>
                    <p className="mt-1 text-sm text-text-dim">{payment.phone}</p>
                  </div>
                  <span className={`${tw.badge} ${payment.status === "Paid" ? tw.resolvedBadge : tw.pendingBadge}`}>
                    {payment.status}
                  </span>
                </div>

                <div className="mt-4 rounded-xl border border-text-main/10 bg-midnight/25 p-4">
                  <p className="font-bold text-text-main">{payment.itemName}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className={`${tw.badge} ${tw.neutralBadge}`}>{payment.itemType}</span>
                    <span className={`${tw.badge} ${tw.neutralBadge}`}>{payment.method}</span>
                    <span className={`${tw.badge} ${tw.neutralBadge}`}>{payment.date}</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  <div className="rounded-xl bg-midnight/25 p-3">
                    <span className="block text-xs text-text-dim">Subtotal</span>
                    <strong className="text-text-main">{formatCurrency(payment.subtotal)}</strong>
                  </div>
                  <div className="rounded-xl bg-midnight/25 p-3">
                    <span className="block text-xs text-text-dim">Shipping</span>
                    <strong className="text-text-main">{formatCurrency(payment.shipping)}</strong>
                  </div>
                  <div className="rounded-xl bg-gold/10 p-3">
                    <span className="block text-xs text-gold-bright">Total</span>
                    <strong className="text-text-main">{formatCurrency(payment.amount)}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-text-main/10 bg-slate/40 p-12 text-center text-text-dim">
          No payment history yet. Successful website checkouts will appear here.
        </div>
      )}
    </div>
  );
};
