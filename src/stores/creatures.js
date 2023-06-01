import { defineStore } from 'pinia'

import firebase from "../firebaseInit";
const db = firebase.firestore();
import { useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'


export const useCreatureStore = defineStore('creatures', {
  state: () => {
    return {
      creatures: useCollection(collection(db, 'creatures'))
    }
  },
  actions: {
    addCreature(creature) {
      db.collection("creatures").add(creature)
    }
  },
  getters: {
    allTypes: (state) => state.creatures.map((creature) => creature.types).flat().filter((type, index, self) => self.indexOf(type) === index),
  },
  persist: true
})
  