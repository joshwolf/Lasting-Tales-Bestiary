<script setup>
import Creature from "./Creature.vue";
import { useCreatureStore } from "../stores/creatures";
import CreatureForm from "./CreatureForm.vue";

const creatureStore = useCreatureStore();
</script>

<template>
  <label for="newCreature" class="btn my-5">+ Creature</label>
  <input type="checkbox" id="newCreature" class="modal-toggle" />
  <div class="modal cursor-pointer">
    <div class="modal-box relative bg-slate-800 text-white max-w-xl">
      <label for="newCreature" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <CreatureForm></CreatureForm>
    </div>
  </div>
  <Creature class="mb-5" v-for="creature in creatureStore.creatures" :key="creature.id" :creature="creature"></Creature>
</template>
