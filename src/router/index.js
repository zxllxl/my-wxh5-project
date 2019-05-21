import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index/index.vue'
import counter from '../pages/counter/index.vue'
import logs from '../pages/logs/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history', // 去掉url中的#
  routes: [{
    path: '/',
    name: 'index',
    component: index,
    alias: '/pages/index/main'
  },
  {
    path: '/counter',
    name: 'counter',
    component: counter,
    alias: '/pages/counter/main'
  },
  {
    path: '/logs',
    name: 'logs',
    component: logs,
    alias: '/pages/logs/main'
  }]
})
