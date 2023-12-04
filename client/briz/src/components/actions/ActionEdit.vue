<script setup lang="ts">
import { NSpace, NInputNumber, NButton, NIcon } from 'naive-ui';
import { Action } from '../program/action.class';
import { onMounted, ref } from 'vue';
import { Delete24Regular } from '@vicons/fluent';
import { useProgramForm } from '@/components/program/program-form.module';
const { deleteAction } = useProgramForm();

const emptyAction = new Action(0, 0, 0);
let updatedAction = ref(emptyAction);
const props = defineProps<{
  action: Action | null;
  index: number;
}>();

onMounted(() => {
  if (props.action) {
    updatedAction.value = props.action;
  }
});
</script>

<template>
  <n-space
    justify="space-evenly"
    align="center"
    :wrap-item="false"
    :wrap="false"
  >
    <p>
      {{ $t('program.action.period') }}
    </p>
    <n-input-number
      max="7200"
      min="0"
      step="10"
      v-model:value="updatedAction.duration"
      button-placement="both"
    />
    <p>
      {{ $t('program.action.volume') }}
    </p>
    <n-input-number
      max="100"
      min="0"
      step="10"
      v-model:value="updatedAction.value"
      button-placement="both"
    />
    <n-button size="large" @click="deleteAction(index)">
      <template #icon>
        <n-icon size="32" :component="Delete24Regular"></n-icon>
      </template>
    </n-button>
  </n-space>
</template>

<style lang="scss" scoped>
@import 'src/styles/functions';

.n-space {
  width: 100%;
  background: #1e1e1e;
  padding: rem(22px);
  border-radius: rem(10px);
}
.n-input-number {
  width: rem(200px);
  text-align: center;
}
.n-input__prefix {
  width: rem(60px) !important;
}
.n-input__suffix {
  width: rem(60px) !important;
}
</style>
