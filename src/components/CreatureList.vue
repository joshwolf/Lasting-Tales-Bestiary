<script setup>
import { ref, computed } from "vue";
import Creature from "./Creature.vue";
import { useCreatureStore } from "../stores/creatures";
import Multiselect from '@vueform/multiselect'

const creatureStore = useCreatureStore();
const allTypes = creatureStore.creatures.map((creature) => creature.types).flat();
const uniqueTypes = [...new Set(allTypes)];
const creature = ref({
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
  specials: [],
  attacks: [],
});

function addCreature() {
  const data = {
    name: creature.value.name,
    class: creature.value.isElite ? "Elite" : "Minion",
    types: creature.value.types,
    hp: creature.value.hp,
    melee: creature.value.melee,
    ranged: creature.value.ranged,
    strength: creature.value.strength,
    agility: creature.value.agility,
    defense: creature.value.defense,
    intelligence: creature.value.intelligence,
    willpower: creature.value.willpower,
    attackType: creature.value.isRanged ? "Ranged" : "Melee",
    resistance: creature.value.resistance,
    armorDice: creature.value.armorDice,
    strikes: creature.value.strikes,
    levels: creature.value.levels,
    xp: creature.value.xp,
    preferredEnvironments: creature.value.preferredEnvironments,
    specials: creature.value.specials,
    attacks: creature.value.attacks,
  };

  // Add the creature to Firestore.
  console.log(data)
  //firestore.collection("creatures").add(data);

  // Clear the form.
  creature.value = {
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
    specials: [],
    attacks: [],
  };
}

creature.class = computed(() => {
  return creature.value.isElite ? "Elite" : "Minion";
});
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>
input {
  color: black;
  padding-left: .5rem;
}
.form-group {
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>

<template>
  {{ foo }}
  <label for="newCreature" class="btn my-5">+ Creature</label>
  <input type="checkbox" id="newCreature" class="modal-toggle" />
  <div class="modal cursor-pointer">
    <div class="modal-box relative bg-slate-800 text-white">
      <label for="newCreature" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <h1>Add New Creature</h1>
      <form @submit.prevent="addCreature">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" class="form-control" v-model="creature.name">
        </div>
        <div class="form-group">
          <label for="isElite">Class:</label>
          <label class="label cursor-pointer justify-normal">
            <span class="text-white flex-grow-0">Minion</span> 
            <input type="checkbox" id="isElite" v-model="creature.isElite" class="toggle mx-4" />
            <span class="text-white">Elite</span> 
          </label>
        </div>
        <div class="form-group">
          <label for="types">Type:</label>
          <Multiselect class="text-black" v-model="creature.types" :options="uniqueTypes" mode="tags" :taggable="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Select A Type" :allow-empty="false" :createOption="true" :searchable="true" @select="event.PreventDefault()"/>
        </div>
        <div class="form-group">
          <label for="hp">HP</label>
          <input type="number" id="hp" class="form-control" v-model="creature.hp">
        </div>
        <div class="form-group">
          <label for="melee">Melee</label>
          <input type="number" id="melee" class="form-control" v-model="creature.melee">
        </div>
        <div class="form-group">
          <label for="ranged">Ranged</label>
          <input type="number" id="ranged" class="form-control" v-model="creature.ranged">
        </div>
        <div class="form-group">
          <label for="strength">Strength</label>
          <input type="number" id="strength" class="form-control" v-model="creature.strength">
        </div>
        <div class="form-group">
          <label for="agility">Agility</label>
          <input type="number" id="agility" class="form-control" v-model="creature.agility">
        </div>
        <div class="form-group">
          <label for="defense">Defense</label>
          <input type="number" id="defense" class="form-control" v-model="creature.defense">
        </div>
        <div class="form-group">
          <label for="intelligence">Intelligence</label>
          <input type="number" id="intelligence" class="form-control" v-model="creature.intelligence">
        </div>
        <div class="form-group">
          <label for="willpower">Willpower</label>
          <input type="number" id="willpower" class="form-control" v-model="creature.willpower">
        </div>
        <div class="form-group">
          <label for="isRanged">Attack Type:</label>
          <label class="label cursor-pointer justify-normal">
            <span class="text-white flex-grow-0">Melee</span> 
            <input type="checkbox" id="isRanged" v-model="creature.isRanged" class="toggle mx-4" />
            <span class="text-white">Ranged</span> 
          </label>
        </div>
        <div class="form-group">
          <label for="resistance">Resistance</label>
          <input type="number" id="resistance" class="form-control" v-model="creature.resistance">
        </div>
        <div class="form-group">
          <label for="armorDice">Armor Dice</label>
          <input type="number" id="armorDice" class="form-control" v-model="creature.armorDice">
        </div>
        <div class="form-group">
          <label for="strikes">Strikes</label>
          <input type="number" id="strikes" class="form-control" v-model="creature.strikes">
        </div>
        <div class="form-group">
          <label for="levels">Levels</label>
          <input type="text" id="levels" class="form-control" v-model="creature.levels">
        </div>
        <div class="form-group">
          <label for="xp">XP</label>
          <input type="number" id="xp" class="form-control" v-model="creature.xp">
        </div>
        <div class="form-group">
          <label for="preferredEnvironments">Preferred Environments</label>
          <input type="text" id="preferredEnvironments" class="form-control" v-model="creature.preferredEnvironments">
        </div>
        <div class="form-group">
          <label for="specials">Specials</label>
          <input type="text" id="specials" class="form-control" v-model="creature.specials">
        </div>
        <div class="form-group">
          <label for="attacks">Attacks</label>
          <input type="text" id="attacks" class="form-control" v-model="creature.attacks">
        </div>
        <button type="submit" class="btn btn-primary btn-sm mt-3">Add Creature</button>
      </form>
    </div>
  </div>
  <Creature v-for="creature in creatureStore.creatures" :key="creature.id" :creature="creature"></Creature>
</template>
