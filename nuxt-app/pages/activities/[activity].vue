<script lang="ts" setup>
  import { getActivity } from "@/apis/activities";
  import { activityPictures as defaultActivityPictures } from "~/constants/activityPictures";
  import ActivityPictures from "~/components/activity/ActivityPictures.vue";

  const router = useRoute();
  const activityId = router.params.activity as string;
  const { data } = await getActivity(activityId);
  const activity = ref(data.value?.data);

  const pictures = ref(defaultActivityPictures);
  if (activity.value?.pictures && activity.value?.pictures.length > 0) {
    pictures.value = activity.value?.pictures;
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
      <ActivityPictures :pictures="pictures" />
    </div>
  </div>
</template>
