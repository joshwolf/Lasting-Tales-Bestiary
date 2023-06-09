import { defineStore } from 'pinia'

import firebase from "../firebaseInit";
const db = firebase.firestore();
import { useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'
import creatureSpecials from '../data/creatureSpecials.json'

export const useCreatureStore = defineStore('creatures', {
  state: () => {
    return {
      creatures: useCollection(collection(db, 'creatures')),
      selectedCreatures: [],
      creatureSpecials: creatureSpecials
    }
  },
  actions: {
    save(creature) {
      db.collection("creatures").doc(creature.name.split(' ').join('').toLowerCase()).set(creature)
    },
    delete(creature) {
      db.collection("creatures").doc(creature.name.split(' ').join('').toLowerCase()).delete()
    }
  },
  getters: {
    allTypes: (state) => state.creatures.map((creature) => creature.types)
      .flat()
      .filter((type, index, self) => self.indexOf(type) === index)
      .sort(),
    allFamilies: (state) => state.creatures.map((creature) => creature.family)
      .flat()
      .filter((family, index, self) => self.indexOf(family) === index)
      .sort(),
    filteredCreatures: (state) => (filterText) => {
      console.log('!',filterText,'!')
      if (!filterText) {
        return state.creatures
      }
      return state.creatures.filter((creature) => {
        return creature.name.toLowerCase().includes(filterText.toLowerCase())
      })
    },
    allEnvironments: (state) => ['Dungeon', 'Settlement', 'Wilderness', 'Any']
  },
  persist: true
})
  