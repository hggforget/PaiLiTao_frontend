// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import test from './test'
// 引入axios
import axios from 'axios'
// 挂载到vue原型链上
Vue.use(ElementUI)
Vue.prototype.axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

new Vue({
  el: '#test',
  router,
  components: { test },
  template: '<test/>'
})
