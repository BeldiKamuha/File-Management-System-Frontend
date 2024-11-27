import Vue from 'vue';
import App from './App.vue';

// Import Bootstrap and Bootstrap-Vue CSS files
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Import Bootstrap-Vue
import BootstrapVue from 'bootstrap-vue';

// Use Bootstrap-Vue
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');