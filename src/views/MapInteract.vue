<template>
    <div id="mapbox">
        <div id="campussvg">
            <campus-svg ref="svgComponent" />
        </div>
    </div>
</template>
  
  
<script>
import CampusSvg from '@/assets/svgs/newMap.svg'

export default {
    components: {
        'campus-svg': CampusSvg
    },
    mounted() {
        this.applyColors()
    },
    methods: {
        applyColors() {
            const svgComponent = this.$refs.svgComponent

            if (svgComponent && svgComponent.$el) {
                // Get all the groups
                const groups = svgComponent.$el.querySelectorAll("g");

                groups.forEach((group) => {
                    // For each group, get all the paths
                    const paths = group.querySelectorAll("path");

                    if (group.id == 'boundary') {
                        paths.forEach((path) => {
                            path.setAttribute("fill", "var(--bg-boundary)")
                            path.setAttribute("cursor", "not-allowed")
                            const parentNode = path.parentNode;
                            console.log(parentNode.id);
                        })
                    }
                    else if (group.id == 'parking') {
                        paths.forEach((path) => {
                            path.setAttribute("fill", "var(--bg-parking)")
                            path.setAttribute("cursor", "not-allowed")
                            const parentNode = path.parentNode;
                            console.log(parentNode.id);
                        })
                    }
                    else if (group.id == 'grass') {
                        paths.forEach((path) => {
                            path.setAttribute("fill", "var(--bg-grass)")
                            path.setAttribute("cursor", "not-allowed")
                            const parentNode = path.parentNode;
                            console.log(parentNode.id);
                        })
                    }
                    else if (group.id == 'building' || group.id == 'other') {
                        paths.forEach((path) => {
                            path.setAttribute("fill", "var(--avail-0)")
                            path.setAttribute("stroke", "var(--avail-bord-0)")
                            path.setAttribute("stroke-width", "7px")
                            path.setAttribute("cursor", "not-allowed")
                            const parentNode = path.parentNode;
                            console.log(parentNode.id);
                        })
                    }
                    else if (group.id == 'thick-road') {
                        paths.forEach((path) => {
                            path.setAttribute("fill", "none")
                            path.setAttribute("stroke", "var(--bg-road)")
                            path.setAttribute("stroke-width", "20px")
                            path.setAttribute("cursor", "not-allowed")
                            const parentNode = path.parentNode;
                            console.log(parentNode.id);
                        })
                    }
                    else if (group.id == 'thin-road') {
                        paths.forEach((path) => {
                            path.setAttribute("fill", "none")
                            path.setAttribute("stroke", "var(--bg-road)")
                            path.setAttribute("stroke-width", "10px")
                            path.setAttribute("cursor", "not-allowed")
                            const parentNode = path.parentNode;
                            console.log(parentNode.id);
                        })
                    }
                    else if (group.id == 'stair') {
                        paths.forEach((path) => {
                            path.setAttribute("fill", "none")
                            path.setAttribute("stroke", "var(--bg-walkway)")
                            path.setAttribute("stroke-width", "3px")
                            path.setAttribute("cursor", "not-allowed")
                            const parentNode = path.parentNode;
                            console.log(parentNode.id);
                        })
                    }
                    else if (group.id == 'walkway') {
                        paths.forEach((path) => {
                            path.setAttribute("fill", "none")
                            path.setAttribute("stroke", "var(--bg-walkway)")
                            path.setAttribute("stroke-width", "3px")
                            path.setAttribute("cursor", "not-allowed")
                            const parentNode = path.parentNode;
                            console.log(parentNode.id);
                        })
                    }
                    else if (group.id == 'bridge') {
                        paths.forEach((path) => {
                            path.setAttribute("fill", "none")
                            path.setAttribute("stroke", "white")
                            path.setAttribute("stroke-width", "10px")
                            path.setAttribute("cursor", "not-allowed")
                            const parentNode = path.parentNode;
                            console.log(parentNode.id);
                        })
                    }
                });
            }
        },
    }
}
</script>

<style scoped>
#mapBox {
    position: absolute;
    left: 50%;
    top: 50%;
    will-change: transform;
    transform: translate(-50%, -50%) scale(1) scaleX(1) scaleY(1) rotate(0) skew(0deg, 0deg);
    justify-content: center;
    align-items: center;
    transition: 800ms ease all;
}

#map {
    /* startup properties (replaced): */
    opacity: 0;
    transition: width linear 2s, height linear 2s, opacity .8s;
    width: 50px;
    will-change: transform;
}

#buildings path {
    cursor: pointer;
    fill: var(--buildfill);
    stroke: var(--buildbord);
    stroke-width: 1px;
    transition-duration: .2s;
    transition: fill 0.5s;
    will-change: transform;
}

#other path {
    fill: var(--buildfill);
    stroke: var(--buildbord);
    stroke-width: 1px;
}

#bg {
    fill: none;
}

#roadlarge {
    stroke: var(--carroad);
    stroke-width: 9px;
}

#roadmed path {
    stroke: var(--carroad);
    stroke-width: 4px;
}

#roadsmall path {
    stroke: var(--carroad);
    stroke-width: 3px;
}

#roadtop path {
    fill: none;
    stroke: var(--carroad);
    stroke-width: 3px;
}

#walktop path {
    fill: none;
    stroke: var(--walkpath);
    stroke-width: 1px;
}

#walk path {
    stroke: var(--walkpath);
    stroke-width: 1px;
}

#stair path {
    stroke: var(--walkpath);
    stroke-width: 3px;
    stroke-dasharray: 1px;
}
</style>