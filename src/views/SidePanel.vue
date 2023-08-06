<script setup>
import Sidebar from 'primevue/sidebar'
import Header from './SidePanelHeader.vue'
import Hours from './SidePanelHours.vue'
import Occupancy from './SidePanelOccupancy.vue'
import FloorInteract from './FloorInteract.vue'
</script>

<template>
    <div class="relative flex w-screen h-full">
        <div class="w-23rem h-full">
            <Sidebar v-model:visible="visible" :showCloseIcon="false" class="w-23rem overflow-hidden h-full" :pt="{
                mask: { class: 'z-2' }
            }">
                <div class="flex flex-column h-full">
                    <Header />
                    <div id="occupancy" class="h-full flex flex-column justify-content-around">
                        <Hours />
                        <Occupancy :occupancyType="'Building'" />
                        <Occupancy :occupancyType="'Floor'" />
                    </div>
                </div>
            </Sidebar>
        </div>
        <div class="flex-grow-1 h-full z-3">
            <FloorInteract />
        </div>
    </div>
</template>

<script>
export default {
    inject: ["global"],
    data() {
        return {
            visible: false,
        };
    },
    computed: {
        panelZIndex() {
            return this.visible ? 'z-0' : 'z-0';
        }
    },
    watch: {
        'visible': {
            handler(newVal, oldVal) {
                if (!newVal) {
                    console.log("Sidebar is now invisible");
                    this.global.bldg = ''
                }
            }
        },
        'global.bldg': {
            handler(newBldg, oldBldg) {
                if (newBldg != oldBldg && newBldg != '') {
                    this.updatePanel();
                }
            }
        }
    },
    methods: {
        updatePanel() {
            this.visible = true;
        }
    }
}
</script>