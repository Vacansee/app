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
// import { global } from '../main.js'
// import About from '../views/About.vue' // currently unused, could be a settings page

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

  console.log(pathBuilding, pathFloorOrRooms)

  // if (pathBuilding != global.bldg && pathFloorOrRooms <= 7) {
  //   console.log("Floor path entered")
  //   if (pathFloorOrRooms !=  global.floor) {
  //     console.log("floor changed")
  //     global.floor = pathFloorOrRooms
  //   }
  // }
  // else if (pathBuilding != global.bldg && pathFloorOrRooms > 7) {
  //   console.log("Room path entered")
  //   if (pathFloorOrRooms != "global room value") {
  //     // Navigate to requested room
  //   }
  // }
  // else if (pathBuilding != global.bldg) {

  // }

  // if (pathFloorOrRooms <= 7 && pathFloorOrRooms != global.floor) {
  //   console.log("Floor mismatch")
  //   resetGlobalValues()
  //   global.bldg = pathBuilding
  //   global.floor = pathFloorOrRooms
  // }

  if (pathBuilding != global.bldg) {s
    global.bldg = pathBuilding
  }
  if (pathFloorOrRooms <= 7 && pathFloorOrRooms != global.floor) {
    global.floor = pathFloorOrRooms
  }
  if (pathFloorOrRooms > 7 && pathFloorOrRooms != global.room) {
    global.room = pathFloorOrRooms
  }

  next();
});

export default router
