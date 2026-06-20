import { create } from "zustand";

type CaseStudyState = {
  createModalOpen: boolean;
  editData: any;

  setCreateModalOpen: (value: boolean) => void;
  setEditData: (value: any) => void;

  reset: () => void;
};

export const useCaseStudyStore = create<CaseStudyState>((set) => ({
  createModalOpen: false,
  editData: null,

  setCreateModalOpen: (value) => set({ createModalOpen: value }),
  setEditData: (value) => set({ editData: value }),

  reset: () =>
    set({
      createModalOpen: false,
      editData: null,
    }),
}));