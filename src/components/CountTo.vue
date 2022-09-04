<template>
  <div>{{ d.num.toFixed(0) }}</div>
</template>
<script setup>
import { reactive, watch } from "vue";
import gsap from "gsap";

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
});

const d = reactive({
  num: 0,
});

function AnimateToValue() {
  gsap.to(d, {
    duration: 0.5,
    num: props.value,
  });
}

AnimateToValue();

// 防止setup执行完才接收到props值
watch(
  () => props.value,
  () => AnimateToValue()
);
</script>