"use client";

import React, { ReactNode } from "react";
import { Typography } from "antd";

const { Text } = Typography;

interface ISelectableCardProps {
  isSelected: boolean;
  onClick: () => void;
  icon: ReactNode;
  title: string;
  description: string;
  showTopBar?: boolean;
}

export const SelectableCard: React.FC<ISelectableCardProps> = ({
  isSelected,
  onClick,
  icon,
  title,
  description,
  showTopBar = true,
}) => {
  return (
    <div
      onClick={onClick}
      className={`min-h-28 py-3 flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all duration-300 border-2 relative overflow-hidden group ${
        isSelected
          ? "border-orange-400 bg-orange-50/30 shadow-md shadow-orange-100/50 -translate-y-0.5"
          : "border-slate-200 hover:border-orange-300 hover:bg-slate-50/50 hover:shadow-sm"
      }`}
    >
      {isSelected && showTopBar && (
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-orange-400 to-amber-400"></div>
      )}
      <div
        className={`text-2xl mb-1 transition-colors ${
          isSelected
            ? "text-orange-500"
            : "text-slate-400 group-hover:text-orange-400"
        }`}
      >
        {icon}
      </div>
      <Text
        className={`font-semibold text-[15px] transition-colors ${
          isSelected
            ? "text-slate-800"
            : "text-slate-500 group-hover:text-slate-700"
        }`}
      >
        {title}
      </Text>
      <Text
        className={`text-xs mt-1 px-2 text-center whitespace-pre-line transition-colors ${
          isSelected
            ? "text-orange-600 font-medium"
            : "text-slate-400"
        }`}
      >
        {description}
      </Text>
    </div>
  );
};
