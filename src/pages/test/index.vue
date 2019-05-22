<template lang="jade">
  wxhtml:view#container
    p 123
</template>

<script>
export default {
  name: 'test'
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
