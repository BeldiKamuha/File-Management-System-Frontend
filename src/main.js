// src/main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';

// Import Bootstrap and BootstrapVue CSS files
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Import BootstrapVue
import BootstrapVue from 'bootstrap-vue';

// Use BootstrapVue
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');