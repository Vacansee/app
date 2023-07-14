// Root component

<script setup>
import NavBar from '@/views/NavBar.vue'
import MapInteract from '@/views/MapInteract.vue'
</script>

<template>
  <div id="map" class="absolute top-0 left-0 z-0 w-full h-full overflow-hidden">
    <MapInteract/>
  </div>

  <div class="absolute z-1 flex top-0 left-0 w-full">
      <NavBar />
  </div>
</template>

<style>
@import './assets/themes/app.scss';
</style>