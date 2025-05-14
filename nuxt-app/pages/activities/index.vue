<script setup lang="ts">
  import ActivitiesFilterPanel from "~/components/activities/ActivitiesFilterPanel.vue";
</script>
<template>
  <div class="py-10 3xl:py-20">
    <div class="flex flex-col items-center mb-10">
      <h2 class="mb-6">羽神找活動</h2>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item>活動列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container grid grid-cols-1 xl:grid-cols-12 gap-8">
      <ActivitiesFilterPanel class="col-span-2" />
    </div>
  </div>
</template>
