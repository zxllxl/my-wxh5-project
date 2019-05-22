/* eslint-disable */
import router from '../router'
import Vue from 'vue'
// import { ConfirmPlugin, ToastPlugin } from 'vux'
// Vue.use(ConfirmPlugin)
// Vue.use(ToastPlugin)
const wx = {
  navigateTo ({ url }) {
    console.log(url)
    router.push({ path: url })
  },
  redirectTo ({url}) {
    router.replace({ path: url })
  },
  navigateBack () {
    router.go(-1)
  },
  showToast ({title}) {
    /* Vue.$vux.toast.show({
      // 组件除show外的属性
      text: title
    }) */
  },
  // 模态框显示
  showModal ({title, content, success}) {
    /* Vue.$vux.confirm.show({
      title,
      content,
      // 组件除show外的属性
      onConfirm () {
        success && success({confirm: true, cancel: false})
      },
      onCancel () {
        success && success({confirm: false, cancel: true})
      }
    }) */
  }
}
window.wx = wx
export default wx
