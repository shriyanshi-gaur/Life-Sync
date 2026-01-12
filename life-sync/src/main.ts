// import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// import App from './App.vue'
// import router from './router' // <--- 1. Import it here
// import './style.css'



// const app = createApp(App)

// app.use(createPinia())
// app.use(router) // <--- 2. Use it here
// app.mount('#app')
import { createApp } from 'vue';
import './style.css'; 
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router'; // <--- ADD THIS IMPORT

// PrimeVue Imports
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';

const app = createApp(App);

app.use(createPinia());
app.use(router); // <--- ADD THIS LINE (Fixes the crash)
app.use(ToastService);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.dark',
        }
    }
});

app.mount('#app');