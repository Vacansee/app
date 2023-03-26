<script setup>
import MapItem from './homeitems/MapItem.vue'
</script>

<template>
  <div id="nametag" :style="{ top: mouseTop + 'px', left: mouseLeft + 'px', opacity: ntVisible }"></div>
  <div id="mask"> Mask moment! </div>
  <MapItem />
</template>

<script>
export default {
  data() {
    return {
      unselected: false,
      mouseTop: 0,
      mouseLeft: 0,
      ntVisible: 0
    }
  },
  mounted() {
    mask.style.opacity = 0

    mask.addEventListener("click", this.maskEventHandler)
    window.addEventListener("mousemove", this.nameTagMove)

    for (const b of buildings.children) {
      b.addEventListener("mouseover", () => { this.nameTagAppear(b.id) })
      b.addEventListener("mouseleave", this.nameTagDisappear)
    }
  },
  methods: {
    nameTagAppear(b) {
      this.ntVisible = 1
      nametag.innerText = b.replace(/-/g, ' ')
      // Only show nametag on unselected buildings
      if (!b.classList.contains("selected")) nametag.style.opacity = 1
    },
    nameTagDisappear() {
      this.ntVisible = 0
    },
    nameTagMove(c) {
      let clickX = c.clientX
      let clickY = c.clientY
      this.mouseTop = clickY - 50
      let tagWidth = nametag.getBoundingClientRect().width
      this.mouseLeft = clickX - (tagWidth / 2.2)
    }
  }
}
</script>

<style scoped>
#mask {
  width: 100%;
  height: 100%;
  z-index: 5;
  opacity: 0;
  /* display: none; */
  transition: all .5s;
  fill: var(--background) !important;
  stroke: none !important;
}

.selected {
  opacity: 1 !important;
  fill: #3aeab5 !important;
  stroke: #20c05b6f !important;
  stroke-width: 2px !important;
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