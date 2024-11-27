// src/router.js

import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './components/Home.vue';
import DirectoryView from './components/Directory.vue';
import FileDetails from './components/FileDetails.vue';

Vue.use(Router);

export default new Router({
  mode: 'history', // Optional: Use history mode for cleaner URLs
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/directory/:id',
      name: 'Directory',
      component: DirectoryView,
    },
    {
      path: '/file/:id',
      name: 'FileDetails',
      component: FileDetails,
    },
    // Optional: Add a catch-all route for 404 Not Found pages
    {
      path: '*',
      redirect: '/',
    },
  ],
});