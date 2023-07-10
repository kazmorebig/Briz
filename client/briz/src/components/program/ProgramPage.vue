<script setup lang="ts">
import {
  NSpace,
  NButton,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NCountdown,
} from 'naive-ui';
import BackButton from '@/components/back/BackButton.vue';
import type { Program } from '@/components/program/program.class';
import ProgramForm from '@/components/program/ProgramForm.vue';
import { useProgramForm } from '@/components/program/program-form.module';
import { useResize } from '@/module/resize';
const { programFormValue, renderCountdown, saveProgram } = useProgramForm();
const { smallResolution } = useResize();

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
      has-sider
      content-style="padding: 24px;"
      :native-scrollbar="false"
    >
      <program-form></program-form>
    </n-layout-content>
    <n-layout-footer position="absolute">
      <n-space
        align="center"
        :justify="smallResolution ? 'center' : 'space-between'"
      >
        <div class="program-footer">
          <h3>
            {{ $t('program.time') }}
            <n-countdown
              ref="countdown"
              :duration="programFormValue.fullPeriod * 1000"
              :active="false"
              :render="renderCountdown"
            />
          </h3>
        </div>

        <n-space align="center" justify="end">
          <n-button class="save-button" size="medium" @click="saveProgram()">
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
