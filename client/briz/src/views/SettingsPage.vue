<script setup lang="ts">
import {
  NSpace,
  NButton,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NGrid,
  NGridItem,
  NRadioGroup,
  NRadio,
} from 'naive-ui';
import { useI18n } from 'vue-i18n';
import BackButton from '@/components/back/BackButton.vue';
import { useResize } from '@/module/resize';
import { useSettings } from '@/components/settings/settings';
const { t } = useI18n();
const { saveSettings, themeRef } = useSettings();
const { smallResolution } = useResize();

const themes = [
  {
    value: 'lightTheme',
    label: t('settings.theme.light'),
  },
  {
    value: 'darkTheme',
    label: t('settings.theme.dark'),
  },
  {
    value: 'kidsTheme',
    label: t('settings.theme.kids'),
  },
];
</script>

<template>
  <n-layout style="height: calc(100vh - 4rem)">
    <n-layout-header>
      <h2>{{ $t('settings.title') }}</h2>
    </n-layout-header>
    <n-layout-content
      has-sider
      content-style="padding: 24px;"
      :native-scrollbar="false"
    >
      <n-grid
        cols="1 s:1 m:2 l:2 xl:2 2xl:2"
        x-gap="20"
        y-gap="40"
        item-responsive
        responsive="screen"
      >
        <n-grid-item span="1 m:1 l:1 xl:1 2xl:1">
          <div>
            <p style="font-size: 2rem">{{ $t('settings.theme.title') }}</p>
            <n-radio-group v-model:value="themeRef" name="radiogroup">
              <n-space vertical>
                <n-radio
                  v-for="theme in themes"
                  :key="theme.value"
                  :value="theme.value"
                  :label="theme.label"
                />
              </n-space>
            </n-radio-group>
          </div>
        </n-grid-item>
        <n-grid-item span="1 m:1 l:1 xl:1 2xl:1"></n-grid-item>
      </n-grid>
    </n-layout-content>
    <n-layout-footer position="absolute">
      <n-space align="center" :justify="smallResolution ? 'center' : 'end'">
        <n-space align="center" justify="end">
          <n-button class="save-button" size="medium" @click="saveSettings()">
            {{ $t('program.saveButton') }}
          </n-button>
          <BackButton style="width: unset" link="/"></BackButton>
        </n-space>
      </n-space>
    </n-layout-footer>
  </n-layout>
</template>

<style lang="scss" scoped>
@import 'src/styles/functions';

.n-layout-header,
.n-layout-footer {
  background: transparent;
  padding-bottom: 1rem;
}
.n-layout-footer {
  padding-top: 0;
}

.n-layout-content {
  flex: 1;
  height: calc(100vh - 215px);
}
.save-button {
  color: var(--vt-c-grey);
}
</style>
