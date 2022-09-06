<template>
  <el-aside width="220px" class="image-aside" v-loading="loading">
    <!-- 图片编辑 -->
    <div class="top">
      <AsideList
        :active="activeId === item.id"
        v-for="(item, index) in list"
        :key="index"
        >{{ item.name }}</AsideList
      >
    </div>
    <!-- 分页区域 -->
    <div class="bottom">
      <el-pagination
        background
        layout="prev, next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getData"
      />
    </div>
  </el-aside>
</template>
<script setup>
import { getImageClassList } from "@/api/image_class.js";
import { number } from "echarts";
import { ref } from "vue";
import AsideList from "./AsideList.vue";

// 加载动画
const loading = ref(false);
const list = ref([]);
const activeId = ref(0);

// 分页
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);

// 获取数据
function getData(p = null) {
  if (typeof p === "number") {
    currentPage.value = p;
  }
  loading.value = true;
  getImageClassList(currentPage.value)
    .then((res) => {
      total.value = res.totalCount;
      list.value = res.list;
      let item = list.value[0];
      if (item) {
        activeId.value = item.id;
      }
    })
    .finally(() => {
      loading.value = false;
    });
}

getData();
</script>
<style scoped>
.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;
}

.image-aside .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-aside .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  right: 0;
  left: 0;
  @apply flex items-center justify-center;
}
</style>