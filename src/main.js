import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)

app.use(router)

app.config.globalProperties.$filters = {
  pluralize(amount, word) {
    return (amount > 1 || amount === 0) ? `${word}s` : word
  }
}
app.mount('#app')
