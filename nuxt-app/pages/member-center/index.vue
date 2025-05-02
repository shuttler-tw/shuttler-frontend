<script setup lang="ts">
  import ChangeMemberInfo from "~/components/memberCenter/ChangeMemberInfo.vue";
  import ChangePassword from "~/components/memberCenter/ChangePassword.vue";

  const activeName = ref("memberInfo");
  const circleUrl = ref(
    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
  );
  const memberInfo = ref({
    name: "Vic",
    avator: "",
    email: "abc123@gmail.com",
    registerDate: "2025-05-01",
    level: [1],
    points: 1000,
    attendCount: 12
  });
</script>
<template>
  <div>
    <section class="container flex items-center my-10">
      <el-avatar
        :size="80"
        :src="memberInfo.avator || circleUrl"
        class="mr-5"
      />
      <div class="mr-10">
        <p class="font-bold">{{ memberInfo.name }}</p>
        <p>{{ memberInfo.registerDate }}</p>
      </div>
      <div class="flex flex-col text-center text-white border border-gray-100">
        <span class="bg-green-500 py-1 px-2">羽球程度</span>
        <span class="text-green-500 py-1 px-2">{{ memberInfo.level }}</span>
      </div>
      <div
        class="flex flex-col text-center text-white border border-gray-100 mx-3"
      >
        <span class="bg-red-500 py-1 px-2">帳戶點數</span>
        <span class="text-red-500 py-1 px-2">{{ memberInfo.points }}</span>
      </div>
      <div class="flex flex-col text-center text-white border border-gray-100">
        <span class="bg-sky-500 py-1 px-2">參與次數</span>
        <span class="text-sky-500 py-1 px-2">12</span>
      </div>
    </section>
    <section />
    <section class="container">
      <el-tabs v-model="activeName">
        <el-tab-pane
          label="會員資料"
          name="memberInfo"
        >
          <ChangeMemberInfo :member-info="memberInfo" />
        </el-tab-pane>
        <el-tab-pane
          label="修改密碼"
          name="changePassword"
        >
          <ChangePassword />
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>
<style scoped></style>
