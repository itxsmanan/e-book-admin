import React from "react";
import { useAdminAuth } from "../context/AuthContext";
import { tw } from "../components/adminTailwind";
import { OrderCard } from "../components/orders/OrderCard";
import { OrderSummaryCards } from "../components/orders/OrderSummaryCards";
import { OrdersTable } from "../components/orders/OrdersTable";

export const OrdersPage: React.FC = () => {
  const { ordersList } = useAdminAuth();

  return (
    <div className="grid gap-6">
      <div className={tw.notice}>
        <strong className="text-gold-bright">Book Orders:</strong>{" "}
        Review hard-copy book orders coming from the website checkout and open each order for a full preview.
      </div>

      <OrderSummaryCards orders={ordersList} />

      {ordersList.length > 0 ? (
        <>
          <OrdersTable orders={ordersList} />
          <div className="grid gap-4 lg:hidden">
            {ordersList.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-2xl border border-text-main/10 bg-slate/40 p-12 text-center text-text-dim">
          No book orders yet. Successful hard-copy purchases from the website will appear here.
        </div>
      )}
    </div>
  );
};
