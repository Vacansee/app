<script setup>
</script>

<template>
    <div id="popup">
        <div id="popup-head"> 
            <div id="popupbuild">
                {{ $state.curBldgLabel }}
                <span v-if="$state.curBldgLabel"> > Floor {{ $state.curFloorNum }}</span>
                <span v-if="!noneSelected()"> > Room {{ $state.curRoomLabel }}</span>
            </div>
        </div>
        <div v-if="noneSelected()" class="body body-none">No room selected</div>
        <div v-else-if="noData()" class="body body-none">No classes in room</div>
        <div v-else class="body"> {{ roomData[$state.curBldgLabel][$state.curRoomLabel] }} </div>
    </div>

</template>

<script>

export default {
    props: ['roomData'],
    methods: {
        noneSelected() { return !this.$state.curRoomLabel },
        noData() { return !this.roomData[this.$state.curBldgLabel].hasOwnProperty(this.$state.curRoomLabel) }
    }
}
</script>

<style scoped>
#popup {
    width: 100vw;
    height: 200px;
    position: absolute;
    pointer-events: all;
    display:inline-block;
    bottom: 0;
    z-index: 6;
    transform: translateY(19vh);
    transition: transform .5s;
    box-sizing: border-box;
    background-color: white;
    border: 3px solid var(--softborder);
    border-bottom-style: none;
    box-shadow: 0px -2px 25px rgba(0, 0, 0, 0.08);
    border-radius: 3vh 3vh 0vh 0vh;
}

#popup-head {
    width: 100vw;
    border-radius: 3vh 3vh 0vh 0vh;
    height: 6vh;
    background-color: none;
    color: rgb(0, 0, 0);
    position: absolute;
    font-weight: 600;
    font-size: x-large;
}

#popupbuild {
    padding: 10px 20px;
}

.body-none {
    color: red;
    font-weight: 500;

}

.body {
    margin-top: 50px;
    margin-left: 25px;
}

</style>