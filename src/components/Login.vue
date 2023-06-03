<template>
  <form @submit.prevent="signIn" v-if="!user">
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
import { computed, ref } from 'vue'

    const authStore = useAuthStore()

    const user = ref(computed(() => authStore.user !== null))

    const email = ref('')
    const password = ref('')

    const signIn = async () => {
      await authStore.signInWithEmailAndPassword(email.value, password.value)
      // Redirect or perform other actions after successful sign-in
    }
</script>
