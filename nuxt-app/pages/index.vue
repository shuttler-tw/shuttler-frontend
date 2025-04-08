<script lang="ts" setup>
const active = ref(0);
const next = () => {
  if (active.value++ > 2) active.value = 0
}
</script>

<template>
  <div class="text-center">
    <h1 class="text-2xl mb-10">Welcome to Nuxt 3</h1>
    <p class="text-primary">Nuxt 3 is a powerful framework for building Vue.js applications.</p>
    <p class="text-warning">Explore the features and capabilities of Nuxt 3.</p>
    <p class="text-danger">Get started by creating your first page!</p>
    <el-button @click="ElMessage('hello')">button</el-button>
    <ElButton :icon="ElIconEditPen" type="success">button</ElButton>
  </div>
</template>

<style scoped></style>
