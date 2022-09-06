<template>
  <el-container class="bg-white rounded" :style="{ height: h + 'px' }">
    <el-header class="image-header">
      <el-button type="primary" size="small" @click="handleOpenCreate"
        >新增图片分类</el-button
      >
    </el-header>
    <el-container>
      <ImageAside ref="ImageAsideRef" @change="handleAsideChange" />
      <ImageMain ref="ImageMainRef" />
    </el-container>
  </el-container>
</template>
<script setup>
import ImageAside from "@/components/ImageAside.vue";
import ImageMain from "@/components/ImageMain.vue";
import { ref } from "@vue/reactivity";
const windowHeight = window.innerHeight || document.body.clientHeight;
const h = windowHeight - 64 - 44 - 40;

const ImageAsideRef = ref(null);

const handleOpenCreate = () => {
  ImageAsideRef.value.handleCreate();
};

const ImageMainRef = ref(null);
const handleAsideChange = (image_class_id) => {
  ImageMainRef.value.loadData(image_class_id);
};
</script>

<style scoped>
.image-header {
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}
</style>