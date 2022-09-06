<template>
  <el-aside width="220px" class="image-aside">
    <!-- 图片编辑 -->
    <div class="top">
      <AsideList active>分类标题</AsideList>
      <AsideList>分类标题</AsideList>
    </div>
    <!-- 分页区域 -->
    <div class="bottom">分页区域</div>
  </el-aside>
</template>
<script setup>
import AsideList from "./AsideList.vue";
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