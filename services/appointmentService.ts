import apiClient from "@/lib/apiClient";

export const appointmentService = {
  getAll: async ({ limit, offset }: { limit: number; offset: number }) => {
    const res = await apiClient.get("/appointments", {
      params: { limit, offset },
    });
    return res.data;
  },

  create: async (data: FormData) => {
    const res = await apiClient.post("/appointments", data);
    return res.data;
  },

  update: async (uuid: string, data: any) => {
    const res = await apiClient.put(`/appointments/${uuid}`, data);
    return res.data;
  },

  remove: async (uuid: string) => {
    const res = await apiClient.delete(`/appointments/${uuid}`);
    return res.data;
  },
};