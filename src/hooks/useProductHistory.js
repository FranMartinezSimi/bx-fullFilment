import { useMemo } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import GetProductHistory from 'services/inventory/getProductHistory';
import { subtractDate } from 'utils/date';

export const CACHE_NAME = 'ProductHistoryByDateRange';

export const useProductHistory = ({ sku } = {}) => {
  const endDate = useMemo(() => new Date(), []);
  const startDate = useMemo(() => subtractDate(endDate, { days: 30 }), [endDate]);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    [CACHE_NAME, { sku, startDate, endDate }],
    () => GetProductHistory({ sku, startDate, endDate }),
    { staleTime: 1000 * 60 * 5 },
  );

  const refresh = () => {
    queryClient.invalidateQueries([CACHE_NAME, { sku, startDate, endDate }]);
  };

  return {
    startDate,
    endDate,
    data: data || [],
    isLoading,
    isError,
    refresh,
  };
};

export default useProductHistory;
