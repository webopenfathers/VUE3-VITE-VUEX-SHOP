<template>
  <FormDrawer ref="formDrawerRef" title="推荐商品">
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="goods_id" align="center" label="ID" width="60" />
      <el-table-column align="center" label="商品封面" width="180">
        <template v-slot="{ row }">
          <el-image
            :src="row.cover"
            fit="fill"
            :lazy="true"
            style="width: 64px; height: 64px"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="商品名称"
        width="180"
      />
      <el-table-column label="操作" align="center">
        <template v-slot="{ row }">
          <el-button type="primary" text size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </FormDrawer>
</template>
<script setup>
import { ref } from "vue";
import FormDrawer from "@/components/FormDrawer.vue";

import { getCategoryGoods } from "@/api/category.js";

const formDrawerRef = ref(null);
const category_id = ref(0);
const tableData = ref([]);
const open = (item) => {
  category_id.value = item.id;
  getData().then((res) => {
    formDrawerRef.value.open();
  });
};

function getData() {
  return getCategoryGoods(category_id.value).then((res) => {
    tableData.value = res;
  });
}

defineExpose({
  open,
});
</script>