<script setup>
import MapItem from '../components/home/MapItem.vue'
import PopUpItem from '../components/home/PopUpItem.vue'
import FloorItem from '../components/home/FloorItem.vue'
</script>

<template>
  <div v-if="global.loading" class="toast" id="nametag">Loading data...</div>
  <div v-else-if="global.error" class="toast" id="nametag">Failed to retrieve data</div>
  <div id="nametag" :style="{ top: mouseTop + 'px', left: mouseLeft + 'px', opacity: ntVisible }"> {{ label }}</div>
  <MapItem :unselected="unselected" :currBuilding="currBuilding" />
  <div id="mask"></div>
  <PopUpItem />
  <FloorItem @room-hover="onRoomHover" :unselected="unselected" :currBuilding="currBuilding" :bldgLabel="bldgLabel" />
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
      currBuilding: "",
      unselected: true,
      bldgLabel: "",
      label: '',
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
      this.ntVisible = 0
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
      if (roomHover) {
        this.ntVisible = 1
        this.label = roomHover 
        nametag.style.fontSize = '24px'
      }
      else if (roomHover == '') {
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
        this.currBuilding = b
        this.bldgLabel = b.id.replace(/-/g, ' ')
        this.global.bldg = this.bldgLabel

        b.classList.add("selected")
        this.ntVisible = 0 // hide nametag when building selected

        mask.style.opacity = 0.8
        mask.style.pointerEvents = "inherit"
        mapBox.style.transform = `scale(3) translate(${window.innerWidth / 2 - boxCenterX}px, ${window.innerHeight / 2 - boxCenterY - 50}px)`
        popup.style.transform = "translateY(0px)"
      }
    },
    buildingDeselect() {
      try {
        let tmp = this.currBuilding
        this.currBuilding = ""
        this.global.bldg = ""
        this.unselected = true
        mapBox.style.transform = "scale(1) translate(-50%, -50%)"
        popup.style.transform = "translateY(250px)"
        mask.style.pointerEvents = "none"
        mask.style.opacity = 0
        tmp.classList.remove("selected")
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
  /*opacity: 0;*/
  transition-duration: .1s;
}
</style>