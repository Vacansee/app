<!-- 
    Experimenting with creating a separate component so represent the slider button that will allow user to see classes that happen at different times
    Modified by Jos
 -->

<template>
    <div>
      <input v-model="timeValue" type="range" :min="min" :max="max" step="1">
      <button type="button" @click="play">Play</button>
    </div>
  </template>
  

<script>
export default {
  data() {
    return {
      timeValue: 0,
      min: 0,
      max: 5,
    };
  },
  methods: {
    play() {
      const interval = setInterval(() => {
        this.timeValue < this.max ? this.timeValue++ : clearInterval(interval);
      }, 1000);
    },
  },
};
</script>
