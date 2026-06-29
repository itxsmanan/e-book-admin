import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAdminAuth, type Order } from "../context/AuthContext";
import { tw } from "../components/adminTailwind";
import { ArrowRightIcon } from "../components/Icons";
import { OrderDetailPreview } from "../components/orders/OrderDetailPreview";
import { ORDER_STATUSES } from "../components/orders/orderUtils";

export const OrderDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { ordersList, updateOrderStatus } = useAdminAuth();
  const order = ordersList.find((item) => item.id === id);

  if (!order) {
    return <Navigate to="/orders" replace />;
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-text-main/10 bg-slate/40 p-5 shadow-[0_16px_42px_rgba(0,0,0,0.16)] sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <Link className="inline-flex items-center gap-2 text-sm font-bold text-gold-bright transition hover:text-gold" to="/orders">
            <ArrowRightIcon className="rotate-180" size={16} />
            Back to orders
          </Link>
          <h2 className="mt-3 text-2xl font-extrabold text-text-main">Order Preview</h2>
          <p className="mt-1 text-sm text-text-dim">Inspect buyer, book, payment, and delivery information.</p>
        </div>

        <label className="grid gap-2 text-left text-xs font-extrabold uppercase tracking-wider text-text-dim sm:min-w-56">
          Update Status
          <select
            className={tw.select.replace("pl-11", "pl-4")}
            value={order.orderStatus}
            onChange={(event) => updateOrderStatus(order.id, event.target.value as Order["orderStatus"])}
          >
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <OrderDetailPreview order={order} />
    </div>
  );
};
