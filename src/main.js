import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from "primevue/config";
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';

import './assets/main.css'

const app = createApp(App)

app.use(PrimeVue);
app.use(router)

app.component('Button', Button);
app.component('Sidebar', Sidebar);

app.mount('#app')