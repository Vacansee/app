<template>
    <div class="mode-toggle">
      <input type="checkbox" id="darkmode-toggle"/>
      <label class="darkmode-toggle" for="darkmode-toggle">
        <img class="sun" src="data:image/png;base64,..."/>
        <img class="moon" src="data:image/png;base64,..."/>
      </label>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      const toggleSwitch = document.querySelector('input#darkmode-toggle[type="checkbox"]');
      toggleSwitch.addEventListener('change', this.switchTheme, false);
      const currentTheme = localStorage.getItem('theme') || null;
      if (currentTheme) document.documentElement.setAttribute('data-theme', currentTheme);
      if (document.documentElement.getAttribute("data-theme") == "dark") {
        toggleSwitch.checked = true;
      }
    },
    methods: {
      switchTheme(e) {
        const isDark = e.target.checked;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
      }
    }
  }
  </script>
  