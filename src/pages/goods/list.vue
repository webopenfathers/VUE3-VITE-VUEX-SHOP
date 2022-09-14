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
      <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
        <SearchItem label="商品名称">
          <el-input
            v-model.trim="searchForm.title"
            placeholder="商品名称"
            clearable
          ></el-input>
        </SearchItem>

        <template #show>
          <SearchItem label="商品分类">
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
          </SearchItem>
        </template>
      </Search>
      <!-- 新增|刷新 -->
      <ListHeader
        layout="create,delete,refresh"
        @create="handleCreate"
        @refresh="getData"
        @delete="handleMultiDelete"
      >
        <el-button
          size="small"
          @click="handleMultiStatusChange(1)"
          v-if="searchForm.tab === 'all' || searchForm.tab == 'off'"
          >上架</el-button
        >
        <el-button
          size="small"
          @click="handleMultiStatusChange(0)"
          v-if="searchForm.tab == 'all' || searchForm.tab == 'saling'"
          >下架</el-button
        >
      </ListHeader>

      <el-table
        :data="tableData"
        stripe
        ref="multipleTableRef"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column type="selection" width="55" />
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
              <el-button
                class="px-1"
                type="primary"
                size="small"
                text
                @click="handleSetGoodsBanners(row)"
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
          <el-form-item label="商品名称" prop="title">
            <el-input
              v-model="form.title"
              placeholder="请输入商品名称,不能超过60个字符"
            ></el-input>
          </el-form-item>
          <el-form-item label="封面" prop="cover">
            <ChooseImage v-model="form.cover" />
          </el-form-item>
          <el-form-item label="商品分类" prop="category_id">
            <el-select v-model="form.category_id" placeholder="请选择商品分类">
              <el-option
                v-for="item in category_list"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品描述" prop="desc">
            <el-input
              type="textarea"
              v-model="form.desc"
              placeholder="选填,商品卖点"
            ></el-input>
          </el-form-item>

          <el-form-item label="单位" prop="unit">
            <el-input
              v-model="form.unit"
              placeholder="请输入单位"
              style="width: 50%"
            ></el-input>
          </el-form-item>

          <el-form-item label="总库存" prop="stock">
            <el-input v-model="form.stock" type="number" style="width: 40%">
              <template #append> 件 </template>
            </el-input>
          </el-form-item>
          <el-form-item label="库存预警" prop="min_stock">
            <el-input v-model="form.min_stock" type="number" style="width: 40%">
              <template #append> 件 </template>
            </el-input>
          </el-form-item>
          <el-form-item label="最低销售价" prop="min_price">
            <el-input v-model="form.min_price" type="number" style="width: 40%">
              <template #append> 元 </template>
            </el-input>
          </el-form-item>
          <el-form-item label="最低原价" prop="min_oprice">
            <el-input
              v-model="form.min_oprice"
              type="number"
              style="width: 40%"
            >
              <template #append> 元 </template>
            </el-input>
          </el-form-item>
          <el-form-item label="库存显示" prop="stock_display">
            <el-radio-group v-model="form.stock_display">
              <el-radio :label="0" border>隐藏</el-radio>
              <el-radio :label="1" border>显示</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否上架" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :label="0" border>放入仓库</el-radio>
              <el-radio :label="1" border>立即上架</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </FormDrawer>
    </el-card>

    <banners ref="bannersRef" />
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
import Search from "@/components/Search.vue";
import SearchItem from "@/components/SearchItem.vue";
import banners from "./banners.vue";
import { useInitTable, useInitForm } from "@/utils/useCommon.js";

const {
  handleSelectionChange,
  multipleTableRef,
  handleMultiDelete,
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete,
  handleMultiStatusChange,
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
    title: null, // 商品名称
    category_id: null, // 商品分类
    cover: null, // 商品封面
    desc: null, // 商品描述
    unit: "件", // 商品单位
    stock: 100, // 总库存
    min_stock: 10, // 库存预警
    status: 1, // 是否上架 0仓库 1上架
    stock_display: 1, // 库存显示 0隐藏 1显示
    min_price: 0, // 最低销售价
    min_oprice: 0, // 最低原价
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

// 设置轮播图相关
const bannersRef = ref(null);

const handleSetGoodsBanners = (row) => {
  bannersRef.value.open(row);
};
</script>