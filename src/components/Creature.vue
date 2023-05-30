<template>
  <div class="card w-auto bg-slate-200 shadow-xl">
    <div class="card-body">
      <p class="card-title">{{ creature.name }}</p>
      <p>({{ creature.class }})</p>
      <p>{{ creature.types.join(', ') }}</p>
      <div class="mask mask-heart bg-red-600 h-12 w-12 grid place-items-center text-white font-extrabold">
        {{ creature.hp }}
      </div>
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
      <div class="flex place-items-center h-12 border-gray-400 border-2 border-b rounded-lg">
        <div class="flex-grow-none basis-1/5 rounded-l-lg px-2 font-extrabold bg-gray-400 h-12 flex place-items-center">
          <p class="text-white font-extrabold">Level</p>
        </div>
        <div class="flex-grow px-5 h-12 basis-2/5">
          <ul>
            <li v-for="level in creature.levels">
            {{ level.level }} ({{ level.models }} {{ $filters.pluralize(level.models, 'model') }})
            </li>
          </ul>
        </div>
        <div class="flex-grow-none basis-1/5 px-2 font-extrabold bg-gray-400 h-12 flex place-items-center">
          <p class="text-white font-extrabold">XP</p>
        </div>
        <div class="flex-grow-none basis-1/5 h-12 place-items-center place-content-center flex">{{ creature.xp }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  creature: Object
})
</script>