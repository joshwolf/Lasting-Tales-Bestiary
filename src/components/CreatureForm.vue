<script setup>
import { ref, computed } from "vue";
import Multiselect from '@vueform/multiselect'
import { useCreatureStore } from "../stores/creatures";

const creatureStore = useCreatureStore();
const emit = defineEmits(['creatureAdded']);
const uniqueEnvironments = ['Dungeon', 'Settlement', 'Wilderness', 'Any'];
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
  specials: [''],
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
  creatureStore.addCreature(data);
  emit("creatureAdded");

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

function addLevel() {
  creature.value.levels.push({level:'',models:''});
}

function removeLevel(index) {
  creature.value.levels.splice(index, 1);
}

function addSpecial() {
  creature.value.specials.push('');
}

function removeSpecial(index) {
  creature.value.specials.splice(index, 1);
}

function addMelee() {
  creature.value.attacks.push({type:'Melee',name:'',damage:'',special:''});
}

function addRanged() {
  creature.value.attacks.push({type:'Ranged',name:'',damage:'',special:''});
}

function removeAttack(index) {
  creature.value.attacks.splice(index, 1);
}

creature.class = computed(() => {
  return creature.value.isElite ? "Elite" : "Minion";
});
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>
input, textarea {
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
.form-group label {
  text-align: right;
  margin-right: 1rem;
}
</style>
<template>
  <p class="text-xl font-bold">Add New Creature</p>
  <form @submit.prevent="addCreature" class="grid grid-flow-row">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" id="name" class="form-control" required v-model="creature.name">
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
      <Multiselect class="text-black" v-model="creature.types" :options="creatureStore.allTypes" mode="tags" :taggable="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Select A Type" :allow-empty="false" :createOption="true" :searchable="true" />
    </div>
    <div class="form-group">
      <label for="hp">HP</label>
      <input type="number" id="hp" class="form-control" v-model="creature.hp">
    </div>
    <div class="form-group">
      <label for="melee">Melee:</label>
      <input type="number" id="melee" class="form-control" v-model="creature.melee">
    </div>
    <div class="form-group">
      <label for="ranged">Ranged:</label>
      <input type="number" id="ranged" class="form-control" v-model="creature.ranged">
    </div>
    <div class="form-group">
      <label for="strength">Strength:</label>
      <input type="number" id="strength" class="form-control" v-model="creature.strength">
    </div>
    <div class="form-group">
      <label for="agility">Agility:</label>
      <input type="number" id="agility" class="form-control" v-model="creature.agility">
    </div>
    <div class="form-group">
      <label for="defense">Defense:</label>
      <input type="number" id="defense" class="form-control" v-model="creature.defense">
    </div>
    <div class="form-group">
      <label for="intelligence">Intelligence:</label>
      <input type="number" id="intelligence" class="form-control" v-model="creature.intelligence">
    </div>
    <div class="form-group">
      <label for="willpower">Willpower:</label>
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
      <label for="resistance">Resistance:</label>
      <input type="number" id="resistance" class="form-control" v-model="creature.resistance">
    </div>
    <div class="form-group">
      <label for="armorDice">Armor Dice:</label>
      <input type="number" id="armorDice" class="form-control" v-model="creature.armorDice">
    </div>
    <div class="form-group">
      <label for="strikes">Strikes:</label>
      <input type="number" id="strikes" class="form-control" v-model="creature.strikes">
    </div>
    <div class="form-group">
      <label for="levels">Levels:</label>
      <div id="levels">
        <div v-for="(level, index) in creature.levels" class="rounded-lg bg-slate-400 flex flex-wrap m-1">
          <div class="flex flex-wrap basis-10/12 p-1 gap-y-3">
            <label class="basis-1/4 text-black" for="level">Level:</label>
            <input class="form-control -ml-0.5" type="number" v-model="level.level">
            <label class="basis-1/4 text-black" for="models">Models:</label>
            <input class="form-control -ml-0.5" type="number" v-model="level.models">
          </div>
          <div class="btn btn-sm btn-error place-self-center" @click="removeLevel(index)">-</div>
        </div>
      </div>
      <div></div>
      <div class="btn btn-sm" @click="addLevel">+ Level</div>
    </div>
    <div class="form-group">
      <label for="xp">XP:</label>
      <input type="number" id="xp" class="form-control" v-model="creature.xp">
    </div>
    <div class="form-group">
      <label for="preferredEnvironments">Preferred Environments:</label>
      <Multiselect class="text-black" v-model="creature.preferredEnvironments" :options="uniqueEnvironments" mode="tags" :close-on-select="false" :clear-on-select="false" placeholder="Select An Environment" :allow-empty="false" />
    </div>
    <div class="form-group">
      <label for="specials">Specials:</label>
      <div id="specials">
        <div v-for="(special, index) in creature.specials" class="rounded-lg bg-slate-400 flex flex-wrap m-1">
          <div class="flex flex-wrap basis-10/12 p-1 gap-y-3">
            <textarea class="textarea" v-model="creature.specials[index]"></textarea>
          </div>
          <div class="btn btn-sm btn-error place-self-center" @click="removeSpecial(index)">-</div>
        </div>
      </div>
      <div></div>
      <div class="btn btn-sm" @click="addSpecial">+ Special</div>
    </div>
    <div class="form-group">
      <label for="attacks">Attacks:</label>
      <div id="attacks">
        <div v-for="(attack, index) in creature.attacks" class="rounded-lg bg-slate-400 flex flex-wrap m-1">
          <div class="flex flex-wrap basis-10/12 p-1 gap-y-3" v-if="attack.type == 'Melee'">
              <label class="basis-1/4 text-black">Name:</label>
              <input class="form-control -ml-0.5" type="text" v-model="attack.name">
              <label class="basis-1/4 text-black">Damage:</label>
              <input class="form-control -ml-0.5" type="text" v-model="attack.damage">
              <label class="basis-1/4 text-black">Special:</label>
              <input class="form-control -ml-0.5" type="text" v-model="attack.special">
          </div>
          <div class="btn btn-sm btn-error place-self-center" @click="removeAttack(index)">-</div>
        </div>
      </div>
      <div></div>
      <div class="grid grid-cols-2">
        <div class="btn btn-sm mr-1" @click="addMelee">+ Melee</div>
        <div class="btn btn-sm" @click="addRanged">+ Ranged</div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary btn-sm mt-3">Add Creature</button>
  </form>
</template>
