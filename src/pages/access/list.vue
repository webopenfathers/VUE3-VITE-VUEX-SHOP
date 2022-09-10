<template>
  <el-card shadow="never">
    <ListHeader @refresh="getData"></ListHeader>
    <el-tree
      :data="tableData"
      :props="{ label: 'name', children: 'child' }"
      v-loading
      node-key="id"
      :default-expanded-keys="defaultExpendedKeys"
    />
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