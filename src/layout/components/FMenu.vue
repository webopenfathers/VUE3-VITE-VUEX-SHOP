<template>
  <div class="f-menu" :style="{ width: $store.state.asideWidth }">
    <el-menu
      unique-opened
      :collapse="isCollapse"
      :default-active="defaultActive"
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
import { computed, ref } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();

// 获取当前路径-默认选中
const defaultActive = ref(route.path);

// 监听路由变化
onBeforeRouteUpdate((to, from) => {
  defaultActive.value = to.path;
});

// 是否折叠
const isCollapse = computed(() => store.state.asideWidth == "64px");
// 获取vuex中的菜单
const asideMenus = computed(() => store.state.menus);
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

.f-menu::-webkit-scrollbar {
  width: 0px;
}
</style>