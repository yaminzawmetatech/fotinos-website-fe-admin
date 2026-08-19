
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { policyDocumentService } from "@/services/policyDocumentService";

export const usePolicyDocuments = (limit = 10, offset = 0) => {
  const queryClient = useQueryClient();

  const modulesQuery = useQuery({
    queryKey: ["modules", limit, offset],
    queryFn: () => policyDocumentService.getAll({ limit, offset }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: (data: any) => policyDocumentService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["modules"] }),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }: any) => policyDocumentService.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["modules"] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => policyDocumentService.remove(uuid),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["modules"] }),
  });


  return {
    modules: modulesQuery.data?.data ?? [],
    total: modulesQuery.data?.metadata?.info?.total ?? 0,
    isLoading: modulesQuery.isLoading,

    createPolicyDocument: createMutation.mutateAsync,
    updatePolicyDocument: updateMutation.mutateAsync,
    deletePolicyDocument: deleteMutation.mutateAsync
  };
};