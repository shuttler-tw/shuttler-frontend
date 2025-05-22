<script lang="ts" setup>
  import type {
    FormInstance,
    FormRules,
    UploadFiles
  } from "element-plus";
  import type {
    ActivityDetail,
    CreateActivityPayload
  } from "@/types/activities";
  import { useShuttlerLevelOptions } from "@/composables/useShuttlerLevelOptions";
  import { useTwLocationState } from "@/composables/useTwLocationState";
  import { venueFacilities as availableVenueFacilities } from "@/constants/venueFacilities";

  interface ActivityForm {
    activityEditInfo?: ActivityDetail;
  }

  type ActivityAction = "save" | "publish" | "update";

  const props = defineProps<ActivityForm>();
  const runtimeConfig = useRuntimeConfig();

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
    level: [{ required: true, message: "請選擇活動程度", trigger: "change" }],
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
  const shuttlerLevelOptions = useShuttlerLevelOptions();
  const {
    twCitiesOptions,
    twDistrictsOptions,
    twCity,
    twDistrict,
    initLocationByZip
  } = useTwLocationState();
  initLocationByZip("110");

  const processActivityAction = (action: ActivityAction) => {
    switch (action) {
      case "save":
        ElMessage.success("已成功儲存");
        break;
      case "publish":
        console.log(activityInfo.value);
        ElMessage.success("已成功提交");
        break;
      case "update":
        ElMessage.success("已成功修改");
        break;
    }
  };

  const uploadImageFiles = ref<UploadFiles>([]);


  const handleChange = (uploadFiles: UploadFiles) => {
    uploadImageFiles.value = uploadFiles;
  };

  const handleUploadImages = async () => {
    const formData = new FormData();
    formData.append("uploadType", "activity");
    uploadImageFiles.value.forEach((file) => {
      if (file.raw) {
        formData.append("file", file.raw);
      }
    });
    const { data, error } = await useFetch<{message: string, data: { photo: string[] }}>(`${runtimeConfig.public.API_BASE_URL}/upload-image`, {
      method: "POST",
      body: formData,
      headers: {
        "Authorization": `Bearer ${useCookie("token").value}`
      }
    });
    if (error.value) {
      ElMessage.error("圖片上傳失敗，請稍後再試");
      return Promise.reject("圖片上傳失敗，請稍後再試");
    }
    if (data.value?.data.photo) activityInfo.value.pictures = data.value?.data.photo
  }

  const submitForm = async (
    formEl: FormInstance | undefined,
    action: ActivityAction
  ) => {
    if (!formEl) return;
    await formEl.validate(async (valid, _fields) => {
      if (valid) {
        if (uploadImageFiles.value.length > 0) await handleUploadImages();
        await processActivityAction(action);
      } else {
        ElMessage.error("提交資料有錯誤喔! 請檢查後再送出");
      }
    });
  };

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
      label="活動圖片"
      prop=""
      class="lg:col-span-6"
    >
      <ActivityElUploadImage @onChange="handleChange" />
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
      label="活動程度"
      prop="level"
      class="lg:col-span-6"
      required
    >
      <el-checkbox-group
        v-model="activityInfo.level"
        size="large"
      >
        <el-checkbox
          v-for="levelOption in shuttlerLevelOptions"
          :key="levelOption.value"
          :label="levelOption.label"
          :value="levelOption.value"
        />
      </el-checkbox-group>
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
      label="縣市"
      prop=""
      class="lg:col-span-3"
      required
    >
      <el-select
        v-model="twCity"
        placeholder="請選擇縣市"
        size="large"
      >
        <el-option
          v-for="item in twCitiesOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      label="區域"
      prop=""
      class="lg:col-span-3"
      required
    >
      <el-select
        v-model="twDistrict"
        placeholder="請選擇區域"
        size="large"
      >
        <el-option
          v-for="item in twDistrictsOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
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
      label="場館設施"
      prop=""
      class="lg:col-span-6"
      required
    >
      <el-checkbox-group
        v-model="activityInfo.venueFacilities"
        size="large"
      >
        <el-checkbox
          v-for="facilitity in availableVenueFacilities"
          :key="facilitity"
          :label="facilitity"
          :value="facilitity"
        />
      </el-checkbox-group>
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
    <el-form-item class="lg:col-span-6">
      <template v-if="activityEditInfo?.activityId">
        <el-button
          type="primary"
          size="large"
          class="w-full"
          round
          @click="submitForm(activityInfoFormRef, 'update')"
        >
          更新
        </el-button>
      </template>
      <template v-else>
        <div class="flex w-full">
          <el-button
            size="large"
            class="w-full mr-3 border-2 border-gray-300 text-gray-400"
            round
            @click="handleUploadImages"
          >
            儲存
          </el-button>
          <el-button
            type="primary"
            size="large"
            class="w-full"
            round
            @click="submitForm(activityInfoFormRef, 'publish')"
          >
            發佈
          </el-button>
        </div>
      </template>
    </el-form-item>
  </el-form>
</template>
