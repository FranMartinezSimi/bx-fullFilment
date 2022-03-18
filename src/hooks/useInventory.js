import { useMemo } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import GetProductsList from 'services/inventory/getProductsList';

const CACHE_NAME = 'inventory';

export const useInventory = () => {
  const {
    data,
    isLoading: isGetInventory,
    isError: errorGetInventory,
  } = useQuery(CACHE_NAME, GetProductsList, {
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });

  const inventory = useMemo(() => data || [], [data]);

  const invetoryKeyedBySku = useMemo(() => {
    if (!inventory.length) {
      return {};
    }

    return inventory.reduce(
      (acum, product) => ({
        ...acum,
        [product.sku]: product,
      }),
      {},
    );
  }, [inventory]);

  const queryClient = useQueryClient();

  const refresh = () => {
    queryClient.invalidateQueries(CACHE_NAME);
  };

  return {
    inventory,
    isGetInventory,
    errorGetInventory,
    invetoryKeyedBySku,
    refresh,
  };
};

export default useInventory;
