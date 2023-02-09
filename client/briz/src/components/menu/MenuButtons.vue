<script setup lang="ts">
import { NButton } from 'naive-ui/es/button';
import { NSpace } from 'naive-ui/es/space';
</script>

<template>
  <n-space justify="space-between" style="width: 596px">
    <n-button
      class="menu-button"
      tag="a"
      text
      href="/settings"
      target="_self"
      type="primary"
    >
      {{ $t('history.link') }}
    </n-button>
    <n-button
      class="menu-button"
      text
      tag="a"
      href="/history"
      target="_self"
      type="primary"
    >
      {{ $t('session.link') }}
    </n-button>
  </n-space>
</template>

<style scoped>
.menu-button {
  width: 280px;
  height: 70px;

  box-shadow: -4px -4px 15px #3b3b3b, 4px 4px 15px #121212;
  border-radius: 30px;
}
</style>
