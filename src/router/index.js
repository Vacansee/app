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
// import About from '../views/About.vue' // currently unused, could be a settings page

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: About // lazy-loaded
    // }
  ]
})

export default router
