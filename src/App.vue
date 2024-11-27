<!-- src/App.vue -->
<template>
  <div id="app">
    <MainNavbar />
    <router-view />
  </div>
</template>

<script>
import MainNavbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    MainNavbar,
  },
};
</script>

<style>
/* Global styles can be added here */
</style>