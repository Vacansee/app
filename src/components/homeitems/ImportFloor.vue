<template>
    <div id="svgFloor">
      <component :is="svg" ref="svgComponent"></component>
    </div>
  </template>
  
  <script>
  const getSvgFloor = async (floor) => {
    const module = await import(`../flooritems/${floor}.svg`)
    return module.default
  }
  
  export default {
    props: {
      floor: String,
    },
    data() {
      return {
        svg: null,
      }
    },
    watch: {
      floor: {
        async handler(floor) {
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
  
        if (svgComponent) {
          const paths = svgComponent.$el.querySelectorAll("path")
  
          paths.forEach((path) => {
            let randColor = colors[Math.floor(Math.random() * colors.length)]
            path.setAttribute("fill", randColor)
          })
        }
      },
    },
  }
  </script>
  
<style scoped>
#svgFloor {
    fill: var(--roomfill);
    stroke: var(--buildbord);
    stroke-width: 9px;
    will-change: transform;
    transition: width linear 2s, height linear 2s, opacity .8s;
    width: 50px;
    background: none;
}
</style>