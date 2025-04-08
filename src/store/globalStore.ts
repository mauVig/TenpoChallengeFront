import { create } from 'zustand'

// Decidí usar zustand como manejo principal del store para solamente el login  

interface store {
    isLogin: boolean,
    userEmail: string,
    getIsLoging: () => boolean,
    userGetInSuccess: () => void,
    userGetOut: () => void,
    setUserEmail: (email: string) => void,
    getUserEmail: () => string,
    logOut: () => void,
}

export const useGlobalStore = create<store>((set, get) => ({
  isLogin: false,
  userEmail: '',
  getIsLoging: () => get().isLogin,
  userGetInSuccess: () => set({ isLogin: true }),
  userGetOut: () => set({ isLogin: false }),
  setUserEmail: (email) => set({ userEmail: email }),
  getUserEmail: () => get().userEmail,
  logOut: () => set({ isLogin: false, userEmail: '' }),
}))
