<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header v-bind:class="{ 'homePageLogo': $route.path == '/' }">
    <img alt="Vacansee logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
@import './assets/main.css';

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
  margin-left: -1rem;
  font-size: 1rem;
  padding: 1rem 0;
  margin-top: 2rem;
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
