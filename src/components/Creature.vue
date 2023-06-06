<script setup>
import { defineProps, ref, computed } from 'vue';
import { useCreatureStore } from '@/stores/creatures';
import { useAuthStore } from '@/stores/auth'
import { analytics } from "../firebaseInit";

const props = defineProps({
  creature: {
    type: Object,
    default: {}
  }
})

const creatureStore = useCreatureStore();
const authStore = useAuthStore();

const emit = defineEmits(['update-creature'])
const creatureSelected = ref(creatureStore.selectedCreatures.some(c => c.name === props.creature.name))

function attackSpecialPrefix(special) {
  const specialArray = special.split(':')
  if (specialArray.length === 1) return
  return specialArray[0] + ':'
}

function attackSpecialInfo(special) {
  if(!special) return '-'
  const specialArray = special.split(':')
  if (specialArray.length === 1) return special
  return specialArray[1]
}

function toggleCreature(creature) {
  if(creatureStore.selectedCreatures.includes(creature)) {
    creatureStore.selectedCreatures = creatureStore.selectedCreatures.filter(c => c !== creature)
  } else {
    analytics.logEvent('select_creature', { name: creature.name })
    creatureStore.selectedCreatures.push(creature)
  }
}

function deleteCreature(creature) {
  if(confirm('Are you sure you want to delete this ' + creature.name + '?'))
    creatureStore.delet
    e(creature)
 }

 const isChecked = computed(() => {
   return creatureStore.selectedCreatures.some(c => c.name === props.creature.name)
 })

 const simpleSpecials = computed(() => {
   return props.creature.specials.filter(s => !s.includes(':'))
 })

 const complexSpecials = computed(() => {
   return props.creature.specials.filter(s => s.includes(':')).map(s => s.split(':'))
 })
 
</script>

