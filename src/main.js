/* main.js
 * Global state, global.data updates, and Vue app initialization
 */
// App is created with createApp
// Reactive allows for global reactive variables
// Watch functions are called when the variable watched for is updated
import { createApp, reactive, watch } from 'vue'
// App.vue is general information about the app
import App from './App.vue'
// Imports file used for page routing
import Router from './router'
// Imports ability to check time
import Moment from 'moment-timezone'
// useFetch is used to fetch data (fitting name)
import { useFetch } from '@vueuse/core';
// Basic CSS
import './assets/main.css'

// On page load, fetch building/room data from Vacansee/data:
const URL = 'https://raw.githubusercontent.com/Vacansee/data/main/rooms.json'
const { data, isFetching, error } = useFetch(URL).get().json()
const global = reactive({ // The global reactive object!
	// Any changes to its members will trigger reactivity in components that reference it: 
	data: data,
	loading: isFetching,
	error: error,
	bldg: '',
	room: '',
	floor: '1',
	aspectRatio: window.innerHeight/window.innerWidth,
	time: Moment.tz('America/New_York').format('e:HHmm'),
	// Non current time during a busy part of the day (used for testing)
	// time: Moment.tz('2023-09-14 12:30', 'America/New_York').format('e:HHmm'),
	firstCalc: false,
	buildingMapOpen: false,
})


// Consider global.data a living document: most of it's values are pre-generated & retrieved from
// the Vacansee/data repo, but some are (re)calculated regularly and inserted/updated in the object.

// checkActive() is run regularly and updates "meta" properties for both rooms and buildings
function checkActive() {
	// Loop through the global reactive variable data
	for (let b in global.data) {
		let bldg = global.data[b], sum = 0, longest = 0
		// If heat isn't in bldg.meta, set heat to 0
		if (!('heat' in bldg.meta)) bldg.meta.heat = 0
		// Loop thorugh building data
		for (let r in bldg) {
			if (r == 'meta') continue // skip meta properties
			// Get reference to room
			let room = bldg[r]
			room.meta.active = false
			room.meta.cur = room.meta.next = ''
			
			for (let time in room) {
				if (time == 'meta') continue
				// Get the current time
				let now = global.time, [beg, end] = time.split('-')
				// if class is in session, toggle room state, set cur class, and add to bulding sum
				if (beg <= now && end > now) {
					const i = Moment(now, 'e:HHmm'), f = Moment(end, 'e:HHmm')
					const left = Moment.duration(f.diff(i))
					room.meta.cur = [ room[time][0], room[time][2], f ]; room.meta.active = true
					// Sum up max people in all rooms used
					sum += room.meta.max
				}
				if (beg > now) { // reached the end of the day
					const i = Moment(now, 'e:HHmm'), f = Moment(beg, 'e:HHmm')
                    const until = Moment.duration(f.diff(i))
					if (until.asMinutes() > longest) longest = until.asMinutes()
					// Set as next class and stop searching:
					room.meta.next = [ room[time][0], room[time][2], f ] 
					break
				}
			}
		}
		// Sum/total people that can exist in the building = % filled
		bldg.meta.heat = (sum/bldg.meta.max * 100).toFixed(2)
		bldg.meta.longest = longest
		// if (oldHeat != bldg.meta.heat) console.log(`${oldHeat} -> ${bldg.meta.heat}`)
	}
}

setInterval(() => { // Update current time every second
	global.time = Moment.tz('America/New_York').format('e:HHmm')
	// Old time used for testing
	// global.time = Moment.tz('2023-09-14 12:30', 'America/New_York').format('e:HHmm')
	let seconds = Number(Moment.tz('America/New_York').format('ss'))
	// let seconds = Number(Moment.tz('2023-09-14 12:30', 'America/New_York').format('ss'))
	// Every 5 minutes, check data for buildings (update heat and room availability)
	if (!(global.time.split(':')[1] % 5) && !seconds) { // update states every 5m (on the dot)
		checkActive()
		console.log(`Updating states @ ${global.time}:${seconds}`)
	}
	// else console.log(`${global.time}:${seconds}`)
}, 1000)

function updateAspectRatio() { // Updates the aspect ratio globally
	global.aspectRatio = window.innerHeight/window.innerWidth
}
watch(data, () => { // perform first calculations only after data is loaded
	if (global.data) {
		// Adds an event listener to update resize when the window is resized
		window.addEventListener("resize", updateAspectRatio)
		checkActive()
		global.firstCalc = true
	}
})
// Creates the app 
const app = createApp(App)
app.provide('global', global);
app.use(Router)
app.use(Moment)

app.mount('#app')