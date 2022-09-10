<template>
  <el-card shadow="never">
    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>
    <el-tree
      :data="tableData"
      :props="{ label: 'name', children: 'child' }"
      v-loading
      node-key="id"
      :default-expanded-keys="defaultExpendedKeys"
    >
      <!-- data是每一行的对象 -->
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <!-- 前面的菜单or权限 -->
          <el-tag size="small" :type="data.menu ? '' : 'info'">{{
            data.menu ? "菜单" : "权限"
          }}</el-tag>
          <!-- 图标 -->
          <el-icon v-if="data.icon" :size="16" class="ml-2">
            <component :is="data.icon"></component>
          </el-icon>
          <!-- 标题 -->
          <span>{{ data.name }}</span>

          <!--右边部分 -->
          <div class="ml-auto">
            <el-switch
              :modelValue="data.status"
              :active-value="1"
              :inactive-value="0"
            />
            <el-button
              text
              type="primary"
              size="small"
              @click.stop="handleEdit(data)"
              >修改</el-button
            >
            <el-button text type="primary" size="small">增加</el-button>
            <el-button text type="primary" size="small">删除</el-button>
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
        <el-form-item label="上级菜单" prop="rule_id">
          <el-cascader
            v-model="form.rule_id"
            :options="options"
            :props="{
              value: 'id',
              label: 'name',
              children: 'child',
              checkStrictly: true,
              emitPath: false,
            }"
            placeholder="请选择上级菜单"
          />
        </el-form-item>
        <el-form-item label="菜单/规则" prop="menu">
          <el-radio-group v-model="form.menu">
            <el-radio :label="1" border>菜单</el-radio>
            <el-radio :label="0" border>规则</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" style="width: 30%"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标" prop="icon" v-if="form.menu === 1">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item
          label="前端路由"
          prop="frontPath"
          v-if="form.menu === 1 && form.rule_id > 0"
        >
          <el-input v-model="form.frontPath"></el-input>
        </el-form-item>
        <el-form-item label="后端规则" prop="condition" v-if="form.menu === 0">
          <el-input v-model="form.condition"></el-input>
        </el-form-item>
        <el-form-item label="请求方式" prop="method" v-if="form.menu === 0">
          <el-select
            v-model="form.method"
            class="m-2"
            placeholder="请选择请求方式"
          >
            <el-option
              v-for="item in ['GET', 'POST', 'PUT', 'DELETE']"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="form.order" :min="0" :max="1000" />
        </el-form-item>
      </el-form>
    </FormDrawer>
  </el-card>
</template>
<script setup>
import ListHeader from "@/components/ListHeader.vue";
import FormDrawer from "@/components/FormDrawer.vue";
import { getRuleList, createRule, updateRule } from "@/api/rule.js";
import { useInitTable, useInitForm } from "@/utils/useCommon.js";
import { ref } from "vue";

const options = ref([]);
const defaultExpendedKeys = ref([]);

const { loading, tableData, getData } = useInitTable({
  getList: getRuleList,
  onGetListSuccess: (res) => {
    options.value = res.rules;
    tableData.value = res.list;
    defaultExpendedKeys.value = res.list.map((o) => o.id);
  },
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
    rule_id: 0,
    menu: 0,
    name: "",
    condition: "",
    method: "GET",
    status: 1,
    order: 50,
    icon: "",
    frontPath: "",
  },
  rules: {},
  getData,
  update: updateRule,
  create: createRule,
});
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