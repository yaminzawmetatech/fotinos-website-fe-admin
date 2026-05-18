

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentMethodService } from "@/services/paymentMethodService";

export const usePaymentMethods = (limit = 2, offset = 0) => {
  const queryClient = useQueryClient();

  const paymentMethodsQuery = useQuery({
    queryKey: ["paymentMethods", limit, offset],
    queryFn: () => paymentMethodService.getAll({ limit, offset }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });


  // CREATE
  const createMutation = useMutation({
    mutationFn: (data: any) => paymentMethodService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] }),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }: any) => paymentMethodService.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => paymentMethodService.remove(uuid),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["paymentMethods"] }),
  });
  
  return {
    paymentMethods: paymentMethodsQuery.data?.data ?? [],
    total: paymentMethodsQuery.data?.metadata?.info?.total ?? 0,
    isLoading: paymentMethodsQuery.isLoading,
  
    createPaymentMethod: createMutation.mutateAsync,
    updatePaymentMethod: updateMutation.mutateAsync,
    deletePaymentMethod: deleteMutation.mutateAsync,
  };
};