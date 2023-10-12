<script setup>
// Basic imports
import moment from 'moment-timezone'
import tinycolor from "tinycolor2";
</script>

<template>
  <div id="svgFloor">
    <component :is="floorSVG" ref="svgComponent"></component>
  </div>
</template>
  
<script>
const getFloorSVG = async (floor) => {
  const module = await import(`../../assets/floors/${floor}.svg`)
  return module.default
}

export default {
  // Get references to global
  inject: ["global"],
  props: ["floor"],
  data() {
    return { // Local variables
      floorSVG: null,
      roomSVG: null,
    }
  },
  watch: {
    floor: {
      // When floor changes, run this code
      async handler(floor) {
        if (floor == "") {
          this.floorSVG = null;
          if (this.roomSVG != null)
            this.roomSVG.removeAttribute("id", "selected");
          this.roomSVG = null;
          this.global.room = ""
        }
        else this.floorSVG = await getFloorSVG(floor)
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
    // Gets the current building
    getBldg() { return this.global.data[this.global.bldg] },
    // get room color corresponding to room availability
    getColor(minutes) {
      const colors = [
        "#66e099", // 4 hours (240 minutes)
        "#aeea77", // 2 hours (120 minutes)
        "#d8ed80", // 1 hour (60 minutes)
        "#fce68e", // 30 minutes free
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
    roomSelect(path) { // Select the room needed
      let roomName = path.id.substr(1)
      if (!this.getBldg()[roomName]) {
        if (this.roomSVG != null) this.roomSVG.remove()
        this.roomSVG = null
        this.global.room = ""
      }
      else {
        if (this.roomSVG != null) 
          this.roomSVG.remove();
        this.roomSVG = path
        this.global.room = path.id.substr(1)
        const clonedPath = path.cloneNode(true);
        path.parentNode.appendChild(clonedPath);
        this.roomSVG = clonedPath;
        setTimeout(() => {
          clonedPath.setAttribute("id", "selected");
          let border = tinycolor(path.getAttribute("fill")).darken(30).toString();
          clonedPath.style.stroke = border
        }, 10);
      }
    },
    applyRoomColors() { // Apply the room color to the popup
      const svgComponent = this.$refs.svgComponent

      if (svgComponent && svgComponent.$el) {
        const paths = svgComponent.$el.querySelectorAll("path")

        paths.forEach((path) => {
          let roomID = path.getAttribute("id");
          let roomName = roomID.substr(1);
          let roomInfo = this.getBldg()[roomName];
          
          if (roomID != 'floor' && !roomID.includes('excavated')) {
            if (roomInfo)
              path.addEventListener("mouseover", () => { this.$emit('room-hover', [roomName, true]) })
            else path.addEventListener("mouseover", () => { this.$emit('room-hover', [roomName, false]) })

            path.addEventListener("mouseleave", () => { this.$emit('room-hover', ['', false])  } )
          }
          if (roomInfo) {
            if (roomInfo.meta.cur) {
              path.setAttribute("fill", "#fc4e58");
              let border = tinycolor("#fc4e58").darken(20).toString()
              path.style.stroke = border
              path.setAttribute("cursor", "pointer")
            }
            else if (!roomInfo.meta.next) { // weekends
              path.setAttribute("fill", "#0eeb6f");
              let border = tinycolor("#0eeb6f").darken(20).toString()
              path.style.stroke = border
              path.setAttribute("cursor", "pointer")
            }
            else {
              let initial = moment(this.global.time, 'e:HHmm'), final = roomInfo.meta.next[2]
              let next = moment.duration(final.diff(initial)).asMinutes()
              let fill = this.getColor(next)
              path.setAttribute("fill", fill);
              let border = tinycolor(fill).darken(25).toString();
              path.style.stroke = border
              path.setAttribute("cursor", "pointer")
            }
          }
          else { // !roomInfo
            path.setAttribute("cursor","not-allowed")
            if (roomID.includes('excavated')) path.setAttribute("fill", "var(--hardborder)")
            if (roomID != 'floor') // rooms w/o classes:
              path.setAttribute("fill", "var(--unusedfill)")
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

#selected {
  opacity: 1 !important;
  transition: stroke-width 0.2s ease-in-out, stroke 0.2s ease-in-out;
  stroke-width: 15px;
  z-index: 6;
  position: absolute;
}
</style>