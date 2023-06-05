<script setup>
import Creature from "./Creature.vue";
import { useCreatureStore } from "../stores/creatures";
import { useAuthStore } from '@/stores/auth'
import CreatureForm from "./CreatureForm.vue";
import { ref, computed } from "vue";

const creatureStore = useCreatureStore();
const authStore = useAuthStore();
const modalToggle = ref();
const creatureAdded = ref();
const creatureForm = ref();
const currentCreature = ref({});
const isEdit = ref(false);

const searchQuery = ref("");
const searchTypes = ref([]);
const searchEnvironments = ref([]);
const searchClasses = ref([]);
const searchFamilies = ref([]);
const allCreatures = ref(true);

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
  if (e.key === "Escape" && currentCreature.value.name == "") {
    modalToggle.value.checked = false;
  }
};

function createCreature() {
  currentCreature.value = {
      name: "",
      class: "",
      isElite: false,
      family: "",
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
      levels: [{level:'',models:''}],
      xp: 1,
      preferredEnvironments: [],
      specials: [''],
      attacks: [],
    };
  isEdit.value = false;
  modalToggle.value.checked = true;
}

function updateCreature(creature) {
  currentCreature.value = creature;
  isEdit.value = true;
  modalToggle.value.checked = true;
}

const displayCreatures = computed(() => (allCreatures.value == true ? filteredCreatures.value : creatureStore.selectedCreatures));

const filteredCreatures = computed(() => {
  return creatureStore.creatures.filter((creature) => {
    return (
      (searchQuery.value == '' || 
        creature.name.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
      (searchTypes.value.length == 0 ||
        searchTypes.value.some((type) => creature.types.includes(type))) &&
      (searchEnvironments.value.length == 0 ||
        searchEnvironments.value.some((env) =>
          creature.preferredEnvironments.includes(env)
        )) &&
      (searchClasses.value.length == 0 ||
        searchClasses.value.some((cls) => creature.class == cls)) &&
      (searchFamilies.value.length == 0 ||
        searchFamilies.value.some((fam) => creature.family == fam))
    )
  }).sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
});

function resetSearch() {
  searchQuery.value = "";
  searchTypes.value = [];
  searchEnvironments.value = [];
}

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
  <div v-if="authStore.isAuthenticated" for="newCreature" @click="createCreature" class="btn my-5">+ Creature</div>
  <div class="form-control flex place-items-end">
    <label class="label cursor-pointer flex gap-1">
      <span class="label-text">Selected</span> 
      <input type="checkbox" class="toggle" v-model="allCreatures" />
      <span class="label-text">All</span> 
    </label>
  </div>
  <div class="lg:flex align-middle gap-3 place-items-center" v-if="allCreatures">
    <input type="text" class="rounded w-60 px-2 form-input my-2 lg:my-5 text-black border-2" placeholder="Search" v-model="searchQuery" />
    <div class="flex basis-2/3 flex-wrap gap-1">
      <span class="flex flex-wrap  gap-1">
        <label class="swap" v-for="creatureClass in ['Minion','Elite']">
          <input type="checkbox" v-model="searchClasses" :value="creatureClass"/>
          <div class="swap-on"><div class="badge badge-neutral">{{ creatureClass }}</div></div>
          <div class="swap-off"><div class="badge badge-info">{{ creatureClass }}</div></div>
        </label>
      </span>
      <span class="flex flex-wrap  gap-1">
        <label class="swap" v-for="creatureFamily in creatureStore.allFamilies">
          <input type="checkbox" v-model="searchFamilies" :value="creatureFamily"/>
          <div class="swap-on"><div class="badge badge-neutral">{{ creatureFamily }}</div></div>
          <div class="swap-off"><div class="badge badge-warning">{{ creatureFamily }}</div></div>
        </label>
      </span>
      <span class="flex flex-wrap  gap-1">
        <label class="swap" v-for="creatureEnvironment in creatureStore.allEnvironments">
          <input type="checkbox" v-model="searchEnvironments" :value="creatureEnvironment"/>
          <div class="swap-on"><div class="badge badge-neutral">{{ creatureEnvironment }}</div></div>
          <div class="swap-off"><div class="badge badge-accent">{{ creatureEnvironment }}</div></div>
        </label>
      </span>
      <span class="flex flex-wrap gap-1">
        <label class="swap" v-for="creatureType in creatureStore.allTypes">
          <input type="checkbox" v-model="searchTypes" :value="creatureType"/>
          <div class="swap-on"><div class="badge badge-neutral">{{ creatureType }}</div></div>
          <div class="swap-off"><div class="badge badge-primary">{{ creatureType }}</div></div>
        </label>
      </span>
    </div>
    <div class="btn btn-error btn-xs my-2" @click="resetSearch">Reset</div>
  </div>
  <input type="checkbox" id="newCreature" class="modal-toggle" ref="modalToggle" />
  <div class="modal cursor-pointer">
    <div class="modal-box relative bg-slate-800 text-white max-w-xl">
      <label for="newCreature" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <CreatureForm @creature-added="closeForm" ref="creatureForm" :is-edit="isEdit" :creature="currentCreature"></CreatureForm>
    </div>
  </div>
  <div v-if="filteredCreatures.length == 0" class="text-center rounded-xl bg-black p-5 text-2xl text-white">No Creatures Found</div>
  <div class="grid grid-cols-1 lg:grid-cols-2 w-full gap-3 mt-3">
    <Creature class="mb-5" v-for="creature in displayCreatures" :key="creature.id" :creature="creature" @update-creature="updateCreature"></Creature>
  </div>
  <div class="creatureAdded toast toast-top toast-start" ref="creatureAdded">
    <div class="alert alert-success">
      <span>Creature Saved!</span>
    </div>
  </div>
</template>
