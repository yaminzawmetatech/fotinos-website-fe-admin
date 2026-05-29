

import { orderService } from "@/services/orderService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useOrders = (limit = 10, offset = 0) => {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ["orders", limit, offset],
    queryFn: () => orderService.getAll({ limit, offset }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });


  // CREATE
  const createMutation = useMutation({
    mutationFn: (data: any) => orderService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }: any) => orderService.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => orderService.remove(uuid),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });
  
  return {
    orders: ordersQuery.data?.data ?? [],
    total: ordersQuery.data?.metadata?.info?.total ?? 0,
    isLoading: ordersQuery.isLoading,
  
    createOrder: createMutation.mutateAsync,
    updateOrder: updateMutation.mutateAsync,
    deleteOrder: deleteMutation.mutateAsync,
  };
};