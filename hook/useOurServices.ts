// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { ourServiceService } from "@/services/ourServiceService";

// export const useOurServices = () => {
//   const queryClient = useQueryClient();

//   // GET
//   const ourServicesQuery = useQuery({
//     queryKey: ["ourServices"],
//     queryFn: ourServiceService.getAll,
  
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//   });

//   // CREATE
//   const createMutation = useMutation({
//     mutationFn: ourServiceService.create,
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["ourServices"],
//         refetchType: "active", // only refetch if screen is active
//       });
//     }
//   });

//   // UPDATE
//   const updateMutation = useMutation({
//     mutationFn: ({ uuid, data }: any) =>
//     ourServiceService.update(uuid, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["ourServices"],
//         refetchType: "active", // only refetch if screen is active
//       });
//     }
//   });

//   // DELETE
//   const deleteMutation = useMutation({
//     mutationFn: ourServiceService.remove,
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["ourServices"],
//         refetchType: "active", // only refetch if screen is active
//       });
//     }
//   });

//   return {
//     ourServices: ourServicesQuery.data?.data || [],
//     isLoading: ourServicesQuery.isLoading,

//     createOurService: createMutation.mutate,
//     updateOurService: updateMutation.mutate,
//     deleteOurService: deleteMutation.mutate,
//   };
// };



// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { ourServiceService } from "@/services/ourServiceService";

// export const useOurServices = () => {
//   const queryClient = useQueryClient();

//   // =========================
//   // GET
//   // =========================
//   const ourServicesQuery = useQuery({
//     queryKey: ["ourServices"],
//     queryFn: ourServiceService.getAll,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//   });

//   // =========================
//   // CREATE
//   // =========================
//   const createMutation = useMutation({
//     mutationFn: async (data: any) => {
//       return await ourServiceService.create(data);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["ourServices"] });
//     },
//   });

//   // =========================
//   // UPDATE (UUID FIXED)
//   // =========================
//   const updateMutation = useMutation({
//     mutationFn: async ({ uuid, data }: any) => {
//       return await ourServiceService.update(uuid, data);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["ourServices"] });
//     },
//   });

//   // =========================
//   // DELETE
//   // =========================
//   const deleteMutation = useMutation({
//     mutationFn: async (uuid: string) => {
//       return await ourServiceService.remove(uuid);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["ourServices"] });
//     },
//   });

//   return {
//     // data
//     ourServices: ourServicesQuery.data?.data || [],
//     isLoading: ourServicesQuery.isLoading,

//     // actions (IMPORTANT: use mutateAsync for UI control)
//     createOurService: createMutation.mutateAsync,
//     updateOurService: updateMutation.mutateAsync,
//     deleteOurService: deleteMutation.mutateAsync,

//     // optional (for loading UI)
//     isCreating: createMutation.isPending,
//     isUpdating: updateMutation.isPending,
//     isDeleting: deleteMutation.isPending,
//   };
// };


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ourServiceService } from "@/services/ourServiceService";

export const useOurServices = (limit = 10, offset = 0) => {
  const queryClient = useQueryClient();

  const ourServicesQuery = useQuery({
    queryKey: ["ourServices", limit, offset],
    queryFn: () => ourServiceService.getAll({ limit, offset }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });


  // CREATE
  const createMutation = useMutation({
    mutationFn: (data: any) => ourServiceService.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["ourServices"] }),
  });

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ uuid, data }: any) => ourServiceService.update(uuid, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["ourServices"] }),
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (uuid: string) => ourServiceService.remove(uuid),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["ourServices"] }),
  });
  
  return {
    //ourServicesQuery,
    ourServices: ourServicesQuery.data?.data ?? [],
    total: ourServicesQuery.data?.metadata?.info?.total ?? 0,
    isLoading: ourServicesQuery.isLoading,
  
    createOurService: createMutation.mutateAsync,
    updateOurService: updateMutation.mutateAsync,
    deleteOurService: deleteMutation.mutateAsync,
  };
};