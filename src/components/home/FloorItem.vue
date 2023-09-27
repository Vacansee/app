<script setup>
import Floor from './Floor.vue'
</script>

<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

  <div id='currFloor'>
    <Floor @room-hover="onRoomHover" :floor="floor" />
  </div>

  <div id='button-box'>
    <button id="up" v-bind:class="{ 'disabled': !btnUp }" class="floor-button" type="button" @click="increaseFloor">
    <svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10.24 3.957l-8.422 14.06a1.989 1.989 0 0 0 1.7 2.983h16.845a1.989 1.989 0 0 0 1.7 -2.983l-8.423 -14.06a1.989 1.989 0 0 0 -3.4 0z"></path>
    </svg>
    </button>

    <button id="down" v-bind:class="{ 'disabled': !btnDown }" class="floor-button" type="button" @click="decreaseFloor">
      <svg width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10.24 3.957l-8.422 14.06a1.989 1.989 0 0 0 1.7 2.983h16.845a1.989 1.989 0 0 0 1.7 -2.983l-8.423 -14.06a1.989 1.989 0 0 0 -3.4 0z"></path>
    </svg>
    </button>

  </div>
</template>

<script>
export default {
  inject: ["global"],
  props: ['unselected'],
  components: {
    Floor
  },
  watch: {
    unselected(newVar) {
      if (newVar) {
        this.floor = ""
        currFloor.style.opacity = 0;
        up.style.opacity = 0;
        down.style.opacity = 0;
      } else {
        if (this.getBldg()) {
          this.floorNum = this.getBldg().meta.floors[2]
          this.floor = this.global.bldg + this.getBldg().meta.floors[2]
          this.global.floor = this.getBldg().meta.floors[2]
        }
        currFloor.style.opacity = 1;
        up.style.opacity = 1;
        down.style.opacity = 1;
        down.style.transform = "rotate(180deg)";
      }
    },
    floorNum(newVar) {
      if (newVar == this.getBldg().meta.floors[1])
        this.btnUp = false 
      else this.btnUp = true
      if (newVar == 1) this.btnDown = false
      else this.btnDown = true
    },
    btnUp(newVar) {
      if (newVar) up.style.opacity = 1;
      else        up.style.opacity = 0.6;

    },
    btnDown(newVar) {
      if (newVar) down.style.opacity = 1;
      else        down.style.opacity = 0.6;
    },
  },
  data() {
    return {
      threshold: 1,
      doResize: "",
      floorNum: 1,
      btnUp: true,
      btnDown: true,
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
    onRoomHover(roomHover) {
      this.$emit('room-hover', roomHover); // pass it up one more time
    },
    windowResizeTimeout() {
      clearTimeout(this.doResize);
      this.doResize = setTimeout(this.windowEventHandler, 300);
    },
    windowEventHandler() {
      let x = window.innerWidth;
      let y = window.innerHeight - 250; // Subtract the bottom panel's height
      let ratio = x / y;

      if (ratio < this.threshold)  // portrait mode
        currFloor.style.transform = `translate(calc(-50% - 30px), calc(-50%)) scale(${(y - 150) / 50})` + `rotate(90deg)`;
      else // landscape mode
        currFloor.style.transform = `translate(-50%, calc(-50% + 100px)) scale(${x / 65})`;
    },
    increaseFloor() {
      if (this.floorNum < this.getBldg().meta.floors[1]) {
        this.floorNum++;
        this.global.floor = this.floorNum;
        this.floor = this.global.bldg + this.floorNum
        this.global.room = ""
      }
    },
    decreaseFloor() {
      if (this.floorNum != 1) {
        this.floorNum--;
        this.global.floor = this.floorNum;
        this.floor = this.global.bldg + this.floorNum
        this.global.room = ""
      }
    }
  }
}
</script>

<style >
#currFloor {
  position: absolute;
  left: 50%;
  top: calc(50% - 125px);
  transform: translate(-50%, calc(-50% + 125px)) scale(1) scaleX(1) scaleY(1) rotate(0) skew(0deg, 0deg);
  will-change: transform;
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
  bottom: 270px;
  width: 60px;
  height: 150px;
  display: flex;
  flex-wrap: wrap;
}

.disabled {
  background-color: #dedede !important;
  border-color: var(--hardborder) !important;
  color: #afafaf !important;
  cursor: not-allowed !important;
}

.floor-button {
  position: flex;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  color: #222222;
  border: 3px solid var(--softborder);
  padding: 0;
  opacity: 0;
  cursor: pointer;
}

.floor-button:hover {
  background-color: var(--roomfill);
  border: 3px solid #86b0ac;
  color: #4d6d6b;
}



.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
}
</style>