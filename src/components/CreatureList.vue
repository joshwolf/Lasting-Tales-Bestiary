<script setup>
import Creature from "./Creature.vue";
import { useCreatureStore } from "../stores/creatures";

const creatureStore = useCreatureStore();

</script>

<template>
  <main>
    <Creature v-for="creature in creatureStore.creatures" :key="creature.id" :creature="creature"></Creature>
  </main>
</template>
