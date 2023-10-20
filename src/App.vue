<script setup>
// Basic Imports
import { RouterLink, RouterView } from 'vue-router'
import Logo from '@/assets/logo.svg?component'
</script>

<template>
  <!-- HTML For Header -->
  <header id="header" v-bind:class="{ 'homePageLogo': $route.path == '/' }">
    
    <div class="wrapper">
      <nav>
        <RouterLink to="/">
          <Logo class="logo" height="75" width="75"/>
        </RouterLink>
      </nav>

      <nav class="top-right-navbar">
        <a href="https://github.com/Vacansee">
          <img class="icon" src="src\assets\githubicon.png" height="50" width="50" />
        </a>
        <a href="mailto:rpi.vacansee@gmail.com">
          <img class="icon" src="src\assets\bug.png" height="50" width="50" />
        </a>
      </nav>
    </div>
  </header>


  <RouterView />
</template>

<script>
export default {
  inject: ["global"],
  watch: {
    'global.bldg': {
      handler() {
        // Only shows header when a building is not selected
        if (this.global.bldg)
          document.getElementById("header").style.opacity = "0";
        else
          document.getElementById("header").style.opacity = "1";

      }
    }
  }
}
</script>
<style scoped>
@import './assets/main.css';
/* Everything from here on in the file is  basic css */
.homePageLogo {
  position: absolute;
}

header {
  z-index: 7;
  display: flex;
  padding: 1rem;
  pointer-events: none;
}

.logo {
  display: block;
  margin: 0 1rem 0 0;
}

.icon {
  margin-top: 1rem;
  padding: .5rem;
  border-radius: 25%;
  transition: background-color 0.5s;
}

nav {
  line-height: 2;
  font-size: 1rem;
  position: fixed;
  align-items: center;
  text-align: left;
  display: flex;
  pointer-events: all;
  margin: 1.25rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: none;
}

nav a {
  display: inline-block;
  padding: 0 .5rem;
}

.top-right-navbar {
  position: fixed;
  padding-right: 2rem;
  top: 0;
  right: 0;
}
</style>
