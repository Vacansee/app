// Root file ; app creation and mounting
// Maintains global variables for building data and time

import { createApp, reactive, watch, ref } from 'vue'
import App from './App.vue'
import Router from './router'

import Moment from 'moment-timezone'
import { useFetch } from '@vueuse/core'

// PrimeVue resources
import PrimeVue from "primevue/config"
import './assets/themes/theme.css'
import "primevue/resources/primevue.min.css" //core
import 'primeflex/primeflex.scss'
import 'primeicons/primeicons.css'
import './assets/themes/app.scss'
import ToastService from 'primevue/toastservice'



const URL = 'https://raw.githubusercontent.com/Vacansee/data/main/rooms.json'
const { data, isFetching, error } = useFetch(URL).get().json()

const global = reactive({ 
	data: data,
	loading: isFetching,
	error: error,
	bldg: '',
	room: '',
	floor: '1',
	time: Moment.tz('America/New_York').format('e:HHmm'),
	firstCalc: false,
})

function checkActive() {
	for (let b in global.data) {
		let bldg = global.data[b], sum = 0, longest = 0
		if (!('heat' in bldg.meta)) bldg.meta.heat = 0
		for (let r in bldg) {
			if (r == 'meta') continue
			let room = bldg[r]
			room.meta.active = false
			room.meta.cur = room.meta.next = ''
			for (let time in room) {
				if (time == 'meta') continue
				let now = global.time, [beg, end] = time.split('-')
				if (beg <= now && end > now) {
					const i = Moment(now, 'e:HHmm'), f = Moment(end, 'e:HHmm')
					const left = Moment.duration(f.diff(i))
					room.meta.cur = [ room[time][0], room[time][2], f ]; room.meta.active = true
					sum += room.meta.max
				}
				if (now < beg) {
					const i = Moment(now, 'e:HHmm'), f = Moment(beg, 'e:HHmm')
                    const until = Moment.duration(f.diff(i))
					room.meta.next = [ room[time][0], room[time][2], f ] 
					if (until.asMinutes() > longest) longest = until.asMinutes()
					break
				}
			}
		}
		// let oldHeat = bldg.meta.heat
		bldg.meta.heat = (sum/bldg.meta.max * 100).toFixed(2)
		bldg.meta.longest = longest
		// if (oldHeat != bldg.meta.heat) console.log(`${oldHeat} -> ${bldg.meta.heat}`)
	}
}

setInterval(() => { // Update current time every seconcd
	global.time = Moment.tz('America/New_York').format('e:HHmm')
	let seconds = Number(Moment.tz('America/New_York').format('ss'))
	if (!(global.time.split(':')[1] % 5) && !seconds) { // update states every 5m (on the dot)
		checkActive()
		console.log(`Updating states @ ${global.time}:${seconds}`)
	}
	// else console.log(`${global.time}:${seconds}`)
}, 1000)
  
watch(data, () => {
	if (global.data) {
		checkActive()
		global.firstCalc = true
	}
})

const app = createApp(App)
app.provide('global', global)
app.use(Router)
app.use(Moment)
app.use(ToastService)
// Consider adding ZIndex for components in config
app.use(PrimeVue, { 
	ripple: true,
	inputStyle: "outlined"
  });
app.mount('#app')