import { useMemo } from 'react';
import { EAddonType, EBillingMode } from '@/types/enums';

export interface ISku {
  sku: string;
  type: string;
  name: string;
  cpu: number;
  ram: number;
  disk: number;
  price_hourly: number;
  price_monthly: number;
}

export interface IAddon {
  id: string;
  type: EAddonType;
  name: string;
  unit: string;
  price_per_unit_hourly: number;
  price_per_unit_monthly: number;
}

export interface IPriceParams {
  billingMode: EBillingMode;
  selectedSku: ISku | null;
  extraRamGb: number;
  extraDiskGb: number;
  addons: IAddon[];
}

export function calculateEstimatedPrice(props: IPriceParams): number {
  const {billingMode, selectedSku, extraRamGb, extraDiskGb, addons } = props;

  if (!selectedSku) return 0;

  const isMonthly = billingMode === EBillingMode.Monthly;
  const basePrice = isMonthly ? selectedSku.price_monthly : selectedSku.price_hourly;

  const ramAddon = addons.find(a => a.type === EAddonType.Ram);
  const diskAddon = addons.find(a => a.type === EAddonType.Disk);

  const ramPriceUnit = ramAddon ? (isMonthly ? ramAddon.price_per_unit_monthly : ramAddon.price_per_unit_hourly) : 0;
  const diskPriceUnit = diskAddon ? (isMonthly ? diskAddon.price_per_unit_monthly : diskAddon.price_per_unit_hourly) : 0;

  const extraRamPrice = (extraRamGb || 0) * ramPriceUnit;
  const extraDiskPrice = (extraDiskGb || 0) * diskPriceUnit;

  return basePrice + extraRamPrice + extraDiskPrice;
}

export function usePriceEstimation(props: IPriceParams): { estimatedPrice: number } {
  const { billingMode, selectedSku, extraRamGb, extraDiskGb, addons } =  props
  const estimatedPrice = useMemo(() => {
    return calculateEstimatedPrice({ billingMode, selectedSku, extraRamGb, extraDiskGb, addons });
  }, [billingMode, selectedSku, extraRamGb, extraDiskGb, addons]);

  return { estimatedPrice };
}
