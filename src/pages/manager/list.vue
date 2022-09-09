<template>
  <el-card shadow="never" class="border-0">
    <!-- 搜索 -->
    <el-form :model="searchForm" label-width="80px" class="mb-3" size="small">
      <el-row :gutter="20">
        <el-col :span="8" :offset="0">
          <el-form-item label="关键词">
            <el-input
              v-model="searchForm.keyword"
              placeholder="管理员名称"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8">
          <div class="flex items-center justify-end">
            <el-button type="primary" @click="getData">搜索</el-button>
            <el-button @click="resetSearchForm">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>

    <!-- 新增|刷新 -->
    <div class="flex items-center justify-between mb-4">
      <el-button type="primary" size="small" @click="handleCreate"
        >新增</el-button
      >
      <el-tooltip effect="dark" content="刷新数据" placement="top">
        <el-button text @click="getData">
          <el-icon :size="20"><Refresh /></el-icon>
        </el-button>
      </el-tooltip>
    </div>

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
import { reactive, ref } from "@vue/reactivity";
import {
  getManagerList,
  updateManagerStatus,
  createManager,
  updateManager,
  deleteManager,
} from "@/api/manager.js";
import FormDrawer from "@/components/FormDrawer.vue";
import ChooseImage from "@/components/ChooseImage.vue";
import { toast } from "../../utils/util";
import { computed } from "@vue/runtime-core";

const searchForm = reactive({
  keyword: "",
});

// 重置
const resetSearchForm = () => {
  searchForm.keyword = "";
  getData();
};

const roles = ref([]);
const tableData = ref([]);
// 加载动画
const loading = ref(false);

// 分页
const currentPage = ref(1);
const total = ref(0);
const limit = ref(10);

// 获取数据
function getData(p = null) {
  if (typeof p === "number") {
    currentPage.value = p;
  }
  loading.value = true;
  getManagerList(currentPage.value, searchForm)
    .then((res) => {
      // 使用map的原因给每个对象添加一个loading状态
      tableData.value = res.list.map((o) => {
        o.statusLoading = false;
        return o;
      });
      total.value = res.totalCount;
      roles.value = res.roles;
    })
    .finally(() => {
      loading.value = false;
    });
}

getData();

// 删除
const handleDelete = (id) => {
  loading.value = true;
  deleteManager(id)
    .then((res) => {
      toast("删除成功");
      getData();
    })
    .finally(() => {
      loading.value = false;
    });
};

//表单部分
const formDrawerRef = ref(null);
const formRef = ref(null);
const form = reactive({
  username: "",
  password: "",
  role_id: null,
  password: "",
  status: 1,
  avatar: "",
});

const rules = {
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  role_id: [{ required: true, message: "所属角色不能为空", trigger: "blur" }],
};

const editId = ref(0);
const drawerTitle = computed(() => (editId.value ? "修改" : "新增"));

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return;

    formDrawerRef.value.showLoading();
    const fun = editId.value
      ? updateManager(editId.value, form)
      : createManager(form);
    // 创建
    fun
      .then((res) => {
        toast(drawerTitle.value + "成功");
        // 修改刷新当前页，新增刷新第一页
        getData(editId.value ? currentPage.value : 1);
        formDrawerRef.value.close();
      })
      .finally(() => {
        formDrawerRef.value.hideLoading();
      });
  });
};
// 重置表单
function resetForm(row) {
  if (formRef.value) formRef.value.clearValidate();
  for (const key in form) {
    form[key] = row[key];
  }
}

// 新增
const handleCreate = () => {
  editId.value = 0;
  resetForm({
    username: "",
    password: "",
    role_id: null,
    password: "",
    status: 1,
    avatar: "",
  });
  formDrawerRef.value.open();
};

// 修改
const handleEdit = (row) => {
  editId.value = row.id;
  resetForm(row);
  formDrawerRef.value.open();
};

// 修改状态
const handleStatusChange = (status, row) => {
  row.statusLoading = true;
  updateManagerStatus(row.id, status)
    .then((res) => {
      toast("修改状态成功");
      row.status = status;
    })
    .finally(() => {
      row.statusLoading = false;
    });
};
</script>