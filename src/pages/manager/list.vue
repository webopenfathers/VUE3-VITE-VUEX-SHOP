<template>
  <el-card shadow="never" class="border-0">
    <!-- 搜索 -->
    <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
      <SearchItem label="关键词">
        <el-input
          v-model.trim="searchForm.keyword"
          placeholder="管理员名称"
          clearable
        ></el-input>
      </SearchItem>
    </Search>
    <!-- 新增|刷新 -->
    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>

    <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
      <el-table-column label="管理员">
        <template v-slot="{ row }">
          <div class="flex items-center">
            <el-avatar :size="40" :src="row.avatar">
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
            <div class="ml-3">
              <h6>{{ row.username }}</h6>
              <small>ID:{{ row.id }}</small>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="所属角色">
        <template v-slot="{ row }"> {{ row.role?.name || "-" }}</template>
      </el-table-column>
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
          <small v-if="row.super === 1" class="text-sm text-gray-500"
            >暂无操作</small
          >
          <div v-else>
            <el-button type="primary" size="small" text @click="handleEdit(row)"
              >修改</el-button
            >
            <el-popconfirm
              title="是否要删除该角色?"
              confirm-button-text="确认"
              cancel-button-text="取消"
              @confirm="handleDelete(row.id)"
            >
              <template #reference>
                <el-button text type="primary" size="small"> 删除 </el-button>
              </template>
            </el-popconfirm>
          </div>
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
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            :rows="5"
          ></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <ChooseImage v-model="form.avatar" />
        </el-form-item>
        <el-form-item label="所属角色" prop="role_id">
          <el-select v-model="form.role_id" placeholder="请选择所属角色">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>
<script setup>
import { ref } from "vue";
import {
  getManagerList,
  updateManagerStatus,
  createManager,
  updateManager,
  deleteManager,
} from "@/api/manager.js";
import FormDrawer from "@/components/FormDrawer.vue";
import ListHeader from "@/components/ListHeader.vue";
import ChooseImage from "@/components/ChooseImage.vue";
import Search from "@/components/Search.vue";
import SearchItem from "@/components/SearchItem.vue";
import { useInitTable, useInitForm } from "@/utils/useCommon.js";

const roles = ref([]);

const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete,
  handleStatusChange,
} = useInitTable({
  searchForm: {
    keyword: "",
  },
  getList: getManagerList,
  onGetListSuccess: (res) => {
    // 使用map的原因给每个对象添加一个loading状态;
    tableData.value = res.list.map((o) => {
      o.statusLoading = false;
      return o;
    });
    total.value = res.totalCount;
    roles.value = res.roles;
  },
  delete: deleteManager,
  updateStatus: updateManagerStatus,
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
    username: "",
    password: "",
    role_id: null,
    status: 1,
    avatar: "",
  },
  rules: {
    username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
    password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
    role_id: [{ required: true, message: "所属角色不能为空", trigger: "blur" }],
  },
  getData,
  currentPage,
  update: updateManager,
  create: createManager,
});
</script>