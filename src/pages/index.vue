<template>
  <div>
    后台首页
    <el-button>se'h</el-button>
  </div>
</template>

<script setup>
import { useCookies } from "@vueuse/integrations/useCookies";
const cookie = useCookies();
console.log(cookie);
</script>