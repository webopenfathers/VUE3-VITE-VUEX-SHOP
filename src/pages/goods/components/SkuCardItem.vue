<template>
  <div v-for="(tag, index) in item.goodsSkusCardValue" :key="tag.id">
    {{ tag.text }}
  </div>
</template>
<script setup>
import { initSkusCardItem } from "@/utils/useSku.js";
const props = defineProps({
  skuCardId: [Number, String],
});
const { item } = initSkusCardItem(props.skuCardId);
</script>