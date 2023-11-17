<script setup>
// Basic Imports
import { RouterLink, RouterView } from 'vue-router'
import Logo from '@/assets/logo.svg?component'
import AutoComplete from 'primevue/autocomplete'
import Button from "primevue/button"
import Toast from 'primevue/toast'
</script>

<template>
  <Toast/>
  <!-- HTML For Header -->
  <header id="header" v-bind:class="{ 'homePageLogo': $route.path == '/' }">
    
      <div class="left-nav">
        <RouterLink to="/"> <Logo class="logo" height="75" width="75"/> </RouterLink>
        <div class="search">
          <AutoComplete v-model="selection" placeholder="Search for a building or class..." :suggestions="filteredResults" @complete="filterResults" @item-select="searchFunc"></AutoComplete> 
        </div>
      </div>

      <div class="right-nav">
        <a href="mailto:rpi.vacansee@gmail.com"><Button class="nav-btn">
            <img src="./assets/icons/poll.svg" height="30" width="30" />
        </Button></a>
        <a href="https://github.com/Vacansee"><Button class="nav-btn">
            <img src="./assets/icons/github.svg" height="30" width="30"/>
        </Button></a>
      </div>

      <div class="bot-right-nav">
        <Button class="nav-btn" @click="getLocation">
            <img src="./assets/icons/location.svg" height="30" width="30"/>
        </Button>
      </div>
  </header>


  <RouterView />
</template>

<script>
export default {
  data() {
    return {
      filteredResults: [],
      selection: ""
    }
  },
  inject: ["global"],
  watch: {
    'global.bldg': {
      handler() {
        this.$clearToasts()
        // Only shows header when a building is not selected
        if (this.global.bldg)
          document.getElementById("header").style.opacity = "0";
        else
          document.getElementById("header").style.opacity = "1";
      }
    },
    'global.error': {
      handler() {
        if (this.global.error) this.$showToast({title: 'Failed to load data', body: this.global.error})
      }
    }
  },
  methods: {
    filterResults(event) {
      // filter buildings and classes
      setTimeout(() => {
        this.filteredResults = [];
        Object.keys(this.global.data).map((bid) => {
          this.filteredResults.push(bid.toString() + " (" + this.global.data[bid].meta.name.toString() + ")");
        })
        this.filteredResults.sort();
        this.filteredResults = this.filteredResults.map((bid) => {
            return bid.replace(/_/g, ' ');
        })
        .filter((result) => {
            return result.toLowerCase().includes(event.query.toLowerCase());
        });
      }, 250);
    },
    searchFunc() {
      // select building or class here
      this.global.bldg = this.selection.substring(0, this.selection.indexOf("(") - 1);
      this.selection = "";
    }
  },
  methods: {
    getLocation() {
      navigator.geolocation.getCurrentPosition(this.locationObtained)
    },
    locationError(err) {
      this.$showToast({title: 'Failed to get location', body: err.message})
    },
    locationObtained(pos) {
      const crd = pos.coords;
      if (crd.accuracy > 50)  {
        this.$showToast({title: 'Location is too inaccurate to locate user', body: 'The accuracy is off by +/- ' + crd.accuracy + ' meters. Try checking your wifi connection.'})
        return
      }

      const eigthAndSageCoords = [42.733133, -73.683511]
      const fifteenthAndCollegeCoords = [42.726863, -73.678078]

      const scaleY = (crd.latitude - fifteenthAndCollegeCoords[0]) / (eigthAndSageCoords[0] - fifteenthAndCollegeCoords[0])
      const scaleX = (crd.longitude - fifteenthAndCollegeCoords[1]) / (eigthAndSageCoords[1] - fifteenthAndCollegeCoords[1])
      const svgX = 600 + scaleX * (65 - 600)
      const svgY = 1060 + scaleY * (478 - 1060)
      if(svgX < 0 || svgX > 1000 || svgY < 0 || svgY > 1200) {
        this.$showToast({title: 'Location is too far away from map'})
        return;
      }
      this.global.userCoords = [svgX, svgY]
      // console.log("Your current position is:");
      // console.log(`Latitude : ${crd.latitude}`);
      // console.log(`Longitude: ${crd.longitude}`);
      // console.log('svg coords: ' + svgX + ' '  + svgY)
      // console.log(`More or less ${crd.accuracy} meters.`);
    }
  }
}
</script>
<style scoped>
@import './assets/main.css';
/* Everything from here on in the file is  basic css */
.homePageLogo {
  position: absolute;
}

header {
  z-index: 7;
  display: flex;
  padding: 1rem;
}

.logo {
  display: block;
  margin: 0 1rem 0 0;
  pointer-events: all;
}

.nav-btn {
  margin: .5rem;
  pointer-events: all;
}

.left-nav {
  position: fixed;
  display: flex;
  pointer-events: none;
  padding: .5rem 1rem;
  top: 0;
  left: 0;
}

.search {
  align-self: center;
  pointer-events: all;
}

.right-nav {
  position: fixed;
  pointer-events: none;
  padding: .8rem 1rem;
  top: 0;
  right: 0;
}

.bot-right-nav {
  position: fixed;
  pointer-events: none;
  padding: .8rem 1rem;
  bottom: 0;
  right: 0;
}
</style>
