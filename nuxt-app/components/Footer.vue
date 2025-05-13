<script setup lang="ts">
// 如果有需要可以加 props 或 emit，這裡先不寫
</script>

<template>
  <footer class="bg-[#fdfde8] py-6">
    <div class="container mx-auto px-8 flex flex-wrap justify-between items-center">
        <!-- 左邊：Logo -->
        <div class="flex items-center space-x-2 w-[194px] h-[53px]">
          <img src="#" alt="Logo" class="h-8" />
          <span class="text-lg font-semibold text-red-600">羽神同行</span>
        </div>


        <!-- 中間區塊 -->
        <div class="w-[306px] h-[135px] flex flex-col text-sm text-gray-700">
          <div class="space-y-4">
            <h4 class="text-[#F98770] text-base">舉辦活動</h4>
            <ul class="text-[#767999] text-base space-y-4">
              <li><a href="#">常見問題</a></li>
              <li><a href="#">首次舉辦活動</a></li>
              <li><a href="#">活動上架規範</a></li>
            </ul>
          </div>
        </div>

        <div class="w-[196px] h-[100px] flex flex-col gap-4">
          <h4 class="text-[#F98770] text-base">關於我們</h4>
          <ul class="text-[#767999] text-base space-y-4">
            <li><a href="#">服務條款</a></li>
            <li><a href="#">隱私權政策</a></li>
          </ul>
        </div>

        <!-- 右邊區塊 -->
        <div class="text-sm text-gray-700 w-[195px] h-[116px] gap-[16px] flex flex-col">
          <h4 class="text-[#F98770] text-base">聯絡我們</h4>
          <p class="text-[#767999] text-base mt-2">service@shuttler.tw</p>
          <div class="flex space-x-4 mt-2">
            <!-- 社群圖標可用 font awesome 或 svg -->
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-line"></i></a>
          </div>
        </div>

      </div>



    <div class="bg-[#fdfde8] text-center py-2">
      <p class="text-sm text-gray-600">Copyright © 2025 羽神同行. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
/* 可加上 hover 效果、動畫等 */
</style>