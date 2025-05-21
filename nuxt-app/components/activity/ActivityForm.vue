<script lang="ts" setup>
  import type { FormInstance, FormRules } from "element-plus";
  import type {
    ActivityDetail,
    CreateActivityPayload
  } from "@/types/activities";

  interface ActivityForm {
    activityEditInfo?: ActivityDetail;
  }

  const props = defineProps<ActivityForm>();

  const activityEditInfo = computed(() => {
    return props.activityEditInfo;
  });
  const activityInfo = ref<ActivityDetail | CreateActivityPayload>({
    name: "",
    pictures: [],
    date: "",
    startTime: "",
    endTime: "",
    participantCount: 0,
    rentalLot: 0,
    ballType: "",
    points: 0,
    level: [],
    brief: "",
    city: "臺北市",
    district: "大安區",
    venueName: "",
    address: "",
    venueFacilities: [],
    contactName: "",
    contactPhone: "",
    contactLine: ""
  });
  const activityInfoFormRules = ref<FormRules>({
    name: [
      { required: true, message: "請輸入名稱", trigger: "blur" },
      {
        min: 2,
        max: 15,
        message: "名稱長度應在 2 到 15 個字之間",
        trigger: "blur"
      }
    ],
    date: [{ required: true, message: "請選擇日期", trigger: "change" }],
    startTime: [
      { required: true, message: "請選擇開始時間", trigger: "change" }
    ],
    endTime: [{ required: true, message: "請選擇結束時間", trigger: "change" }]
  });
  const activityInfoFormRef = ref<FormInstance>();

  onMounted(() => {
    if (activityEditInfo.value) {
      activityInfo.value = activityEditInfo.value;
    }
  });
</script>

<template>
  <el-form
    ref="activityInfoFormRef"
    label-position="top"
    label-width="auto"
    class="w-full lg:w-2/3 grid grid-cols-1 lg:grid-cols-6 gap-6"
    :model="activityInfo"
    :rules="activityInfoFormRules"
  >
    <el-form-item
      label="活動名稱"
      prop="name"
      class="lg:col-span-6"
      required
    >
      <el-input
        v-model="activityInfo.name"
        size="large"
      />
    </el-form-item>
    <el-form-item
      label="活動日期"
      prop="date"
      class="lg:col-span-2"
      required
    >
      <el-date-picker
        v-model="activityInfo.date"
        size="large"
        class="w-full"
        type="date"
        placeholder="請選擇日期"
      />
    </el-form-item>
    <el-form-item
      label="開始時間"
      prop="startTime"
      class="lg:col-span-2"
      required
    >
      <el-time-select
        v-model="activityInfo.startTime"
        size="large"
        start="04:00"
        step="01:00"
        end="23:00"
        placeholder="請選擇開始時間"
        prefix-icon=""
      />
    </el-form-item>
    <el-form-item
      label="結束時間"
      prop="endTime"
      class="lg:col-span-2"
      required
    >
      <el-time-select
        v-model="activityInfo.endTime"
        size="large"
        start="04:00"
        step="01:00"
        end="23:00"
        placeholder="請選擇結束時間"
        prefix-icon=""
      />
    </el-form-item>
  </el-form>
</template>
