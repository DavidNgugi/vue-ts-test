import Vue from 'vue'
import MyReaderRoot from './my-reader-root.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(MyReaderRoot),
}).$mount('#app')
