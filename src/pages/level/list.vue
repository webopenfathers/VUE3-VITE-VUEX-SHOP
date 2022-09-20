<template>
  <el-card shadow="never" class="border-0">
    <!-- 新增|刷新 -->
    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>

    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="会员等级" />
      <el-table-column prop="discount" label="折扣率(%)" align="center" />
      <el-table-column prop="level" label="等级序号" align="center" />
      <el-table-column prop="create_time" label="状态">
        <template v-slot="{ row }">
          <el-switch
            :modelValue="row.status"
            :active-value="1"
            :disabled="row.super === 1"
            :loading="row.statusLoading"
            :inactive-value="0"
            @change="handleStatusChange($event, row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="{ row }">
          <el-button type="primary" size="small" text @click="handleEdit(row)"
            >修改</el-button
          >
          <el-popconfirm
            title="是否要删除该记录?"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="handleDelete(row.id)"
          >
            <template #reference>
              <el-button text type="primary" size="small"> 删除 </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <div class="flex items-center justify-center mt-5">
      <el-pagination
        background
        layout="prev,pager, next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getData"
      />
    </div>
    <!-- 弹框 -->
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form
        :model="form"
        ref="formRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
      >
        <el-form-item label="等级名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入等级名称"></el-input>
        </el-form-item>
        <el-form-item label="等级权重" prop="level">
          <el-input
            type="number"
            v-model="form.level"
            placeholder="请输入等级权重"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="升级条件">
          <div>
            <small class="text-xs mr-2">累计消费满</small>
            <el-input
              type="number"
              v-model="form.max_price"
              placeholder="累计消费"
              style="width: 50%"
            >
              <template #append> 元</template>
            </el-input>
            <small class="text-gray-400 flex">
              设置会员等级所需要的累计消费必须大于等于0，单位：元
            </small>
          </div>
          <div>
            <small class="text-xs mr-2">累计次数满</small>
            <el-input
              type="number"
              v-model="form.max_times"
              placeholder="累计次数"
              style="width: 50%"
            >
              <template #append> 次 </template>
            </el-input>
            <small class="text-gray-400 flex">
              设置会员等级所需要的购买数量必须大于等于0，单位：笔
            </small>
          </div>
        </el-form-item>
        <el-form-item label="折扣率" prop="discount">
          <el-input
            type="number"
            v-model="form.discount"
            placeholder="请输入折扣率(%)"
            style="width: 50%"
          >
            <template #append> % </template>
          </el-input>
          <small class="text-gray-400 flex">
            折扣率单位为百分比，如输入90，表示该会员等级的用户可以以商品原价的90%购买
          </small>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>
<script setup>
import {
  getUserLevelList,
  createUserLevel,
  updateUserLevel,
  deleteUserLevel,
  updateUserLevelStatus,
} from "@/api/level";
import FormDrawer from "@/components/FormDrawer.vue";
import ListHeader from "@/components/ListHeader.vue";
import { useInitTable, useInitForm } from "@/utils/useCommon.js";

const {
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete,
  handleStatusChange,
} = useInitTable({
  getList: getUserLevelList,
  delete: deleteUserLevel,
  updateStatus: updateUserLevelStatus,
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
    level: 100,
    status: 1,
    discount: 0,
    max_price: 0,
    max_times: 0,
  },
  rules: {
    name: [
      { required: true, message: "会员等级名称不能为空", trigger: "blur" },
    ],
  },
  getData,
  update: updateUserLevel,
  create: createUserLevel,
});
</script>