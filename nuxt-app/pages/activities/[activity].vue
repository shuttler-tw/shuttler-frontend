<script lang="ts" setup>
  import { getActivity } from "@/apis/activities";

  const router = useRoute();
  const activityId = router.params.activity as string;
  const { data } = await getActivity(activityId);
  const activity = ref(data.value?.data);
  const defaultPicture = ref([
      "https://images.unsplash.com/photo-1729166241032-5b339506a0d7?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?q=80&w=2883&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1564769353575-73f33a36d84f?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1659081463572-4c5903a309e6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1733141731755-272381a17c59?q=80&w=2910&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  );
  const pictures = computed(() => {
    return (activity.value?.pictures?.length ?? 0) > 0
      ? activity.value?.pictures
      : defaultPicture.value;
  })
  const pictureMaxHeight = {
    default: "max-h-[428px]",
    mobile: "max-h-[236px]"
  }
</script>
<template>
  <div class="py-20">
    <div class="flex flex-col items-center mb-10">
      <h2 class="mb-6">羽神報名去</h2>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/activities' }">
          活動列表
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ activity?.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="grid grid-cols-2 gap-6" :class="`${pictureMaxHeight.default}`">
        <el-image
          :src="(pictures ?? [])[0]"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="pictures"
          show-progress
          :initial-index="0"
          fit="cover"
          class="col-span-1"
        />
        <div class="grid grid-cols-2 gap-6" :class="`${pictureMaxHeight.default}`">
          <el-image
            v-for="(pictureUrl, index) in (pictures || []).slice(1, 5)"
            :key="pictureUrl"
            :src="pictureUrl"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="pictures"
            show-progress
            :initial-index="index + 1"
            fit="cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  :deep(.el-image) img.el-image__inner.el-image__preview {
    border-radius: var(--radius-2xl) !important;
  }
</style>
