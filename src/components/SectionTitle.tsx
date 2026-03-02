"use client";

import React, { ReactNode } from "react";
import { Typography } from "antd";

const { Title } = Typography;

interface ISectionTitleProps {
  icon?: ReactNode;
  children: ReactNode;
  level?: 4 | 5;
  className?: string;
}

export const SectionTitle: React.FC<ISectionTitleProps> = ({
  icon,
  children,
  level = 5,
  className = "",
}) => {
  return (
    <Title
      level={level}
      className={`mb-4! text-slate-700! font-bold flex items-center gap-2 ${className}`}
    >
      {icon && <span className="text-slate-400">{icon}</span>}
      {children}
    </Title>
  );
};
