<script setup>
import DCC1 from '../flooritems/DCC1.vue'
import DCC2 from '../flooritems/DCC2.vue'
import DCC3 from '../flooritems/DCC3.vue'
</script>

<template>
  <div id="currFloor">
    <DCC1 ></DCC1>
  </div>
</template>

<script>
export default {
  components: {
    DCC1
  },
  props: ['unselected', 'currBuilding', 'buildLabel'],
  watch: {
    unselected(newVar, oldVar) {
      if (newVar) {
        /*TODO: Get rid of background somehow*/
        currFloor.style.opacity = 0
        currFloor.style.pointerEvents = 'none'
      }
      else if (this.buildLabel == 'DCC') {
        currFloor.style.pointerEvents = 'auto'
        currFloor.style.opacity = 1
      }
      console.log(this.buildLabel)
    }
  },
  data() {
    return {
      threshold: 1,
      doResize: "",
      floorSelected: ""
    }
  },
  mounted() {
    let colors = [
      "#fdfedc",
      "#fef6c0",
      "#feeea4",
      "#fdd884",
      "#fdc675",
      "#fcad60",
      "#f99a57",
      "#f57948",
      "#eb6045",
      "#d7434b",
      "#c9314b",
      "#9e0041",
      "var(--roomfill)",
      "var(--roomfill)",
      "var(--roomfill)",
      "var(--roomfill)",
      "var(--roomfill)",
      "var(--roomfill)",
      "var(--roomfill)",
      "var(--roomfill)",
      "var(--roomfill)",
      "var(--roomfill)",
      "var(--roomfill)",
      "var(--roomfill)",
      "var(--roomfill)",
      "var(--roomfill)",
      "var(--roomfill)"
    ]

    window.addEventListener("resize", this.windowResizeTimeout)
    this.windowEventHandler()

    for (const f of dcc1.children) {
      if (f != floor) {
        let randColor = colors[Math.floor(Math.random() * colors.length)]
        f.style.fill = randColor
        f.addEventListener("click", () => { this.roomSelect(f) })
      }
    }
  },
  methods: {
    /* TODO: Does not work in this component. must be in dcc component. find new solution*/
    bringToFront(f) {
      let group = f.parentNode
      group.appendChild(f)
    },
    windowResizeTimeout() {
      console.log(this.unselected)
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
    roomSelect(f) {
      if (this.floorSelected == "") {
        f.style.fill = "#3aeab5"
        f.style.stroke = "#20c05b6f"
        f.style.strokeWidth = "15px"
      }
      else {
        this.floorSelected.style.fill = "var(--roomfill)"
        this.floorSelected.style.stroke = "var(--buildbord)"
        this.floorSelected.style.strokeWidth = "9px"

        f.style.fill = "#3aeab5"
        f.style.stroke = "#20c05b6f"
        f.style.strokeWidth = "15px"
      }
      this.floorSelected = f
      bringToFront(f)
    }
  }
}
</script>

<style scoped>
/*TODO: Make floor centered by means of flex box or calculations*/
#currFloor {
  width: 50px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(1) scaleX(1) scaleY(1) rotate(0) skew(0deg, 0deg);
  justify-content: center;
  align-items: center;
  pointer-events: all;
  display: inline-block;
  z-index: 6;
  background: none;
  fill: var(--buildfill);
  stroke: var(--buildbord);
  stroke-width: 9px;
  will-change: transform;
  transition: 800ms ease all;
  pointer-events: none;
  opacity: 0;
  position: absolute;
}
</style>