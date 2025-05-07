<script setup lang="ts">
import { emailLogin, emailSignUp } from "@/apis/auth";
import { da } from "element-plus/es/locales.mjs";
import { useAuthStore } from "~/stores/auth";

const { visible, isSignUp } = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  isSignUp: {
    type: Boolean,
    default: false,
  },
});

const form = ref({
  email: "",
  password: "",
  name: "",
});

const emit = defineEmits<{
  "update:visible": [value: boolean];
}>();

const authStore = useAuthStore();

const handleSubmit = async () => {
  if (isSignUp) {
    await emailSignUp({
      email: form.value.email,
      password: form.value.password,
      name: form.value.name,
    });
  } else {
    const {data} = await emailLogin({
      email: form.value.email,
      password: form.value.password,
    });

    if (data.value?.data.token) {
      authStore.setToken(data.value?.data.token);
    }
  }
};
</script>

<template>
  <el-dialog
    :model-value="visible"
    title="加入 羽神同行"
    width="500"
    center
    :show-close="false"
    @update:model-value="emit('update:visible', $event)"
  >
    <div class="text-center">尋找你心目中的羽球活動</div>

    <div v-if="!isSignUp" class="flex flex-col items-center mt-5">
      <el-form label-position="top" label-width="auto" style="width: 60%">
        <el-form-item label="帳號">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
      </el-form>
    </div>

    <div v-else class="flex flex-col items-center mt-5">
      <el-form label-position="top" label-width="auto" style="width: 60%">
        <el-form-item label="帳號">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item label="暱稱">
          <el-input v-model="form.name" />
        </el-form-item>
      </el-form>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button
          type="primary"
          class="text-black w-[150px]"
          @click="handleSubmit"
        >
          {{ isSignUp ? "註冊" : "登入" }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
