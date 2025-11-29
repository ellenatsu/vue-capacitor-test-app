<template>
  <div class="tab-layout">
    <div class="tab-content">
      <router-view />
    </div>
    <AppTab />
  </div>
</template>

<script setup lang="ts">
import AppTab from "./AppTab.vue";
</script>

<style scoped>
.tab-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.tab-content {
  flex: 1;
  overflow: auto;
}
</style>
