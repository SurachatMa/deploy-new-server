"use client";

import React, { useEffect, useMemo } from "react";
import { message, Modal } from "antd";
import { usePriceEstimation } from "@/hooks/usePriceEstimation";
import { useServerData } from "@/hooks/useServerData";
import { useCartStore, ICartItem } from "@/store/cartStore";
import { Header } from "@/components/Header";
import { ConfigColumn } from "./ConfigColumn";
import { SummaryColumn } from "./SummaryColumn";
import { useConfigStore } from "@/store/configStore";

const Main: React.FC = () => {
  const { skus, addons, isLoading, error, refetch } = useServerData();
  const { addItem: addToCart } = useCartStore();
  const {
    serverType,
    selectedSkuId,
    extraRamGb,
    extraDiskGb,
    billingMode,
  } = useConfigStore();

  const selectedSku = useMemo(
    () => skus?.find((s) => s.sku === selectedSkuId) || null,
    [selectedSkuId, skus],
  );

  const { estimatedPrice } = usePriceEstimation({
    billingMode,
    selectedSku,
    extraRamGb,
    extraDiskGb,
    addons: addons ?? [],
  });

  const availableSkus = useMemo(
    () => skus?.filter((s) => s.type === serverType) || [],
    [skus, serverType],
  );

  const handleAddToCart = () => {
    if (!selectedSku) return;

    const cartItem: Omit<ICartItem, "id"> = {
      serverType,
      sku: selectedSku,
      extraRamGb,
      extraDiskGb,
      billingMode,
      totalPrice: estimatedPrice,
    };
    addToCart(cartItem);
    message.success(`${selectedSku.name} added to cart!`);
    console.log("Added to cart:", cartItem);
  };

  // Show error modal when error occurs
  useEffect(() => {
    if (error) {
      Modal.error({
        title: "Failed to Load Server Data",
        content: error,
        okText: "Try Again",
        onOk: refetch,
        centered: true,
        maskClosable: false,
      });
    }
  }, [error, refetch]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 flex justify-center items-start overflow-y-auto font-sans">
      <div className="w-full max-w-275 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col border border-slate-200 mt-2 mb-16">
        <Header />

        <div className="flex flex-col lg:flex-row bg-white min-h-150">
          {/* Left Column (Config Form) */}
          <ConfigColumn
            isLoading={isLoading}
            availableSkus={availableSkus}
          />

          {/* Right Column (Summary) */}
          <SummaryColumn
            selectedSku={selectedSku}
            estimatedPrice={estimatedPrice}
            handleAddToCart={handleAddToCart}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
