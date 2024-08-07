// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/style.css'
import $ from 'jquery'
import Popper from 'popper.js'
import 'glider-js/glider.min.css'
import VueGlide from 'vue-glide-js'
import 'vue-glide-js/dist/vue-glide.css'
import VueSocialSharing from 'vue-social-sharing'

window.$ = $
window.Popper = Popper

Vue.config.productionTip = false

Vue.use(VueGlide)
Vue.use(VueSocialSharing)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
