<template>
  <div id="floor-map">
    <floor-svg ref="svgComponent" />>
  </div>
</template>

<script>
import FloorSvg from '@/assets/floors/DCC1.svg'

export default {
  inject: ["global"],
  components: {
    'floor-svg': FloorSvg
  },
  updated() {
    this.$nextTick(() => {
    })
  },
}
</script>
  
<style>
#floor-map {
  fill: var(--avail-0);
  stroke: var(--avail-bord-0);
  stroke-width: 9px;
  will-change: transform;
  transition: width linear 2s, height linear 2s, opacity .8s;
  width: 100%;
  background: none;
  pointer-events: none;
}
</style>