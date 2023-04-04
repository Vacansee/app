<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <TheWelcome :roomsJSON="roomsJSON" />
  </main>
</template>


<script>
export default {
  components: {
    TheWelcome,
  },
  data() {
    return {
      roomsJSON: null,
    };
  },
  async created() {
    await this.fetchRooms();
  },
  methods: {
    async fetchRooms() {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Vacansee/data/main/rooms.json');
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        else console.log('')
        this.roomsJSON = await response.json();
      } catch (error) {
        console.error('Error fetching rooms.json:', error);
      }
    },
  },
};
</script>
