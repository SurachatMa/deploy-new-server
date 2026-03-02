"use client";

import React from "react";
import { Typography, Divider, Radio, Button } from "antd";
import { EBillingMode, EServerType } from "@/types/enums";
import { ISku } from "@/hooks/usePriceEstimation";

import { useConfigStore } from "@/store/configStore";

const { Title, Text } = Typography;

interface ISummaryColumnProps {
  selectedSku: ISku | null;
  estimatedPrice: number;
  handleAddToCart: () => void;
  isLoading: boolean;
}

export const SummaryColumn: React.FC<ISummaryColumnProps> = ({
  selectedSku,
  estimatedPrice,
  handleAddToCart,
  isLoading,
}) => {
  const {
    serverType,
    extraRamGb,
    extraDiskGb,
    billingMode,
    setBillingMode,
  } = useConfigStore();
  return (
    <div className="w-full lg:w-[32%] bg-slate-50/60 relative">
      <div className="lg:sticky lg:top-20 p-8 lg:p-10 flex flex-col h-full min-h-125">
        <div className="flex-1">
          <Title
            level={5}
            className="mb-6! text-slate-800! font-bold pb-4 flex items-center gap-2 relative"
          >
            Summary
            <div className="absolute bottom-0 left-0 w-8 h-1 bg-linear-to-r from-orange-400 to-amber-400 rounded-full"></div>
          </Title>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative overflow-hidden mb-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/80 rounded-full blur-2xl -mr-10 -mt-10 opacity-70"></div>

            <div className="space-y-4 relative z-10 p-1">
              <div
                className="flex justify-between items-center animate-fade-in-up"
                style={{ animationDelay: "0.5s" }}
              >
                <Text className="text-slate-500 font-medium">Server Type</Text>
                <Text className="font-bold text-slate-800">
                  {serverType === EServerType.VirtualMachine
                    ? "Virtual Machine"
                    : "Dedicated"}
                </Text>
              </div>

              <Divider className="my-3 border-slate-100" />

              <div
                className="flex justify-between items-center animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <Text className="text-slate-500 font-medium">Selected SKU</Text>
                <Text className="font-bold text-slate-800">
                  {selectedSku ? (
                    selectedSku.name
                  ) : (
                    <span className="text-slate-300 font-normal">Pending</span>
                  )}
                </Text>
              </div>

              {selectedSku && (
                <div
                  className="flex justify-between items-center animate-fade-in-up"
                  style={{ animationDelay: "0.65s" }}
                >
                  <Text className="text-transparent font-medium text-[12px] opacity-0">
                    -
                  </Text>
                  <Text className="text-orange-600 font-medium text-[12px]">
                    {selectedSku.cpu}vCPU / {selectedSku.ram}GB /{" "}
                    {selectedSku.disk}GB
                  </Text>
                </div>
              )}

              <Divider className="my-3 border-slate-100" />

              <div
                className="flex justify-between items-center animate-fade-in-up"
                style={{ animationDelay: "0.7s" }}
              >
                <Text className="text-slate-500 font-medium">Extra RAM</Text>
                <Text className="font-bold text-orange-600">
                  {extraRamGb > 0 ? `+${extraRamGb} GB` : "-"}
                </Text>
              </div>

              <div
                className="flex justify-between items-center animate-fade-in-up"
                style={{ animationDelay: "0.75s" }}
              >
                <Text className="text-slate-500 font-medium">Extra Disk</Text>
                <Text className="font-bold text-orange-600">
                  {extraDiskGb > 0 ? `+${extraDiskGb} GB` : "-"}
                </Text>
              </div>
            </div>
          </div>

          <div
            className="px-2 animate-fade-in-up"
            style={{ animationDelay: "0.9s" }}
          >
            <div className="flex justify-center mb-6">
              <Radio.Group
                options={[
                  {
                    label: "Monthly billing",
                    value: EBillingMode.Monthly,
                  },
                  { label: "Hourly billing", value: EBillingMode.Hourly },
                ]}
                onChange={(e) => setBillingMode(e.target.value)}
                value={billingMode}
                optionType="button"
                buttonStyle="solid"
                className="w-full text-center"
              />
            </div>

            <div className="flex justify-between items-end border-t border-slate-200 pt-4 mt-2">
              <Text className="text-slate-600 font-bold">Estimated Cost</Text>
              <div className="text-right">
                <Title
                  level={2}
                  className="mb-0! text-slate-800! font-black tracking-tight"
                >
                  $
                  {estimatedPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 4,
                  })}
                </Title>
                <Text className="text-xs text-slate-400 font-medium">
                  / {billingMode === EBillingMode.Hourly ? "hour" : "month"}
                </Text>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-8 animate-fade-in-up"
          style={{ animationDelay: "1.0s" }}
        >
          <Button
            onClick={handleAddToCart}
            type="primary"
            size="large"
            block
            disabled={!selectedSku || isLoading}
            className={`h-14 rounded-xl text-lg font-bold transition-all shadow-md group ${
              !selectedSku || isLoading
                ? "bg-slate-200 text-slate-400 border-none hover:bg-slate-200 cursor-not-allowed shadow-none!"
                : "bg-orange-500 hover:bg-orange-600 hover:shadow-orange-500/40 hover:-translate-y-1"
            }`}
          >
            Add to Cart
          </Button>
          <Text className="block text-center text-[12px] text-slate-400 mt-4 font-medium">
            By clicking this, you agree to our{" "}
            <a
              href="#"
              className="underline hover:text-orange-500 transition-colors"
            >
              Terms of Service
            </a>
          </Text>
        </div>
      </div>
    </div>
  );
};
