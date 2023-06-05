<template>
  <form @submit.prevent="signIn" v-if="!authStore.isAuthenticated">
    <input type="email" class="input input-bordered" v-model="email" placeholder="Email" />
    <input type="password" class="input input-bordered" v-model="password" placeholder="Password" />
    <button type="submit" class="btn btn-sm">Sign In</button>
  </form>
  <div v-else>
    <button class="btn btn-sm" @click="authStore.signOut">Sign Out</button>
    <p>Logged in as {{ authStore.user.email }}</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

    const router = useRouter()

    const authStore = useAuthStore()
    const email = ref('')
    const password = ref('')

    const signIn = async () => {
      await authStore.signInWithEmailAndPassword(email.value, password.value)
      router.push('/')
      // Redirect or perform other actions after successful sign-in
    }
</script>
