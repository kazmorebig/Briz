<script setup lang="ts">
import { RouterView } from 'vue-router';
import { NConfigProvider, darkTheme, NMessageProvider } from 'naive-ui';
import { theme } from '@/module/theme.module';
import { ref } from 'vue';
const { darkThemeOverrides, lightThemeOverrides } = theme();

const mainTheme = ref(darkTheme);
</script>

<template>
  <n-config-provider
    :theme="mainTheme"
    :theme-overrides="
      mainTheme === null ? lightThemeOverrides : darkThemeOverrides
    "
  >
    <n-message-provider> </n-message-provider>
    <div class="wrapper">
      <div id="app" class="dark">
        <RouterView />
      </div>
    </div>
  </n-config-provider>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;600;700&display=swap');
</style>
