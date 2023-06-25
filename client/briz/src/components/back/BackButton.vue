<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui';
import back from '/src/assets/svg/back.svg';
const props = defineProps<{
  link: string;
}>();
</script>

<template>
  <div class="back-button">
    <n-button quaternary tag="a" :href="props.link">
      <template #icon>
        <n-icon><img alt="back" :src="back" /></n-icon>
      </template>
      <p style="margin-left: 1rem">{{ $t('base.backButton') }}</p>
    </n-button>
  </div>
</template>

<style scoped lang="scss">
.back-button {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
