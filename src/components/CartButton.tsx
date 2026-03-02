"use client";

import React, { useState, useEffect } from "react";
import { Badge, Popover } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCartStore } from "@/store/cartStore";
import { CartContent } from "./CartContent";

export const CartButton: React.FC = () => {
  const { items: cartItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center gap-4 cursor-pointer text-slate-500 hover:text-orange-500 transition-colors group animate-fade-in">
      {mounted ? (
        <Popover
          content={<CartContent />}
          title="Your Cart"
          trigger="click"
          placement="bottomRight"
          arrow={false}
        >
          <Badge count={cartItems.length} showZero color="#f97316">
            <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-orange-50 transition-colors">
              <span className="font-semibold text-[15px]">Cart</span>
              <ShoppingCartOutlined className="text-xl group-hover:scale-110 transition-transform" />
            </div>
          </Badge>
        </Popover>
      ) : (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[15px]">Cart</span>
          <ShoppingCartOutlined className="text-xl" />
        </div>
      )}
    </div>
  );
};
