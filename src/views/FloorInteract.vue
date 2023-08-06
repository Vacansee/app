<template>
  <div id="floor-map">
    <component :is="floorSvgComponent" ref="svgComponent" />
  </div>
</template>

<script>
export default {
  inject: ["global"],
  data() {
    return {
      floorSvgComponent: null
    };
  },
  watch: {
    'global.bldg': {
      immediate: true,
      handler: function() {
        this.loadSvg();
      }
    },
    'global.floor': {
      immediate: true,
      handler: function() {
        this.loadSvg();
      }
    }
  },
  methods: {
    async loadSvg() {
      if(this.global.bldg && this.global.floor){
        const module = await import(`../assets/floors/${this.global.bldg}${this.global.floor}.svg`);
        this.floorSvgComponent = module.default;
      } else {
        this.floorSvgComponent = null;
      }
    }
  },
  mounted() {
    console.log(this.$refs.svgComponent);
  },
  updated() {
    this.$nextTick(() => {})
  }
}
</script>
  
<style>
#floor-map {
  opacity: 1;
  fill: var(--avail-0);
  stroke: var(--avail-bord-0);
  stroke-width: 9px;
  will-change: transform;
  margin-left: 50vw;
  margin-top: 50vh;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  pointer-events: all;
}

@media only screen and (max-width: 768px) {
  #floor-map {
    width: 100%;
    transform: translateX(-50%) translateY(-50%) rotate(90deg);
  }
}
</style>