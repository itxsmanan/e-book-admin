import React from "react";
import type { Order } from "../../context/AuthContext";
import { BooksIcon, DollarIcon, EventsIcon } from "../Icons";
import { formatCurrency } from "./orderUtils";

interface OrderSummaryCardsProps {
  orders: Order[];
}

export const OrderSummaryCards: React.FC<OrderSummaryCardsProps> = ({ orders }) => {
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const openOrders = orders.filter((order) => !["Delivered", "Cancelled"].includes(order.orderStatus)).length;
  const deliveredOrders = orders.filter((order) => order.orderStatus === "Delivered").length;

  const cards = [
    { label: "Book Orders", value: orders.length.toLocaleString(), icon: BooksIcon },
    { label: "Open Orders", value: openOrders.toLocaleString(), icon: EventsIcon },
    { label: "Orders Revenue", value: formatCurrency(totalRevenue), icon: DollarIcon },
    { label: "Delivered", value: deliveredOrders.toLocaleString(), icon: BooksIcon },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ label, value, icon: Icon }) => (
        <div key={label} className="rounded-2xl border border-text-main/10 bg-slate/40 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.14)]">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold-bright">
            <Icon size={20} />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-text-dim">{label}</p>
          <strong className="mt-2 block text-2xl text-text-main">{value}</strong>
        </div>
      ))}
    </div>
  );
};
