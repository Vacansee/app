import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import { createApp, reactive } from 'vue'
import App from './App.vue'
import Router from './router'
import PrimeVue from "primevue/config"
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'
import Moment from 'moment-timezone'

import './assets/main.css'

const app = createApp(App)

app.use(PrimeVue)
app.use(Router)
app.use(Moment)

app.component('Button', Button)
app.component('Sidebar', Sidebar)

app.config.globalProperties.$state = reactive({
	// DATA: null,
	curBldgLabel: '',
	curRoomLabel: '',
	curFloorNum: '1',
	curDate: Moment.tz('America/New_York')
			.format('d-HHmm')
})

app.mount('#app')