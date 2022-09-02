<template>
  <div>后台首页{{ $store.state.user.username }}</div>
  <el-button @click="handleLogout">退出</el-button>
</template>

<script setup>
import { showModal, toast } from "@/utils/util.js";
import { logout } from "@/api/manager.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
function handleLogout() {
  showModal("是否要退出登录?").then((res) => {
    console.log("退出登录");
    logout().finally(() => {
      store.dispatch("logout");
      // 跳转回登录页
      router.push("/login");
      // 提示退出登陆成功
      toast("退出登陆成功");
    });
  });
}
</script>