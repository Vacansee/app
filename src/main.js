import { createApp, reactive } from 'vue'
import App from './App.vue'
import Router from './router'
import Moment from 'moment-timezone'

import './assets/main.css'

const app = createApp(App)

app.use(Router)
app.use(Moment)


// alert(Moment('2-1830', 'e-HHmm').isValid())

app.config.globalProperties.$state = reactive({
	// DATA: null,
	curBldgLabel: '',
	curRoomLabel: '',
	curFloorNum: '1',
	curDate: Moment.tz('America/New_York')
			.format('e:HHmm')
})

app.mount('#app')