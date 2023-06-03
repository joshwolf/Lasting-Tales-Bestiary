import { defineStore } from 'pinia'
import { auth } from '@/firebaseInit'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  actions: {
    async signInWithEmailAndPassword(email, password) {
      try {
        const { user } = await auth.signInWithEmailAndPassword(email, password)
        this.user = user
      } catch (error) {
        console.log(error)
        // Handle sign-in error
      }
    },
    async signOut() {
      try {
        await auth.signOut()
        this.user = null
      } catch (error) {
        // Handle sign-out error
      }
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user
  },
  persist: true
})
