// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueCookie from 'vue-cookies'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)
Vue.use(axios)
Vue.use(VueCookie)

// axios.defaults.baseURL = 'http://localhost:8080/api'
Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:8088/api',
  headers: {'Content-Type': 'Application/json;charset=utf-8'}
})

Vue.prototype.$cookie = VueCookie

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
