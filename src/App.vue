<!--
 * @Descripttion: 
 * @version: 
 * @Author: cholee
 * @Date: 2020-08-25 17:21:00
 * @LastEditors: cholee
 * @LastEditTime: 2020-08-26 10:12:23
-->
<template>
  <router-view />
</template>

<script>
/**
 * @author lichao
 * @version 1.0.0
 * @description 组件使用和测试
 */

export default {
  name: "App",
  // 注册组件
  components: {},
  data() {
    // TODO 初始化数据
    return {};
  },
  methods: {},
  mounted() {
    this.$router.push({ path: "/index" });
  },
};
</script>
<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>

