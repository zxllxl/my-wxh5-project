// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuex from 'vuex'
import App from './AppH5'
import router from './router'
// import wxService from './api/wxService'
import store from './store'
import wx from 'wx'

Vue.config.productionTip = false
// Vue.use(Vuex)
Vue.mixin({
  data () {
    return {
      router: '/', // 路由路径
      imgSrc: 'http://static2.51eim.kuaiguo.net/Public/LifeQuan/Shop/v2' // 图片路径
    }
  },
  methods: {
    newroot () {
      return this.$route
    },
    navigatePageTo (url) {
      this.$router.push(url)
    },
    reLaunchPageTo (url) {
      this.$router.replace(url)
    }
  },
  created () {
    let w = document.documentElement.offsetWidth / 23.4375
    document.documentElement.style.fontSize = w + 'px'
    console.log(w)
    console.log('chrome')
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // el: 'body',
  router,
  components: { App },
  template: '<App/>',
  store,
  wx
})
