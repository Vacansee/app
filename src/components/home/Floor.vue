<template>
  <div id="svgFloor">
    <component :is="svg" ref="svgComponent"></component>
  </div>
</template>
  
<script>
const getSvgFloor = async (floor) => {
  const module = await import(`../floors/${floor}.svg`)
  return module.default
}

export default {
  props: {
    floor: String,
  },
  data() {
    return {
      svg: null,
      currRoom: null,
      roomLabel: "",
    }
  },
  watch: {
    floor: {
      async handler(floor) {
        if (floor == "") {
          this.svg = null;
          if (this.currRoom != null)
            this.currRoom.removeAttribute("class", "selected");
          this.currRoom = null;
          this.roomLabel = "";
          this.$state.curRoomLabel = ""
        }
        else
          this.svg = await getSvgFloor(floor)
      },
      immediate: true,
    },
  },
  updated() {
    this.$nextTick(() => {
      this.applyRandomColors()
    })
  },
  methods: {
    applyRandomColors() {
      const colors = [
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
      ]

      const svgComponent = this.$refs.svgComponent

      if (svgComponent && svgComponent.$el) {
        const paths = svgComponent.$el.querySelectorAll("path")

        paths.forEach((path) => {
          if (path.getAttribute("id") != "floor") {
            let randColor = colors[Math.floor(Math.random() * colors.length)]
            path.setAttribute("fill", randColor)
            path.setAttribute("pointer-events", "all");
            path.addEventListener("click", () => { this.roomSelect(path) })
          }
        })
      }
    },
    roomSelect(path) {
      if (this.currRoom == null) {
        this.currRoom = path
        this.roomLabel = path.id.replace(/_/g, '')
        path.setAttribute("class", "selected");
      }
      else {
        this.currRoom.removeAttribute("class", "selected");
        this.currRoom = path
        this.roomLabel = path.id.replace(/_/g, '')
        path.setAttribute("class", "selected");
      }
      this.$state.curRoomLabel = this.roomLabel
    }
  }
}
</script>
  
<style>
#svgFloor {
  fill: var(--roomfill);
  stroke: var(--buildbord);
  stroke-width: 9px;
  will-change: transform;
  transition: width linear 2s, height linear 2s, opacity .8s;
  width: 50px;
  background: none;
  pointer-events: none;
}

.selected {
  opacity: 1 !important;
  fill: var(--selectedfill) !important;
  z-index: 6;
}
</style>