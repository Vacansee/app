<script setup>
import moment from 'moment-timezone'
</script>

<template>
    <!-- HTML for the popup -->
    <div id="popup">
        <div id="popup-head"> 
            <div id="popupbuild">
                {{ global.bldg }}
                <span v-if="global.bldg"> > Floor {{ global.floor }}</span>
                <span v-if="!noneSelected()"> > Room {{ global.room }}</span>
            </div>
        </div>
        <div v-if="global.bldg" class="body">
            <div class="block">
                <div id="photo-box">
                    <img src="../../assets/photos/DCC.jpg" id="photo">
                    <!-- <img :src="`../../assets/photos/${global.bldg}.jpg`" id="photo"> -->
                    <span>{{ getBldg().meta.name }}</span>
                </div>
                <p id="busy"><b>{{ interpretHeat() }}</b> ({{ getBldg().meta.heat }}%)</p>
                <p id="time" ref="mySpan">{{ getRealTime(global.time) }}</p>
            </div>
            <p></p>
            <div v-if="noneSelected()" class="block warn">No room selected</div>
            <div v-else-if="noData()" class="block warn">No classes in room</div>
            <div v-else> <!-- Room w/ data selected -->
                <div class="block">
                    <span>Capacity: ~{{ getData().meta.max }}&emsp;&emsp;</span>
                    <span>Printers: {{ getPrinters() }}&emsp;&emsp;</span>
                    <p v-if="getData().meta.cur"><b>{{ getData().meta.cur[0] }}</b> ends in
                        <b>{{ getCur().hours() }}h</b> and
                        <b>{{ getCur().minutes() }}m</b>
                        <span v-if="getSecs('cur')>0"> for section{{(getSecs('cur') > 1) ? 's':''}}</span>
                        <span v-for="item in getData().meta.cur[1]" class="sec">{{ item }}</span>
                    </p>
                    <p v-else>No class in session</p>
                    <p v-if="getData().meta.next">Next class (<b>{{ getData().meta.next[0] }}</b>) starts in
                        <b>{{ getNext().hours() }}h</b> and
                        <b>{{ getNext().minutes() }}m</b>
                        <span v-if="getSecs('next')>0"> for section{{(getSecs('next') > 1) ? 's':''}}</span>
                        <span v-for="item in getData().meta.next[1]" class="sec">{{ item }}</span>
                    </p>
                    <p v-else class="warn"> No more classes this week</p>
                </div>
                <div class="block">
                    <b v-if="getData().meta.next">Today</b>
                    <table>
                        <tr v-for="item in getTodaysClasses()">
                            {{ item[0] }}
                            <td>{{ item[1] }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    // Gets reference to global
    inject: ['global'],
    watch: {
        'global.aspectRatio': {
            handler() {
                // If landscape mode
                if (this.global.aspectRatio <= 1.2) {
                    popup.style.height = "100vh"
                    popup.style.width = "33vw"
                    popup.style.borderRadius = "0 15px 15px 0"
                    buttonBox.style.bottom = "5vh"
                } else { // If portrait mode
                    popup.style.height = "50vh"
                    popup.style.width = "100vw"
                    popup.style.borderRadius = "15px 15px 0 0"
                    buttonBox.style.bottom = "52vh"
                }
            }
        }
    },
    mounted() {
        if (this.global.aspectRatio <= 1.2) {
                popup.style.height = "100vh"
                popup.style.width = "33vw"
                popup.style.borderRadius = "0 15px 15px 0"
                buttonBox.style.bottom = "5vh"
        } else { // If portrait mode
                popup.style.height = "50vh"
                popup.style.width = "100vw"
                popup.style.borderRadius = "15px 15px 0 0"
                buttonBox.style.bottom = "52vh"
        }
    },
    methods: {
        // return if a room is selected
        noneSelected() { return !this.global.room },
        // Returns the current building
        getBldg() { return this.global.data[this.global.bldg] },
        noData() { return !this.getBldg().hasOwnProperty(this.global.room) },
        getSecs(type) { 
            switch(type) {
                case  'cur': return this.getData().meta.cur[1].length
                case 'next': return this.getData().meta.next[1].length
            }
        },
        // Gets the cur from meta data
        getCur() {
            const i = moment(this.global.time, 'e:HHmm'), f = this.getData().meta.cur[2]
            return moment.duration(f.diff(i))
        },
        // Gets next from meta data
        getNext() {
            const i = moment(this.global.time, 'e:HHmm'), f = this.getData().meta.next[2]
            return moment.duration(f.diff(i))
        },
        // Returns all data for the current room
        getData() { return this.getBldg()[this.global.room] },
        // Gets the current time
        getRealTime(date) { return moment(date, 'e:HHmm').tz('America/New_York').format('h:mm A') },
        // Returns the printers in a building
        getPrinters() {
            if (!this.getBldg().meta.hasOwnProperty("printers")) return 'none'
            else return this.getBldg().meta.printers
        },
        // Gathers the classes for the building
        getTodaysClasses() {
            let classes = []
            let roomData = this.getData() 
            for (let time in roomData) {
                if (time.split(':')[0] == this.global.time.split(':')[0])
                    classes.push([roomData[time][0], this.getRealTime(time)])
            } return classes
        },
        // Turns the heat from a number into a representative phrase
        interpretHeat() {
            let heat = this.getBldg().meta.heat
            if (heat > 80) return 'very busy'
            else if (heat > 60) return 'busy'
            else if (heat > 40) return 'usual'
            else if (heat > 10) return 'not busy'
            else return 'vacant'
        }
    }
}
</script>

<style scoped>
#popup {
    width: 100vw;
    min-width: 400px;
    height: 50vh;
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
    border-radius: 15px 15px 0 0;
    overflow-x: hidden;
    overflow-y: auto;
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

#photo {
    min-width: 300px;
    max-width: 70%;
    display: block;
    margin-left: auto;
    margin-right: auto;

    border-radius: 10px;
    display: flex;
}

#photo-box {
    text-align: center;
}

#busy {
    font-size: larger;
    line-height: 0;
    text-align: center;
}

#time {
    text-align: center;
    color: var(--hardborder);
}

table, td {
    line-height: 2.5;
    padding-left: 15px;
}

table {
    width: 80% !important;
    min-width: 350px;
    padding-bottom: 15px;
}

td {
  border-left: solid 1px var(--softborder);
}

tr:nth-child(even) {
    background-color: #d4e5e280;
}

.warn {
    color: red;
    text-align: center;
    font-weight: 500;
}
.code {
    font-size: 15px;
    color: #902a00;
}

.sec {
    padding: 1px 5px 2px 5px;
    margin: 3px;
    background-color: var(--roomfill);
    border-radius: 30%;
}

.block {
    /* background-color: paleturquoise; */
    margin: 10px;
    padding: 10px;    
    border-radius: 10px;
    border: 1px solid var(--softborder);
}

.body {
    margin-top: 50px;
}

li {
    line-height: 1.5;
}


</style>
