<script setup>
import { defineProps, onMounted } from 'vue';
const props = defineProps({
  creature: {
    type: Object,
    default: {}
  }
})

const emit = defineEmits(['update-creature'])

function attackSpecialPrefix(special) {
  const specialArray = special.split(':')
  if (specialArray.length === 1) return
  return specialArray[0] + ':'
}

function attackSpecialInfo(special) {
  if(!special) return '-'
  const specialArray = special.split(':')
  if (specialArray.length === 1) return
  return specialArray[1]
}
</script>

<template>
  <div class="card w-auto bg-slate-200 shadow-xl">
    <div class="card-body">
      <div class="flex">
        <p class="card-title flex-grow-0 text-5xl font-extrabold">{{ creature.name }}</p>
        <p class="self-end flex-grow">({{ creature.class }})</p>
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
      <div v-for="attack in creature.attacks" class="attack flex flex-wrap items-stretch bg-white border-gray-600 border-2 border-b rounded-lg">
        <div class="text-center basis-full border-b border-gray-600 text-white font-bold bg-gray-600">{{ attack.type }} Attack: {{ attack.name }}</div>
        <div class="text-center flex-grow-none basis-2/5 font-bold border-b border-r border-gray-600 bg-gray-300">Damage</div>
        <div class="text-center flex-grow basis-2/5 font-bold border-b border-gray-600 bg-gray-300">Special</div>
        <div class="text-center damage flex-grow-none basis-2/5 border-r border-gray-600 flex"><p class="self-center">{{ attack.damage }}</p></div>
        <div class="text-center special flex-grow basis-2/5 p-1"><b>{{ attackSpecialPrefix(attack.special) }}</b> {{ attackSpecialInfo(attack.special) }}</div>
      </div>
      <div class="btn btn-sm w-10" @click="emit('update-creature', creature)">Edit</div>
    </div>
  </div>
</template>