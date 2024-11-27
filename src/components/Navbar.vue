<!-- src/components/Navbar.vue -->
<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">File Management</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
  
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <!-- Add additional nav items here if needed -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </template>
  
  <script>
  export default {
    name: 'MainNavbar',
  };
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>