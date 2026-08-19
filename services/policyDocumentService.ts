import apiClient from "@/lib/apiClient";

export const policyDocumentService = {
  getAll: async ({ limit, offset }: { limit: number; offset: number }) => {
    const res = await apiClient.get("/policy-documents", {
      params: { limit, offset },
    });
    return res.data;
  },

  create: async (data: FormData) => {
    const res = await apiClient.post("/policy-documents", data);
    return res.data;
  },

  update: async (uuid: string, data: any) => {
    const res = await apiClient.put(`/policy-documents/${uuid}`, data);
    return res.data;
  },

  remove: async (uuid: string) => {
    const res = await apiClient.delete(`/policy-documents/${uuid}`);
    return res.data;
  },
};