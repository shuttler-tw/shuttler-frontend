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
    rentalLot: 1,
    ballType: "",
    points: 0,
    level: [],
    brief: "",
    city: "臺北市",
    district: "大安區",
    venueName: "",
    address: "",
    venueFacilities: [],
    organizer: "",
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
    endTime: [{ required: true, message: "請選擇結束時間", trigger: "change" }],
    participantCount: [
      { required: true, message: "請輸入活動名額", trigger: "blur" }
    ],
    rentalLot: [{ required: true, message: "請輸入租用場地", trigger: "blur" }],
    points: [{ required: true, message: "請輸入活動點數", trigger: "blur" }],
    venueName: [
      { required: true, message: "請輸入場館名稱", trigger: "blur" },
      {
        min: 2,
        max: 15,
        message: "場館名稱長度應在 2 到 15 個字之間",
        trigger: "blur"
      }
    ],
    address: [
      { required: true, message: "請輸入場館地址", trigger: "blur" },
      {
        min: 3,
        max: 50,
        message: "地址長度應在 3 到 50 個字之間",
        trigger: "blur"
      }
    ],
    organizer: [
      { required: true, message: "請輸入主辦單位名稱", trigger: "blur" },
      {
        min: 2,
        max: 15,
        message: "主辦單位名稱長度應在 2 到 15 個字之間",
        trigger: "blur"
      }
    ],
    contactName: [
      { required: true, message: "請輸入聯絡人姓名", trigger: "blur" },
      {
        min: 2,
        max: 15,
        message: "聯絡人姓名長度應在 2 到 15 個字之間",
        trigger: "blur"
      }
    ],
    contactPhone: [
      {
        pattern: /^09\d{8}$/,
        message: "請輸入正確的手機號碼",
        trigger: "blur"
      }
    ]
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
        placeholder="請輸入活動名稱"
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
    <el-form-item
      label="活動名額"
      prop="participantCount"
      class="lg:col-span-6"
      required
    >
      <el-input
        v-model="activityInfo.participantCount"
        size="large"
        type="number"
        placeholder="請輸入活動名額"
        min="0"
      >
        <template #suffix>
          <span>人</span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item
      label="租用場地"
      prop="rentalLot"
      class="lg:col-span-6"
      required
    >
      <el-input
        v-model="activityInfo.rentalLot"
        size="large"
        type="number"
        placeholder="請輸入租用場地"
        min="1"
      >
        <template #suffix>
          <span>面</span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item
      label="使用球種"
      class="lg:col-span-6"
    >
      <el-input
        v-model="activityInfo.ballType"
        size="large"
        placeholder="請輸入使用球種"
      />
    </el-form-item>
    <el-form-item
      label="活動點數"
      prop="points"
      class="lg:col-span-6"
      required
    >
      <el-input
        v-model="activityInfo.points"
        size="large"
        type="number"
        placeholder="請輸入活動點數"
        min="0"
      >
        <template #suffix>
          <span>點/人</span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item
      label="活動簡介"
      prop="brief"
      class="lg:col-span-6"
    >
      <el-input
        v-model="activityInfo.brief"
        type="textarea"
        size="large"
        maxlength="200"
        placeholder="請輸入活動簡介"
        :autosize="{ minRows: 3, maxRows: 5 }"
      />
    </el-form-item>
    <el-form-item
      label="場館名稱"
      prop="venueName"
      class="lg:col-span-6"
      required
    >
      <el-input
        v-model="activityInfo.venueName"
        size="large"
        placeholder="請輸入場館名稱"
      />
    </el-form-item>
    <el-form-item
      label="場館地址"
      class="lg:col-span-6"
      prop="address"
      required
    >
      <el-input
        v-model="activityInfo.address"
        size="large"
        placeholder="請輸入場館地址"
      />
    </el-form-item>
    <el-form-item
      label="主辦單位"
      class="lg:col-span-6"
      prop="organizer"
      required
    >
      <el-input
        v-model="activityInfo.organizer"
        size="large"
        placeholder="請輸入主辦單位名稱"
      />
    </el-form-item>
    <el-form-item
      label="聯絡人姓名"
      class="lg:col-span-6"
      prop="contactName"
      required
    >
      <el-input
        v-model="activityInfo.contactName"
        size="large"
        placeholder="請輸入聯絡人姓名"
      />
    </el-form-item>
    <el-form-item
      label="聯絡人電話"
      class="lg:col-span-6"
    >
      <el-input
        v-model="activityInfo.contactPhone"
        type="tel"
        size="large"
        placeholder="請輸入聯絡人電話"
      />
    </el-form-item>
    <el-form-item
      label="聯絡人 Line"
      class="lg:col-span-6"
    >
      <el-input
        v-model="activityInfo.contactLine"
        type="tel"
        size="large"
        placeholder="請輸入聯絡人 Line"
      />
    </el-form-item>
  </el-form>
</template>
