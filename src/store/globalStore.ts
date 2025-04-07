import { create } from 'zustand'

interface store {
    isLogin: boolean
}

export const useGlobalStore = create<store>((set, get) => ({
  isLogin: false,
  getIsLoging: () => get().isLogin,
  userGetInSuccess: () => set({ isLogin: true }),
  userGetOut: () => set({ isLogin: false }),
}))
