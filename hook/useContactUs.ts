
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactUsService } from "@/services/contactUsService";

export const useContactUs = (limit = 10, offset = 0) => {
  const queryClient = useQueryClient();

  const modulesQuery = useQuery({
    queryKey: ["modules", limit, offset],
    queryFn: () => contactUsService.getAll({ limit, offset }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: (data: any) => contactUsService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["modules"] }),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }: any) => contactUsService.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["modules"] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => contactUsService.remove(uuid),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["modules"] }),
  });

  return {
    modules: modulesQuery.data?.data ?? [],
    total: modulesQuery.data?.metadata?.info?.total ?? 0,
    isLoading: modulesQuery.isLoading,

    createContactUs: createMutation.mutateAsync,
    updateContactUs: updateMutation.mutateAsync,
    deleteContactUs: deleteMutation.mutateAsync
  };
};