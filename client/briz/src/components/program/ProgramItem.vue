<script setup lang="ts">
import type { Program } from '@/components/program/program.type';
import { NCard } from 'naive-ui';
import { NSpace } from 'naive-ui/es/space';

const props = defineProps<{
  item: Program;
  active: boolean;
}>();
</script>

<template>
  <n-card :class="active ? 'activeProgram' : ''">
    <n-space justify="space-around" size="large">
      <span> {{ item.id }} </span>
      <span>{{ item.name }}</span>
    </n-space>
  </n-card>
</template>

<style scoped>
.activeProgram {
  background: var(--vt-c-black-soft) !important;
}
</style>
