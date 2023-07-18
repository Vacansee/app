<template>
    <div id="campus-map">
        <campus-svg ref="svgComponent" />
    </div>
</template>
  
<script>
import CampusSvg from '@/assets/svgs/campus.svg'

export default {
    inject: ["global"],
    components: {
        'campus-svg': CampusSvg
    },
    watch: {
        'global.firstCalc': {
            deep: true,
            handler() {
                if (this.global.firstCalc) {
                    this.applyColors();
                }
            }
        }
    },
    updated() {
        this.$nextTick(() => {
            this.applyColors()
        })
    },
    methods: {
        applyColors() {
            const svgComponent = this.$refs.svgComponent

            if (svgComponent && svgComponent.$el) {
                const buildings = svgComponent.$el.querySelectorAll("#building");
                buildings.forEach((building) => {
                    const paths = building.querySelectorAll('path');
                    paths.forEach((path) => {
                        let bldngHeat = 0
                        try {
                            bldngHeat = this.global.data[path.id].meta.heat
                        } catch {}
                        if (bldngHeat >= 75) this.pathStyle(path, 1)
                        else if (bldngHeat >= 50) this.pathStyle(path, 2)
                        else if (bldngHeat >= 25) this.pathStyle(path, 3)
                        else this.pathStyle(path, 4)
                    });
                    building.addEventListener('click', this.selectBuilding);
                });
            }
        },
        pathStyle(path, number) {
            path.style.fill = 'var(--avail-' + number + ')'
            path.style.stroke = 'var(--avail-bord-' + number + ')'
            path.style.strokeWidth = '5'
        },
        selectBuilding(event) {
            this.global.bldg = event.target.id
            console.log(this.global.bldg)
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

#boundary path {
    fill: var(--bg-boundary);
    stroke: none;
    stroke-width: 0;
}

#parking path {
    fill: var(--bg-parking);
    stroke: none;
    stroke-width: 0;
}

#grass path {
    fill: var(--bg-grass);
    stroke: none;
    stroke-width: 0;
}

#building path,
#other path {
    fill: var(--avail-0);
    stroke: var(--avail-bord-0);
    stroke-width: 5;
    transition: 0.5s ease;
}

#thick-road path {
    fill: none;
    stroke: var(--bg-road);
    stroke-width: 20px;
}

#thin-road path {
    fill: none;
    stroke: var(--bg-road);
    stroke-width: 10px;
}

#stair path {
    fill: none;
    stroke: var(--bg-walkway);
    stroke-width: 3px;
}

#walkway path {
    fill: none;
    stroke: var(--bg-walkway);
    stroke-width: 3px;
}

#bridge path {
    fill: none;
    stroke: white;
    stroke-width: 10px;
}
</style>