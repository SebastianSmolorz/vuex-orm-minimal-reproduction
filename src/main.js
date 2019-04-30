import Vue from 'vue'
import App from './App.vue'
import "core-js/es/object/values"

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
