import apiClient from "@/lib/apiClient";

export const moduleService = {
  getAll: async ({ limit, offset }: { limit: number; offset: number }) => {
    const res = await apiClient.get("/modules", {
      params: { limit, offset },
    });
    return res.data;
  },

  create: async (data: FormData) => {
    const res = await apiClient.post("/modules", data);
    return res.data;
  },

  update: async (uuid: string, data: any) => {
    const res = await apiClient.put(`/modules/${uuid}`, data);
    return res.data;
  },

  remove: async (uuid: string) => {
    const res = await apiClient.delete(`/modules/${uuid}`);
    return res.data;
  },
};