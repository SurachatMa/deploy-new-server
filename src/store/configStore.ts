import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { EBillingMode, EServerType } from "@/types/enums";

interface IConfigState {
  // State
  serverType: EServerType;
  selectedSkuId: string | null;
  extraRamGb: number;
  extraDiskGb: number;
  billingMode: EBillingMode;

  // Actions
  setServerType: (type: EServerType) => void;
  setSelectedSkuId: (id: string | null) => void;
  setExtraRamGb: (gb: number) => void;
  setExtraDiskGb: (gb: number) => void;
  setBillingMode: (mode: EBillingMode) => void;
  resetConfig: () => void;
}

export const useConfigStore = create<IConfigState>()(
  devtools(
    (set) => ({
      // Initial State
      serverType: EServerType.VirtualMachine,
      selectedSkuId: null,
      extraRamGb: 0,
      extraDiskGb: 0,
      billingMode: EBillingMode.Monthly,

      // Actions
      setServerType: (serverType) =>
        set({
          serverType,
          selectedSkuId: null,
        }),
      setSelectedSkuId: (selectedSkuId) => set({ selectedSkuId }),
      setExtraRamGb: (extraRamGb) => set({ extraRamGb }),
      setExtraDiskGb: (extraDiskGb) => set({ extraDiskGb }),
      setBillingMode: (billingMode) => set({ billingMode }),
      resetConfig: () =>
        set({
          serverType: EServerType.VirtualMachine,
          selectedSkuId: null,
          extraRamGb: 0,
          extraDiskGb: 0,
          billingMode: EBillingMode.Monthly,
        }),
    }),
    { name: "ConfigStore" }
  )
);
