<template>
  <el-card shadow="never">
    <ListHeader @refresh="getData"></ListHeader>
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
              :modelValue="status"
              :active-value="1"
              :inactive-value="0"
            />
            <el-button text type="primary" size="small">修改</el-button>
            <el-button text type="primary" size="small">增加</el-button>
            <el-button text type="primary" size="small">删除</el-button>
          </div>
        </div>
      </template>
    </el-tree>
  </el-card>
</template>
<script setup>
import ListHeader from "@/components/ListHeader.vue";
import { getRuleList } from "@/api/rule.js";
import { useInitTable } from "@/utils/useCommon.js";
import { ref } from "vue";

const defaultExpendedKeys = ref([]);

const { loading, tableData, getData } = useInitTable({
  getList: getRuleList,
  onGetListSuccess: (res) => {
    tableData.value = res.list;
    defaultExpendedKeys.value = res.list.map((o) => o.id);
  },
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

::v-deep .el-tree-node__content {
  padding-top: 20px !important;
  padding-bottom: 20px !important;
}
</style>