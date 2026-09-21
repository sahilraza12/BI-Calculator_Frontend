import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFormStore = create(
  persist(
    (set) => ({
      step: 1,
      formData: {},

      nextStep: () =>
        set((state) => ({ step: state.step + 1 })),

      prevStep: () =>
        set((state) => ({ step: state.step - 1 })),

      saveData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      resetForm: () =>
        set({ step: 1, formData: {} }),
    }),
    {
      name: "bi-rating-form",
      version: 1,
      migrate: () => ({ step: 1, formData: {} }),
      storage: {
        getItem: (name) =>
          JSON.parse(sessionStorage.getItem(name)),
        setItem: (name, value) =>
          sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) =>
          sessionStorage.removeItem(name),
      },
    }
  )
);