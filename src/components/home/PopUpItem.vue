<script setup>
import moment from 'moment-timezone'
</script>

<template>
    <div id="popup">
        <div id="popup-head"> 
            <div id="popupbuild">
                {{ global.bldg }}
                <span v-if="global.bldg"> > Floor {{ global.floor }}</span>
                <span v-if="!noneSelected()"> > Room {{ global.room }}</span>
            </div>
        </div>
        <div v-if="global.bldg" class="body">
            <span>{{ getBldg().meta.name }}ㅤㅤ</span>
            <span ref="mySpan">Current time: {{ getRealTime(global.time) }}ㅤㅤ</span>
            <span>Building heat: <b>{{ getBldg().meta.heat }}</b>ㅤㅤ</span>
            <p></p>
            <div v-if="noneSelected()" class="warn">No room selected</div>
            <div v-else-if="noData()" class="warn">No classes in room</div>
            <div v-else>
                <span>Capacity: ~{{ getData().meta.max }}ㅤㅤ</span>
                <span>Printers: {{ getPrinters() }}ㅤㅤ</span>
                <span>Active: <code class="code">{{ getData().meta.active }}</code>ㅤㅤ</span>
                <span v-if="getData().meta.cur"><b>{{ getData().meta.cur[0] }}</b> ends in
                    <b>{{ getData().meta.cur[1].hours() }}h</b> and
                    <b>{{ getData().meta.cur[1].minutes() }}m</b>ㅤㅤ</span>
                <span v-if="getData().meta.next">Next class (<b>{{ getData().meta.next[0] }}</b>) starts in
                    <b>{{ getData().meta.next[1].hours() }}h</b> and
                    <b>{{ getData().meta.next[1].minutes() }}m</b>ㅤㅤ</span>
                <span v-else class="warn"> No more classes this week!</span>
                <ul>
                    <li v-for="item in getTodaysClasses()">
                        {{ item }}
                    </li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    inject: ['global'],
    props: ['data'],
    methods: {
        noneSelected() { return !this.global.room },
        getBldg() { return this.global.data[this.global.bldg] },
        noData() { return !this.getBldg().hasOwnProperty(this.global.room) },
        getData() { return this.getBldg()[this.global.room] },
        getRealTime(date) { return moment(date, 'e:HHmm').tz('America/New_York').format('h:mm A') },
        getPrinters() {
            if (!this.getBldg().meta.hasOwnProperty("printers")) return 'none'
            else return this.getBldg().meta.printers
        },
        getTodaysClasses() {
            let classes = []
            let roomData = this.getData() 
            for (let time in roomData) {
                if (time.split(':')[0] == this.global.time.split(':')[0])
                    classes.push(roomData[time][0] + ' at ' + this.getRealTime(time))
            } return classes
        }
    }
}
</script>

<style scoped>
#popup {
    width: 100vw;
    height: 250px;
    position: absolute;
    pointer-events: all;
    display:inline-block;
    bottom: 0;
    z-index: 6;
    transform: translateY(250px);
    transition: transform .5s;
    box-sizing: border-box;
    background-color: white;
    border: 3px solid var(--softborder);
    border-bottom-style: none;
    box-shadow: 0px -2px 25px rgba(0, 0, 0, 0.08);
    border-radius: 30px 30px 0vh 0vh;
}

#popup-head {
    width: 100vw;
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

.warn {
    color: red;
    font-weight: 500;

}
.code {
    font-size: 15px;
    color: #902a00;
}

.body {
    margin-top: 50px;
    margin-left: 25px;
}

li {
    line-height: 1.5;
}


</style>
