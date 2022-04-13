import { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import GetOrdersList from 'services/orders/getOrdersList';
import { monthNames } from 'utils/date';

export const CACHE_NAME = 'orders';

export const useOrders = ({ status } = {}) => {
  const [date, setDate] = useState(new Date());
  const queryClient = useQueryClient();
  const { data, isLoading, isError, isFetching, refetch } = useQuery(
    [CACHE_NAME, { status }],
    () => GetOrdersList({ status }),
    {
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true,
      onSuccess: () => setDate(new Date()),
    },
  );

  const updatedAt = useMemo(
    () => ({
      day: date.getDate(),
      month: monthNames[date.getMonth()],
      time: `${date.getHours()} : ${
        date.getMinutes() < 10 ? '0' : ''
      }${date.getMinutes()}`,
    }),
    [date],
  );

  const refresh = () => {
    queryClient.invalidateQueries([CACHE_NAME, { status }]);
  };

  return {
    orders: data || [],
    isLoading,
    isError,
    isFetching,
    refresh,
    refetch,
    updatedAt,
  };
};

export default useOrders;
