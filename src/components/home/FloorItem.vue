<script setup>
import Floor from './Floor.vue'
</script>

<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

  <div id='currFloor'>
    <Floor :floor="floor" />
  </div>

  <div id='button-box'>
    <button id="up" class="floor-button" type="button" @click="increaseFloor">
      <i class="material-symbols-outlined">arrow_upward</i>
    </button>

    <button id="down" class="floor-button" type="button" @click="decreaseFloor">
      <i class="material-symbols-outlined">arrow_downward</i>
    </button>

  </div>
</template>

<script>
export default {
  inject: ["global"],
  components: {
    Floor
  },
  props: ['unselected', 'currBuilding', 'bldgLabel'],
  watch: {
    unselected(newVar, oldVar) {
      if (newVar) {
        this.floor = ""
        currFloor.style.opacity = 0;
        up.style.opacity = 0;
        down.style.opacity = 0;
      } else {
        if (this.getBldg()) {
          this.floorNum = this.getBldg().meta.floors[2]
          this.floor = this.bldgLabel + this.getBldg().meta.floors[2]
          this.global.floor = this.getBldg().meta.floors[2]
        }
        currFloor.style.opacity = 1;
        up.style.opacity = 1;
        down.style.opacity = 1;
      }
    }
  },
  data() {
    return {
      threshold: 1,
      doResize: "",
      floorNum: 1,
      floor: "",
    }
  },
  mounted() {
    setTimeout(() => currFloor.style.transition = "transform .2s, width .4s", 500)

    window.addEventListener("resize", this.windowResizeTimeout)
    this.windowEventHandler()
  },
  methods: {
    getBldg() { return this.global.data[this.global.bldg] },
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
    },
    increaseFloor() {
      if (this.floorNum < this.getBldg().meta.floors[1]) {
        this.floorNum++;
        this.global.floor = this.floorNum;
        this.floor = this.bldgLabel + this.floorNum
      }
    },
    decreaseFloor() {
      if (this.floorNum != 1) {
        this.floorNum--;
        this.global.floor = this.floorNum;
        this.floor = this.bldgLabel + this.floorNum
      }
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

#button-box {
  position: absolute;
  justify-content: center;
  align-items: right;
  right: 40px;
  top: 40px;
  width: 50px;
  height: 130px;
  display: flex;
  flex-wrap: wrap;
}

.floor-button {
  position: flex;
  background: white;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  padding: 0;
  border: none;
  opacity: 0;
}

.floor-button:hover {
  background-color: var(--roomfill);
}



.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
}
</style>