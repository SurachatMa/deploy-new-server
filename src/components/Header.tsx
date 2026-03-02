"use client";

import React from "react";
import { Typography } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { CartButton } from "./CartButton";

const { Title } = Typography;

export const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center px-8 py-5 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-20">
      <div className="flex items-center gap-3 animate-fade-in">
        <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shadow-sm border border-orange-100">
          <AppstoreOutlined className="text-xl" />
        </div>
        <Title
          level={4}
          className="mb-0! text-slate-800 font-bold tracking-tight"
        >
          Deploy new Server
        </Title>
      </div>
      <CartButton />
    </div>
  );
};
