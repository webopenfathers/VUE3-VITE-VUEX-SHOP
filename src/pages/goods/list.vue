<template>
  <div>
    <el-tabs v-model="searchForm.tab" @tab-change="getData">
      <el-tab-pane
        :label="item.name"
        :name="item.key"
        v-for="(item, index) in tabbars"
        :key="index"
      ></el-tab-pane>
    </el-tabs>

    <el-card shadow="never" class="border-0">
      <!-- 搜索 -->
      <el-form :model="searchForm" label-width="80px" class="mb-3" size="small">
        <el-row :gutter="20">
          <el-col :span="8" :offset="0">
            <el-form-item label="商品名称">
              <el-input
                v-model.trim="searchForm.title"
                placeholder="商品名称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="0" v-if="showSearch">
            <el-form-item label="商品分类" prop="category_id">
              <el-select
                v-model="searchForm.category_id"
                placeholder="请选择商品分类"
                clearable
              >
                <el-option
                  v-for="item in category_list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="showSearch ? 0 : 8">
            <div class="flex items-center justify-end">
              <el-button type="primary" @click="getData">搜索</el-button>
              <el-button @click="resetSearchForm">重置</el-button>
              <el-button type="primary" text @click="showSearch = !showSearch"
                >{{ showSearch ? "收起" : "展开" }}
                <el-icon>
                  <ArrowUp v-if="showSearch" />
                  <ArrowDown v-else />
                </el-icon>
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <!-- 新增|刷新 -->
      <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>

      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column label="商品" width="280px">
          <template v-slot="{ row }">
            <div class="flex items-center">
              <el-image
                class="mr-3 rounded"
                :src="row.cover"
                fit="cover"
                :lazy="true"
                style="width: 50px; height: 50px"
              ></el-image>
              <div class="flex-1">
                <p>{{ row.title }}</p>
                <div>
                  <span class="text-rose-500">￥{{ row.min_price }}</span>
                  <el-divider direction="vertical" />
                  <span class="text-gray-500 text-xs"
                    >￥{{ row.min_price }}</span
                  >
                </div>
                <p class="text-gray-400 text-xs mb-1">
                  分类：{{ row.category ? row.category.name : "未分类" }}
                </p>
                <p class="text-gray-400 text-xs">
                  创建时间：{{ row.create_time }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="实际销量"
          width="80px"
          prop="sale_count"
          align="center"
        />
        <el-table-column label="商品状态" width="180px" align="center">
          <template v-slot="{ row }">
            <el-tag :type="row.status ? 'success' : 'danger'" size="small">{{
              row.status ? "上架" : "仓库"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="审核状态"
          align="center"
          width="180px"
          v-if="searchForm.tab != 'delete'"
        >
          <template v-slot="{ row }">
            <div class="flex flex-col" v-if="row.ischeck == 0">
              <el-button type="success" size="small" plain>审核通过</el-button>
              <el-button class="mt-2 !ml-0" type="danger" size="small" plain
                >审核拒绝</el-button
              >
            </div>
            <span v-else>{{ row.ischeck === 1 ? "通过" : "拒绝" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="总库存"
          prop="stock"
          width="80px"
          align="center"
        />
        <el-table-column label="操作" align="center">
          <template v-slot="{ row }">
            <div v-if="searchForm.tab != 'delete'">
              <el-button
                class="px-1"
                type="primary"
                size="small"
                text
                @click="handleEdit(row)"
                >修改</el-button
              >
              <el-button class="px-1" type="primary" size="small" text
                >商品规格</el-button
              >
              <el-button class="px-1" type="primary" size="small" text
                >设置轮播图</el-button
              >
              <el-button class="px-1" type="primary" size="small" text
                >商品详情</el-button
              >
              <el-popconfirm
                title="是否要删除该商品?"
                confirm-button-text="确认"
                cancel-button-text="取消"
                @confirm="handleDelete(row.id)"
              >
                <template #reference>
                  <el-button text type="primary" size="small"> 删除 </el-button>
                </template>
              </el-popconfirm>
            </div>
            <span v-else>暂无操作</span>
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
      <FormDrawer
        ref="formDrawerRef"
        :title="drawerTitle"
        @submit="handleSubmit"
      >
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
  </div>
</template>
<script setup>
import { ref } from "vue";
import {
  getGoodsList,
  updateGoodsStatus,
  createGoods,
  updateGoods,
  deleteGoods,
} from "@/api/goods.js";
import { getCategoryList } from "@/api/category";
import FormDrawer from "@/components/FormDrawer.vue";
import ListHeader from "@/components/ListHeader.vue";
import ChooseImage from "@/components/ChooseImage.vue";
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
    title: "",
    tab: "all",
    category_id: null,
  },
  getList: getGoodsList,
  onGetListSuccess: (res) => {
    // 使用map的原因给每个对象添加一个loading状态;
    tableData.value = res.list.map((o) => {
      o.statusLoading = false;
      return o;
    });
    total.value = res.totalCount;
    roles.value = res.roles;
  },
  delete: deleteGoods,
  updateStatus: updateGoodsStatus,
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
    password: "",
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
  update: updateGoods,
  create: createGoods,
});

const tabbars = [
  {
    key: "all",
    name: "全部",
  },
  {
    key: "checking",
    name: "审核中",
  },
  {
    key: "saling",
    name: "出售中",
  },
  {
    key: "off",
    name: "已下架",
  },
  {
    key: "min_stock",
    name: "库存预警",
  },
  {
    key: "delete",
    name: "回收站",
  },
];

// 商品分类
const category_list = ref([]);
getCategoryList().then((res) => {
  category_list.value = res;
});

// 收起/展开
const showSearch = ref(false);
</script>