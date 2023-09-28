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
            <!-- <img src="../../assets/photos/DCC.jpg" alt="DCC" id="photo"> -->
            <span>{{ getBldg().meta.name }}&emsp;&emsp;</span>
            <span ref="mySpan">Current Time: {{ getRealTime(global.time) }}&emsp;&emsp;</span>
            <span>Building heat: <b>{{ interpretHeat() }}</b> ({{ getBldg().meta.heat }}%)&emsp;&emsp;</span>
            <p></p>
            <div v-if="noneSelected()" class="warn">No room selected</div>
            <div v-else-if="noData()" class="warn">No classes in room</div>
            <div v-else style="display: flex;">
                <div class="column">
                    <span>Capacity: ~{{ getData().meta.max }}&emsp;&emsp;</span>
                    <span>Printers: {{ getPrinters() }}&emsp;&emsp;</span>
                    <span>In session: <code class="code">{{ getData().meta.active }}</code>&emsp;&emsp;</span>
                    <p v-if="getData().meta.cur"><b>{{ getData().meta.cur[0] }}</b> ends in
                        <b>{{ getCur().hours() }}h</b> and
                        <b>{{ getCur().minutes() }}m</b>
                        <span v-if="hasSecs('cur')"> for sections </span>
                        <span v-for="item in getData().meta.cur[1]" class="sec">{{ item }}</span>
                    </p>
                    <p v-if="getData().meta.next">Next class (<b>{{ getData().meta.next[0] }}</b>) starts in
                        <b>{{ getNext().hours() }}h</b> and
                        <b>{{ getNext().minutes() }}m</b>
                        <span v-if="hasSecs('next')"> for sections </span>
                        <span v-for="item in getData().meta.next[1]" class="sec">{{ item }}</span>
                    </p>
                    <p v-else class="warn"> No more classes this week</p>
                </div>
                <div class="column">
                    <b v-if="getData().meta.next">Today</b>
                    <ul>
                        <li v-for="item in getTodaysClasses()">
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

export default {
    inject: ['global'],
    watch: {
        'global.aspectRatio': {
            deep: true,
            handler() {
                // If landscape mode
                if (this.global.aspectRatio <= 1) {
                popup.style.height = "25vh"
                popup.style.width = "100vw"
                // If portrait mode
                } else {
                popup.style.height = "100vh"
                popup.style.width = "33vw"
                }
            }
        }
    },
    methods: {
        noneSelected() { return !this.global.room },
        getBldg() { return this.global.data[this.global.bldg] },
        noData() { return !this.getBldg().hasOwnProperty(this.global.room) },
        hasSecs(type) { 
            switch(type) {
                case  'cur': return (this.getData().meta.cur[1].length > 0)
                case 'next': return (this.getData().meta.next[1].length > 0)
            }
        },
        getCur() {
            const i = moment(this.global.time, 'e:HHmm'), f = this.getData().meta.cur[2]
            return moment.duration(f.diff(i))
        },
        getNext() {
            const i = moment(this.global.time, 'e:HHmm'), f = this.getData().meta.next[2]
            return moment.duration(f.diff(i))
        },
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
        },
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
    height: 25vh;
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

#photo {
    height: 175px;
    border-radius: 10px;
    display: flex;
}

.warn {
    color: red;
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

.column {
  flex: 50%;
}

.body {
    margin-top: 50px;
    margin-left: 25px;
}

li {
    line-height: 1.5;
}


</style>
