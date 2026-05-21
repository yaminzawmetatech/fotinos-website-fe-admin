import apiClient from "@/lib/apiClient";

export const planService = {
  getAll: async ({ limit, offset }: { limit: number; offset: number }) => {
    const res = await apiClient.get("/plans", {
      params: { limit, offset },
    });
    return res.data;
  },

  create: async (data: FormData) => {
    const res = await apiClient.post("/plans", data);
    return res.data;
  },

  update: async (uuid: string, data: any) => {
    const res = await apiClient.put(`/plans/${uuid}`, data);
    return res.data;
  },

  remove: async (uuid: string) => {
    const res = await apiClient.delete(`/plans/${uuid}`);
    return res.data;
  },
};