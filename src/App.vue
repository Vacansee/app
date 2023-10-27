<script setup>
// Basic Imports
import { RouterLink, RouterView } from 'vue-router'
import Logo from '@/assets/logo.svg?component'
import AutoComplete from 'primevue/autocomplete';
import Button from "primevue/button"
import buildingSelect from '@/views/Home.vue'

</script>

<template>
  <!-- HTML For Header -->
  <header id="header" v-bind:class="{ 'homePageLogo': $route.path == '/' }">
    
      <div class="left-nav">
        <RouterLink to="/"> <Logo class="logo" height="75" width="75"/> </RouterLink>
        <div class="search">
          <AutoComplete v-model="selectedClass" placeholder="Search for a building or class..." :suggestions="filteredClasses" @complete="filterClasses" @item-select="searchFunc"></AutoComplete> 
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
  </header>


  <RouterView />
</template>

<script>
export default {
  data() {
    return {
      filteredClasses: [],
      selectedClass: ""
    }
  },
  inject: ["global"],
  watch: {
    'global.bldg': {
      handler() {
        // Only shows header when a building is not selected
        if (this.global.bldg)
          document.getElementById("header").style.opacity = "0";
        else
          document.getElementById("header").style.opacity = "1";

      }
    }
  },
  methods: {
    filterClasses(event) {
      setTimeout(() => {
        if (!event.query.trim().length) {
            this.filteredClasses = [...Object.keys(this.global.data)];
        } else {
            if(this.filteredClasses.length == 1) return buildingSelect(this.filteredClasses[0]);
            this.filteredClasses = Object.keys(this.global.data).filter((enteredClass) => {
                return enteredClass.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
      }, 250);
    },
    searchFunc(event) {
      // select building here
      buildingSelect(this.selectedClass);
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
</style>
