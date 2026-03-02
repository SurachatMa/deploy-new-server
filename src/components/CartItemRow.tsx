"use client";

import React from "react";
import { Button, Tag, List } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { EBillingMode, EServerType } from "@/types/enums";
import { ICartItem } from "@/store/cartStore";

interface ICartItemRowProps {
  item: ICartItem;
  onRemove: (id: string) => void;
}

export const CartItemRow: React.FC<ICartItemRowProps> = ({ item, onRemove }) => {
  return (
    <List.Item
      className="border-b border-slate-100 last:border-none p-3 hover:bg-slate-50 transition-colors rounded-lg mb-2"
      actions={[
        <Button
          key="delete"
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onRemove(item.id)}
        />,
      ]}
    >
      <List.Item.Meta
        title={
          <span className="font-bold text-slate-800">
            {item.sku.name}{" "}
            <Tag color="orange" className="ml-2 text-[10px]">
              {item.billingMode}
            </Tag>
          </span>
        }
        description={
          <div className="text-xs text-slate-500 mt-1">
            <div>
              {item.serverType === EServerType.VirtualMachine
                ? "VM"
                : "Dedicated"}
            </div>
            <div className="font-semibold text-orange-600 mt-1">
              ${item.totalPrice.toLocaleString()} /{" "}
              {item.billingMode === EBillingMode.Hourly ? "hr" : "mo"}
            </div>
          </div>
        }
      />
    </List.Item>
  );
};
