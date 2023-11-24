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
  emits: ["roomHover"],
  components: {
    Floor
  },
  watch: {
    'global.aspectRatio': {
      handler() {
        this.moveMap();
      },
    },
    'global.bldg' : {
      handler() {
        if (this.global.bldg) { // selected
          if (this.getBldg()) {
            this.floorNum = this.getBldg().meta.floors[2]
            this.floor = this.global.bldg + this.getBldg().meta.floors[2]
            this.global.floor = this.getBldg().meta.floors[2]
          }
          floorBox.style.opacity = 1;
          up.style.opacity = down.style.opacity = 1;
          buttonBox.style.pointerEvents = "auto";
          down.style.transform = "rotate(180deg)";
        } else { // unselected
          this.floor = ""
          floorBox.style.opacity = 0;
          up.style.opacity = down.style.opacity = 0;
          buttonBox.style.pointerEvents = "none";
        } 
      }
      
    },
    // When floor num changes
    floorNum(newVar) {
      if (this.getBldg() && newVar == this.getBldg().meta.floors[1])
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
      onPopup: false,
      floor: "",
      zoom:0,
    }
  },
  mounted() {
    // On load, set floorBox transition
    setTimeout(() => floorBox.style.transition = "transform .2s, width .4s", 500);
    this.moveMap();
    popup.addEventListener("mouseleave", () => { this.onPopup = false; console.log(this.onPopup) })
    popup.addEventListener("mouseenter", () => { this.onPopup = true; console.log(this.onPopup) })
    window.addEventListener("wheel", this.onMouseScroll);
    window.addEventListener("mousedown", () => {
      window.addEventListener("mousemove", this.onMouseDrag);
    });
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", this.onMouseDrag);
    });
  },
  methods: {
    moveMap() {
      var popupWidth = popup.style.width;
        if (400 > 0.33 * window.innerWidth) {
          popupWidth = "400px";
        }
        // If thinner landscape mode
        if ((this.global.aspectRatio <= this.global.flipScreen)
        && (this.global.aspectRatio >= 0.5)) {
          floorBox.style.transform = 
          `translate(calc(${popupWidth} + (${window.innerWidth}px - ${popupWidth}) * 0.45 - 50px), 
      calc(45vh)) scale(calc(${window.innerHeight * 0.9 / 50 + this.zoom}))` + `rotate(90deg)`;
      // If wide landscape
        } else if (this.global.aspectRatio <= this.global.flipScreen) {
          floorBox.style.transform = 
          `translate(calc(67vw - 25px), calc(45vh)) 
          scale(${(window.innerWidth) * 0.57 / 50 + this.zoom})`;
      // If portrait wide mode
        } else if (this.global.aspectRatio <= 1.85) {
          floorBox.style.transform = 
          `translate(calc(50vw - 25px), calc((${window.innerHeight}px - ${popup.style.height}) / 2)) 
          scale(${window.innerWidth * 0.9 / 50 + this.zoom})`;
      // If potrait tall mode
        } else {
          floorBox.style.transform = 
          `translate(calc(45vw - 25px), calc(25vh - 25px)) scale(calc(${window.innerHeight * 0.45 / 50 + this.zoom}))` + `rotate(90deg)`;
        }
    },
    //clientX and Y will be used to scroll about mouse
    onMouseScroll({clientX, clientY, deltaX, deltaY}) {
      if (!this.onPopup && this.global.bldg){
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

        this.zoom +=dirwheel*10;
        if (dirwheel == -1 && this.zoom < 20) this.zoom  = 20 - (30 - this.zoom)*0.5;
        if (dirwheel == 1 && this.zoom >= 20) this.zoom  = 20 + (this.zoom-10)*0.5;
        if (this.zoom > 100) this.zoom  = 100;
        // console.log(dirwheel, this.zoom)
        this.moveMap();
      }
    },
    onMouseDrag({movementX, movementY}) {
      if (this.global.bldg) {
        // console.log(floorBox.offsetLeft, floorBox.offsetTop)
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
      if (this.getBldg() && this.floorNum < this.getBldg().meta.floors[1]) {
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
    }
  }
}
</script>

<style >
#floorBox {
  position: absolute;
  left: 0%;
  /* left: 50% */
  top: 0%;
  /* top: calc(50% - 125px); */
  transform: translate(-50%, 5%) scale(1) scaleX(1) scaleY(1) rotate(0) skew(0deg, 0deg);
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
  pointer-events: none;
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