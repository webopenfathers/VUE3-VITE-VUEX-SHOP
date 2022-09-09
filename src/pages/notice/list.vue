<template>
  <el-card shadow="never" class="border-0">
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
      <el-table-column prop="title" label="公告标题" />
      <el-table-column prop="create_time" label="发布时间" />
      <el-table-column label="操作" width="180" align="center">
        <template v-slot="{ row }">
          <el-button type="primary" size="small" text @click="handleEdit(row)"
            >修改</el-button
          >
          <el-popconfirm
            title="是否要删除该公告?"
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
        <el-form-item label="公告标题" prop="title">
          <el-input
            v-model="form.title"
            placeholder="请输入公告标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="content">
          <el-input
            v-model="form.content"
            placeholder="请输入公告内容"
            type="textarea"
            :rows="5"
          ></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>
<script setup>
import { reactive, ref } from "@vue/reactivity";
import {
  getNoticeList,
  createNotice,
  updateNotice,
  deleteNotice,
} from "@/api/notice";
import FormDrawer from "@/components/FormDrawer.vue";
import { toast } from "../../utils/util";
import { computed } from "@vue/runtime-core";
import { useInitTable } from "@/utils/useCommon.js";

const { tableData, loading, currentPage, total, limit, getData } = useInitTable(
  {
    getList: getNoticeList,
  }
);

// 删除
const handleDelete = (id) => {
  loading.value = true;
  deleteNotice(id)
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
  title: "",
  content: "",
});

const rules = {
  title: [{ required: true, message: "公告名称不能为空", trigger: "blur" }],
  content: [{ required: true, message: "公告内容不能为空", trigger: "blur" }],
};

const editId = ref(0);
const drawerTitle = computed(() => (editId.value ? "修改" : "新增"));

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return;

    formDrawerRef.value.showLoading();
    const fun = editId.value
      ? updateNotice(editId.value, form)
      : createNotice(form);
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
    title: "",
    content: "",
  });
  formDrawerRef.value.open();
};

// 修改
const handleEdit = (row) => {
  editId.value = row.id;
  resetForm(row);
  formDrawerRef.value.open();
};
</script>