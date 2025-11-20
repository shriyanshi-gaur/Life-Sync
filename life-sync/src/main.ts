import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router' // <--- 1. Import it here
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router) // <--- 2. Use it here
app.mount('#app')