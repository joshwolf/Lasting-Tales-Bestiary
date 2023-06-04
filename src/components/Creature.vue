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
      <div class="flex">
        <p class="card-title flex-grow-0 text-5xl font-extrabold">{{ creature.name }}</p>
        <p class="self-end flex-grow">({{ creature.class }} {{ creature.family }})</p>
        <div class="self-start mask mask-heart bg-red-600 h-12 w-12 grid place-items-center text-white font-extrabold">
          {{ creature.hp }}
        </div>
      </div>
      <p>{{ creature.types.join(', ') }}</p>
      <div class="stats w-full">
        <div class="stat">
          <div class="stat-title">MEL</div>
          <div class="stat-value">{{ creature.melee }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">RNG</div>
          <div class="stat-value">{{ creature.ranged }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">STR</div>
          <div class="stat-value">{{ creature.strength }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">AGI</div>
          <div class="stat-value">{{ creature.agility }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">DEF</div>
          <div class="stat-value">{{ creature.defense }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">INT</div>
          <div class="stat-value">{{ creature.intelligence }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">WIL</div>
          <div class="stat-value">{{ creature.willpower }}</div>
        </div>
      </div>
      <div class="stats">
        <div class="stat">
          <div class="stat-title">Attack Type</div>
          <div class="stat-value">{{ creature.attackType }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Resistance</div>
          <div class="stat-value">{{ creature.resistance }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Armor Dice</div>
          <div class="stat-value">{{ creature.armorDice }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">Strikes</div>
          <div class="stat-value">{{ creature.strikes }}</div>
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
          <p v-for="special in creature.specials">{{ special }}</p>
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
        <div class="text-center special flex-grow basis-1/2 p-1"><b>{{ attackSpecialPrefix(attack.special) }}</b> {{ attackSpecialInfo(attack.special) }}</div>
      </div>
      <div v-for="attack in creature.attacks.filter((attack) => attack.type == 'Melee')" class="attack flex flex-wrap items-stretch bg-white border-gray-600 border-2 border-b rounded-lg">
        <div class="text-center basis-full border-b border-gray-600 text-white font-bold bg-gray-600">{{ attack.type }} Attack: {{ attack.name }}</div>
        <div class="text-center flex-grow-none basis-2/5 font-bold border-b border-r border-gray-600 bg-gray-300">Damage</div>
        <div class="text-center flex-grow basis-2/5 font-bold border-b border-gray-600 bg-gray-300">Special</div>
        <div class="text-center damage flex-grow-none basis-2/5 border-r border-gray-600 flex"><p class="self-center">{{ attack.damage }}</p></div>
        <div class="text-center special flex-grow basis-2/5 p-1"><b>{{ attackSpecialPrefix(attack.special) }}</b> {{ attackSpecialInfo(attack.special) }}</div>
      </div>
      <div v-if="authStore.isAuthenticated" class="btn btn-sm w-12" @click="emit('update-creature', Object.assign({}, creature))">Edit</div>
      <div v-if="authStore.isAuthenticated" class="btn btn-xs w-12" @click="deleteCreature(creature)">Delete</div>
    </div>
  </div>
</template>