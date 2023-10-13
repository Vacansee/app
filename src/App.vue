<script setup>
// Basic Imports
import { RouterLink, RouterView } from 'vue-router'
import Logo from '@/assets/logo.svg?component'
</script>

<template>
  <!-- HTML For Header -->
  <header id="header" v-bind:class="{ 'homePageLogo': $route.path == '/' }">
    <Logo class="logo" width="75" height="75" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
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
      deep: true,
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
  line-height: 1.5;
  display: flex;
  padding-right: calc(var(--section-gap) / 2);
  margin: 0 auto;
  padding: 2rem;
  font-weight: normal;
}

.logo {
  display: block;
  margin: 0 2rem 0 0;
}

nav {
  width: 100%;
  text-align: left;
  font-size: 1rem;
  padding: 1rem 0;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: none;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
</style>
