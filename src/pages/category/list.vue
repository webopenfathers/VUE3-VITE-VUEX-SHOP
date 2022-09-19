<template>
  <el-card shadow="never">
    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>
    <el-tree
      :data="tableData"
      :props="{ label: 'name', children: 'child' }"
      v-loading
      node-key="id"
    >
      <!-- data是每一行的对象 -->
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <!-- 标题 -->
          <span>{{ data.name }}</span>

          <!--右边部分 -->
          <div class="ml-auto">
            <el-button
              text
              type="primary"
              size="small"
              @click="openGoodsDrawer(data)"
              >推荐商品</el-button
            >
            <span @click.stop="() => {}">
              <el-switch
                :modelValue="data.status"
                :active-value="1"
                :inactive-value="0"
                @change="handleStatusChange($event, data)"
              />
            </span>
            <el-button
              text
              type="primary"
              size="small"
              @click.stop="handleEdit(data)"
              >修改</el-button
            >

            <span @click.stop="() => {}">
              <el-popconfirm
                title="是否要删除该记录?"
                confirm-button-text="确认"
                cancel-button-text="取消"
                @confirm="handleDelete(data.id)"
              >
                <template #reference>
                  <el-button text type="primary" size="small"> 删除 </el-button>
                </template>
              </el-popconfirm>
            </span>
          </div>
        </div>
      </template>
    </el-tree>
    <!-- 弹框 -->
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" placeholder="分类名称"></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>

    <GoodsDrawer ref="GoodsDrawerRef" />
  </el-card>
</template>
<script setup>
import ListHeader from "@/components/ListHeader.vue";
import FormDrawer from "@/components/FormDrawer.vue";
import GoodsDrawer from "./components/GoodsDrawer.vue";
import {
  getCategoryList,
  createCategory,
  updateCategory,
  updateCategoryStatus,
  deleteCategory,
} from "@/api/category.js";
import { useInitTable, useInitForm } from "@/utils/useCommon.js";
import { ref } from "@vue/reactivity";

const { loading, tableData, getData, handleDelete, handleStatusChange } =
  useInitTable({
    getList: getCategoryList,
    onGetListSuccess: (res) => {
      tableData.value = res;
    },
    delete: deleteCategory,
    updateStatus: updateCategoryStatus,
  });

const {
  formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit,
} = useInitForm({
  form: {
    name: "",
  },
  rules: {},
  getData,
  update: updateCategory,
  create: createCategory,
});

const GoodsDrawerRef = ref(null);

const openGoodsDrawer = (data) => {
  GoodsDrawerRef.value.open(data);
};
</script>
<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-right: 8px;
}

:deep(.el-tree-node__content) {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>