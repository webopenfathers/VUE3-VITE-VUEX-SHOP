<template>
  <el-drawer
    title="设置轮播图"
    v-model="dialogVisible"
    size="50%"
    :destroy-on-close="true"
  >
    <el-form :model="form" label-width="80px">
      <el-form-item label="轮播图">
        <ChooseImage :limit="9" v-model="form.banners" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script setup>
import { reactive, ref } from "vue";
import ChooseImage from "@/components/ChooseImage.vue";
import { readGoods, setGoodsBanner } from "@/api/goods";
const dialogVisible = ref(false);
const form = reactive({
  banners: [],
});

const goodsId = ref(0);
const open = (row) => {
  goodsId.value = row.id;
  readGoods(goodsId.value).then((res) => {
    form.banners = res.goodsBanner.map((o) => o.url);
  });
  dialogVisible.value = true;
};

const submit = () => {};

defineExpose({
  open,
});
</script>

<style scoped>
</style>