<template>
  <div class="card bg-slate-200 shadow-xl text-[var(--vt-c-indigo)]">
    <div class="card-body">
      <div><input type="checkbox" class="checkbox checkbox-info border-2" :value="creature" :selected="isChecked" v-model="creatureSelected" @change="toggleCreature(creature)"></div>
      <div class="flex w-full">
        <div class="flex-grow">
          <p class="card-title text-3xl font-extrabold">{{ creature.name }}</p>
          <p class="self-end">({{ creature.class }} {{ creature.family }})</p>
        </div>
        <div class="self-start mask mask-heart bg-red-600 h-12 w-12 grid place-items-center text-white font-extrabold">
          {{ creature.hp }}
        </div>
      </div>
      <p class="flex-grow-0">{{ creature.types.join(', ') }}</p>
      <div class="w-full rounded-lg border-2 border-gray-600">
        <div class="grid grid-cols-7 bg-gray-600 text-white text-center">
          <div class="text-sm lg:text-base font-bold">MEL</div>
          <div class="text-sm lg:text-base font-bold">RNG</div>
          <div class="text-sm lg:text-base font-bold">STR</div>
          <div class="text-sm lg:text-base font-bold">AGI</div>
          <div class="text-sm lg:text-base font-bold">DEF</div>
          <div class="text-sm lg:text-base font-bold">INT</div>
          <div class="text-sm lg:text-base font-bold">WIL</div>
        </div>
        <div class="grid grid-cols-7 bg-white text-center rounded-lg">
          <div class="border">{{ creature.melee }}</div>
          <div class="border">{{ creature.ranged }}</div>
          <div class="border">{{ creature.strength }}</div>
          <div class="border">{{ creature.agility }}</div>          
          <div class="border">{{ creature.defense }}</div>
          <div class="border">{{ creature.intelligence }}</div>
          <div class="border">{{ creature.willpower }}</div>
        </div>
      </div>
      <div class="w-full rounded-lg border-2 border-gray-600">
        <div class="grid grid-cols-12 bg-gray-600 text-white text-center content-center items-center">
          <div class="col-span-4 text-xs lg:text-base">Attack Type</div>
          <div class="col-span-3 text-xs lg:text-base font-bold">Resistance</div>
          <div class="col-span-3 text-xs lg:text-base font-bold">Armor Dice</div>
          <div class="col-span-2 text-xs lg:text-base font-bold">Strikes</div>
        </div>
        <div class="grid grid-cols-12 bg-white text-center rounded-lg">
          <div class="col-span-4 border">{{ creature.attackType }}</div>
          <div class="col-span-3 border">{{ creature.resistance }}</div>
          <div class="col-span-3 border">{{ creature.armorDice }}</div>
          <div class="col-span-2 border">{{ creature.strikes }}</div>
        </div>
      </div>
      <div class="flex flex-wrap place-items-center bg-white border-gray-600 border-2 border-b rounded-lg">
        <div class="w-full grid grid-cols-12 text-center content-center items-center place-content-center">
          <div class="col-span-3 bg-gray-600 h-full text-white flex items-center"><p class="font-bold">Level</p></div>
          <div class="col-span-5">
            <ul>
              <li v-for="level in creature.levels" class="text-xs lg:text-sm">
                {{ level.level }} ({{ level.models }} {{ $filters.pluralize(level.models, 'model') }})
              </li>
            </ul>
          </div>
          <div class="col-span-2 bg-gray-600 h-full text-white flex items-center"><p class="font-bold">XP</p></div>
          <div class="col-span-2">{{ creature.xp }}</div>
        </div>
        <div class="w-full border-t border-b py-1 px-2 border-gray-600">
          <b>Preferred Environment</b>: {{ creature.preferredEnvironments.join(' or ') }}
        </div>
        <div class="w-full py-1 px-2 border-gray-600">
          <p class="font-bold">Special:</p>
          <p class="text-sm">{{ simpleSpecials.join(', ') }}</p>
          <div v-for="special in complexSpecials">
            <b>{{ special[0] }}: </b> {{ special[1] }}
          </div>
        </div>
      </div>
      <div v-for="attack in creature.attacks.filter((attack) => attack.type == 'Ranged')" class="attack flex flex-wrap items-stretch bg-white border-gray-600 border-2 border-b rounded-lg">
        <div class="text-center basis-full border-b border-gray-600 text-white font-bold bg-gray-600">{{ attack.type }} Attack: {{ attack.name }}</div>
        <div class="text-center flex-grow-none basis-1/3 lg:basis-1/6 font-bold">
          <div class="border-b border-r border-gray-600 basis-1/5 bg-gray-300 font-bold">Short</div>
          <div class="border-r border-gray-600 h-full self-center w-full">{{ attack.short }}</div>
        </div>
        <div class="text-center flex-grow-none basis-1/3 lg:basis-1/6 font-bold">
          <div class="border-b border-r border-gray-600 basis-1/5 bg-gray-300 font-bold">Long</div>
          <div class="border-r border-gray-600 h-full self-center w-full">{{ attack.long }}</div>
        </div>
        <div class="text-center flex-grow-none basis-1/3 lg:basis-1/6 font-bold">
          <div class="border-b lg:border-r border-gray-600 basis-1/5 bg-gray-300 font-bold">Damage</div>
          <div class="lg:border-r border-gray-600 h-full self-center w-full">{{ attack.damage }}</div>
        </div>
        <div class="text-center flex-gro basis-full border-t lg:border-t-0 border-gray-600 lg:basis-1/2 font-bold">
          <div class="border-b border-gray-600 basis-1/5 bg-gray-300 font-bold">Special</div>
          <div class="h-full self-center w-full p-1">{{ attack.special }}</div>
        </div>
      </div>
      <div v-for="attack in creature.attacks.filter((attack) => attack.type == 'Melee')" class="attack flex flex-wrap items-stretch bg-white border-gray-600 border-2 border-b rounded-lg">
        <div class="text-center basis-full border-b border-gray-600 text-white font-bold bg-gray-600">{{ attack.type }} Attack: {{ attack.name }}</div>
        <div class="text-center flex-grow-none basis-2/5 font-bold border-b border-r border-gray-600 bg-gray-300">Damage</div>
        <div class="text-center flex-grow basis-2/5 font-bold border-b border-gray-600 bg-gray-300">Special</div>
        <div class="text-center damage flex-grow-none basis-2/5 border-r border-gray-600 flex"><p class="self-center">{{ attack.damage }}</p></div>
        <div class="text-center special flex-grow basis-2/5 p-1 text-sm"><b>{{ attackSpecialPrefix(attack.special) }}</b> {{ attackSpecialInfo(attack.special) }}</div>
      </div>
      <div class="flex-grow"></div>
      <div v-if="authStore.isAuthenticated" class="btn btn-sm w-12 " @click="emit('update-creature', Object.assign({}, creature))">Edit</div>
      <div v-if="authStore.isAuthenticated" class="btn btn-xs w-12" @click="deleteCreature(creature)">Delete</div>
    </div>
  </div>
</template>