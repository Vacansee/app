<!-- This will be a component of MapItem at some point (might need its own manager)-->

<!-- HTML scripts -->
<template>
  <div v-if="isPinned" class = "map-overlays-icons" >
    <p id="pin" style=" position:absolute; color:rgb(255, 255, 255); font-weight:1000;"><span class="map-overlays-icons">📌</span></p>
  </div>
</template>

<!-- JS scripts -->
<script>
export default {
  // give access to global variables
  inject: ["global"],
  props: [''],
  // will constantly check variables values
  watch: {
    // this might need to be a different variable
    'global.bldg': {
      handler() {
        if (this.global.bldg) {
          // show
          isPinned = true;
        } else {
          // hide
          isPinned = false;
        }
      }
    }
  },
  // local variables
  data() {
    return {
      isPinned : false,
    }
  }, 
  // code that runs every frame
  updated() {

  },
  // run on the start of the webpage
  mounted() {

  },
  methods: {
    getBldg() { return this.global.data[this.global.bldg] },
    placePin(buidling) {},

    // optional methods that could be added if needed
    placePin(x,y) {},
    removePin(building){},
    removePinByID(ID) {},
  }
}
</script>

<!-- CSS scripts -->
<style>
#pin{
  position: absolute;
  left: 500px;
  top: 1000px;
  will-change: transform;
  transform: translate(0%, 0%) scale(1) scaleX(1) scaleY(1) rotate(0) skew(0deg, 0deg);
}
</style>