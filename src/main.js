import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './style/mycss.css'
import Resource from 'vue-resource'
import Icon from 'vue-svg-icon/Icon.vue';

Vue.use(Mint)
Vue.use(Resource)
Vue.component('icon',Icon)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
