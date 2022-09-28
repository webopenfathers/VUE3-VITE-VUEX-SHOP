<template>
  <div v-loading="loading" class="bg-white p-4 rounded">
    <el-form :model="form" label-width="160px">
      <el-form-item label="物流查询Key">
        <div>
          <el-input v-model="form.ship" placeholder="物流查询Key"> </el-input>
          <p>
            <small class="text-gray-500 ml-1">
              用于查询物流信息，接口申请(仅供参考)</small
            >
          </p>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="submit"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { getSysconfig, setSysconfig } from "@/api/sysconfig";
import { toast } from "@/utils/util";

const form = reactive({
  ship: "",
});

const loading = ref(false);
function getData() {
  loading.value = true;
  getSysconfig()
    .then((res) => {
      for (const key in form) {
        form[key] = res[key];
      }
    })
    .finally(() => {
      loading.value = false;
    });
}

getData();

const submit = () => {
  loading.value = true;
  setSysconfig({
    ...form,
  })
    .then((res) => {
      toast("修改成功");
      getData();
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>