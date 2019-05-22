<template lang="jade">
  wxhtml:view#container(@click='bindViewTap')
    p 123
</template>

<script>
export default {
  name: 'test',
  methods: {
    bindViewTap () {
      const url = '../logs/main'
      // wx.navigateTo({url})
      console.log(url)
      console.log(this.$store.state.banner)
      console.log(this.router)
      wx.showToast({title: '操作成功！'})
    }
  }
}
</script>

<style lang="less" scoped>
@rpx: 32rem;

#container {
  display: block;
  width: 100/@rpx;
  height: 100/@rpx;
  background: #f0f;
}
p {
  color: #fff;
}
</style>
