<script setup>
import CreatureList from "../components/CreatureList.vue";
import Login from "../components/Login.vue";
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

</script>

<template>
  <div v-if="authStore.isAuthenticated">
    <button class="btn btn-sm" @click="authStore.signOut">Sign Out</button>
    <p>Logged in as {{ authStore.user.email }}</p>
  </div>
  <CreatureList></CreatureList>
</template>
