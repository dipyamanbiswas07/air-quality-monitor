import Vue from 'vue';
// eslint-disable-next-line import/no-named-default
import { default as dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
dayjs.extend(relativeTime);

Vue.prototype.dayjs = dayjs;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
