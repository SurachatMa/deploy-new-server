"use client";

import React from "react";
import { List, Empty } from "antd";
import { useCartStore } from "@/store/cartStore";
import { CartItemRow } from "./CartItemRow";

export const CartContent: React.FC = () => {
  const { items: cartItems, removeItem: removeFromCart } = useCartStore();

  if (cartItems.length === 0) {
    return (
      <div className="w-80 max-h-96 overflow-y-auto p-1 font-sans">
        <Empty description="Your cart is empty" className="my-6" />
      </div>
    );
  }

  return (
    <div className="w-80 max-h-96 overflow-y-auto p-1 font-sans">
      <List
        dataSource={cartItems}
        renderItem={(item) => (
          <CartItemRow item={item} onRemove={removeFromCart} />
        )}
      />
    </div>
  );
};
