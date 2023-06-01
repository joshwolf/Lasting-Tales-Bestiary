<script setup>
import Creature from "./Creature.vue";
import { useCreatureStore } from "../stores/creatures";
import CreatureForm from "./CreatureForm.vue";
import { ref } from "vue";

const creatureStore = useCreatureStore();
const modalToggle = ref();
const creatureAdded = ref();

function closeForm() {
  modalToggle.value.checked = false;
  //add the class to the toast
  creatureAdded.value.classList.add("active");
  setTimeout(() => {
    //remove the class from the toast
    creatureAdded.value.classList.remove("active");
  }, 2000);
}
</script>

<style scoped>
.creatureAdded {
  transition: all 0.3s ease-in-out;
  transform: translateX(100%);
}

.creatureAdded.active {
  transform: translateX(0);
}
</style>

<template>
  <label for="newCreature" class="btn my-5">+ Creature</label>
  <input type="checkbox" id="newCreature" class="modal-toggle" ref="modalToggle" />
  <div class="modal cursor-pointer">
    <div class="modal-box relative bg-slate-800 text-white max-w-xl">
      <label for="newCreature" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <CreatureForm @creature-added="closeForm"></CreatureForm>
    </div>
  </div>
  <Creature class="mb-5" v-for="creature in creatureStore.creatures" :key="creature.id" :creature="creature"></Creature>
  <div class="creatureAdded toast toast-top toast-end" ref="creatureAdded">
    <div class="alert alert-success">
      <span>Creature Added!</span>
    </div>
  </div>
</template>
