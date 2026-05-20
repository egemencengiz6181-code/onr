import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "./types";

// ─── Types ────────────────────────────────────────────────────────
export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  userEmail: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingAddress: ShippingAddress;
  billingAddressSame: boolean;
  billingAddress?: ShippingAddress;
  paymentMethod: string;
  notes?: string;
  createdAt: string;
}

interface OrderState {
  orders: Order[];
  currentOrderId: string | null;
  addOrder: (order: Order) => void;
  getOrder: (id: string) => Order | undefined;
  setCurrentOrder: (id: string) => void;
  clearCurrentOrder: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrderId: null,

      addOrder: (order) =>
        set({ orders: [order, ...get().orders], currentOrderId: order.id }),

      getOrder: (id) => get().orders.find((o) => o.id === id),

      setCurrentOrder: (id) => set({ currentOrderId: id }),
      clearCurrentOrder: () => set({ currentOrderId: null }),
    }),
    { name: "onr-orders" }
  )
);

// ─── Helpers ──────────────────────────────────────────────────────
export function cartItemsToOrderItems(cartItems: CartItem[]): OrderItem[] {
  return cartItems.map((item) => ({
    productId: item.product.id,
    name: item.product.name,
    category: item.product.category,
    price: item.discountedPrice ?? item.product.price,
    quantity: item.quantity,
    image: item.product.images[0]?.src ?? "",
  }));
}

export function generateOrderNumber(): string {
  const now = new Date();
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `ONR-${date}-${rand}`;
}
