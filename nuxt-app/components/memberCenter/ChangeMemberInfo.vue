<script setup lang="ts">
  import type { FormInstance, FormRules } from "element-plus";
  import type { MemberInfo } from "~/types/memberCenter";
  import { ElMessage } from "element-plus";
  import { useShuttlerLevelOptions } from "@/composables/useShuttlerLevelOptions";
  import {
    useTwCitiesOptions,
    useTwDistrictsOptions
  } from "@/composables/useTwLocationOptions";

  const shuttlerLevelOptions = useShuttlerLevelOptions();
  const twCitiesOptions = useTwCitiesOptions();
  const twCity = ref(twCitiesOptions[0].value);
  const twDistrict = ref(useTwDistrictsOptions(twCity.value)[0].value);
  const twDistricts = computed(() => {
    return [twDistrict.value];
  });

  const memberInfo = ref({
    name: "Vic",
    avatar: "",
    email: "abc123@gmail.com",
    registerDate: "2025-05-01",
    preferredLocation: twDistricts.value,
    level: 1,
    points: 1000,
    attendCount: 12
  });
  const memberInfoFormRules = ref<FormRules<MemberInfo>>({
    name: [
      { required: true, message: "請輸入名稱", trigger: "blur" },
      {
        min: 2,
        max: 10,
        message: "名稱長度應在 2 到 10 個字之間",
        trigger: "blur"
      }
    ]
  });
  const ruleFormRef = ref<FormInstance>();

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, _fields) => {
      if (valid) {
        ElMessage({
          message: "修改成功",
          type: "success"
        });
      } else {
        ElMessage({
          message: "提交資料有錯誤喔! 請檢查後再送出",
          type: "error"
        });
      }
    });
  };

  watch(() => twCity.value, (newVal) => {
    twDistrict.value = useTwDistrictsOptions(newVal)[0].value;
  });
</script>
<template>
  <div class="flex justify-center">
    <el-form
      ref="ruleFormRef"
      label-position="top"
      label-width="auto"
      class="w-full xl:w-1/3"
      :model="memberInfo"
      :rules="memberInfoFormRules"
    >
      <el-form-item
        label="姓名"
        prop="name"
        required
      >
        <el-input v-model="memberInfo.name" />
      </el-form-item>
      <el-form-item
        label="頭像"
        prop="avatar"
      >
        <el-input v-model="memberInfo.avatar" />
      </el-form-item>
      <el-form-item
        label="羽球程度"
        prop="level"
        required
      >
        <el-select
          v-model="memberInfo.level"
          placeholder="請選擇羽球程度"
        >
          <el-option
            v-for="item in shuttlerLevelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="縣市"
        prop=""
        required
      >
        <el-select
          v-model="twCity"
          placeholder="請選擇縣市"
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
        label="縣市"
        prop=""
        required
      >
        <el-select
          v-model="twDistrict"
          placeholder="請選擇區域"
        >
          <el-option
            v-for="item in useTwDistrictsOptions(twCity)"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="flex justify-center">
        <el-button
          type="primary"
          class="mx-auto"
          @click="submitForm(ruleFormRef)"
        >
          修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped></style>
