import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'

// Styles
import 'normalize.css'
import './plugins/element.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'

import '@/assets/scss/main.scss'

const fb = require('./firebaseConfig.js')

Vue.use(ElementUI)

Vue.config.productionTip = false

let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
