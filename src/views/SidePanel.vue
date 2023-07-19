<script setup>
import Sidebar from 'primevue/sidebar'
import Header from './SidePanelHeader.vue'
import Hours from './SidePanelHours.vue'
import Occupancy from './SidePanelOccupancy.vue'
</script>

<template>
    <Sidebar v-model:visible="visible" :showCloseIcon="false" class="w-23rem">
    <Header />
    <Hours />
    <Occupancy />
    </Sidebar>
</template>

<script>
export default {
    inject: ["global"],
    data() {
        return {
            visible: false,
        };
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