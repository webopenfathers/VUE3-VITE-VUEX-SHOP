<template>
  <div class="f-menu" :style="{ width: $store.state.asideWidth }">
    <el-menu
      unique-opened
      :collapse="isCollapse"
      default-active="2"
      :collapse-transition="false"
      class="border-0"
      @select="handleSelect"
    >
      <!-- 二级菜单 -->
      <template v-for="(item, index) in asideMenus" :key="index">
        <el-sub-menu
          v-if="item.child && item.child.length > 0"
          :index="item.name"
        >
          <template #title>
            <el-icon><component :is="item.icon"></component></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(ele, index2) in item.child"
            :index="ele.frontpath"
            :key="index2"
          >
            <el-icon>
              <component :is="ele.icon"></component>
            </el-icon>
            <span>{{ ele.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <!-- 一级菜单 -->
        <el-menu-item v-else :index="item.frontpath">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

// 是否折叠
const store = useStore();
const isCollapse = computed(() => store.state.asideWidth == "64px");
const asideMenus = [
  {
    name: "后台面板",
    icon: "help",
    child: [{ name: "主控台", frontpath: "/", icon: "home-filled" }],
  },
  {
    name: "商城管理",
    icon: "shopping-bag",
    child: [
      {
        name: "商品管理",
        frontpath: "/goods/list",
        icon: "shopping-cart-full",
      },
    ],
  },
];
const router = useRouter();
const handleSelect = (path) => {
  router.push(path);
};
</script>
<style scoped>
.f-menu {
  transition: all 0.2s;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  @apply shadow-md fixed bg-light-50;
}
</style>