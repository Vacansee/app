// Root component

<script setup>
import NavBar from '@/views/NavBar.vue'
import MapInteract from '@/views/MapInteract.vue'
</script>

<template>

<div class="card d-flex align-items-center justify-content-center" style="width: 100%; height: 0rem;">
    <NavBar/>
  </div>

  <div class="absolute w-screen" style="z-index: -1; top: -500px">
    <MapInteract/>
  </div>

</template>

<style>
@import './assets/themes/app.scss';

.homePageLogo {
  position: absolute;
}
</style>
