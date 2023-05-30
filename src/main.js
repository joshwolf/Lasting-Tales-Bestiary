import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.globalProperties.$filters = {
  pluralize(amount, word) {
    return (amount > 1 || amount === 0) ? `${word}s` : word
  }
}
app.mount('#app')
