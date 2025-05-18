<script setup lang="ts">
import { RouterView } from "vue-router";
import TheHeader from "@components/globals/TheHeader.vue";
import TheFooter from "@components/globals/TheFooter.vue";
</script>

<template>
  <header class="wac-header">
    <TheHeader />
  </header>
  <main class="wac-main">
    <RouterView />
  </main>
  <footer class="wac-footer">
    <TheFooter />
  </footer>
</template>

<style scoped lang="scss">
.wac {
  &-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: var(--color-background);
    z-index: 100;
  }
}
</style>
