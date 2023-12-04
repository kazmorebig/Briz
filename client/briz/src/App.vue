<script setup lang="ts">
import { RouterView } from 'vue-router';
import {
  NConfigProvider,
  darkTheme,
  lightTheme,
  NMessageProvider,
  NLayout,
} from 'naive-ui';
import { theme } from '@/module/theme.module';
import { onMounted, onUnmounted, ref } from 'vue';
import { ruRU, dateRuRU } from 'naive-ui';
import { useResize } from '@/module/resize';
import { useSettings } from '@/components/settings/settings';
const { themeRef } = useSettings();

const { darkThemeOverrides, lightThemeOverrides } = theme();
const { handleWindowSizeChange, breakpoints } = useResize();

const mainTheme = ref(themeRef);

onMounted(() => {
  window.addEventListener('resize', handleWindowSizeChange);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleWindowSizeChange);
});
</script>

<template>
  <n-config-provider
    :theme="mainTheme === 'lightTheme' ? lightTheme : darkTheme"
    :theme-overrides="
      mainTheme === 'lightTheme' ? lightThemeOverrides : darkThemeOverrides
    "
    :date-locale="dateRuRU"
    :locale="ruRU"
    :breakpoints="breakpoints"
  >
    <n-message-provider> </n-message-provider>
    <div
      class="wrapper"
      :data-theme="mainTheme === 'lightTheme' ? 'light' : 'dark'"
    >
      <RouterView />
    </div>
  </n-config-provider>
</template>

<style lang="scss"></style>
