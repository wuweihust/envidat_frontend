// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vue2Filters from 'vue2-filters';
import App from './App';
import router from './router';
import store from './store/store';
import globalMethods from './components/globalMethods';

Vue.use(Vue2Filters);

Vue.use(Vuetify, {
  theme: {
    primary: '#00897B', // teal darken-1
    secondary: '#4DB6AC', // teal lighten-2
    accent: '#FFD740', // amber accent-2
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
});

Vue.config.productionTip = false;
Vue.config.error = function vueErrorHandling(error, vm, info) {
  /* eslint-disable no-param-reassign */
  console.log('vueErrorHandling ' + error + ' info ' + info);
  vm.store.error = error;
  vm.store.errorInfo = info;
};

window.onerror = function generalErrorHandling(msg, src, lineNo, colNo, error) {
  console.log('generalErrorHandling ' + error + ' msg ' + msg);
};

// console.log('window.onerror '+ window.onerror);

// window.onoffline = this.setOffline;
// window.ononline = this.setOnline;


Vue.mixin(globalMethods);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // mixins: [globalMethods],
  router,
  store,
  components: { App },
  template: '<App/>',
});
