

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { appointmentService } from "@/services/appointmentService";

export const useAppointments = (limit = 10, offset = 0) => {
  const queryClient = useQueryClient();

  const modulesQuery = useQuery({
    queryKey: ["modules", limit, offset],
    queryFn: () => appointmentService.getAll({ limit, offset }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });


  // CREATE
  const createMutation = useMutation({
    mutationFn: (data: any) => appointmentService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["modules"] }),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }: any) => appointmentService.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["modules"] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => appointmentService.remove(uuid),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["modules"] }),
  });
  
  return {
    modules: modulesQuery.data?.data ?? [],
    total: modulesQuery.data?.metadata?.info?.total ?? 0,
    isLoading: modulesQuery.isLoading,
  
    createAppointment: createMutation.mutateAsync,
    updateAppointment: updateMutation.mutateAsync,
    deleteAppointment: deleteMutation.mutateAsync,
  };
};