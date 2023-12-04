<script setup lang="ts">
import { NButton } from 'naive-ui/es/button';
import { NSpace } from 'naive-ui/es/space';
import { useResize } from '@/module/resize';
const { smallResolution } = useResize();
</script>

<template>
  <n-space
    :justify="smallResolution ? 'center' : 'space-between'"
    :wrap-item="true"
    :wrap="true"
    :size="20"
  >
    <n-button
      class="menu-button"
      tag="a"
      text
      href="/settings"
      target="_self"
      type="primary"
    >
      {{ $t('history.title') }}
    </n-button>
    <n-button
      class="menu-button"
      text
      tag="a"
      href="/history"
      target="_self"
      type="primary"
    >
      {{ $t('session.title') }}
    </n-button>
  </n-space>
</template>

<style lang="scss" scoped>
@import 'src/styles/functions';

.menu-button {
  width: rem(280px);
  height: rem(70px);
  box-shadow: -4px -4px 15px #3b3b3b, 4px 4px 15px #121212;
  border-radius: rem(30px);
}
</style>
