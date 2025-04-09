<script lang="ts" setup>
const useCounter = useCounterStore()
const { increment, decrement, reset } = useCounter
</script>

<template>
  <div class="text-center">
    <h1 class="text-2xl mb-10">Welcome to Nuxt 3</h1>
    <p class="text-primary">Nuxt 3 is a powerful framework for building Vue.js applications.</p>
    <p class="text-warning">Explore the features and capabilities of Nuxt 3.</p>
    <p class="text-danger">Get started by creating your first page!</p>
    <p class="text-success font-bold">count:{{ useCounter.count }}</p>
    <p class="text-info">doubleCount:{{ useCounter.doubleCount }}</p>
    <el-button @click="ElMessage('hello')">message hello</el-button>
    <ElButton :icon="ElIconPlus" type="success" @click="increment">increment</ElButton>
    <ElButton :icon="ElIconMinus" type="danger" @click="decrement">decrement</ElButton>
    <ElButton :icon="ElIconRefreshLeft" type="info" @click="reset">reset</ElButton>
  </div>
</template>

<style scoped></style>
