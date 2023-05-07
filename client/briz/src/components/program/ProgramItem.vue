<script setup lang="ts">
import type { Program } from '@/components/program/program.type';
import { NCard, NButton, NIcon, NEllipsis } from 'naive-ui';
import { NSpace } from 'naive-ui/es/space';
import { Edit16Regular } from '@vicons/fluent';

const props = defineProps<{
  item: Program;
  active: boolean;
}>();
</script>

<template>
  <n-card :class="active ? 'activeProgram' : ''">
    <n-space justify="space-around" size="small" :wrap-item="false">
      <span> {{ item.id }} </span>
      <n-ellipsis style="max-width: 150px" :line-clamp="1">
        {{ item.name }}
      </n-ellipsis>
    </n-space>

    <n-button circle size="small" class="edit-button">
      <n-icon :component="Edit16Regular"></n-icon>
    </n-button>
  </n-card>
</template>

<style scoped lang="scss">
.activeProgram {
  background: var(--vt-c-black-soft) !important;
}
.edit-button {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
</style>
