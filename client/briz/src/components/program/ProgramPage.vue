<script setup lang="ts">
import {
  NSpace,
  NButton,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NTime,
} from 'naive-ui';
import BackButton from '@/components/back/BackButton.vue';
import type { Program } from '@/components/program/program.class';
import ProgramForm from '@/components/program/ProgramForm.vue';

const props = defineProps<{
  item: Program | null;
  title: string;
}>();
</script>

<template>
  <n-layout style="height: calc(100vh - 4rem)">
    <n-layout-header>
      <h2>{{ props.title }}</h2>
    </n-layout-header>
    <n-layout-content
      content-style="padding-right: 24px;"
      :native-scrollbar="false"
    >
      <program-form></program-form>
    </n-layout-content>
    <n-layout-footer position="absolute">
      <n-space align="center" justify="space-between">
        <div>
          <h3>
            {{ $t('program.time') }}
            <n-time format="mm:ss" :time="0" :to="86400000" type="date" />
          </h3>
        </div>

        <n-space align="center" justify="end">
          <n-button class="save-button" size="medium">
            {{ $t('program.saveButton') }}
          </n-button>
          <BackButton style="width: unset" link="/"></BackButton>
        </n-space>
      </n-space>
    </n-layout-footer>
  </n-layout>
</template>

<style scoped>
.n-layout-header,
.n-layout-footer {
  background: transparent;
  padding-bottom: 1rem;
}
.n-layout-content {
  flex: 1;
  height: calc(100vh - 215px);
}
.save-button {
  color: var(--vt-c-grey);
}
</style>
