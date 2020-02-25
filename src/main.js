import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Styles
import 'normalize.css'
import '@/assets/scss/main.scss'
import './plugins/element.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
