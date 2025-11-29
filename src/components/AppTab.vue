<template>
  <nav class="bottom-nav">
    <RouterLink
      :to="{ name: 'orders' }"
      class="nav-item"
      :class="{ active: isActive('orders') }"
    >
      Orders
    </RouterLink>

    <RouterLink
      :to="{ name: 'scan' }"
      class="nav-item"
      :class="{ active: isActive('scan') }"
    >
      Scan
    </RouterLink>

    <RouterLink
      :to="{ name: 'profile' }"
      class="nav-item"
      :class="{ active: isActive('profile') }"
    >
      Profile
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { useRoute, RouterLink } from "vue-router";

const route = useRoute();
const isActive = (name: string) => route.name === name;
</script>

<style scoped>
.bottom-nav {
  display: flex;
  border-top: 1px solid #ddd;
}

.nav-item {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  text-decoration: none;
  color: #666;
}

.nav-item.active {
  color: #000;
  font-weight: bold;
}
</style>
