<template>
  <el-upload
    drag
    :action="uploadImageAction"
    multiple
    :headers="{
      token,
    }"
    name="img"
    :data="data"
    :on-success="uploadSuccess"
    :on-error="uploadError"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>
<script setup>
import { uploadImageAction } from "@/api/image.js";
import { getToken } from "@/utils/auth";
import { toast } from "../utils/util";
const token = getToken();

const emit = defineEmits(["success"]);

const uploadSuccess = (response, uploadFile, uploadFiles) => {
  console.log(response);
  emit("success", {
    response,
    uploadFile,
    uploadFiles,
  });
};

const uploadError = (error, uploadFile, uploadFiles) => {
  let msg = JSON.parse(error.message).msg || "上传失败";
  toast(msg, "error");
};

defineProps({
  data: Object,
});
</script>