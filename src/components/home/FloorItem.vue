<script setup>
import Floor from './Floor.vue'
</script>

<template>
  <div id='currFloor'>
    <Floor :floor="floor" />
  </div>
</template>

<script>
export default {
  components: {
    Floor
  },
  props: ['unselected', 'currBuilding', 'buildLabel'],
  watch: {
    unselected(newVar, oldVar) {
      if (newVar) {
        this.floor = ""
        currFloor.style.opacity = 0;
      } else {
        this.floor = this.buildLabel + '1'
        currFloor.style.opacity = 1;
      }
    }
  },
  data() {
    return {
      threshold: 1,
      doResize: "",
      floor: "",
    }
  },
  mounted() {
    setTimeout(() => currFloor.style.transition = "transform .2s, width .4s", 500)

    window.addEventListener("resize", this.windowResizeTimeout)
    this.windowEventHandler()
  },
  methods: {
    bringToFront(f) {
      let group = f.parentNode
      group.appendChild(f)
    },
    windowResizeTimeout() {
      clearTimeout(this.doResize);
      this.doResize = setTimeout(this.windowEventHandler, 300);
    },
    windowEventHandler() {
      let x = window.innerWidth
      let y = window.innerHeight
      let ratio = x / y

      if (ratio < this.threshold)  // portrait mode
        currFloor.style.transform = `scale(${(y - 150) / 60})` + `rotate(90deg)`
      else // landscape mode
        currFloor.style.transform = `scale(${x / 60})`
    }
  }
}
</script>

<style >
#currFloor {
  position: absolute;
  left: 50%;
  top: 50%;
  will-change: transform;
  transform: translate(-50%, -50%) scale(1) scaleX(1) scaleY(1) rotate(0) skew(0deg, 0deg);
  justify-content: center;
  align-items: center;
  transition: 800ms ease all;
  opacity: 0;
  pointer-events: none;
}
</style>