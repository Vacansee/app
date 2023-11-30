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
        <RouterLink to="/"> <Logo class="logo" height="75" width="75"/>
        </RouterLink>
        <div class="search">
          <AutoComplete v-model="selection" placeholder="Search for a building or class..." :suggestions="filteredResults" @complete="filterResults" @item-select="searchFunc"></AutoComplete> 
        </div>
      </div>

      <div class="right-nav">
        <a href="mailto:rpi.vacansee@gmail.com"><Button class="nav-btn" aria-label="Feedback" >
            <img src="./assets/icons/poll.svg" height="25" width="25"/>
        </Button></a>
        <a href="https://github.com/Vacansee"><Button class="nav-btn" aria-label="GitHub" >
            <img src="./assets/icons/github.svg" height="25" width="25"/>
        </Button></a>
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
  margin: 0 1rem 0 0;
  pointer-events: all;
}

.nav-btn {
  margin: .5rem;
  width: 3.25rem;
  height: 3.25rem;
  justify-content: center;
  background-color: var(--unusedfill);
  border: 2px solid var(--buildbord);
  box-shadow: 0px 5px 25px rgba(0, 10, 20, 0.05);
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
  border: 2px solid var(--walkpath);
  box-shadow: 0px 5px 25px rgba(0, 10, 20, 0.05);
  border-radius: 10px;
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
