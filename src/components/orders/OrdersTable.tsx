import React from "react";
import { Link } from "react-router-dom";
import type { Order } from "../../context/AuthContext";
import { EyeIcon } from "../Icons";
import { tw } from "../adminTailwind";
import { formatCurrency, orderStatusClass } from "./orderUtils";

interface OrdersTableProps {
  orders: Order[];
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => (
  <div className="hidden overflow-hidden rounded-2xl border border-text-main/10 bg-slate/40 shadow-[0_16px_42px_rgba(0,0,0,0.16)] lg:block">
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-text-main/10 bg-midnight/30 text-left text-xs font-extrabold uppercase tracking-wider text-text-dim">
          <th className="p-4">Order</th>
          <th className="p-4">Customer</th>
          <th className="p-4">Book</th>
          <th className="p-4">Date</th>
          <th className="p-4">Payment</th>
          <th className="p-4 text-right">Total</th>
          <th className="p-4 text-right">Status</th>
          <th className="p-4 text-right">Preview</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="border-b border-text-main/5 last:border-b-0">
            <td className="p-4">
              <span className="font-mono text-sm font-bold text-gold-bright">{order.orderNumber}</span>
              <div className="mt-1 text-xs text-text-dim">{order.transactionId}</div>
            </td>
            <td className="p-4">
              <div className="font-bold text-text-main">{order.customerName}</div>
              <div className="mt-1 text-xs text-text-dim">{order.customerEmail}</div>
              <div className="mt-1 text-xs text-text-dim">{order.phone}</div>
            </td>
            <td className="p-4">
              <div className="max-w-xs truncate font-semibold text-text-main">{order.bookTitle}</div>
              <div className="mt-1 text-xs text-text-dim">Qty {order.quantity}</div>
            </td>
            <td className="p-4 text-sm text-text-dim">{order.date}</td>
            <td className="p-4">
              <div className="text-sm font-semibold text-text-main">{order.paymentMethod}</div>
              <span className={`${tw.badge} mt-2 ${tw.resolvedBadge}`}>{order.paymentStatus}</span>
            </td>
            <td className="p-4 text-right font-extrabold text-text-main">{formatCurrency(order.total)}</td>
            <td className="p-4 text-right">
              <span className={`${tw.badge} ${orderStatusClass(order.orderStatus)}`}>{order.orderStatus}</span>
            </td>
            <td className="p-4 text-right">
              <Link className={tw.iconBtn} to={`/orders/${order.id}`} aria-label={`Preview ${order.orderNumber}`}>
                <EyeIcon size={16} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
