import apiClient from "@/lib/apiClient";

export const contactUsService = {
  getAll: async ({ limit, offset }: { limit: number; offset: number }) => {
    const res = await apiClient.get("/contact-us", {
      params: { limit, offset },
    });
    return res.data;
  },

  create: async (data: FormData) => {
    const res = await apiClient.post("/contact-us", data);
    return res.data;
  },

  update: async (uuid: string, data: any) => {
    const res = await apiClient.put(`/contact-us/${uuid}`, data);
    return res.data;
  },

  remove: async (uuid: string) => {
    const res = await apiClient.delete(`/contact-us/${uuid}`);
    return res.data;
  },
};