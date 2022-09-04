<template>
  <el-container>
    <el-header>
      <!-- 头部 -->
      <f-header></f-header>
    </el-header>
    <!--  下面-->
    <el-container>
      <!-- 侧边 -->
      <el-aside :width="$store.state.asideWidth">
        <f-menu></f-menu>
      </el-aside>
      <!-- 主容器 -->
      <el-main>
        <f-tag-list></f-tag-list>
        <!-- 主内容 -->
        <router-view v-slot="{ Component }">
          <!-- keep-alive页面缓存 -->
          <keep-alive :max="10">
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import FHeader from "./components/FHeader.vue";
import FMenu from "./components/FMenu.vue";
import FTagList from "./components/FTagList.vue";
</script>
<style scoped>
.el-aside {
  transition: all 0.2s;
}
</style>