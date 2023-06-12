<template>
  <span :class="`${ specialDefinition ? 'md:tooltip cursor-pointer' : 'cursor-auto' } md:${tooltipPosition}`" :data-tip="specialDefinition" ref="definition">
    {{ props.term }}<span v-if="!props.isLast">, </span>
  </span>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue'
import { useCreatureStore } from "../stores/creatures";

const definition = ref(null)
const creatureStore = useCreatureStore()
const props = defineProps({
  term: {
    type: String,
    default: ''
  },
  isLast: {
    type: Boolean,
    default: false
  }
})

const tooltipPosition = computed(() => {
  if (!definition.value) return 'tooltip-top'
  const leftMargin = definition.value.getBoundingClientRect().left;

  if (leftMargin < 150) {
  return 'tooltip-right';
  } else {
  return 'tooltip-top';
  }
})

const specialDefinition = computed(() => creatureStore.creatureSpecials.find(s => s.name === props.term.split('(')[0].trim())?.description)
</script>

