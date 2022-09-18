<template>
  <el-dialog title="规格选择" v-model="dialogVisible" width="80%" top="5vh">
    <el-container style="height: 65vh">
      <el-aside width="220px" class="image-aside">
        <div class="top">{{ tableData }}</div>
        <div class="bottom">
          <el-pagination
            background
            layout="prev, next"
            :total="total"
            :current-page="currentPage"
            :page-size="limit"
            @current-change="getData"
          />
        </div>
      </el-aside>
      <el-main> 内容 </el-main>
    </el-container>

    <template #footer>
      <span>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import { getSkusList } from "@/api/skus";
import { useInitTable } from "@/utils/useCommon";

const dialogVisible = ref(false);

const { loading, currentPage, limit, total, tableData, getData } = useInitTable(
  {
    getList: getSkusList,
  }
);
const open = () => {
  getData(1);
  dialogVisible.value = true;
};

const submit = () => {};

defineExpose({
  open,
});
</script>
<style scoped>
.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;
}

.image-aside .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-aside .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  right: 0;
  left: 0;
  @apply flex items-center justify-center;
}
</style>