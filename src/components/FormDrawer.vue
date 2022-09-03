<template>
  <el-drawer
    :close-on-click-modal="false"
    v-model="showDrawer"
    :title="title"
    :size="size"
    :destroy-on-close="destroyOnClose"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <el-button type="primary" @click="submit" :loading="loading">{{
          confirmText
        }}</el-button>
        <el-button type="default" @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>
<script setup>
import { ref } from "@vue/reactivity";

const showDrawer = ref(false);

const props = defineProps({
  title: String,
  size: {
    type: String,
    default: "45%",
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  confirmText: {
    type: String,
    default: "提交",
  },
});

const loading = ref(false);
const showLoading = () => {
  loading.value = true;
};

const hideLoading = () => {
  loading.value = false;
};

// 打开
const open = () => {
  showDrawer.value = true;
};

// 关闭
const close = () => {
  showDrawer.value = false;
};

// 提交
const emit = defineEmits(["submit"]);
const submit = () => emit("submit");

// 向父组件暴露一下方法
defineExpose({
  open,
  close,
  showLoading,
  hideLoading,
});
</script>
<style scoped>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
}
.formDrawer .body {
  flex: 1;
  overflow-y: auto;
}
.formDrawer .actions {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>