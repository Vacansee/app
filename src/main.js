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
	for (let b in global.data) {
		let bldg = global.data[b], sum = 0
		if (!('heat' in bldg['meta'])) bldg['meta'].heat = 0
		for (let r in bldg) {
			if (r == 'meta') continue
			let room = bldg[r]
			room['meta'].active = false
			room['meta'].cur = room['meta'].next = ''
			for (let time in room) {
				if (time == 'meta') continue
				let now = global.time, [beg, end] = time.split('-')
				if (beg < now && end > now) {
					const i = Moment(now, 'e:HHmm'), f = Moment(end, 'e:HHmm')
					const left = Moment.duration(f.diff(i))
					room['meta'].cur = [ room[time][0], left ]; room['meta'].active = true
					sum += room['meta'].max
				}
				if (now < beg) {
					const i = Moment(now, 'e:HHmm'), f = Moment(beg, 'e:HHmm')
                    const until = Moment.duration(f.diff(i))
					room['meta'].next = [ room[time][0], until ] 
					break
				}
			}
		}
		// let oldHeat = bldg['meta'].heat
		bldg['meta'].heat = `${(sum/bldg['meta'].max * 100).toFixed(2)}%`
		// if (oldHeat != bldg['meta'].heat) console.log(`${oldHeat} -> ${bldg['meta'].heat}`)
	}
}

setInterval(() => { // Update current time every seconcd
	global.time = Moment.tz('America/New_York').format('e:HHmm')
	let seconds = Number(Moment.tz('America/New_York').format('ss'))
	if (!(global.time.split(':')[1] % 5) && !seconds) { // update states every 5m (on the dot)
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