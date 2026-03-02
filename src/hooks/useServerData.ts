import { useState, useEffect } from 'react';
import { ISku, IAddon } from './usePriceEstimation';
import mockData from '../../public/data.json';

interface IDataResponse {
  skus: ISku[];
  addons: IAddon[];
}

export function useServerData() {
  const [data, setData] = useState<IDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    // network delay between 1.0 to 3.0 seconds
    const delay = Math.floor(Math.random() * 2000) + 1000;

    try {
      await new Promise<void>((resolve) => setTimeout(resolve, delay));

      setData(mockData as IDataResponse);

      // test error
      // throw new Error("Failed to load data");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...data, isLoading, error, refetch: fetchData };
}
