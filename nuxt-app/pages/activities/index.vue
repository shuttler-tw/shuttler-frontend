<script setup lang="ts">
  import ActivitiesFilterPanel from "~/components/activities/ActivitiesFilterPanel.vue";
  import { getActivities } from "@/apis/activities";
  import { Location, Clock, Money } from "@element-plus/icons-vue";
  import { getElementPlusTypeByLevel } from "@/constants/shuttlerLevels";
  import { useParticipantStatus } from "@/composables/useParticipantStatus";

  const { data: activities } = await getActivities();
</script>
<template>
  <div class="py-20">
    <div class="flex flex-col items-center mb-10">
      <h2 class="mb-6">羽神找活動</h2>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item>活動列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <ActivitiesFilterPanel class="col-span-12 xl:col-span-3" />
        <div class="col-span-12 xl:col-span-9">
          <ul class="grid grid-col-1 xl:grid-cols-3 gap-6">
            <li v-for="activity in activities?.data" :key="activity.activityId" class="p-4 border rounded-lg" :class="`${useParticipantStatus('border', activity.bookedCount, activity.participantCount)}`">
              <div class="flex items-center mb-2">
                <el-avatar class="mr-2" :size="40" :src="activity.contactAvatar" />
                <h3 class="text-xl">{{ activity.name }}</h3>
              </div>
              <p class="flex items-center mb-2">
                <el-icon class="mr-2" size="16"><Location /></el-icon>
                {{ activity.venueName }}
              </p>
              <p class="flex items-center mb-2">
                <el-icon class="mr-2" size="16"><Clock /></el-icon>
                {{ activity.date }} {{ activity.startTime }} - {{ activity.endTime }}
                </p>
              <p class="flex items-center mb-2">
                <el-icon class="mr-2" size="16"><Money /></el-icon>
                <span class="text-lg font-bold">{{ activity.points }} 點</span>
              </p>
              <div class="flex items-center">
                <ul class="flex items-center">
                  <li v-for="level in activity.level" :key="level" class="mr-2">
                    <el-check-tag checked :type="getElementPlusTypeByLevel(level)">
                      {{ level }}
                    </el-check-tag>
                  </li>
                </ul>
                <el-check-tag checked class="text-black font-bold" :class="`${useParticipantStatus('bg', activity.bookedCount, activity.participantCount)}`">
                  {{ activity.bookedCount }}/{{ activity.participantCount }}
                </el-check-tag>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
