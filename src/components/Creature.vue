<script setup>
import { defineProps, ref } from 'vue';
import { useCreatureStore } from '@/stores/creatures';
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  creature: {
    type: Object,
    default: {}
  }
})

const creatureStore = useCreatureStore();
const authStore = useAuthStore();

const emit = defineEmits(['update-creature'])
const creatureSelected = ref(false)

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
    creatureStore.selectedCreatures.push(creature)
  }
}

function deleteCreature(creature) {
  if(confirm('Are you sure you want to delete this ' + creature.name + '?'))
    creatureStore.delete(creature)
 }
</script>

<template>
  <div class="card bg-slate-200 shadow-xl text-[var(--vt-c-indigo)]">
    <div class="card-body">
      <div><input type="checkbox" class="checkbox checkbox-info border-2" v-model="creatureSelected" @change="toggleCreature(creature)"></div>
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
          <div class="">MEL</div>
          <div class="">RNG</div>
          <div class="">STR</div>
          <div class="">AGI</div>
          <div class="">DEF</div>
          <div class="">INT</div>
          <div class="">WIL</div>
        </div>
        <div class="grid grid-cols-7 bg-white text-center rounded-lg">
          <div class="border font-extrabold">{{ creature.melee }}</div>
          <div class="border font-extrabold">{{ creature.ranged }}</div>
          <div class="border font-extrabold">{{ creature.strength }}</div>
          <div class="border font-extrabold">{{ creature.agility }}</div>          
          <div class="border font-extrabold">{{ creature.defense }}</div>
          <div class="border font-extrabold">{{ creature.intelligence }}</div>
          <div class="border font-extrabold">{{ creature.willpower }}</div>
        </div>
      </div>
      <div class="w-full rounded-lg border-2 border-gray-600">
        <div class="grid grid-cols-12 bg-gray-600 text-white text-center">
          <div class="col-span-4">Attack Type</div>
          <div class="col-span-3">Resistance</div>
          <div class="col-span-3">Armor Dice</div>
          <div class="col-span-2">Strikes</div>
        </div>
        <div class="grid grid-cols-12 bg-white text-center rounded-lg">
          <div class="col-span-4 border font-extrabold">{{ creature.attackType }}</div>
          <div class="col-span-3 border font-extrabold">{{ creature.resistance }}</div>
          <div class="col-span-3 border font-extrabold">{{ creature.armorDice }}</div>
          <div class="col-span-2 border font-extrabold">{{ creature.strikes }}</div>
        </div>
      </div>
      <div class="flex flex-wrap place-items-center bg-white border-gray-600 border-2 border-b rounded-lg">
        <div class="flex-grow-none basis-1/5 px-2 font-extrabold bg-gray-600 h-12 flex place-items-center">
          <p class="text-white font-extrabold">Level</p>
        </div>
        <div class="flex-grow px-5 h-12 basis-2/5 items-center flex">
          <ul>
            <li v-for="level in creature.levels">
            {{ level.level }} ({{ level.models }} {{ $filters.pluralize(level.models, 'model') }})
            </li>
          </ul>
        </div>
        <div class="flex-grow-none basis-1/5 px-2 font-extrabold bg-gray-600 h-12 flex place-items-center">
          <p class="text-white font-extrabold">XP</p>
        </div>
        <div class="flex-grow-none basis-1/5 h-12 place-items-center place-content-center flex">{{ creature.xp }}</div>
        <div class="basis-full border-t border-gray-600 px-2">
          <b>Preferred Environment</b>: {{ creature.preferredEnvironments.join(' or ') }}
        </div>
        <div class="basis-full border-t border-gray-600 px-2">
          <p class="font-bold">Special:</p>
          <p v-for="special in creature.specials" class="text-sm">{{ special }}</p>
        </div>
      </div>
      <div v-for="attack in creature.attacks.filter((attack) => attack.type == 'Ranged')" class="attack flex flex-wrap items-stretch bg-white border-gray-600 border-2 border-b rounded-lg">
        <div class="text-center basis-full border-b border-gray-600 text-white font-bold bg-gray-600">{{ attack.type }} Attack: {{ attack.name }}</div>
        <div class="text-center flex-grow-none basis-1/6 font-bold border-b border-r border-gray-600 bg-gray-300">Short</div>
        <div class="text-center flex-grow-none basis-1/6 font-bold border-b border-r border-gray-600 bg-gray-300">Long</div>
        <div class="text-center flex-grow-none basis-1/6 font-bold border-b border-r border-gray-600 bg-gray-300">Damage</div>
        <div class="text-center flex-grow basis-1/2 font-bold border-b border-gray-600 bg-gray-300">Special</div>
        <div class="text-center damage flex-grow-none basis-1/6 border-r border-gray-600 flex"><p class="self-center">{{ attack.short }}</p></div>
        <div class="text-center damage flex-grow-none basis-1/6 border-r border-gray-600 flex"><p class="self-center">{{ attack.long || '-' }}</p></div>
        <div class="text-center damage flex-grow-none basis-1/6 border-r border-gray-600 flex"><p class="self-center">{{ attack.damage }}</p></div>
        <div class="text-center special flex-grow basis-1/2 p-1 text-sm"><b>{{ attackSpecialPrefix(attack.special) }}</b> {{ attackSpecialInfo(attack.special) }}</div>
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