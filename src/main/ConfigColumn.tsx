"use client";

import { ISku } from "@/hooks/usePriceEstimation";
import { ServerTypeSelector } from "@/components/ServerTypeSelector";
import { Loading } from "@/components/Loading";
import { SkuSelector } from "@/components/SkuSelector";
import { AddonsSelector } from "@/components/AddonsSelector";

interface IConfigColumnProps {
  isLoading: boolean;
  availableSkus: ISku[];
}

export const ConfigColumn: React.FC<IConfigColumnProps> = ({
  isLoading,
  availableSkus,
}) => {
  return (
    <div className="w-full lg:w-[68%] p-8 lg:p-10 flex flex-col gap-10 lg:border-r border-slate-100 relative min-h-125">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-6">
          <ServerTypeSelector />
          <SkuSelector availableSkus={availableSkus} />
          <AddonsSelector />
        </div>
      )}
    </div>
  );
};
