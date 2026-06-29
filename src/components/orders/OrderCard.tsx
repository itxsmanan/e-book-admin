import React from "react";
import { Link } from "react-router-dom";
import type { Order } from "../../context/AuthContext";
import { EyeIcon } from "../Icons";
import { tw } from "../adminTailwind";
import { formatCurrency, orderStatusClass } from "./orderUtils";

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => (
  <article className={`${tw.card} p-5 lg:hidden`}>
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <span className="font-mono text-xs font-bold text-gold-bright">{order.orderNumber}</span>
        <h3 className="mt-2 truncate text-lg font-extrabold text-text-main">{order.bookTitle}</h3>
        <p className="mt-1 text-sm text-text-dim">{order.customerName}</p>
      </div>
      <span className={`${tw.badge} ${orderStatusClass(order.orderStatus)}`}>{order.orderStatus}</span>
    </div>

    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
      <div className="rounded-xl bg-midnight/25 p-3">
        <span className="block text-xs text-text-dim">Payment</span>
        <strong className="text-text-main">{order.paymentMethod}</strong>
      </div>
      <div className="rounded-xl bg-midnight/25 p-3">
        <span className="block text-xs text-text-dim">Date</span>
        <strong className="text-text-main">{order.date}</strong>
      </div>
      <div className="rounded-xl bg-midnight/25 p-3">
        <span className="block text-xs text-text-dim">Phone</span>
        <strong className="text-text-main">{order.phone}</strong>
      </div>
      <div className="rounded-xl bg-gold/10 p-3">
        <span className="block text-xs text-gold-bright">Total</span>
        <strong className="text-text-main">{formatCurrency(order.total)}</strong>
      </div>
    </div>

    <Link className={`${tw.secondaryBtn} mt-4 w-full`} to={`/orders/${order.id}`}>
      <EyeIcon size={16} />
      Preview Order
    </Link>
  </article>
);
