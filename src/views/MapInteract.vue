<template>
    <div id="campus-map">
        <campus-svg ref="svgComponent" />
    </div>
</template>
  
<script>
import CampusSvg from '@/assets/svgs/campus.svg'

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
                const groups = svgComponent.$el.querySelectorAll("g");
                groups.forEach((group) => {
                    this.styleGroups(group)
                });
            }
        },
        styleGroups(group) {
            const paths = group.querySelectorAll("path");
            if (group.id == 'boundary')
                this.styleHelper(paths, "var(--bg-boundary)", "none", 0)
            else if (group.id == 'parking')
                this.styleHelper(paths, "var(--bg-parking)", "none", 0)
            else if (group.id == 'grass')
                this.styleHelper(paths, "var(--bg-grass)", "none", 0)
            else if (group.id == 'building' || group.id == 'other')
                this.styleHelper(paths, "var(--bg-parking)", "none", 0)
            else if (group.id == 'thick-road')
                this.styleHelper(paths, "none", "var(--bg-road)", 20)
            else if (group.id == 'thin-road')
                this.styleHelper(paths, "none", "var(--bg-road)", 10)
            else if (group.id == 'stair')
                this.styleHelper(paths, "none", "var(--bg-walkway)", 3)
            else if (group.id == 'walkway')
                this.styleHelper(paths, "none", "var(--bg-walkway)", 3)
            else if (group.id == 'bridge')
                this.styleHelper(paths, "none", "white", 10)
        },
        styleHelper(paths, fillCol, strokeCol, strokeWid) {
            paths.forEach((path) => {
                path.setAttribute("fill", fillCol)
                path.setAttribute("stroke", strokeCol)
                path.setAttribute("stroke-width", strokeWid + "px")
            });
        }
    }
}
</script>

<style>
#campus-map {
    width: 133vh;
    margin-left: 50vw;
    will-change: transform;
    transform: translateX(-50%);
}

@media only screen and (min-width: 768px) {
    #campus-map {
        width: 133vw;
        margin-top: 50vh;
        transform: translateX(-50%) translateY(-50%) rotate(90deg);
    }
}
</style>