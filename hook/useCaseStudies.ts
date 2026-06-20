

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { caseStudyService } from "@/services/caseStudyService";

export const useCaseStudies = (limit = 10, offset = 0) => {
  const queryClient = useQueryClient();

  const caseStudiesQuery = useQuery({
    queryKey: ["caseStudies", limit, offset],
    queryFn: () => caseStudyService.getAll({ limit, offset }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });


  // CREATE
  const createMutation = useMutation({
    mutationFn: (data: any) => caseStudyService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["caseStudies"] }),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }: any) => caseStudyService.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["caseStudies"] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => caseStudyService.remove(uuid),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["caseStudies"] }),
  });
  
  return {
    caseStudies: caseStudiesQuery.data?.data ?? [],
    total: caseStudiesQuery.data?.metadata?.info?.total ?? 0,
    isLoading: caseStudiesQuery.isLoading,
  
    createCaseStudy: createMutation.mutateAsync,
    updateCaseStudy: updateMutation.mutateAsync,
    deleteCaseStudy: deleteMutation.mutateAsync,
  };
};