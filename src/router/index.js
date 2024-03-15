/* index.js
 * Setting up a router with vue-router
 * 
 * Routing on a single-page lets us trick the browser into
 * thinking it's navigating to a new page, when it's actually
 * just updating the URL and rendering a new view.
 * (This improves link sharing and page navigation)
 */

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import {reactive} from "vue";
// import About from '../views/About.vue' // currently unused, could be a settings page

// URL path values
const global = reactive({
  pathBuilding: '',
  pathFloor: null,
  pathRoom: ''
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Route for overall map
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // Dynamic route for buildings, floors, rooms
    {
      path: '/:building/:floor/',
      name: 'buildingAndFloor',
      component: Home,
      children: [
        {
          path: '/:building/:room/',
          name: 'buildingAndRoom',
          component: Home
        }
      ]
    },
   // Catch all redirect to home page
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
});

// Stores URL path values after each page reload
router.beforeResolve((to, from, next) => {
  const pathComponents = to.path.split('/').filter(component => component !== '');
  if (!isNaN(pathComponents[1]) && pathComponents[0] !== "") {
    global.pathBuilding = pathComponents[0]
    if (pathComponents[1] <= 7) {
      global.pathFloor = Number(pathComponents[1])
    } else {
      global.pathRoom = pathComponents[1]
    }
  }

  next();
});

// Sets global variables to user inputted URL path values
export function Routing(mainGlobal) {
  if (global.pathBuilding) {
    mainGlobal.bldg = global.pathBuilding
    mainGlobal.floor = global.pathFloor
    mainGlobal.room = global.pathRoom
  }
}

export default router
