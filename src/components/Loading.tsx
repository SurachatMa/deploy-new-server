"use client";

import React from "react";
import { Skeleton } from "antd";

export const Loading: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <Skeleton active paragraph={{ rows: 2 }} />
      <Skeleton active paragraph={{ rows: 3 }} />
      <Skeleton active paragraph={{ rows: 4 }} />
    </div>
  );
};
