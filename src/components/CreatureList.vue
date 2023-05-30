<script setup>
import firebase from "../firebaseInit";
import { useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'
import Creature from "./Creature.vue";

const db = firebase.firestore();

const creatures = useCollection(collection(db, 'creatures'))

</script>

<template>
  <main>
    <Creature v-for="creature in creatures" :key="creature.id" :creature="creature"></Creature>
  </main>
</template>
