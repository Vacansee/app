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
import { inject } from 'vue';
// import About from '../views/About.vue' // currently unused, could be a settings page

const global = inject('global');

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

router.beforeEach((to, from, next) => {
  const pathComponents = to.path.split('/').filter(component => component !== '');
  const pathBuilding = pathComponents[0]
  const pathFloorOrRooms = pathComponents[1]

  console.log(pathBuilding, pathFloorOrRooms, global.bldg)
  
  if (pathBuilding != "get global building implemented in file") {
    if (pathFloorOrRooms <= 7) {
      console.log("Floor path entered")
      if (pathFloorOrRooms != "global floor value") {
        // Navigate to requested floor
      }
    }
    else {
      console.log("Room path entered")
      if (pathFloorOrRooms != "global room value") {
        // Navigate to requested room
      }
    }
  }

  // console.log(to.path)
  // console.log(global.room)
  // console.log(1 == 1)
  
  next();
});

export default router
