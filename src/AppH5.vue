<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0;
}
p {
  margin: 0;
}
img {
  max-width: 100%;
}
wxhtml\:view {
  display: block;
  box-sizing: border-box;
  word-break: break-all;
  /* overflow:auto; */
}
</style>