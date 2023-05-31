import { create } from "zustand";

export const useLoginStore = create((set) => ({
  isLoggedIn: false,
  setLogin: () => set({ isLoggedIn: true }),
  setLogout: () => set({ isLoggedIn: false }),
}));
