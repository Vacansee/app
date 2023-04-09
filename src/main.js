import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import { createApp, reactive } from 'vue'
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

app.config.globalProperties.$state = reactive({
	// DATA: null,
	curBldgLabel: '',
	curRoomLabel: '',
	curFloorNum: '1'
})

app.mount('#app')