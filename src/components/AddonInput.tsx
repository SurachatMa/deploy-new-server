"use client";

import React, { ReactNode } from "react";
import { Typography, InputNumber } from "antd";

const { Text } = Typography;

interface IAddonInputProps {
  icon: ReactNode;
  title: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
  unit: string;
}

export const AddonInput: React.FC<IAddonInputProps> = ({
  icon,
  title,
  description,
  value,
  onChange,
  unit,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100">
          {icon}
        </div>
        <div>
          <Text className="font-semibold text-slate-700 block">{title}</Text>
          <Text className="text-xs text-slate-400">{description}</Text>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2 sm:mt-0">
        <InputNumber
          min={0}
          precision={0}
          value={value}
          onChange={(val) => onChange(val ?? 0)}
          className="w-24 rounded-lg hover:border-orange-400 focus:border-orange-500"
        />
        <Text className="text-slate-500 font-bold text-sm w-6">{unit}</Text>
      </div>
    </div>
  );
};
