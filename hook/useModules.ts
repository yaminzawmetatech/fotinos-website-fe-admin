

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { moduleService } from "@/services/moduleService";

export const useModules = (limit = 10, offset = 0) => {
  const queryClient = useQueryClient();

  const modulesQuery = useQuery({
    queryKey: ["modules", limit, offset],
    queryFn: () => moduleService.getAll({ limit, offset }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });


  // CREATE
  const createMutation = useMutation({
    mutationFn: (data: any) => moduleService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["modules"] }),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }: any) => moduleService.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["modules"] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => moduleService.remove(uuid),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["modules"] }),
  });
  
  return {
    modules: modulesQuery.data?.data ?? [],
    total: modulesQuery.data?.metadata?.info?.total ?? 0,
    isLoading: modulesQuery.isLoading,
  
    createModule: createMutation.mutateAsync,
    updateModule: updateMutation.mutateAsync,
    deleteModule: deleteMutation.mutateAsync,
  };
};