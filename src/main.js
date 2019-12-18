import Vue from 'vue'
import App from './App.vue'

// bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// modal bootstrap-vue
import { ModalPlugin } from 'bootstrap-vue';
Vue.use(ModalPlugin);

// table bootstrap-vue
import { TablePlugin } from 'bootstrap-vue';
Vue.use(TablePlugin);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
