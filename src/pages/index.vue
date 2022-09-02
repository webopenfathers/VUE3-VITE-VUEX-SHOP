<template>
  <div>
    后台首页{{ count }} <el-button @click="addCount">{{ count }}</el-button>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";

let count = ref(1);
function addCount() {
  console.log("addCount");
  count.value++;
}

const form = reactive({
  num: 2,
});
</script>