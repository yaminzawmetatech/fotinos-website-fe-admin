

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { planService } from "@/services/planService";

export const usePlans = (limit = 10, offset = 0) => {
  const queryClient = useQueryClient();

  const plansQuery = useQuery({
    queryKey: ["plans", limit, offset],
    queryFn: () => planService.getAll({ limit, offset }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });


  // CREATE
  const createMutation = useMutation({
    mutationFn: (data: any) => planService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["plans"] }),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }: any) => planService.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["plans"] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => planService.remove(uuid),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["plans"] }),
  });
  
  return {
    plans: plansQuery.data?.data ?? [],
    total: plansQuery.data?.metadata?.info?.total ?? 0,
    isLoading: plansQuery.isLoading,
  
    createPlan: createMutation.mutateAsync,
    updatePlan: updateMutation.mutateAsync,
    deletePlan: deleteMutation.mutateAsync,
  };
};