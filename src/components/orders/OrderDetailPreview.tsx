import React from "react";
import type { Order } from "../../context/AuthContext";
import { tw } from "../adminTailwind";
import { formatCurrency, orderStatusClass } from "./orderUtils";

interface OrderDetailPreviewProps {
  order: Order;
}

const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="rounded-xl border border-text-main/10 bg-midnight/25 p-4">
    <span className="block text-xs font-bold uppercase tracking-wider text-text-dim">{label}</span>
    <strong className="mt-2 block break-words text-sm text-text-main">{value || "Not provided"}</strong>
  </div>
);

export const OrderDetailPreview: React.FC<OrderDetailPreviewProps> = ({ order }) => (
  <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
    <section className="rounded-2xl border border-text-main/10 bg-slate/40 p-5 shadow-[0_16px_42px_rgba(0,0,0,0.16)] sm:p-6">
      <div className="flex flex-col gap-3 border-b border-text-main/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="font-mono text-sm font-bold text-gold-bright">{order.orderNumber}</span>
          <h2 className="mt-2 text-2xl font-extrabold text-text-main">{order.bookTitle}</h2>
          <p className="mt-1 text-sm text-text-dim">Created on {order.date}</p>
        </div>
        <span className={`${tw.badge} ${orderStatusClass(order.orderStatus)}`}>{order.orderStatus}</span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DetailItem label="Customer Name" value={order.customerName} />
        <DetailItem label="Customer Email" value={order.customerEmail} />
        <DetailItem label="Phone" value={order.phone} />
        <DetailItem label="City" value={order.city} />
        <DetailItem label="Province" value={order.province} />
        <DetailItem label="Postal Code" value={order.postalCode} />
        <DetailItem label="Shipping Address" value={order.shippingAddress} />
        <DetailItem label="Order Notes" value={order.notes} />
      </div>
    </section>

    <aside className="rounded-2xl border border-text-main/10 bg-slate/40 p-5 shadow-[0_16px_42px_rgba(0,0,0,0.16)] sm:p-6">
      <h3 className="text-lg font-extrabold text-text-main">Payment Preview</h3>
      <div className="mt-4 grid gap-3">
        <DetailItem label="Transaction ID" value={order.transactionId} />
        <DetailItem label="Payment Method" value={order.paymentMethod} />
        <DetailItem label="Payment Status" value={order.paymentStatus} />
      </div>

      <div className="mt-5 rounded-xl border border-gold/20 bg-gold/10 p-4">
        <div className="flex justify-between gap-4 text-sm text-text-dim">
          <span>Subtotal</span>
          <strong className="text-text-main">{formatCurrency(order.subtotal)}</strong>
        </div>
        <div className="mt-3 flex justify-between gap-4 text-sm text-text-dim">
          <span>Shipping</span>
          <strong className="text-text-main">{formatCurrency(order.shipping)}</strong>
        </div>
        <div className="mt-4 border-t border-gold/20 pt-4 flex justify-between gap-4 text-base">
          <span className="font-extrabold text-gold-bright">Total</span>
          <strong className="text-xl text-text-main">{formatCurrency(order.total)}</strong>
        </div>
      </div>
    </aside>
  </div>
);
