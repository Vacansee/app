<template>
  <foreignObject style="pointer-events: none;" x="500" y="1000" width="100%" height="100%" v-if="pinned">
    <div class = "map-overlays-icons">
      <p id="test" style=" position:absolute; color:rgb(255, 255, 255); font-weight:1000;"><span class="map-overlays-icons">📌</span></p>
    </div>
  </foreignObject>
</template>
<script>
export default {
  inject: ["global"],
  props: ['bldgSVG'],
  watch: {

  },
  data() {

  }, 
  updated() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style>
#pin{
  position: absolute;
  left: 0%;
  top: 0%;
  will-change: transform;
  transform: translate(0%, 0%) scale(1) scaleX(1) scaleY(1) rotate(0) skew(0deg, 0deg);
}
</style>