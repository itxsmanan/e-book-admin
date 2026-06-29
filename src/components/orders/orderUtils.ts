import type { Order } from "../../context/AuthContext";
import { tw } from "../adminTailwind";

export const ORDER_STATUSES: Order["orderStatus"][] = [
  "Processing",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export const formatCurrency = (amount: number) => `Rs. ${Number(amount || 0).toLocaleString()}`;

export const orderStatusClass = (status: Order["orderStatus"]) => {
  if (status === "Delivered") return tw.resolvedBadge;
  if (status === "Cancelled") return tw.suspendedBadge;
  if (status === "Shipped") return "border-sky-300/25 bg-sky-300/15 text-sky-200";
  if (status === "Packed") return "border-indigo-300/25 bg-indigo-300/15 text-indigo-200";
  return tw.pendingBadge;
};
