// Root component

<script setup>
import NavBar from '@/views/NavBar.vue'
import MapInteract from '@/views/MapInteract.vue'
</script>

<template>
  <div class="absolute left-0 top-0 z-0 flex justify-center align-items-center h-full" style="width:135vh">
    <MapInteract/>
  </div>

  <div class="absolute left-0 top-0 z-1 flex h-full w-full">
    <div class="relative w-full flex">
      <NavBar />
    </div>
  </div>
</template>

<style>
@import './assets/themes/app.scss';

.homePageLogo {
  position: absolute;
}
</style>
