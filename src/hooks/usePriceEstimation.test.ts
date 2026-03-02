import { calculateEstimatedPrice, ISku, IAddon, IPriceParams } from './usePriceEstimation';
import { EAddonType, EBillingMode } from '@/types/enums';

describe('calculateEstimatedPrice', () => {

  const mockAddons: IAddon[] = [
    { id: 'addon-ram', type: EAddonType.Ram, name: 'Extra RAM', unit: 'GB', price_per_unit_hourly: 0.2, price_per_unit_monthly: 150 },
    { id: 'addon-disk', type: EAddonType.Disk, name: 'Extra disk', unit: 'GB', price_per_unit_hourly: 0.05, price_per_unit_monthly: 30 }
  ];

  const mockSku: ISku = {
    sku: 'C1-R1GB-D20GB',
    type: 'virtual-machine',
    name: 'Micro',
    cpu: 1,
    ram: 1,
    disk: 20,
    price_hourly: 0.27,
    price_monthly: 180
  };

  it('should return 0 when no SKU is selected', () => {
    // Arrange
    const params: IPriceParams = {
      billingMode: EBillingMode.Monthly,
      selectedSku: null,
      extraRamGb: 2,
      extraDiskGb: 10,
      addons: mockAddons
    };

    // Act
    const result = calculateEstimatedPrice(params);

    // Assert
    expect(result).toBe(0);
  });

  it('should calculate the base monthly price correctly when no addons are selected', () => {
    // Arrange
    const params: IPriceParams = {
      billingMode: EBillingMode.Monthly,
      selectedSku: mockSku,
      extraRamGb: 0,
      extraDiskGb: 0,
      addons: mockAddons
    };

    // Act
    const result = calculateEstimatedPrice(params);

    // Assert
    expect(result).toBe(180);
  });

  it('should calculate the base hourly price correctly when no addons are selected', () => {
    // Arrange
    const params: IPriceParams = {
      billingMode: EBillingMode.Hourly,
      selectedSku: mockSku,
      extraRamGb: 0,
      extraDiskGb: 0,
      addons: mockAddons
    };

    // Act
    const result = calculateEstimatedPrice(params);

    // Assert
    expect(result).toBe(0.27);
  });

  it('should calculate the total monthly price correctly including extra RAM and Disk addons', () => {
    // Arrange
    // base: 180, extra ram: 2 * 150 = 300, extra disk: 10 * 30 = 300, total = 780
    const params: IPriceParams = {
      billingMode: EBillingMode.Monthly,
      selectedSku: mockSku,
      extraRamGb: 2,
      extraDiskGb: 10,
      addons: mockAddons
    };

    // Act
    const result = calculateEstimatedPrice(params);

    // Assert
    expect(result).toBe(780);
  });

  it('should calculate the total hourly price correctly including extra RAM and Disk addons', () => {
    // Arrange
    // base: 0.27, extra ram: 2 * 0.2 = 0.4, extra disk: 10 * 0.05 = 0.5, total = 1.17
    const params: IPriceParams = {
      billingMode: EBillingMode.Hourly,
      selectedSku: mockSku,
      extraRamGb: 2,
      extraDiskGb: 10,
      addons: mockAddons
    };

    // Act
    const result = calculateEstimatedPrice(params);

    // Assert
    expect(result).toBeCloseTo(1.17, 4);
  });

  it('should fallback to 0 extra price and return base monthly price when addons list is empty', () => {
    // Arrange
    // If addons list is empty somehow
    const params: IPriceParams = {
      billingMode: EBillingMode.Monthly,
      selectedSku: mockSku,
      extraRamGb: 10,
      extraDiskGb: 10,
      addons: []
    };

    // Act
    const result = calculateEstimatedPrice(params);

    // Assert
    expect(result).toBe(180);
  });

  it('should calculate correctly when only extra RAM is added (extraDiskGb = 0)', () => {
    // Arrange
    // base: 180, extra ram: 4 * 150 = 600, extra disk: 0 * 30 = 0, total = 780
    const params: IPriceParams = {
      billingMode: EBillingMode.Monthly,
      selectedSku: mockSku,
      extraRamGb: 4,
      extraDiskGb: 0,
      addons: mockAddons
    };

    // Act
    const result = calculateEstimatedPrice(params);

    // Assert
    expect(result).toBe(780);
  });

  it('should calculate correctly when only extra Disk is added (extraRamGb = 0)', () => {
    // Arrange
    // base: 180, extra ram: 0 * 150 = 0, extra disk: 10 * 30 = 300, total = 480
    const params: IPriceParams = {
      billingMode: EBillingMode.Monthly,
      selectedSku: mockSku,
      extraRamGb: 0,
      extraDiskGb: 10,
      addons: mockAddons
    };

    // Act
    const result = calculateEstimatedPrice(params);

    // Assert
    expect(result).toBe(480);
  });

  it('should fallback disk price to 0 when disk type is missing from addons array', () => {
    // Arrange
    // addons only has 'ram' type — disk addon not found → diskPriceUnit = 0
    // base: 180, extra ram: 0 * 150 = 0, extra disk: 5 * 0 = 0, total = 180
    const ramOnlyAddons: IAddon[] = [
      { id: 'addon-ram', type: EAddonType.Ram, name: 'Extra RAM', unit: 'GB', price_per_unit_hourly: 0.2, price_per_unit_monthly: 150 }
    ];
    const params: IPriceParams = {
      billingMode: EBillingMode.Monthly,
      selectedSku: mockSku,
      extraRamGb: 0,
      extraDiskGb: 5,
      addons: ramOnlyAddons
    };

    // Act
    const result = calculateEstimatedPrice(params);

    // Assert
    expect(result).toBe(180);
  });
});
