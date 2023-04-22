<script setup>
import moment from 'moment-timezone'
</script>

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
  inject: ["global"],
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
          this.global.room = ""
        }
        else this.svg = await getSvgFloor(floor)
      },
      immediate: true,
    },
  },
  updated() {
    this.$nextTick(() => {
      this.applyRoomColors()
    })
  },
  methods: {
    getBldg() { return this.global.data[this.global.bldg] },
    getColor(minutes) {
      const colors = [
        "#66e099", // 4 hours (240 minutes)
        "#aeea77", // 2 hours (120 minutes)
        "#d8ed80", // 1 hour (60 minutes)
        "#feeea4", // 30 minutes free
        "#fdc675", // 15 minutes free
        "#f99a57", // 10 minutes free
        "#fc4e58", // occupied
      ]

      if (minutes >= 240) return colors[0]
      if (minutes >= 120) return colors[1]
      if (minutes >= 60)  return colors[2]
      if (minutes >= 30)  return colors[3]
      if (minutes >= 15)  return colors[4]
      if (minutes >= 10)  return colors[5]
      else return colors[6]
    },
    roomSelect(path) {
      let roomName = path.id.substr(1)
      if (!this.getBldg()[roomName]) {
        this.currRoom.remove();
        this.currRoom = null
        this.roomLabel = ""
      }
      else {
        if (this.currRoom != null) 
          this.currRoom.remove();
        this.currRoom = path
        this.roomLabel = path.id.substr(1)
        const clonedPath = path.cloneNode(true);
        path.parentNode.appendChild(clonedPath);
        this.currRoom = clonedPath;
        setTimeout(() => {
          clonedPath.setAttribute("class", "selected");
        }, 10);
      }
      this.global.room = this.roomLabel
    },
    applyRoomColors() {
      const svgComponent = this.$refs.svgComponent

      if (svgComponent && svgComponent.$el) {
        const paths = svgComponent.$el.querySelectorAll("path")

        paths.forEach((path) => {
          let roomName = path.getAttribute("id").substr(1);
          let roomInfo = this.getBldg()[roomName];
          if (roomInfo) {
            path.addEventListener("mouseover", () => { this.$emit('room-hover', roomName) })
            path.addEventListener("mouseleave", () => { this.$emit('room-hover', '')  } )

            if (roomInfo.meta.cur) {
              path.setAttribute("fill", "#fc4e58");
              path.setAttribute("cursor", "pointer")
            }
            else if (!roomInfo.meta.next) { // weekends
              path.setAttribute("fill", "#0eeb6f");
              path.setAttribute("cursor", "pointer")
            }
            else {
              const initial = moment(this.global.time, 'e:HHmm')
              const final = roomInfo.meta.next[2]
              const next = moment.duration(final.diff(initial)).asMinutes()
              path.setAttribute("fill", this.getColor(next));
              path.setAttribute("cursor", "pointer")
            }
          }
          else if (roomName != 'loor') {
            path.setAttribute("fill", "var(--unusedfill)")
            path.setAttribute("cursor","not-allowed")
          }
          path.setAttribute("pointer-events", "all");
          path.addEventListener("click", () => { this.roomSelect(path); })
        })
      }
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
  stroke: #007160 !important;
  transition: stroke-width 0.2s ease-in-out, stroke 0.2s ease-in-out;
  stroke-width: 15px;
  z-index: 6;
  position: absolute;
}
</style>