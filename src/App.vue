<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
  >
    <el-menu-item @click="routerPush('/')" index="1">首页</el-menu-item>
    <el-menu-item @click="routerPush('/download')" index="2">下载</el-menu-item>
    <el-menu-item @click="routerPush('/web')" index="3">网站</el-menu-item>
  </el-menu>
  <router-view />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import router from './router'

const activeIndex = ref('1')
const routerPush = (Path: string) => {
  router.push(Path)
}
</script>

<style scoped>
:deep(.el-menu--horizontal) {
  background-color: transparent !important;
  border-bottom: none;
}

:deep(.el-menu--horizontal > .el-menu-item) {
  color: var(--text-color) !important;
  transition: all 0.3s ease;
}

:deep(.el-menu--horizontal > .el-menu-item:hover),
:deep(.el-menu--horizontal > .el-menu-item.is-active) {
  background-color: rgba(0, 0, 0, 0.1) !important;
  color: var(--text-color) !important;
}

/* 新增：菜单栏背景色和文字颜色动态调整 */
:deep(.el-menu--horizontal) {
  background-color: var(--bg-gradient-light) !important;
}

</style>