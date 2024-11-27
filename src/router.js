// src/router.js
import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import Directory from './components/Directory.vue';
import FileDetails from './components/FileDetails.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/directory/:id', component: Directory, props: true },
    { path: '/file/:id', component: FileDetails, props: true },
  ],
});