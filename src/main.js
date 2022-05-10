import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts';
import '@/assets/css/reset.less'
import 'echarts-wordcloud'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//需要挂载到Vue原型上
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
const dashboardFlexible = require('lib-flexible-for-dashboard');
dashboardFlexible.init(16/9)
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
