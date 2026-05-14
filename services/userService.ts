import apiClient from "@/lib/apiClient";

export const userService = {
  getAll: async () => {
    const res = await apiClient.get("/admins");
    return res.data;
  },

  create: async (data: any) => {
    const res = await apiClient.post("/admins", data);
    return res.data;
  },

  update: async (id: string, data: any) => {
    const res = await apiClient.put(`/admins/${id}`, data);
    return res.data;
  },

  remove: async (id: string) => {
    const res = await apiClient.delete(`/admins/${id}`);
    return res.data;
  },
};