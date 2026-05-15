import apiClient from "@/lib/apiClient";

export const ourServiceService = {
  getAll: async ({ limit, offset }: { limit: number; offset: number }) => {
    const res = await apiClient.get("/services", {
      params: { limit, offset },
    });
    return res.data;
  },

  create: async (data: FormData) => {
    const res = await apiClient.post("/services", data);
    return res.data;
  },

  update: async (uuid: string, data: any) => {
    const res = await apiClient.post(`/services/${uuid}`, data);
    return res.data;
  },

  remove: async (uuid: string) => {
    const res = await apiClient.delete(`/services/${uuid}`);
    return res.data;
  },
};