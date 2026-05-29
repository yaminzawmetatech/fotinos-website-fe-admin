

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";

export const useUsers = (limit = 10, offset = 0) => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ["users", limit, offset],
    queryFn: () => userService.getAll({ limit, offset }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });


  // CREATE
  const createMutation = useMutation({
    mutationFn: (data: any) => userService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }: any) => userService.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => userService.remove(uuid),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["users"] }),
  });
  
  return {
    users: usersQuery.data?.data ?? [],
    total: usersQuery.data?.metadata?.info?.total ?? 0,
    isLoading: usersQuery.isLoading,
  
    createUser: createMutation.mutateAsync,
    updateUser: updateMutation.mutateAsync,
    deleteUser: deleteMutation.mutateAsync,
  };
};