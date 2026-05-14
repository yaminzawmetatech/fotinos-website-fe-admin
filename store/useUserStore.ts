import { create } from "zustand";

type UserState = {
  createModalOpen: boolean;
  editData: any;

  setCreateModalOpen: (value: boolean) => void;
  setEditData: (value: any) => void;

  reset: () => void;
};

export const useUserStore = create<UserState>((set) => ({
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