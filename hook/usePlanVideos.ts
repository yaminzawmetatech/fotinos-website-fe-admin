

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { planVideoService } from "@/services/planVideoService";

export const usePlanVideos = (limit = 2, offset = 0) => {
  const queryClient = useQueryClient();

  const planVideosQuery = useQuery({
    queryKey: ["planVideos", limit, offset],
    queryFn: () => planVideoService.getAll({ limit, offset }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });


  // CREATE
  const createMutation = useMutation({
    mutationFn: (data: any) => planVideoService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["planVideos"] }),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }: any) => planVideoService.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["planVideos"] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => planVideoService.remove(uuid),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["planVideos"] }),
  });
  
  return {
    planVideos: planVideosQuery.data?.data ?? [],
    total: planVideosQuery.data?.metadata?.info?.total ?? 0,
    isLoading: planVideosQuery.isLoading,
  
    createPlanVideo: createMutation.mutateAsync,
    updatePlanVideo: updateMutation.mutateAsync,
    deletePlanVideo: deleteMutation.mutateAsync,
  };
};