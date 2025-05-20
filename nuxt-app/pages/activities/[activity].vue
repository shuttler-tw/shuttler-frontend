<script lang="ts" setup>
  import { getActivity } from "@/apis/activities";
  import { activityPictures as defaultActivityPictures } from "~/constants/activityPictures";
  import ActivityPictures from "~/components/activity/ActivityPictures.vue";
  import { useParticipantStatus } from "@/composables/useParticipantStatus";
  import {
    Postcard,
    Calendar,
    Location,
    School,
    Help,
    Odometer,
    User,
    Place,
    Tickets,
    Money
  } from "@element-plus/icons-vue";

  const router = useRoute();
  const activityId = router.params.activity as string;
  const { data } = await getActivity(activityId);
  const activity = ref(data.value?.data);

  const pictures = ref(defaultActivityPictures);
  if (activity.value?.pictures && activity.value?.pictures.length > 0) {
    pictures.value = activity.value?.pictures;
  }

  const activityInfoItems = computed(() => {
    if (!activity.value) return [];

    return [
      {
        icon: Postcard,
        label: "主辦單位",
        value: activity.value.organizer
      },
      {
        icon: Calendar,
        label: "活動日期",
        value: `${activity.value.date} ${activity.value.startTime} - ${activity.value.endTime}`
      },
      {
        icon: Postcard,
        label: "場館名稱",
        value: activity.value.venueName
      },
      {
        icon: Location,
        label: "場館地點",
        value: `${activity.value.city}${activity.value.district}${activity.value.address}`
      },
      {
        icon: School,
        label: "場館設施",
        value: activity.value.venueFacilities?.join("、")
      },
      {
        icon: Help,
        label: "使用球種",
        value: activity.value.ballType
      },
      // 程度
      {
        icon: Odometer,
        label: "活動程度",
        value: activity.value.level
      },
      {
        icon: User,
        label: "活動名額",
        value: `${activity.value.participantCount} 人`
      },
      {
        icon: Place,
        label: "租用場地",
        value: `${activity.value.rentalLot} 面`
      },
      {
        icon: Tickets,
        label: "活動簡介",
        value: activity.value.brief
      }
    ];
  });
</script>
<template>
  <div
    v-if="activity?.activityId"
    class="py-20"
  >
    <div class="flex flex-col items-center mb-10">
      <h2 class="mb-6">羽神報名去</h2>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/activities' }">
          活動列表
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ activity.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <ActivityPictures
        :pictures="pictures"
        class="mb-20"
      />
      <div class="grid grid-col-1 lg:grid-cols-12 gap-6 pt-10">
        <section class="lg:col-span-9">
          <h3
            class="text-4xl flex items-center pb-7 mb-7 border-b border-gray-200"
          >
            <el-avatar
              class="mr-2"
              :size="40"
              :src="activity.contactAvatar"
            />
            {{ activity.name }}
          </h3>
          <ul>
            <li
              v-for="(item, index) in activityInfoItems"
              :key="index"
              class="flex items-center mb-2"
            >
              <el-icon
                class="mr-2"
                size="16"
              >
                <component :is="item.icon" />
              </el-icon>
              {{ item.label }}：
              <span v-if="item.label !== '活動程度'">{{ item.value }}</span>
              <ActivityElTags
                v-else
                :level="[...item.value]"
              />
            </li>
          </ul>
        </section>
        <div class="lg:col-span-3">
          <div class="flex flex-col border border-gray-300 p-6 rounded-xl">
            <p class="text-lg font-bold mb-3">{{ activity.name }}</p>
            <div class="flex items-center pb-3 mb-3 border-b border-gray-200">
              <ActivityElTags :level="activity.level" />
              <el-tag
                round
                effect="light"
                class="text-black py-4 border-0"
                :class="`${useParticipantStatus('bg', activity.bookedCount, activity.participantCount)} ${useParticipantStatus('border', activity.bookedCount, activity.participantCount)}`"
              >
                {{ activity.bookedCount }}/{{ activity.participantCount }} 人
              </el-tag>
            </div>
            <p class="flex justify-end items-center mb-3">
              <el-icon
                class="mr-2"
                size="16"
              >
                <Money />
              </el-icon>
              <span class="text-lg font-bold">{{ activity.points }} 點</span>
            </p>
            <el-button
              type="primary"
              class="w-full py-5 text-base/6 border-0"
              round
            >
              報名活動
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
