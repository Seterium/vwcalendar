import Vue from 'vue'
import App from './App.vue'

import '@/assets/styles/index.scss'

Vue.config.productionTip = false

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js')
}

new Vue({
  render: h => h(App),
}).$mount('#app')
