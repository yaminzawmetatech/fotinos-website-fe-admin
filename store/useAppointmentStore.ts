import { create } from "zustand";

type AppointmentState = {
  createModalOpen: boolean;
  editData: any;

  setCreateModalOpen: (value: boolean) => void;
  setEditData: (value: any) => void;

  reset: () => void;
};

export const useAppointmentStore = create<AppointmentState>((set) => ({
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