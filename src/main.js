import { createApp, reactive, watch } from 'vue'
import App from './App.vue'
import Router from './router'
import Moment from 'moment-timezone'
import { useFetch } from '@vueuse/core';
import './assets/main.css'

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
})

function checkActive() {
	for (let bldg in global.data) {
		let sum = 0
		for (let room in global.data[bldg]) {
			if (room == 'meta') continue
			let roomData = global.data[bldg][room]
			roomData['meta'].active = false
			for (let time in roomData) {
				if (time == 'meta') continue
				let now = global.time
				let [beg, end] = time.split('-')
				if (beg < now && end > now) {
					const tStart = Moment(now, 'e:HHmm'), tEnd = Moment(end, 'e:HHmm')
					const diff = Moment.duration(tEnd.diff(tStart))
					roomData['meta'].active = true
					// console.log(room + ' is ' + roomData['meta'].active)
					sum += roomData['meta'].max
				}
			}
		}
		global.data[bldg]['meta'].heat = `${(sum/global.data[bldg]['meta'].max * 100).toFixed(2)}%`
	}
}

setInterval(() => { // Update current time every seconcd
	global.time = Moment.tz('America/New_York').format('e:HHmm')
	let seconds = Number(Moment.tz('America/New_York').format('ss'))
	if (!(global.time.split(':')[1] % 5) && !seconds) { // update states once every 5 minutes
		console.log(`Updating states @ ${global.time}:${seconds}`)
		checkActive()
	}
	// else console.log(`${global.time}:${seconds}`)
}, 1000)
  
watch(data, () => {
	if (global.data) checkActive()
})

const app = createApp(App)
app.provide('global', global);
app.use(Router)
app.use(Moment)

app.mount('#app')