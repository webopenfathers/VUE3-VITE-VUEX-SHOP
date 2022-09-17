<template>
  <el-form-item label="规格选项">
    <el-card
      shadow="never"
      class="w-full mb-3"
      v-for="(item, index) in sku_card_list"
      :key="item.id"
    >
      <template #header>
        <div class="flex items-center">
          <el-input
            v-model="item.text"
            placeholder="规格名称"
            style="width: 200px"
          >
            <template #append>
              <el-icon><more /></el-icon>
            </template>
          </el-input>
          <el-button class="ml-auto" size="small">
            <el-icon><top /></el-icon
          ></el-button>
          <el-button size="small">
            <el-icon><bottom /></el-icon
          ></el-button>
          <el-button size="small">
            <el-icon><delete /></el-icon
          ></el-button>
        </div>
      </template>
      <!-- card body -->
      <SkuCardItem :skuCardId="item.id" />
    </el-card>
    <el-button
      type="success"
      size="small"
      :loading="btnLoading"
      @click="addSkuCardEvent"
      >添加规格</el-button
    >
  </el-form-item>
</template>
<script setup>
import SkuCardItem from "./SkuCardItem.vue";
import { sku_card_list, addSkuCardEvent, btnLoading } from "@/utils/useSku.js";
</script>
<style scoped>
:deep(.el-card__header) {
  @apply !p-2 bg-gray-50;
}
</style>