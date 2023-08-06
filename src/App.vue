// Root component

<script setup>
import NavBar from '@/views/NavBar.vue'
import MapInteract from '@/views/MapInteract.vue'
import SidePanel from '@/views/SidePanel.vue'
import { ref } from 'vue';
const panelVisible = ref(false);
</script>

<template>
  <SidePanel :visible="panelVisible" :class="panelVisible ? 'z-10' : 'z-0'"  />

  <div id="map" class="absolute top-0 left-0 z-1 w-full h-full overflow-hidden">
    <MapInteract />
  </div>

  <div class="absolute z-2 flex top-0 left-0 w-full">
    <NavBar />
  </div>
</template>

<style>
@import './assets/themes/app.scss';
</style>