<script setup>
import Floor from './Floor.vue'
</script>

<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

  <div id='floorBox'>
    <Floor @room-hover="onRoomHover" :floor="floor" />
  </div>

  <div id='buttonBox'>
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
  // Get reference to global
  inject: ["global"],
  props: ['unselected'],
  components: {
    Floor
  },
  watch: {
    // When unselected changes
    unselected(newVar) {
      if (newVar) {
        this.floor = ""
        floorBox.style.opacity = 0;
        up.style.opacity = 0;
        down.style.opacity = 0;
      } else {
        if (this.getBldg()) {
          this.floorNum = this.getBldg().meta.floors[2]
          this.floor = this.global.bldg + this.getBldg().meta.floors[2]
          this.global.floor = this.getBldg().meta.floors[2]
        }
        floorBox.style.opacity = 1;
        up.style.opacity = 1;
        down.style.opacity = 1;
        down.style.transform = "rotate(180deg)";
      }

    },
    'global.aspectRatio': {
      handler() {
        // If landscape mode
        if (this.global.aspectRatio <= 1.2) {
          floorBox.style.transform = 
          `translate(calc(15vw), calc(30vh)) scale(${(window.innerHeight - 150) / 50})` + `rotate(90deg)`;
        } else { // If portrait mode
          floorBox.style.transform = `translate(-50%, calc(-50% + 100px)) scale(${window.innerWidth / 65})`;
        }
      },
    },
    'global.buildingMapOpen' : {
      // for whatever reason it will continuously set zoom to zero
      handler() {
        // if (!this.global.buildingMapOpen) {
        //   this.zoom = 0;
        //   console.log(this.global.buildingMapOpen);
        // }
      }
    },
    // When floor num changes
    floorNum(newVar) {
      if (newVar == this.getBldg().meta.floors[1])
        this.btnUp = false 
      else this.btnUp = true
      if (newVar == 1) this.btnDown = false
      else this.btnDown = true
    },
    // When button up changes
    btnUp(newVar) {
      if (newVar) up.style.opacity = 1;
      else        up.style.opacity = 0.6;
    },
    // When button down changes
    btnDown(newVar) {
      if (newVar) down.style.opacity = 1;
      else        down.style.opacity = 0.6;
    },
  },
  data() {
    // Local variables
    return {
      threshold: 1,
      doResize: "",
      floorNum: 1,
      btnUp: true,
      btnDown: true,
      floor: "",
      zoom:0,
    }
  },
  mounted() {
    // On load, set floorBox transition
    setTimeout(() => floorBox.style.transition = "transform .2s, width .4s", 500);
    window.addEventListener("wheel", this.onMouseScroll);
    window.addEventListener("mousedown", () => {
      window.addEventListener("mousemove", this.onMouseDrag);
    });
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", this.onMouseDrag);
    });
    this.windowEventHandler();
  },
  methods: {
    //clientX and Y will be used to scroll about mouse
    onMouseScroll({clientX, clientY, deltaX,deltaY}) {
      if (this.global.buildingMapOpen){
        let dirwheel = 0;
        if (deltaY>0) {
          dirwheel = -1;
        } else if (deltaY<0) {
          dirwheel = 1;
        }
        let x = window.innerWidth;
        let y = window.innerHeight;
        let ratio = x / y;
        let portraitMode = false;
        if (this.ratio < this.threshold) {
          portraitMode = true;
        }
        let tempZoom=0;
        if (portraitMode) {
          tempZoom = y/50+this.zoom+dirwheel*5;
        } else {
          tempZoom = x/50+this.zoom+dirwheel*5;
        }
        if (20<tempZoom&&tempZoom<100 && tempZoom>0) {
          this.zoom +=dirwheel*10;
        }
        console.log(this.zoom);
        this.windowEventHandler();
      }
    },
    onMouseDrag({movementX, movementY}) {
      if (this.global.buildingMapOpen) {
        console.log(floorBox.offsetLeft, floorBox.offsetTop)
        let changeX = (movementX*((this.zoom+100)/100));
        let changeY = (movementY*((this.zoom+100)/100));
        floorBox.style.left = floorBox.offsetLeft + changeX + "px"; 
        floorBox.style.top = floorBox.offsetTop + changeY + "px";
      }
    },
    // gets the current building
    getBldg() { return this.global.data[this.global.bldg] },
    bringToFront(f) {
      let group = f.parentNode
      group.appendChild(f)
    },
    // When a room is hovered over
    onRoomHover(roomHover) {
      this.$emit('room-hover', roomHover); // pass it up one more time
    },
    // Increases the floor
    increaseFloor() {
      if (this.floorNum < this.getBldg().meta.floors[1]) {
        this.floorNum++;
        this.global.floor = this.floorNum;
        this.floor = this.global.bldg + this.floorNum
        this.global.room = ""
      }
    },
    // Decreases the floor
    decreaseFloor() {
      if (this.floorNum != 1) {
        this.floorNum--;
        this.global.floor = this.floorNum;
        this.floor = this.global.bldg + this.floorNum
        this.global.room = ""
      }
    },
    windowEventHandler() {
      // If landscape mode
      if (this.global.aspectRatio <= 1.2) {
        floorBox.style.transform = 
        `translate(calc(15vw), calc(30vh)) scale(${(window.innerHeight - 150) / 50 + this.zoom})` + `rotate(90deg)`;
      } else { // If portrait mode
        floorBox.style.transform = `translate(-50%, calc(-50% + 100px)) scale(${window.innerWidth / 65 + this.zoom})`;
      }
    }
  }
}
</script>

<style >
#floorBox {
  position: absolute;
  left: 40%;
  /* left: 50% */
  top: 15%;
  /* top: calc(50% - 125px); */
  transform: translate(-50%, calc(-50% + 125px)) scale(1) scaleX(1) scaleY(1) rotate(0) skew(0deg, 0deg);
  will-change: transform;
  justify-content: center;
  align-items: center;
  transition: 800ms ease all;
  opacity: 0;
  pointer-events: none;

}

#buttonBox {
  position: absolute;
  justify-content: center;
  align-items: right;
  right: 4vw;
  bottom: 5vh;
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