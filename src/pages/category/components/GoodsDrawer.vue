<template>
  <FormDrawer
    ref="formDrawerRef"
    :title="formDrawerTitle"
    @submit="handleConnect"
    confirmText="关联"
  >
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
          <el-popconfirm
            title="是否要删除该记录?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="handleDelete(row)"
          >
            <template #reference>
              <el-button
                text
                type="primary"
                size="small"
                :loading="row.loading"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </FormDrawer>

  <ChooseGoods ref="ChooseGoodsRef" />
</template>
<script setup>
import { ref } from "vue";
import FormDrawer from "@/components/FormDrawer.vue";
import ChooseGoods from "@/components/ChooseGoods.vue";

import {
  getCategoryGoods,
  deleteCategoryGoods,
  connectCategoryGoods,
} from "@/api/category.js";
import { toast } from "@/utils/util";

const formDrawerRef = ref(null);
const category_id = ref(0);
const tableData = ref([]);
const formDrawerTitle = ref(null);
const open = (item) => {
  formDrawerTitle.value = item.name;
  category_id.value = item.id;
  item.GoodsDrawerLoading = true;
  getData()
    .then((res) => {
      formDrawerRef.value.open();
    })
    .finally(() => {
      item.GoodsDrawerLoading = false;
    });
};

function getData() {
  return getCategoryGoods(category_id.value).then((res) => {
    tableData.value = res.map((o) => {
      o.loading = false;
      return o;
    });
  });
}

const handleDelete = (row) => {
  row.loading = true;
  deleteCategoryGoods(row.id).then((res) => {
    toast("删除关联商品成功");
    getData();
  });
};

const ChooseGoodsRef = ref(null);

const handleConnect = () => {
  ChooseGoodsRef.value.open((goods_ids) => {
    formDrawerRef.value.showLoading();
    connectCategoryGoods({
      category_id: category_id.value,
      goods_ids,
    })
      .then((res) => {
        getData();
        toast("关联成功");
      })
      .finally(() => {
        formDrawerRef.value.hideLoading();
      });
  });
};

defineExpose({
  open,
});
</script>