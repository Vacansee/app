// Root component

<script setup>
import NavBar from '@/views/NavBar.vue'
import MapInteract from '@/views/MapInteract.vue'
import SidePanel from '@/views/SidePanel.vue'
import FloorInteract from '@/views/FloorInteract.vue'
</script>

<template>
  <SidePanel />

  <div id="map" class="absolute top-0 left-0 z-0 w-full h-full overflow-hidden">
    <MapInteract />
  </div>

  <div class="absolute z-1 flex top-0 left-0 w-full">
    <NavBar />
  </div>
  
  <div id="floor" class="absolute top-0 left-0 z-1 w-full h-full">
    <FloorInteract />
  </div>
</template>

<style>
@import './assets/themes/app.scss';
</style>