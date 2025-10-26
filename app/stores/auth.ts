import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', () =>{
    const auth = {
        user: null as User | null,
        isAuthenticated: false,
    }

    return {
        auth
    }
})

interface User {
  id: number
  email: string
  name: string
}