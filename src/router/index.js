// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../components/Home.vue';
import DirectoryView from '../components/Directory.vue';
import FileDetails from '../components/FileDetails.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/directory/:id',
      name: 'Directory',
      component: Directory,
      props: true,
    },
    {
      path: '/file/:id',
      name: 'FileDetails',
      component: FileDetails,
      props: true,
    },
  ],
});