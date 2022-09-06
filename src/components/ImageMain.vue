<template>
  <el-main class="image-main" v-loading="loading">
    <!-- 图片编辑 -->
    <div class="top p-3">
      <el-row :gutter="10">
        <el-col
          :span="6"
          :offset="0"
          v-for="(item, index) in list"
          :key="index"
        >
          <el-card
            shadow="hover"
            class="relative mb-3"
            :body-style="{ padding: 0 }"
          >
            <el-image
              :src="item.url"
              :preview-src-list="[item.url]"
              :initial-index="0"
              fit="cover"
              class="w-full h-[150px]"
            >
            </el-image>
            <!-- 标题 -->
            <div class="image-title">{{ item.name }}</div>
            <div class="flex items-center justify-center p-2">
              <el-button
                type="primary"
                size="small"
                text
                @click="handleEdit(item)"
                >重命名</el-button
              >
              <el-popconfirm
                title="是否要删除该图片?"
                confirm-button-text="确认"
                cancel-button-text="取消"
                @confirm="handleDelete(item.id)"
              >
                <template #reference>
                  <el-button type="primary" size="small" text>删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 分页区域 -->
    <div class="bottom">
      <el-pagination
        background
        layout="prev,pager, next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getData"
      />
    </div>
  </el-main>
</template>
<script setup>
import { getImageList, updateImage, deleteImage } from "@/api/image";
import { ref } from "vue";
import { showPrompt } from "@/utils/util.js";
import { toast } from "@/utils/util";
// 分页
const currentPage = ref(1);
const total = ref(0);
const list = ref([]);
const loading = ref(false);
const image_class_id = ref(0);

// 获取数据
function getData(p = null) {
  if (typeof p === "number") {
    currentPage.value = p;
  }
  loading.value = true;
  getImageList(image_class_id.value, currentPage.value)
    .then((res) => {
      total.value = res.totalCount;
      list.value = res.list;
    })
    .finally(() => {
      loading.value = false;
    });
}

// 根据分类id重新加载图片列表
const loadData = (id) => {
  currentPage.value = 1;
  image_class_id.value = id;
  getData();
};

// 重命名
const handleEdit = (item) => {
  showPrompt("重命名", item.name).then(({ value }) => {
    loading.value = true;
    updateImage(item.id, value)
      .then((res) => {
        toast("修改成功");
        getData();
      })
      .finally(() => {
        loading.value = false;
      });
  });
};

// 删除图片
const handleDelete = (id) => {
  loading.value = true;
  deleteImage([id])
    .then((res) => {
      toast("删除成功");
      getData();
    })
    .finally(() => {
      loading.value = false;
    });
};

defineExpose({
  loadData,
});
</script>
<style scoped>
.image-main {
  position: relative;
}

.image-main .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-main .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  right: 0;
  left: 0;
  @apply flex items-center justify-center;
}

.image-title {
  position: absolute;
  top: 122px;
  left: -1px;
  right: -1px;
  @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1;
}
</style>