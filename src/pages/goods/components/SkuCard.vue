<template>
  <el-form-item label="规格选项" v-loading="bodyLoading">
    <el-card
      shadow="never"
      class="w-full mb-3"
      v-loading="item.loading"
      v-for="(item, index) in sku_card_list"
      :key="item.id"
    >
      <template #header>
        <div class="flex items-center">
          <el-input
            v-model="item.text"
            placeholder="规格名称"
            style="width: 200px"
            @change="handleUpdate(item)"
          >
            <template #append>
              <el-icon class="cursor-pointer" @click="handleChooseSku(item)"
                ><more
              /></el-icon>
            </template>
          </el-input>
          <el-button
            class="ml-auto"
            size="small"
            @click="sortCard('up', index)"
            :disabled="index == 0"
          >
            <el-icon><top /></el-icon
          ></el-button>
          <el-button
            size="small"
            @click="sortCard('down', index)"
            :disabled="index === sku_card_list.length - 1"
          >
            <el-icon><bottom /></el-icon
          ></el-button>
          <el-popconfirm
            title="是否要删除该选项?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="handleDelete(item)"
          >
            <template #reference>
              <el-button size="small">
                <el-icon><delete /></el-icon
              ></el-button>
            </template>
          </el-popconfirm>
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
  <!-- 选择规格选项值弹框 -->
  <ChooseSku ref="ChooseSkuRef" />
</template>
<script setup>
import SkuCardItem from "./SkuCardItem.vue";
import ChooseSku from "@/components/ChooseSku.vue";
import {
  sku_card_list,
  addSkuCardEvent,
  btnLoading,
  handleUpdate,
  handleDelete,
  sortCard,
  bodyLoading,
  handleChooseSetGoodsSkusCard,
} from "@/utils/useSku.js";
import { ref } from "@vue/reactivity";

const ChooseSkuRef = ref(null);

const handleChooseSku = (item) => {
  ChooseSkuRef.value.open((value) => {
    handleChooseSetGoodsSkusCard(item.id, {
      name: value.name,
      value: value.list,
    });
  });
};
</script>
<style scoped>
:deep(.el-card__header) {
  @apply !p-2 bg-gray-50;
}
</style>