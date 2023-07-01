import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import TypeNav from '@/components/TypeNav.vue'
Vue.component( TypeNav.name,TypeNav)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
