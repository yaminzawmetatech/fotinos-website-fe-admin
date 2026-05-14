import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";

export const useusers = () => {
  const queryClient = useQueryClient();

  // GET
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });

  // CREATE
  const createMutation = useMutation({
    mutationFn: userService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) =>
    userService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: userService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    users: usersQuery.data?.data || [],
    isLoading: usersQuery.isLoading,

    createUser: createMutation.mutate,
    updateUser: updateMutation.mutate,
    deleteUser: deleteMutation.mutate,
  };
};