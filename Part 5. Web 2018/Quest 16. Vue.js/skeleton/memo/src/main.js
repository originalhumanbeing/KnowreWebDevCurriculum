import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

// Vue.use(VueRouter);
// export default new VueRouter({
//     routes: [
//         {
//             path: '/',
//             name: 'index',
//             component: App
//         }
//     ]
// })
