import { create } from 'zustand'

interface store {
    isLogin: boolean
}



export const useGlobalStore = create<store>((set, get) => ({
  isLogin: false,
  
}))