"use client";

import React from "react";
import { DatabaseOutlined, HddOutlined } from "@ant-design/icons";
import { useConfigStore } from "@/store/configStore";
import { AddonInput } from "./AddonInput";
import { SectionTitle } from "./SectionTitle";

export const AddonsSelector: React.FC = () => {
  const { extraRamGb, setExtraRamGb, extraDiskGb, setExtraDiskGb } =
    useConfigStore();

  return (
    <section className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
      <SectionTitle icon={<HddOutlined />}>Custom Add-ons</SectionTitle>
      <div className="flex flex-col gap-5 max-w-[90%]">
        <AddonInput
          icon={<DatabaseOutlined className="text-slate-400" />}
          title="Extra RAM"
          description="Add more memory for demanding apps."
          value={extraRamGb}
          onChange={setExtraRamGb}
          unit="GB"
        />
        <AddonInput
          icon={<HddOutlined className="text-slate-400" />}
          title="Extra NVMe Storage"
          description="Expand your system storage capacity."
          value={extraDiskGb}
          onChange={setExtraDiskGb}
          unit="GB"
        />
      </div>
    </section>
  );
};
