<script setup>
import MapItem from '../components/home/MapItem.vue'
import PopUpItem from '../components/home/PopUpItem.vue'
import FloorItem from '../components/home/FloorItem.vue'
</script>

<template>
  <div v-if="global.loading" class="toast" id="nametag">Loading data...</div>
  <div v-else-if="global.error" class="toast" id="nametag">Failed to retrieve data</div>
  <div id="nametag" :style="{ top: mouseTop + 'px', left: mouseLeft + 'px', opacity: ntVisible }"> {{ label }}</div>
  <MapItem :unselected="unselected" :bldgSVG="bldgSVG" />
  <div id="mask"></div>
  <PopUpItem />
  <FloorItem @room-hover="onRoomHover" :unselected="unselected"/>
</template>

<script>
export default {
  inject: ['global'],
  components: {
    MapItem,
    PopUpItem,
    FloorItem
  },
  data() {
    return {
      mouseTop: 0,
      mouseLeft: 0,
      ntVisible: 0,
      switch: 0,
      bldgSVG: "",
      unselected: true,
      label: '',
    }
  },
  watch: {
    // Move the popup to the right spot off view if popup isnt selected
    'global.aspectRatio': {
      handler() {
        // If landscape mode
        // Fixes issue where transitions when unselected would show the popup for a split second
        popup.style.transition = "transform .0s"
        if (this.unselected && this.global.aspectRatio < 1) {
          popup.style.transform = "TranslateY(25vh)"
        // If portrait mode
        } else if (this.unselected){
          popup.style.transform = "TranslateX(-33vw)"
        }
      }
    }
  },
  mounted() {
    mask.addEventListener("click", this.buildingDeselect)
    window.addEventListener("mousemove", this.nameTagMove)

    for (const b of buildings.children) {
      b.addEventListener("mouseover", () => { this.nameTagAppear(b) })
      b.addEventListener("mouseleave", this.nameTagDisappear)
      b.addEventListener("click", () => { this.buildingSelect(b) })
    }
  },
  methods: {
    nameTagAppear(b) {
      // Only show nametag on unselected buildings
      if (this.unselected) {
        this.ntVisible = 1
        this.label = b.id.replace(/-/g, ' ')
      }
    },
    nameTagDisappear() {
      this.ntVisible = 0
    },
    nameTagMove(c) {
      let clickX = c.clientX
      let clickY = c.clientY
      this.mouseTop = clickY - 50

      let tagWidth = 20
      if (this.ntVisible == 1)
        tagWidth = nametag.getBoundingClientRect().width
      this.mouseLeft = clickX - (tagWidth / 2.2)
    },
    onRoomHover(roomHover) {
      let nametag = document.getElementById('nametag');
      if (roomHover[0]) {
        this.ntVisible = 1
        this.label = roomHover[0] 
        if (roomHover[1]) nametag.style.fontSize = '24px'
        else nametag.style.fontSize = '16px'
      }
      else if (roomHover[0] == '') {
        this.ntVisible = 0
        nametag.style.fontSize = '14px'
      }
    },
    buildingSelect(b) {
      if (this.unselected) {
        var bBox = b.getBoundingClientRect()
        var boxCenterX = bBox.x + bBox.width / 2
        var boxCenterY = bBox.y + bBox.height / 2

        this.unselected = false
        this.bldgSVG = b
        this.global.bldg = b.id.replace(/-/g, ' ')

        this.ntVisible = 0 // hide nametag when building selected

        mask.style.opacity = 0.8
        mask.style.pointerEvents = "inherit"
        mapBox.style.transform = `scale(3) translate(${window.innerWidth / 2 - boxCenterX}px, ${window.innerHeight / 2 - boxCenterY - 50}px)`
        // Bring the popup to 0,0
        popup.style.transition = "transform .5s"
        popup.style.transform = "translateY(0vh)"
      }
    },
    buildingDeselect() {
      try {
        this.bldgSVG = ""
        this.global.bldg = ""
        this.unselected = true
        mapBox.style.transform = "scale(1) translate(-50%, -50%)"
        mask.style.pointerEvents = "none"
        mask.style.opacity = 0
        popup.style.transition = "transform .5s"
        // Landscape mode
        if (this.global.aspectRatio <= 1) {
          popup.style.transform = "TranslateY(25vh)"
        // If portrait mode
        } else {
          popup.style.transform = "TranslateX(-33vw)"
        }
      } catch { /* pass */ }

    }
  }
}
</script>

<style scoped>
#mask {
  width: 100vw;
  height: 100vh;
  z-index: 5;
  opacity: 0;
  /* display: none; */
  background: black !important;
  stroke: none !important;
  pointer-events: none;
}

.toast {
  font-size: 18px !important;
}

#nametag {
  z-index: 6;
  color: black;
  font-size: 14px;
  position: absolute;
  background-color: white;
  width: fit-content;
  padding: 2px 6px 4.5px;
  border: 2px solid var(--softborder);
  border-radius: 5px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  transition-duration: .1s;
  pointer-events: none;
}
</style>