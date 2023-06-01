<script setup>
import Creature from "./Creature.vue";
import { useCreatureStore } from "../stores/creatures";
import CreatureForm from "./CreatureForm.vue";
import { ref, computed } from "vue";

const creatureStore = useCreatureStore();
const modalToggle = ref();
const creatureAdded = ref();
const creatureForm = ref();
const currentCreature = ref({});

function closeForm() {
  modalToggle.value.checked = false;
  //add the class to the toast
  creatureAdded.value.classList.add("active");
  setTimeout(() => {
    //remove the class from the toast
    creatureAdded.value.classList.remove("active");
  }, 2000);
}

onkeydown = (e) => {
  if (e.key === "Escape") {
    modalToggle.value.checked = false;
  }
};
function createCreature() {
  currentCreature.value = {
      name: "",
      class: "",
      isElite: false,
      types: [],
      hp: 1,
      melee: 0,
      ranged: 0,
      strength: 1,
      agility: 1,
      defense: 1,
      intelligence: 1,
      willpower: 1,
      isRanged: false,
      attackType: "Melee",
      resistance: 0,
      armorDice: 0,
      strikes: 1,
      levels: [],
      xp: 1,
      preferredEnvironments: [],
      specials: [''],
      attacks: [],
    };
  console.log(currentCreature)
  modalToggle.value.checked = true;
}

function updateCreature(creature) {
  currentCreature.value = creature;
  modalToggle.value.checked = true;
}

const sortedCreatures = computed(() => {
  return creatureStore.creatures.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
});
</script>

<style scoped>
.creatureAdded {
  transition: all 0.3s ease-in-out;
  transform: translateX(-100%);
}

.creatureAdded.active {
  transform: translateX(0);
}
</style>

<template>
  <div for="newCreature" @click="createCreature" class="btn my-5">+ Creature</div>
  <input type="checkbox" id="newCreature" class="modal-toggle" ref="modalToggle" />
  <div class="modal cursor-pointer">
    <div class="modal-box relative bg-slate-800 text-white max-w-xl">
      <label for="newCreature" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <CreatureForm @creature-added="closeForm" ref="creatureForm" :creature="currentCreature"></CreatureForm>
    </div>
  </div>
  <Creature class="mb-5" v-for="creature in sortedCreatures" :key="creature.id" :creature="creature" @update-creature="updateCreature"></Creature>
  <div class="creatureAdded toast toast-top toast-start" ref="creatureAdded">
    <div class="alert alert-success">
      <span>Creature Saved!</span>
    </div>
  </div>
</template>
