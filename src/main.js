import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store' 
import VueResource from 'vue-resource'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueResource);
Vue.config.productionTip = false
// Vue.filter('currency', function (value) {
//   return parseFloat(value).toLocaleString();
// });
Vue.filter('currency', function (value) {
  return '₹' + parseFloat(value).toLocaleString();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
